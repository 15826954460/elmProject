<template>
  <div class="shop-box">

    <transition name="parent-slide" mode="out-in">

      <div class="shop-wrapper" v-show="$root.showShop">
        <!--头部-->
        <header ref="shopheader" v-show="menudetailIntro">
          <section class="header-top">
            <div class="header-left">
              <img :src="getImgPath(shopDetail.image_path)">
            </div>
            <div class="header-right">
              <h2>{{shopDetail.description}}</h2>
              <p>商家配送 / {{shopDetail.order_lead_time}}分钟送达 / 配送费{{shopDetail.float_delivery_fee}}元</p>
              <p class="notice">公告：{{promotionInfo}}</p>
              <i class="fa fa-angle-right" @click="_goToShopDetail"></i>
            </div>
          </section>
          <section class="header-bottom" v-if="shopDetail.activities">
            <p @click="showActivitiesFun = true">
              <span :style="{background:'#'+shopDetail.activities[0].icon_color}"
                    class="bottom_one">{{shopDetail.activities[0].icon_name}}</span>
              <span class="bottom_two">{{shopDetail.activities[0].description}}(APP专享)</span>
              <span class="bottom_three">{{shopDetail.activities.length}}个活动</span>
              <span class="fa fa-angle-right"></span>
            </p>
          </section>

          <div class="blur">
            <img :src="getImgPath(shopDetail.image_path)">
          </div>

          <i class="fa fa-angle-left" @click="goToMenu"></i>

        </header>
        <!--介绍详情-->
        <transition name="fade">
          <section class="activities_details" v-show="showActivitiesFun">
            <h2 class="activities_shoptitle">{{shopDetail.name}}</h2>
            <section class="activities_list">
              <header class="activities_title_style"><span>优惠信息</span></header>
              <ul>
                <li v-for="item in shopDetail.activities" :key="item.id">
                  <span class="activities_icon"
                        :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                  <span>{{item.description}}（APP专享）</span>
                </li>
              </ul>
            </section>
            <section class="activities_shopinfo">
              <header class="activities_title_style"><span>商家公告</span></header>
              <p>{{promotionInfo}}</p>
            </section>
            <i class="fa fa-remove" @click="showActivitiesFun = false"></i>
          </section>
        </transition>
        <!--导航部分-->
        <section class="shop_nav" ref="chooseType" v-show="menudetailIntro">
          <div @click="negativeProduct = true">
            <span :class="{negative:negativeProduct}">商品</span>
          </div>
          <div @click="negativeProduct = false">
            <span :class="{negative:!negativeProduct}">评价</span>
          </div>
        </section>
        <!--商品信息-->
        <transition name="shop-detail" mode="out-in">
          <section class="food_type goods" v-show="negativeProduct && menudetailIntro">
            <!--左侧菜品导航-->
            <div class="menuwrapper" ref="menuwrapper">
              <ul class="food_type_nav">
                <li v-for="(item, index) in shopMenu" :class="{current:currentIndex === index}"
                    @click="selectMenu(index, $event)" class="menu_wrapper menu_nav_hook">
                  <img :src="getImgPath(item.icon_url)" alt="" v-if="item.icon_url">{{item.name}}>
                  <span class="single_num" v-if="showLessBtn"
                        v-show="singleShopListNum[index]>0">{{singleShopListNum[index]}}</span>
                </li>
              </ul>
            </div>
            <!--右侧菜名列表-->
            <div class="foodwrapper" ref="foodwrapper">
              <ul class="food_type_detail">
                <li v-for="(item, index) in shopMenu" class="food-list-hook">
                  <header>
                    <strong>{{item.name}}</strong>
                    <p>{{item.description}}</p>
                  </header>
                  <section class="content" v-for="(foodList, foodIndex) in item.foods" @click="goMenuDetail(foodList)">
                    <div class="content_left">
                      <img :src="getImgPath(foodList.image_path)" v-if="foodList.image_path">
                    </div>
                    <div class="content_right">
                      <h4 class="title">{{foodList.name}}</h4>
                      <p class="intro">{{foodList.description}}</p>
                      <p class="seller">
                        <span>月销{{foodList.month_sales}}份</span>
                        <span>好评率{{foodList.satisfy_rate}}%</span>
                      </p>
                      <div class="change_type">
                        <div class="price_wrapper" v-if="foodList.specfoods"><span
                          class="price">￥{{foodList.specfoods[0].price}}</span>
                          <span>起</span>
                        </div>
                        <!--点击添加数量组件-->
                        <div class="about_buy_num">

                          <p class="about_num" v-if="showLessBtn">
                            <transition name="fade-buy" mode="out-in">
                              <span class="fa fa-minus-square-o" v-if="shopCartList.cartList"
                                    v-show="shopCartList.cartList[index][foodIndex].num >0"
                                    @click.stop="addNum(index, foodIndex, -1, foodList)">
                              </span>
                            </transition>
                            <transition name="fade-buy" mode="out-in">
                              <span class="buy_num" v-if="shopCartList.cartList"
                                    v-show="shopCartList.cartList[index][foodIndex].num > 0">
                                {{shopCartList.cartList[index][foodIndex].num}}
                              </span>
                            </transition>
                          </p>
                          <p class="add_num">
                            <span class="fa fa-plus-square"
                                  v-if="foodList.specfoods.length<=1"
                                  @click.stop="addNum(index, foodIndex, 1, foodList)">
                            </span>
                            <span class="norms" v-else @click.stop="normWrapper(index, foodIndex, foodList)">
                              选规格
                            </span>
                          </p>

                        </div>
                      </div>
                    </div>
                  </section>
                </li>
              </ul>

            </div>
            <!--规格弹框-->
            <section class="norms_wrapper" v-if="isShowNormWrapper">
              <div class="content">
                <header>{{foodsList.name}}<i class="fa fa-remove" @click="isShowNormWrapper = false"></i></header>
                <h4>规格</h4>
                <span class="specs"
                      v-for="(item, index) in foodsList.specfoods"
                      :class="{current_specs:specsIndex === index}"
                      @click="specsCurrentIndex(index)">{{item.specs[0].value}}</span>
                <footer>
                  <span>￥</span>
                  <span
                    v-for="(item, index) in foodsList.specfoods"
                    v-show="specsIndex === index">{{item.price}}</span>
                  <button @click="addShopCart(foodsList.specfoods)">加入购物车</button>
                </footer>
              </div>
            </section>
            <!--提示关于规格商品的信息在哪里删除-->
            <transition name="fade" mode="out-in">
              <section class="prompt" v-show="prompt" @click="prompt = false">
                <p>规格商品只能去购物车进行删除!!!</p>
              </section>
            </transition>

            <span class="fa fa-plus-square" id="fa-plus-square"></span>

          </section>
        </transition>
        <!--评价信息-->
        <transition name="appraise-info" mode="out-in">
          <section class="appraise_wrapper" v-if="!negativeProduct">

            <section class="appraise_info">
              <div class="appraise_info_left">
                <span class="appraise_comprehensive">{{shopDetail.rating}}</span>
                <p>综合评价</p>
                <span class="height_other">高于周边商家{{(scores.compare_rating*100)}}%</span>
              </div>

              <div class="appraise_info_right">
                <ul>
                  <li><span>服务态度</span>
                    <vstar :rating='scores.service_score'></vstar>
                    <span>{{scores.service_score}}</span></li>
                  <li><span>菜品评价</span>
                    <!--<vstar :rating='scores.food_score'></vstar>-->
                    <span>{{scores.food_score}}</span></li>
                  <li><span>送达时间</span>{{scores.deliver_time}}<span>分钟</span></li>
                </ul>
              </div>
            </section>

            <section class="type">
              <p v-for="(item, index) in tage"
                 :class="{active_current:activeIndex === index}" @click="choose(index)">
                <span>{{item.name}}</span><span>({{item.count}})</span></p>
            </section>

            <section class="appraise_detail">
              <ul>
                <li v-for="item in ratingList">
                  <div class="appraise_detail_left">
                    <img :src="getImgPath(item.avatar)" alt="">
                  </div>
                  <div class="appraise_detail_right">
                    <header><span class="header_name">{{item.username}}</span><span
                      class="header_time">{{item.rated_at}}</span></header>
                    <p>
                      <vstar :rating="item.rating_star"></vstar>
                      {{item.time_spent_desc}}
                    </p>
                    <div class="img_wrapper">
                      <img v-for="ratings in item.item_ratings" :src="getImgPath(ratings.image_hash)" alt=""
                           v-if="ratings.image_hash">
                    </div>
                    <span class="appraise_detail_right_intro"
                          v-for="ratings in item.item_ratings">{{ratings.food_name}}</span>
                  </div>
                </li>
              </ul>
            </section>

          </section>
        </transition>

        <!--菜品详情介绍-->
        <transition name="meun-detail" mode="out-in">
          <vmenudetail :foods="menuDetail" v-show="!menudetailIntro" @childSay="regainmenudetailIntro"></vmenudetail>
        </transition>

        <!--底部信息-->
        <section class="buy_cart_container" v-show="negativeProduct">

          <section class="cart_icon_num">
            <div class="cart_icon_container">
              <div class="round-wrapper" :class="{active_num:totleNum >0}">
                <span class="fa fa-shopping-cart" :class="{animate:isAddNum}"></span>
                <span class="totle_num" v-show="totleNum >0 ">{{totleNum}}</span>
              </div>
            </div>
            <div class="cart_num">
              <div>¥{{totlePrice}}.00</div>
              <div>配送费¥5</div>
            </div>
          </section>

          <section class="gotopay">
            <span class="" v-if="totlePrice<20">还差¥20起送</span>
            <router-link to="/confirmOrder" class="gotopay_button_style" v-else tag="span">去结算
            </router-link>
          </section>

        </section>

      </div>
    </transition>
    <!--加载子页面-->
    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getImgPath} from '../../mixin/getPath'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import vstar from '../../components/start/star.vue'
  import vmenudetail from '../../components/menuDetail/meunDetail.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        negativeProduct: true,  // 商家列表
        menudetailIntro: true,  // 菜品详情
        showActivitiesFun: false, // 商品详情
        isShowNormWrapper: false,
        listHeight: [], // 保存foodwraper中所有li的高度
        scrollY: 0, // 滚动距离
        menuScroll: '',
        foodScroll: '',
        shopListTop: [], // 保存foodwraper中所有li的高度
        shopMenu: [], // 菜品详情
        shopDetail: {},  // 商家详情
        showLessBtn: false, // 显示减少按钮
        activeIndex: 0,
        menuDetail: null, // 像自组建传值
        showMenuDetail: false, // 显示菜品详情
        specsIndex: 0, // 规格选择
        stateIndex: null,
        stateFoodIndex: null,
        totlePrice: 0, // 所有商品的总价
        totleNum: 0, // 所有商品的总数量
        singleShopListNum: {}, // 单个商品列表总数两的集合
        shopCartList: {},
        prompt: false, // 提示信息的删除弹框
        isAddNum: false,
        timer: null,
        stepLength: 10  // 落下图标的步长
      }
    },
    computed: {
      ...mapGetters([
        'tage', 'ratingList', 'foodsList', 'scores'
      ]),
      promotionInfo () { // 自定义提示信息
        return this.$store.getters.shopDetails.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
      },
      initShopCart () { // 初始化简易的购物车列表
        let shopMenu = this.$store.getters.shopMenu
        let obj = {}
        obj.cartList = []
        for (let i = 0, len = shopMenu.length; i < len; i++) {
          let array = []
          let foods = shopMenu[i].foods
          for (let r = 0, len = foods.length; r < len; r++) {
            let obj = {}
            obj.item_id = foods[r].item_id
            obj.num = 0
            obj.price = 0
            array.push(obj)
          }
          obj.cartList.push(array)
        }
        return obj
      },
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 判断当currentIndex在height1和height2之间的时候显示
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          // 最后一个区间没有height2
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    mixins: [getImgPath],
    components: {
      vstar,
      vmenudetail
    },
    methods: {
      normWrapper (index, foodIndex, foodList) { // 弹出规格弹框
        this.isShowNormWrapper = true
        this.specsIndex = 0 // 每次弹出重新将specsIndex置0
        this.$store.commit('setFoodsList', foodList)
        // 保存当前的下标
        this.stateIndex = index
        this.stateFoodIndex = foodIndex
      },
      _goToShopDetail () {  // 返回购物车详情页
        this.$root.showShop = false
        window.localStorage.setItem('showShop', false)
        this.$router.push({path: '/shop/shopdetail'})
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodwrapper, {
          click: true,
          // 探针作用，实时监测滚动位置
          probeType: 3
        })
        // 设置监听滚动位置
        this.foodScroll.on('scroll', (pos) => {
          // scrollY接收变量
          this.scrollY = Math.abs(Math.round(pos.y))
          // 右侧滚动的时候左侧也对应的滚动到相对应的位置
          let menuList = this.$refs.menuwrapper.getElementsByClassName('menu_nav_hook')
          let nel = menuList[this.currentIndex]
          this.menuScroll.scrollToElement(nel, 300)
        })
      },
      selectMenu (index, event) {
        // 自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
        if (!event._constructed) {
          return
        }
        // 运用BScroll接口,右侧菜单滚动到相应位置
        let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook')
        // 获取对应元素的列表
        let fel = foodList[index]
        this.foodScroll.scrollToElement(fel, 400)
      },
      _calculateHeight () {
        let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook')
        let height = 0
        // 把第一个高度送入数组
        this.listHeight.push(height)
        // 通过循环foodList下的dom结构，将每一个li的高度依次送入数组
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      addNum (index, foodIndex, adv, foodList) {
        // 判断是否给shopCart是否为{} 如果是，则使用初始化数据
        if (JSON.stringify(this.shopCartList) === '{}') {
          let cartLists = this.initShopCart
          this.commentCode(cartLists, index, foodIndex, adv, foodList)
        } else { // 否则使用已经存在的shopCart
          let cartLists = this.shopCartList
          this.commentCode(cartLists, index, foodIndex, adv, foodList)
        }
      },
      commentCode (cartLists, index, foodIndex, adv, foodList) {  // 提取公用代码
        let count = parseInt(cartLists.cartList[index][foodIndex].num)
        // 根据点击按钮来判断是否可以减少数量
        if (adv === 1) {
          cartLists.cartList[index][foodIndex].price += foodList.specfoods[0].price
          count++
          // 飞入购物车动画，这里是通过改变css样式来实现的，没有用插件 插件可以百度搜索jquery.fly.min.js
          let span = $('.food-list-hook').eq(index).find('.content').eq(foodIndex).find('.fa-plus-square') // 获取当前元素
          let offsetSpan = span.offset() // 获得offset对象
          let cart = $('.fa-shopping-cart')  // 获取购物车图标按扭
          let offsetCart = cart.offset()
          let spanClone = span.clone()  // 浅复制一个添加按钮元素
          $('.shop-box').append(spanClone)  // 添加元素到文档
          spanClone.css({  // 设置css样式
            position: 'fixed',
            top: offsetSpan.top + 'px',
            left: offsetSpan.left + 'px',
            color: span.css('color'),
            fontSize: span.css('font-size')
          })
          $('.shop-box>.fa-plus-square').animate({ // jquery动画化栈,模拟飞入购物车效果
            left: offsetCart.left + 60 + 'px',
            top: offsetSpan.top + 20 + 'px',
            opacity: 0.5
          }, {duration: 250}).animate({
            left: offsetCart.left + 'px',
            top: offsetCart.top + 'px',
            opacity: 1
          }, 250)
          setTimeout(() => { // 每次执行完之后移除添加的元素，并给购物车按钮添加class
            $('.shop-box>.fa-plus-square').remove()
            this.isAddNum = true
          }, 500)
          setTimeout(() => { // 删除购物车按钮添加class
            this.isAddNum = false
          }, 600)
        } else {
          if (count > 0 && foodList.specfoods.length <= 1) { // 非规格商品，直接减少数量更改总价
            count--
            cartLists.cartList[index][foodIndex].price -= foodList.specfoods[0].price
          } else {  // 规格商品，弹出提示框
            this.prompt = true
          }
        }
        cartLists.cartList[index][foodIndex].num = count
        this.shopCartList = cartLists
        this.totleMoney()  // 调用总价方法
        this.allNum() // 调用总数量方法
        this.pageNum(cartLists, index)
        this.showLessBtn = true // 购物车有商品信息时，显示按扭
        window.localStorage.setItem('showLessBtn', this.showLessBtn)
        window.localStorage.setItem('setshopCartList', JSON.stringify(cartLists)) // 将数据保存到本地
      },
      addShopCart (item) { // 点击选则规格时候，向购物车添加，价格和数量
        if (JSON.stringify(this.shopCartList) === '{}') {
          this.shopCartList = this.initShopCart
          this.showLessBtn = true
          this.normCommentCode(item)
        } else {
          this.normCommentCode(item)
        }
        this.isShowNormWrapper = false
      },
      normCommentCode (item) {
        let shopList = this.shopCartList.cartList[this.stateIndex][this.stateFoodIndex]
        let count = shopList.num
        count++
        shopList.num = count
        shopList.price += parseInt(item[this.specsIndex].price)
        this.totleMoney()
        this.allNum()
        this.pageNum(this.shopCartList, this.stateIndex)
        window.localStorage.setItem('setshopCartList', JSON.stringify(this.shopCartList))
      },
      totleMoney () { // 获取所有商品的总价格
        this.totlePrice = 0
        for (let i = 0, len = this.shopCartList.cartList.length; i < len; i++) {
          for (let r = 0, len = this.shopCartList.cartList[i].length; r < len; r++) {
            this.totlePrice += parseInt(this.shopCartList.cartList[i][r].price)
          }
        }
        window.localStorage.setItem('totlePrice', this.totlePrice)
      },
      allNum () {  // 获取所有商品的总数量
        this.totleNum = 0
        for (let i = 0, len = this.shopCartList.cartList.length; i < len; i++) {
          for (let r = 0, len = this.shopCartList.cartList[i].length; r < len; r++) {
            this.totleNum += parseInt(this.shopCartList.cartList[i][r].num)
          }
        }
        window.localStorage.setItem('totleNum', this.totleNum)
      },
      pageNum (cartLists, index) {  // 获取单个商家的下单总量
        // 这里是获取单个商家的数量，该循环的位置要放在每个店铺的数量改变之后
        let pageNum = 0
        for (let i = 0; i < cartLists.cartList[index].length; i++) {
          pageNum += cartLists.cartList[index][i].num
        }
        this.singleShopListNum[index] = pageNum
        window.localStorage.setItem('singleShopListNum', JSON.stringify(this.singleShopListNum))
      },
      choose (index) {
        this.activeIndex = index
      },
      goMenuDetail (foodList) {
        this.menuDetail = foodList
        this.menudetailIntro = false
      },
      regainmenudetailIntro () {
        this.menudetailIntro = true
      },
      specsCurrentIndex (index) {
        this.specsIndex = index
      },
      goToMenu () {
        this.$router.push({path: '/menu'})
      }
    },
    mounted () {
      //  页面刷新判断是否需要显示商品详情列表
      window.localStorage.getItem('showShop') === null ? this.$root.showShop = true : window.localStorage.getItem('showShop') === 'false' ? this.$root.showShop = false : this.$root.showShop = true
      // 页面刷新就获取是否显示减少按钮的状态
      window.localStorage.getItem('showLessBtn') === null ? this.showLessBtn = false : this.showLessBtn = true
      // 页面刷新，获去本地购物车信息，更改axios中的数据
      if (window.localStorage.getItem('setshopCartList') === null) {
        this.shopCartList = {}
      } else {
        this.shopCartList = JSON.parse(window.localStorage.getItem('setshopCartList'))
      }
      // 页面刷新获取所有商品的价格和数量以及单个商家的总数量
      window.localStorage.getItem('totlePrice') === null ? this.totlePrice = 0 : this.totlePrice = parseInt(window.localStorage.getItem('totlePrice'))
      window.localStorage.getItem('totleNum') === null ? this.totleNum = 0 : this.totleNum = parseInt(window.localStorage.getItem('totleNum'))
      window.localStorage.getItem('singleShopListNum') === null ? this.singleShopListNum[0] = 0 : this.singleShopListNum = JSON.parse(window.localStorage.getItem('singleShopListNum'))
      this.$nextTick(() => {
        axios.get('/api/shopDetails').then((res) => {
          this.shopDetail = res.data.shopDetails
        })
        axios.get('/api/shopMenu').then((res) => {
          this.shopMenu = res.data.shopMenu
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        })
      })
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/animate.less';
  .shop-box {
    .animateChildren;
    .animateParent;
  }
  .shop-wrapper {
    font-size: .24rem;
    min-height: 100vh;
    background: @f7;
    width: 100%;
    .rel;
    > header {
      background: rgba(119, 103, 137, 0.43);
      .pb(.2rem);
      .fix;
      top: 0;
      width: 100%;

      z-index: 10;
      height: 2.2rem;
      overflow: hidden;
      padding: .2rem;
      .header-top {
        .pb(.1rem);
        overflow: hidden;
        .flex;
        .header-left {
          flex: 0 0 1rem;
          .mr(.1rem);
          img {
            width: 100%;
          }
        }
        .header-right {
          flex: 1;
          color: @default;
          .rel;
          .fa-angle-right {
            font-size: .6rem;
            .abs;
            .vc;
            right: .2rem;
          }
          h2 {
            font-size: 0.36rem;
          }
          p {
            font-size: .28rem;
            line-height: .4rem;
          }
          .notice {
            .ellipsis;
          }
        }
      }
      .header-bottom {
        color: @default;
        .rel;
        height: .4rem;
        line-height: .4rem;
        span {
          .inb;
          .lf;
        }
        .bottom_one {
          .mr(5px);
          padding: 0 3px;
          .b-r(3px);
          height: .36rem;
        }
        .bottom_two {
          width: 70%;
          .ellipsis;
        }
        .bottom_three {
          width: 20%;
          .rf;
        }
        .fa-angle-right {
          .abs;
          .vc;
          right: .1rem;
          font-size: .4rem;
        }
      }
      .blur {
        .abs;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        overflow: hidden;
        -webkit-filter: blur(30px); /* Chrome, Opera */
        -ms-filter: blur(30px);
        filter: blur(30px);
        > img {
          width: 100%;
          height: 2.2rem;
        }
      }
      .fa-angle-left {
        .abs;
        font-size: .6rem;
        top: 0.1rem;
        left: 0.1rem;
        color: @background;
      }
    }
    .activities_details {
      .abs;
      width: 100%;

      height: 100vh;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .9);
      color: @default;
      z-index: 100;
      padding: .8rem 0.6rem;
      .activities_shoptitle {
        .tc;
        font-size: 0.35rem;
      }
      .activities_list {
        .activities_title_style {
          .tc;
          .pt(.8rem);
          .pb(0.4rem);
          span {
            padding: 0.1rem;
            border: 1px solid @default;
            .b-r(0.2rem);
          }
        }
        ul {
          li {
            line-height: .5rem;
          }
        }
      }
      .activities_shopinfo {
        .tc;
        .pt(.8rem);
        span {
          padding: 0.1rem;
          border: 1px solid @default;
          .b-r(.2rem);
        }
        p {
          line-height: 1.4rem;
        }
      }
      .fa-remove {
        .abs;
        font-size: .5rem;
        bottom: 1rem;
        left: 50%;
        .trsx(-50%);
      }
    }
    .shop_nav {
      .fix;
      top: 2.2rem;
      z-index: 10;
      width: 100%;

      .flex;
      background: @default;
      line-height: .8rem;
      border: 1px solid @ddd;
      div {
        flex: 1;
        .tc;
        span {
          padding-bottom: .1rem;
          font-size: .28rem;
        }
        .negative {
          color: @background;
          border-bottom: 2px solid @background;
        }
      }
    }
    .food_type {
      .abs;
      bottom: 1rem;
      top: 3rem;
      .menuwrapper {
        height: 100%;
        overflow: hidden;
        .lf;
        width: 25%;
        .food_type_nav {
          font-size: 0;
          li {
            padding: .5rem .2rem;
            width: 100%;
            font-size: .24rem;
            border-bottom: 1px solid @ddd;
            .rel;
            img {
              width: .2rem;
              .mr(.1rem);
              .rel;
              top: -1px;
            }
            .single_num {
              .abs;
              top: 2px;
              right: 0;
              background: @org;
              color: @default;
              padding: 0 4px;
              .b-r(50%);
            }
          }
        }
      }
      .foodwrapper {
        height: 100%;
        overflow: hidden;
        .lf;
        width: 75%;
        .food_type_detail {
          li:last-child {
            height: 100vh;
          }
          li {
            > header {
              .flex;
              strong {
                flex: 0 0 1rem;
                line-height: .7rem;
                .ellipsis;
                .mr(.1rem);
                .pr(.1rem);
                .pl(.1rem);
                .tc;
              }
              > p {
                flex: 1;
                line-height: .7rem;
                .ellipsis;
                .pr(.2rem);
              }
            }
            .content + .content {
              border-top: 1px solid @f7;
            }
            .content {
              width: 100%;
              background: @default;
              .flex;
              padding: .1rem;
              .content_left {
                width: 20%;
                .tc;
                img {
                  width: 80%;
                }
              }
              .content_right {
                flex: 1;
                .pl(.2rem);
                .intro {
                  color: #999;
                }
                .seller {
                  color: @4D;
                }
                .change_type {
                  height: .4rem;
                  line-height: .4rem;
                  .rel;
                  .price_wrapper {
                    .lf;
                    .price {
                      color: @org;
                      .fw;
                    }
                  }
                  .about_buy_num {
                    .rf;
                    p {
                      .inb;
                      .fa-minus-square-o, .fa-plus-square {
                        font-size: .5rem;
                        color: @background;
                      }
                      .norms {
                        padding: 2px 3px;
                        background: @background;
                        color: @default;
                        .b-r(2px);
                        .rel;
                        top: -2px;
                      }
                      .buy_num {
                        .rel;
                        top: -0.1rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .norms_wrapper {
        .fix;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.2);
        .content {
          width: 80%;
          background: @default;
          font-size: .24rem;
          .abs;
          top: 50%;
          left: 50%;
          .trsl();
          .b-r(5px);
          header {
            .tc;
            .pt(.2rem);
            .fa-remove {
              .abs;
              top: .2rem;
              right: .2rem;
              font-size: .4rem;
            }
          }
          h4 {
            .pl(.2rem);
            line-height: .5rem;
            .mt(.3rem);
            .mb(.1rem);
          }
          .specs {
            padding: .05rem .1rem;
            border: 1px solid @ddd;
            .b-r(5px);
            color: @4D;
            .ml(.2rem)
          }
          .current_specs {
            border: 1px solid @background;
            color: @background;
          }
          footer {
            line-height: 1rem;
            .mt(.4rem);
            border-radius: 0 0 5px 5px;
            background: @f7;
            .rel;
            .pl(.2rem);
            span {
              color: @org;
            }
            span + span {
              font-size: .4rem;
              .fw;
            }
            button {
              border: none;
              color: @default;
              background: @background;
              line-height: .5rem;
              .b-r(3px);
              .abs;
              .vc;
              right: .2rem;
              outline: none;
            }
          }
        }
      }
      .prompt {
        .fix;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.2);
        p {
          width: 80%;
          .abs;
          .pc;
          .tc;
          color: @default;
          font-size: .36rem;
          padding: .2rem;
          background: @black;
          .b-r(5px);
        }
      }
      .current {
        background: @default;
        border-left: 3px solid @background;
      }
    }
    .appraise_wrapper {
      background: @f7;
      .abs;
      top: 3rem;
      .appraise_info {
        background: @default;
        .flex;
        .mb(.2rem);
        .appraise_info_left {
          flex: 2;
          .tc;
          .pt(0.2rem);
          .pb(0.2rem);
          .appraise_comprehensive {
            color: @org;
            font-size: .6rem;
          }
          p {
            line-height: .5rem;
          }
        }
        .appraise_info_right {
          background: @default;
          flex: 3;
          .pb(.3rem);
          .pt(.3rem);
          .pl(.1rem);
          ul {
            li {
              line-height: .5rem;
              span:first-child {
                .mr(.1rem);
              }
            }
          }
        }
      }
      .type {
        background: @default;
        padding: .2rem;
        overflow: hidden;
        p {
          padding: .1rem;
          background: #D3E5F5;
          .lf;
          .mb(.1rem);
          .b-r(5px);
          .mr(.1rem);
        }
        .active_current {
          background: @background;
          color: @default;
        }
      }
      .appraise_detail {
        background: @default;
        padding: .2rem;
        ul {
          li {
            border-top: 1px solid @ddd;
            .pt(.2rem);
            .pb(.2rem);
            .flex;
            .appraise_detail_left {
              flex: 1;
              .tc;
              img {
                width: 80%;
                .b-r(50%);
              }
            }
            .appraise_detail_right {
              flex: 5;
              .pl(.2rem);
              header {
                .flex;
                span {
                  flex: 1;
                }
                .header_time {
                  .tr;
                }
              }
              .img_wrapper {
                img {
                  width: 1.2rem;
                  .mr(.2rem);
                  .mt(.2rem);
                  .mb(.2rem);
                }
              }
              .appraise_detail_right_intro {
                .inb;
                width: 1rem;
                line-height: .5rem;
                .br;
                .ellipsis;
                border: 1px solid @ddd;
                .b-r(3px);
                .pl(.1rem);
                .pr(.1rem);
              }
            }
          }
        }
      }
    }
    .buy_cart_container {
      height: 1rem;
      background: @4D;
      width: 100%;
      position: fixed;
      bottom: 0;
      .flex;
      .cart_icon_num {
        .flex;
        flex: 2;
        .cart_icon_container {
          flex: 1;
          .rel;
          .round-wrapper {
            width: 1rem;
            height: 1rem;
            .abs;
            z-index: 99;
            top: -50%;
            left: 50%;
            .trsx();
            background: @4D;
            padding: 2px;
            .b-r(50%);
            .tc;
            color: @default;
            .fa-shopping-cart {
              font-size: 0.5rem;
              line-height: 1rem;
            }
            .animate {
              animation:cart_animate .5s linear;
            }
            .totle_num {
              .abs;
              padding: 0 5px;
              background: red;
              top: 0;
              right: 0;
              .b-r(50%);
            }
          }
          .active_num {
            background: @background;
          }
        }
        .cart_num {
          flex: 2;
          color: @default;
          div {
            line-height: .5rem;
            .fw;
          }
        }
      }
      .gotopay {
        background: rgba(83, 83, 86, 1);
        font-size: 0.24rem;
        flex: 1;
        .tc;
        line-height: 1rem;
        span {
          color: @default;
          .fw;
        }
        .gotopay_button_style {
          background: @btn;
          color: @default;
          .inb;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .fade-enter-active {
    animation: fade-in .3s linear;
  }

  .fade-leave-active {
    animation: fade-out .3s linear;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateX(15px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(15px);
    }
  }

  .fade-buy-enter-active {
    animation: fade-in .2s linear;
  }

  .fade-buy-leave-active {
    animation: fade-out .2s linear;
  }

  .shop-detail-enter-active, .appraise-info-enter-active {
    animation: shop-in .3s linear;
  }

  @keyframes shop-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .meun-detail-enter-active {
    animation: meun-detail-in .3s linear;
  }

  .meun-detail-leave-active {
    animation: meun-detail-out .1s linear;
  }

  @keyframes meun-detail-in {
    0% {
      transform: translateX(20%);
      opacity: 0;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes meun-detail-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes cart_animate {
    0% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.0);
    }
  }
</style>
