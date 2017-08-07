var express = require('express');
var router = express.Router();
var PluginUser = require('../plugin/user');
var PluginBlog = require('../plugin/blog')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
  module.exports = function(app){
    
    app.use(function (req, res, next){
	    	var user = req.session.user;
		    if(user){
		  	app.locals.user = user;
	    	}else{
		  	app.locals.user = user;
	  	};
		
		next();
	});


    app.get('/',function(req,res,next){
      res.render('index',{title:'基于nodejs+express+mongoose的网站'});
    })

     app.get('/reg',PluginUser.off,PluginUser.off,PluginUser.reg.get)

     app.post('/reg',PluginUser.reg.post)
    
     app.get('/login',PluginUser.off, PluginUser.login.get)

     app.post('/login', PluginUser.login.post)
    
     app.get('/add',PluginUser.on,PluginBlog.add.get)    

     app.post('/add',PluginBlog.add.post)  

     app.get('/list',PluginUser.on,PluginBlog.list.get)

     app.get('/user/:_id',PluginUser.user.get)

     app.get('/view/:_id',PluginUser.on,PluginBlog.view.get)

     app.get('/list/:_id/edit',PluginUser.on,PluginBlog.edit.get)

     app.post('/list/:_id/edit',PluginBlog.edit.post)

     app.get('/logout',function(req,res,next){
       delete req.session.user
       res.redirect('/');
    })
    
  }
