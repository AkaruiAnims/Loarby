import { loarbyInitializer } from "./loarbyCore.js";

const loarbCore = new loarbyInitializer("./config.json");
let running = true;

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function mainLoop() {
  while (running) {
    await loarbCore.Update();
    await sleep(1000); // 1-second tick
  }
}

mainLoop();
