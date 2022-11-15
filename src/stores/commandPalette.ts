import { defineStore } from "pinia";
import { Command, ICommand } from "../types/command";

let id = 1;

export const useCommandStore = defineStore("CommandPalette", {
	state: () => {
		return {
			commandPaletteVisible: false,
			commandFilterText: "",
			activeIdx: 0,
			commandList: [] as Command[],
		};
	},

	getters: {
		filteredCommandList: (state): Command[] => {
			if (state.commandFilterText === "") {
				return state.commandList;
			}

			return state.commandList.filter((command) => {
				return command.title
					.toLowerCase()
					.includes(state.commandFilterText.toLowerCase());
			});
		},
	},

	actions: {
		registerCommands(commands: ICommand[]) {
			this.commandList = commands.map((command) => {
				return { id: id++, ...command };
			});
			this.sortCommands();
		},
		sortCommands() {
			this.commandList.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});
		},
		executeActiveCommand() {
			const activeCommand = this.filteredCommandList[this.activeIdx];
			if (activeCommand.command) {
				activeCommand.command();
			}
			this.sortCommands();
			this.activeIdx = this.commandList.indexOf(activeCommand);
			this.commandPaletteVisible = false;
			this.commandFilterText = "";
		},
		setCommandFilterText(text: string) {
			this.commandFilterText = text;
		},
		toggleCommandPalette() {
			this.commandPaletteVisible = !this.commandPaletteVisible;
		},
		incrementActiveIdx() {
			if (this.activeIdx >= this.filteredCommandList.length - 1) {
				this.activeIdx = 0;
			} else {
				this.activeIdx++;
			}
		},
		decrementActiveIdx() {
			if (this.activeIdx <= 0) {
				this.activeIdx = this.filteredCommandList.length - 1;
			} else {
				this.activeIdx--;
			}
		},
	},
});
