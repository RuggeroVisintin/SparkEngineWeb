
/**
 * @category Core
 */
export class Rgb {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;

    constructor(
        r = 0, g = 0, b = 0
    ) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public set r(value: number) {
        this._r = this.capRgb(value);
    }

    public get r(): number {
        return this._r;
    }

    public set g(value: number) {
        this._g = this.capRgb(value);
    }

    public get g(): number {
        return this._g;
    }

    public set b(value: number) {
        this._b = this.capRgb(value);
    }

    public get b(): number {
        return this._b;
    }

    static fromHex(hex: string): Rgb {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ?
            new Rgb(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : new Rgb();
    }

    static fromRgb(rgb: Rgb): Rgb {
        return new Rgb(rgb.r, rgb.g, rgb.b);
    }

    public toRgbaString(alpha?: number): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.capAlpha(alpha || 100) / 100})`;
    }

    private capRgb(value: number): number {
        if (value > 255) {
            value = 255;
        } else if(value < 0) {
            value = 0;
        }

        return value;
    }

    private capAlpha(value: number): number {
        if (value > 100) {
            value = 100;
        } else if(value < 0) {
            value = 0;
        }

        return value;
    }
}