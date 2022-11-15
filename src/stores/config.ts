import { defineStore } from "pinia";
import { EditorConfig } from "../types/config";
export const useConfigStore = defineStore("config", {
	state: () => ({
		editor: { vimMode: false } as EditorConfig,
	}),

	actions: {
		setEditorConfig(config: Partial<EditorConfig>) {
			this.editor = { ...this.editor, ...config };
		},
	},
});
