<template>
  <div class="shop_safe_wrapper">
    <vheader message="食品监督安全公示">
      <span class="fa fa-angle-left" @click="goBackToShop" slot="angle"></span>
    </vheader>

    <section id="scroll_section" class="scroll_container">
      <section class="shop_status_container">
        <header>食品监督安全公示</header>
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
            <p>
              <span>检查日期：</span>
              <span v-if="shopDetail.identification">{{shopDetail.identification.identificate_date.split('T')[0]}}</span>
            </p>
          </div>
        </section>
      </section>
      <section class="shop_status_container">
        <header>
          <span>工商登记信息</span>
        </header>
        <ul v-if="shopDetail.identification">
          <li>
            <p>企业名称</p>
            <p>{{shopDetail.identification.company_name}}</p>
          </li>
          <li>
            <p>工商执照注册号</p>
            <p>{{shopDetail.identification.identificate_agency}}</p>
          </li>
          <li>
            <p>注册资本</p>
            <p>{{shopDetail.identification.registered_number}}</p>
          </li>
          <li>
            <p>注册地址</p>
            <p>{{shopDetail.identification.registered_address}}</p>
          </li>
          <li>
            <p>属地监管所</p>
            <p>{{shopDetail.identification.registered_principal}}</p>
          </li>
          <li>
            <p>法定代表人</p>
            <p>{{shopDetail.identification.legal_person}}</p>
          </li>
          <li v-if="shopDetail.identification">
            <p>经营范围</p>
            <p>{{shopDetail.identification.operation_period}}</p>
          </li>
        </ul>
      </section>
      <section class="shop_status_container">
        <header>餐饮许可证</header>
        <ul v-if="shopDetail.identification">
          <li>
            <p>营业范围</p>
            <p>{{shopDetail.identification.operation_period}}</p>
          </li>
          <li>
            <p>许可证有效期</p>
            <p>{{shopDetail.identification.licenses_date}}</p>
          </li>
          <li>
            <p>许可证号</p>
            <p>{{shopDetail.identification.licenses_number}}</p>
          </li>
          <li>
            <p>发证时间</p>
            <p>{{shopDetail.identification.licenses_scope}}</p>
          </li>
          <li>
            <p>发证机关</p>
            <p>{{shopDetail.identification.registered_principal}}</p>
          </li>
        </ul>
      </section>
      <section class="license_img shop_status_container">
        <header>许可证书</header>
        <div class="img_container" v-if="shopDetail.license">
          <img :src="getImgPath(shopDetail.license.business_license_image)">
          <img :src="getImgPath(shopDetail.license.catering_service_license_image)">
        </div>
      </section>
    </section>
  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  import {getImgPath} from '../../../../mixin/getPath'
  export default {
    components: {
      vheader
    },
    data () {
      return {
      }
    },
    mixins: [getImgPath],
    computed: {
      shopDetail () {  // 获取商家详情信息
        return this.$store.getters.shopDetails
      }
    },
    methods: {
      goBackToShop () {
        this.$root.isshopDetail = true
        window.localStorage.setItem('isshopDetail', true)
        this.$router.push({path: '/shop/shopdetail'})
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  @import '../../../../common/animate.less';
  .shop_safe_wrapper{
    .pt(.8rem);
    min-height:100vh;
    background:@f7;
    .scroll_container{
      font-size:.24rem;
      .shop_status_container{
        background:@default;
        header{
          line-height:.7rem;
          font-size:.36rem;
          border-bottom:1px solid @ddd;
          .pl(.2rem);
        }
        .shop_statu_detail {
          .flex;
          height: 1.4rem;
          align-items: center;
          .fa-smile-o-wrapper {
            flex: 1;
            .tc;
            .fa-smile-o {
              font-size: 1rem;
              color: #7ED321;
            }
          }
          .check_date {
            flex: 4;
            p {
              line-height: .4rem;
              .shop_status_well {
                color: #7ED321;
              }
            }
          }
        }
      }
      .shop_status_container{
        .mt(.2rem);
        ul{
          .pl(.3rem);
          li{
            padding:.1rem 0;
            p{
              line-height:.4rem;
            }
          }
        }
        .img_container{
          width:100%;
          img{
            width:100%;
            height:4rem;
          }
        }
      }
    }
  }
</style>
