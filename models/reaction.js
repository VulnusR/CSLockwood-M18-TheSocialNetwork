const mongoose = require('mongoose');
const reactionSchema = require('./reactionSchema');

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;