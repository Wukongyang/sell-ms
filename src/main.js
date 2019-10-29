import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css';//字体图标
Vue.use(ElementUI);

let bus=new Vue()
Vue.prototype.bus=bus


// 路由守卫
router.beforeEach((to,from,next)=>{
   let token=window.localStorage.getItem("token")//去本地存储取出，登陆的时候存进去
   if(token){
     next()//有token就放行
   }else{
     if(to.path==="/login"){//如果是登录页面就放行
       next()
     }else{
       next("/login")//其他页面就去登录页面
     }
   }
})




import echarts from 'echarts'// 引入echarts
import './assets/css/reset.css';//重置样式

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
