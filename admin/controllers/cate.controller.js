const mongoose = require('mongoose');
const Cate = require('../model/cate.model');

//增
exports.create = function(req,res,next){
    const cate = new Cate(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    cate.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Cate.findByIdAndUpdate(id,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};

//递归函数
function reverseTree(data,pid){
    var result = [];
    var temp;
    var data = JSON.parse(JSON.stringify(data));
    for(var i in data){
        if(data[i].parentId === pid){
            result.push(data[i]);
            temp = reverseTree(data,data[i]._id);
            if(temp.length > 0){
                data[i].children = temp;
            }
        }
    }
    return result;
}

//查
exports.list = function(req,res,next){
    const type = req.params.type;
    Cate.find({type:type},function(err,data){
        var rpTree = reverseTree(data,null);
        res.json(rpTree);
    });
};

//删除
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    var ids = [];
    Cate.findOne({_id:id},function(err,doc){
       if(doc){
           ids=[doc._id];
        doc.getChildren(function(err, docs){
            for(var i=0;i<docs.length;i++){
                ids.push(docs[i]._id);
            }
            Cate.remove({_id:{$in:ids}}).then(data=>{
                res.json({message:'删除'})
            });
        });
       }
    });
};

 