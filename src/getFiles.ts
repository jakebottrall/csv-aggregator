import fs from "node:fs";
import path from "node:path";

const getFiles = (sourceDirectory: string) => {
  const files = fs.readdirSync(sourceDirectory);
  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv",
  );
  return csvFiles;
};

export default getFiles;
