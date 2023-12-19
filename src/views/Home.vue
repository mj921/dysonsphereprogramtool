<template>
  <div class="home" :class="{ configvertical }">
    <div class="form">
      <div class="select-block">
        <el-select v-model="currentProduct" filterable placeholder="请选择产物">
          <el-option-group
            v-for="group in itemlist"
            :key="group.name"
            :label="group.name"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :value="item.value"
            >
              <img class="select-img" :src="imgs[item.label]" />{{ item.label }}
            </el-option>
          </el-option-group>
        </el-select>
        <span>或</span>
        <el-popover
          style="margin-right: 10px;"
          placement="bottom"
          trigger="click"
          popper-class="panel-popper"
          v-model="visibleselect"
        >
          <div
            slot="reference"
            class="tree-block"
            :class="{
              'has-children':
                data.productMaterial && data.productMaterial.length > 1
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
              <img src="../assets/component-icon.png" alt="" />
              <span>{{ val }}</span>
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
                  @click="selectWp(itemmap[item][`${i}-${j}`])"
                >
                  <img
                    v-if="itemmap[item][`${i}-${j}`]"
                    :src="imgs[itemmap[item][`${i}-${j}`]]"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </el-popover>
      </div>
      <el-radio-group v-model="configtype" @change="typeChange">
        <el-radio label="产量"></el-radio>
        <el-radio label="设备"></el-radio>
        <el-radio label="传送带"></el-radio>
      </el-radio-group>
      <el-input
        style="width: 120px;"
        v-model="confignum"
        :placeholder="configtype === '产量' ? '每分钟产量' : '设备数'"
        @blur="inputBlur"
      >
        <template slot="append">/ min</template>
      </el-input>
      <el-checkbox v-model="configvertical">是否水平</el-checkbox>
    </div>
    <el-button @click="visibletotal = true" style="margin-left: 10px;">
      查看总览
    </el-button>
    <el-button @click="visibleconfig = true" style="margin-left: 10px;">
      参数配置
    </el-button>
    <el-button @click="clearCache" style="margin-left: 10px;">
      重置默认值
    </el-button>
    (tip:传送带按产物计算)
    <br />
    <el-tabs
      v-show="tabList.length > 0"
      :value="currentProduct"
      tab-position="top"
      closable
      @tab-remove="removeTab"
      @tab-click="tabChange"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item"
        :label="item"
        :name="item"
      >
        <el-button @click="visiblecurrent = true" style="margin-left: 10px;">
          查看当前产物总览
        </el-button>
        <tree :data="tabMap[item].data" :vertical="configvertical" />
      </el-tab-pane>
    </el-tabs>
    <show-static
      v-if="tabMap[currentProduct]"
      :visible.sync="visiblecurrent"
      :yl="tabMap[currentProduct].yl"
      :sb="tabMap[currentProduct].sb"
      :imgs="imgs"
      :total-power="tabMap[currentProduct].totalPower"
    />
    <show-static
      :visible.sync="visibletotal"
      :yl="yl"
      :sb="sb"
      :imgs="imgs"
      :total-power="totalPower"
    />
    <el-dialog title="参数配置" :visible.sync="visibleconfig" width="800px">
      <el-form label-width="140px" inline size="mini">
        <el-form-item label="传送带">
          <el-select
            v-model="factorysetting['传送带']"
            filterable
            placeholder="请选择传送带"
          >
            <el-option
              v-for="(item, i) in factoryparams['传送带']"
              :key="i"
              :label="item.name"
              :value="i"
            >
              <img v-if="i != 3" class="select-img" :src="imgs[item.name]" />
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in [
            '冶炼设备',
            '制作台',
            '化工厂',
            '矩阵研究站',
            '增产剂'
          ]"
          :key="item"
          :label="item"
        >
          <el-select
            v-model="factorysetting[item]"
            filterable
            :placeholder="`请选择${item}`"
          >
            <el-option
              v-for="(jtem, i) in factoryparams[item]"
              :key="i"
              :label="jtem.name"
              :value="i"
            >
              <img
                v-if="jtem.name != '无'"
                class="select-img"
                :src="imgs[jtem.name]"
              />
              {{ jtem.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in [
            '采矿机',
            '大型采矿机',
            '矿脉',
            '抽水机',
            '原油萃取站',
            '轨道采集器_氢',
            '轨道采集器_重氢',
            '轨道采集器_可燃冰'
          ]"
          :key="item"
          :label="item"
        >
          <el-input v-model="factorysetting[item]" @input="iptHandle(item)">
            <template slot="append">/ s</template>
          </el-input>
        </el-form-item>
        <el-form-item label="传送带运力" v-if="factorysetting['传送带'] === 3">
          <el-input
            v-model="factorysetting['自定义传送带']"
            @input="iptHandle('自定义传送带')"
          >
            <template slot="append">/ s</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="save">保存</el-button>
        <el-button @click="cancel">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import productAll from "../data/data";
import formulaAll from "../data/pf1";
import { factorydefault, factoryparams, loadConfig } from "../data/sb";
// import imgs from "../data/imgs";
import Tree from "../components/tree";
import ShowStatic from "../components/showStatic";

export default {
  name: "Home",
  components: {
    Tree,
    ShowStatic
  },
  data() {
    const itemname = { items: "组件", buildings: "建筑" };
    const itemlist = [];
    const itemmap = {};
    productAll.material.map(item => {
      productAll.imgs[item.name] = "data:image/png;base64," + item.value;
    });
    for (let key in itemname) {
      itemmap[key] = {};
      itemlist.push({
        name: itemname[key],
        options: productAll[key].map(item => {
          const arr = item.name.split("-");
          const name = arr[arr.length - 1];
          productAll.imgs[name] = "data:image/png;base64," + item.value;
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
      imgs: productAll.imgs,
      currentProduct: "",
      tabList: [],
      tabMap: {},
      itemtab: "items",
      itemmap,
      itemlist,
      itemname,
      configtype: "产量",
      confignum: 60,
      configvertical: false,
      factorysetting: loadConfig(factorydefault.storagesetting, {
        ...factorydefault
      }),
      factoryparams,
      visibleselect: false,
      visibletotal: false,
      visibleconfig: false,
      visiblecurrent: false
    };
  },
  watch: {
    currentProduct(val) {
      if (val) {
        this.createPf();
      }
    }
  },
  computed: {
    yl() {
      const map = {};
      this.tabList.forEach(name => {
        this.tabMap[name].yl.forEach(item => {
          if (!map[item.name]) {
            map[item.name] = {
              name: item.name,
              sbName: item.sbName,
              num: item.num,
              sbNum: item.sbNum
            };
          } else {
            map[item.name].num += item.num;
            map[item.name].sbNum += item.sbNum;
          }
        });
      });
      return Object.keys(map).map(key => map[key]);
    },
    sb() {
      const map = {};
      this.tabList.forEach(name => {
        this.tabMap[name].sb.forEach(item => {
          if (!map[item.name]) {
            map[item.name] = {
              name: item.name,
              num: item.num
            };
          } else {
            map[item.name].num += item.num;
          }
        });
      });
      return Object.keys(map).map(key => map[key]);
    },
    totalPower() {
      return this.tabList.reduce((power, name) => {
        return this.tabMap[name].totalPower + power;
      }, 0);
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
      createPf: this.createPf
    };
  },
  methods: {
    getFactoryInfo(name, subName) {
      const config = this.factorysetting;
      const _name = name === "轨道采集器" ? `${name}_${subName}` : name;
      const obj = factoryparams[_name];
      if (obj instanceof Array) {
        return obj[config[name]];
      }

      if (name === "传送带" && this.factorysetting["传送带"] === 3) {
        return {
          name: `自定义传送带(${this.factorysetting["自定义传送带"]}/s)`,
          speed: this.factorysetting["自定义传送带"]
        };
      }
      if (name === "分馏塔") {
        const speed = this.getFactoryInfo("传送带").speed;
        return { ...obj, speed, name: `分馏塔(${speed}/s)` };
      }

      let power = obj.power;
      if (name === "矿脉") {
        power =
          factoryparams["采矿机"].power / (config["采矿机"] / config["矿脉"]);
      }
      return {
        ...obj,
        name: `${obj.name}(${config[_name]}/s)`,
        speed: config[_name],
        power
      };
    },
    tabChange(el) {
      this.currentProduct = el.name;
      this.confignum = this.tabMap[el.name].confignum;
      this.configtype = this.tabMap[el.name].configtype;
    },
    removeTab(name) {
      this.tabList.splice(this.tabList.indexOf(name), 1);
      delete this.tabMap[name];
      if (this.currentProduct === name) {
        this.currentProduct = this.tabList.length > 0 ? this.tabList[0] : "";
      }
    },
    selectWp(wp) {
      if (!wp) return;
      this.currentProduct = wp;
      this.visibleselect = false;
    },
    iptHandle(type) {
      this.factorysetting[type] = this.factorysetting[type]
        .replace(/[^.0-9]/g, "")
        .replace(/^(\d*\.\d*)[^0-9]/, "$1")
        .replace(/^\.+/, "");
    },
    cancel() {
      this.factorysetting = loadConfig(factorydefault.storagesetting, {
        ...factorydefault
      });
      this.visibleconfig = false;
    },
    save() {
      localStorage.setItem(
        factorydefault.storagesetting,
        JSON.stringify(this.factorysetting)
      );
      this.visibleconfig = false;
      this.createPf();
    },
    inputBlur() {
      this.createPf();
    },
    typeChange() {
      this.createPf();
    },
    createPf(modifyPf = false) {
      if (
        !modifyPf &&
        this.tabMap[this.currentProduct] &&
        this.tabMap[this.currentProduct].confignum === this.confignum &&
        this.tabMap[this.currentProduct].configtype === this.configtype
      ) {
        return;
      }
      this.confignum = +(this.confignum + "").replace(/[^0-9]/g, "");
      if (!this.currentProduct || !formulaAll[this.currentProduct]) return;
      const data = this.getProduct(
        "root",
        this.currentProduct,
        this.getProductNum(),
        this.getProductConfig()
      );
      const [yl1, sb1, totalPower] = this.getOverview(data);
      const yl = Object.keys(yl1).map(key => ({
        name: key,
        ...yl1[key]
      }));
      const sb = Object.keys(sb1).map(key => ({
        name: key,
        num: sb1[key]
      }));
      if (!this.tabMap[this.currentProduct]) {
        this.tabList.push(this.currentProduct);
      }
      this.$set(this.tabMap, this.currentProduct, {
        data,
        yl,
        sb,
        totalPower,
        confignum: this.confignum,
        configtype: this.configtype
      });
      this.$forceUpdate();
    },
    getProductConfig() {
      return {
        formula: loadConfig(factorydefault.storageformula, {}),
        sprayed: loadConfig(factorydefault.storagesprayed, {}),
        belt: this.getFactoryInfo("传送带"),
        proliferator: this.getFactoryInfo("增产剂")
      };
    },
    getProductNum() {
      const config = loadConfig(factorydefault.storageformula, {
        root: {}
      });
      const formula =
        formulaAll[this.currentProduct][
          (config.root && config.root[this.currentProduct]) || 0
        ];
      switch (this.configtype) {
        case "产量":
          return this.confignum;
        case "设备":
          return (
            ((this.confignum * (formula.chanliang || 1) * 60) / formula.t) *
            this.getFactoryInfo(formula.m).speed
          );
        case "传送带":
          return this.confignum * 60 * this.getFactoryInfo("传送带").speed;
        default:
          return this.confignum;
      }
    },
    getProduct(parent, name, num = 60, config) {
      const formulas = formulaAll[name];
      const productIndex =
        (config.formula[parent] && config.formula[parent][name]) || 0;
      let formula = formulas[productIndex < 0 ? ~productIndex : productIndex];
      const factory = this.getFactoryInfo(formula.m, name);

      let energy = 1;
      let speed = factory.speed;
      let target = num;
      let sprayedMode =
        (config.sprayed[parent] && config.sprayed[parent][name]) || "none";
      let sprayedNum = 0;
      if (config.proliferator.count == 0) {
        sprayedMode = "none";
      } else if (sprayedMode == "speedup" && formula.p != -1) {
        energy = config.proliferator.energy;
        speed *= config.proliferator.speedup;
      } else if (sprayedMode == "extra" && formula.p == undefined) {
        target /= config.proliferator.extra;
      } else {
        sprayedMode = "none";
      }
      if (sprayedMode != "none") {
        let s = formula.q.reduce((a, b) => a + (b.n || 1), 0);
        sprayedNum =
          ((target / (formula.chanliang || 1)) * s) / config.proliferator.count;
      }

      const factoryNum =
        ((target / 60 / speed) * formula.t) / (formula.chanliang || 1);

      return {
        parent,
        productName: name,
        productNum: num,
        productIndex,
        productFormula: formulas,
        productMaterial: formula.q
          .filter(() => productIndex > -1)
          .filter(item => item.name !== name)
          .map(item => {
            return this.getProduct(
              name,
              item.name,
              (item.n * target) / (formula.chanliang || 1),
              config
            );
          }),
        factoryName: factory.name,
        factoryNum,
        factoryImg: factory.baseName || factory.name,
        beltName: config.belt.name,
        beltNum: num / 60 / config.belt.speed,
        sprayedMode,
        sprayedNum,
        sprayedType: formula.p,
        sprayedData: config.proliferator,
        power: factory.power * factoryNum * energy
      };
    },
    getOverview(data, products = {}, factorys = {}, power = { num: 0 }) {
      if (products[data.productName]) {
        products[data.productName].num += data.productNum;
        products[data.productName].sbNum += data.factoryNum;
      } else {
        products[data.productName] = {};
        products[data.productName].num = data.productNum;
        products[data.productName].sbName = data.factoryName;
        products[data.productName].sbNum = data.factoryNum;
      }

      let sbName = data.factoryName;
      if (/^矿脉/.test(sbName)) {
        sbName = data.productName + sbName;
      }
      factorys[sbName] = (factorys[sbName] || 0) + data.factoryNum;
      if (data.sprayedNum > 0) {
        factorys[data.sprayedData.name] =
          (factorys[data.sprayedData.name] || 0) + data.sprayedNum;
      }
      power.num += data.power;
      data.productMaterial.forEach(item => {
        this.getOverview(item, products, factorys, power);
      });
      return [products, factorys, power.num];
    },
    clearCache() {
      this.factorysetting = { ...factorydefault };
      localStorage.removeItem(factorydefault.storagesetting);
      localStorage.removeItem(factorydefault.storageformula);
      localStorage.removeItem(factorydefault.storagesprayed);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #000;
  min-height: 100vh;
  width: 1920px;
  min-width: 100vw;
  color: #f5c62a;
  &.configvertical {
    width: 7000px;
  }
}
.panel {
  background-color: #1c3436;
  .panel-wrapper {
    display: flex;
    flex-direction: column;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: 2px;
    dl {
      display: flex;
      margin: 0;
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
    }
  }
}
img {
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.select-img {
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.form {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  min-width: 800px;
  & > * {
    margin-right: 3px;
  }
  .select-block {
    display: flex;
    align-items: center;
    & > * {
      margin-right: 5px;
    }
  }
}
.select-tabs {
  display: flex;
  width: 154px;
  margin-bottom: 5px;
  .select-tab {
    flex-grow: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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
}
</style>
<style lang="scss">
.el-popover.panel-popper {
  background-color: #1c3436;
}
</style>
