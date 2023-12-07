export class Color {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 100;

    constructor(
        r = 0, g = 0, b = 0, a = 100
    ) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
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

    public set a(value: number) {
        this._a - this.capAlpha(value);
    }

    public get a(): number {
        return this._a;
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

    static fromHex(hex: string): Color {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ?
            new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : new Color();
    }
    

    public toString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 100})`;
    }
}