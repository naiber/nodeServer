var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();
// var app = express();
var Post = require('../models/post');
/*app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())*/
/* GET users listing. */

/*router.post('/login',function (req,res) {
    var username = req.body.user;
    var password = req.body.password;
    console.log("Username = "+username+" , password = "+password);
    res.end("yes")
})*/

var middle= function(req, res, next) {
    if(req.query.t && req.query.t==="admin") {
        next()
    }
    else{
        res.status(401).json({status:"Token not valid"});
    }
};

router.get('/login',middle,function (req,res,next) {
    res.json({
        status:"success"
    })
})

router.get('/',function(req, res,next)
{
    Post.find({},function (err ,posts) {
        if (err) return res.status(500).json({error: err});
        res.json(posts);
    })
})

router.get('/:id',function(req, res,next)
{
    Post.find({_id:req.params.id},function (err ,posts) {

        if (err) return res.status(500).json({error: err});
        res.json(200,posts);

    })
});

router.post('/',function(req,res,next)
    {
        var newPost = new Post(req.body);

        newPost.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newPost);
        })

    }
);

router.put('/:id', function (req, res,next) {
        Post.findOne({_id: req.params.id}, function (err ,posts) {

                if (err) return res.status(500).json({error: err});

                if(!posts) return res.status(404).json({message:'post non trovato'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    posts[key] = req.body[key];
                }

                posts.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(posts);
                })
            }

        )
    }
);

router.delete('/:id',function (req, res,next)
    {
        Post.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Post eliminato correttamente'})
        })
    }
);


module.exports = router;
