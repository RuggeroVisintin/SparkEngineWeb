import { InputComponent, InputSystem, KeyStatus, KeyboardDevice } from "../../../../src";

describe('ecs/systems/InputSystem', () => {
    const inputDevice = new KeyboardDevice();
    let inputSystem = new InputSystem(inputDevice);

    beforeEach(() => {
        inputSystem = new InputSystem(inputDevice);
    })

    describe('.update()', () => {
        it('Should update each component registered into the system', () => {
            const inputComponent = new InputComponent();
            const spyUpdate = jest.spyOn(inputComponent, 'update');

            inputSystem.registerComponent(inputComponent);
            inputSystem.update();

            expect(spyUpdate).toHaveBeenCalled();
        });

         it('Should trigger the inputDevice update', () => {
            const fakeCb = jest.fn();
            const inputComponent = new InputComponent();
            inputComponent.onInputEventCb = fakeCb;
            
            const event = new KeyboardEvent('keydown', { code: 'KeyA' });
            window.dispatchEvent(event);

            inputSystem.registerComponent(inputComponent);
            inputSystem.update();

             expect(fakeCb).toHaveBeenCalledWith({
                'KeyA': KeyStatus.Down
            });
        })
    })
})