import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

import { EditorConfig } from "../types/config";
export const useConfigStore = defineStore("config", {
	state: () => ({
		editor: useStorage("editor-config", { vimMode: false } as EditorConfig),
	}),

	actions: {
		setEditorConfig(config: Partial<EditorConfig>) {
			this.editor = { ...this.editor, ...config };
		},
	},
});
