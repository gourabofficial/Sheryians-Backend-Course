const express = require('express');

const {

    createtodo,
    gettodo,
    deletetodo,
    updatetodo

} = require('../Controllers/todo.Controller');


const router = express.Router();



router.get('/', gettodo);
router.post('/', createtodo);
router.patch('/:id', updatetodo);
router.delete('/:id', deletetodo);
        

module.exports = router;

    