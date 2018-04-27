<template>
<div style="overflow:hidden;height:700px;" >
    <!-- 树形菜单 -->
    <Tree :data="dataTree" style="width:250px;float:left" @on-select-change="TreeChange" ></Tree>

    <div style="width:800px;float:left">
        <!-- 添加/删除多个/搜索 -->
            <Button type="info"  @click="modalAdd = true">添加</Button>
            <Button type="error" @click="removes">删除多个</Button>
            <Input v-model="filter.title">
            <Button slot="append" icon="ios-search" @click="searchData"></Button>
        </Input>   
         <!-- 添加修改弹出框 -->
        <Modal
            v-model="modalAdd"
            title="产品添加栏">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="产品名称" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入产品名称 "></Input>
                </FormItem>
                <FormItem label="产品价格" prop="price">
                    <Input v-model="formValidate.price" placeholder="请输入产品价格 "></Input>
                </FormItem>
                <FormItem label="产品数量" prop="count">
                    <Input v-model="formValidate.count" placeholder="请输入产品数量 "></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </div>
        </Modal>
        <!-- 表格展示 -->
        <Table border :columns="columns" :data="data" ref="selection" @on-selection-change="onSelectionChange"></Table>
        <!-- 分页处理 -->
        <Page :total="40" @on-page-size-change="onPageSizeChangeHeader" :page-size="filter.limit" :page-size-opts="[4,6,8,10,12]" @on-change="onChangeHeader" show-sizer></Page>
    </div>
                       
</div>

</template>

<script>
import {base} from "../mixin/base";
    export default {
        mixins:[base],
        data () {
            return { 
                modules:'product',
                dataTree: [],  
                data6:[],             
                formValidate: {
                   title:'',
                   price:'',
                   count:'',
                   cateid:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                    ],   
                    price: [
                        { required: true, message: '产品价格不能为空！', trigger: 'blur' },  
                    ],
                    count: [
                        { required: true, message: '产品数量不能为空！', trigger: 'blur' },  
                    ]
                },
                columns: [
                    {type: 'selection',
                        width: 60,
                        align: 'center'},
                    {
                        title: '产品名称',
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
                        title: '产品价格',
                        key: 'price'
                    },
                    {
                        title: '产品数量',
                        key: 'count'
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
                            ]);
                        }
                    }
                  
                ],
                tree:[],
                filter:{
                    page:1,
                    limit:4,
                    title:'',
                    cateid:''
                },
                ids:[],
            }
        },
        methods: {
            //树形结构
            TreeChange(ev){
                this.filter.cateid=ev[0]._id;
                 this.formValidate.cateid=this.filter.cateid
                this.getData()
                
            },
            handleReset (title) {
                this.$refs[title].resetFields();
            },
        },
        created(){
          this.getData();
         
           fetch('http://10.31.154.106:3000/cate/list/2',{
                  method:'get',
                  headers:{
                  'Content-type':'application/json'
                }
              }).then(res=>{
                  return res.json()
              }).then(data=>{
                this.dataTree=data
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
