<template>

  <div class="points_box">
    <transition name="parent-slide" mode="out-in">
      <div class="points-wrapper" v-show="$root.showDetail">

        <vheader message="我的积分">
          <router-link to="/user" class="fa fa-angle-left" tag="span" slot="angle"></router-link>
        </vheader>

        <section class="content_container">
          <section class="content">
            <header class="content_header">
              <span class="content_title_style">当前积分</span>
              <section class="contetn_description">
                <img :src="description_img">
                <span class="content_title_style" @click="pointdetail">积分说明</span>
              </section>
            </header>
            <p class="content_num">
              <span class="strong_num">0</span>
              <span>分</span>
            </p>
            <div class="promit_button" @click="usePoint">积分兑换商品</div>
          </section>
        </section>

        <p class="deal_detail">最近30天积分纪录</p>
        <div class="no_log">
          <img :src="no_log_img">
          <p>最近30天无积分纪录</p>
          <p>快去下单赚取大量积分吧</p>
        </div>
      </div>
    </transition>

    <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
    </alertBounced>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import vheader from '../../components/header/header.vue'
  import alertBounced from '../../components/bounced/bounced.vue'
  export default {
    data () {
      return {
        description_img: require('../../../static/icon/description.png'),
        no_log_img: require('../../../static/img/no-log.png'),
        showAlert: false,
        alertText: null
      }
    },
    created () {
      let detail = window.localStorage.getItem('showDetail')
      console.log(detail)
      if (detail === null) { // 本地没有值得情况下，就显示
        this.$root.showDetail = true
      } else if (detail === 'false') {
        this.$root.showDetail = false
      } else {
        this.$root.showDetail = true
      }
    },
    components: {
      vheader,
      alertBounced
    },
    computed: {},
    methods: {
      usePoint () {
        this.showAlert = true
        this.alertText = '快去下单赚取大量积分吧'
      },
      know () {
        this.showAlert = false
      },
      pointdetail () {
        this.$root.showDetail = false
        window.localStorage.setItem('showDetail', false)
        this.$router.push({path: '/points/pointsdetail'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/headerComment.less';
  @import '../../common/animate.less';

  .points_box {
    .points-wrapper {
      .box;
      min-height: 100vh;
      font-size: .24rem;
      width: 100%;
      .content_container {
        padding: 0 .2rem .2rem .2rem;
        background: @background;
        .content {
          background: @default;
          .b-r(.4px);
          padding: .2rem;
          .content_header {
            .flex;
            .content_title_style {
              flex: 3;
            }
            .contetn_description {
              flex: 2;
              .tr;
              img {
                width: .2rem;
                .rel;
                top: -0.04rem;
              }
            }
          }
          .content_num {
            color: @4D;
            .mb(.2rem);
            .strong_num {
              font-size: .6rem;
            }
          }
          .promit_button {
            background: @org;
            color: @default;
            font-size: .32rem;
            line-height: .6rem;
            .tc;
            .b-r(3px);
          }
        }
      }
      .deal_detail {
        padding: .3rem;
      }
      .no_log {
        .tc;
        img {
          width: 3rem;
        }
        p {
          line-height: .4rem;
        }
      }
    }
    .animateChildren;
    .animateParent;
  }
</style>
