const copyToClipboard = async (data: string) => {
  const proc = Bun.spawn(['pbcopy'], { stdin: 'pipe' });
  proc.stdin.write(data);
  await proc.exited;
};

export default copyToClipboard;
