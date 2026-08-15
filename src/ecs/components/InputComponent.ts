import { Optional, SerializableCallback } from "../../core";
import { KeyStatusMap, KeyboardDevice } from "../../platform/inputs";
import { BaseComponent } from "./BaseComponent";
import { Component } from "./interfaces";

type OnInputEventTriggeredCallback = SerializableCallback<(keyStatusMap: KeyStatusMap) => void>;

/**
 * @category Components
 */
@Component('InputComponent')
export class InputComponent extends BaseComponent {
    @Optional(SerializableCallback)
    public onInputEventCb?: OnInputEventTriggeredCallback;

    public update(inputDevice: KeyboardDevice): void {
        // TODO: Does it make sense to push listeners instead of checking the map directly?
        inputDevice.pushInputListener((keyStatusMap) => this.onKeyUpdate(keyStatusMap));
    }

    private onKeyUpdate(keyStatusMap: KeyStatusMap): void {
        if (!this.onInputEventCb) return;

        this.onInputEventCb.call(this, keyStatusMap);
    }
}