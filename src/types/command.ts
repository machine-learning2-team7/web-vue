export interface Command {
	id: number;
	title: string;
	description?: string;
	command?: Function;
}

export type ICommand = Omit<Command, "id">;
