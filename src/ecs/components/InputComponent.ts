import { Type } from "../../core";
import { KeyEvent, KeyStatus, KeyboardDevice } from "../../platform/inputs";
import { BaseComponent } from "./BaseComponent";

type OnInputEventTriggeredCallback = (event: KeyEvent) => void;

/**
 * @category Components
 */
@Type('InputComponent')
export class InputComponent extends BaseComponent {
    public onInputEventCb: OnInputEventTriggeredCallback | undefined;

    constructor() {
        super();
    }

    public update(inputDevice: KeyboardDevice): void {
        inputDevice.pushInputListener((e) => this.onKeyUpdate(e));
    }

    private onKeyUpdate(event: KeyEvent): void {
        if (!this.onInputEventCb) return;

        this.onInputEventCb(event);
    }
}