<template>
  <div class="question_detail_wrapper">

    <vheader :message="title">
      <span to="/user" class="fa fa-angle-left" slot="angle" @click="goToService"></span>
    </vheader>

      <div class="content-wrapper">
      <div class="question_detail_content" v-html="content"></div>
    </div>

  </div>
</template>
<script>
  import vheader from '../../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    data () {
      return {
        title: '',
        content: ''
      }
    },
    computed: {},
    created () {
      setTimeout(() => {
        this.getServiceData()
      }, 500)
    },
    methods: {
      goToService () {
        window.localStorage.setItem('serviceData', true)
        this.$router.push({path: '/service'})
        this.$root.serviceData = true
      },
      getServiceData () { // 根据当前的index获取对应的数据
        let index = parseInt(window.localStorage.getItem('index'))
        this.title = this.$store.getters.service[index].question
        this.content = this.$store.getters.service[index].Content
      }
    }
  }
</script>
<style scoped>
  @import './questiondetail.css';
</style>
