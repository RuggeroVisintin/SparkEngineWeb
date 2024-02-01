import { SoundLoader } from "../../../../src";
import '../../__mocks__';

describe('platform/sfx/SoundLoader', () => {
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