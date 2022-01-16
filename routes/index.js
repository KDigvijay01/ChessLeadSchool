const express=require('express');
const router=express.Router();

var {getPage , getMoves}=require('../controllers/index')



router.get('/', getPage); /* getPage from controllers will handle the  get '/' request */

router.get('/:code', getMoves); /* getMoves from controllers will handle the get '/:code' request */



module.exports =router