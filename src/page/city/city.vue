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
<style lang='less' scoped>
  @import '../../common/comment.less';
  @bodyBg:#F5F5F5;
  @background: #3190E8;
  .city_container{
    background:@bodyBg;
    .pt(1rem);
    min-height:100vh;
    .city_form{
      background:@default;
      padding:.2rem .4rem;
      border-top:1px solid @ddd;
      border-bottom:1px solid @ddd;
      .input_wrapper{
        width:100%;
        height:.6rem;
        .rel;
        .mb(.4rem);
        .city_input{
          width:100%;
          height:.6rem;
          .b-r(0.06rem);
          padding:.2rem;
          font-size:.3rem;
          outline: none;
          background-color:transparent;
          border:1px solid #999;
          .abs;
        }
      }
      .submit_wrapper{
        height:.6rem;
        .rel;
        .city_submit{
          border:none;
          width:100%;
          .b-r(0.06rem);
          background:@background;
          height:.6rem;
          color:@default;
          font-size:.3rem;
          .abs;
          outline: none;
        }
      }
    }
    .pois_search_history{
      font-size:.24rem;
      .pl(.3rem);
      height:.5rem;
      line-height:.5rem;
      font-weight:normal;
    }
    .getpois_ul{
      background:@default;
      border-top:1px solid @ddd;
      border-bottom:1px solid @ddd;
      >li{
        padding:.3rem .4rem;
        >.pois_name{
          color:@black;
          font-size:.28rem;
          .mb(.2rem);
          font-weight:400;
          .ellipsis;
        }
        >.pois_address{
          font-size:.24rem;
          color:#9F9F9C;
          .ellipsis;
        }
      }
      >li+li{
        border-top:1px solid @ddd;
      }
    }
    .search_none_place{
      background:@default;
      font-size:.32rem;
      .tc;
      line-height:1rem;
    }
  }
</style>
