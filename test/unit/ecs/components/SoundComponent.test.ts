import { SoundComponent, SoundComponentProps, SoundLoader } from "../../../../src";
import '../../__mocks__';

describe('ecs/components/SoundComponent', () => {
    let soundComponent: SoundComponent;

    beforeEach(() => {
        soundComponent = new SoundComponent({
            filePath: 'test.mp3',
        });
    })

    describe('.constructor()', () => { 
        it('Should construct a new SoundComponent from given props', () => {
            const init: SoundComponentProps = {
                filePath: 'test2.mp3'
            }

            const soundComponent = new SoundComponent({
                filePath: 'test2.mp3'
            });

            expect(soundComponent).toEqual(expect.objectContaining(init));
        });
    })

    describe('.play()', () => {
        it('Should flag the sound as playing', () => {
            soundComponent.play();

            expect(soundComponent.isPlaying).toBe(true);
        });
    })

    describe('.update()', () => {
        it('Should play the sound at the next if .play() is triggered', (done) => {
            soundComponent.load(new SoundLoader());

            setTimeout(() => {
                jest.spyOn(soundComponent.asset!, 'play');

                soundComponent.play();
                soundComponent.update();

                expect(soundComponent.asset!.play).toHaveBeenCalled();
                done();
            }, 10);

        });
        
        it('Should skip the sound if asset not loaded', () => {
            soundComponent.play();
        });

        it('Should skip the sound if not playing', (done) => {
            soundComponent.load(new SoundLoader());

            setTimeout(() => {
                jest.spyOn(soundComponent.asset!, 'play');

                soundComponent.update();

                expect(soundComponent.asset!.play).not.toHaveBeenCalled();
                done();
            }, 10);
        });

        it('Should not be playing anymore after the update', (done) => {
            soundComponent.load(new SoundLoader());

            setTimeout(() => {
                soundComponent.play();
                soundComponent.update();

                expect(soundComponent.isPlaying).toBe(false);
                done();
            }, 10);
        })

        it('Should still be playing after the update if the component was not loaded', () => {            
            soundComponent.play();
            soundComponent.update();

            expect(soundComponent.isPlaying).toBe(true);
        })
    })

    describe('.load', () => {
        it('Should load the sound from the given path', (done) => {
            soundComponent.load(new SoundLoader());

            // await to emulate load
            setTimeout(() => {
                expect(soundComponent.asset).not.toBe(null);
                done();
            }, 10);
        });
    })
})