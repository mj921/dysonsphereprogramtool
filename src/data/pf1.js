export default {
  宇宙矩阵: [
    {
      s: [{ name: "宇宙矩阵" }],
      q: [
        { name: "蓝矩阵", n: 1 },
        { name: "红矩阵", n: 1 },
        { name: "黄矩阵", n: 1 },
        { name: "紫矩阵", n: 1 },
        { name: "绿矩阵", n: 1 },
        { name: "反物质", n: 1 }
      ],
      t: 15,
      m: "矩阵研究站",
      group: "产品",
      chanliang: 1
    }
  ],
  铁矿: [{ s: [{ name: "铁矿" }], q: [], m: "采矿机", t: 1, chanliang: 1 }],
  铜矿: [{ s: [{ name: "铜矿" }], q: [], m: "采矿机", t: 1, chanliang: 1 }],
  煤矿: [{ s: [{ name: "煤矿" }], q: [], m: "采矿机", t: 1, chanliang: 1 }],
  石矿: [{ s: [{ name: "石矿" }], q: [], m: "采矿机", t: 1, chanliang: 1 }],
  钛石: [{ s: [{ name: "钛石" }], q: [], m: "采矿机", t: 1, chanliang: 1 }],
  原油: [{ s: [{ name: "原油" }], q: [], m: "原油萃取站", t: 1, chanliang: 1 }],
  水: [{ s: [{ name: "水" }], q: [], m: "抽水机", t: 1, chanliang: 1 }],
  硅石: [
    { s: [{ name: "硅石" }], q: [], m: "采矿机", t: 1, chanliang: 1 },
    {
      s: [{ name: "硅石" }],
      q: [{ name: "石矿", n: 10 }],
      m: "冶炼设备",
      t: 10,
      chanliang: 1
    }
  ],
  蓄电池满: [
    {
      s: [{ name: "蓄电池满" }],
      q: [{ name: "蓄电池" }],
      m: "能量枢纽",
      t: 1,
      chanliang: 1
    }
  ],
  蓝矩阵: [
    {
      s: [{ name: "蓝矩阵" }],
      q: [
        { name: "磁线圈", n: 1 },
        { name: "电路板", n: 1 }
      ],
      t: 3,
      m: "矩阵研究站",
      group: "产品",
      chanliang: 1
    }
  ],
  红矩阵: [
    {
      s: [{ name: "红矩阵" }],
      q: [
        { name: "高级石墨", n: 2 },
        { name: "氢", n: 2 }
      ],
      t: 6,
      m: "矩阵研究站",
      group: "产品",
      chanliang: 1
    }
  ],
  黄矩阵: [
    {
      s: [{ name: "黄矩阵" }],
      q: [
        { name: "金刚石", n: 1 },
        { name: "钛晶石", n: 1 }
      ],
      t: 8,
      m: "矩阵研究站",
      group: "产品",
      chanliang: 1
    }
  ],
  紫矩阵: [
    {
      s: [{ name: "紫矩阵" }],
      q: [
        { name: "处理器", n: 2 },
        { name: "粒子带宽", n: 1 }
      ],
      t: 10,
      m: "矩阵研究站",
      group: "产品",
      chanliang: 1
    }
  ],
  绿矩阵: [
    {
      s: [{ name: "绿矩阵", n: 2 }],
      q: [
        { name: "量子芯片", n: 1 },
        { name: "引力透镜", n: 1 }
      ],
      t: 24,
      m: "矩阵研究站",
      group: "产品",
      chanliang: 2
    }
  ],
  空间翘曲器: [
    {
      s: [{ name: "空间翘曲器", n: 8 }],
      group: "消耗品",
      m: "制作台",
      q: [{ name: "绿矩阵", n: 1 }],
      t: 10,
      chanliang: 8
    },
    {
      s: [{ name: "空间翘曲器", n: 1 }],
      group: "消耗品",
      m: "制作台",
      q: [{ name: "引力透镜", n: 1 }],
      t: 10,
      chanliang: 1
    }
  ],
  氘核燃料棒: [
    {
      s: [{ name: "氘核燃料棒", n: 1 }],
      group: "消耗品",
      m: "制作台",
      q: [
        { name: "钛合金", n: 1 },
        { name: "重氢", n: 10 },
        { name: "超级磁场环", n: 1 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  引力透镜: [
    {
      s: [{ name: "引力透镜", n: 1 }],
      group: "消耗品",
      m: "制作台",
      q: [
        { name: "金刚石", n: 4 },
        { name: "奇异物质", n: 1 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  铁块: [
    {
      s: [{ name: "铁块" }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "铁矿", n: 1 }],
      t: 1,
      base: true,
      chanliang: 1
    }
  ],
  钢材: [
    {
      s: [{ name: "钢材" }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "铁块", n: 3 }],
      t: 3,
      chanliang: 1
    }
  ],
  钛块: [
    {
      s: [{ name: "钛块" }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "钛石", n: 2 }],
      t: 2,
      base: true,
      chanliang: 1
    }
  ],
  铜块: [
    {
      s: [{ name: "铜块" }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "铜矿", n: 1 }],
      t: 1,
      base: true,
      chanliang: 1
    }
  ],
  磁铁: [
    {
      s: [{ name: "磁铁" }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "铁矿", n: 1 }],
      t: 1.5,
      base: true,
      chanliang: 1
    }
  ],
  磁线圈: [
    {
      s: [{ name: "磁线圈", n: 2 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "磁铁", n: 2 },
        { name: "铜块", n: 1 }
      ],
      t: 1,
      chanliang: 2
    }
  ],
  电路板: [
    {
      s: [{ name: "电路板", n: 2 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 2 },
        { name: "铜块", n: 1 }
      ],
      t: 1,
      chanliang: 2
    }
  ],
  齿轮: [
    {
      s: [{ name: "齿轮" }],
      group: "组件",
      m: "制作台",
      q: [{ name: "铁块", n: 1 }],
      t: 1,
      chanliang: 1
    }
  ],
  高级石墨: [
    {
      s: [{ name: "高级石墨" }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "煤矿", n: 2 }],
      t: 2,
      base: true,
      chanliang: 1
    },
    {
      s: [
        { name: "氢", n: 3 },
        { name: "高级石墨", n: 1 }
      ],
      group: "组件",
      m: "原油精炼厂",
      q: [
        { name: "氢", n: 2 },
        { name: "精炼油", n: 1 }
      ],
      t: 4,
      chanliang: 3
    }
  ],
  重氢: [
    {
      s: [{ name: "重氢" }],
      group: "组件",
      m: "轨道采集器",
      q: [],
      t: 1,
      chanliang: 1
    },
    {
      s: [{ name: "重氢", n: 5 }],
      group: "组件",
      m: "微型粒子对撞机",
      q: [{ name: "氢", n: 10 }],
      t: 5,
      chanliang: 5
    },
    {
      s: [
        { name: "重氢", n: 0.01 },
        { name: "氢", n: 0.99 }
      ],
      group: "组件",
      m: "分馏塔",
      q: [{ name: "氢", n: 1 }],
      t: 1,
      chanliang: 0.01
    }
  ],
  氢: [
    {
      s: [{ name: "氢" }],
      group: "组件",
      m: "轨道采集器",
      q: [],
      t: 1,
      chanliang: 1
    },
    {
      s: [{ name: "氢" }],
      group: "组件",
      m: "轨道采集器",
      q: [],
      t: 1,
      chanliang: 1
    },
    {
      s: [{ name: "氢" }, { name: "精炼油", n: 2 }],
      group: "组件",
      m: "原油精炼厂",
      q: [{ name: "原油", n: 2 }],
      t: 4,
      chanliang: 1
    },
    {
      s: [
        { name: "氢", n: 1 },
        { name: "石墨烯", n: 2 }
      ],
      group: "组件",
      m: "化工厂",
      q: [{ name: "可燃冰", n: 2 }],
      t: 2,
      chanliang: 1
    },
    {
      s: [
        { name: "反物质", n: 2 },
        { name: "氢", n: 2 }
      ],
      group: "组件",
      m: "微型粒子对撞机",
      q: [{ name: "临界光子", n: 2 }],
      t: 2,
      chanliang: 2
    },
    {
      s: [
        { name: "氢", n: 3 },
        { name: "高级石墨", n: 1 }
      ],
      group: "组件",
      m: "原油精炼厂",
      q: [
        { name: "氢", n: 2 },
        { name: "精炼油", n: 1 }
      ],
      t: 4,
      chanliang: 3
    },
    {
      s: [
        { name: "重氢", n: 0.01 },
        { name: "氢", n: 0.99 }
      ],
      group: "组件",
      m: "分馏塔",
      q: [{ name: "氢", n: 1 }],
      t: 1,
      chanliang: 0.01
    }
  ],
  精炼油: [
    {
      s: [{ name: "氢" }, { name: "精炼油", n: 2 }],
      group: "组件",
      m: "原油精炼厂",
      q: [{ name: "原油", n: 2 }],
      t: 4,
      chanliang: 1
    }
  ],
  石墨烯: [
    {
      s: [
        { name: "氢", n: 1 },
        { name: "石墨烯", n: 2 }
      ],
      group: "组件",
      m: "化工厂",
      q: [{ name: "可燃冰", n: 2 }],
      t: 2,
      chanliang: 1
    },
    {
      s: [{ name: "石墨烯", n: 2 }],
      group: "组件",
      m: "化工厂",
      q: [
        { name: "硫酸", n: 1 },
        { name: "高级石墨", n: 3 }
      ],
      t: 3,
      chanliang: 2
    }
  ],
  可燃冰: [
    {
      s: [{ name: "可燃冰" }],
      group: "组件",
      m: "轨道采集器",
      q: [],
      t: 1,
      chanliang: 1
    },
    {
      s: [{ name: "可燃冰" }],
      group: "组件",
      m: "采矿机",
      q: [],
      t: 1,
      chanliang: 1
    }
  ],
  刺笋结晶: [
    {
      s: [{ name: "刺笋结晶" }],
      group: "组件",
      m: "采矿机",
      q: [],
      t: 1,
      chanliang: 1
    }
  ],
  玻璃: [
    {
      s: [{ name: "玻璃", n: 1 }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "石矿", n: 2 }],
      t: 2,
      base: true,
      chanliang: 1
    }
  ],
  棱镜: [
    {
      s: [{ name: "棱镜", n: 2 }],
      group: "组件",
      m: "制作台",
      q: [{ name: "玻璃", n: 3 }],
      t: 2,
      chanliang: 2
    }
  ],
  高纯硅块: [
    {
      s: [{ name: "高纯硅块", n: 1 }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "硅石", n: 2 }],
      t: 2,
      chanliang: 1
    }
  ],
  微晶元件: [
    {
      s: [{ name: "微晶元件", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "高纯硅块", n: 2 },
        { name: "铜块", n: 1 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  处理器: [
    {
      s: [{ name: "处理器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "电路板", n: 2 },
        { name: "微晶元件", n: 2 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  金刚石: [
    {
      s: [{ name: "金刚石", n: 1 }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "高级石墨", n: 1 }],
      t: 2,
      chanliang: 1
    },
    {
      s: [{ name: "金刚石", n: 1 }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "金伯利矿石", n: 1 }],
      t: 2,
      chanliang: 1
    }
  ],
  塑料: [
    {
      s: [{ name: "塑料", n: 1 }],
      group: "组件",
      m: "化工厂",
      q: [
        { name: "精炼油", n: 2 },
        { name: "高级石墨", n: 1 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  有机晶体: [
    {
      s: [{ name: "有机晶体", n: 1 }],
      group: "组件",
      m: "化工厂",
      q: [
        { name: "塑料", n: 2 },
        { name: "精炼油", n: 1 },
        { name: "水", n: 1 }
      ],
      t: 6,
      chanliang: 1
    },
    {
      s: [{ name: "有机晶体" }],
      group: "组件",
      m: "采矿机",
      q: [],
      t: 1,
      chanliang: 1
    }
  ],
  钛晶石: [
    {
      s: [{ name: "钛晶石", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "有机晶体", n: 1 },
        { name: "钛块", n: 3 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  晶格硅: [
    {
      s: [{ name: "晶格硅", n: 1 }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "高纯硅块", n: 1 }],
      t: 2,
      chanliang: 1
    },
    {
      s: [{ name: "晶格硅", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [{ name: "分形硅石", n: 1 }],
      t: 4,
      chanliang: 1
    }
  ],
  石材: [
    {
      s: [{ name: "石材", n: 1 }],
      group: "组件",
      m: "冶炼设备",
      q: [{ name: "石矿", n: 1 }],
      t: 1,
      base: true,
      chanliang: 1
    }
  ],
  电动机: [
    {
      s: [{ name: "电动机", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 2 },
        { name: "齿轮", n: 1 },
        { name: "磁线圈", n: 1 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  电磁涡轮: [
    {
      s: [{ name: "电磁涡轮", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "电动机", n: 2 },
        { name: "磁线圈", n: 2 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  硫酸: [
    {
      s: [{ name: "硫酸", n: 4 }],
      group: "组件",
      m: "化工厂",
      q: [
        { name: "精炼油", n: 6 },
        { name: "石矿", n: 8 },
        { name: "水", n: 4 }
      ],
      t: 6,
      chanliang: 4
    },
    {
      s: [{ name: "硫酸", n: 1 }],
      group: "组件",
      m: "抽水机",
      q: [],
      t: 1,
      chanliang: 1
    }
  ],
  碳纳米管: [
    {
      s: [{ name: "碳纳米管", n: 2 }],
      group: "组件",
      m: "化工厂",
      q: [
        { name: "石墨烯", n: 3 },
        { name: "钛块", n: 1 }
      ],
      t: 4,
      chanliang: 2
    },
    {
      s: [{ name: "碳纳米管", n: 2 }],
      group: "组件",
      m: "化工厂",
      q: [{ name: "刺笋结晶", n: 2 }],
      t: 4,
      chanliang: 2
    }
  ],
  粒子带宽: [
    {
      s: [{ name: "粒子带宽", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "碳纳米管", n: 2 },
        { name: "晶格硅", n: 2 },
        { name: "塑料", n: 1 }
      ],
      t: 8,
      chanliang: 1
    }
  ],
  钛化玻璃: [
    {
      s: [{ name: "钛化玻璃", n: 2 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "玻璃", n: 2 },
        { name: "钛块", n: 2 },
        { name: "水", n: 2 }
      ],
      t: 5,
      chanliang: 2
    }
  ],
  卡西米尔晶片: [
    {
      s: [{ name: "卡西米尔晶片", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "钛晶石", n: 1 },
        { name: "石墨烯", n: 2 },
        { name: "氢", n: 12 }
      ],
      t: 4,
      chanliang: 1
    },
    {
      s: [{ name: "卡西米尔晶片", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "光栅石", n: 6 },
        { name: "石墨烯", n: 2 },
        { name: "氢", n: 12 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  位面过滤器: [
    {
      s: [{ name: "位面过滤器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "卡西米尔晶片", n: 1 },
        { name: "钛化玻璃", n: 2 }
      ],
      t: 12,
      chanliang: 1
    }
  ],
  量子芯片: [
    {
      s: [{ name: "量子芯片", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "处理器", n: 2 },
        { name: "位面过滤器", n: 2 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  粒子容器: [
    {
      s: [{ name: "粒子容器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "电磁涡轮", n: 2 },
        { name: "铜块", n: 2 },
        { name: "石墨烯", n: 2 }
      ],
      t: 4,
      chanliang: 1
    },
    {
      s: [{ name: "粒子容器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "单极磁石", n: 10 },
        { name: "铜块", n: 2 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  奇异物质: [
    {
      s: [{ name: "奇异物质", n: 1 }],
      group: "组件",
      m: "微型粒子对撞机",
      q: [
        { name: "粒子容器", n: 2 },
        { name: "铁块", n: 2 },
        { name: "重氢", n: 10 }
      ],
      t: 8,
      chanliang: 1
    }
  ],
  临界光子: [
    {
      s: [{ name: "临界光子", n: 1 }],
      group: "组件",
      m: "射线接收站",
      q: [],
      t: 12,
      chanliang: 1
    },
    {
      s: [{ name: "临界光子", n: 1 }],
      group: "组件",
      m: "射线接收站",
      q: [{ name: "引力透镜", n: 0.025 }],
      t: 6,
      chanliang: 1
    }
  ],
  反物质: [
    {
      s: [
        { name: "反物质", n: 2 },
        { name: "氢", n: 2 }
      ],
      group: "组件",
      m: "微型粒子对撞机",
      q: [{ name: "临界光子", n: 2 }],
      t: 2,
      chanliang: 2
    }
  ],
  超级磁场环: [
    {
      s: [{ name: "超级磁场环", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "电磁涡轮", n: 2 },
        { name: "磁铁", n: 3 },
        { name: "高级石墨", n: 1 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  钛合金: [
    {
      s: [{ name: "钛合金", n: 4 }],
      group: "组件",
      m: "冶炼设备",
      q: [
        { name: "钛块", n: 4 },
        { name: "钢材", n: 4 },
        { name: "硫酸", n: 8 }
      ],
      t: 12,
      chanliang: 4
    }
  ],
  电浆激发器: [
    {
      s: [{ name: "电浆激发器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "磁线圈", n: 4 },
        { name: "棱镜", n: 2 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  框架材料: [
    {
      s: [{ name: "框架材料", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "碳纳米管", n: 4 },
        { name: "钛合金", n: 1 },
        { name: "高纯硅块", n: 1 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  光子合并器: [
    {
      s: [{ name: "光子合并器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "棱镜", n: 2 },
        { name: "电路板", n: 1 }
      ],
      t: 3,
      chanliang: 1
    },
    {
      s: [{ name: "光子合并器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "光栅石", n: 1 },
        { name: "电路板", n: 1 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  太阳帆: [
    {
      s: [{ name: "太阳帆", n: 2 }],
      group: "消耗品",
      m: "制作台",
      q: [
        { name: "石墨烯", n: 1 },
        { name: "光子合并器", n: 1 }
      ],
      t: 4,
      chanliang: 2
    }
  ],
  戴森球组件: [
    {
      s: [{ name: "戴森球组件", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "框架材料", n: 3 },
        { name: "太阳帆", n: 3 },
        { name: "处理器", n: 3 }
      ],
      t: 8,
      chanliang: 1
    }
  ],
  小型运载火箭: [
    {
      s: [{ name: "小型运载火箭", n: 1 }],
      group: "消耗品",
      m: "制作台",
      q: [
        { name: "戴森球组件", n: 2 },
        { name: "氘核燃料棒", n: 2 },
        { name: "量子芯片", n: 2 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  光栅石: [{ s: [{ name: "光栅石" }], q: [], m: "采矿机", t: 1, chanliang: 1 }],
  单极磁石: [
    { s: [{ name: "单极磁石" }], q: [], m: "采矿机", t: 1, chanliang: 1 }
  ],
  金伯利矿石: [
    { s: [{ name: "金伯利矿石" }], q: [], m: "采矿机", t: 1, chanliang: 1 }
  ],
  分形硅石: [
    { s: [{ name: "分形硅石" }], q: [], m: "采矿机", t: 1, chanliang: 1 }
  ],
  地基: [
    {
      s: [{ name: "地基", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "石材", n: 3 },
        { name: "钢材", n: 1 }
      ],
      t: 1,
      chanliang: 1
    }
  ],
  液氢燃料棒: [
    {
      s: [{ name: "液氢燃料棒", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "钛块", n: 1 },
        { name: "氢", n: 5 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  电力感应塔: [
    {
      s: [{ name: "电力感应塔", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 2 },
        { name: "磁线圈", n: 1 }
      ],
      t: 1,
      chanliang: 1
    }
  ],
  无线输电塔: [
    {
      s: [{ name: "无线输电塔", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "电力感应塔", n: 1 },
        { name: "电浆激发器", n: 3 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  卫星配电站: [
    {
      s: [{ name: "卫星配电站", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "无线输电塔", n: 1 },
        { name: "超级磁场环", n: 10 },
        { name: "框架材料", n: 2 }
      ],
      t: 5,
      chanliang: 1
    }
  ],
  风力涡轮机: [
    {
      s: [{ name: "风力涡轮机", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 6 },
        { name: "齿轮", n: 1 },
        { name: "磁线圈", n: 3 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  火力发电机: [
    {
      s: [{ name: "火力发电机", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 10 },
        { name: "石材", n: 4 },
        { name: "齿轮", n: 4 },
        { name: "磁线圈", n: 4 }
      ],
      t: 5,
      chanliang: 1
    }
  ],
  传送带: [
    {
      s: [{ name: "传送带", n: 3 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 2 },
        { name: "齿轮", n: 1 }
      ],
      t: 1,
      chanliang: 3
    }
  ],
  高速传送带: [
    {
      s: [{ name: "高速传送带", n: 3 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "传送带", n: 3 },
        { name: "电磁涡轮", n: 1 }
      ],
      t: 1,
      chanliang: 3
    }
  ],
  极速传送带: [
    {
      s: [{ name: "极速传送带", n: 3 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "高速传送带", n: 3 },
        { name: "超级磁场环", n: 1 },
        { name: "石墨烯", n: 1 }
      ],
      t: 1,
      chanliang: 3
    }
  ],
  小型储物仓: [
    {
      s: [{ name: "小型储物仓", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 4 },
        { name: "石材", n: 4 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  大型储物仓: [
    {
      s: [{ name: "大型储物仓", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "钢材", n: 8 },
        { name: "石材", n: 8 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  太阳能板: [
    {
      s: [{ name: "太阳能板", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "高纯硅块", n: 6 },
        { name: "铜块", n: 6 },
        { name: "电路板", n: 4 }
      ],
      t: 5,
      chanliang: 1
    }
  ],
  蓄电池: [
    {
      s: [{ name: "蓄电池", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 6 },
        { name: "超级磁场环", n: 6 },
        { name: "晶格硅", n: 4 }
      ],
      t: 5,
      chanliang: 1
    }
  ],
  射线接收站: [
    {
      s: [{ name: "射线接收站", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 20 },
        { name: "高纯硅块", n: 20 },
        { name: "光子合并器", n: 10 },
        { name: "处理器", n: 5 },
        { name: "超级磁场环", n: 20 }
      ],
      t: 8,
      chanliang: 1
    }
  ],
  微型聚变发电站: [
    {
      s: [{ name: "微型聚变发电站", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钛合金", n: 12 },
        { name: "超级磁场环", n: 10 },
        { name: "碳纳米管", n: 8 },
        { name: "处理器", n: 4 }
      ],
      t: 10,
      chanliang: 1
    }
  ],
  能量枢纽: [
    {
      s: [{ name: "能量枢纽", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 40 },
        { name: "钛合金", n: 40 },
        { name: "处理器", n: 40 },
        { name: "粒子容器", n: 8 }
      ],
      t: 15,
      chanliang: 1
    }
  ],
  储液灌: [
    {
      s: [{ name: "储液灌", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 8 },
        { name: "石材", n: 4 },
        { name: "玻璃", n: 4 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  分拣器: [
    {
      s: [{ name: "分拣器" }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 1 },
        { name: "电路板", n: 1 }
      ],
      t: 1,
      chanliang: 1
    }
  ],
  高速分拣器: [
    {
      s: [{ name: "高速分拣器", n: 2 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "分拣器", n: 2 },
        { name: "电动机", n: 1 }
      ],
      t: 1,
      chanliang: 2
    }
  ],
  极速分拣器: [
    {
      s: [{ name: "极速分拣器", n: 2 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "高速分拣器", n: 2 },
        { name: "电磁涡轮", n: 1 }
      ],
      t: 1,
      chanliang: 2
    }
  ],
  采矿机: [
    {
      s: [{ name: "采矿机", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 4 },
        { name: "电路板", n: 2 },
        { name: "磁线圈", n: 2 },
        { name: "齿轮", n: 2 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  抽水机: [
    {
      s: [{ name: "抽水机", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 8 },
        { name: "石材", n: 4 },
        { name: "电动机", n: 4 },
        { name: "电路板", n: 2 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  原油萃取站: [
    {
      s: [{ name: "原油萃取站", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "钢材", n: 12 },
        { name: "石材", n: 12 },
        { name: "电路板", n: 6 },
        { name: "电浆激发器", n: 4 }
      ],
      t: 8,
      chanliang: 1
    }
  ],
  原油精炼厂: [
    {
      s: [{ name: "原油精炼厂", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "钢材", n: 10 },
        { name: "石材", n: 10 },
        { name: "电路板", n: 6 },
        { name: "电浆激发器", n: 6 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  垂直发射井: [
    {
      s: [{ name: "垂直发射井", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "钛合金", n: 80 },
        { name: "框架材料", n: 30 },
        { name: "引力透镜", n: 20 },
        { name: "量子芯片", n: 10 }
      ],
      t: 30,
      chanliang: 1
    }
  ],
  四向分流器: [
    {
      s: [{ name: "四向分流器", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "铁块", n: 3 },
        { name: "齿轮", n: 2 },
        { name: "电路板", n: 1 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  "制作台Mk.Ⅰ": [
    {
      s: [{ name: "制作台Mk.Ⅰ", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 4 },
        { name: "齿轮", n: 8 },
        { name: "电路板", n: 4 }
      ],
      t: 2,
      chanliang: 1
    }
  ],
  "制作台Mk.Ⅱ": [
    {
      s: [{ name: "制作台Mk.Ⅱ", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "制作台Mk.Ⅰ", n: 1 },
        { name: "石墨烯", n: 8 },
        { name: "处理器", n: 4 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  "制作台Mk.Ⅲ": [
    {
      s: [{ name: "制作台Mk.Ⅲ", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "制作台Mk.Ⅱ", n: 1 },
        { name: "粒子带宽", n: 8 },
        { name: "量子芯片", n: 2 }
      ],
      t: 4,
      chanliang: 1
    },
    {
      s: [{ name: "制作台Mk.Ⅲ", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "制作台Mk.Ⅱ", n: 1 },
        { name: "粒子带宽", n: 8 },
        { name: "量子芯片", n: 2 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  电弧熔炉: [
    {
      s: [{ name: "电弧熔炉", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 4 },
        { name: "石材", n: 2 },
        { name: "电路板", n: 4 },
        { name: "磁线圈", n: 2 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  分馏塔: [
    {
      s: [{ name: "分馏塔", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 8 },
        { name: "石材", n: 4 },
        { name: "玻璃", n: 4 },
        { name: "处理器", n: 1 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  化工厂: [
    {
      s: [{ name: "化工厂", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 8 },
        { name: "石材", n: 8 },
        { name: "玻璃", n: 8 },
        { name: "电路板", n: 2 }
      ],
      t: 5,
      chanliang: 1
    }
  ],
  矩阵矩阵研究站: [
    {
      s: [{ name: "矩阵矩阵研究站", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 8 },
        { name: "玻璃", n: 4 },
        { name: "电路板", n: 4 },
        { name: "磁线圈", n: 4 }
      ],
      t: 3,
      chanliang: 1
    }
  ],
  电磁轨道弹射器: [
    {
      s: [{ name: "电磁轨道弹射器", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 20 },
        { name: "齿轮", n: 20 },
        { name: "处理器", n: 5 },
        { name: "超级磁场环", n: 10 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  行星内物流运输站: [
    {
      s: [{ name: "行星内物流运输站", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 40 },
        { name: "钛块", n: 40 },
        { name: "处理器", n: 40 },
        { name: "粒子容器", n: 20 }
      ],
      t: 20,
      chanliang: 1
    }
  ],
  微型微型粒子对撞机: [
    {
      s: [{ name: "微型微型粒子对撞机", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钛合金", n: 20 },
        { name: "框架材料", n: 20 },
        { name: "超级磁场环", n: 50 },
        { name: "石墨烯", n: 10 },
        { name: "处理器", n: 8 }
      ],
      t: 15,
      chanliang: 1
    }
  ],
  星际物流运输站: [
    {
      s: [{ name: "星际物流运输站", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "行星内物流运输站", n: 1 },
        { name: "钛合金", n: 40 },
        { name: "粒子容器", n: 20 }
      ],
      t: 30,
      chanliang: 1
    }
  ],
  加力推进器: [
    {
      s: [{ name: "加力推进器", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钛合金", n: 5 },
        { name: "电磁涡轮", n: 5 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  轨道采集器: [
    {
      s: [{ name: "轨道采集器", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "星际物流运输站", n: 1 },
        { name: "超级磁场环", n: 50 },
        { name: "加力推进器", n: 20 },
        { name: "蓄电池满", n: 20 }
      ],
      t: 30,
      chanliang: 1
    }
  ],
  推进器: [
    {
      s: [{ name: "推进器", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钢材", n: 2 },
        { name: "铜块", n: 3 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  物流运输机: [
    {
      s: [{ name: "物流运输机", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "铁块", n: 5 },
        { name: "处理器", n: 2 },
        { name: "推进器", n: 2 }
      ],
      t: 4,
      chanliang: 1
    }
  ],
  星际物流运输机: [
    {
      s: [{ name: "星际物流运输机", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钛合金", n: 10 },
        { name: "处理器", n: 10 },
        { name: "加力推进器", n: 2 }
      ],
      t: 6,
      chanliang: 1
    }
  ],
  湮灭约束球: [
    {
      s: [{ name: "湮灭约束球", n: 1 }],
      group: "组件",
      m: "制作台",
      q: [
        { name: "粒子容器", n: 1 },
        { name: "处理器", n: 1 }
      ],
      t: 20,
      chanliang: 1
    }
  ],
  反物质燃烧棒: [
    {
      s: [{ name: "反物质燃烧棒", n: 1 }],
      group: "消耗品",
      m: "制作台",
      q: [
        { name: "反物质", n: 10 },
        { name: "氢", n: 10 },
        { name: "湮灭约束球", n: 1 },
        { name: "钛合金", n: 1 }
      ],
      t: 12,
      chanliang: 1
    }
  ],
  人造恒星: [
    {
      s: [{ name: "人造恒星", n: 1 }],
      group: "建筑",
      m: "制作台",
      q: [
        { name: "钛合金", n: 20 },
        { name: "框架材料", n: 20 },
        { name: "湮灭约束球", n: 10 },
        { name: "量子芯片", n: 10 }
      ],
      t: 30,
      chanliang: 1
    }
  ]
};
