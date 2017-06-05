<template>
  <div class="shop_box">

    <transition mode="out-in" name="parent-slide">
      <div class="shop-detail" v-show="$root.isshopDetail">
        <vheader message="商家详情">
          <span class="fa fa-angle-left" @click="goBackToShop" slot="angle"></span>
        </vheader>

        <section class="activities_container">
          <header>活动与属性</header>
          <ul class="actibities_ul">
            <li v-for="item in shopDetail.activities" :key="item.id">
              <span :style='{backgroundColor: "#" + item.icon_color}' class="icon_name">{{item.icon_name}}</span>
              <span>{{item.description}}(APP专享)</span>
            </li>
          </ul>
          <ul class="actibities_ul">
            <li v-for="item in shopDetail.supports" :key="item.id">
              <span :style='{backgroundColor: "#" + item.icon_color}' class="icon_color">{{item.icon_name}}</span>
              <span>{{item.description}}(APP专享)</span>
            </li>
          </ul>
        </section>
        <section class="shop_status_container">

          <router-link to="/shop/shopdetail/shopSafe" class="shop_status_header">
            <span class="shop_detail_title">食品监督安全公示</span>
            <div class="identification_detail_wrapper" @click="goToSafe">
              <span class="identification_detail">企业认证详情</span>
              <span class="fa fa-angle-right"></span>
            </div>
          </router-link>

          <section class="shop_statu_detail">
            <div class="fa-smile-o-wrapper">
              <i class="fa fa-smile-o"></i>
            </div>
            <div class="check_date">
              <p>
                <span>监督检查结果：</span>
                <span class="shop_status_well" v-if="shopDetail.status == 1">良好</span>
                <span class="shop_status_bad" v-else>差</span>
              </p>
              <p v-if="shopDetail.identification">
                <span>检查日期：</span>{{shopDetail.identification.company_name}}
                <span>{{shopDetail.identification.identificate_date.split('T')[0]}}</span>
              </p>
            </div>
          </section>
        </section>
        <section class="shop_status_info">
          <header>商家信息</header>
          <p>{{shopDetail.name}}</p>
          <p>地址：{{shopDetail.address}}</p>
          <p v-if="shopDetail.opening_hours">营业时间：{{shopDetail.opening_hours[0]}}</p>
          <p @click="showLicenseImg(shopDetail.license.business_license_image)">
            <span>营业执照</span>
            <span class="fa fa-angle-right"></span>
          </p>
          <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)">
            <span>餐饮服务许可证</span>
            <span class="fa fa-angle-right"></span>
          </p>
        </section>

        <transition name="fade" mode="out-in">
          <section class="license_container" v-show="showlicenseImg" @click="showlicenseImg = false">
            <img :src="getImgPath(licenseImg)">
          </section>
        </transition>

      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>

</template>
<script>
  import vheader from '../../../components/header/header.vue'
  import {getImgPath} from '../../../mixin/getPath'
  export default {
    components: {
      vheader
    },
    mixins: [getImgPath],
    data () {
      return {
        showlicenseImg: false,
        licenseImg: null
      }
    },
    computed: {
      shopDetail () {  // 获取商家详情信息
        return this.$store.getters.shopDetails
      }
    },
    methods: {
      goBackToShop () {
        this.$root.showShop = true
        console.log(this.$root.showShop)
        window.localStorage.setItem('showShop', true)
        this.$router.push({path: '/shop'})
      },
      showLicenseImg (img) {
        this.licenseImg = img
        this.showlicenseImg = true
      },
      goToSafe () {
        this.$root.isshopDetail = false
        window.localStorage.setItem('isshopDetail', false)
        this.$router.push({path: '/shop/shopdetail/shopSafe'})
      }
    },
    created () {
      window.localStorage.getItem('isshopDetail') === null ? this.$root.isshopDetail = true : window.localStorage.getItem('isshopDetail') === 'false' ? this.$root.isshopDetail = false : this.$root.isshopDetail = true
    }
  }
</script>
<style scoped>
  @import './shopDetail.css';
</style>
