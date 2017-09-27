import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import AnchorMain from '@/components/anchor/anchor.main';
import AnchorHome from '@/components/anchor/home/anchor.home';
import ProductDetail from '@/components/anchor/product/product.detail';
import PageNotFund from '@/components/error/page.not.fund';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: "/share",
            component: AnchorMain,
            children: [
                {
                    path: "gerenxiu",
                    name: "AnchorHome",
                    component: AnchorHome
                },
                {
                    path: "dongtai",
                    name: "ProductDetail",
                    component: ProductDetail
                }
          ]
        },
        {
            path: "*",
            component: PageNotFund
        }
    ]
})
