<template>
  <div>
    
    
    <Button type="info" class="btn" @click="modalAdd = true">添加分类</Button>
    <Button type="error" class="btn" @click="remove">删除分类</Button>
    <Row :gutter="32">
        <Col span="24" class="demo-tabs-style1" style="background:#e3e8ee;padding:16px">
            <Tabs type="card">
              <TabPane label="新闻分类">
                <Tree :data="tree1" @on-select-change="getId"></Tree>
              </TabPane>
              <TabPane label="产品分类">
                <Tree :data="tree2" @on-select-change="getId"></Tree>
              </TabPane>
              <TabPane label="相册管理">
                photos
              </TabPane>
            </Tabs>
        </Col>
    </Row>
    <Modal
        v-model="modalAdd"
        title="添加分类"
        @on-ok="ok"
        @on-cancel="cancel">
              分类名：<Input v-model="filter.title" placeholder="请输入分类名"></Input>
              分类类型：<Input v-model="filter.type" placeholder="请输入分类类型"></Input>
    </Modal>

  </div>
</template>

<script>
export default {
  data(){
    return {
      tree1:[],
      tree2:[],
      treeId:0,
      modalAdd:false,
      modelDel:false,
      filter:{
        title:'',
        type:'',
        parentId:''
      }
    }
  },
  methods:{
    getNewsTree(){//获取新闻类树形
      fetch("http://10.31.154.106:3000/cate/list/1",{
        method:'get',
      }).then(res=>{
        return res.json();
      }).then(data=>{
        this.tree1=data;
      });
    },
    getProductTree(){//获取产品类树形
      fetch("http://10.31.154.106:3000/cate/list/2",{
        method:'get',
      }).then(res=>{
        return res.json();
      }).then(data=>{
        this.tree2=data;
      });
    },
    getId(selected){//获取当前点击的节点
      this.treeId=selected[0]._id;
    },
    //点击出现添加框
    ok(){
      this.$Message.info('Clicked ok');
      this.filter.parentId=this.treeId;
      fetch(`http://10.31.154.106:3000/cate/data`,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.filter)
      }).then(res=>{
        return res.json();
      }).then(data=>{
        this.modalAdd = false;
        this.getNewsTree();
        this.getProductTree();
      });
    },
    cancel(){
      this.$Message.info('Clicked cancel');
    },
    //删除分类
    remove (id) {
      this.$Modal.confirm({
            title: '删除分类确认',
            content: '<p>是否删除该分类？</p>',
            onOk: () => {
              this.filter.parentId=this.treeId;
              fetch(`http://localhost:3000/cate/data/${this.filter.parentId}`,{
                method:'delete',
              }).then(res => {
                return res.json();
              }).then(data => {
                this.$Message.info('分类删除成功！');
                this.getNewsTree();
                this.getProductTree();
              });
            }
        });
    },


  },
  created(){
    this.getNewsTree();
    this.getProductTree();
  }
}
</script>
