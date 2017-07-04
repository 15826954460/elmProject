<template>
  <div class="add_address_box">
    <transition name="parent-slide" mode="out-in">
      <div class="address_wrapper" v-show="!isShowAddAddress">
        <vhead message="添加地址">
          <span class="fa fa-angle-left" slot="angle" @click="backToChooseAddress"></span>
        </vhead>
        <section class="address_content">
          <div class="input_box">
            <label for="name">联系人</label>
            <div class="input_wrapper">
              <input type="text" placeholder="你的名字" id="name" v-model="inputname">
              <div class="six">
                <p class="man"><i class="fa fa-check-circle"
                                  :class="{sixActive:changeMan}"
                                  @click="changeSixMan"></i><span>先生</span></p>
                <p class="woman"><i class="fa fa-check-circle"
                                    :class="{sixActive:!changeMan}"
                                    @click="changeSixWoman"></i><span>女士</span></p>
              </div>
            </div>
          </div>
          <div class="input_box">
            <label for="phone">联系电话</label>
            <div class="input_wrapper">
              <div class="phone_wrapper">
                <input type="text" id="phone" placeholder="你的手机号" v-model="inputTelephone">
                <i class="fa fa-plus-square" @click="showRemark = !showRemark"></i>
              </div>
              <input type="text" placeholder="备选电话" v-show="showRemark" v-model="remarkTelephone">
            </div>
          </div>
          <div class="input_box">
            <label for="address">送餐地址</label>
            <div class="input_wrapper">
              <p class="change_address" id="change_address" @click="goToAddAddress">小区/写字楼/学校等</p>
              <input type="text" placeholder="详细地址(如门排号)" id="address" v-model="inputDetailAddress">
            </div>
          </div>
          <div class="input_box">
            <label for="biaoqian">标签</label>
            <div class="input_wrapper">
              <input type="text" id="biaoqian" placeholder="无/家/学校/公司" v-model="inputTab">
            </div>
          </div>
        </section>
        <p class="btn" @click="confirm">确定</p>

        <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
        </alertBounced>

      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>
<script>
  import vhead from '../../../../components/header/header.vue'
  import alertBounced from '../../../../components/bounced/bounced'
  export default {
    data () {
      return {
        showAlert: false,
        alertText: '',
        showRemark: false,
        changeMan: true,
        inputname: '', // 姓名
        inputTelephone: '', // 电话号码
        remarkTelephone: '', // 备选电话
        inputDetailAddress: '', // 详细地址
        inputTab: '', // 标签
        addressList: {six: '男'}, // 地址信息详情
        isShowAddAddress: false // 是否显示子路由
      }
    },
    components: {
      vhead,
      alertBounced
    },
    methods: {
      backToChooseAddress () { // 跳转到父路由
        this.$router.push({path: '/confirmOrder/chooseAddress'})
        window.localStorage.setItem('showChildrenAddress', false)
        this.$store.commit('setShowChildrenAddress', false)
      },
      changeSixMan () { // 选择男士
        this.changeMan = true
        this.addressList.six = '男'
      },
      changeSixWoman () { // 选择女士
        this.changeMan = false
        this.addressList.six = '女'
      },
      confirm () { // 确认
        if (this.inputname === '') {
          this.alertText = '请输入您的姓名'
        } else if (this.inputTelephone === '') {
          this.alertText = '请输入您的联系电话'
        } else if (this.inputDetailAddress === '') {
          this.alertText = '请输入您的详细地址'
        } else if (this.inputTab === '') {
          this.alertText = '标签不能为空'
        } else if (document.getElementById('change_address').innerHTML === '') {
          this.alertText = '请选择送餐地址'
        } else {
          this.addressList.name = this.inputname
          this.addressList.inputTelephone = this.inputTelephone
          this.addressList.remarkTelephone = this.remarkTelephone
          this.addressList.inputDetailAddress = this.inputDetailAddress
          this.addressList.inputTab = this.inputTab
          this.addressList.changeAddress = document.getElementById('change_address').innerHTML
        }
        this.showAlert = true
      },
      goToAddAddress () { // 切换到添加地址页
        this.isShowAddAddress = true
        this.$router.push({path: '/confirmOrder/chooseAddress/address/addAddress'})
      }
    }
  }
</script>
<style scoped>
  @import './address.css';
</style>
