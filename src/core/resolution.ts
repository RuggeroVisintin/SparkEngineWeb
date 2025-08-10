import { Vec2 } from "./math";

export class Resolution extends Vec2 {
    get width(): number {
        return this.x;
    }

    get height(): number {
        return this.y;
    }

    set width(value: number) {
        this.x = value;
    }

    set height(value: number) {
        this.y = value;
    }
}