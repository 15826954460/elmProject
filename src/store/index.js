/**
 * Created by lele on 2017/5/5.
 */
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  gress_city: '上海',
  shopListNum: '',
  business: [],  // 商家
  orderList: [],  // 订单列表
  orderDetail: {}, // 订单详情
  foodTypes: [],
  group_city: {}, // 所有城市
  hot_city: {}, // 热门城市
  search_data: [],  // 搜索商家数据
  shopList: [],  // 商铺列表
  orderId: '',  // 订单id
  userInfo: { // 用户信息
    'uName': 'cangdu000',
    'phone': '15826942285',
    'count': 7,
    'balance': '00.0',
    'pointNumber': 0
  },
  add_detail: [], // 地址详情
  address: {  // 地址
    'address': [
      {address: '上海马戏团', phone: 15896451235},
      {address: '华盛达大厦', phone: 15896451235},
      {address: '电影大厦', phone: 15896451235},
      {address: '宏大购物广场', phone: 15896451235},
      {address: '罗湖歌剧院', phone: 15896451235}
    ]
  }, // 默认地址
  computedTime: 30, // 发送时间
  userInfomation: true, // 个人用户信息
  service: [],
  hongbaoList: [],  // 红包列表
  shopDetails: {},  // 商店详情
  shopMenu: [],  // 菜品详情
  foodsList: {}, // 规格列表
  // shopCartList: {}, // 购物车列表
  ratingList: [], // 商品评价列表
  scores: {},
  tage: [], // 评价信息分类
  confirmOrderData: []
}

export default new Vuex.Store({
  state,
  modules: {},
  getters,
  actions,
  mutations
})
