<template>
  <div class="detail-wrapper">
    <vheader message="订单详情">
      <span class="fa fa-angle-left" slot="angle" @click="backToOrder"></span>
    </vheader>
    <section class="shopLogo" v-if="orderNegative.orderList">
      <div class="shopLogo-img">
        <img :src="orderNegative.orderList.restaurant_image_url" alt="">
      </div>
      <h2>{{orderNegative.orderList.timeline_node.title}}</h2>
      <p class="cancle-reason" v-if="orderNegative.orderList">{{orderNegative.orderList.timeline_node.description}}</p>
      <router-link to="" class="list-again" tag="span">再来一单</router-link>
    </section>

    <section class="shopDetail"  v-if="orderNegative.orderList && orderNegative.orderDetail">
      <router-link to="/user" tag="div">
        <div>
          <img :src="orderNegative.orderList.restaurant_image_url" alt="">
        </div>
        <p>{{orderNegative.orderDetail.restaurant_name}}</p>
        <span class="fa fa-angle-right"></span>
      </router-link>
      <ul>
        <li v-for="(group, groupIndex) in orderNegative.orderDetail.basket.group[0]">
          <span>{{group.name}}</span><span>{{group.quantity | formatN('x')}}</span><span>{{group.price | formatM('￥')}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import vheader from '../../../components/header/header.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      vheader
    },
    computed: {
      orderNegative () {
        let id = parseInt(window.localStorage.getItem('id'))
        let orderList = this.$store.getters.orderList
        let orderDetail = this.$store.getters.orderDetail
        let orderObj = {}
        // 获取当前的orderList
        for (let i = 0, len = orderList.length; i < len; i++) {
          if (parseInt(orderList[i].id) === id) {
            orderObj.orderList = orderList[i]
          }
        }
        // 获取当前的orderDetail
        for (let i = 0, len = orderDetail.length; i < len; i++) {
          if (parseInt(orderDetail[i].id) === id) {
            orderObj.orderDetail = orderDetail[i]
          }
        }
        return orderObj
      }
    },
    methods: {
      backToOrder () {
        this.$root.isShowOrderDetail = true
        window.localStorage.setItem('isShowOrderDetail', true) // 保存状态，在父路由中刷新页面时起作用
        this.$router.push({path: '/order'})
      }
    },
    filters: {
      formatN: function (val, type) {
        return type + ' ' + val
      },
      formatM: function (val, num) {
        return num + val
      }
    }
  }
</script>
<style scoped>
  @import 'detail.css';
</style>
