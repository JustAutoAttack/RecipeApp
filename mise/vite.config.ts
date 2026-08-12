/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@core': path.resolve(__dirname, './src/core'),
			'@design_system': path.resolve(__dirname, './src/design_system'),

			// Modules
			'@user': path.resolve(__dirname, './src/modules/user'),
			'@auth': path.resolve(__dirname, './src/modules/auth'),
			'@recipes': path.resolve(__dirname, './src/modules/recipes'),
			'@cook_mode': path.resolve(__dirname, './src/modules/cook_mode')
		}
	},
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: 'ws',
					host,
					port: 1421
				}
			: undefined,
		watch: {
			ignored: ['**/src-tauri/**']
		}
	}
}));
