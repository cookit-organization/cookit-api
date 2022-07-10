const mongoose = require('mongoose')
const { db } = require('../schemes/recipe')
const Recipe = require('../schemes/recipe')

function newRecipe(req, res){

    //RSA for author_username 

    new Recipe({
        author_username: req.query.author_username,
        recipe: {
            name: req.query.name,
            preparation_time: req.query.preparation_time,
            description: req.query.description,
            image: null,
            tags: req.query.tags,
            meal_time: req.query.meal_time,
            components: req.query.components, 
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

// gets id parameter
function deleteRecipe(req, res){

    Task.findOneAndDelete(req.body.id)
        .then((recipe) => {
            res.status(200).send({message: "Recipe has been deleted successfully!"})
            console.log(recipe)
        }).catch((error)=> console.log(error.message))    
}

//gets meal_time array and returns 30 recipes that has it
function randomRecipes(req, res){

    db.collection('recipes').find({
        meal_time: { $all: req.query.meal_time }
    }).limit(30).then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

//gets tags and return list of 10 recipes that has this tags
function recipesByTag(req, res){
    
    db.collection('recipes').find({
        tags: { $all: req.query.tags }
    }).limit(30).then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

function recipesByName(req, res){

    db.collection('recipes').find({ 
        name: req.query.name
    }).limit(30).then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

module.exports = {
    newRecipe,
    updateRecipe,
    deleteRecipe,
    randomRecipes,
    recipesByTag,
    recipesByName
}