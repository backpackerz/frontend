export const groupBy = (array: any[], fn: Function) =>
	array.reduce((result, item) => {
		const key = fn(item);
		if (!result[key]) result[key] = [];
		result[key].push(item);
		return result;
	}, {});
