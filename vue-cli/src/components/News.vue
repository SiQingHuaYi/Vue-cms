<template>
<div>
<div style="overflow:hidden;height:700px;" v-if="this.Change">
    <Tree :data="data1" style="width:250px;float:left" @on-select-change="TreeChange" ></Tree>
    <div style="width:600px;float:left">
            <Button type="info"  @click="modalAdd = true">添加新闻</Button>
            <Button type="error" @click="removes">删除多个</Button>
            <Input v-model="filter.title">
            <Button slot="append" icon="ios-search" @click="searchData"></Button>
        </Input>         
        <Modal
            v-model="modalAdd"
            title="记录添加栏">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="formValidate.title" ></Input>
                </FormItem>
                <FormItem label="内容" prop="text">
                    <Input v-model="formValidate.text"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </div>
        </Modal>
        <Table border :columns="columns" :data="data" ref="selection" @on-selection-change="onSelectionChange"></Table>
<Page :total="30" @on-page-size-change="onPageSizeChangeHeader" :page-size="filter.limit" :page-size-opts="[4,6,8,10,12]" @on-change="onChangeHeader" show-sizer></Page>
    </div>                  
</div>
     <div v-if="this.Change1">
        <div style="width:1000px;margin:0 auto" >
                <Button type="primary"  @click="modalAdd1 = true">添加评论</Button>
                <Button type="error" @click="removes1">删除多个</Button>
                <Button type="primary"  @click="fanhui">返回</Button>
                <Input v-model="filter1.title">
                <Button slot="append" icon="ios-search" @click="searchData1"></Button>
            </Input>  
          <Modal
            v-model="modalAdd1"
            title="记录添加栏">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="formValidate1.title" ></Input>
                </FormItem>
                <FormItem label="内容" prop="text">
                    <Input v-model="formValidate1.text"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit1('formValidate1')">Submit</Button>
                <Button type="ghost" @click="handleReset1('formValidate1')" style="margin-left: 8px">Reset</Button>
            </div>
        </Modal>

 <Table border :columns="columns7" :data="data6" ref="selection" @on-selection-change="onSelectionChange1"></Table>
<Page :total="30" @on-page-size-change="onPageSizeChangeHeader1" :page-size="filter1.limit" :page-size-opts="[4,6,8,10,12 ]" @on-change="onChangeHeader1" show-sizer></Page>
        </div>
    </div>     
 </div>
</template>
<script>
import {base} from "../mixin/base";
    export default {
        mixins:[base],
        data () {
            return { 
                modalAdd1:false,
                modules:'news',
                data1: [],  
                data6:[],             
                formValidate: {
                   title:'',
                   text:'',
                   comment:'',
                   cateid:''
                },
                  formValidate1: {
                   title:'',
                   text:'',
                   comment:'',
                   cateid:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                    ],   
                    text: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },  
                    ]
                },
                columns: [
                      
                    {type: 'selection',
                        width: 60,
                        align: 'center'},
                    {
                        title: '新闻标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.title)
                            ]);
                        }
                    },
                    {
                        title: '新闻内容',
                        key: 'text'
                    },
                    {
                        title: '评论数量',
                        key: 'comment'
                    },

                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        
                                            this.editData(params.row._id);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row._id)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: (ev) => {
                                           this.filter1.cateid=params.row._id
                                           this.formValidate1.cateid=params.row._id
                                           this.Change=false;
                                           this.Change1=true; 
                                            this.getdata1();
                                        }
                                    }
                                }, '评论'),   
                            ]);
                        }
                    }
                ],
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '评论标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.title)
                            ]);
                        }
                    },
                    {
                        title: '评论内容',
                        key: 'text'
                    },              
                    {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.modalAdd1 = true;
                                            this.editData1(params.row._id)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove1(params.row._id)
                                        }
                                    }
                                }, '删除'),
                    
                            ]);
                        }
                    }
                ],
                Change:true,
                Change1:false,
                tree:[],
                filter:{
                    page:1,
                    limit:4,
                    title:'',
                    cateid:''
                },
                 filter1:{
                    page:1,
                    limit:4,
                    title:'',
                    cateid:''
                },
                ids:[],
            }
        },
        methods: {
        searchData1(){         //查找
          this.getdata1();
        },
             //删除多个
        removes1(){
          this.$Modal.confirm({
                title: '删除记录确认',
                content: '<p>是否删除多条记录？</p>',
                onOk: () => {
                  var bodyString= JSON.stringify({ids:this.ids1});
                    fetch(`http://10.31.154.106:3000/comment/removes`,{
                      method:'post',
                      headers:{
                          'Content-Type':'application/json'
                        },
                      body:bodyString
                    }).then(res => {
                      return res.json();
                    }).then(data => {
                      this.getdata1();
                      this.$Message.info('记录删除成功！');
                      
                    });
                }
            });
         },
         onSelectionChange1(selection){
          var selectionIds=[];
          for(let i=0; i<selection.length;i++){
            selectionIds.push(selection[i]._id);
          }
          
          this.ids1=selectionIds;
        },
             handleSubmit1 (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  if(this.editId.length>0){
                    //修改
                    this.$Message.success('Success!');
                    fetch(`http://10.31.154.106:3000/comment/data/${this.editId}`,{
                      method:'put',
                      headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.formValidate1)
                      }).then(res=>{
                        return res.json();
                      }).then(data=>{
                        this.data6 = data.rows;
                        this.getdata1();
                        this.modalAdd1=false;
                        Object.assign(this.$data.formValidate1,this.$options.data().formValidate1);//表单重置
                      });
                  }else{
                    //添加
                    this.$Message.success('Success!');
                    console.log(this.formValidate1)
                    fetch(`http://10.31.154.106:3000/comment/data`,{
                      method:'post',
                      headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.formValidate1)
                      }).then(res=>{
                        return res.json();
                      }).then(data=>{
                        this.data6 = data.rows;
                        this.getdata1();
                        this.modalAdd1=false;
                        Object.assign(this.$data.formValidate1,this.$options.data().formValidate1);//表单重置
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
            //树形结构
            fanhui(){
                 this.Change=true;
                 this.Change1=false;  
            },
            TreeChange(ev){
                this.filter.cateid=ev[0]._id;
                 this.formValidate.cateid=this.filter.cateid
                this.getData()
                
            },
        
            handleReset (title) {
                this.$refs[title].resetFields();
            },
            //修改
            editData (id) {
            fetch(`http://10.31.154.106:3000/comment/data/${id}`,{
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

             editData1 (id) {                                                 //评论修改
            fetch(`http://10.31.154.106:3000/comment/data/${id}`,{
                }).then(res => {
                return res.json();
                }).then(data => {
                    console.log(data)
                this.formValidate1=data;
                this.modalAdd1=true;
                this.editId=id;
                });
            },

         remove1 (id) {               //评论删除
          this.$Modal.confirm({
                title: '删除记录确认',
                content: '<p>是否删除该条记录？</p>',
                onOk: () => {
                    fetch(`http://10.31.154.106:3000/comment/data/${id}`,{
                      method:'delete',
                    }).then(res => {
                      return res.json();
                    }).then(data => {
                      this.$Message.info('记录删除成功！');
                      this.getdata1();
                    });
                }
            });
        },
        getdata1(){
            var bodystring=JSON.stringify(this.filter1)
            fetch('http://10.31.154.106:3000/comment/list',{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:bodystring
            }).then(res=>{
            return res.json()
            }).then(data=>{
            this.total1=data.total1;     
            this.data6=data.rows
            });
        },
 },
        created(){
          this.getData();
           fetch('http://10.31.154.106:3000/cate/list/1',{
                  method:'get',
                  headers:{
                  'Content-type':'application/json'
                }
              }).then(res=>{
                  return res.json()
              }).then(data=>{
                this.data1=data
              })
        }
    }
</script>


<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width:  420px;
    margin: 0 auto;
    margin-right: 20px;
}  
</style>



