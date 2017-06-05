/**
 * Created by lele on 2017/5/9.
 */
const imgBaseUrl = 'https://fuss10.elemecdn.com'
export const getImgPath = {
  methods: {  // 相当于在vue的methods中定义了一个getImgPath方法
    // 传递过来的图片地址需要处理后才能正常使用
    getImgPath (path) {
      let suffix
      if (!path) {
        return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
      return imgBaseUrl + url
    }
  }
}
export const backToBalance = {
  methods: {
    // backToBalance (state, path) {
    //   let root = 'this.$root.'
    //   root + '' + state
    //   window.localStorage.setItem(state, true)  // 为保存刷新的时候用
    //   this.$router.push({path: '/' + path})  // 回到父级路由页面
    // }
  }
}
