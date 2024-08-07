import { InputComponent, KeyStatusMap, KeyboardDevice } from "../../../../src";

describe('ecs/components/InputComponent', () => {
    let inputDevice = new KeyboardDevice();
    let inputComponent = new InputComponent();
    
    beforeEach(() => {
        inputDevice = new KeyboardDevice();
        inputComponent = new InputComponent();
    })

    describe('.update()', () => {
        it('Should push a listener in the inputDevice', () => {
            const onInputCb = jest.fn((e: KeyStatusMap) => { });

            inputComponent.onInputEventCb = onInputCb;
            inputComponent.update(inputDevice);

            expect(inputDevice.listeners.length).toBe(1);
        });
    })

    describe('.toJson()', () => {
        it('Should return the JSON representation of the component', () => {
            const json = inputComponent.toJson();

            expect(json).toEqual({
                __type: 'InputComponent'
            });
        });
    })
})