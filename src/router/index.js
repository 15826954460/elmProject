import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import city from '@/page/city/city'
import menu from '@/page/menu/menu'
import search from '@/page/search_business/search'
import order from '@/page/order/order'
import detail from '@/page/order/children/detail'
import user from '@/page/user/user'
import info from '@/page/user/children/info/info'
import username from '@/page/user/children/username/username'
import edit from '@/page/user/children/address/edit'
import add from '@/page/user/children/address/add'
import list from '@/page/user/children/address/list'
import reset from '@/page/user/children/reset/reset'
import download from '@/page/download/download'
import integral from '@/page/integral/integral'
import vip from '@/page/vip/vip'
import description from '@/page/vip/children/description/description'
import exchangevip from '@/page/vip/children/exchangevip/exchangevip'
import shophistory from '@/page/vip/children/shophistory/shophistory'
import pay from '@/page/pay/pay'
import service from '@/page/service/service'
import questionDetail from '@/page/service/children/questiondetail'
import points from '@/page/points/points'
import pointsdetail from '@/page/points/children/detail'
import favorable from '@/page/favorable/favorable'
import favorableIntro from '@/page/favorable/children/intro/intro'
import jinjuan from '@/page/favorable/children/jinjuan/jinjuan'
import hongbao from '@/page/favorable/children/hongbao/hongbao'
import prize from '@/page/favorable/children/prize/prize'
import balance from '@/page/balance/balance'
import balancedetail from '@/page/balance/children/detail'
import shop from '@/page/shop/shop'
import shopdetail from '@/page/shop/shopDetail/shopDetail'
import shopSafe from '@/page/shop/shopDetail/shopSafe/shopSafe'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页城市列表
    {
      path: '/',
      component: home
    },
    {
      path: '/home',
      component: home
    },
    // 当前选择城市页
    {
      path: '/city/:cityId',
      component: city
    },
    //  食品首页
    {
      path: '/menu',
      component: menu
    },
    // 搜索页
    {
      path: '/search',
      component: search
    },
    // 订单页
    {
      path: '/order',
      component: order,
      children: [
        {
          path: 'detail',
          component: detail
        }
      ]
    },
    // 个人主页
    {
      path: '/user',
      component: user,
      children: [
        {
          path: 'info',
          component: info
        },
        {
          path: 'username',
          component: username
        },
        {
          path: 'edit',
          component: edit
        },
        {
          path: 'add',
          component: add
        },
        {
          path: 'list',
          component: list
        },
        {
          path: 'reset',
          component: reset
        }
      ]
    },
    //  下载APP
    {
      path: '/download',
      component: download
    },
    // 积分商城
    {
      path: '/integral',
      component: integral
    },
    // vip
    {
      path: '/vip',
      component: vip,
      children: [
        {
          path: 'description',
          component: description
        },
        {
          path: 'exchangeVip',
          component: exchangevip
        },
        {
          path: 'shophistory',
          component: shophistory
        }
      ]
    },
    // 支付页面
    {
      path: '/pay',
      component: pay
    },
    // 服务中心页面
    {
      path: '/service',
      component: service,
      children: [
        {
          path: 'questionDetail',
          component: questionDetail
        }
      ]
    },
    // 服务中心页面
    {
      path: '/points',
      component: points,
      children: [
        {
          path: 'pointsdetail',
          component: pointsdetail
        }
      ]
    },
    // 我的余额页面
    {
      path: '/balance',
      component: balance,
      children: [
        {
          path: 'balancedetail',
          component: balancedetail
        }
      ]
    },
    // 我的优惠页面
    {
      path: '/favorable',
      component: favorable,
      children: [
        {
          path: 'favorableIntro',
          component: favorableIntro
        },
        {
          path: 'jinjuan',
          component: jinjuan
        },
        {
          path: 'hongbao',
          component: hongbao
        },
        {
          path: 'prize',
          component: prize
        }
      ]
    },
    // 订单主页
    {
      path: '/shop',
      component: shop,
      children: [
        {
          path: 'shopdetail',
          component: shopdetail,
          children: [
            {
              path: 'shopSafe',
              component: shopSafe
            }
          ]
        }
      ]
    }
  ]
})
