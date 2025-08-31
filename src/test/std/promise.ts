export class Promise<T> {
	private state: "pending" | "fulfilled" | "rejected" = "pending";
	private value: T | null = null;
	private reason: any = null;
	private handlers: ((val: T) => void)[] = [];
	private catchHandlers: ((err: any) => void)[] = [];

	constructor(
		executor: (
			resolve: (val: T) => void,
			reject: (err: any) => void
		) => void
	) {
		const resolve = (val: T) => {
			if (this.state !== "pending") return;
			this.state = "fulfilled";
			this.value = val;
			for (const h of this.handlers) h(val);
		};

		const reject = (err: any) => {
			if (this.state !== "pending") return;
			this.state = "rejected";
			this.reason = err;
			for (const h of this.catchHandlers) h(err);
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(
		onFulfilled: (val: T) => void,
		onRejected: (err: any) => void
	): Promise<T> {
		if (this.state === "fulfilled" && this.value != null) {
			onFulfilled(this.value);
		} else if (this.state === "rejected" && onRejected) {
			onRejected(this.reason);
		} else {
			this.handlers.push(onFulfilled);
			if (onRejected) this.catchHandlers.push(onRejected);
		}

		return this;
	}

	andCatch(onRejected: (err: any) => void): Promise<T> {
		if (this.state === "rejected") {
			onRejected(this.reason);
		} else {
			this.catchHandlers.push(onRejected);
		}
		return this;
	}
}
