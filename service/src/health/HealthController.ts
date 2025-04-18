import { Controller } from '../decorators/Controller';
import { Get } from '../decorators/Get';

@Controller('health')
export class HealthController {
  @Get()
  public getHealth(): {message: string} {
    return {message: 'OK'};
  }
}
