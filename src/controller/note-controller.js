var Notes = require("../models/notes");


exports.noteById = (req, res, next, id) => {
  Notes.findById(id)
      .exec((err, note) => {
          if (err || !note) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          req.note = note;
          next();
      });
};


exports.createNote = (req, res) => {
  req.body.user = req.profile;
  console.log("req.body", req.body)
  let newNote = Notes(req.body);
  newNote.save((err, result) => {
    console.log("err", err);
    if (err) {
      return res.status(400).json({ msg: err });
    }
    return res.status(200).json(newNote);
  });
};

exports.getNote = (req, res) => {
    Notes.find({user: req.profile})
    .exec((err, result) => {
      console.log("err", err);
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(200).json(result);
    });
  };


  exports.oneremove = (req, res) => {
    let note = req.note;
    Notes.remove({_id:note._id},(err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(result);
    });
};