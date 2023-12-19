export const factorydefault = {
  storagesetting:"dsp-setting",
  storageformula:"dsp-formula",
  storagesprayed:"dsp-sprayed",
  传送带: 0,
  冶炼设备: 0,
  制作台: 1,
  化工厂: 0,
  矩阵研究站: 0,
  增产剂: 0,
  自定义传送带: 30,
  采矿机: 3,
  大型采矿机: 6,
  矿脉: 0.5,
  轨道采集器_氢: 1,
  轨道采集器_重氢: 1,
  轨道采集器_可燃冰: 1,
  抽水机: 1,
  原油萃取站: 2,
  射线接收站: 0,
  分馏塔: 0,
  原油精炼厂: 0,
  微型粒子对撞机: 0,
  能量枢纽: 0,
  黑雾残骸: 0
};

export const factoryparams = {
  传送带: [
    {
      name: "传送带",
      speed: 6
    },
    {
      name: "高速传送带",
      speed: 12
    },
    {
      name: "极速传送带",
      speed: 30
    },
    {
      name: "自定义",
      speed: 30
    }
  ],
  冶炼设备: [
    {
      name: "电弧熔炉",
      speed: 1,
      power: 0.36
    },
    {
      name: "位面熔炉",
      speed: 2,
      power: 1.44
    },
    {
      name: "负熵熔炉",
      speed: 3,
      power: 2.88
    }
  ],
  制作台: [
    {
      name: "制作台Mk.Ⅰ",
      speed: 0.75,
      power: 0.27
    },
    {
      name: "制作台Mk.Ⅱ",
      speed: 1,
      power: 0.54
    },
    {
      name: "制作台Mk.Ⅲ",
      speed: 1.5,
      power: 1.08
    },
    {
      name: "重组式制作台",
      speed: 3,
      power: 2.7
    }
  ],
  化工厂: [
    {
      name: "化工厂",
      speed: 1,
      power: 0.72
    },
    {
      name: "量子化工厂",
      speed: 2,
      power: 2.16
    }
  ],
  矩阵研究站: [
    {
      name: "矩阵研究站",
      speed: 1,
      power: 0.48
    },
    {
      name: "自演化研究站",
      speed: 3,
      power: 1.92
    }
  ],
  增产剂: [
    // 自喷涂 count = count * extra -1
    {
      name: "无",
      energy: 1,
      speedup: 1,
      extra: 1,
      count: 0
    },
    {
      name: "增产剂Mk.Ⅰ",
      energy: 1.3,
      speedup: 1.25,
      extra: 1.125,
      count: 12.5
    },
    {
      name: "增产剂Mk.Ⅱ",
      energy: 1.7,
      speedup: 1.5,
      extra: 1.2,
      count: 27.8
    },
    {
      name: "增产剂Mk.Ⅲ",
      energy: 2.5,
      speedup: 2,
      extra: 1.25,
      count: 74
    }
  ],
  采矿机: {
    name: "采矿机",
    baseName: "采矿机",
    speed: 3,
    power: 0.42
  },
  大型采矿机: {
    name: "大型采矿机",
    baseName: "大型采矿机",
    speed: 6,
    power: 2.94
  },
  矿脉: {
    name: "矿脉",
    baseName: "矿脉",
    speed: 0.5,
    power: 0.07
  },
  轨道采集器_氢: {
    name: "轨道采集器",
    baseName: "轨道采集器",
    speed: 1,
    power: 0
  },
  轨道采集器_重氢: {
    name: "轨道采集器",
    baseName: "轨道采集器",
    speed: 1,
    power: 0
  },
  轨道采集器_可燃冰: {
    name: "轨道采集器",
    baseName: "轨道采集器",
    speed: 1,
    power: 0
  },
  抽水机: {
    name: "抽水机",
    baseName: "抽水机",
    speed: 1,
    power: 0.3
  },
  原油萃取站: {
    name: "原油萃取站",
    baseName: "原油萃取站",
    speed: 2,
    power: 0.84
  },
  射线接收站: [
    {
      name: "射线接收站",
      speed: 1,
      power: 0
    }
  ],
  分馏塔: {
    name: "分馏塔",
    baseName: "分馏塔",
    speed: 1,
    power: 0.72
  },
  原油精炼厂: [
    {
      name: "原油精炼厂",
      speed: 1,
      power: 0.96
    }
  ],
  微型粒子对撞机: [
    {
      name: "微型粒子对撞机",
      speed: 1,
      power: 12
    }
  ],
  能量枢纽: [
    {
      name: "能量枢纽",
      speed: 1,
      power: 0
    }
  ],
  黑雾残骸: [
    {
      name: "黑雾残骸",
      speed: 1,
      power: 0
    }
  ]
};
export const loadConfig =  (key, val)=> {
      let config = val;
      const str = localStorage.getItem(key);
      if (str) {
        try {
          config = { ...config, ...JSON.parse(str) };
        } catch (e) {
          console.log(e);
        }
      }
      return config;
    };