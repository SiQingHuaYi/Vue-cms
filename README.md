# Vue_cms

#### 项目介绍
一个后台管理系统，包含用户管理，分类管理，新闻模块管理，产品模块管理，相册管理，评论模块管理等

#### 软件架构
使用Vue框架，VueX，iViewUI框架，mongoDB，SourceTree，Postman等工具，nodeJS做后台


#### 安装教程

1. npm i --- 初始化
2. npm i iview -S --- 安装UI框架
3. npm i url-loader -D --- 安装字体模块
4. npm i vue-router -S --- 安装路由模块
5. npm i vuex -S --- 安装vuex

#### 使用说明

1. npm start --启动后台页面  ---  admin
2. npm run dev --启动前台页面  ---  vue-cli
3. mongoDB  ---  数据库图片文件

#### 参与贡献

1. ShiQingHuaYi  ----  <1281995190@qq.com>
2. LAPTOP-7PHR8VQP\lenovo  ----  <824838835@qq.com>


#### 项目说明

1.使用iviewUI框架时，注意ttf字体问题，要安装url-loader，然后webpack文件引入
    {
        test:/\.(woff|svg|eot|ttf)\??.*$/,
        loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
    }

2.VueX用于组件之间的数据传输，方便少量组件之间的数据交互，本项目中用来做登录界面。

3.新闻树状分类模块，数据增删改查表格模块，新闻对应的评论模块，都数据对应的ID传递数据。

4.多项删除用一个空数组，将选中的数据ID存入数组，再进行对应的删除。

5.评论模块利用v-if，v-else将新闻内容进行切换，这样做虽然不用额外创建一个评论组件，但不方便代码混入，建议新建一个组件更方便！