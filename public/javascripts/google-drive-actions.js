const drive = require('./google-drive');
const path = require('path');
const fs = require('fs')

async function uploadImage(folderId, image) {
     
  var request = await drive;  
  var response = request.files.create({
      requestBody: {
        name: 'image',
        mimeType: 'image/*',
        parents: [folderId]
      },
      media: {
        mimeType: 'image/*',
        body: image.buffer //fs.createReadStream(path.join(__dirname, '../images/tmp/' + image))
      },
  });   
  
  // response.then(_ => fs.rmSync(path.join(__dirname, '../images/tmp/' + image)))

  return response;
}

async function deleteImage(imageId) {

  var request = await drive;
  var response = request.files.delete({
        fileId: imageId,
  });
  
  return response;
}

async function getImage(imageId) {

  var request = await drive;
  var response = request.files.get({
        fileId: imageId,
        alt: 'media',
      }, {
        responseType: 'arraybuffer',
        encoding: null
  });

  return response;    
}

module.exports = {
    uploadImage,
    deleteImage,
    getImage
}