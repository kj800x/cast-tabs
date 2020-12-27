import express from "express";
import http from "http";
import path from "path";
import process from "process";
import * as localproxy from "@kj800x/localproxy-client";

import { apolloServer } from "./schema";

async function main() {
  const PORT = await localproxy.getAvailablePort();

  const expressApp = express();
  const httpServer = http.createServer(expressApp);

  apolloServer.applyMiddleware({
    app: expressApp,
    path: "/song/graphql",
    bodyParserConfig: {
      limit: "10mb",
    },
  });
  apolloServer.installSubscriptionHandlers(httpServer);

  const localproxyConfig = {
    id: "song",
    name: "Song",
    pid: process.pid,
    routes: [
      {
        static: true,
        route: "/song",
        staticDir: path.resolve(__dirname, "../../ui/build/"),
        indexFallback: true,
        priority: 0,
        type: "ui",
      },
      {
        static: false,
        route: "/song/graphql",
        hostname: "localhost",
        port: PORT,
        trimRoute: false,
        priority: 0,
        type: "api",
      },
    ],
  };

  const runningHttpServer = httpServer.listen(PORT, async () => {
    console.log(
      `🚀 Server ready at http://localhost/song and http://localhost/song/graphql (proxy to http://localhost:${PORT})`
    );
    localproxy.register(localproxyConfig);
  });

  process.on("SIGINT", () => {
    localproxy.deregister(localproxyConfig);
    runningHttpServer.close();
    process.exit(0);
  });
}

main().catch(console.error);
