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

        it.each([
            ['keydown', 'KeyA'],
            ['keyup', 'KeyA'],
            ['keydown', 'ArrowUp'],
            ['keyup', 'ArrowUp'],
            ['keydown', 'ArrowDown'],
            ['keyup', 'ArrowDown']
        ])('Should invoke the listener only once when "%s" event is repeated for key "%s"', (status, keyCode) => {
            const callback = jest.fn((event: KeyEvent) => { });

            keyboardDevice.pushInputListener(callback);

            const event = new KeyboardEvent(status, { code: keyCode, repeat: true });
            window.dispatchEvent(event);

            keyboardDevice.update();

            // Emulating the key being pressed
            window.dispatchEvent(event);
            window.dispatchEvent(event);
            window.dispatchEvent(event);

            keyboardDevice.pushInputListener(callback);
            keyboardDevice.update();

            expect(callback).toHaveBeenCalledOnce();
        });

        it('Should correctly compute the final key status when different states are quickly being generated for the same Key', () => {
            const callback = jest.fn((event: KeyEvent) => { });

            keyboardDevice.pushInputListener(callback);

            // simulating the same key being quickly pressed up and down 
            const events = [
                ['keydown', 'KeyA'],
                ['keyup', 'KeyA'],
                ['keydown', 'KeyA'],
                ['keyup', 'KeyA'],
                ['keydown', 'KeyA'],
                ['keyup', 'KeyA']
            ];

            events.forEach(([keyStatus, keyCode]) => {
                const event = new KeyboardEvent(keyStatus, { code: keyCode });
                window.dispatchEvent(event);
            });

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledExactlyOnceWith({
                status: KeyStatus.Up,
                code: 'KeyA'
            });
        })

        it('Should cleanup all listeners after an update', () => {
            const callback = jest.fn((event: KeyEvent) => { });

            keyboardDevice.pushInputListener(callback);
            keyboardDevice.update();

            expect(keyboardDevice.listeners).toBeEmpty();
        });
    })
})