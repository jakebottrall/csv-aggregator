import { exec } from "node:child_process";

export function copyToClipboard(data: string) {
  const process = exec("pbcopy");
  process.stdin?.write(data);
  process.stdin?.end();
}
