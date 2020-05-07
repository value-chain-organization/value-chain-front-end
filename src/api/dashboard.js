import { axios } from '@/utils/request'

export function getDashboardData ({ id }) {
  return axios({
    url: `/ValueChain/Dashboard${id}`,
    method: 'get'
  })
}
