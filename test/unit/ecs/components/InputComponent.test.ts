import { InputComponent, KeyStatus } from "../../../../src";

describe('ecs/components/InputComponent', () => {
    const inputComponent = new InputComponent();

    describe('.update()', () => {
        it('Should invoke the onInputEventCb when a key is pressed down', () => {
            const onInputCb = jest.fn();

            inputComponent.onInputEventCb = onInputCb;

            const event = new KeyboardEvent('keydown', { code: 'KeyA' });
            window.dispatchEvent(event);

            expect(onInputCb).toHaveBeenCalledWith({
                status: KeyStatus.Down,
                code: 'KeyA'
            });
        });

        it('Should invoke the onInputEventCb when a key is released', () => {
            const onInputCb = jest.fn();
            
            inputComponent.onInputEventCb = onInputCb;

            const event = new KeyboardEvent('keyup', { code: 'KeyA' });
            window.dispatchEvent(event);

            expect(onInputCb).toHaveBeenCalledWith({
                status: KeyStatus.Up,
                code: 'KeyA'
            });
        });

        it.todo('Should push an InputListener into the InputSystem');
    })
})