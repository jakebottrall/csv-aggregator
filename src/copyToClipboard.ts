import { exec } from "node:child_process";

const copyToClipboard = (data: string) => {
  const process = exec("pbcopy");
  process.stdin?.write(data);
  process.stdin?.end();
};

export default copyToClipboard;
