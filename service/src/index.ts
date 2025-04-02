import { AppModule } from './AppModule';
import { getGlobalContainer } from './di/globalContainer';
import { Application } from './Application';
import { isDevelopment, isProduction } from './nodejs/getEnv';
import { runServer } from './runServer';

const main = async () => {
  if (isProduction() || isDevelopment()) {
    const app = new Application(
      getGlobalContainer(),
      AppModule,
    );

    process.on('uncaughtException', console.error);

    await app.init();
    await app.run(runServer);
  }
};

main();
