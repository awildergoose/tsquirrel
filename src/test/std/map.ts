export class Map<K extends string | number, V> {
	private table: Record<string, V> = {} as Record<string, V>;

	set(key: K, value: V): void {
		this.table[key as string] = value;
	}

	get(key: K): V | null {
		const val = this.table[key as string];
		return val !== undefined ? val : null;
	}

	has(key: K): boolean {
		return this.table[key as string] !== undefined;
	}

	del(key: K): boolean {
		const k = key;
		if (this.table[k as string] !== undefined) {
			delete this.table[k as string];
			return true;
		}
		return false;
	}

	clear(): void {
		this.table = {} as Record<string, V>;
	}

	keys(): K[] {
		const result: any[] = [];
		for (const k in this.table) {
			result.push(k);
		}
		return result as K[];
	}

	values(): V[] {
		const result: V[] = [];
		for (const k in this.table) {
			result.push(this.table[k]);
		}
		return result;
	}

	entries(): [K, V][] {
		const result: [K, V][] = [];
		for (const k in this.table) {
			result.push([k as K, this.table[k]]);
		}
		return result;
	}

	forEach(callback: (value: V, key: K) => void): void {
		for (const k in this.table) {
			callback(this.table[k], k as K);
		}
	}
}
