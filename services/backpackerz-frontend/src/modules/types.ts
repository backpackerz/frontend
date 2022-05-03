export declare namespace BackpackerzStore {
	type Error = {
		statusCode: number;
		message: string;
		timestamp: string;
		path: string;
	};

	type State<E> = {
		entity?: E;
		type?: string;
		currentRequestId?: string;
		loading: "idle" | "pending" | "succeeded" | "failed";
		error?: BackpackerzStore.Error;
	};
}
