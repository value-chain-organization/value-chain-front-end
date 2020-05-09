// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView,bossHomeLayout } from '@/layouts'

// import Graphs from '@/config/graphSettings'
// import Trends from '@/config/trendSettings'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/valueOfOil/dashboard',
    children: [
      {
        path: '/valueOfOil',
        name: 'valueOfOil',
        component: RouteView,
        meta: { title: '价值链表征', keepAlive: true, icon: 'iconjiazhibiaozheng' },
        children: [
          {
            path: '/valueOfOil/dashboard',
            name: 'valueOfOilDashboard',
            component: () => import('@/views/valueOfOil/dashboard'),
            meta: { title: '板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/valueOfOil/refining',
            name: 'valueOfOilDashboard2',
            component: () => import('@/views/valueOfOil/dashboard2'),
            meta: { title: '炼油板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/valueOfOil/chemical',
            name: 'valueOfOilDashboard4',
            component: () => import('@/views/valueOfOil/dashboard4'),
            meta: { title: '化工板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/valueOfOil/plastic',
            name: 'valueOfOilDashboard3',
            component: () => import('@/views/valueOfOil/dashboard3'),
            meta: { title: '塑料板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/valueOfOil/fiber',
            name: 'valueOfOilDashboard5',
            component: () => import('@/views/valueOfOil/dashboard5'),
            meta: { title: '纤维板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
          }
        ]
      },
      {
        path: '/simulation',
        name: 'simulation',
        component: RouteView,
        meta: { title: '装置实时仿真', icon: 'iconlianhe1', permission: [ 'simulation' ] },
        children: [
          {
            path: `/simulation/graph`,
            name: `simulationGraph`,
            component: () => import('@/views/simulation/SimulationBase'),
            meta: { title: `装置流程图`, keepAlive: true, permission: ['simulation'] }
          },
          {
            path: `/simulation/trend`,
            name: `simulationTrend`,
            component: () => import('@/views/historicalTrend/HistoricalTrendChart'),
            meta: { title: `历史趋势对比`, keepAlive: true, permission: ['history'] }
          }
        ]
      },
      // profile
      {
        path: '/planOptimization',
        name: 'planOptimization',
        component: RouteView,
        redirect: '/planOptimization/management',
        meta: { title: '生产计划优化', icon: 'iconyouhua', permission: [ 'profile' ] },
        children: [
          {
            path: '/planOptimization/monthData/monthBase',
            name: 'monthDataMonthBase',
            component: () => import('@/views/planOptimization/monthData/monthBase'),
            meta: { title: '月度基础数据', keepAlive: false },
            hideChildrenInMenu: true,
            children: [
              {
                path: 'tableConfig',
                name: 'month_tableConfig',
                component: () => import('@/views/planOptimization/monthData/tableConfig'),
                meta: { title: '月度-数据显示配置', keepAlive: false, permission: [ 'dashboard' ], hiddenHeaderContent: true }
              },
              {
                path: 'product',
                name: 'month_product',
                component: () => import('@/views/planOptimization/monthData/product'),
                meta: { title: '月度-产品表', keepAlive: true, permission: [ 'dashboard' ] }
              },
              {
                path: 'outsourcing',
                name: 'month_outsourcing',
                component: () => import('@/views/planOptimization/monthData/outsourcing'),
                meta: { title: '月度-外购表', keepAlive: true, permission: [ 'dashboard' ] }
              },
              {
                path: 'oilTable',
                name: 'month_oilTable',
                component: () => import('@/views/planOptimization/monthData/oilTable'),
                meta: { title: '月度-原油表', keepAlive: true, permission: [ 'dashboard' ] }
              },
              {
                path: 'DeviceCapabilities',
                name: 'month_DeviceCapabilities',
                component: () => import('@/views/planOptimization/monthData/DeviceCapabilities'),
                meta: { title: '月度-装置能力表', keepAlive: true, permission: [ 'dashboard' ] }
              }
            ]
          },
          {
            path: '/planOptimization/management',
            name: 'planOptimizationManagement',
            component: () => import('@/views/planOptimization/management'),
            meta: { title: '月度计划优化', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/planOptimization/shortData/shortBase',
            name: 'shortDataShortBase',
            component: () => import('@/views/planOptimization/shortData/shortBase'),
            meta: { title: '短周期基础数据', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] },
            hideChildrenInMenu: true,
            children: [
              {
                path: 'tableConfig',
                name: 'short_tableConfig',
                component: () => import('@/views/planOptimization/shortData/tableConfig'),
                meta: { title: '短周期-数据显示配置', keepAlive: false, permission: [ 'dashboard' ] }
              },
              {
                path: 'product',
                name: 'short_product',
                component: () => import('@/views/planOptimization/shortData/product'),
                meta: { title: '短周期-产品表', keepAlive: true, permission: [ 'dashboard' ] }
              },
              {
                path: 'outsourcing',
                name: 'short_outsourcing',
                component: () => import('@/views/planOptimization/shortData/outsourcing'),
                meta: { title: '短周期-外购表', permission: [ 'dashboard' ] }
              },
              {
                path: 'oilTable',
                name: 'short_oilTable',
                component: () => import('@/views/planOptimization/shortData/oilTable'),
                meta: { title: '短周期-原油表', permission: [ 'dashboard' ] }
              },
              {
                path: 'DeviceCapabilities',
                name: 'short_DeviceCapabilities',
                component: () => import('@/views/planOptimization/shortData/DeviceCapabilities'),
                meta: { title: '短周期-装置能力表', permission: [ 'dashboard' ] }
              },
              {
                path: 'InventoryTable',
                name: 'short_InventoryTable',
                component: () => import('@/views/planOptimization/shortData/Inventory'),
                meta: { title: '短周期-中间库存表', permission: [ 'dashboard' ] }
              }
            ]
          },
          {
            path: '/planOptimization/shortManagement',
            name: 'planOptimizationShortManagement',
            component: () => import('@/views/planOptimization/shortManagement'),
            meta: { title: '短周期计划优化', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // account
      {
        path: '/oilBenefit',
        component: RouteView,
        redirect: '/oilBenefit/calculation',
        name: 'oilBenefit',
        meta: { title: '原油切割测算', icon: 'iconmoxing', permission: [ 'user' ] },
        children: [
          {
            path: '/oilBenefit/calculation',
            name: 'oilBenefitCalculation',
            component: () => import('@/views/oilBenefit/calculation'),
            meta: { title: '原油效益测算', keepAlive: false, hiddenHeaderContent: true, permission: [ 'exception' ] }
          },
          {
            path: '/oilBenefit/result',
            name: 'oilBenefitResult',
            hidden: true,
            component: () => import('@/views/oilBenefit/result'),
            meta: { title: '原油效益测算结果', keepAlive: false, hiddenHeaderContent: true, permission: [ 'exception' ] }
          },
          {
            path: '/auxiliaryTool/applicationTool',
            name: 'applicationTool',
            component: () => import('@/views/auxiliaryTool/applicationTool'),
            meta: { title: '原油切割工具', keepAlive: false, hiddenHeaderContent: true, permission: [ 'exception' ] }
          }
        ]
      },

      // result
      {
        path: '/dataAnalysis',
        name: 'dataAnalysis',
        component: RouteView,
        redirect: '/dataAnalysis/programme',
        meta: { title: '数据分析报表', icon: 'iconfenxi', permission: [ 'result' ] },
        children: [
          {
            path: '/dataAnalysis/programme',
            name: 'AnalysisProgramme',
            component: () => import('@/views/dataAnalysis/programme'),
            meta: { title: '计划优化方案', hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/dataAnalysis/reportForm',
            name: 'ReportForm',
            component: () => import('@/views/dataAnalysis/reportForm'),
            meta: { title: '计划优化报表', hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      }

      // Exception
      // {
      //   path: '/auxiliaryTool',
      //   name: 'auxiliaryTool',
      //   component: RouteView,
      //   redirect: '/auxiliaryTool/applicationTool',
      //   meta: { title: '辅助应用工具', icon: 'iconlianhe6', permission: [ 'exception' ] },
      //   children: [
      //
      //   ]
      // }
    ]
  },
  {
    path: '/bossHome',
    name: 'bossHome',
    redirect: '/bossHome/valueOfOil/dashboard',
    component: bossHomeLayout,
    hidden: true,
    children: [
      {
        path: 'valueOfOil/dashboard',
        name: 'bossHome1',
        component: () => import('@/views/valueOfOil/dashboard'),
        meta: { title: '板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
      },
      {
        path: 'valueOfOil/refining',
        name: 'bossHome2',
        component: () => import('@/views/valueOfOil/dashboard2'),
        meta: { title: '炼油板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
      },
      {
        path: 'valueOfOil/chemical',
        name: 'bossHome3',
        component: () => import('@/views/valueOfOil/dashboard4'),
        meta: { title: '化工板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
      },
      {
        path: 'valueOfOil/plastic',
        name: 'bossHome4',
        component: () => import('@/views/valueOfOil/dashboard3'),
        meta: { title: '塑料板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
      },
      {
        path: 'valueOfOil/fiber',
        name: 'bossHome5',
        component: () => import('@/views/valueOfOil/dashboard5'),
        meta: { title: '纤维板块价值表征', keepAlive: false, hiddenHeaderContent: true, permission: [ 'dashboard' ] }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
