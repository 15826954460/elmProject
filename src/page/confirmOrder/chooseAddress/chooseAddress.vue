<template>
  <div class="choose_address_box">
    <transition name="parent-slide" mode="out-in">
      <div class="choose_address_wrapper" v-show="!showChildrenAddress">
        <vhead message="选择地址">
          <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
        </vhead>
        <ul class="addressList_list_wrapper">
          <li v-if="addressList.list.length !== 0"
              v-for="(item, index) in addressList.list"
              class="addressList_list" @click="checkedAddress(index, item)">
            <i class="fa fa-check-circle" :class="{circle_checked: index === isChecked}"></i>
            <div class="choose_address_content">
              <p><span class="item_name">{{item.name}}</span><span class="item_sex">{{item.sex}}</span><span>{{item.phone}}</span></p>
              <p><span class="item_tab" :class="{company: item.tab === '公司', school: item.tab === '学校', house: item.tab === '小区'}">{{item.tab}}</span><span>{{item.detailaddress}}</span></p>

            </div>
          </li>
        </ul>
        <p class="add_address" @click="goToChildrenComponent"><i class="fa fa-plus-square"></i>新增收获地址</p>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vhead from '../../../components/header/header.vue'
  export default {
    data () {
      return {
        isChecked: 0
      }
    },
    components: {
      vhead
    },
    computed: {
      ...mapGetters(['showChildrenAddress', 'addressList'])
    },
    mounted () {
      // 页面刷新，保持当前状态
      let win = window.localStorage
      if (win.getItem('showChildrenAddress') === null || win.getItem('showChildrenAddress') === 'false') {
        this.$store.commit('setShowChildrenAddress', false)
      } else {
        this.$store.commit('setShowChildrenAddress', true)
      }
    },
    methods: {
      backToConfirmOrder () { // 跳回到确认订单页
        this.$router.push({path: '/confirmOrder'})
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      },
      goToChildrenComponent () { // 跳转到子路由
        this.$store.commit('setShowChildrenAddress', true)
        window.localStorage.setItem('showChildrenAddress', true)
        this.$router.push({path: '/confirmOrder/chooseAddress/address'})
      },
      checkedAddress (index, item) {  // 选择地址并切换到确认订单页
        this.isChecked = index
        this.$store.commit('setNegativeCheckedAddress', item)
        window.localStorage.setItem('negativeCheckedAddress', JSON.stringify(item))
        this.$store.commit('setCnofirmShowChildren', false)
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$router.push({path: '/confirmOrder'})
      }
    }
  }
</script>
<style scoped>
  @import './chooseAddress.css';
</style>
