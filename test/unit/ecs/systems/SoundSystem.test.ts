import { DOMSoundLoader, SoundComponent, SoundSystem } from "../../../../src";
import '../../__mocks__';

describe('ecs/systems/SoundSystem', () => {
    let soundSystem: SoundSystem;

    beforeAll(() => {
        soundSystem = new SoundSystem(
            new DOMSoundLoader()
        );
    });

    describe('.update()', () => {
        it('Should trigger the sound in queue', () => {
            const soundComponent = new SoundComponent({
                filePath: 'test.mp3',
            });

            jest.spyOn(soundComponent, 'update');

            soundSystem.registerComponent(soundComponent);
            soundSystem.update();

            expect(soundComponent.update).toHaveBeenCalledOnce();
        });

        it('Should load the sound asset if not already loaded', async () => {
            const soundComponent = new SoundComponent({
                filePath: 'test.mp3',
            });

            soundSystem.registerComponent(soundComponent);
            soundSystem.update();

            await new Promise(resolve => setTimeout(resolve, 10));

            expect(soundComponent.isLoaded).toBe(true);
        });

        it('Should avoid loading the sound asset if already loaded', async () => {
            const soundComponent = new SoundComponent({
                filePath: 'test.mp3',
            });

            jest.spyOn(soundComponent, 'load');


            soundSystem.registerComponent(soundComponent);
            soundSystem.update();

            await new Promise(resolve => setTimeout(resolve, 10));

            soundSystem.update();

            expect(soundComponent.load).toHaveBeenCalledOnce();
        });

        it('Should avoid loading the sound asset if already loading', async () => {
            const soundComponent = new SoundComponent({
                filePath: 'test.mp3',
            });

            jest.spyOn(soundComponent, 'load');

            soundSystem.registerComponent(soundComponent);
            soundSystem.update();

            soundSystem.update();

            expect(soundComponent.load).toHaveBeenCalledOnce();
        });
    })
})