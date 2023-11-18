import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const question = (query: string) =>
  new Promise<string>((res) => rl.question(`${query}\n`, res));

export const yesOrNo = async (query: string) => {
  const res = await question(query);
  return ['y', 'yes'].includes(res);
};
