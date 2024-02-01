import { SoundComponent, SoundLoader, SoundSystem } from "../../../../src";
import '../../__mocks__';

describe('ecs/systems/SoundSystem', () => {
    let soundSystem: SoundSystem;

    beforeAll(() => {
        soundSystem = new SoundSystem();
    });

    describe('.registerComponent', () => {
        it('Should register the component into the system', () => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            
            soundSystem.registerComponent(soundComponent);

            expect(soundSystem.components).toContain(soundComponent);
        });
    })

    describe('.update()', () => {
        it('Should trigger the sound in queue', () => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            jest.spyOn(soundComponent, 'update');

            soundSystem.registerComponent(soundComponent);
            soundSystem.update();

            expect(soundComponent.update).toHaveBeenCalledOnce();
        });
    })
})