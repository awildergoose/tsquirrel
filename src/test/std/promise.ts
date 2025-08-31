export class Promise<K> {
	private state: "pending" | "fulfilled" | "rejected" = "pending";
	private value: K | null = null;
	private reason: any = null;
	private handlers: ((val: K) => void)[] = [];
	private catchHandlers: ((err: any) => void)[] = [];

	constructor(
		executor: (
			resolve: (val: K) => void,
			reject: (err: any) => void
		) => void
	) {
		const self = this;

		const resolve = (val: K) => {
			if (self.state !== "pending") return;
			self.state = "fulfilled";
			self.value = val;
			for (const h of self.handlers) h(val);
		};

		const reject = (err: any) => {
			if (self.state !== "pending") return;
			self.state = "rejected";
			self.reason = err;
			for (const h of self.catchHandlers) h(err);
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(onFulfilled: (val: K) => void): Promise<K> {
		if (this.state === "fulfilled" && this.value != null) {
			onFulfilled(this.value);
		} else {
			this.handlers.push(onFulfilled);
		}
		return this;
	}

	andCatch(onRejected: (err: any) => void): Promise<K> {
		if (this.state === "rejected") {
			onRejected(this.reason);
		} else {
			this.catchHandlers.push(onRejected);
		}
		return this;
	}
}
