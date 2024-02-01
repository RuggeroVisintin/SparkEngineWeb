import { SoundComponent, SoundLoader } from "../../../../src";
import '../../__mocks__';

describe('ecs/components/SoundComponent', () => {
    describe('.play()', () => {
        it.todo('Should flag the sound as playing');
    })

    describe('.update()', () => {
        it.todo('Should push the sound into the SoundSystem if playing');
        it.todo('Should skip the sound if asset not loaded');
        it.todo('Should skip the sound if not playing');
    })

    describe('.load', () => {
        it('Should load the sound from the given path', (done) => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            soundComponent.load();

            // await to emulate load
            setTimeout(() => {
                expect(soundComponent.asset).not.toBe(null);
                done();
            }, 10);
        });
    })
})