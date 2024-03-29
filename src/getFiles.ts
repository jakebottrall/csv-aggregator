import fs from "node:fs";
import path from "node:path";

export function getFiles(sourceDirectory: string) {
  const files = fs.readdirSync(sourceDirectory);
  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv",
  );
  return csvFiles;
}
