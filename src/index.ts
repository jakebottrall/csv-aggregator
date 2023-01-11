import getConfig from './getConfig';

const init = async () => {
  try {
    const config = getConfig();
    console.log('🚀 ~ config', config);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

init();
