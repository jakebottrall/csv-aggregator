import fs from 'fs';
import getConfig from './getConfig';
import getFiles from './getFiles';
import reduceFiles from './reduceFiles';

const init = async () => {
  try {
    const config = getConfig();
    const files = await getFiles(config.sourceDirectory);
    const csv = await reduceFiles(config, files);

    fs.writeFileSync(`${config.destinationDirectory}/${config.destinationFilename}.csv`, csv);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

init();
