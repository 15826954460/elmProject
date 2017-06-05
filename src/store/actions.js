/**
 * Created by lele on 2017/5/5.
 */
import axios from 'axios'
export const businessData = ({commit}) => {
  axios.get('/api/business').then((res) => {
    commit('setBusiness', res.data.business)
  })
}
export const orderListData = ({commit}) => {
  axios.get('/api/orderList').then((res) => {
    commit('setOrderList', res.data.orderList)
  })
}
export const orderDetailData = ({commit}) => {
  axios.get('/api/orderDetail').then((res) => {
    commit('setOrderDetail', res.data.orderDetail)
  })
}
export const foodTypesData = ({commit}) => {
  axios.get('/api/foodTypes').then((res) => {
    commit('setFoodTypes', res.data.foodTypes)
  })
}
export const groupCity = ({commit}) => {
  axios.get('/api/group_cityData').then((res) => {
    commit('setGroupCity', res.data.group_cityData)
  })
}
export const hotCity = ({commit}) => {
  axios.get('/api/hot_city').then((res) => {
    commit('setHotCity', res.data.hot_city)
  })
}
export const searchData = ({commit}) => {
  axios.get('/api/search_data').then((res) => {
    commit('setSearchData', res.data.search_data)
  })
}
export const shopListData = ({commit}) => {
  axios.get('/api/shopList').then((res) => {
    commit('setShopList', res.data.shopList)
  })
}
export const addDetailData = ({commit}) => {
  axios.get('/api/add_detail').then((res) => {
    commit('setAddDetail', res.data.add_detail)
  })
}
export const service = ({commit}) => {
  axios.get('/api/service').then((res) => {
    commit('setService', res.data.service)
  })
}
export const hongbaoList = ({commit}) => {
  axios.get('/api/hongbaoList').then((res) => {
    commit('setHongbaoList', res.data.hongbaoList)
  })
}
export const shopDetails = ({commit}) => {
  axios.get('/api/shopDetails').then((res) => {
    commit('setShopDetails', res.data.shopDetails)
  })
}
export const shopMenu = ({commit}) => {
  axios.get('/api/shopMenu').then((res) => {
    commit('setShopMenu', res.data.shopMenu)
  })
}
export const ratingList = ({commit}) => {
  axios.get('/api/ratingList').then((res) => {
    commit('setRatingList', res.data.ratingList)
  })
}
export const scores = ({commit}) => {
  axios.get('/api/scores').then((res) => {
    commit('setScores', res.data.scores)
  })
}
export const tage = ({commit}) => {
  axios.get('/api/tage').then((res) => {
    commit('setTage', res.data.tage)
  })
}
