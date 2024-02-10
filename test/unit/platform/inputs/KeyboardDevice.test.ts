import { KeyEvent, KeyStatus, KeyStatusMap, KeyboardDevice } from "../../../../src";

describe('platform/inputs/KeyboardDevice', () => {
    let keyboardDevice = new KeyboardDevice();

    beforeEach(() => {
        keyboardDevice = new KeyboardDevice();
    })

    describe('.pushInputListener()', () => {
        it('Should register a new inputListener in the listener list', () => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => {});

            keyboardDevice.pushInputListener(callback);

            expect(keyboardDevice.listeners).toContain(callback);
        });
    })

    describe('.update()', () => {
        it('Should invoke the listener when a button is pressed down', () => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => { });

            keyboardDevice.pushInputListener(callback);

            const event = new KeyboardEvent('keydown', { code: 'KeyA' });
            window.dispatchEvent(event);

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledWith({
                'KeyA': KeyStatus.Down
            });
        });


        it('Should invoke the listener when a button is released', () => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => { });

            keyboardDevice.pushInputListener(callback);

            const event = new KeyboardEvent('keyup', { code: 'KeyA' });
            window.dispatchEvent(event);

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledWith({
                'KeyA': KeyStatus.Up
            });
        });

        it('Should invoke the listener with the status map', () => {
            const callback = jest.fn((statusMap: KeyStatusMap) => { });

            keyboardDevice.pushInputListener(callback);

            const keyDownEvent = new KeyboardEvent('keydown', { code: 'KeyA' });
            const keyUpEvent = new KeyboardEvent('keyup', { code: 'KeyA' });
            
            window.dispatchEvent(keyDownEvent);
            window.dispatchEvent(keyUpEvent);

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledWith({
                'KeyA': KeyStatus.Up
            });

            expect(callback).not.toHaveBeenCalledWith({
                'KeyA': KeyStatus.Down
            })
        });

        it('Should invoke the listener just once even if multiple buttons have been pressed', () => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => { });

            keyboardDevice.pushInputListener(callback);

            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));

            keyboardDevice.update();

            expect(callback).toHaveBeenCalledExactlyOnceWith({
                'KeyA': KeyStatus.Down,
                'KeyW': KeyStatus.Down
            });
        })

        it.each([
            ['keydown', 'KeyA'],
            ['keyup', 'KeyA'],
            ['keydown', 'ArrowUp'],
            ['keyup', 'ArrowUp'],
            ['keydown', 'ArrowDown'],
            ['keyup', 'ArrowDown']
        ])('Should invoke the listener on every update when "%s" event is repeated for key "%s"', (status, keyCode) => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => { });

            keyboardDevice.pushInputListener(callback);

            const event = new KeyboardEvent(status, { code: keyCode, repeat: true });
            window.dispatchEvent(event);

            keyboardDevice.update();

            // Emulating the key being kept pressed
            window.dispatchEvent(event);
            window.dispatchEvent(event);
            window.dispatchEvent(event);

            keyboardDevice.pushInputListener(callback);
            keyboardDevice.update();

            expect(callback).toHaveBeenCalledTimes(2);
        });

        it('Should correctly compute the final key status when different states are quickly being generated for the same Key', () => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => { });

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
                'KeyA': KeyStatus.Up
            });
        })

        it('Should cleanup all listeners after an update', () => {
            const callback = jest.fn((keyStatusMap: KeyStatusMap) => { });

            keyboardDevice.pushInputListener(callback);
            keyboardDevice.update();

            expect(keyboardDevice.listeners).toBeEmpty();
        });
    })
})