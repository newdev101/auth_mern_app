const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/Auth');

router.get('/',ensureAuthenticated,(req,res)=>{
    return res.status(200)
    .json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"fridge",
            price:29000
        }
    ])
});



module.exports=router;