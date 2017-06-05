<template>
  <transition name="homeTransition">
    <div class="homeWrapper" v-show="showHome">

      <vheader>
        <span class="head_logo" slot="elm">ele.me</span>
        <router-link to="/user" tag="span" class="fa fa-user-o" slot="fa-user-o"></router-link>
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
          <li v-for="(hotCity, hotCityindex) in hotCity" @click="hotToCurrentCity(hotCityindex)">
            {{hotCity.name}}

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
    components: {
      vheader
    },
    data () {
      return {
        nagetiveCity: '上海',
        showHome: true
      }
    },
    computed: {
      ...mapGetters(['hotCity']),
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
  @import './home.css';
</style>
