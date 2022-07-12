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
          parents: folderId
        },
        media: {
          mimeType: 'image/jpg',
          body: image, // for test fs.createReadStream(path.join(__dirname, '../images/background.jpg'))
        },
      });
  
      response.then(function (res) {
       console.log(res.data);
      }).catch((err) =>  {
        console.log(err);
      })     
    });
  }

function deleteImage(imageId) {

    drive.then(drive => {
      const response = drive.files.delete({
        fileId: imageId,
      });
  
      response.then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.error(err)
      })
    }) 
}

function getImage(imageId) {

  drive.then(drive => {

      drive.files.get({
        fileId: imageId,
        alt: 'media',
      })
      .then(image => {
        photo = image;
        console.log(image.data.webContentLink);
        console.log(image.data.webViewLink);

        return image;
          
      }).catch(err => console.log(err));
  });
}

module.exports = {
    uploadImage,
    deleteImage,
    getImage
}