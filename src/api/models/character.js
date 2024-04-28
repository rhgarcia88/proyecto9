const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({ 

  name: {type: String, required: true},
  img:{type: String, required: true},

},{
timestamps: true,
collection: 'character'
})

const Character = mongoose.model('characters',characterSchema,'characters');

module.exports = Character;