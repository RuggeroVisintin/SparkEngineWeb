import { KeyEvent, KeyStatus, KeyboardDevice } from "../../../../src";

describe('platform/inputs/KeyboardDevice', () => {
    let keyboardDevice = new KeyboardDevice();

    beforeEach(() => {
        keyboardDevice = new KeyboardDevice();
    })

    describe('.pushInputListener()', () => {
        it('Should register a new inputListener in the listener list', () => {
            const callback = jest.fn((event: KeyEvent) => {});

            keyboardDevice.pushInputListener(callback);

            expect(keyboardDevice.listeners).toContain(callback);
        });
    })

    describe('.update()', () => {
        it('Should invoke the listener when a button is pressed down', () => {
            const callback = jest.fn((event: KeyEvent) => {});

            keyboardDevice.pushInputListener(callback);

            const event = new KeyboardEvent('keydown', { code: 'KeyA' });
            window.dispatchEvent(event);

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledWith({
                code: 'KeyA',
                status: KeyStatus.Down
            });
        });


        it('Should invoke the listener when a button is released', () => {
            const callback = jest.fn((event: KeyEvent) => {});

            keyboardDevice.pushInputListener(callback);

            const event = new KeyboardEvent('keyup', { code: 'KeyA' });
            window.dispatchEvent(event);

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledWith({
                code: 'KeyA',
                status: KeyStatus.Up
            });
        });

        it('Should invoke the listener with only the latest status of the key', () => {
            const callback = jest.fn((event: KeyEvent) => { });

            keyboardDevice.pushInputListener(callback);

            const keyDownEvent = new KeyboardEvent('keydown', { code: 'KeyA' });
            const keyUpEvent = new KeyboardEvent('keyup', { code: 'KeyA' });
            
            window.dispatchEvent(keyDownEvent);
            window.dispatchEvent(keyUpEvent);

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledWith({
                code: 'KeyA',
                status: KeyStatus.Up
            });

            expect(callback).not.toHaveBeenCalledWith({
                code: 'KeyA',
                status: KeyStatus.Down
            })
        });

        it('Should cleanup all listeners after an update', () => {
            const callback = jest.fn((event: KeyEvent) => {});

            keyboardDevice.pushInputListener(callback);
            keyboardDevice.update();

            expect(keyboardDevice.listeners).toBeEmpty();
        })
    })
})