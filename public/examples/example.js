// show alert
alert("Hello World!");

// read file
const readFile = async () => {
	[fileHandle] = await window.showOpenFilePicker();

	if (fileHandle.kind === "file") {
		const file = filehandle.getFile();
	} else if (fileHandle.kind === "directory") {
		// run directory code
	}
};
