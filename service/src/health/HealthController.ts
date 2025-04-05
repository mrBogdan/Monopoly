import { Controller } from '../decorators/Controller';
import { Get } from '../http/Get';

@Controller('health')
export class HealthController {
  @Get()
  public getHealth(): {message: string} {
    return {message: 'OK'};
  }
}
