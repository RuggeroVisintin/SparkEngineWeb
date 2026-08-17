import { DOMSoundLoader, SoundComponent, SoundComponentProps } from "../../../../src";
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
            soundComponent.load(new DOMSoundLoader());

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
            soundComponent.load(new DOMSoundLoader());

            setTimeout(() => {
                jest.spyOn(soundComponent.asset!, 'play');

                soundComponent.update();

                expect(soundComponent.asset!.play).not.toHaveBeenCalled();
                done();
            }, 10);
        });

        it('Should not be playing anymore after the update', (done) => {
            soundComponent.load(new DOMSoundLoader());

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
        });
    })

    describe('.load', () => {
        it('Should load the sound from the given path', (done) => {
            soundComponent.load(new DOMSoundLoader());

            // await to emulate load
            setTimeout(() => {
                expect(soundComponent.asset).not.toBe(null);
                done();
            }, 10);
        });

        it('Should set the isLoading flag to true while loading', (done) => {
            soundComponent.load(new DOMSoundLoader());

            expect(soundComponent.isLoading).toBe(true);

            setTimeout(() => {
                expect(soundComponent.isLoading).toBe(false);
                done();
            }, 10);
        });

        it('Should not load apply the loaded asset if the filePath was changed in the meantime', (done) => {
            soundComponent.load(new DOMSoundLoader());
            soundComponent.filePath = 'test2.mp3';

            setTimeout(() => {
                expect(soundComponent.asset).toBe(null);
                done();
            }, 10);
        });
    })

    describe('.toJson()', () => {
        it('Should return the correct JSON representation', () => {
            const json: SoundComponentProps = soundComponent.toJson();

            expect(json).toEqual({
                __type: 'SoundComponent',
                filePath: 'test.mp3'
            });
        });
    })

    describe('.filePath', () => {
        it('Should reset the asset if the filePath is changed', async () => {
            soundComponent.load(new DOMSoundLoader());
            soundComponent.play();

            await new Promise(resolve => setTimeout(resolve, 10));

            soundComponent.filePath = 'test2.mp3';

            expect(soundComponent.isLoaded).toBe(false);
            expect(soundComponent.asset).toBe(null);
            expect(soundComponent.isPlaying).toBe(false);
        });

        it('Should set the filePath correctly', () => {
            soundComponent.filePath = 'test2.mp3';

            expect(soundComponent.filePath).toBe('test2.mp3');
        });

        it('Should reset the loading state if the filePath is changed', () => {
            soundComponent.load(new DOMSoundLoader());

            soundComponent.filePath = 'test2.mp3';

            expect(soundComponent.isLoading).toBe(false);
        });
    });

    describe('.isLoaded', () => {
        it('Should return true if the asset is loaded', (done) => {
            soundComponent.load(new DOMSoundLoader());

            // await to emulate load
            setTimeout(() => {
                expect(soundComponent.isLoaded).toBe(true);

                done();
            }, 10);
        });

        it('Should return false if no asset is loaded', () => {
            const soundComponentWithoutAsset = new SoundComponent({});

            expect(soundComponentWithoutAsset.isLoaded).toBe(false);
            expect(soundComponent.isLoaded).toBe(false);
        });
    })
})