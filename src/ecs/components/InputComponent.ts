import { Type } from "../../core";
import { BaseComponent } from "./BaseComponent";

export enum KeyStatus {
    Up,
    Down
};

interface KeyEvent {
    status: KeyStatus,
    code: string
}

type OnInputEventTriggeredCallback = (event: KeyEvent) => void;

@Type('InputComponent')
export class InputComponent extends BaseComponent {
    public onInputEventCb: OnInputEventTriggeredCallback | undefined;

    constructor() {
        super();

        window.addEventListener("keydown", (e) => this.onKeyDown(e), true);

        window.addEventListener("keyup", (e) => this.onKeyUp(e), true);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this.onInputEventCb) return;

        this.onInputEventCb({
            code: event.code,
            status: KeyStatus.Down,
        })
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (!this.onInputEventCb) return;

        this.onInputEventCb({
            code: event.code,
            status: KeyStatus.Up,
        })
    }
}