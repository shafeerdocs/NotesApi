
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
  
var NotesSchema = new mongoose.Schema({
  note: {
        type: String,
    },
    user: { type: ObjectId, ref: "User" }
});


module.exports = mongoose.model('Notes', NotesSchema);