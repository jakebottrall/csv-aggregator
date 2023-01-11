import getConfig from './getConfig';
import getFiles from './getFiles';

const init = async () => {
  try {
    const config = getConfig();
    const files = await getFiles(config.sourceDirectory);
    console.log('🚀 ~ files', files);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

init();
