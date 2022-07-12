const { google } = require('googleapis');
const path = require('path');

async function drive() {
  
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../../google-drive-service.json'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    var drive = await google.drive({ version: 'v3', auth })

    return drive;
};

module.exports = drive();
