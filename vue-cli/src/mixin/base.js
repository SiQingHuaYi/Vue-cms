export const base = {
	data () {
        return {
            
            modalAdd:false,
            editId:0,
            data: [],
            total:0,
            ids:[]
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  if(this.editId.length>0){
                    //修改
                    this.$Message.success('Success!');
                    fetch(`http://10.31.154.106:3000/${this.modules}/data/${this.editId}`,{
                      method:'put',
                      headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.formValidate)
                      }).then(res=>{
                        return res.json();
                      }).then(data=>{
                        this.data = data.rows;
                        this.getData();
                        this.modalAdd=false;
                        Object.assign(this.$data.formValidate,this.$options.data().formValidate);//表单重置
                      });
                  }else{
                    //添加
                    this.$Message.success('Success!');
                    fetch(`http://10.31.154.106:3000/${this.modules}/data`,{
                      method:'post',
                      headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.formValidate)
                      }).then(res=>{
                        return res.json();
                      }).then(data=>{
                        this.data = data.rows;
                        this.getData();
                        this.modalAdd=false;
                        Object.assign(this.$data.formValidate,this.$options.data().formValidate);//表单重置
                      });
                  }

                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        //修改
        editData (id) {
           fetch(`http://10.31.154.106:3000/${this.modules}/data/${id}`,{
            }).then(res => {
              return res.json();
            }).then(data => {
              console.log(data)
              console.log(this.formValidate)
              this.formValidate=data;
              console.log(this.formValidate)
              this.modalAdd=true;
              this.editId=id;
            });
        },
        
        //删除
        remove (id) {
          this.$Modal.confirm({
                title: '删除记录确认',
                content: '<p>是否删除该条记录？</p>',
                onOk: () => {
                    fetch(`http://10.31.154.106:3000/${this.modules}/data/${id}`,{
                      method:'delete',
                    }).then(res => {
                      return res.json();
                    }).then(data => {
                      this.$Message.info('记录删除成功！');
                      this.getData();
                    });
                }
            });
        },

        //删除多个
        removes(){
          this.$Modal.confirm({
                title: '删除记录确认',
                content: '<p>是否删除多条记录？</p>',
                onOk: () => {
                  var bodyString= JSON.stringify({ids:this.ids});
                    fetch(`http://10.31.154.106:3000/${this.modules}/removes`,{
                      method:'post',
                      headers:{
                          'Content-Type':'application/json'
                        },
                      body:bodyString
                    }).then(res => {
                      return res.json();
                    }).then(data => {
                      this.getData();
                      this.$Message.info('记录删除成功！');
                      
                    });
                }
            });
         },
         onSelectionChange(selection){
          var selectionIds=[];
          for(let i=0; i<selection.length;i++){
            selectionIds.push(selection[i]._id);
          }
          
          this.ids=selectionIds;
        },
        
        //刷新页面
        getData(){
          var bodyString= JSON.stringify(this.filter)  
          
          fetch(`http://10.31.154.106:3000/${this.modules}/list`,{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            body:bodyString
          }).then(res=>{
            return res.json();
          }).then(data=>{
            this.data = data.rows;
            this.total=data.total;       
          });
        },
        onChangeHeader(page){
          this.filter.page=page;
          this.getData();
        },
        onChangeHeader1(page){
          this.filter1.page=page;
          this.getdata1();
        },
        onPageSizeChangeHeader(pagesize){
          this.filter.rows=pagesize;
          this.getData();
        },
        onPageSizeChangeHeader1(pagesize){
          this.filter1.rows=pagesize;
          this.getdata1();
        },
        //搜索
        searchData(){
          this.getData();
        },
        
    },
    created(){
      this.getData();
    }
}