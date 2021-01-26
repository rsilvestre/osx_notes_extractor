const fs = require('fs');

module.exports = {
  createDirectory: (dir) => {

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },
  mapDayFR: {
    janvier: '01',
    'février': '02',
    mars: '03',
    avril: '04',
    mai: '05',
    juin: '06',
    juillet: '07',
    'août': '08',
    septembre: '09',
    octobre: '10',
    novembre: '11',
    'décembre': '12'
  }
}