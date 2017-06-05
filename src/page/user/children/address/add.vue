<template>
  <div class="add-wrapper">

    <vheader message="新增地址" back="true">
      <router-link to="/user/info" tag='div' class="fa fa-angle-left" slot="angle"></router-link>
    </vheader>

    <div class="add-info-box">
      <section class="add-name com">
        <input type="text" placeholder="请填写你的姓名" v-model="inputName" :class="{waringBorder : verifyOne}"
               @input="inputThingName()">
        <span v-if="verifyOne">请填写你的姓名</span>
      </section>
      <router-link to="/user/list" class="add-house com" tag="section">
        <input type="text" placeholder="小区/写字楼/学校等" v-model="inputAdress" :class="{waringBorder : verifyTwo}">
        <span v-if="verifyTwo">{{validator.inputAdress}}</span>
      </router-link>
      <section class="add-detail-address com">
        <input type="text" placeholder="请填写详细送餐地址" v-model="addDetail" @input="inputThree()" :class="{waringBorder : verifyThree}">
        <span v-if="verifyThree">{{validator.addDetail}}</span>
      </section>
      <section class="add-phone com">
        <input type="text" placeholder="请填写能够联系到你的手机号"
               v-model="inputPhone" @input="inputFour('phone')" :class="{waringBorder : verifyFour}">
        <span v-if="verifyFour">{{validator.phone}}</span>
      </section>
      <section class="add-backup-phone com" v-model="backPhone">
        <input type="text" placeholder="备用联系电话" @input="inputFour('backphone')">
        <span v-if="verifyFive">{{validator.backPhone}}</span>
      </section>
    </div>

    <div class="btn-wrapper">
      <button class="add-address-btn" @click="addAddress()">新增地址</button>
    </div>

  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    data () {
      return {
        inputPhone: '',
        addDetail: '',
        backPhone: '',
        inputName: '',
        verifyOne: false,
        verifyTwo: false,
        verifyThree: false,
        verifyFour: false,
        verifyFive: false,
        inputAdress: '',
        validator: {
          name: '',
          addDetail: '',
          inputAdress: '',
          phone: '',
          backPhone: ''
        }
      }
    },
    methods: {
      inputThingName () {  // 名字的验证
        if (this.inputName.length < 2) {
          this.verifyOne = true
        } else {
          this.verifyOne = false
          window.localStorage.setItem('inputName', this.inputName)
        }
      },
      inputThree () {  // 验证地址
        if (this.addDetail.length < 5) {
          this.verifyThree = true
          this.validator.addDetail = '您的内容太短，识别不出来'
        } else {
          this.verifyThree = false
          window.localStorage.setItem('addDetail', this.addDetail)
        }
      },
      inputFour (variable) {  // 验证手机号
        let reg = /^[1][358][0-9]{9}$/
        if (reg.test(this.inputPhone)) {
          this.verifyFour = false
        } else {
          this.verifyFour = true
          if (variable === 'phone') {
            this.validator.phone = '请输入11位有效的手机号'
            window.localStorage.setItem('inputPhone', this.inputPhone)
          } else {
            this.validator.backPhone = '请输入11位有效的手机号'
            window.localStorage.setItem('backPhone', this.backPhone)
          }
          window.localStorage.setItem('inputAdress', this.inputAdress)
        }
      },
      addAddress () { // 点击提交进行验证
        this.inputName === '' ? this.verifyOne = true : this.verifyOne = false
        if (this.addDetail === '') {
          this.validator.addDetail = '地址不能为空'
          this.verifyThree = true
        } else {
          this.verifyThree = false
        }
        if (this.inputPhone === '') {
          this.validator.phone = '手机号必填'
          this.verifyFour = true
        } else {
          this.verifyFour = false
        }
        if (this.inputAdress === '') {
          this.validator.inputAdress = '地址不能为空'
          this.verifyTwo = true
        } else {
          this.verifyTwo = false
        }
        if ((this.inputName !== '' && this.inputAdress !== '' && this.addDetail !== '' && this.inputPhone !== '') && (this.verifyOne === false && this.verifyTwo === false && this.verifyThree === false)) {
          let obj = {}
          obj.address = this.inputAdress
          obj.phone = this.inputPhone
          this.address.address.unshift(obj)  // 添加新的地址数据并保存在本地
          window.localStorage.setItem('address', JSON.stringify(this.address))
          this.$router.push({path: '/user/edit'})
        }
      }
    },
    computed: {
      address () {
        return this.$store.getters.address
      }
    },
    created () {  // 也面以刷新就获取本地存储的数据
      this.inputName = window.localStorage.getItem('inputName')
      this.inputAdress = window.localStorage.getItem('inputAdress')
      this.backPhone = window.localStorage.getItem('backPhone')
      this.inputPhone = window.localStorage.getItem('inputPhone')
      this.addDetail = window.localStorage.getItem('addDetail')
    }
  }
</script>
<style scoped>
  @import './add.css';
</style>
