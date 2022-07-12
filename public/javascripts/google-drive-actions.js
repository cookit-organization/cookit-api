const drive = require('./google-drive');

const recipeImages = '1mlqujDjrQktgYRvSXt8IGy1Kh4Hi66wg';
const profileImages = '1Nuy5s8VBBlKMZC2DvB9Xq6B3jU1WN8oQ';

function uploadImage(folderId, image) {

    // folderId by default is recipeImages
    if (folderId === null || folderId === undefined) 
      folderId = [recipeImages]
     
    drive.then(drive => {
      const response = drive.files.create({
        requestBody: {
          name: 'recipe_image.jpg',
          mimeType: 'image/jpg',
          parents: folderId,
          files: 'files(id, thumbnailLink)'
        },
        media: {
          mimeType: 'image/jpg',
          body: image, // for test fs.createReadStream(path.join(__dirname, '../images/background.jpg'))
        },
      });
  
      response.then(function (res) {
        console.log(res.data);

      }).catch((err) =>  console.log(err));    
    }).catch((err) =>  console.log(err));
  }

function deleteImage(imageId) {

    drive.then(drive => {
      const response = drive.files.delete({
        fileId: imageId,
      });
  
      response.then((res) => {
        console.log(res.data)
      }).catch((err) => console.error(err));
    }).catch((err) => console.log(err));
}

async function getImage(imageId) {

  var request = await drive;
  var response = await request.files.get({
        fileId: imageId,
        files: 'files(id, thumbnailLink)',
        alt: 'media',
      });

  return response;    
}

module.exports = {
    uploadImage,
    deleteImage,
    getImage
}