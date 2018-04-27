import Home from "./components/Home.vue";
import User from "./components/Users.vue";
import News from "./components/News.vue";
import Cate from "./components/Cate.vue";
import Album from "./components/Album.vue";
import Product from "./components/Product.vue";


export const routes = [
    { path:'/',component:Home},
    { path:'/user',component:User},
    { path:'/news',component:News},
    { path:'/cate',component:Cate},
    { path:'/album',component:Album},
    { path:'/product',component:Product}
];
