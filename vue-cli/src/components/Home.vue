<template>
  <div>
    <div class="box">
      <h2>{{data}}</h2>
      <p class="p1">{{data1}}</p>
      <p class="p2">{{data2}}</p>
      <p class="p3">{{data3}}</p>
      <p class="p4">{{data4}}</p>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{
      data:'《两只老虎》',
      data1:'两只老虎  两只老虎，',
      data2:'跑得快  跑得快，',
      data3:'一只没有眼睛  一只没有尾巴，',
      data4:'真奇怪  真奇怪！', 
    }
  },
}
</script>

<style>
  .box{
    width: 300px;
    height:300px;
    margin: 100px auto;
  }
  p,h2{
    width: 300px;
    height: 50px;
    text-align: center;
    font: 20px/50px "微软雅黑";
  }
  h2{
    color:darkgreen;
  }
  .p1{
    color: crimson;
  }
  .p2{
    color:cyan;
  }
  .p3{
    color:blueviolet;
  }
  .p4{
    color: darkorange;
  }
</style>
