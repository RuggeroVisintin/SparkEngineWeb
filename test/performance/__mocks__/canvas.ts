export class Canvas {
	getContext(): CanvasRenderingContext2D {
		return {
			rect: function () { },
			fillRect: function () { },
			clearRect: function () { },
			// @ts-ignore
			getImageData: function (x: number, y: number, w: number, h: number) {
				return {
					data: new Array(w * h * 4)
				};
			},
			putImageData: function () { },
			// @ts-ignore
			createImageData: function () { return [] },
			setTransform: function () { },
			drawImage: function () { },
			save: function () { },
			fillText: function () { },
			restore: function () { },
			beginPath: function () { },
			moveTo: function () { },
			lineTo: function () { },
			closePath: function () { },
			stroke: function () { },
			translate: function () { },
			scale: function () { },
			rotate: function () { },
			arc: function () { },
			fill: function () { },
			resetTransform: function () { },
		};
	}
}