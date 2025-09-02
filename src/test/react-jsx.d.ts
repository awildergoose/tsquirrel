declare namespace JSX {
	interface IntrinsicElements {
		hud: { children?: any };
		text: {
			children?: any;
			name?: string;
			slot?: string;
			x?: number;
			y?: number;
			w?: number;
			h?: number;
			style?: string;
		};
	}
}
