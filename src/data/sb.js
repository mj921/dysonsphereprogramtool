export const defSb = {
  矩阵研究站: 0,
  制作台: 1,
  冶炼设备: 0,
  采矿机: 3,
  能量枢纽: 0,
  轨道采集器_氢: 1,
  轨道采集器_重氢: 1,
  轨道采集器_可燃冰: 1,
  化工厂: 0,
  原油精炼厂: 0,
  原油萃取站: 2,
  抽水机: 1,
  微型粒子对撞机: 0,
  射线接收站: 0,
  矿脉: 0.5,
  分馏塔: 0,
  传送带: 0,
  自定义传送带: 30
};

export const sbMap = {
  射线接收站: [
    {
      name: "射线接收站",
      speed: 1,
      power: 5
    }
  ],
  微型粒子对撞机: [
    {
      name: "微型粒子对撞机",
      speed: 1,
      power: 12
    }
  ],
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
  化工厂: [
    {
      name: "化工厂",
      speed: 1,
      power: 0.72
    }
  ],
  原油精炼厂: [
    {
      name: "原油精炼厂",
      speed: 1,
      power: 0.96
    }
  ],
  矩阵研究站: [
    {
      name: "矩阵研究站",
      speed: 1,
      power: 0.48
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
    }
  ],
  采矿机: {
    name: "采矿机",
    baseName: "采矿机",
    speed: 3,
    power: 0.42
  },
  矿脉: {
    name: "矿脉",
    baseName: "矿脉",
    speed: 0.5,
    power: 0.07
  },
  能量枢纽: [
    {
      name: "能量枢纽",
      speed: 0.5,
      power: 0
    }
  ],
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
  分馏塔: [
    {
      name: "分馏塔",
      speed: 1,
      power: 0.72
    }
  ],
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
  ]
};

export const getSbInfo = (name, cwName) => {
  const sbConfigStr = localStorage.getItem("sbConfig");
  let sbConfig = defSb;
  if (sbConfigStr) {
    try {
      sbConfig = { ...defSb, ...JSON.parse(sbConfigStr) };
    } catch (e) {
      console.log(e);
    }
  }
  const _name = name === "轨道采集器" ? `${name}_${cwName}` : name;
  const obj = sbMap[_name];
  if (obj instanceof Array) {
    return obj[+sbConfig[name]];
  } else {
    let power = obj.power;
    if (name === "矿脉") {
      power = sbMap["采矿机"].power / (sbConfig["采矿机"] / sbConfig["矿脉"]);
    }
    return {
      ...obj,
      name: `${obj.name}(${sbConfig[_name]}/s)`,
      speed: +sbConfig[_name],
      power
    };
  }
};
