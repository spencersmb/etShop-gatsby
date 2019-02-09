const fs = require('fs-extra')
const path = require('path')

const cacheDir = path.resolve(`./.cache`)

fs.removeSync(cacheDir);