import { appConfig, logger } from "./configs";
import { server } from "./server";

(async () => {
  logger.info("🔗 db connection established");
  server.listen(appConfig.port, () =>
    logger.info(`🚀 app listening to port ${appConfig.port}`)
  );
})();
