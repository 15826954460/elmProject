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
      payType () {
        if (window.localStorage.getItem('userInfo') === null) {
          this.alertText = '请登录'
          this.showAlert = true
        } else {
          if (this.negativeCheckedAddress === '') {
            this.alertText = '请添加您的收获地址'
            this.showAlert = true
          } else {
            this.$router.push({path: '/pay'})
          }
        }
      },
      showPayWayFun () {
        this.payType()
      },
      configPay () { // 确认订单
        this.payType()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/animate.less';
  .confirm_box {
    .confirm_order_wrapper {
      .pt(.8rem);
      .pb(1.5rem);
      min-height: 100vh;
      background: @f7;
      .address_empty_left {
        background: @default;
        height: 2rem;
        font-size: 0.24rem;
        padding: .3rem;
        .flex;
        .at;
        .rel;
        .mb(.2rem);
        .map_wrapper {
          flex: 1;
          .fa-map-marker {
            font-size: .4rem;
          }
        }
        >.add_address {
          .pt();
          flex: 9;
          color: @black;
          font-size: .32rem;
          header,
          .address_detail {
            span {
              font-size: 0.24rem;
            }
            .family_name {
              .fw;
              font-size: .3rem;
            }
            .sex, .home {
              .mr(.2rem);
            }
          }
        }
        .fa-angle-right {
          .abs;
          .vc;
          right: .2rem;
          font-size: .8rem;
        }
      }
      .delivery_model {
        background: @default;
        font-size: .24rem;
        .flex;
        .at;
        border-left: 3px solid @background;
        height: 2rem;
        .mb(.2rem);
        .deliver_text {
          flex: 1;
          .ml(.6rem);
          color: @4D;
          font-size: .4rem;
          .fw;
        }
        .deliver_time {
          flex: 1;
          color: @background;
          p {
            line-height: .5rem;
          }
          .fengniao {
            padding: 0 5px;
            background: @background;
            color: @default;
            .inb;
            .b-r(5px);
          }
        }
      }
      .pay_way {
        font-size: .24rem;
        background: @default;
        padding: 0 .3rem;
        .mb(.2rem);
        header {
          border-bottom: 1px solid @ddd;
          line-height: 1rem;
          height: 1rem;
          .flex;
          span {
            flex: 1;
          }
          .more_type {
            flex: 1;
            .tr;
            .rel;
            color: @ddd;
            .pr(.3rem);
            .fa-angle-right {
              font-size: .4rem;
              .abs;
              .vc;
              right: 0;
            }
          }
        }
        .hongbo {
          line-height: 1rem;
          .app_support{
            .rf;
          }
        }
      }
      .food_list {
        font-size: .24rem;
        background: @default;
        header {
          height: 1.2rem;
          line-height: 1.2rem;
          img {
            width: .8rem;
            .mr(.2rem);
            .ml(.2rem);
          }
        }
        .food_item_style {
          line-height: .8rem;
          border-top: 1px solid #ddd;
          .flex;
          .food_name {
            flex: 3;
            .ellipsis;
            .pl(.2rem);
          }
          .num_price {
            flex: 1;
            .flex;
            span {
              flex: 1;
            }
            span:first-child {
              color: @orange;
              .fw;
            }
          }
        }
      }
      .note_wrapper{
        .mt(10px);
        padding:10px;
        background:@default;
        .note{
          border-bottom:1px solid @ddd;
        }
        .note,.invoice{
          line-height:.8rem;
          background:@default;
          font-size:14px;
          .pr(20px);
          .rel;
          span{
            .lf;
          }
          .no_invoice{
            .rf;
          }
          .taste{
            .inb;
            .rf;
            max-width:60%;
            .ellipsis;
          }
          i{
            .abs;
            right:5px;
            .vc;
            font-size: 20px;
          }
        }
      }
    }
    .footer_container{
      .fix;
      bottom:0;
      width:100%;
      font-size:14px;
      color:@default;
      height:1rem;
      line-height:1rem;
      .flex;
      .wait_pay{
        flex:2;
        background:#3c3c3c;
        .pl(10px);
      }
      .confirm_order{
        flex:1;
        .tc;
        background:#56D176;
        color:@default;
      }
    }
  }
  .animateChildren;
  .animateParent;
</style>
