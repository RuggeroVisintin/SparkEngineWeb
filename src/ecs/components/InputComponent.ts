import { Type } from "../../core";
import { KeyEvent, KeyStatusMap, KeyboardDevice } from "../../platform/inputs";
import { BaseComponent } from "./BaseComponent";

type OnInputEventTriggeredCallback = (keyStatusMap: KeyStatusMap) => void;

/**
 * @category Components
 */
@Type('InputComponent')
export class InputComponent extends BaseComponent {
    public onInputEventCb: OnInputEventTriggeredCallback | undefined;

    public update(inputDevice: KeyboardDevice): void {
        inputDevice.pushInputListener((keyStatusMap) => this.onKeyUpdate(keyStatusMap));
    }

    private onKeyUpdate(keyStatusMap: KeyStatusMap): void {
        if (!this.onInputEventCb) return;

        this.onInputEventCb(keyStatusMap);
    }
}