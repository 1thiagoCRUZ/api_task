const fs = require('fs');
const { minify } = require('terser');
const folders = ['controllers', 'routes', 'services'];
const customFolders = ['config']; 

folders.concat(customFolders).forEach(folder => {
    fs.readdirSync(folder).forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = `${folder}/${file}`;
        const code = fs.readFileSync(filePath, 'utf8');
        minify(code)
          .then(minified => {
            const distFolder = `dist/${folder}`;
            if (!fs.existsSync(distFolder)) {
              fs.mkdirSync(distFolder, { recursive: true });
            }
            fs.writeFileSync(`${distFolder}/${file}`, minified.code);
            console.log(`Minified ${filePath}`);
          })
          .catch(error => {
            console.error(`Error minifying ${filePath}:`, error);
          });
      }
    });
  });