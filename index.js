const fs = require('fs');

const rename = (name) => {
  const directory = `./icons/@${name}`;
  const PATTERN_ = `${name}-`;
  const _PATTERN = `-${name}`;
  const PATTERN__REG = new RegExp(PATTERN_, 'g');
  const _PATTERN_REG = new RegExp(_PATTERN, 'g');

  fs.readdir(directory, (error, files) => {
    if (error) {
      throw error;
    }

    for (let file of files) {
      let imgFile = directory + '/' + file;
      let renameFile =
        directory +
        '/' +
        file
          .replace(PATTERN__REG, '')
          .replace(_PATTERN_REG, '')
          .replace(/-default/g, '');

      fs.rename(imgFile, renameFile, function (error) {
        if (error) {
          console.log('ERROR: ' + error);
        }

        console.log(renameFile + ' : File name successfully changed.');
      });
    }
  });
};

(() => {
  rename('color');
  rename('flat');
  rename('high-contrast');
})();
