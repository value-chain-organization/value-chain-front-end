import { axios } from '@/utils/request'

const api = {
  getData: '/BenefitCalc/GetData',
  saveChange: '/BenefitCalc/SaveChange',
  runModel: '/BenefitCalc/RunModel',
  getTaskLog: '/BenefitCalc/GetTaskLog',
  updateDB: '/BenefitCalc/UpdateDB',
  getDownList: '/BenefitCalc/GetDownList',
  getBenefitRes: '/BenefitCalc/GetBenefitRes'
}

export function getCrudeOilPrice () {
  return axios({
    url: '/price/crudeOil',
    method: 'get'
  })
}

export function getPePrice () {
  return axios({
    url: '/price/pe',
    method: 'get'
  })
}

export function getPpPrice () {
  return axios({
    url: '/price/pp',
    method: 'get'
  })
}

export function getMineralOilPrice () {
  return axios({
    url: '/price/mineralOil',
    method: 'get'
  })
}

export function getPolyesterPrice () {
  return axios({
    url: '/price/polyester',
    method: 'get'
  })
}

export function getAcrylicPrice () {
  return axios({
    url: '/price/acrylic',
    method: 'get'
  })
}

export function getPeBenefit () {
  return axios({
    url: '/benefit/1pe',
    method: 'get'
  })
}

export function getEthyleneBenefit (params) {
  return axios({
    url: '/benefit/ethylene',
    method: 'get',
    params: params
  })
}

export function getOilDeviceLoadList () {
  return axios({
    url: '/deviceLoad/oil',
    method: 'get'
  })
}

export function getChemicalDeviceLoadList () {
  return axios({
    url: '/deviceLoad/chemical',
    method: 'get'
  })
}

export function getPlasticDeviceLoadList () {
  return axios({
    url: '/deviceLoad/plastic',
    method: 'get'
  })
}

export function getFiberDeviceLoadList () {
  return axios({
    url: '/deviceLoad/fiber',
    method: 'get'
  })
}

export function getOilPrice () {
  return axios({
    url: '/price/oil',
    method: 'get'
  })
}

export function getChemicalPrice () {
  return axios({
    url: '/price/chemical',
    method: 'get'
  })
}

export function getPlasticPrice () {
  return axios({
    url: '/price/plastic',
    method: 'get'
  })
}

export function getFiberPrice () {
  return axios({
    url: '/price/fiber',
    method: 'get'
  })
}

export function getGasfiredDieselPrice () {
  return axios({
    url: '/price/gasfiredDiesel',
    method: 'get'
  })
}

export function getWaxOilLineBenefit () {
  return axios({
    url: '/price/waxOilLineBenefit',
    method: 'get'
  })
}

export function getMediumPressureDeviceBenefit () {
  return axios({
    url: '/Benefit/mediumPressureDevice',
    method: 'get'
  })
}

export function getHighPressureDeviceBenefit () {
  return axios({
    url: '/Benefit/highPressureDevice',
    method: 'get'
  })
}

export function getCatalyticUnitBenefit () {
  return axios({
    url: '/Benefit/catalyticUnit',
    method: 'get'
  })
}

export function getResidueLineBenefit () {
  return axios({
    url: '/Benefit/residueLine',
    method: 'get'
  })
}

export function getCatalyticUnitBenefit2 () {
  return axios({
    url: '/Benefit/catalyticUnit2',
    method: 'get'
  })
}

export function getMeltingDeviceBenefit () {
  return axios({
    url: '/Benefit/meltingDevice',
    method: 'get'
  })
}

export function getCokingPlantBenefit () {
  return axios({
    url: '/Benefit/cokingPlant',
    method: 'get'
  })
}

export function getAsphaltPlantBenefit () {
  return axios({
    url: '/Benefit/asphaltPlant',
    method: 'get'
  })
}

export function getEthyleneLineBenefit () {
  return axios({
    url: '/Benefit/ethyleneLine',
    method: 'get'
  })
}

export function get1PEDeviceBenefit () {
  return axios({
    url: '/Benefit/1PEDevice',
    method: 'get'
  })
}

export function get2PEDeviceBenefit () {
  return axios({
    url: '/Benefit/2PEDevice',
    method: 'get'
  })
}

export function get4PEDeviceBenefit () {
  return axios({
    url: '/Benefit/4PEDevice',
    method: 'get'
  })
}

export function getGlycol1DeviceBenefit () {
  return axios({
    url: '/Benefit/glycol1Device',
    method: 'get'
  })
}

export function getGlycol2DeviceBenefit () {
  return axios({
    url: '/Benefit/glycol2Device',
    method: 'get'
  })
}

export function getVACDeviceBenefit () {
  return axios({
    url: '/Benefit/vacDevice',
    method: 'get'
  })
}

export function getAcrylicLineBenefit () {
  return axios({
    url: '/Benefit/acrylicLine',
    method: 'get'
  })
}

export function getPP1DeviceBenefit () {
  return axios({
    url: '/Benefit/PP1Device',
    method: 'get'
  })
}

export function getPP2DeviceBenefit () {
  return axios({
    url: '/Benefit/PP2Device',
    method: 'get'
  })
}

export function getPP3DeviceBenefit () {
  return axios({
    url: '/Benefit/PP3Device',
    method: 'get'
  })
}

export function getC5Benefit () {
  return axios({
    url: '/Benefit/C5',
    method: 'get'
  })
}

export function getC51Benefit () {
  return axios({
    url: '/Benefit/C51',
    method: 'get'
  })
}

export function getC52Benefit () {
  return axios({
    url: '/Benefit/C52',
    method: 'get'
  })
}

export function getEthylenePropylenePx () {
  return axios({
    url: '/Benefit/ethylenePropylenePx',
    method: 'get'
  })
}

export function getNaphthaBenefit () {
  return axios({
    url: '/Benefit/naphtha',
    method: 'get'
  })
}

export function getAromaticsDeviceBenefit () {
  return axios({
    url: '/Benefit/aromaticsDevice',
    method: 'get'
  })
}

export function getEthyleneDeviceBenefit () {
  return axios({
    url: '/Benefit/ethyleneDevice',
    method: 'get'
  })
}

export function getPTADeviceBenefit () {
  return axios({
    url: '/Benefit/PTADevice',
    method: 'get'
  })
}

export function getPolyester1DeviceBenefit () {
  return axios({
    url: '/Benefit/polyester1Device',
    method: 'get'
  })
}

export function getPolyester2DeviceBenefit () {
  return axios({
    url: '/Benefit/polyester2Device',
    method: 'get'
  })
}

export function getAcrylicLineBenefitData () {
  return axios({
    url: '/Benefit/acrylicLineBenefit',
    method: 'get'
  })
}

export function getSourceAcrylicBenefit () {
  return axios({
    url: '/Benefit/sourceAcrylic',
    method: 'get'
  })
}

export function getNorthAcrylicBenefit () {
  return axios({
    url: '/Benefit/northAcrylic',
    method: 'get'
  })
}

export function getGoldAcrylicBenefit () {
  return axios({
    url: '/Benefit/goldAcrylic',
    method: 'get'
  })
}

export function getTrendOfBenefit () {
  return axios({
    url: '/plateBenefit/trend',
    method: 'get'
  })
}

export function getRefineOilBenefit () {
  return axios({
    url: '/plateBenefit/refineOil',
    method: 'get'
  })
}

export function getPlasticsBenefit () {
  return axios({
    url: '/plateBenefit/plastics',
    method: 'get'
  })
}

export function getChemicalIndustryBenefit () {
  return axios({
    url: '/plateBenefit/chemicalIndustry',
    method: 'get'
  })
}

export function getFiberboardBenefit () {
  return axios({
    url: '/plateBenefit/fiberboard',
    method: 'get'
  })
}

// zmx oil benefit calculation
export function getOilBenefitInitResult ({ filename }) {
  return axios({
    url: api.getBenefitRes,
    params: { filename },
    method: 'get'
  })
}

export function getOilBenefitInitData () {
  return axios({
    url: api.getData,
    method: 'get'
  })
}

export function saveChange (params) {
  return axios({
    url: api.saveChange,
    data: params,
    method: 'post'
  })
}

// export function runModel ({ username, type }) {
//   return axios({
//     url: api.runModel,
//     data: { username, type },
//     method: 'post'
//   })
// }
export function runModel ({ username, type, arr }) {
  return axios({
    url: api.runModel,
    data: { username, type, arr },
    method: 'post'
  })
}
export function getTaskLog ({ username, guid }) {
  return axios({
    url: api.getTaskLog,
    data: { username, guid },
    method: 'post'
  })
}

export function updateDB () {
  return axios({
    url: api.updateDB,
    method: 'get'
  })
}

export function getDownList ({ username }) {
  return axios({
    url: api.getDownList,
    params: { username },
    method: 'get'
  })
}
