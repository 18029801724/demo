var ModelBlog = require('../model/blog')


module.exports.add = {
    get:function(req,res,next){
        res.render('add',{title:'发表微博'})
    },
    post:function(req,res,next){
        var postData = {
            author:req.session.user._id,
            title:req.body.title,
            content:req.body.content,
           
        }
		var info = {
			status:false,
			msg:''
		}
        ModelBlog.create(postData,function(err,data){
            if(err){
                console.log(err)
            }else{
				info.status = true,
				info.msg = '发表成功'
                res.send(info)
            } 

        })
    }
}

module.exports.list = {
    get:function(req,res,next){

		ModelBlog.find({}, null,{ sort: { _id: -1} }).populate('author').exec(function (err, data){
			if(err) console.log(err);
			res.render('list', {
                title: '微博列表',
                list: data
            });			
		});
	}
};

    //微博内容
module.exports.view = {
	get: function (req, res, next){
		var getData = {
			_id: req.param('_id')  
		};
		
		ModelBlog.findOne(getData, function (err, data){
			
			if(err) console.log(err);
			
			if(data){
				res.render('view', {
					title: data.title,
					view: data
				});
			}else{
				res.send('此微博，不存在！');
			}
			
			
		});
		
	}
};

module.exports.edit = {
    get:function(req,res,next){
        var _id = req.param('_id')
        ModelBlog.findOne({_id:_id},null,function(err,data){
          res.render('edit',{
              title:data.title,
              view:data
          })  
        })
    },

	post: function (req, res, next){
		

        var body = req.body;
        var conditions = {_id:body._id};
		var info = {
			status:'false',
			msg:''
		}
 
        var update = {$set : { title:body.title,content:body.content }};
 
    ModelBlog.update(conditions, update, function(error){
         if(error) {
			 info.msg = '数据异常';
        res.send(info)
    } else {
		info.msg = '修改成功';
		info.status = 'true'
        res.send(info);
    }
    });
    }

}