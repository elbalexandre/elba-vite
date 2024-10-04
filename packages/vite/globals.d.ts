import type { ElbaConfig } from "./config";

export {};

declare global {
  interface Global {
    config: ElbaConfig; // You can replace 'string' with the type you want
  }

  // Extend globalThis to include the new property
  var config: Global['config'];
}
