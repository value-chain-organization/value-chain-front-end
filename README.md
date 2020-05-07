##炼化一体化

##UI 蓝湖

https://lanhuapp.com/web/#/item/project/board?pid=52737e63-6fb2-49a5-9d81-2da609a8bc4a&teamId=48853353-2626-4dc8-bfde-ee41e443e97b


##nodejs环境搭建
 官网下载安装文件 https://nodejs.org/en/ 选择推荐版本下载即可
 
##工程目录说明
  + `/config` : 编译插件配置(基本不用修改) 
  + `/public` : 静态资源目录，图片、字体文件、第三方非npm依赖等
  + `/src` : 业务代码目录
    - `/api` : 接口访问配置
    - `/components` : 封装的功能组件
    - `/config` : 应用配置内容
      - `defaultSettings.js` : 项目基本配置
      - `graphSettings.js` : 组态链接配置 当前模式下只有name（名称）、group（分组）、gid（组态对应设备id）会使用到
      - `router.config.js` : 页面路由配置，参考vue-router的配置
      - `trendSettings.js` : 趋势图链接配置
    - `/utils` : 工具类
    - `/views` : 业务组件目录（一个文件夹对应一个模块）
    - 其他 都为vue基本文件，一般业务修改不会修改到，深入了解可以访问[vue.js](https://cn.vuejs.org/)
  + `vue.config.js`:工程调试及打包相关配置信息，配置参数可以参考[webpack](https://www.webpackjs.com/concepts/)
    - 可能需要修改的地方是`devServer`配置
      - `port` : 本地起的调试服务的端口
      - `proxy` : api接口的代理配置 key 值是匹配接口前缀，target 是需要转发到的接口地址
        - `/huali-api` : 华理后台服务的接口地址基址
        - `/huali` : 组态后台服务的接口地址基址
  

##安装依赖
命令行到`huali-app-fe`目录下运行命令

```
npm install 
```

##启动调试

运行命令
```
npm start
```
浏览器打开 `http://localhost:8080/`

  + 调试后端代理接口地址修改
  修改根目录下`vue.config.js`配置文件中的`devServer`节点信息
  
    - `/huali-api`：华理后端反向代理地址
    - `/huali`：组态后端地址
    - `target`：需要修改的地址属性



##打包构建

运行命令
```
npm run build
```
 + 构建后的生成的代码会自动保存到`dist`目录下
 ///





