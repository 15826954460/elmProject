<template>
  <div class="confirm_box">

    <transition name="parent-slide" mode="out-in">
      <div class="confirm_order_wrapper" v-show="!cnofirmShowChildren">
        <vhead message="确认订单">
          <span class="fa fa-angle-left" slot="angle" @click="goToShop"></span>
          <router-link to="/login" slot="login" tag="span" class="login"
                       v-if="isShowLogin">登陆|注册
          </router-link>
          <router-link to="/resetSecret" tag="span" slot="reset_secret"
                       class="reset_secret" v-else>重置密码</router-link>
        </vhead>
        <div>
          <div class="address_empty_left">
            <div class="map_wrapper"><span class="fa fa-map-marker"></span></div>
            <div class="add_address" v-if="negativeCheckedAddress === ''"
                 @click="goToChildrenRouter('chooseAddress')">请添加一个收获地址</div>
            <div class="address_detail_wrapper add_address" v-else
                 @click="goToChildrenRouter('chooseAddress')">
              <header>
                <span class="family_name">{{negativeCheckedAddress.name}}</span>
                <span class="sex">{{negativeCheckedAddress.sex}}</span>
                <span>{{negativeCheckedAddress.phone}}</span>
                <span>{{negativeCheckedAddress.remarkphone}}</span>
              </header>
              <div class="address_detail">
                <span class="home">{{negativeCheckedAddress.tab}}</span>
                <span>{{negativeCheckedAddress.detailaddress}}</span>
              </div>
            </div>
            <span class="fa fa-angle-right"></span>
          </div>
        </div>
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
            <span class="app_support">暂时只在饿了么 APP 中支持</span>
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
          <div class="note" @click="goToChildrenRouter('orderNote')">
            <span>订单备注</span>
            <p class="taste" v-if="Object.keys(remarkObj).length === 0">口味、偏好</p>
            <p class="taste" v-else><span v-for="(item, index) in remarkObj">{{item[1]}}、</span></p>
            <i class="fa fa-angle-right"></i>
          </div>
          <div class="invoice" @click="goToChildrenRouter('invoice')">
            <span>发票</span>
            <p class="no_invoice">不需要开发票</p>
            <i class="fa fa-angle-right"></i>
          </div>
        </div>

        <footer class="footer_container">
          <span class="wait_pay" v-if="checkout">待支付 ￥{{checkout.cart.total}}</span>
          <span class="confirm_order" @click="configPay">确认下单</span>
        </footer>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>

    <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
    </alertBounced>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vhead from '../../components/header/header.vue'
  import alertBounced from '../../components/bounced/bounced'
  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com',
        showAlert: false,  // 显示弹框
        alertText: '' // 弹框内容
      }
    },
    components: {
      vhead,
      alertBounced
    },
    computed: {
      ...mapGetters(['checkout', 'cnofirmShowChildren', 'remarkObj', 'isShowLogin', 'addressList', 'negativeCheckedAddress'])
    },
    mounted () {
      // 是否显示子路由
      let win = window.localStorage
      if (win.getItem('cnofirmShowChildren') === null || win.getItem('cnofirmShowChildren') === 'false') {
        this.$store.commit('setCnofirmShowChildren', false)
      } else {
        this.$store.commit('setCnofirmShowChildren', true)
      }
      // 页面刷新从本地获取用户的地址信息
      if (win.getItem('addressList') === null) {
        this.$store.commit('setAddressList', this.addressList)
      } else {
        this.$store.commit('setAddressList', JSON.parse(win.getItem('addressList')))
      }
      // 页面刷新依然显示用户选择的订单备注
      if (win.getItem('remarkObj') !== null) {
        this.$store.commit('setRemarkObj', JSON.parse(win.getItem('remarkObj')))
      } else {
        this.$store.commit('setRemarkObj', {})
      }
      // 页面刷新判断是否显示登陆注册
      if (win.getItem('userInfo') === null) {
        this.$store.commit('setIsShowLogin', true)
      } else {
        this.$store.commit('setIsShowLogin', false)
      }
      // 获取用户当前选择的地址
      if (win.getItem('negativeCheckedAddress') === null) {
        this.$store.commit('setNegativeCheckedAddress', '')
      } else {
        this.$store.commit('setNegativeCheckedAddress', JSON.parse(win.getItem('negativeCheckedAddress')))
      }
    },
    methods: {
      goToChildrenRouter (adv) { // 切换到子路由
        this.$router.push({path: '/confirmOrder/' + adv})
        this.$store.commit('setCnofirmShowChildren', true)
        window.localStorage.setItem('cnofirmShowChildren', true)
      },
      goToShop () { // 切换到shop页面
        this.$router.push({path: '/shop'})
        window.localStorage.setItem('cnofirmShowChildren', false)
      },
      showPayWayFun () {
      },
      configPay () { // 确认订单
        if (window.localStorage.getItem('userInfo') === null) {
          this.alertText = '请登录'
          this.showAlert = true
        } else {
          if (this.showAddAddress === true) {
            this.alertText = '请添加您的收获地址'
            this.showAlert = true
          } else {
            this.$router.push({path: '/pay'})
          }
        }
      }
    }
  }
</script>
<style scoped>
  @import './confirmOrder.css';
</style>
