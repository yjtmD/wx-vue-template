var WXCONF = {
  sysName: '常用公共组件库',
  apiHost: 'http://localhost:3000/api/',
  mapConfig: {
    center: [109.1090890344, 21.4412820717],
    zoom: 18,
    minZoom: 3,
    maxZoom: 18
  },
  menu: [
    {
      id: '1000001',
      name: '首页',
      pathName: 'index',
      children: []
    },
    {
      id: '1000002',
      name: '视频与树',
      children: [
        {
          id: '100000201',
          pathName: '/video/realMonitor',
          name: '九宫格实时视频'
        }
      ]
    },
    {
      id: '1000003',
      name: '文字输入',
      pathName: '/input/index',
      children: []
    },
    {
      id: '1000004',
      name: '选择列表',
      pathName: '/select/index',
      children: []
    }
  ]
}
