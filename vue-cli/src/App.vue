<template>
    <div class="layout">
        <div v-if='login'>
            <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="heart"></Icon>
                        <span><router-link to='/'>首页</router-link></span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-navigate"></Icon>
                        <span><router-link to='/user'>用户管理</router-link></span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="search"></Icon>
                        <span><router-link to='/cate'>分类管理</router-link></span>
                    </MenuItem>

                    <MenuItem name="1-4">
                        <Icon type="settings"></Icon>
                        <span><router-link to='/news'>新闻管理</router-link></span>
                    </MenuItem>

                    <MenuItem name="1-5">
                        <Icon type="star"></Icon>
                        <span><router-link to='/product'>产品管理</router-link></span>
                    </MenuItem>

                    <MenuItem name="1-6">
                        <Icon type="heart"></Icon>
                        <span><router-link to='/album'>相册管理</router-link></span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem><router-link to='/'>首页</router-link></BreadcrumbItem>
                        <BreadcrumbItem>组件</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div >                           
                            <router-view></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
        </div>
        <div v-else>
            <div style="width:300px;height:300px;margin:300px auto;">
                <div style="margin:35px auto;font:20px/20px '微软雅黑';color:red;text-align: center">不登录进去了，我死给你看！</div>
                <Form ref="formInline" :model="formInline" :rules="ruleInline" style="margin:0 auto">
                    <FormItem prop="user" >
                        <Input type="text" v-model="formInline.user" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <br>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password" >
                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <br>
                    <FormItem >
                        <Button type="primary" @click="handleSubmit('formInline')" style="margin-left:117px">Signin</Button>
                    </FormItem>
                </Form>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

    export default {
        data () {
            return {
                isCollapsed: false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '要先输入用户名啊，傻逼！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '没密码你还想进去？傻逼吧你！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '智障嘛你，密码至少要6位！', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            ...mapActions(['checkLogin']),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('卧槽，你居然进来了!');
                        this.checkLogin(true);
                    } else {
                        this.$Message.error('你进不去啊，傻逼!哈哈哈！');
                    }
                })
            }
        },
        computed: {
            ...mapGetters(['login']),

            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>

<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
