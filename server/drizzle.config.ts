import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/schema.ts', // Where the generated file will go
	out: './src/db/migrations', // Where migration snapshots will go
	dbCredentials: {
		url: './temp_pull.db' // Local temporary database file for inspection
	}
});
