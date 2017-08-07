
var ModelUser = require('../model/user');

    module.exports.login = {
        get:function(req,res,next){
            res.render('login',{title:'登陆'})
        },
        post:function(req,res,next){
            var postData={
                name:req.body.username,
                password:req.body.password
            }
            var info = {
                state:false,
                msg:''
            }
            ModelUser.findOne(postData,function(err,data){
                if(err){
                    console.log(err)
                }
                if(data){
                    if(data.password===req.body.password){
                        req.session.user =data
                        res.redirect('/')
                    }else{
                        info.msg = '密码错误'
                        res.send( info)
                    }
                }else{
                    info.msg = '账号不存在'
                    res.send(info)
                }
            })
        }        
    }
    
    module.exports.reg = {
        get:function(req,res,next){
            res.render('reg',{title:'注册6'})
        },
        post:function(req,res,next){
            var postData={
                name:req.body.username,
                password:req.body.password
            }
            var info={
                status:false,
                msg:''
            }
            ModelUser.findOne({name:req.body.username},function(err,data){
                if(err){
                    console.log(err)
                }
                if(data){
                    // info.msg='此用户已存在';
                    // alert('info.msg');
                    res.send('此用户已存在')
                    // res.redirect('/')
                    
                }else{
                 ModelUser.create(postData,function(err,data){
                if(err){
                    info.msg='注册异常';
                    res.send(info)
                }
                    info.msg = '注册成功';
                    info.status = true;
                    req.session.user = data;
                    res.send(info)
            })
                }
            })
        }      
    }



    module.exports.user = {
    	get: function (req, res, next){
    		
    		var getData = {
    			_id: req.param('_id')
		    };
	
    		ModelUser.findById(getData , function (err, data){
    			if(err) console.log(err);
			
			if(data){
				res.render('user', {
					title: data.name + '的个人资料',
					view: data
				});
			}else{
				res.send('查询不到此用户');
			}
			
		});

	    }
    };

    module.exports.on=function(req,res,next){
            var session = req.session.user
            if(!session){
                res.redirect('/login')
            }else{
            next();
        }
    }

    module.exports.off=function(req,res,next){
            var session = req.session.user
            if(session){
		res.redirect('/user/' + session._id);
            }else{
            next();
        }
    }