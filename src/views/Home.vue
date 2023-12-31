<template>
  <div id="app">
    <div class="dsp-form">
      <div class="select-block form-block">
        <el-select
          v-model="productname"
          filterable
          popper-class="dsp-form-list"
          placeholder="请选择产物"
        >
          <el-option-group
            v-for="(val, key) in itemall.list"
            :key="key"
            :label="val"
          >
            <template v-if="key != 'fule' && key != 'ammo'">
              <el-option v-for="item in itemall[key]" :key="item" :value="item">
                <img v-if="imgs[item]" class="select-img" :src="imgs[item]" />
                {{ item }}
              </el-option>
            </template>
          </el-option-group>
          <el-option-group key="resources" label="资源">
            <el-option
              v-for="item in itemall['resources']"
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
          popper-class="dsp-form-map"
          trigger="click"
          content="viewport"
          :placement="width > 800 ? 'top' : 'left'"
        >
          <div slot="reference" class="tree-block">
            <el-button type="primary" size="small">选择产物(图片)</el-button>
          </div>
          <div class="select-tabs">
            <dl
              v-for="(val, key) in itemall.map"
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
                  v-for="(name, key) in itemall.list"
                  :key="key"
                  v-model="itemactive[key]"
                  @change="changeFilter"
                  >{{ name }}</el-checkbox
                >
              </div>
            </dl>
          </div>
          <div
            v-for="(_, item) in itemall.map"
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
                      itemmap[item][`${i}-${j}`] === productname
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
      <el-button @click="visibleprogram = true">方案配置</el-button>
      <el-button @click="visibleconfig = true">参数配置</el-button>
      <el-select
        v-model="programname"
        filterable
        clearable
        :popper-append-to-body="false"
        placeholder="请选择戴森球方案"
      >
        <el-option
          v-for="(item, i) in programdata"
          :key="i"
          :value="item.name"
          :label="item.name"
        >
          <img v-if="imgs[item.describe]" :src="imgs[item.describe]" class="img-24" alt="" />
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
    <el-tabs
      :value="productname"
      tab-position="top"
      closable
      allow-create
      @tab-remove="productRemove"
      @tab-click="productChange"
      class="dsp-procucts"
    >
      <el-tab-pane
        v-for="name in productlist"
        :key="name"
        :label="name"
        :name="name"
      >
        <el-button @click="visiblecurrent = true" style="margin: 0 10px;">
          查看当前产物总览
        </el-button>
        <dsp-products
          v-if="productdata[name] && productdata[name].data"
          :data="productdata[name].data"
          :factorys="productfactorys"
          :program="programname"
          :vertical="configvertical"
          :simple="!configsimple"
        />
      </el-tab-pane>
    </el-tabs>
    <dsp-describe :visible.sync="visibledescribe" :programname="programname" />
    <dsp-setting
      :visible.sync="visibleconfig"
      :programname="programname"
      :programdata="programdata"
    />
    <dsp-programs
      :visible.sync="visibleprogram"
      :programname="programname"
      :programdata="programdata"
    />
    <dsp-overview
      v-if="productdata[productname] && productdata[productname].overview"
      :visible.sync="visiblecurrent"
      :overview="productdata[productname].overview"
      :factory="itemfactorys"
      :title="productname"
      :dissipation="productsetting['能量散失']"
      :overall="false"
      :imgs="imgs"
    />
    <dsp-overview
      :visible.sync="visibleoverview"
      :overview="overview"
      :factory="itemfactorys"
      :title="programname"
      :dissipation="productsetting['能量散失']"
      :overall="true"
      :imgs="imgs"
    />
  </div>
</template>
<script>
import productAll from "../data/data";
import { formulaAll, formulaInit } from "../data/pf1";
import {
  factorydefault,
  loadConfig,
  getFactorys,
  getFactoryList
} from "../data/sb";
import imgs from "../data/imgs";
import dspDescribe from "../components/dspDescribe";
import dspOverview from "../components/dspOverview";
import dspProducts from "../components/dspProducts";
import dspPrograms from "../components/dspPrograms";
import dspSetting from "../components/dspSetting";

function increment(data, key, val) {
  data[key] = (data[key] || 0) + val;
}

function incrementMap(dst, src) {
  for (const [key, val] of Object.entries(src)) {
    dst[key] = (dst[key] || 0) + val;
  }
}

export default {
  name: "Home",
  components: {
    dspDescribe,
    dspOverview,
    dspProducts,
    dspPrograms,
    dspSetting
  },
  data() {
    formulaInit(factorydefault);
    const productdatadefault = {};
    const setting = loadConfig(factorydefault.setting, {
      ...factorydefault
    });

    const itemlist = [];
    const itemmap = {};
    for (let key in productAll.map) {
      itemmap[key] = {};
      itemlist.push({
        name: productAll.map[key],
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
      imgs: imgs,
      programname: "",
      programdata: JSON.parse(localStorage.getItem("dsp-programs") || "[]"),
      productname: "",
      productlist: [],
      productdata: productdatadefault,
      productdatadefault,
      productsetting: setting,
      productfactorys: getFactorys(setting),
      itemtab: "items",
      itemmap,
      itemlist,
      itemall: productAll,
      itemactive: {},
      itemfilter: [],
      itemresources: productAll.resources,
      itemfactorys: getFactoryList().concat(productAll.resources),
      configtype: "产量",
      confignum: 60,
      configvertical: false,
      configsimple: false,
      configmaterial: false,
      visibleselect: false,
      visibleoverview: false,
      visibledescribe: false,
      visibleprogram: false,
      visibleconfig: false,
      visiblecurrent: false
    };
  },
  watch: {
    programname(val) {
      this.programActive(val);
    },
    productname(val) {
      if (val && !(this.productdata[val] && this.productdata[val].data)) {
        const save = this.productlist.indexOf(val) === -1;
        this.productUpdate();
        if (save) {
          this.programSave();
        }
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
      for (const item of Object.values(this.productdata)) {
        if (item.data === undefined) {
          continue;
        }
        data.power += item.overview.power;
        for (const [key, val] of Object.entries(item.overview.products)) {
          if (!data.products[key]) {
            data.products[key] = {
              name: val.name,
              num: 0,
              factoryName: val.factoryName,
              factoryFullname: val.factoryFullname,
              factoryNum: 0
            };
          }
          data.products[key].num += val.num;
          data.products[key].factoryNum += val.factoryNum;
        }
        incrementMap(data.factorys, item.overview.factorys);
        incrementMap(data.materials, item.overview.materials);
      }

      // 抵消终极产物和额外原料
      const tofixed = n => Number(n.toFixed(3));
      for (const [name, item] of Object.entries(this.productdata)) {
        if (item.data === undefined) {
          continue;
        }
        const key = `${item.data.productName}-${item.data.factoryName}`;
        const total = data.products[key].num;
        const val = item.data.productNum;
        const num = data.materials[name];

        if (num < 0) {
          const use = num + val > 0 ? -num : val;
          data.products[key].title = `累计生产:${tofixed(
            total
          )} 终极产物:${tofixed(val)} 中间产物:${tofixed(
            total - val
          )} 额外消耗终极产物:${tofixed(use)}`;
          data.products[key].use = total - val + use;
          data.products[key].num = val - use;
          data.materials[name] += use;
          if (data.materials[name] == 0) {
            delete data.materials[name];
          }
        } else if (val != data.products[key].num) {
          data.products[key].title = `累计生产:${tofixed(
            total
          )} 终极产物:${tofixed(val)} 中间产物:${tofixed(total - val)}`;
          data.products[key].use = total - val;
          data.products[key].num = val;
        } else {
          data.products[key].title = `累计生产:${tofixed(
            total
          )} 终极产物:${tofixed(val)}`;
        }

        // 标签终极产物
        data.products[key].root = true;
      }
      return data;
    }
  },
  filters: {
    numFmt(val) {
      return Number(val.toFixed(3));
    }
  },
  provide() {
    return {
      programUpdate: this.programUpdate,
      settingUpdate: this.settingUpdate,
      productUpdate: this.productUpdate
    };
  },
  methods: {
    changeFilter() {
      const list = [];
      for (let key in this.itemactive) {
        if (this.itemactive[key]) {
          list.push(...this.itemall[key]);
        }
      }
      this.itemfilter = list;
    },
    changeType() {
      const product = this.productdata[this.productname];
      if (product && product.configtype !== this.configtype) {
        this.productUpdate();
        this.programSave();
      }
    },
    changeNum() {
      this.confignum = +(this.confignum + "").replace(/[^\\.0-9]/g, "");
      if (this.confignum === 0) {
        this.confignum = 60;
      }

      const product = this.productdata[this.productname];
      if (product && product.confignum !== this.confignum) {
        this.productUpdate();
        this.programSave();
      }
    },
    programActive(name) {
      const program = this.programdata.find(item => item.name == name) || {
        data: this.productdatadefault
      };
      this.productsetting = loadConfig(
        factorydefault.setting,
        {
          ...factorydefault
        },
        this.programname
      );
      this.productfactorys = getFactorys(this.productsetting);
      this.productdata = program.data;
      // 对切换方案后未加载的数据执行加载
      Object.values(program.data).forEach(product => {
        if (product.data === undefined) {
          this.configtype = product.configtype;
          this.confignum = product.confignum;
          this.configmaterial = product.configmaterial;
          this.productname = product.name;
          this.productUpdate();
        }
      });
      this.productlist = Object.keys(this.productdata);

      // 设置切换方案后产物和配置
      for (const product of Object.values(this.productdata)) {
        this.configtype = product.configtype;
        this.confignum = product.confignum;
        this.configmaterial = product.configmaterial;
        this.productname = product.name;
        program.describe = product.name;
        return;
      }
    },
    programUpdate(data) {
      // 清理被移除方案的配置
      this.programdata.forEach(item => {
        if (!data.find(p => item.name == p.source)) {
          localStorage.removeItem(`${factorydefault.setting}-${item.name}`);
          localStorage.removeItem(`${factorydefault.product}-${item.name}`);
        }
      });

      // 根据name映射创建新的方案组
      this.programdata = data.map(item => {
        let data = {};
        const last = this.programdata.find(p => p.name == item.source);
        if (last) {
          data = last.data;
        }
        // 导入数据
        if (item.import !== undefined) {
          data = item.import.program;
          localStorage.setItem(
            `${factorydefault.setting}-${item.name}`,
            JSON.stringify(item.import.setting)
          );
          localStorage.setItem(
            `${factorydefault.product}-${item.name}`,
            JSON.stringify(item.import.product)
          );
        }
        // 配置重命名
        if (item.source != "" && item.source != item.name) {
          localStorage.setItem(
            `${factorydefault.setting}-${item.name}`,
            localStorage.getItem(`${factorydefault.setting}-${item.source}`)
          );
          localStorage.removeItem(`${factorydefault.setting}-${item.source}`);
          localStorage.setItem(
            `${factorydefault.product}-${item.name}`,
            localStorage.getItem(`${factorydefault.product}-${item.source}`)
          );
          localStorage.removeItem(`${factorydefault.product}-${item.source}`);
        }
        return { name: item.name,describe:item.describe, data };
      });
      this.programSave(true);

      // 重命名当前方案名称
      const old = data.find(i => i.source == this.programname);
      if (old === undefined) {
        this.programname = "";
      } else if (old.source != old.name) {
        this.programname = old.name;
      } else if (old.import) {
        this.programActive(this.programname);
      }
    },
    programData() {
      return this.programdata.map(i => {
        return {
          name: i.name,
          describe: i.describe,
          data: Object.values(i.data).reduce((data, item) => {
            data[item.name] = {
              name: item.name,
              confignum: item.confignum,
              configtype: item.configtype,
              configmaterial: item.configmaterial
            };
            return data;
          }, {})
        };
      });
    },
    programSave(force) {
      if (force || this.programname != "") {
        localStorage.setItem(
          "dsp-programs",
          JSON.stringify(this.programData())
        );
      }
    },
    settingUpdate(name, setting) {
      if (name === this.programname) {
        this.productsetting = setting;
        this.productfactorys = getFactorys(this.productsetting);
        this.productUpdate();
      }
    },

    productChange(el) {
      const product = this.productdata[el.name];
      this.confignum = product.confignum;
      this.configtype = product.configtype;
      this.configmaterial = product.configmaterial;
      this.productname = product.name;
    },
    productRemove(name) {
      this.productlist.splice(this.productlist.indexOf(name), 1);
      delete this.productdata[name];
      if (this.productname === name) {
        const names = this.productlist;
        this.productname = names.length > 0 ? names[names.length - 1] : "";
      }
      this.programSave();
    },
    productSelect(name) {
      if (!name) return;
      this.productname = name;
      this.visibleselect = false;
    },
    productUpdate() {
      const name = this.productname;
      if (!name || !formulaAll[name]) return;
      const config = {
        setting: loadConfig(factorydefault.product, {}, this.programname),
        belt: this.productfactorys["传送带"],
        sprayed: this.productfactorys["增产剂"]
      };
      const data = this.getProductData(
        "root",
        name,
        this.getProductNum(name, this.confignum),
        config
      );

      this.$set(this.productdata, name, {
        name,
        data,
        overview: this.getOverview(data),
        confignum: this.confignum,
        configtype: this.configtype,
        configmaterial: this.configmaterial
      });
      this.productlist = Object.keys(this.productdata);
      // this.$forceUpdate();
    },
    getProductNum(name, num) {
      if (this.configtype === "产量") {
        return num;
      }

      const config = loadConfig(factorydefault.product, {}, this.programname)[
        `root-${name}`
      ] || { formula: 0, sprayed: "" };
      const formula = formulaAll[name][config.formula];
      const sprayed = this.productfactorys["增产剂"];
      const factoryName = formula.mp || formula.m;
      switch (this.configtype) {
        case "设备":
          if (config.sprayed === "extra") {
            num *= sprayed.extra;
          }
          if (config.sprayed === "speedup") {
            num *= sprayed.speedup;
          }
          return (
            (num * 60 * formula.c * this.productfactorys[factoryName].speed) /
            formula.t
          );
        case "传送带":
          return num * 60 * this.productfactorys["传送带"].speed;
        default:
          return num;
      }
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
      const factory = this.productfactorys[formula.mp || formula.m];
      const formulaExec = formula.q.map(item => {
        let state = this.hasMaterial(config, name, item.name);
        if (setting.select.indexOf(item.name) != -1) {
          state = !state;
        }
        return state;
      });

      // 处理增产剂模式、增产剂数量、电力消耗、生产速度、生产次数
      let outenergy = 1;
      let outspeed = factory.speed;
      let outNum = num / formula.c;
      let sprayedMode = setting.sprayed;
      let sprayedNum = 0;
      if (config.sprayed.count == 0) {
        sprayedMode = "none";
      } else if (sprayedMode == "speedup" && formula.p != -1) {
        outenergy = config.sprayed.energy;
        outspeed *= config.sprayed.speedup;
        sprayedNum = (outNum * formula.cq) / config.sprayed.count;
      } else if (sprayedMode == "extra" && formula.p == undefined) {
        outNum /= config.sprayed.extra;
        sprayedNum = (outNum * formula.cq) / config.sprayed.count;
      } else {
        sprayedMode = "none";
      }

      const factoryNum = (outNum / 60 / outspeed) * formula.t;
      const extra1 = (m, o) => {
        if (o.rn !== 0) {
          m[o.name] = (num / formula.c) * o.rn;
        } else if (formula.mp) {
          m[o.name] =
            factoryNum *
            60 *
            this.productfactorys[`${formula.m}_${o.name}`].speed;
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
        power: factory.power * factoryNum * outenergy,
        productName: name,
        productNum: num,
        factoryName:
          factory.name == "矿脉" ? name + factory.name : factory.name,
        factoryFullname: factory.fullname || factory.name,
        factoryNum,
        beltName: config.belt.name,
        beltNum: num / 60 / config.belt.speed,
        sprayedName: config.sprayed.name,
        sprayedNum,
        sprayedMode,
        sprayedType: formula.p,
        extraProduct: formula.s.slice(1).reduce(extra1, {}),
        // TOOD item.name != name
        extraMaterial: formula.q
          .filter((_, i) => !formulaExec[i])
          .filter(item => item.name !== name)
          .reduce(extra2, {}),
        formulaIndex,
        formulaExec,
        formulaAll: formulas,
        formulaMaterial: formula.q
          .filter((_, i) => formulaExec[i])
          .filter(item => item.rn !== 0)
          .filter(item => item.name !== name)
          .map(item =>
            this.getProductData(name, item.name, item.rn * outNum, config)
          )
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
      increment(factorys, data.factoryName, data.factoryNum);

      const materials = overview.materials;
      // 增产剂
      if (data.sprayedNum > 0) {
        increment(materials, data.sprayedName, -data.sprayedNum);
      }
      // 额外产物
      incrementMap(materials, data.extraProduct);
      // 额外原料
      for (const [key, val] of Object.entries(data.extraMaterial)) {
        increment(materials, key, -val);
      }

      data.formulaMaterial.forEach(item => this.getOverview(item, overview));

      if (data.parent == "root") {
        this.autoCollecting(overview);
      }
      return overview;
    },
    autoCollecting(overview) {
      let coll = this.productfactorys["采矿设备"];
      if (coll.name == "无") {
        return;
      }
      coll = this.productfactorys[coll.name];
      for (const [name, num] of Object.entries(overview.factorys)) {
        if (/矿脉$/.test(name)) {
          delete overview.factorys[name];
          const factoryNum = num / coll.speed / 2;
          overview.power += factoryNum * coll.power;
          increment(overview.factorys, coll.name + "矿脉", factoryNum);
        }
      }
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
.img-24 {
  width: 24px;
  height: 24px;
}
.select-img {
}

.el-popper.dsp-form-list .el-scrollbar__wrap {
  max-height: 500px;
}
.el-popover.dsp-form-map {
  background-color: #1c3436;
}
.el-popover.popper-title {
  max-width: 80%;
  padding: 4px;
  min-width: 40px;
  color: #000;
  border-radius: 0;
  font-family: Arial, sans-serif;
  font-size: 12px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
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
  .select-block > * {
    margin-right: 4px;
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
.dsp-menu {
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 0 0 4px 10px;
  }
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
