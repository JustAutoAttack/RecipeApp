import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../temp_schema.db');
const schemaSqlPath = path.resolve(__dirname, '../../database/schema.sql');
const outputTsPath = path.join(__dirname, '../src/db/schema.ts');

if (fs.existsSync(dbPath)) {
	fs.unlinkSync(dbPath);
}

const db = new Database(dbPath);
const schemaSql = fs.readFileSync(schemaSqlPath, 'utf8');
db.exec(schemaSql);

interface TableRow {
	name: string;
}

interface ColumnRow {
	cid: number;
	name: string;
	type: string;
	notnull: number;
	dflt_value: string | null;
	pk: number;
}

interface ForeignKeyRow {
	id: number;
	seq: number;
	table: string;
	from: string;
	to: string;
	on_update: string;
	on_delete: string;
	match: string;
}

const tables = db
	.prepare(
		"SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
	)
	.all() as TableRow[];

let tsCode = `import { sqliteTable, text, integer, real, blob, primaryKey } from 'drizzle-orm/sqlite-core';\n`;
tsCode += `import { sql } from 'drizzle-orm';\n\n`;

for (const { name: tableName } of tables) {
	const columns = db
		.prepare(`PRAGMA table_info("${tableName}")`)
		.all() as ColumnRow[];
	const foreignKeys = db
		.prepare(`PRAGMA foreign_key_list("${tableName}")`)
		.all() as ForeignKeyRow[];

	const fkMap: Record<
		string,
		{ table: string; field: string; onDelete: string }
	> = {};
	for (const fk of foreignKeys) {
		fkMap[fk.from] = {
			table: fk.table,
			field: fk.to,
			onDelete: fk.on_delete
		};
	}

	const pkColumns = columns
		.filter((col) => col.pk > 0)
		.sort((a, b) => a.pk - b.pk);
	const isCompositePk = pkColumns.length > 1;

	tsCode += `export const ${tableName} = sqliteTable('${tableName}', {\n`;

	for (const col of columns) {
		let typeCall = 'text';
		const sqlType = (col.type || '').toUpperCase();

		if (sqlType.includes('INT')) {
			typeCall = 'integer';
		} else if (
			sqlType.includes('CHAR') ||
			sqlType.includes('TEXT') ||
			sqlType.includes('CLOB')
		) {
			typeCall = 'text';
		} else if (
			sqlType.includes('REAL') ||
			sqlType.includes('FLOA') ||
			sqlType.includes('DOUB')
		) {
			typeCall = 'real';
		} else if (sqlType.includes('BLOB')) {
			typeCall = 'blob';
		}

		tsCode += `  ${col.name}: ${typeCall}('${col.name}')`;

		if (col.pk === 1 && !isCompositePk) {
			tsCode += `.primaryKey()`;
		}

		if (col.notnull === 1 || isCompositePk || col.pk > 0) {
			tsCode += `.notNull()`;
		}

		if (col.dflt_value !== null && col.dflt_value !== undefined) {
			let val = col.dflt_value.trim();
			while (
				(val.startsWith("'") && val.endsWith("'")) ||
				(val.startsWith('"') && val.endsWith('"'))
			) {
				val = val.slice(1, -1);
			}
			if (
				val.toUpperCase().includes('CURRENT_TIMESTAMP') ||
				val.toUpperCase().includes('DATETIME')
			) {
				tsCode += `.default(sql\`${val}\`)`;
			} else if (!isNaN(Number(val))) {
				tsCode += `.default(${val})`;
			} else {
				tsCode += `.default('${val}')`;
			}
		}

		if (fkMap[col.name]) {
			const fk = fkMap[col.name];
			if (fk.onDelete && fk.onDelete.toUpperCase() === 'CASCADE') {
				tsCode += `.references(() => ${fk.table}.${fk.field}, { onDelete: 'cascade' })`;
			} else {
				tsCode += `.references(() => ${fk.table}.${fk.field})`;
			}
		}

		tsCode += `,\n`;
	}

	if (isCompositePk) {
		const pkColNames = pkColumns.map((c) => `table.${c.name}`).join(', ');
		tsCode += `}, (table) => ({\n`;
		tsCode += `  pk: primaryKey({ columns: [${pkColNames}] })\n`;
		tsCode += `}));\n\n`;
	} else {
		tsCode += `});\n\n`;
	}
}

fs.mkdirSync(path.dirname(outputTsPath), { recursive: true });
fs.writeFileSync(outputTsPath, tsCode);

db.close();
if (fs.existsSync(dbPath)) {
	fs.unlinkSync(dbPath);
}

console.log(`✨ Successfully generated Drizzle schema at ${outputTsPath}`);
