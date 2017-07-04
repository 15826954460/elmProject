<template>
  <div class="order-box">

    <transition name="parent-slide" mode="out-in">
      <div v-show="$root.isShowOrderDetail" class="order-wrapper">

        <vheader message="订单列表">
          <span class="fa fa-angle-left" slot="angle" @click="$router.go(-1)"></span>
        </vheader>

        <ul class="list-wrapper">
          <li class="list-item" v-for="(list, listIndex) in orderList">
            <div class="left" @click="gotoDetail(list.id)">
              <img :src="list.restaurant_image_url" alt="">
            </div>
            <div class="right">
              <div @click="gotoDetail(list.id)">
                <h2>
                  <p class="restaurant_name">
                    <span>{{list.restaurant_name}}</span>
                    <span class="fa fa-angle-right"></span>
                  </p>
                  <span class="cancel">{{list.status_bar.title}}</span>
                </h2>
                <p>{{list.formatted_created_at}}</p>
              </div>
              <p class="foodName" @click="gotoDetail(list.id)">
                <span>{{list.basket.group[0][0].name}}{{list.basket.group[0] | formatLen}}</span>
                <span>{{list.total_amount | formatMoney('￥', '.00')}}</span>
              </p>
              <p class="order-again"><span>再来一单</span></p>
            </div>
          </li>
        </ul>
        <vfoot></vfoot>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>
  import vfoot from '../../components/footer/footNav.vue'
  import vheader from '../../components/header/header.vue'
  export default {
    computed: {
      orderList () {  // 订单列表数据
        return this.$store.getters.orderList
      }
    },
    components: {
      vfoot,
      vheader
    },
    created () {
      let detail = window.localStorage.getItem('isShowOrderDetail')
      if (detail === null) { // 本地没有值得情况下，就显示
        this.$root.isShowOrderDetail = true
      } else if (detail === 'false') {
        this.$root.isShowOrderDetail = false
      } else {
        this.$root.isShowOrderDetail = true
      }
    },
    methods: {
      gotoDetail (id) {
        this.$root.isShowOrderDetail = false // 隐藏父路由
        window.localStorage.setItem('isShowOrderDetail', false) // 本地保存状态，在子路由中刷新时做判断
        this.$router.push({path: '/order/detail'})
        window.localStorage.setItem('id', id) // 保存相对应的id
      }
    },
    filters: { // 过滤器
      formatLen: function (val) {
        let len = val.length > 1 ? '等' + val.length + '件商品' : ''
        return len
      },
      formatMoney: function (val, type, num) {
        return type + val + num
      }
    }
  }
</script>
<style scoped>
  @import './order.css';
</style>
