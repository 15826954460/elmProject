<template>
  <div class="detail-wrapper">
    <vheader message="订单详情">
      <span class="fa fa-angle-left" slot="angle" @click="backToOrder"></span>
    </vheader>
    <section class="shopLogo" v-if="orderNegative.orderList">
      <div class="shopLogo-img">
        <img :src="orderNegative.orderList.restaurant_image_url">
      </div>
      <h2>{{orderNegative.orderList.timeline_node.title}}</h2>
      <p class="cancle-reason" v-if="orderNegative.orderList">{{orderNegative.orderList.timeline_node.description}}</p>
      <router-link to="" class="list-again" tag="span">再来一单</router-link>
    </section>

    <section class="shopDetail"  v-if="orderNegative.orderList && orderNegative.orderDetail">
      <div @click="backToOrder">
        <div>
          <img :src="orderNegative.orderList.restaurant_image_url">
        </div>
        <p>{{orderNegative.orderDetail.restaurant_name}}</p>
        <span class="fa fa-angle-right"></span>
      </div>
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
        this.$router.push({path: '/order'})
        this.$root.isShowOrderDetail = true
        window.localStorage.setItem('isShowOrderDetail', true) // 保存状态，在父路由中刷新页面时起作用
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
<style lang="less" scoped>
  @import '../../../common/comment.less';
  .detail-wrapper {
    .pt(.8rem);
    background: @f7;
    .shopLogo {
      background: @default;
      height: 4rem;
      .mb(.2rem);
      .tc;
      .rel;
      padding: .3rem;
      .shopLogo-img {
        .rel;
        height: 1.6rem;
        img {
          .abs;
          top: 0;
          .trsx();
          height: 100%;
          border: 10px solid @background;
          .b-r(50%);
        }
      }
      > h2 {
        font-size: .4rem;
        color: @4D;
        line-height: .8rem;
      }
      .cancle-reason {
        color: @cancel;
        font-size: .24rem;
      }
      .list-again {
        .fw;
        .abs;
        bottom:.2rem;
        .trsx();
        border: 1px solid @background;
        padding: 0.1rem .2rem;
        font-size: .24rem;
        color: @background;
        .b-r(5px);
      }
    }
    .shopDetail {
      background: @default;
      > div {
        .flex;
        height: .8rem;
        line-height: .8rem;
        .pl(.3rem);
        .pr(.3rem);
        > div {
          width: 15%;
          .rel;
          img {
            width: 60%;
            .abs;
            .vc;
            left:50%;
            .trsl();
          }
        }
        > p {
          width: 75%;
          font-size: .3rem;
          .fw;
          .pl(.2rem);
        }
        > .fa-angle-right {
          flex: 1;
          font-size: .4rem;
          line-height: .8rem;
          .tc;
        }
      }
      > ul {
        > li {
          font-size: .28rem;
          line-height: .6rem;
          border-top: 1px solid @ddd;
          .pl(.3rem);
          .pr(.3rem);
          .flex;
          > span:first-child {
            width: 80%;
            .ellipsis;
          }
          > span:not(:first-child) {
            flex: 1;
          }
        }
      }
    }
  }
</style>
