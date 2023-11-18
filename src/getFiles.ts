import { readdir } from 'node:fs/promises';
import path from 'node:path';

const getFiles = async (sourceDirectory: string) => {
  const files = await readdir(sourceDirectory);
  const csvFiles = files.filter((file) => path.extname(file).toLowerCase() === '.csv');
  return csvFiles;
};

export default getFiles;
