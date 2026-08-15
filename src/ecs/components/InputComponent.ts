import { Optional, SerializableCallback, WithType } from "../../core";
import { KeyStatusMap, KeyboardDevice } from "../../platform/inputs";
import { BaseComponent } from "./BaseComponent";
import { Component } from "./interfaces";

type OnInputEventTriggeredCallback = SerializableCallback<(keyStatusMap: KeyStatusMap) => void>;

interface InputComponentProps {
    onInputEventCb?: OnInputEventTriggeredCallback;
}

/**
 * @category Components
 */
@Component('InputComponent')
export class InputComponent extends BaseComponent {

    /**
     * Callback to invoke when a key event is triggered. 
     * The callback will be called with the current key status map as parameter.
     */
    @Optional(SerializableCallback)
    public onInputEventCb?: OnInputEventTriggeredCallback;

    public constructor(props?: InputComponentProps) {
        super();

        if (props?.onInputEventCb) this.onInputEventCb = props.onInputEventCb.bind(this);
    }

    public update(inputDevice: KeyboardDevice): void {
        // TODO: Does it make sense to push listeners instead of checking the map directly?
        inputDevice.pushInputListener((keyStatusMap) => this.onKeyUpdate(keyStatusMap));
    }

    private onKeyUpdate(keyStatusMap: KeyStatusMap): void {
        console.log('onInputEventCb', this.onInputEventCb);
        if (!this.onInputEventCb) return;

        this.onInputEventCb.call(this, keyStatusMap);
    }

    public toJson(): WithType<InputComponentProps> {
        return {
            ...super.toJson(),
            onInputEventCb: this.onInputEventCb?.toJson()
        };
    }
}