import { defineStore } from "pinia";
import languageData from "../../public/languageData.json";
import { LanguageData } from "../types/language";

const languages = languageData as Record<string, LanguageData>;

export const useCodeStore = defineStore("code", {
	state: () => {
		return {
			languages,
			activeLanguage: languages["javascript"],
		};
	},

	getters: {
		activeCode: (state) => {
			return state.activeLanguage.code;
		},
	},

	actions: {
		setActiveLanguage(language: string) {
			this.activeLanguage =
				this.languages[language] || this.languages["javascript"];
		},

		saveCode(code: string) {
			this.activeLanguage.code = code;
		},
	},
});
