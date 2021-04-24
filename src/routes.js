var express = require('express');
var router = express.Router();
var userController  = require('./controller/user-controller');
var noteController  = require('./controller/note-controller');
var passport	    = require('passport');
const { userById } = require("./controller/user-controller");
const { noteById } = require("./controller/note-controller");
router.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/addnote/:userId',noteController.createNote)
router.get('/getnote/:userId',noteController.getNote)
router.delete('/deletenote/:noteId',noteController.oneremove)
router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("response", res)
    console.log("req", req)
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
router.param("userId", userById);
router.param("noteId", noteById);
module.exports = router;