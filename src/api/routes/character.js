const { getAllCharacters, insertManyCharacters } = require('../controllers/character');


const characterRouter = require('express').Router();

characterRouter.get('/',getAllCharacters);
characterRouter.post('/save_characters',insertManyCharacters);

module.exports = characterRouter;