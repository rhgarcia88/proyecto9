const Character = require('../models/character');
const characters = require('../../../characters.json');

const insertManyCharacters = async(req, res, next) => {
  try {
    await Character.insertMany(characters);
    return res.status(201).json("All the Characters are into the database now");
} catch (error) {
    console.log(error);
    return res.status(400).json(error);
}
}

const getAllCharacters = async(req, res, next) => {
  try {
    const allCharacters = await Character.find();
    return res.status(200).json(allCharacters);
  } catch (error) {
    return res.status(400).json(error);
  }
}
module.exports = {
  insertManyCharacters,
  getAllCharacters
};