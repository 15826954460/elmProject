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
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/animate.less';
  @background: #3190E8;
  @4D: #4D4D4D;
  @orange: #FF6600;
  @f7: #f7f7f7;
  @cancel: grey2;
  .order-box {
    width: 100%;
    overflow: hidden;
    .order-wrapper {
      background: @f7;
      min-height: 100vh;
      .pt(.8rem);
      .pb(.8rem);
      .list-wrapper {
        width:100%;
        .list-item:not(:last-child) {
          .mb(.2rem);
        }
        .list-item {
          padding: .2rem;
          overflow: hidden;
          background: @default;
          .left {
            width:20%;
            .lf;
            .rel;
            img {
              width:100%;
              .abs;
              top: .2rem;
              left: 50%;
              .trsx(-50%);
            }
          }
          .right {
            width:80%;
            .rf;
            .pl(.2rem);
            font-size: .24rem;
            > div {
              .pb(.2rem);
              > h2 {
                color: @4D;
                line-height: .6rem;
                font-size: .32rem;
                .rel;
                .restaurant_name {
                  .inb;
                  width: 65%;
                  > span:first-child {
                    width: 90%;
                    .ellipsis;
                  }
                }
                .cancel {
                  font-size: .28rem;
                  font-weight: normal;
                  .vc;
                  right: .3rem;
                  color: @cancel;
                }
              }
            }
            .foodName {
              line-height: .8rem;
              overflow: hidden;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              >span{
                font-size: .24rem;
              }
              > span:first-child {
                width: 70%;
                .lf;
                .ellipsis;
              }
              > span:last-child {
                width: 25%;
                .fw;
                .rf;
                color: @orange;
              }
            }
            .order-again {
              .tr;
              .pt(.2rem);
              > span {
                color: @background;
                font-size: .28rem;
                .b-r(2px;);
                border: 1px solid @background;
                padding: 0.04rem .1rem;
              }
            }
          }
        }
      }
    }
    .animateChildren;
    .animateParent
  }
</style>
