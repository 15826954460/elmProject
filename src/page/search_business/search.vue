<template>
  <div class="seacrhWrapper">

    <vheader message="搜索">
      <span class="fa fa-angle-left" @click="$router.go(-1)" slot="angle"></span>
    </vheader>

    <div class="search-box">
      <input type="search" class="search" placeholder="请输入商家或没美食名称" v-model="searchVal">
      <button class="btn" @click="postKey('')">提交</button>
    </div>

    <transition name="history">
      <div class="searchHistory" v-show="searchHistory">
        <h3>搜索历史</h3>
        <ul>
          <li v-for="historySearch in searchList">
            <span class="searchContent" @click="searchBusiness(historySearch)">{{historySearch}}</span>
            <span class="fa fa-remove" @click="deleteOneHistory(historySearch)"></span>
          </li>
        </ul>
        <h4 @click="deleteAll()">清空搜索历史</h4>
      </div>
    </transition>

    <transition name="business">
      <div class="business-box" v-show="showBusiness">
        <h3>商家</h3>
        <ul class="list_container">
          <li class="list_li" v-for="(items, businessIndex) in business" @click="gotoShopMain(items.id)">
            <div class="left-img"><img :src="imgBaseUrl + items.image_path" alt=""></div>
            <div class="right-content">
              <h4>{{items.name}}<img src="../../../static/icon/pay.png" alt=""></h4>
              <p>月销 <span>{{items.month_sales}} </span>单</p>
              <p>{{items.delivery_fee}} 元起送 / 距离 {{items.distance | format}}</p>
              <hr>
              <p v-for="(item, restaurantIndex) in items.restaurant_activity">
                <span class="iconName" :style="{background: '#' + item.icon_color}">{{item.icon_name}}</span>
                <span class="name">{{item.name}}</span>
                <span class="only_phone">（手机客户端专享）</span></p>
            </div>
          </li>
        </ul>
      </div>
    </transition>

    <vfoot></vfoot>
  </div>
</template>
<script>
  import vfoot from '../../components/footer/footNav.vue'
  import vheader from '../../components/header/header.vue'
  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com',
        searchVal: '',  // 搜索的值
        searchList: [], // 搜索列表，记录搜索历史信息
        showBusiness: false, // 隐藏商铺
        searchHistory: true  // 隐藏搜索历史
      }
    },
    components: {
      vfoot,
      vheader
    },
    created () {
      if (this.getStore('historySearch')) {
        this.searchList = this.getStore('historySearch').split(',') // 页面刷新获得数据
      }
    },
    computed: {
      business () {
        return this.$store.getters.business  // 获取店家数据
      }
    },
    methods: {
      postKey () {
        this.showBusiness = false
        this.searchHistory = true
        let _this = this
        if (this.searchVal === '') return
        if (this.searchVal !== '' && this.searchList.length === 0) {
          this.searchList.push(this.searchVal) // 如果搜索列表为空，直接添加
        } else {
          let push = _this.searchList.every(function (val) {
            return val !== _this.searchVal  // 返回一个boolean值
          })
          if (push === true) _this.searchList.push(_this.searchVal) // 添加不重复的数据
        }
        _this.setStore('historySearch', _this.searchList)  // 将值保存到localStorage中
        _this.searchList = _this.getStore('historySearch').split(',')
      },
      setStore (name, content) {  // localStorage 中存储数据
        if (!name) return
        if (window.localStorage) {
          window.localStorage.setItem(name, content)
        } else {
          // 这里的cookie只是为了演示数据的储存和读取，没有后台的数据，这里要模拟实现搜索效果，无法做到及时删除某一条数据，所以主要还是利用h5的储存
          let cookie = document.cookie || window.cookie
          cookie.write(name, content)
        }
      },
      getStore (name) {   // 获取数据
        if (!name) return
        let cookie = document.cookie || window.cookie
        let strStoreDate = window.localStorage ? window.localStorage.getItem(name) : cookie.read(name)
        return strStoreDate
      },
      removeStore (name) {  // 删除数据
        if (!name) return
        window.localStorage.removeItem(name)
      },
      searchBusiness (searchVal) {
        this.showBusiness = true
        this.searchHistory = false
        this.searchVal = searchVal
      },
      deleteOneHistory (historySearch) {  // 删除某一条历史纪录
        for (let i = 0, len = this.searchList.length; i < len; i++) {
          if (this.searchList[i] === historySearch) {
            this.searchList.splice(i, 1)
          }
        }
        this.setStore('historySearch', this.searchList)
        this.searchList = this.getStore('historySearch').split(',')
      },
      deleteAll () {  // 删除所有的搜索记录
        this.removeStore('historySearch')
        this.searchList = []
        this.searchVal = ''
      },
      gotoShopMain (id) {
        this.$router.push({path: '/shop'})
      }
    },
    //    自定义过滤器
    filters: {
      format: function (val) {
        val = val > 1000 ? (val / 1000).toFixed(2) + 'km' : val + '米'
        return val
      }
    }
  }
</script>
<style lang="less">
  @import './search.css';
</style>
