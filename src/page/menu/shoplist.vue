<template>
  <div class='shop_list_container' id="shopList">
    <p class='shop_header'>
      <img :src="business">
      <span class='shop_header_title'>附近商家</span>
    </p>
    <ul class="shop_list">
      <router-link :to="{path: '/shop'}" v-for="(lists, shopListIndex) in shopListNum" tag="li" :key="lists.id">
        <div class="list_container">
          <div class="list_left">
            <img :src="getImgPath(lists.image_path)" alt="">
          </div>
          <div class="list_right">
            <div class="title">
              <h4 :class="{premium: lists.is_premium}">{{lists.name}}</h4>
              <span class="onTime" v-for="item in lists.supports">{{item.icon_name}}</span>
            </div>
            <div class="aboutSellNum">
              <div class="mouhtSell">
                <vstar :rating='lists.rating'></vstar>

                <p class="level-wrapper">
                  <span class="level">{{lists.rating}}</span>&nbsp;&nbsp;
                  <span class="monthSell">月销 {{lists.recent_order_num}} 单</span>
                </p>

              </div>
              <p class="arriveTime" v-if="lists.delivery_mode">
                <span>{{lists.delivery_mode.text}}</span><span>准时达</span>
              </p>
            </div>
            <div class="distribution">
              <p class="distribution_money">
                <span>￥{{lists.float_minimum_order_amount}}起送</span> / <span>{{lists.piecewise_agent_fee.tips}}</span>
              </p>
              <p class="distribution_time">
                <span>{{lists.distance | format}}</span>
                / <span class="useTime">{{lists.order_lead_time}}分钟</span>
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </ul>
    <i class="fa fa-arrow-circle-up default" @click="goBackTop()"></i>
    <p class="noData" v-show="hasData">没有更多数据了</p>
  </div>
</template>
<script>
  import {getImgPath} from '../../mixin/getPath'
  import vstar from '../../components/start/star.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        business: require('../../../static/icon/business.png'),
        shopLists: [],
        hasData: false
      }
    },
    computed: {
      shopList () {
        return this.$store.getters.shopList  // 获取shop数据列表
      },
      shopListNum () {
        this.shopLists = this.shopLists.concat(this.$store.getters.shopList)
        this.$store.commit('setShopListNum', this.shopLists)  // 每一次数据变化都进行一次更新
        return this.$store.getters.shopListNum  // 从新获取数据，渲染到页面
      }
    },
    components: {
      vstar
    },
    //  混合对象的数组
    mixins: [getImgPath],
    mounted () {
      this.$nextTick(function () {
        this.loadMore() // 调用加载数据
      })
    },
    methods: {
      addShopList () {
        let len = this.shopLists.length // 添加更多数据 假设最多200条
        if (len <= 100) {
          this.shopLists = this.shopLists.concat(this.shopList)
          this.$store.commit('setShopListNum', this.shopLists)
        } else {
          this.hasData = true
        }
      },
      // 模拟过度回到顶部过度
      goBackTop () {
        $('html, body').animate({scrollTop: 0}, 1000)
      },
      // 加载更多数据
      loadMore () {
        window.onscroll = () => {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop  // 获取滚动高度
          // 条用返回顶部方法
          backTop(scrollTop)
          let bodyHeight = document.getElementsByTagName('body')[0].offsetHeight // 获取文档的高度
          let totalheight = $(window).height() + scrollTop
          let marginBot = bodyHeight - totalheight
          if (marginBot <= 10) {
            loadMore()
          }
        }
        // 监听touch事件
        document.addEventListener('touchstart', (e) => {
//          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop  // 获取滚动高度
//          this.backTop(scrollTop)
        }, true)
        document.addEventListener('touchmove', (e) => {
//          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop  // 获取滚动高度
//          this.backTop(scrollTop)
//          console.log('move')
        }, true)
        document.addEventListener('touchend', (e) => {
//          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop  // 获取滚动高度
//          this.backTop(scrollTop)
        }, true)
        // 页面到达底部就重新追加一次数据
        const loadMore = () => {
          this.addShopList()
        }
        // 返回顶部按钮
        const backTop = (scrollTop) => {
          let $i = $('.fa-arrow-circle-up')
          if (scrollTop > 550) {
            $i.removeClass('default')
          } else {
            $i.addClass('default')
          }
        }
      }
    },
    // 自定义过滤器
    filters: {
      format: function (val) {
        val = val > 1000 ? (val / 1000).toFixed(2) + 'km' : val + '米'
        return val
      }
    }
  }
</script>
<style lang="less">
  @import './shoplist.css';
</style>
