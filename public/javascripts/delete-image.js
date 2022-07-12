const drive = require('./google-drive');


module.exports = async function deleteImage(imageId) {

  drive.then(drive => {
    const response = drive.files.delete({
      fileId: imageId,
    });

    response.then((res) => {
      return res;
    }).catch((err) => {
      return err
    })
  }) 
}