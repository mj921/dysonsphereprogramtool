export const factorydefault = {
  program: "dsp-program",
  setting: "dsp-setting",
  product: "dsp-product",
  传送带: 0,
  采矿设备: 0,
  冶炼设备: 0,
  制作台: 1,
  化工厂: 0,
  矩阵研究站: 0,
  增产剂: 0,
  原油精炼厂: 0,
  能量枢纽: 0,
  微型粒子对撞机: 0,
  射线接收站: 0,
  黑雾残骸: 0,
  能量散失: 70,
  采矿速度: 100,
  自定义传送带: 30,
  矿脉: 0.5,
  采矿机: 6,
  大型采矿机: 12,
  气巨采集器: 0.5993589743589743,
  气巨采集器_氢: 1,
  气巨采集器_重氢: 0.04,
  冰巨采集器: 0.4266055045871559,
  冰巨采集器_氢: 0.3,
  冰巨采集器_可燃冰: 0.8,
  抽水机: 50 / 60,
  原油萃取站: 2,
  分馏塔: "传送带速度"
};

export const factoryparams = {
  传送带: [
    {
      name: "传送带",
      title: "速度 6/s",
      speed: 6
    },
    {
      name: "高速传送带",
      title: "速度 12/s",
      speed: 12
    },
    {
      name: "极速传送带",
      title: "速度 30/s",
      speed: 30
    },
    {
      name: "自定义",
      title: "自定义传送带速度",
      speed: 30
    }
  ],
  采矿设备: [
    {
      name: "无",
      title: "不自动采集矿脉"
    },
    {
      name: "采矿机",
      title: "工作效率 100%"
    },
    {
      name: "大型采矿机",
      title: "工作效率 200%"
    }
  ],
  冶炼设备: [
    {
      name: "电弧熔炉",
      title: "工作效率 100%",
      speed: 1,
      power: 0.36
    },
    {
      name: "位面熔炉",
      title: "工作效率 200%",
      speed: 2,
      power: 1.44
    },
    {
      name: "负熵熔炉",
      title: "工作效率 300%",
      speed: 3,
      power: 2.88
    }
  ],
  制作台: [
    {
      name: "制作台Mk.Ⅰ",
      title: "工作效率 75%",
      speed: 0.75,
      power: 0.27
    },
    {
      name: "制作台Mk.Ⅱ",
      title: "工作效率 100%",
      speed: 1,
      power: 0.54
    },
    {
      name: "制作台Mk.Ⅲ",
      title: "工作效率 150%",
      speed: 1.5,
      power: 1.08
    },
    {
      name: "重组式制作台",
      title: "工作效率 300%",
      speed: 3,
      power: 2.7
    }
  ],
  化工厂: [
    {
      name: "化工厂",
      title: "工作效率 100%",
      speed: 1,
      power: 0.72
    },
    {
      name: "量子化工厂",
      title: "工作效率 200%",
      speed: 2,
      power: 2.16
    }
  ],
  矩阵研究站: [
    {
      name: "矩阵研究站",
      title: "工作效率 100%",
      speed: 1,
      power: 0.48
    },
    {
      name: "自演化研究站",
      title: "工作效率 300%",
      speed: 3,
      power: 1.92
    }
  ],
  增产剂: [
    {
      name: "无",
      title: "禁用增产剂",
      energy: 1,
      speedup: 1,
      extra: 1,
      count: 0
    },
    {
      name: "增产剂Mk.Ⅰ",
      title: "喷涂12次 加速25% 增产12.5% 电力130%",
      energy: 1.3,
      speedup: 1.25,
      extra: 1.125,
      count: 12
    },
    {
      name: "增产剂Mk.Ⅱ",
      title: "喷涂24次 加速50% 增产20% 电力170%",
      energy: 1.7,
      speedup: 1.5,
      extra: 1.2,
      count: 24
    },
    {
      name: "增产剂Mk.Ⅲ",
      title: "喷涂60次 加速100% 增产25% 电力250%",
      energy: 2.5,
      speedup: 2,
      extra: 1.25,
      count: 60
    },
    {
      name: "增产剂Mk.Ⅱ",
      title: "喷涂27次 加速50% 增产20% 电力170%",
      fullname: "增产剂Mk.Ⅱ(自喷涂)",
      energy: 1.7,
      speedup: 1.5,
      extra: 1.2,
      count: 27
    },
    {
      name: "增产剂Mk.Ⅲ",
      title: "喷涂74次 加速100% 增产25% 电力250%",
      fullname: "增产剂Mk.Ⅲ(自喷涂)",
      energy: 2.5,
      speedup: 2,
      extra: 1.25,
      count: 74
    }
  ],
  原油精炼厂: [
    {
      name: "原油精炼厂",
      speed: 1,
      power: 0.96
    }
  ],
  能量枢纽: [
    {
      name: "能量枢纽",
      speed: 1,
      power: 0
    }
  ],
  微型粒子对撞机: [
    {
      name: "微型粒子对撞机",
      speed: 1,
      power: 12
    }
  ],
  射线接收站: [
    {
      name: "射线接收站",
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
  ],
  能量散失: {
    title: "减少射线接收站请求戴森球电力的消耗",
    unit: "%"
  },
  采矿速度: {
    title: "提升矿脉、采矿机、轨道采集器、抽水机、原油萃取站采集效率",
    unit: "%"
  },
  矿脉: {
    name: "矿脉",
    noset: true,
    power: 0
  },
  采矿机: {
    name: "采矿机",
    title: "采矿机覆盖矿脉的平均数量",
    power: 0.42,
    unit: "个"
  },
  大型采矿机: {
    name: "大型采矿机",
    title: "大型采矿机覆盖矿脉的平均数量 未支持开采速度设置 影响电力消耗",
    power: 2.94,
    unit: "个"
  },
  气巨采集器_氢: {
    name: "气巨采集器",
    title: "行星视图显示的氢采集速度",
    power: 0
  },
  气巨采集器_重氢: {
    name: "气巨采集器",
    title: "行星视图显示的重氢采集速度",
    power: 0
  },
  冰巨采集器_氢: {
    name: "冰巨采集器",
    title: "行星视图显示的氢采集速度",
    power: 0
  },
  冰巨采集器_可燃冰: {
    name: "冰巨采集器",
    title: "行星视图显示的可燃冰采集速度",
    power: 0
  },
  抽水机: {
    name: "抽水机",
    noset: true,
    power: 0.3
  },
  原油萃取站: {
    name: "原油萃取站",
    title: "矿脉显示的平均采集速度",
    power: 0.84
  },
  分馏塔: {
    name: "分馏塔",
    title: "最高速度120/s 最高效率2%",
    power: 0.72
  }
};
export const loadConfig = (key, val, program) => {
  if (program) {
    key = `${key}-${program}`;
  }
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

export const getFactorys = setting => {
  return Object.keys(factoryparams).reduce((data, name) => {
    data[name] = getFactoryInfo(name, setting);
    return data;
  }, {});
};

function getFactoryInfo(name, setting) {
  const obj = factoryparams[name];
  if (obj instanceof Array && (name !== "传送带" || setting["传送带"] !== 3)) {
    return obj[+setting[name]];
  }

  let speed = setting[name];
  if (name === "传送带") {
    return {
      name: `传送带(${setting["自定义传送带"]}/s)`,
      speed: setting["自定义传送带"]
    };
  } else if (name === "分馏塔") {
    if (name === "分馏塔") {
      speed = getFactoryInfo("传送带", setting).speed;
    }
  } else {
    if (name == "采矿机") {
      speed *= 0.5;
    } else if (/^.巨/.test(name)) {
      speed *= setting[obj.name] * 8;
    }
    speed *= setting["采矿速度"] / 100;
  }

  return {
    name: obj.name,
    power: obj.power,
    fullname: `${obj.name}(${speed.toFixed(3)}/s)`,
    speed
  };
}

export const getFactoryList = () => {
  const list = [];
  Object.values(factoryparams).forEach(i => {
    if (i instanceof Array) {
      for (let s of i) {
        list.push(s.name);
      }
    } else {
      list.push(i.name);
    }
  });
  return list;
};
