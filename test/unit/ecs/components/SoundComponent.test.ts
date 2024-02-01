import { SoundComponent, SoundLoader } from "../../../../src";
import '../../__mocks__';

describe('ecs/components/SoundComponent', () => {
    describe('.play()', () => {
        it('Should flag the sound as playing', () => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            soundComponent.play();

            expect(soundComponent.isPlaying).toBe(true);
        });
    })

    describe('.update()', () => {
        it('Should play the sound at the next if .play() is triggered', (done) => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            soundComponent.load();

            setTimeout(() => {
                jest.spyOn(soundComponent.asset!, 'play');

                soundComponent.play();
                soundComponent.update();

                expect(soundComponent.asset!.play).toHaveBeenCalled();
                done();
            }, 10);

        });
        
        it('Should skip the sound if asset not loaded', () => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            soundComponent.play();
        });

        it('Should skip the sound if not playing', (done) => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            soundComponent.load();

            setTimeout(() => {
                jest.spyOn(soundComponent.asset!, 'play');

                soundComponent.update();

                expect(soundComponent.asset!.play).not.toHaveBeenCalled();
                done();
            }, 10);
        });

        it('Should not be playing anymore after the update', (done) => {
            const soundComponent = new SoundComponent('test.mp3', new SoundLoader());
            soundComponent.load();

            setTimeout(() => {
                jest.spyOn(soundComponent.asset!, 'play');

                soundComponent.play();
                soundComponent.update();

                expect(soundComponent.isPlaying).toBe(false);
                done();
            }, 10);
        })
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