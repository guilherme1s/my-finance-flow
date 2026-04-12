import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type InlineConfig, type UserConfig } from "vite"

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		setupFiles: ['./test/setup.ts'],
		environment: "happy-dom",
	},
	server: {
		watch: {
			ignored: ["**/database.json"],
		},
	},
} as UserConfig & {
	test: InlineConfig
})