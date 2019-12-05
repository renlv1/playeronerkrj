'use strict';
let buildEnv = process.argv.splice(2)[0];
let BASE_PATH;

if (buildEnv === 'prod') {
  BASE_PATH = '"https://api.playerone.ai"'
} else {
  BASE_PATH = '"http://lottery.3243243242.com"'
}

if (process.argv.toString().includes('build')) {
  console.log('\x1b[93m', `正在打包... 请注意：接口为${buildEnv === 'prod' ? '正式环境' : '测试环境，切换到正式环境请执行 npm run build prod'}`)
}
module.exports = {
  NODE_ENV: '"production"',
  BASE_PATH
};
