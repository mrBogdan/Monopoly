import 'reflect-metadata';

import { SECURE_PARAM } from '../../../decorators/constants';
import { Security } from "../../../decorators/Security";
import { Get } from "../../../decorators/Get";

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
