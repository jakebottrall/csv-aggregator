import { exec } from "node:child_process";
import { promisify } from "node:util";

const asyncExec = promisify(exec);

const copyToClipboard = async (data: string) => {
  await asyncExec(`pbcopy ${data}`);
};

export default copyToClipboard;
