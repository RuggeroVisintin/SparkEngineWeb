import { SoundAsset } from "../../../../src";

describe('platform/sfx/SoundAsset', () => {
    describe('.play()', () => {
        it('Should play the given media', () => {
            jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation();

            const soundAsset = new SoundAsset(new Audio('test.mp3'));
            soundAsset.play();

            expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
        });

        it('Should replay the sound from the start', () => {
            const soundAsset = new SoundAsset(new Audio('test.mp3'));
            soundAsset.media.currentTime = 15;

            soundAsset.play();
            expect(soundAsset.media.currentTime).toBe(0);
        })
    })
})