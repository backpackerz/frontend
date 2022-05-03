const Width = [0, 321, 481, 769, 1025, 1201, 1921] as const;

const Breakpoints = {
	xs: 0,
	sm: 1,
	md: 2,
	lg: 3,
	xl: 4,
	xxl: 5,
	xxxl: 6,
};

function mq(
	mn: keyof typeof Breakpoints,
	mx?: Omit<keyof typeof Breakpoints, "xs">,
) {
	const min = Width[Breakpoints[mn]];
	const max = Width[Breakpoints[mx as keyof typeof Breakpoints]] - 1;
	if (Breakpoints[mn] >= Breakpoints[mx as keyof typeof Breakpoints]) {
		throw Error();
	}

	if (!max) {
		return `@media screen and (min-width: ${min}px)`;
	}
	return `@media screen and (min-width: ${min}px) and (max-width: ${max}px)`;
}

export { mq };
