import 'reflect-metadata';

import { SECURE_PARAM } from '../../../decorators/constants';
import { Get } from '../../../decorators/Get';
import { Security } from '../../../decorators/Security';

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
