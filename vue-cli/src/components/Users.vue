<template>
  <div>
    <Button type="info" @click="modalAdd = true">添加</Button>
    <Button type="error" @click="removes">删除多个</Button>    
    <Input v-model="filter.name">
        <Button slot="append" icon="ios-search" @click="searchData"></Button>
    </Input>

    <Table border :columns="columns" :data="data" ref="selection" @on-selection-change="onSelectionChange"></Table>
    <Page :total="40" :page-size="filter1.limit" :page-size-opts="[4,6,8,10,12]" @on-page-size-change="onPageSizeChangeHeader" @on-change="onChangeHeader" show-sizer></Page>

    <Modal
        v-model="modalAdd"
        title="记录添加栏">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
              <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
              <Input v-model="formValidate.sex" placeholder="请输入性别"></Input>
          </FormItem>
          <FormItem label="年龄" prop="age">
              <Input v-model="formValidate.age" placeholder="请输入年龄"></Input>
          </FormItem>

          
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import {base} from "../mixin/base";
export default {
    mixins:[base],
    data () {
        return {
            
            modules:'users',
            formValidate: {
                name: '',
                password:'',
                sex:'',
                age:''
            },
              filter:{
              page:1,
              limit:4,
              name:'',
            },
            filter1:{
               page:1,
              limit:4,
              name:'',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                    password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                    sex: [
                    { required: true, message: '性别不能为空', trigger: 'blur' }
                ],
                    age: [
                    { required: true, message: '年龄不能为空', trigger: 'blur' }
                ]
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: '密码',
                    key: 'password'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
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
                                on: {
                                    click: () => {
                                        this.remove(params.row._id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ]
        }
    },
};
</script>
