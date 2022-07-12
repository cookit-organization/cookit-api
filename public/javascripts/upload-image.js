const drive = require('./google-drive');

const recipeImages = '1mlqujDjrQktgYRvSXt8IGy1Kh4Hi66wg';
const profileImages = '1Nuy5s8VBBlKMZC2DvB9Xq6B3jU1WN8oQ';

module.exports = async function uploadImage(folderId, image) {

  // folderId by default is recipeImages
  if (folderId === null || folderId === undefined || folderId === '') 
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
     return res;
    }).catch((err) =>  {
      return err
    })     
  });
}

