const fs = require('fs');
const recipeSchema = require('../schemes/recipe')

// var recipe = new recipeSchema
// recipe.img.data = fs.readFileSync(imgPath)
// recipe.img.contentType = 'image/png'
// recipe.save(function (err, a) {
//     if (err) throw err
//     console.error('saved img to mongo')
//     var server = express.createServer()
//     server.get('/', function (req, res, next) {
//         recipeSchema.findById(a, function (err, doc) {
//         if (err) return next(err)
//         res.contentType(doc.img.contentType)
//         res.send(doc.img.data)
//       })
//     })
// })

function newRecipe(req, res){}

function updateRecipe(req, res){}

function deleteRecipe(req, res){}

function randomRecipes(req, res){}

function recipesByTag(req, res){}

function recipesByName(req, res){}

module.exports = {

    newRecipe,
    updateRecipe,
    deleteRecipe,
    randomRecipes,
    recipesByTag,
    recipesByName

}