
// const googleAuth = require('google-auth-library');
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');

// var auth = new googleAuth();
// var OAuth2Client = auth.OAuth2;

// const oauth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URL
// );

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

oauth2Client.credentials = {
    refreshToken: process.env.REFRESH_TOKEN
};

const drive = google.drive({
    version:'v3', 
    auth: oauth2Client
});

async function uploadImage() {

   try {
    const res = await drive.files.create(_ =>({
        req: {
            name: 'file_name.png',
            mimeType: 'image/png'
        },
        media: {
            mimeType: 'image/png',
            body: fs.createReadStream(path.join(__dirname, '../../lol.png'))
        }
    }))
    console.log(res) //undefined
   }catch(error) {
    console.error("ERROR : " + error)
   }

   
}

uploadImage()
