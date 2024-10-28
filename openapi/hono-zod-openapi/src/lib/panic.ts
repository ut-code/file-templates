export function panic(text: string): never {
	throw new Error(text);
}
