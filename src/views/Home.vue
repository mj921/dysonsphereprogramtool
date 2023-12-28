<template>
  <div id="app">
    <div class="dsp-form">
      <div class="select-block form-block">
        <el-select
          v-model="currentProduct"
          class="dsp-form-list"
          filterable
          placeholder="请选择产物"
          :popper-append-to-body="false"
        >
          <el-option-group
            v-for="(val, key) in productAll.list"
            :key="key"
            :label="val"
          >
            <template v-if="key != 'fule' && key != 'ammo'">
              <el-option
                v-for="item in productAll[key]"
                :key="item"
                :value="item"
              >
                <img v-if="imgs[item]" class="select-img" :src="imgs[item]" />
                {{ item }}
              </el-option>
            </template>
          </el-option-group>
          <el-option-group key="resources" label="资源">
            <el-option
              v-for="item in productAll['resources']"
              :key="item"
              :value="item"
            >
              <img v-if="imgs[item]" class="select-img" :src="imgs[item]" />
              {{ item }}
            </el-option>
          </el-option-group>
        </el-select>
        <span>或</span>
        <el-popover
          v-model="visibleselect"
          class="dsp-form-map"
          popper-class="panel-popper"
          trigger="click"
          content="viewport"
          :placement="width > 800 ? 'top' : 'left'"
          :append-to-body="false"
        >
          <div
            slot="reference"
            class="tree-block"
            :class="{
              'has-children':
                data.formulaMaterial && data.formulaMaterial.length > 1
            }"
          >
            <el-button type="primary" size="small">选择产物(图片)</el-button>
          </div>
          <div class="select-tabs">
            <dl
              v-for="(val, key) in itemname"
              class="select-tab"
              :class="{ curr: itemtab === key }"
              :key="key"
              @click="itemtab = key"
            >
              <img
                v-if="key == 'items'"
                src="../assets/component-icon.png"
                alt=""
              />
              <img v-else src="../assets/factory-icon.png" alt="" />
              <span>{{ val }}</span>
            </dl>
            <dl>
              <div class="select-filter">
                <el-checkbox
                  v-for="(name, key) in productAll.list"
                  :key="key"
                  v-model="itemactive[key]"
                  @change="changeFilter"
                  >{{ name }}</el-checkbox
                >
              </div>
            </dl>
          </div>
          <div
            v-for="(_, item) in itemname"
            v-show="itemtab === item"
            class="panel"
            :key="item"
          >
            <div class="panel-wrapper">
              <dl v-for="i in 7" :key="`${item}-row-${i}`">
                <dd
                  :class="{
                    curr:
                      itemmap[item][`${i}-${j}`] &&
                      itemmap[item][`${i}-${j}`] === currentProduct
                  }"
                  v-for="j in 14"
                  :key="`${item}-col-${i}-${j}`"
                  :title="itemmap[item][`${i}-${j}`]"
                  @click="productSelect(itemmap[item][`${i}-${j}`])"
                >
                  <img
                    v-if="itemmap[item][`${i}-${j}`]"
                    :class="{
                      drak:
                        itemfilter.length > 0 &&
                        itemfilter.indexOf(itemmap[item][`${i}-${j}`]) == -1
                    }"
                    :src="imgs[itemmap[item][`${i}-${j}`]]"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="dsp-form-type form-block">
        <el-radio-group
          v-model="configtype"
          @change="changeType"
          class="form-block"
        >
          <el-radio label="产量"></el-radio>
          <el-radio label="设备"></el-radio>
          <el-radio label="传送带"></el-radio>
        </el-radio-group>
        <el-input
          v-model="confignum"
          :placeholder="configtype === '产量' ? '每分钟产量' : '设备数'"
          @blur="changeNum"
        >
          <template slot="append">/ min</template>
        </el-input>
      </div>
      <div class="form-block">
        <el-checkbox v-model="configvertical">水平展示</el-checkbox>
        <el-checkbox v-model="configsimple">简化展示</el-checkbox>
        <el-checkbox v-model="configmaterial" @change="productUpdate">
          隐藏资源
        </el-checkbox>
      </div>
    </div>
    <div class="dsp-menu">
      <el-button @click="visibleoverview = true">查看总览</el-button>
      <el-button @click="visibledescribe = true">查看说明</el-button>
      <el-button @click="visibleconfig = true">参数配置</el-button>
      <el-button @click="clearCache">重置默认值</el-button>
    </div>
    <el-tabs
      v-show="productList.length > 0"
      :value="currentProduct"
      tab-position="top"
      closable
      @tab-remove="productRemove"
      @tab-click="productChange"
      class="dsp-procucts"
    >
      <el-tab-pane
        v-for="item in productList"
        :key="item"
        :label="item"
        :name="item"
      >
        <el-button @click="visiblecurrent = true" style="margin: 0 10px;">
          查看当前产物总览
        </el-button>
        <dsp-products
          :data="productMapping[item].data"
          :vertical="configvertical"
          :simple="!configsimple"
        />
      </el-tab-pane>
    </el-tabs>
    <dsp-describe :visible.sync="visibledescribe" />
    <dsp-setting :visible.sync="visibleconfig" :setting="factorysetting" />
    <dsp-overview
      v-if="productMapping[currentProduct]"
      :visible.sync="visiblecurrent"
      :overview="productMapping[currentProduct].overview"
      :factory="factorylist"
      :dissipation="factorysetting['能量散失']"
      :imgs="imgs"
    />
    <dsp-overview
      :visible.sync="visibleoverview"
      :overview="overview"
      :factory="factorylist"
      :dissipation="factorysetting['能量散失']"
      :imgs="imgs"
    />
  </div>
</template>
<script>
import productAll from "../data/data";
import { formulaAll, formulaInit } from "../data/pf1";
import {
  factorydefault,
  factoryparams,
  loadConfig,
  loadFactoryList
} from "../data/sb";
import imgs from "../data/imgs";
import dspDescribe from "../components/dspDescribe";
import dspOverview from "../components/showStatic";
import dspProducts from "../components/tree";
import dspSetting from "../components/dspSetting";

export default {
  name: "Home",
  components: {
    dspDescribe,
    dspOverview,
    dspProducts,
    dspSetting
  },
  data() {
    console.clear();
    console.log("app init");
    formulaInit();
    const itemname = { items: "组件", buildings: "建筑" };
    const itemlist = [];
    const itemmap = {};
    for (let key in itemname) {
      itemmap[key] = {};
      itemlist.push({
        name: itemname[key],
        options: productAll[key].map(i => {
          const arr = i.split("-");
          const name = arr[arr.length - 1];
          itemmap[key][arr.slice(0, 2).join("-")] = name;
          return {
            value: name,
            label: name
          };
        })
      });
    }

    return {
      data: {},
      imgs: imgs,
      productAll: productAll,
      currentProduct: "",
      productList: [],
      productMapping: {},
      itemtab: "items",
      itemname,
      itemmap,
      itemlist,
      itemactive: {},
      itemfilter: [],
      itemresources: productAll.resources,
      configtype: "产量",
      confignum: 60,
      configvertical: false,
      configsimple: false,
      configmaterial: false,
      factorysetting: loadConfig(factorydefault.storagesetting, {
        ...factorydefault
      }),
      factoryparams,
      factorylist: loadFactoryList().concat(productAll.resources),
      visibleselect: false,
      visibleoverview: false,
      visibledescribe: false,
      visibleconfig: false,
      visiblecurrent: false
    };
  },
  watch: {
    currentProduct(val) {
      if (val) {
        this.productUpdate();
      }
    }
  },
  computed: {
    width() {
      return window.innerWidth;
    },
    overview() {
      const data = {
        power: 0,
        products: {},
        factorys: {},
        materials: {}
      };
      this.productList.forEach(name => {
        const item = this.productMapping[name].overview;
        data.power += item.power;
        Object.keys(item.products).map(key => {
          if (!data.products[key]) {
            data.products[key] = {
              name: item.products[key].name,
              num: 0,
              factoryName: item.products[key].factoryName,
              factoryFullname: item.products[key].factoryFullname,
              factoryNum: 0
            };
          }
          data.products[key].num += item.products[key].num;
          data.products[key].factoryNum += item.products[key].factoryNum;
        });
        Object.keys(item.factorys).map(key => {
          data.factorys[key] = (data.factorys[key] || 0) + item.factorys[key];
        });
        Object.keys(item.materials).map(key => {
          data.materials[key] =
            (data.materials[key] || 0) + item.materials[key];
        });
      });
      return data;
    }
  },
  filters: {
    numFmt(val) {
      return val
        .toFixed(2)
        .replace(/\.00$/, "")
        .replace(/(\.\d)0$/, "$1");
    }
  },
  provide() {
    return {
      settingsave: this.settingsave,
      settingcancel: this.settingcancel,
      productUpdate: this.productUpdate
    };
  },
  methods: {
    changeFilter() {
      const list = [];
      for (let key in this.itemactive) {
        if (this.itemactive[key]) {
          list.push(...this.productAll[key]);
        }
      }
      this.itemfilter = list;
    },
    changeType() {
      if (
        this.currentProduct &&
        this.productMapping[this.currentProduct].configtype !== this.configtype
      ) {
        this.productUpdate();
      }
    },
    changeNum() {
      this.confignum = +(this.confignum + "").replace(/[^\\.0-9]/g, "");
      if (this.confignum === 0) {
        this.confignum = 60;
      }
      if (
        this.currentProduct &&
        this.productMapping[this.currentProduct].confignum !== this.confignum
      ) {
        this.productUpdate();
      }
    },
    settingcancel() {
      this.factorysetting = loadConfig(factorydefault.storagesetting, {
        ...factorydefault
      });
      this.visibleconfig = false;
    },
    settingsave() {
      localStorage.setItem(
        factorydefault.storagesetting,
        JSON.stringify(this.factorysetting)
      );
      this.visibleconfig = false;
      this.productUpdate();
    },
    productChange(el) {
      this.currentProduct = el.name;
      this.confignum = this.productMapping[el.name].confignum;
      this.configtype = this.productMapping[el.name].configtype;
      this.configmaterial = this.productMapping[el.name].configmaterial;
    },
    productRemove(name) {
      this.productList.splice(this.productList.indexOf(name), 1);
      delete this.productMapping[name];
      if (this.currentProduct === name) {
        this.currentProduct =
          this.productList.length > 0
            ? this.productList[this.productList.length - 1]
            : "";
      }
    },
    productSelect(wp) {
      if (!wp) return;
      this.currentProduct = wp;
      this.visibleselect = false;
    },
    productUpdate() {
      if (!this.currentProduct || !formulaAll[this.currentProduct]) return;
      if (!this.productMapping[this.currentProduct]) {
        this.productList.push(this.currentProduct);
      }
      const data = this.getProductData(
        "root",
        this.currentProduct,
        this.getProductNum(),
        this.getProductConfig()
      );

      this.$set(this.productMapping, this.currentProduct, {
        data,
        overview: this.getOverview(data),
        confignum: this.confignum,
        configtype: this.configtype,
        configmaterial: this.configmaterial
      });
      this.$forceUpdate();
    },
    getFactoryInfo(name) {
      const config = this.factorysetting;
      const obj = factoryparams[name];
      if (
        obj instanceof Array &&
        (name !== "传送带" || config["传送带"] !== 3)
      ) {
        return obj[+config[name]];
      }

      let speed = config[name];
      if (name === "传送带") {
        return {
          name: `传送带(${config["自定义传送带"]}/s)`,
          speed: config["自定义传送带"]
        };
      } else if (name === "分馏塔") {
        if (name === "分馏塔") {
          speed = this.getFactoryInfo("传送带").speed;
        }
      } else {
        if (name == "采矿机") {
          speed *= 0.5;
        } else if (/^.巨/.test(name)) {
          speed *= config[obj.name] * 8;
        }
        speed *= config["采矿速度"] / 100;
      }

      return {
        name: obj.name,
        power: obj.power,
        fullname: `${obj.name}(${speed.toFixed(2)}/s)`,
        speed
      };
    },
    getProductNum() {
      if (this.configtype === "产量") {
        return this.confignum;
      }

      const config = loadConfig(factorydefault.storageproduct, {})[
        `root-${this.currentProduct}`
      ] || { formula: 0, sprayed: "" };
      const formula = formulaAll[this.currentProduct][config.formula];
      const proliferator = this.getFactoryInfo("增产剂");
      const factoryName = /^.巨/.test(formula.m)
        ? `${formula.m}_${this.currentProduct}`
        : formula.m;
      let num = this.confignum * 60;
      switch (this.configtype) {
        case "设备":
          if (config.sprayed === "extra") {
            num *= proliferator.extra;
          }
          if (config.sprayed === "speedup") {
            num *= proliferator.speedup;
          }
          return (
            (num * formula.c * this.getFactoryInfo(factoryName).speed) /
            formula.t
          );
        case "传送带":
          return num * this.getFactoryInfo("传送带").speed;
        default:
          return this.confignum;
      }
    },
    getProductConfig() {
      const factorys = Object.keys(this.factoryparams).reduce((data, name) => {
        data[name] = this.getFactoryInfo(name);
        return data;
      }, {});

      return {
        setting: loadConfig(factorydefault.storageproduct, {}),
        factorys,
        belt: factorys["传送带"],
        proliferator: factorys["增产剂"]
      };
    },
    getProductData(parent, name, num = 60, config) {
      const setting = config.setting[`${parent}-${name}`] || {
        formula: 0,
        sprayed: "",
        select: []
      };

      const formulas = formulaAll[name];
      const formulaIndex = setting.formula;
      const formula = formulas[formulaIndex];
      const formulaExec = formula.q.map(item => {
        let state = this.hasMaterial(config, name, item.name);
        if (setting.select.indexOf(item.name) != -1) {
          state = !state;
        }
        return state;
      });
      const factory =
        config.factorys[
          /^.巨/.test(formula.m) ? `${formula.m}_${name}` : formula.m
        ];

      // 处理增产剂模式、增产剂数量、电力消耗、生产速度、生产次数
      let outenergy = 1;
      let outspeed = factory.speed;
      let outNum = num / formula.c;
      let sprayedMode = setting.sprayed;
      let sprayedNum = 0;
      if (config.proliferator.count == 0) {
        sprayedMode = "none";
      } else if (sprayedMode == "speedup" && formula.p != -1) {
        outenergy = config.proliferator.energy;
        outspeed *= config.proliferator.speedup;
        sprayedNum = (outNum * formula.cq) / config.proliferator.count;
      } else if (sprayedMode == "extra" && formula.p == undefined) {
        outNum /= config.proliferator.extra;
        sprayedNum = (outNum * formula.cq) / config.proliferator.count;
      } else {
        sprayedMode = "none";
      }

      const factoryNum = (outNum / 60 / outspeed) * formula.t;
      const extra1 = (m, o) => {
        if (o.rn !== 0) {
          m[o.name] = (num / formula.c) * o.rn;
        } else if (/^.巨/.test(formula.m)) {
          m[o.name] =
            factoryNum * 60 * config.factorys[`${formula.m}_${o.name}`].speed;
        }
        return m;
      };
      const extra2 = (m, o) => {
        if (o.rn !== 0) {
          m[o.name] = outNum * o.rn;
        }
        return m;
      };
      return {
        parent,
        factorys: config.factorys,
        productName: name,
        productNum: num,
        extraProduct: formula.s.slice(1).reduce(extra1, {}),
        // TOOD item.name != name
        extraMaterial: formula.q
          .filter((_, i) => !formulaExec[i])
          .filter(item => item.name !== name)
          .reduce(extra2, {}),
        formulaIndex,
        formulaAll: formulas,
        formulaExec, // drak?
        formulaMaterial: formula.q
          .filter((_, i) => formulaExec[i])
          .filter(item => item.rn !== 0)
          .filter(item => item.name !== name)
          .map(item =>
            this.getProductData(name, item.name, item.rn * outNum, config)
          ),
        factoryName:
          factory.name == "矿脉" ? name + factory.name : factory.name,
        factoryFullname: factory.fullname || factory.name,
        factoryNum,
        beltName: config.belt.name,
        beltNum: ((num / formula.c) * formula.cs) / 60 / config.belt.speed,
        sprayedMode,
        sprayedNum,
        sprayedType: formula.p,
        sprayedData: config.proliferator,
        power: factory.power * factoryNum * outenergy
      };
    },
    hasMaterial(config, parent, name) {
      if (!this.configmaterial || this.itemresources.indexOf(name) == -1) {
        return true;
      } else if (name == "硅石" || name == "有机晶体") {
        const setting = config.setting[`${parent}-${name}`] || { formula: 0 };
        const formula = formulaAll[name][setting.formula];
        return formula.q.length > 0;
      }
      return false;
    },
    getOverview(
      data,
      overview = { power: 0, products: {}, factorys: {}, materials: {} }
    ) {
      overview.power += data.power;

      // 统计产物
      const products = overview.products;
      const productkey = `${data.productName}-${data.factoryName}`;
      if (products[productkey]) {
        products[productkey].num += data.productNum;
        products[productkey].factoryNum += data.factoryNum;
      } else {
        products[productkey] = {
          name: data.productName,
          num: data.productNum,
          factoryName: data.factoryName,
          factoryFullname: data.factoryFullname,
          factoryNum: data.factoryNum
        };
      }

      // 统计工厂
      const factorys = overview.factorys;
      factorys[data.factoryName] =
        (factorys[data.factoryName] || 0) + data.factoryNum;

      const materials = overview.materials;
      // 增产剂
      if (data.sprayedNum > 0) {
        materials[data.sprayedData.name] =
          (materials[data.sprayedData.name] || 0) - data.sprayedNum;
      }
      // 额外产物
      for (let name in data.extraProduct) {
        materials[name] = (materials[name] || 0) + data.extraProduct[name];
      }
      // 额外原料
      for (let name in data.extraMaterial) {
        materials[name] = (materials[name] || 0) - data.extraMaterial[name];
      }

      data.formulaMaterial.forEach(item => this.getOverview(item, overview));
      return overview;
    },
    clearCache() {
      this.factorysetting = { ...factorydefault };
      localStorage.removeItem(factorydefault.storagesetting);
      localStorage.removeItem(factorydefault.storageproduct);

      const oldversion = ["sbConfig", "pfConfig", "dsp-formula", "dsp-sprayed"];
      oldversion.forEach(i => localStorage.removeItem(i));
    }
  }
};
</script>
<style type="text/css">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #000;
  color: #f5c62a;
  white-space: nowrap;
}
#app {
  display: flex;
  flex-direction: column;
}
img {
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 4px;
}
.select-img {
}
</style>
<style lang="scss" scoped>
$small-screen: 600px;
.dsp-form {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  .form-block {
    min-height: 32px;
    margin: 2px 0;
    display: flex;
    align-items: center;
  }
  .select-block {
    > * {
      margin-right: 4px;
    }
    .dsp-form-list :deep(.el-scrollbar__wrap) {
      max-height: 500px;
    }
    .dsp-form-map :deep(.el-popover) {
      background-color: #1c3436;
    }
  }
  .dsp-form-type {
    padding-left: 15%;
    .el-input {
      margin: 0 30px;
      min-width: 120px;
      max-width: 150px;
    }
    @media screen and (max-width: 1300px) {
      padding-left: 0;
    }
    @media screen and (max-width: $small-screen) {
      .el-radio {
        margin-right: 4px;
      }
      .el-input {
        margin: 0;
      }
    }
  }
}
.dsp-menu > * {
  margin-left: 10px;
}
.dsp-procucts {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  :deep(.el-tabs__content) {
    height: 100%;
  }
  :deep(.el-tab-pane) {
    height: 100%;
    overflow: auto;
  }
}
/* .dsp-form-map style */
.select-tabs {
  display: flex;
  width: 154px;
  margin-bottom: 5px;
  .select-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    margin: 0;
    margin-right: 5px;
    &.curr,
    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.1);
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 0;
    }
    span {
      line-height: 24px;
      font-size: 14px;
      color: #fff;
    }
  }
  .select-filter {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    > label {
      width: calc(20% - 30px);
    }
  }
}
.panel {
  background-color: #1c3436;
  .panel-wrapper {
    display: flex;
    flex-direction: column;
    width: 756px;

    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: 2px;
    @media screen and (max-width: $small-screen) {
      flex-direction00: row;
    }
    dl {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      dd {
        width: 50px;
        margin: 0;
        background-color: #1c3436;
        margin: 2px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.curr,
        &:hover {
          background-color: rgba($color: #ffffff, $alpha: 0.2);
        }
        img {
          height: 40px;
          width: 40px;
          margin: 0;
        }
      }
      .drak {
        filter: brightness(50%);
      }
    }
  }
}
</style>
