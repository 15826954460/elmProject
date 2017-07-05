<template>
  <div class="add_address">
    <vhead message="搜索">
      <span class="fa fa-angle-left" slot="angle" @click="backToAddAddress"></span>
    </vhead>
    <div class="search_address">
      <input type="search" placeholder="请输入小区/写字楼/学校等" v-model="searchInput">
      <span class="search_btn" @click="searchAddress">搜素</span>
    </div>
    <ul class="address_list" v-if="searchData">
      <li v-for="(item, index) in searchData" :key="index" @click="choooedAddress(item)">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <div class="warn_wrapper" v-show="isShowWarnInfo">
      <p>找不到地址？</p>
      <p>尝试输入小区，写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入</p>
    </div>
    <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
    </alertBounced>
  </div>
</template>
<script>
  import vhead from '../../../../../components/header/header.vue'
  import alertBounced from '../../../../../components/bounced/bounced'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        isShowWarnInfo: true,
        searchData: null,
        searchInput: '',
        showAlert: false,
        alertText: ''
      }
    },
    components: {
      vhead,
      alertBounced
    },
    computed: {
      ...mapGetters(['changeAddress'])
    },
    methods: {
      backToAddAddress () {
        this.isShowWarnInfo = false
        this.state()
      },
      searchAddress () {
        if (this.searchInput !== '') {
          this.searchData = this.$store.getters.searchAddress
          this.isShowWarnInfo = false
        } else {
          this.alertText = '搜索信息不能为空'
        }
      },
      choooedAddress (item) {
        this.$store.commit('setChangeAddress', item.name)
        console.log(this.$store.getters.changeAddress)
        this.state()
      },
      state () {
        this.$store.commit('setIsShowAddAddress', false)
        window.localStorage.setItem('isShowAddAddress', false)
        this.$router.push({path: '/confirmOrder/chooseAddress/address'})
      }
    }
  }
</script>
<style scoped>
  @import 'addAddress.css';
</style>
