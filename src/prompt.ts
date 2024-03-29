import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function question(query: string) {
  return new Promise<string>((res) => rl.question(`${query}\n`, res));
}

export async function yesOrNo(query: string) {
  const res = await question(query);
  return ["y", "yes"].includes(res);
}
