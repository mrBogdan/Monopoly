import { SECURE_PARAM, Security } from '../../../decorators';
import { Get } from '../../../http';

class Shape {
    @Get('/color')
    @Security()
    getColor() {
        return 'GetColor()';
    }
}

describe('Get decorator', () => {
    it('should define metadata', () => {
        const secureParam = Reflect.getMetadata(SECURE_PARAM, Shape.prototype, 'getColor');
        expect(secureParam).toBe(true);
    });
});
