const guessDelimiter = (text: string) => {
  const possibleDelimiters = [",", ";", "\t"].filter((delimiter) => {
    let cache = -1;

    return text.split("\n").every((line) => {
      if (!line) {
        return true;
      }

      const length = line.split(delimiter).length;

      if (cache < 0) {
        cache = length;
      }

      return cache === length && length > 1;
    });
  });

  return possibleDelimiters[0];
};

const csvParser = (csv: string, startingRowIndex: number) => {
  const normalizedCSV = csv
    .split("\r")
    .join("\n")
    .split("'")
    .join("")
    .split('"')
    .join("");
  const delimiter = guessDelimiter(normalizedCSV);

  return normalizedCSV
    .split("\n")
    .filter((line) => line)
    .slice(startingRowIndex)
    .reduce((a, c) => [...a, c.split(delimiter)], [] as string[][]);
};

export default csvParser;
