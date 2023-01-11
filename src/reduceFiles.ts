import dayjs from 'dayjs';
import fs from 'fs';
import csvParser from './csvParser';
import { Config } from './getConfig';
import { question } from './prompt';

const reduceFiles = async (config: Config, files: string[]) => {
  let csv = '';

  if (config.includeHeaders) {
    csv = config.columns.reduce((a, c) => `${a},${c.name}`, '');
    csv += '\n';
  }

  const sourceConfigOptions = config.sourceOptions.reduce(
    (a, c, i) => `${a}\n${i + 1}. ${c.name}`,
    '',
  );

  for (const filename of files) {
    const selectedSourceOptions = await question(
      `Which source config would you like to use for ${filename}?\n${sourceConfigOptions}`,
    );

    const sourceOptions = config.sourceOptions[+selectedSourceOptions - 1];

    const fileString = fs.readFileSync(`${config.sourceDirectory}/${filename}`, 'utf-8');
    const csvArray = csvParser(fileString, sourceOptions.startingRowIndex);

    const csvString = csvArray.reduce((str, row) => {
      config.columns.forEach((col, i) => {
        const sourceCol = sourceOptions.columns.find((c) => c.destinationName === col.name);

        const value = row[sourceCol?.columnIndex ?? -1] || '';

        switch (col.type) {
          case 'date':
            str += dayjs(value, sourceCol?.format).format(col.format);
            break;
          case 'string':
          case 'number':
            str += value;
            break;
          case 'static':
            str += sourceCol?.value || '';
            break;
          default:
            break;
        }

        if (i !== config.columns.length - 1) {
          str += ',';
        } else {
          str += '\n';
        }
      });

      return str;
    }, '');

    csv += csvString;
  }

  return csv;
};

export default reduceFiles;
