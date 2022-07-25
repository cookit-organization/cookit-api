const Recipe = require('../schemes/recipe');
const sanitize = require('mongo-sanitize');
const driveActions = require('../public/javascripts/google-drive-actions');
const multer  = require('multer')

const recipeImages = '1mlqujDjrQktgYRvSXt8IGy1Kh4Hi66wg';

function newRecipe(req, res, image){
    /* RSA for author_username */
  
    const request = driveActions.uploadImage(recipeImages, image);

    request.then(response => {

        new Recipe({
            author_name: sanitize(req.query.author_name),
            author_username: sanitize(req.query.author_username),
            recipe: {
                name: sanitize(req.query.name),
                preparation_time: sanitize(req.query.preparation_time),
                description: sanitize(req.query.description),
                image: response.data['id'], /* this is image id */
                tags: sanitize(req.query.tags),
                meal_time: sanitize(req.query.meal_time),
                components: sanitize(req.query.components), 
                average_rate: 0,
                rates_number: 0,
                users_who_vote: null
            }
        }).save()
        .then((result) => {
            console.log(result)
            res.status(200).send(null)
        })
        .catch((error) => console.log(error))
    }).catch(err => console.log(err));
    
}

function updateRecipe(req, res){}

// gets id parameter
function deleteRecipe(req, res){

    Recipe.findOneAndDelete(sanitize(req.body.id))
        .then(() => {
            res.status(200).send({message: "Recipe has been deleted successfully!"})
        }).catch((error)=> console.log(error.message))    
}

function recipesByDayState(req, res){
    var currentTime = "";
    const date = new Date().getHours()
    date < 12 ? currentTime = 'morning' : date < 18 ? currentTime = 'afternoon' : currentTime = 'night'
    
    Recipe.find({
        "recipe.meal_time": { "$in": currentTime } 
    })
    .limit(20)
    .sort({"recipe.average_rate" : -1})
    .then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

function recipesByTag(req, res){
    
    var food = sanitize(req.query.food);
    var meal_time = sanitize(req.query.meal_time);

    const arrayFood = food.replace(/\s/g, '').split(',');
    const arrayMeal_time = meal_time.replace(/\s/g, '').split(',');
    
    console.log(arrayFood)
    console.log(arrayMeal_time)

    Recipe.find({
        $or: [
            { "recipe.tags": { "$in": arrayFood }},
            { "recipe.meal_time": { "$in": arrayMeal_time }}
        ]
    })
    .limit(20)
    .sort({"recipe.average_rate" : -1})
    .then((recipes) => {
        res.status(200).send(recipes);
        console.log(recipes);
    }).catch((err) => res.status(500).send(err))
}

function recipesByName(req, res){
    Recipe.find({
        "recipe.name": { '$regex' : sanitize(req.query.search), '$options' : 'i' }
    })
    .limit(20)
    .then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

module.exports = {
    newRecipe,
    updateRecipe,
    deleteRecipe,
    recipesByDayState,
    recipesByTag,
    recipesByName
}