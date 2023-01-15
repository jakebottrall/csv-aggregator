import copyToClipboard from './copyToClipboard';
import getConfig from './getConfig';
import getFiles from './getFiles';
import reduceFiles from './reduceFiles';

const init = async () => {
  try {
    const config = getConfig();
    const files = await getFiles(config.sourceDirectory);
    const csv = await reduceFiles(config, files);

    copyToClipboard(csv);
    console.log('csv copied to clipboard ✅');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

init();
