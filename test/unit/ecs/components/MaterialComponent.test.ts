import { ImageAsset, ImageLoader, MaterialComponent, MaterialComponentProps, Rgb } from "../../../../src";
import '../../__mocks__';

describe('/ecs/components/MaterialComponent', () => {
    describe('constructor()', () => {
        it('Should construct a new Material component from given props', () => {
            const init: MaterialComponentProps = {
                diffuseColor: new Rgb(255, 255, 255),
                opacity: 100,
                diffuseTexturePath: 'path/to/texture.png'
            }
        
            const component = new MaterialComponent(init);
        
            expect(component.diffuseColor).toEqual(init.diffuseColor);
            expect(component.opacity).toEqual(init.opacity);
            expect(component.diffuseTexturePath).toEqual(init.diffuseTexturePath);
        });

        it('Should set the diffuse color to the default value when not provided', () => {
            expect(new MaterialComponent().diffuseColor).toEqual(Rgb.fromHex('#d16cd8'));
        });

        it('Should set opacity to the max if not specified', () => {
            expect(new MaterialComponent().opacity).toEqual(100);
        })
    })
    
    describe('set .diffuseTexturePath', () => {
        it('Should remove the old texture', (done) => {
            const component = new MaterialComponent({
                diffuseTexturePath: 'path/to/texture.png',
            });

            component.loadTexture(new ImageLoader);

            setTimeout(() => {
                component.diffuseTexturePath = 'path/to/texture2.png';
                expect(component.diffuseTexture).toBeUndefined();
                done();
            }, 10)
            
        })

        it('Should remove the diffuseColor if default one is in use', () => {
            const component = new MaterialComponent({
                diffuseTexturePath: 'path/to/texture.png',
            });

            expect(component.diffuseColor).toBeUndefined();
        });

        it.todo('Should retain the diffuseColor if set by the user');
    })

    describe('loadTexture()', () => {
        it('Should load the diffuseTexture asset', (done) => {
            const component = new MaterialComponent({
                diffuseTexturePath: 'path/to/texture.png',
            });

            component.loadTexture(new ImageLoader());

            setTimeout(() => {
                expect(component.diffuseTexture).toBeInstanceOf(ImageAsset);
                done();
            }, 10);

        })
    })

    describe('.toJson()', () => {
        it('Should return the JSON representation of the component', () => {
            const component = new MaterialComponent({
                diffuseColor: new Rgb(255, 0, 0),
                opacity: 50,
                diffuseTexturePath: 'path/to/texture.png'
            });

            expect(component.toJson()).toEqual({
                __type: 'MaterialComponent',
                diffuseColor: {
                    r: 255,
                    g: 0,
                    b: 0
                },
                opacity: 50,
                diffuseTexturePath: 'path/to/texture.png'
            })
        })
    })
})