import { rejects } from "assert";
import { SoundLoader } from "../../../../src";

describe('platform/sfx/SoundLoader', () => {
    beforeEach(() => {
        global.Audio = jest.fn().mockImplementation(() => ({
            oncanplay: jest.fn(),
            onerror: jest.fn().mockRejectedValue(new Error('Error')),
            pause: jest.fn(),
            play: jest.fn(),
            load: jest.fn(function () {
                this.oncanplay();
            })
        }))
    })

    describe('.load', () => {
        it('Should return a SoundAsset once loaded', async () => {        
            const soundLoader = new SoundLoader();
            const soundAsset = await soundLoader.load('test.mp3');
            expect(soundAsset).toBeDefined();
        })

        it('Should throw an Error if the SoundAsset is not found', async () => {
            global.Audio = jest.fn().mockImplementation(() => ({
                onerror: jest.fn(),
                load: jest.fn(function () {
                    this.onerror(new Error('Error'));
                })
            }))

            const soundLoader = new SoundLoader();
            await expect(async () => {
                await soundLoader.load('test.mp3');
            }).rejects.toThrow('Error');
        })
    })
})