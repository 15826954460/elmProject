<template>
  <transition name="homeTransition">
    <div class="homeWrapper" v-show="showHome">

      <vheader>
        <span class="head_logo" slot="elm">ele.me</span>
        <router-link to="/login" slot="login" tag="span" class="login"
                     v-if="isShowLogin">登陆|注册
        </router-link>
        <router-link to="/user" tag="span" class="fa fa-user-o"
                     slot="fa-user-o" v-else></router-link>
      </vheader>

      <nav class="city_nav">
        <div class="city_tip">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <p class="guess_city" @click="defaultCity()">
          <span>{{nagetiveCity}}</span>
          <i class="fa fa-chevron-right"></i>
        </p>
      </nav>
      <section id="hot_city_container">
        <h4 class="city_title">热门城市</h4>
        <ul class="citylistul clear">
          <li v-for="(hot_City, hotCityindex) in hotCity" @click="hotToCurrentCity(hotCityindex)">
            {{hot_City.name}}
          </li>
        </ul>
      </section>
      <section class="group_city_container">
        <ul class="letter_classify">
          <li v-for="(value, key, index) in group_city" class="letter_classify_li">
            <h4 class="city_title">
              {{key}}
            <span v-if="index === 0">（按字母排序）</span>
            </h4>
            <ul class="groupcity_name_container citylistul clear">
              <li v-for="(item, cityIndex) in value" :to="'/city/:' + item.id" class="ellipsis"
                  @click="otherToCurrentCity(value, cityIndex)">
                {{item.name}}
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vheader from '../../components/header/header.vue'
  export default {
    data () {
      return {
        nagetiveCity: '上海',
        showHome: true
      }
    },
    components: {
      vheader
    },
    mounted () {
      // 页面刷新判断是否显示登陆注册
      if (window.localStorage.getItem('userInfo') === null) {
        this.$store.commit('setIsShowLogin', true)
      } else {
        this.$store.commit('setIsShowLogin', false)
      }
    },
    computed: {
      ...mapGetters(['isShowLogin', 'hotCity']),
      // 获取所有城市
      group_city () {
      // 先用Objectd的内置类的keys方法获取排序对象的属性名，再利用Array原型的sort()方发进行排序
        let newKey = Object.keys(this.$store.getters.groupCity).sort()
      //      创建一个新的对象，用于存放排好序的键值对
        let newObj = {}
        for (let i = 0; i < newKey.length; i++) {
          newObj[newKey[i]] = this.$store.getters.groupCity[newKey[i]]
        }
        return newObj
      }
    },
    methods: {
      // 根据当前点击的城市来进行匹配搜索页的城市
      // 默认跳转到上海
      defaultCity () {
        this.$store.commit('setGressCity', this.nagetiveCity)
        this.$router.push({path: '/city/' + 1})
      },
      // 跳转到对应的热门城市
      hotToCurrentCity (hotCityindex) {
        this.$store.commit('setGressCity', this.hotCity[hotCityindex].name)
        this.$router.push({path: '/city/' + this.hotCity[hotCityindex].id})
      },
      // 跳转到任意城市
      otherToCurrentCity (value, cityIndex) {
        this.$store.commit('setGressCity', value[cityIndex].name)
        this.$router.push({path: '/city/' + value[cityIndex].id})
      },
      toUser () {
        this.$router.push({path: '/user'})
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @background: #3190E8;
  @blue: #3190e8;
  @bodyBg:#F5F5F5;
  .homeWrapper{
    background:@bodyBg;
    .pt(.8rem);
  }
  .city_nav {
    background: @default;
    .city_tip {
      height: .8rem;
      line-height: .8rem;
      .pl(.3rem);
      .pr(.3rem);
      background-color: @default;
      border-bottom: 1px solid @ddd;
      font-size: .24rem;
      > span:nth-child(2) {
        .rf;
        .fw;
        color: #4d4d4d;
      }
    }
    .guess_city {
      height: .8rem;
      line-height: .8rem;
      .pl(.3rem);
      .pr(.3rem);
      border-bottom: 2px solid @ddd;
      font-size: .36rem;
      .mb(.2rem);
      > span {
        color: @blue;
      }
      .fa-chevron-right {
        .rf;
        .rel;
        top: .2rem;
      }
    }
  }
  #hot_city_container {
    background: @default;
    > h4 {
      border-top: 2px solid @ddd;
      border-bottom: 1px solid @ddd;
      font-size: .28rem;
      font-weight: 400;
      height: .8rem;
      line-height: .8rem;
      .pl(.3rem);
    }
    > ul {
      overflow: hidden;
      li {
        float: left;
        .tc;
        text-align: center;
        height:.6rem;
        line-height: .6rem;
        font-size: .28rem;
        color: @blue;
        width: 25%;
        border-right: 1px solid @ddd;
        border-bottom: 1px solid @ddd;
        &:hover{}
        .cur;
      }
    }
  }

  .group_city_container{
    overflow: hidden;
    .letter_classify {
      >li {
        background: @default;
        .mt(.2rem);
        width:100%;
        > .city_title {
          border-top: 2px solid @ddd;
          border-bottom: 1px solid @ddd;
          font-size: .28rem;
          font-weight: 400;
          height: .8rem;
          line-height: .8rem;
          .pl(.3rem);
        }
        > .groupcity_name_container {
          overflow: hidden;
          > .ellipsis {
            float: left;
            .tc;
            text-align: center;
            height: .6rem;
            line-height: .6rem;
            font-size: .28rem;
            width: 25%;
            border-right: 1px solid @ddd;
            border-bottom: 1px solid @ddd;
            .ellipsis;
            &:hover{
              .cur;
            }
          }
        }
      }
    }
  }
</style>
