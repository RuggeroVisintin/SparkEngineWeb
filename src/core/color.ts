export class Color {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;

    public set r(value: number) {
        this._r = this.capValue(value);
    }

    public get r(): number {
        return this._r;
    }

    public set g(value: number) {
        this._g = this.capValue(value);
    }

    public get g(): number {
        return this._g;
    }

    public set b(value: number) {
        this._b = this.capValue(value);
    }

    public get b(): number {
        return this._b;
    }

    private capValue(value: number): number {
        if (value > 255) {
            value = 255;
        } else if(value < 0) {
            value = 0;
        }

        return value;
    }
}