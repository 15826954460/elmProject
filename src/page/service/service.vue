<template>
  <div class="service_box">

    <transition name="parent-slide" mode="out-in">
      <div class="service-wrapper" v-show="$root.serviceData">
        <vheader message='服务中心' back='true'>
          <router-link to="/user" class="fa fa-angle-left" tag="span" slot="angle"></router-link>
        </vheader>

        <ul class="service_connect">
          <li class="service_left">
            <a href="https://ecs-im.ele.me/" class="service_left_a">
            <dl>
              <dd><img :src="serviceinline"></dd>
              <dd>在线客服</dd>
            </dl>
            </a>
          </li>
          <li class="service_right">
            <a href="tel:10105757" class="service_right_a">
              <dl>
                <dd><img :src="servicephone"></dd>
                <dd>在线客服</dd>
              </dl>
            </a>
          </li>
        </ul>
        <section class="hot_questions">
          <h4 class="qustion_header">热门问题</h4>
          <ul>
            <li v-for="(item, index) in serviceList" @click="goToChildren(index)">
              <span>{{item.question}}</span>
              <span class="fa fa-angle-right"></span>
            </li>
          </ul>
        </section>
      </div>

    </transition>


    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>
<script>
  import vheader from '../../components/header/header.vue'
  export default {
    data () {
      return {
        serviceinline: require('../../../static/img/serviceinline.png'),
        servicephone: require('../../../static/img/servicephone.png')
      }
    },
    computed: {
      serviceList () { // 获取列表数据
        return this.$store.getters.service
      }
    },
    components: {
      vheader
    },
    methods: {
      goToChildren (index) {
        window.localStorage.setItem('index', index) // 向本地保存下标
        this.$root.serviceData = false  // 隐藏当前页面的内容
        window.localStorage.setItem('serviceData', false)  // 将状态保存到本地
        this.$router.push({path: '/service/questionDetail'})  // 跳转到子页面
      }
    },
    created () {
      // 页面第一次加载，以及子页面刷新，依然显示当前页面
      window.localStorage.getItem('serviceData') === 'false' ? this.$root.serviceData = false : window.localStorage.getItem('serviceData') === null ? this.$root.serviceData = true : this.$root.serviceData = true
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/headerComment.less';
  @import '../../common/animate.less';
  .service-wrapper {
    .box;
    min-height:100vh;
    overflow: hidden;
    .service_connect {
      font-size:.24rem;
      .flex;
      li {
        flex: 1;
        background: @default;
        .pt(.2rem);
        .pb(.2rem);
        .tc;
        dl {
          dd {
            line-height: .5rem;
          }
        }
      }
      .service_left {
        border-right: 1px solid @f7;
      }
    }
    .hot_questions {
      .qustion_header {
        font-size: .32rem;
        line-height: .8rem;
        .pl(.3rem);
        background: @default;
        border-top: 1px solid @f7;
        border-bottom: 1px solid @f7;
      }
      ul {
        li {
          .pl(.3rem);
          .pr(.3rem);
          font-size: .32rem;
          line-height: .7rem;
          background: @default;
          border-bottom: 1px solid @f7;
          .rel;
          .fa-angle-right {
            font-size: .5rem;
            .abs;
            .vc;
            right: .3rem;
          }
        }
      }
    }
    .animateChildren;
    .animateParent;
  }
</style>
