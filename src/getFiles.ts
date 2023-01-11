import fs from 'fs';
import path from 'path';

const { readdir } = fs.promises;

const getFiles = async (sourceDirectory: string) => {
  const files = await readdir(sourceDirectory);
  const csvFiles = files.filter((file) => path.extname(file).toLowerCase() === '.csv');
  return csvFiles;
};

export default getFiles;
