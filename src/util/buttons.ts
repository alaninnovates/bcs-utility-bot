export const checkButtonId = (buttonId: string) => {
	return (prefix: string) => {
		return new RegExp(`${prefix}([^\s]+)`).exec(buttonId);
	};
};
