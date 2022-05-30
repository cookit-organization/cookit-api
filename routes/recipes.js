const mongoose = require('mongoose')
const recipeSchema = require('../schemes/recipeScheme')

function newRecipe(req, res){

    //RSA for username 

    let Recipe = mongoose.model("Recipe", recipeSchema, req.query.author_username)

    new Recipe({
        author_username: req.query.author_username,
        recipe: {
            name: req.query.name,
            preparation_time: req.query.preparation_time,
            description: req.query.description,
            image: null,
            tags: req.query.tags,
            components: {'meat':'lol','shaha':'gjgj','meat':'lol','shaha':'gjgj','meat':'lol','shaha':'gjgj'},
            meal_time: req.query.meal_time,
            average_rate: [],
            rates_number: []
        }
    }).save()
    .then((result) => {
        console.log("response :\n" + result)
        res.status(200).send(null)
    })
    .catch((error) => console.log("error : " + error))
}

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