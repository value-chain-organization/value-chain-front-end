import { axios } from '@/utils/request'


export const editCmd = ({bindTime,devices,args}) => {
  return axios({
    baseURL:'/huali',
    url: '/mxgraph/issuedOrder',
    data: {
      bindTime,devices,args
    },
    method: 'post'
  })
}

export const getBindDataList = ({items}) => {
  return axios({
    baseURL:'/huali',
    url: '/mxgraph/bindData',
    data: items,
    method: 'post'
  })
}


export const getModuleInfo = ({id}) => {
  return axios({
    baseURL:'/huali',
    url: `/mxgraph/getMxgraphXml/${id}`,
    params: {},
    method: 'get'
  })
}