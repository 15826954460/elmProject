require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var hot_cityData = require('../data/homeData/hot_city.json')
var hot_city = hot_cityData.hot_city
var group_cityData = require('../data/group_cityData/group_city.json')
var search_Data = require('../data/search_city/search.json')
var search_data = search_Data.search_data
var foodTypes_Data = require('../data/food_type/foodTypes.json')
var foodTypes = foodTypes_Data.foodTypes
var shopList_Data = require('../data/shop_list/shop_list.json')
var shopList = shopList_Data.shopList
var business_Data = require('../data/search_business/business.json')
var business = business_Data.searchData
var order_Data = require('../data/order/order.json')
var orderList = order_Data.orderList
var orderDetail = order_Data.orderDetail
var add_detail_Data = require('../data/add_detaiil/add_detail.json')
var add_detail = add_detail_Data.add_detail
var service_Data = require('../data/service/service.json')
var service = service_Data.serviceData
var hongbaoList_Data = require('../data/hongbaoList/hongbaoList.json')
var hongbaoList = hongbaoList_Data.hongbaoList
var shopDetails_Data = require('../data/shopDetails/shop_detail.json')
var shopDetails = shopDetails_Data.shopDetails
var shopMenu = shopDetails_Data.shopMenu
var ratingList = shopDetails_Data.ratingList
var scores = shopDetails_Data.scores
var tage = shopDetails_Data.tage
var confirm_data = require('../data/confirmOrder/confirmOrder.json')

var apiRoutes = express.Router();

apiRoutes.get('/hot_city', function (req, res) {
  res.json({
    errno:0,
    hot_city: hot_city
  })
})
apiRoutes.get('/group_cityData', function (req, res) {
  res.json({
    errno:0,
    group_cityData: group_cityData
  })
})
apiRoutes.get('/search_data', function (req, res) {
  res.json({
    errno:0,
    search_data: search_data
  })
})
apiRoutes.get('/foodTypes', function (req, res) {
  res.json({
    errno:0,
    foodTypes: foodTypes
  })
})
apiRoutes.get('/shopList', function (req, res) {
  res.json({
    errno:0,
    shopList: shopList
  })
})
apiRoutes.get('/business', function (req, res) {
  res.json({
    errno:0,
    business: business
  })
})
apiRoutes.get('/orderList', function (req, res) {
  res.json({
    errno:0,
    orderList: orderList
  })
})
apiRoutes.get('/orderDetail', function (req, res) {
  res.json({
    errno:0,
    orderDetail: orderDetail
  })
})
apiRoutes.get('/add_detail', function (req, res) {
  res.json({
    errno:0,
    add_detail: add_detail
  })
})
apiRoutes.get('/service', function (req, res) {
  res.json({
    errno:0,
    service: service
  })
})
apiRoutes.get('/hongbaoList', function (req, res) {
  res.json({
    errno:0,
    hongbaoList: hongbaoList
  })
})
apiRoutes.get('/shopDetails', function (req, res) {
  res.json({
    errno:0,
    shopDetails: shopDetails
  })
})
apiRoutes.get('/shopMenu', function (req, res) {
  res.json({
    errno:0,
    shopMenu: shopMenu
  })
})
apiRoutes.get('/ratingList', function (req, res) {
  res.json({
    errno:0,
    ratingList: ratingList
  })
})
apiRoutes.get('/scores', function (req, res) {
  res.json({
    errno:0,
    scores: scores
  })
})
apiRoutes.get('/tage', function (req, res) {
  res.json({
    errno:0,
    tage: tage
  })
})
apiRoutes.get('/confirm_data', function (req, res) {
  res.json({
    errno:0,
    confirm_data: confirm_data
  })
})
// 注册定义api
app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
