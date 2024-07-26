import { Type } from "../../core";
import {  KeyStatusMap, KeyboardDevice } from "../../platform/inputs";
import { BaseComponent } from "./BaseComponent";

type OnInputEventTriggeredCallback = (keyStatusMap: KeyStatusMap) => void;

/**
 * @category Components
 */
@Type('InputComponent')
export class InputComponent extends BaseComponent {
    public onInputEventCb: OnInputEventTriggeredCallback | undefined;

    public update(inputDevice: KeyboardDevice): void {
        // TODO: Does it make sense to push listeners instead of checking the map directly?
        inputDevice.pushInputListener((keyStatusMap) => this.onKeyUpdate(keyStatusMap));
    }

    private onKeyUpdate(keyStatusMap: KeyStatusMap): void {
        if (!this.onInputEventCb) return;

        this.onInputEventCb(keyStatusMap);
    }
}