const options = [
  {
    id: 1,
    name: '一级 1',
    desc: '4',
    children: [
      {
        id: 4,
        name: '二级 1-1',
        children: [
          {
            id: 9,
            name: '三级 1-1-1',
            children: [
              {
                id: 115,
                name: '老王',
                type: 'user'
              },
              {
                id: 116,
                name: '老李',
                type: 'user'
              }
            ]
          },
          {
            id: 10,
            name: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '一级 2',
    children: [
      {
        id: 5,
        name: '二级 2-1'
      },
      {
        id: 6,
        name: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    name: '一级 3',
    children: [
      {
        id: 7,
        name: '二级 3-1'
      },
      {
        id: 8,
        name: '二级 3-2',
        children: [
          {
            id: 11,
            name: '三级 3-2-1',
            children: [
              {
                id: 117,
                name: '老k王',
                type: 'user'
              },
              {
                id: 115,
                name: '老王',
                type: 'user'
              }
            ]
          },
          {
            id: 12,
            name: '三级 3-2-2'
          },
          {
            id: 13,
            name: '三级 3-2-3'
          }
        ]
      }
    ]
  }
]
export default options
