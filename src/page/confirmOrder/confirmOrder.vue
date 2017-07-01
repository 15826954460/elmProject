<template>
  <div class="confirm_box">
    <div class="confirm_order_wrapper" v-show="!cnofirmShowChildren">
      <vhead message="确认订单">
        <span class="fa fa-angle-left" slot="angle" @click="$router.go(-1)"></span>
        <router-link to="/login" slot="login" tag="span" class="login">登陆/注册</router-link>
      </vhead>
      <router-link to="">
        <div class="address_empty_left">
          <div class="map_wrapper"><span class="fa fa-map-marker"></span></div>
          <div class="add_address" v-if="showAddressDetail">请添加一个收获地址</div>
          <div class="address_detail add_address" v-if="!showAddressDetail">
            <header>
              <span class="family_name">{{addressList.name}}1</span>
              <span class="sex">{{addressList.sex}}1</span>
              <span>{{addressList.phone}}1</span>
            </header>
            <div class="address_detail">
              <span class="home">{{addressList.tag}}</span>
              <span>{{addressList.address_detail}}</span>
            </div>
          </div>
          <span class="fa fa-angle-right"></span>
        </div>
      </router-link>
      <section class="delivery_model container_style">
        <p class="deliver_text">送达时间</p>
        <div class="deliver_time" v-if="checkout">
          <p>尽快送达 | 预计{{checkout.delivery_reach_time}}</p>
          <p class="fengniao" v-if="checkout.cart.is_deliver_by_fengniao">蜂鸟专送</p>
        </div>
      </section>

      <section class="pay_way container_style">
        <header class="header_style">
          <span>支付方式</span>
          <div class="more_type" @click="showPayWayFun">
            <span>在线支付</span>
            <span class="fa fa-angle-right"></span>
          </div>
        </header>
        <section class="hongbo">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>

      <section class="food_list" v-if="checkout">
        <header>
          <img :src="imgBaseUrl + checkout.cart.restaurant_info.image_path">
          <span>{{checkout.cart.restaurant_info.name}}</span>
        </header>
        <ul class="food_list_ul">
          <li v-for="item in checkout.cart.groups[0]" :key="item.id" class="food_item_style">
            <p class="food_name ellipsis">{{item.name}}</p>
            <div class="num_price">
              <span>x {{item.quantity}}</span>
              <span>¥{{item.price}}</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style">
          <p class="food_name ellipsis">{{checkout.cart.extra[0].name}}</p>
          <div class="num_price">
            <span></span>
            <span>¥ {{checkout.cart.extra[0].price}}</span>
          </div>
        </div>
        <div class="food_item_style total_price">
          <p class="food_name ellipsis">订单 ¥{{checkout.cart.total}}</p>
          <div class="num_price">
            <span>待支付 ¥{{checkout.cart.total}}</span>
          </div>
        </div>
      </section>

      <div class="note_wrapper">
        <div class="note" @click="goToNoteOrInvoice('orderNote')">
          <span>订单备注</span>
          <p>口味、偏好</p>
          <i class="fa fa-angle-right"></i>
        </div>
        <div class="invoice" @click="goToNoteOrInvoice('invoice')">
          <span>发票</span>
          <p>不需要开发票</p>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>

      <footer class="footer_container">
        <span class="wait_pay" v-if="checkout">待支付 ￥{{checkout.cart.total}}</span>
        <span class="confirm_order">确认下单</span>
      </footer>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vhead from '../../components/header/header.vue'
  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com',
        addressList: {}, // 收获地址
        showAddressDetail: true
      }
    },
    components: {
      vhead
    },
    mounted () {
      if (window.sessionStorage.getItem('cnofirmShowChildren') === null || window.sessionStorage.getItem('cnofirmShowChildren') === 'false') {
        this.$store.commit('setCnofirmShowChildren', false)
      } else {
        this.$store.commit('setCnofirmShowChildren', true)
      }
      if (window.sessionStorage.getItem('addressList') === null) {
        this.showAddressDetail = true
      } else {
        this.showAddressDetail = false
        this.addressList = JSON.parse(window.sessionStorage.getItem('addressList'))
      }
    },
    computed: {
      ...mapGetters(['checkout', 'cnofirmShowChildren'])
//      addressList () {
//        if (window.sessionStorage.getItem('addressList') === null) {
//          return ''
//        } else {
//          return JSON.parse(window.sessionStorage.getItem('addressList'))
//        }
//      }
    },
    methods: {
      showPayWayFun () {
      },
      goToNoteOrInvoice (adv) {
        console.log(adv)
        this.$router.push({path: '/confirmOrder/' + adv})
        this.$store.commit('setCnofirmShowChildren', true)
        window.sessionStorage.setItem('cnofirmShowChildren', true)
      }
    }
  }
</script>
<style scoped>
  @import './confirmOrder.css';</style>
