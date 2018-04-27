const mongoose = require('mongoose');
const Comment = require('../model/comment.model');

//增
exports.create = function(req,res,next){
    const comment = new Comment(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    comment.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//删一条数据
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Comment.findByIdAndRemove(id,function(err,data){
        res.json({massage:'删除成功'});
    });
};

//删多个数据
exports.removes = function(req,res,next){
    var result = req.body.ids;
    if (result.length > 0) {
        Comment.remove({ _id: { $in: result } }).then(() => {
            res.json({ 'message': '多条记录删除成功' });
        })
    }
    
};


//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Comment.findByIdAndUpdate(id,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};
exports.getData=function(req,res,next){
    const id = req.params.id;
    Comment.findById(id,function(err,data){
        res.json(data);
    })
}
//查
exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.rows ? req.body.rows : 4;
    var queryCondition = {};

    if(req.body.title && req.body.title.trim().length>0){   //trim（）去空格
        title = req.body.title;
        queryCondition = {
            title: new RegExp(title,'i')
        }
    }

    if(req.body.cateid && req.body.cateid.trim().length>0){   //trim（）去空格
        cateid = req.body.cateid;
        queryCondition = Object.assign(queryCondition,{  //对象合并    
            cateid: cateid
        });
    }
        //            查询条件            分页         一页的条数           回调函数
    Comment.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
      });
}