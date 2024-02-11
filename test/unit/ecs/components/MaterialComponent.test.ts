import { MaterialComponent, MaterialComponentProps, Rgb } from "../../../../src"

describe('/ecs/components/MaterialComponent', () => {
    describe('constructor()', () => {
        it('Should construct a new Material component from given props', () => {
            const init: MaterialComponentProps = {
                diffuseColor: new Rgb(255, 255, 255),
                opacity: 100
            }
        
            const component = new MaterialComponent(init);
        
            expect(component).toEqual(expect.objectContaining(init));
        });

        it('Should set the diffuse color to the default value when not provided', () => {
            expect(new MaterialComponent().diffuseColor).toEqual(Rgb.fromHex('#d16cd8'));
        });

        it('Should set opacity to the max if not specified', () => {
            expect(new MaterialComponent().opacity).toEqual(100);
        })
    })
})