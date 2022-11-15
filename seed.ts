import { readFileSync, writeFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { LanguageData } from "./src/types/language";

let languages: Record<
	string,
	{ name: string; examplePath: string; code?: string }
> = {
	javascript: {
		name: "JavaScript",
		examplePath: "example.js",
	},
	python: {
		name: "Python",
		examplePath: "example.py",
	},
	sql: {
		name: "SQL",
		examplePath: "example.sql",
	},
	r: {
		name: "R",
		examplePath: "example.r",
	},
	go: {
		name: "Go",
		examplePath: "example.go",
	},
};

for (const lang in languages) {
	const languageData = languages[lang];
	const code = readFileSync(`public/examples/${languageData.examplePath}`)
		.toString()
		.trim();
	languageData.code = code;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputFile = `${__dirname}/public/languageData.json`;
writeFileSync(outputFile, JSON.stringify(languages, null, 2));
