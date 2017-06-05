<template>
  <transition name="cityTransition">
    <div class='city_container' v-show="showCity">
      <vheader :message="gressCity">
        <router-link to='/home' tag='span' class='fa fa-angle-left' slot="angle"></router-link>
        <router-link to="/home" class='change_city' slot="change_city">切换城市</router-link>
      </vheader>
      <div class='city_form'>
        <div class='input_wrapper'>
          <input type='search' name='city' placeholder='输入学校、商务楼、地址' class='city_input' required v-model='inputValue'>
        </div>
        <div class='submit_wrapper'>
          <button class='city_submit input_style' @click="submitSearch()">提交</button>
        </div>
      </div>

      <h6 class='pois_search_history' v-show="!isShowSearchNonePlace">搜索历史</h6>
      <ul class='getpois_ul'>
        <li v-for='(item, searchCityIndex) in search_city' @click="goToMenu()">
          <h4 class='pois_name ellipsis'>{{item.name}}</h4>
          <p class='pois_address ellipsis'>{{item.address}}</p>
        </li>
      </ul>
      <div class='search_none_place' v-show="isShowSearchNonePlace">很抱歉！无搜索结果</div>
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
        showCity: true,
        inputValue: '',
        defaultNum: -1,
        isShowSearchNonePlace: false  //  默认隐藏搜索无结果字段
      }
    },
//    获取城市地址
    computed: {
      ...mapGetters(['gressCity']),
//      获得初始化城市地址数据
      search_city () {
        let arr = this.$store.getters.searchData
        return arr.slice(this.defaultNum)
      }
    },
    methods: {
      submitSearch () {
//       如果搜索值为空，就显示搜索无结果字段
        if (this.inputValue === '') {
          this.defaultNum = this.$store.getters.searchData.length
          this.isShowSearchNonePlace = true
        } else {
//       否则显示所有数据
          this.defaultNum = 0
          this.isShowSearchNonePlace = false
        }
      },
      goToMenu () {
        this.$router.push({path: '/menu'})
      }
    }
  }
</script>
<style lang='less'>
  @import './city.css';
</style>
