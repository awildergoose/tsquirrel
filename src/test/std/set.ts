export class Set<T> {
	private _arr: T[] = [];

	add(val: T) {
		if (!this.has(val)) this._arr.push(val);
	}

	del(val: T) {
		for (let i = 0; i < this._arr.len(); i++)
			if (this._arr[i] == val) {
				this._arr.remove(i);
				return true;
			}
		return false;
	}

	has(val: T) {
		for (let i = 0; i < this._arr.len(); i++)
			if (this._arr[i] == val) return true;
		return false;
	}

	forEach(fn: (val: T) => void) {
		for (let i = 0; i < this._arr.len(); i++) fn(this._arr[i]);
	}

	values(): T[] {
		return this._arr;
	}
}
