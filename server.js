#!/usr/bin/env node
var prerender = require("./lib");

const browserDebuggingPort = 9222;

var server = prerender({
  chromeLocation: "/usr/bin/chromium",
  browserDebuggingPort: browserDebuggingPort,
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=" + browserDebuggingPort,
    "--hide-scrollbars",
    "--no-sandbox",
    "--user-data-dir=remote-profile",
    "--disable-web-security",
  ],
  port: 3000,
  logRequests: true,
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
