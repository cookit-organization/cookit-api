const mongoose = require('mongoose')
const Recipe = require('../schemes/recipe')

function newRecipe(req, res){

    //RSA for username 

    new Recipe({
        author_username: req.query.author_username,
        recipe: {
            name: req.query.name,
            preparation_time: req.query.preparation_time,
            description: req.query.description,
            image: null,
            tags: req.query.tags,
            meal_time: req.query.meal_time,
            components: {'meat':'lol','shaha':'gjgj','meat':'lol','shaha':'gjgj','meat':'lol','shaha':'gjgj'},
            average_rate: 0,
            rates_number: 0
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

function randomRecipes(req, res){

    Recipe.aggregate([
        // {$match: {meal_time: }},
        {$sample: {size: 10}}
    ], function(err, recipes) {
        console.log(recipes);
        res.status(200).send(recipes);
    });
}

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