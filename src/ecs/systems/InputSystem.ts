import { ISystem } from "./ISystem";
import { InputComponent } from '../components';
import { KeyboardDevice } from "../../platform";
import { BaseSystem } from "./BaseSystem";

/**
 * @category Systems
 */
export class InputSystem extends BaseSystem<InputComponent> implements ISystem {
    constructor(private readonly inputDevice: KeyboardDevice) {
        super();
    }

    protected internalUpdate(): void {
        this.components.forEach(inputComponent => inputComponent.update(this.inputDevice));

        // TODO: void calling update here
        this.inputDevice.update();
    }
}