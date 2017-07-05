<template>
  <div class="address-wrapper">

    <vheader message="编辑地址">
      <router-link to="/user/info" class="fa fa-angle-left" tag="span" slot="angle"></router-link>
      <span class="edit" @click="isShowRemove = !isShowRemove" slot="edit">编辑</span>
    </vheader>

    <ul class="address-list">
      <li v-for="(item, index) in addressList" :class="{active: index === negativeLight}" @click="changeNegative(index)">
        <dl>
          <dd>{{item.address}}</dd>
          <dd>{{item.phone}}</dd>
        </dl>
        <span class="fa fa-remove" v-show="isShowRemove" @click="deleteOne(index)"></span>
      </li>
    </ul>
    <h5 @click="goToUserAdd()">
      <span>新增地址</span><span class="fa fa-angle-right"></span>
    </h5>
  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  export default {
    data () {
      return {
        isShowRemove: false, // 删除标记
        addressList: [],  // 地址列表
        negativeLight: 0 //  默认选中第一个
      }
    },
    components: {
      vheader
    },
    computed: {
      address () {
        return this.$store.getters.address
      }
    },
    methods: {
      deleteOne (index) {
        this.address.address.splice(index, 1) // 删除当前的地址
        this.UpdatedInRealTime()
      },
      initAddressList () {  // 页面刷新初始化数据
        if (!window.localStorage.getItem('address')) {
          window.localStorage.setItem('address', JSON.stringify(this.address))
          this.addressList = JSON.parse(window.localStorage.getItem('address'))
        } else { // 本地获取数据
          this.addressList = JSON.parse(window.localStorage.getItem('address')).address
        }
      },
      UpdatedInRealTime () {  // 实时更新本地数据
        window.localStorage.setItem('address', JSON.stringify(this.address))  // 更新本地数据
        this.addressList = JSON.parse(window.localStorage.getItem('address')).address  // 获取本地数据
      },
      goToUserAdd () {  // 清楚本地数据
        window.localStorage.setItem('inputName', '')
        window.localStorage.setItem('inputAdress', '')
        window.localStorage.setItem('backPhone', '')
        window.localStorage.setItem('inputPhone', '')
        window.localStorage.setItem('addDetail', '')
        this.$router.push({path: '/user/add'})
      },
      changeNegative (index) {
        this.negativeLight = index
      }
    },
    created () {  // 特面刷新加载本地数据
      this.initAddressList()
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  .address-wrapper{
    height:100vh;
    width:100%;
    .box;
    .pt(1rem);
    .address-list{
      font-size:.24rem;
      color:@4D;
      background:@default;
      li:first-child{
        border-top:1px solid @ddd;
      }
      .active{
        background:#FAF7D8;
      }
      li{
        padding:.2rem .3rem;
        .rel;
        border-bottom:1px solid @ddd;
        dd{
          line-height:.4rem;
        }
        .fa-remove{
          .abs;
          .vc;
          right:.3rem;
        }
      }
    }
    >h5{
      font-size:.28rem;
      font-weight:normal;
      line-height:.8rem;
      background:@default;
      .mt(.2rem);
      .pl(.3rem);
      .flex;
      .rel;
      border-top:1px solid @ddd;
      border-bottom:1px solid @ddd;
      .fa-angle-right{
        font-size:.6rem;
        .abs;
        .vc;
        right:.3rem;
      }
    }
  }
</style>
