import { InputComponent, KeyStatusMap, KeyboardDevice, SerializableCallback } from "../../../../src";

describe('ecs/components/InputComponent', () => {
    let inputDevice = new KeyboardDevice();
    let inputComponent = new InputComponent();

    beforeEach(() => {
        inputDevice = new KeyboardDevice();
        inputComponent = new InputComponent();
    })

    describe('.constructor()', () => {
        it('Should use the onInputEventCb callback if provided', () => {
            const onInputCb = SerializableCallback.fromFunction((e: KeyStatusMap) => { });
            const inputComponentWithCb = new InputComponent({
                onInputEventCb: onInputCb
            });


            expect(inputComponentWithCb.onInputEventCb?.toString()).toEqual(onInputCb.toString());
        });
    });

    describe('.update()', () => {
        it('Should push a listener in the inputDevice', () => {
            const onInputCb = jest.fn((e: KeyStatusMap) => { });

            inputComponent.onInputEventCb = SerializableCallback.fromFunction(onInputCb);
            inputComponent.update(inputDevice);

            expect(inputDevice.listeners.length).toBe(1);
        });
    })

    describe('.toJson()', () => {
        it('Should return the JSON representation of the component', () => {
            inputComponent.onInputEventCb = SerializableCallback.fromFunction((e: KeyStatusMap) => {
                console.log('Input event triggered', e);
            });

            const json = inputComponent.toJson();

            expect(json).toEqual({
                __type: 'InputComponent',
                onInputEventCb: inputComponent.onInputEventCb?.toJson()
            });
        });
    })
})