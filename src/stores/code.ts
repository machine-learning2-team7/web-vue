import { defineStore } from "pinia";
import languageData from "../languageData.json";
import { LanguageData } from "../types/language";
import { EditorView } from "@codemirror/view";

const languages = languageData as Record<string, LanguageData>;

export const useCodeStore = defineStore("code", {
	state: () => {
		return {
			languages,
			view: null as EditorView | null,
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
			this.activeLanguage = this.languages[language];
			if (this.view !== null) {
				this.view.focus();
			}
		},

		saveCode(code: string) {
			this.activeLanguage.code = code.trim();
		},

		setView(view: EditorView) {
			this.view = view;
		},
	},
});
