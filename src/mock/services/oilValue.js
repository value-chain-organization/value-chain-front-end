import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
import { generateLineChartData } from '@/utils/util'

const crudeOilPerice = () => {
  const response = generateLineChartData({
    xAxis: { key: 'date', months: 12 },
    yAxis: { key: 'price', minVal: 50, maxVal: 80 }
  })
  return builder(response)
}

const pePerice = () => {
  const response = generateLineChartData({
    xAxis: { key: 'date', months: 12 },
    yAxis: { key: 'price', minVal: 60, maxVal: 90 }
  })
  return builder(response)
}

const ppPerice = () => {
  const response = generateLineChartData({
    xAxis: { key: 'date', months: 12 },
    yAxis: { key: 'price', minVal: 50, maxVal: 80 }
  })
  return builder(response)
}

const mineralOilPerice = () => {
  const response = generateLineChartData({
    xAxis: { key: 'date', months: 12 },
    yAxis: { key: 'price', minVal: 50, maxVal: 80 }
  })
  return builder(response)
}

const polyesterPerice = () => {
  const response = generateLineChartData({
    xAxis: { key: 'date', months: 12 },
    yAxis: { key: 'price', minVal: 50, maxVal: 80 }
  })
  return builder(response)
}

const acrylicPerice = () => {
  const response = generateLineChartData({
    xAxis: { key: 'date', months: 12 },
    yAxis: { key: 'price', minVal: 60, maxVal: 90 }
  })
  return builder(response)
}

const peBenefit = () => {
  const response = [
    { goodsCode: 'Qe5a8FY_3', planNum: 1, detectNum: 1 },
    { goodsCode: 'YA2zQo8nF', planNum: 2, detectNum: 2 }
  ]
  return builder(response)
}

const ethyleneBenefit = (options) => {
  const params = getQueryParameters(options)
  return builder(params)
}

Mock.mock(/\/api\/price\/crudeOil/, 'get', crudeOilPerice)
Mock.mock(/\/api\/price\/pe/, 'get', pePerice)
Mock.mock(/\/api\/price\/pp/, 'get', ppPerice)
Mock.mock(/\/api\/price\/mineralOil/, 'get', mineralOilPerice)
Mock.mock(/\/api\/price\/polyester/, 'get', polyesterPerice)
Mock.mock(/\/api\/price\/acrylic/, 'get', acrylicPerice)
Mock.mock(/\/api\/benefit\/1pe/, 'get', peBenefit)
Mock.mock(/\/api\/benefit\/ethylene/, 'get', ethyleneBenefit)

// zmx
const OilBenefitInitData = () => {
  const result = [
    { id: 1, oil_type: '平湖凝析油', min_value: '0', man_value: '0', discount: '0', freight: '10', ton_arrel_ratio: 8.024 },
    { id: 2, oil_type: '阿曼', min_value: 14, man_value: 14, discount: '0', freight: '10', ton_arrel_ratio: 7.024 },
    { id: 3, oil_type: '乌拉尔', min_value: 6, man_value: 6, discount: '0', freight: '10', ton_arrel_ratio: 7.224 },
    { id: 4, oil_type: '科威特', min_value: 19, man_value: 19, discount: '0', freight: '10', ton_arrel_ratio: 6.024 },
    { id: 5, oil_type: '巴士拉轻油', min_value: 28.5, man_value: 28.5, discount: '0', freight: '10', ton_arrel_ratio: 5.024 }
  ]
  const response = {
    data: result,
    pageSize: 10,
    pageNo: 0,
    totalPage: 6,
    totalCount: 57
  }
  return builder(response)
}
Mock.mock('/huali-api/oilBenefit/initData', 'get', OilBenefitInitData)

const OilBenefitInitResult = () => {
  const result = [
    { id: 1, oil_type: '巴士拉轻油', opt_config_val: 28500, shadow_price: 152.729, increment_method: 20000, instead_method: 30000 },
    { id: 2, oil_type: '科威特', opt_config_val: 19000, shadow_price: 132.264, increment_method: 20000, instead_method: 30000 },
    { id: 3, oil_type: '沙特中质油', opt_config_val: 19000, shadow_price: 103.729, increment_method: 20000, instead_method: 30000 },
    { id: 4, oil_type: '瓦斯科尼亚', opt_config_val: 5000, shadow_price: 94.729, increment_method: 20000, instead_method: 30000 },
    { id: 5, oil_type: '沙特轻油', opt_config_val: 23000, shadow_price: 80.729, increment_method: 20000, instead_method: 30000 },
    { id: 6, oil_type: '阿曼', opt_config_val: 14000, shadow_price: 37.729, increment_method: 20000, instead_method: 30000 },
    { id: 7, oil_type: '福蒂斯', opt_config_val: 8500, shadow_price: 22.729, increment_method: 20000, instead_method: 30000 },
    { id: 8, oil_type: '乌拉尔', opt_config_val: 6000, shadow_price: 18.729, increment_method: 20000, instead_method: 30000 },
    { id: 9, oil_type: '巴士拉轻油', opt_config_val: 28500, shadow_price: 152.729, increment_method: 20000, instead_method: 30000 },
    { id: 10, oil_type: '巴士拉轻油', opt_config_val: 28500, shadow_price: 152.729, increment_method: 20000, instead_method: 30000 }
  ]
  const response = {
    data: result,
    pageSize: 10,
    pageNo: 0,
    totalPage: 6,
    totalCount: 57
  }
  return builder(response)
}
Mock.mock('/huali-api/oilBenefit/result', 'get', OilBenefitInitResult)

const deviceLoadOil = () => {
  const result = [
    { id: 1, cou1: 'ccsu2', proValue: '100', optValue: '110', monthPlanValue: '120' },
    { id: 2, cou1: 'ccr', proValue: '200', optValue: '210', monthPlanValue: '220' },
    { id: 3, cou1: 'fcc', proValue: '100', optValue: '110', monthPlanValue: '120' },
    { id: 4, cou1: 'aaa', proValue: '100', optValue: '110', monthPlanValue: '120' },
    { id: 5, cou1: 'bbb', proValue: '100', optValue: '110', monthPlanValue: '120' }
  ]
  const response = {
    data: result
  }
  return builder(response)
}

Mock.mock('/api/deviceLoad/oil', 'get', deviceLoadOil)
Mock.mock('/api/deviceLoad/chemical', 'get', deviceLoadOil)
Mock.mock('/api/deviceLoad/plastic', 'get', deviceLoadOil)
Mock.mock('/api/deviceLoad/fiber', 'get', deviceLoadOil)

const oilPerice = () => {
  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()
  const date = []
  const monthValue = []
  const dayValue = []
  const optValue = []
  for (let i = 12; i > 0; i--) {
    const d = month - 12 + i > 0 ? year + '-' + (month - 12 + i) : (year - 1) + '-' + (month + i)
    date.push(d)
    monthValue.push(Math.round((Math.random() * 30 + 60) * 10) / 10)
    dayValue.push(Math.round((Math.random() * 20 + 20) * 10) / 10)
    optValue.push(Math.round((Math.random() * 20 + 30) * 10) / 10)
  }
  const response = {
    monthValue: monthValue,
    dayValue: dayValue,
    optValue: optValue,
    date: date.reverse()
  }
  return builder(response)
}
Mock.mock('/api/price/oil', 'get', oilPerice)
Mock.mock('/api/price/chemical', 'get', oilPerice)
Mock.mock('/api/price/plastic', 'get', oilPerice)
Mock.mock('/api/price/fiber', 'get', oilPerice)
Mock.mock('/api/price/gasfiredDiesel', 'get', oilPerice)
Mock.mock('/api/price/waxOilLineBenefit', 'get', oilPerice)
Mock.mock('/api/Benefit/mediumPressureDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/highPressureDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/catalyticUnit', 'get', oilPerice)
Mock.mock('/api/Benefit/residueLine', 'get', oilPerice)
Mock.mock('/api/Benefit/catalyticUnit2', 'get', oilPerice)
Mock.mock('/api/Benefit/meltingDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/cokingPlant', 'get', oilPerice)
Mock.mock('/api/Benefit/asphaltPlant', 'get', oilPerice)
Mock.mock('/api/Benefit/ethyleneLine', 'get', oilPerice)
Mock.mock('/api/Benefit/1PEDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/2PEDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/4PEDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/glycol1Device', 'get', oilPerice)
Mock.mock('/api/Benefit/glycol2Device', 'get', oilPerice)
Mock.mock('/api/Benefit/vacDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/acrylicLine', 'get', oilPerice)
Mock.mock('/api/Benefit/PP1Device', 'get', oilPerice)
Mock.mock('/api/Benefit/PP2Device', 'get', oilPerice)
Mock.mock('/api/Benefit/PP3Device', 'get', oilPerice)
Mock.mock('/api/Benefit/C5', 'get', oilPerice)
Mock.mock('/api/Benefit/C51', 'get', oilPerice)
Mock.mock('/api/Benefit/C52', 'get', oilPerice)
Mock.mock('/api/Benefit/ethylenePropylenePx', 'get', oilPerice)
Mock.mock('/api/Benefit/naphtha', 'get', oilPerice)
Mock.mock('/api/Benefit/aromaticsDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/ethyleneDevice', 'get', oilPerice)
Mock.mock('/api/Benefit/PTADevice', 'get', oilPerice)
Mock.mock('/api/Benefit/polyester1Device', 'get', oilPerice)
Mock.mock('/api/Benefit/polyester2Device', 'get', oilPerice)
Mock.mock('/api/Benefit/sourceAcrylic', 'get', oilPerice)
Mock.mock('/api/Benefit/acrylicLineBenefit', 'get', oilPerice)
Mock.mock('/api/Benefit/northAcrylic', 'get', oilPerice)
Mock.mock('/api/Benefit/goldAcrylic', 'get', oilPerice)

// xwb--分组柱状图
const getDataForBarsChart = () => {
  const result = [
    {title: '月度效益', date: '', value: 88},
    {title: '月度效益', date: '', value: 89},
    {title: '月度效益', date: '', value: 83},
    {title: '月度效益', date: '', value: 79},
    {title: '月度效益', date: '', value: 88},
    {title: '月度效益', date: '', value: 81},
    {title: '月度效益', date: '', value: 88},
    {title: '月度效益', date: '', value: 85},
    {title: '月度效益', date: '', value: 88},
    {title: '月度效益', date: '', value: 89},
    {title: '月度效益', date: '', value: 90},
    {title: '月度效益', date: '', value: 85},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 9},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 12},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 11},
    {title: '当天效益', date: '', value: 10},
    {title: '当天效益', date: '', value: 10},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 8},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 15},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 14},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 12},
    {title: '优化效益', date: '', value: 10},
    {title: '优化效益', date: '', value: 12}
  ]
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  for (let j = 2; j >= 0; j--) {
    for (let i = 12; i > 0; i--) {
      result[j * 12 + i - 1].date = month - 12 + i > 0 ? year + '-' + (month - 12 + i) : (year - 1) + '-' + (month + i);
    }
  }
  return builder(result);
}

Mock.mock('/api/plateBenefit/trend', 'get', getDataForBarsChart)
Mock.mock('/api/plateBenefit/refineOil', 'get', getDataForBarsChart)
Mock.mock('/api/plateBenefit/plastics', 'get', getDataForBarsChart)
Mock.mock('/api/plateBenefit/chemicalIndustry', 'get', getDataForBarsChart)
Mock.mock('/api/plateBenefit/fiberboard', 'get', getDataForBarsChart)
