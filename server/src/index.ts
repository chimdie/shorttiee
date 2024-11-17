import { app } from "./app";
import { appEnv } from "./config/env.config";

app.listen(appEnv.PORT ?? 4000);
