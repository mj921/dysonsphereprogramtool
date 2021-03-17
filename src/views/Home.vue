<template>
  <div class="home" :class="{ vertical }">
    <div class="form">
      <div class="select-block">
        <el-select v-model="currWp" filterable placeholder="请选择产物">
          <el-option-group
            v-for="group in list"
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
          v-model="imgSelectVisible"
        >
          <div
            slot="reference"
            class="tree-block"
            :class="{
              'has-children': data['需求产物'] && data['需求产物'].length > 1
            }"
          >
            <el-button type="primary" size="small">选择产物(图片)</el-button>
          </div>
          <div class="select-tabs">
            <dl
              class="select-tab"
              :class="{ curr: selectTab === '组件' }"
              @click="selectTab = '组件'"
            >
              <img src="../assets/component-icon.png" alt="" />
              <span>组件</span>
            </dl>
            <dl
              class="select-tab"
              :class="{ curr: selectTab === '建筑' }"
              @click="selectTab = '建筑'"
            >
              <img src="../assets/factory-icon.png" alt="" />
              <span>建筑</span>
            </dl>
          </div>
          <div class="panel" v-show="selectTab === '组件'">
            <div class="panel-wrapper">
              <dl v-for="i in 7" :key="'row-' + i">
                <dd
                  :class="{
                    curr:
                      wpMap['组件'][`${i}-${j}`] &&
                      wpMap['组件'][`${i}-${j}`] === currWp
                  }"
                  v-for="j in 12"
                  :key="`col-${i}-${j}`"
                  :title="wpMap['组件'][`${i}-${j}`]"
                  @click="selectWp(wpMap['组件'][`${i}-${j}`])"
                >
                  <img
                    v-if="wpMap['组件'][`${i}-${j}`]"
                    :src="imgs[wpMap['组件'][`${i}-${j}`]]"
                  />
                </dd>
              </dl>
            </div>
          </div>
          <div class="panel" v-show="selectTab === '建筑'">
            <div class="panel-wrapper">
              <dl v-for="i in 7" :key="'row-' + i">
                <dd
                  :class="{
                    curr:
                      wpMap['建筑'][`${i}-${j}`] &&
                      wpMap['建筑'][`${i}-${j}`] === currWp
                  }"
                  v-for="j in 12"
                  :key="`col-${i}-${j}`"
                  :title="wpMap['建筑'][`${i}-${j}`]"
                  @click="selectWp(wpMap['建筑'][`${i}-${j}`])"
                >
                  <img
                    v-if="wpMap['建筑'][`${i}-${j}`]"
                    :src="imgs[wpMap['建筑'][`${i}-${j}`]]"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </el-popover>
      </div>
      <el-radio-group v-model="type" @change="typeChange">
        <el-radio label="产量"></el-radio>
        <el-radio label="设备"></el-radio>
        <el-radio label="传送带"></el-radio>
      </el-radio-group>
      <el-input
        style="width: 120px;"
        v-model="num"
        :placeholder="type === '产量' ? '每分钟产量' : '设备数'"
        @blur="inputBlur"
      ></el-input>
      <el-checkbox v-model="vertical">是否水平</el-checkbox>
    </div>
    <el-button @click="visible = true" style="margin-left: 10px;">
      查看总览
    </el-button>
    <el-button @click="configVisible = true" style="margin-left: 10px;">
      参数配置
    </el-button>
    <el-button @click="clearCache" style="margin-left: 10px;">
      重置默认值
    </el-button>
    (tip:传送带按产物计算)
    <br />
    <el-tabs
      v-show="tabList.length > 0"
      :value="currWp"
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
        <el-button @click="tabStaticVisible = true" style="margin-left: 10px;">
          查看当前产物总览
        </el-button>
        <tree :data="tabMap[item].data" :vertical="vertical" />
      </el-tab-pane>
    </el-tabs>
    <show-static
      v-if="tabMap[currWp]"
      :visible.sync="tabStaticVisible"
      :yl="tabMap[currWp].yl"
      :sb="tabMap[currWp].sb"
      :imgs="imgs"
      :total-power="tabMap[currWp].totalPower"
    />
    <show-static
      :visible.sync="visible"
      :yl="yl"
      :sb="sb"
      :imgs="imgs"
      :total-power="totalPower"
    />
    <el-dialog title="参数配置" :visible.sync="configVisible" width="800px">
      <el-form label-width="140px" inline size="mini">
        <el-form-item label="制作台">
          <el-select
            v-model="sbConfig['制作台']"
            filterable
            placeholder="请选择制作台"
          >
            <el-option
              v-for="(item, i) in sbMap['制作台']"
              :key="i"
              :label="item.name"
              :value="i"
            >
              <img class="select-img" :src="imgs[item.name]" />{{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in [
            '原油萃取站',
            '轨道采集器_氢',
            '轨道采集器_重氢',
            '轨道采集器_可燃冰',
            '抽水机',
            '采矿机',
            '矿脉'
          ]"
          :key="item"
          :label="item"
        >
          <el-input v-model="sbConfig[item]" @input="iptHandle(item)">
            <template slot="append">/ s</template>
          </el-input>
        </el-form-item>
        <el-form-item label="传送带">
          <el-select
            v-model="sbConfig['传送带']"
            filterable
            placeholder="请选择传送带"
          >
            <el-option
              v-for="(item, i) in sbMap['传送带']"
              :key="i"
              :label="item.name"
              :value="i"
            >
              <img
                v-if="imgs[item.name]"
                class="select-img"
                :src="imgs[item.name]"
              />{{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传送带运力" v-if="sbConfig['传送带'] === 3">
          <el-input
            v-model="sbConfig['自定义传送带']"
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
import pf from "../data/pf1";
import { getSbInfo, defSb, sbMap } from "../data/sb";
import wp from "../data/data";
import Tree from "../components/tree";
import ShowStatic from "../components/showStatic";

export default {
  name: "Home",
  components: {
    Tree,
    ShowStatic
  },
  data() {
    const list = [];
    const imgs = {};
    const wpMap = {};
    for (let key in wp) {
      wpMap[key] = {};
      list.push({
        name: key,
        options: wp[key].map(item => {
          const arr = item.name.split("-");
          const name = arr[arr.length - 1];
          imgs[name] = "data:image/png;base64," + item.value;
          wpMap[key][arr.slice(0, 2).join("-")] = name;
          return {
            value: name,
            label: name
          };
        })
      });
    }
    const sbConfigStr = localStorage.getItem("sbConfig");
    let sbConfig = defSb;
    if (sbConfigStr) {
      try {
        sbConfig = { ...sbConfig, ...JSON.parse(sbConfigStr) };
      } catch (e) {
        console.log(e);
      }
    }
    return {
      list,
      wp,
      wpMap,
      imgs,
      currWp: "",
      data: {},
      vertical: false,
      type: "产量",
      num: 60,
      visible: false,
      configVisible: false,
      sbConfig,
      sbMap,
      selectTab: "组件",
      imgSelectVisible: false,
      tabList: [],
      tabMap: {},
      tabStaticVisible: false
    };
  },
  watch: {
    currWp(val) {
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
    tabChange(el) {
      this.currWp = el.name;
      this.num = this.tabMap[el.name].num;
      this.type = this.tabMap[el.name].type;
    },
    removeTab(name) {
      this.tabList.splice(this.tabList.indexOf(name), 1);
      delete this.tabMap[name];
      if (this.currWp === name) {
        this.currWp = this.tabList.length > 0 ? this.tabList[0] : "";
      }
    },
    selectWp(wp) {
      if (!wp) return;
      this.currWp = wp;
      this.imgSelectVisible = false;
    },
    iptHandle(type) {
      this.sbConfig[type] = this.sbConfig[type]
        .replace(/[^.0-9]/g, "")
        .replace(/^(\d*\.\d*)[^0-9]/, "$1")
        .replace(/^\.+/, "");
    },
    cancel() {
      const sbConfigStr = localStorage.getItem("sbConfig");
      let sbConfig = defSb;
      if (sbConfigStr) {
        try {
          sbConfig = { ...sbConfig, ...JSON.parse(sbConfigStr) };
        } catch (e) {
          console.log(e);
        }
      }
      this.sbConfig = sbConfig;
      this.configVisible = false;
    },
    save() {
      localStorage.setItem("sbConfig", JSON.stringify(this.sbConfig));
      this.configVisible = false;
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
        this.tabMap[this.currWp] &&
        this.tabMap[this.currWp].num === this.num &&
        this.tabMap[this.currWp].type === this.type
      ) {
        return;
      }
      this.num = +(this.num + "").replace(/[^0-9]/g, "");
      if (!this.currWp || !pf[this.currWp]) return;
      const configStr = localStorage.getItem("pfConfig");
      let config = {};
      if (configStr) {
        try {
          config = JSON.parse(configStr);
        } catch (e) {
          console.log(e);
        }
      }
      const obj =
        pf[this.currWp][(config.root && config.root[this.currWp]) || 0];
      let num, csd;
      switch (this.type) {
        case "产量":
          num = this.num;
          break;
        case "设备":
          num =
            ((this.num * obj.chanliang * 60) / obj.t) * getSbInfo(obj.m).speed;
          break;
        case "传送带":
          csd = getSbInfo("传送带");
          if (this.sbConfig["传送带"] === 3) {
            csd = {
              name: `自定义传送带(${this.sbConfig["自定义传送带"]}/s)`,
              speed: this.sbConfig["自定义传送带"]
            };
          }
          num = this.num * 60 * csd.speed;
          break;
        default:
          num = this.num;
      }
      const data = this.getPf(this.currWp, num);
      const [yl1, sb1, totalPower] = this.getYl(data);
      const yl = Object.keys(yl1).map(key => ({
        name: key,
        ...yl1[key]
      }));
      const sb = Object.keys(sb1).map(key => ({
        name: key,
        num: sb1[key]
      }));
      if (!this.tabMap[this.currWp]) {
        this.tabList.push(this.currWp);
      }
      this.tabMap[this.currWp] = {
        data,
        yl,
        sb,
        totalPower,
        num: this.num,
        type: this.type
      };
      this.$forceUpdate();
    },
    getPf(name, num = 60, parentName = "root") {
      const configStr = localStorage.getItem("pfConfig");
      let config = {};
      if (configStr) {
        try {
          config = JSON.parse(configStr);
        } catch (e) {
          console.log(e);
        }
      }
      const parentConfig = config[parentName];
      const currPf = JSON.parse(JSON.stringify(pf[name]));
      const obj =
        currPf[
          (parentConfig &&
            typeof parentConfig === "object" &&
            parentConfig[name]) ||
            0
        ];
      const q = obj.q;
      const m = obj.m;
      const sb = getSbInfo(m, name);
      const speed = sb.speed;
      const sbNum = ((num / 60 / speed) * obj.t) / (obj.chanliang || 1);
      let csd = getSbInfo("传送带");
      if (this.sbConfig["传送带"] === 3) {
        csd = {
          name: `自定义传送带(${this.sbConfig["自定义传送带"]}/s)`,
          speed: this.sbConfig["自定义传送带"]
        };
      }
      const csdNum = num / 60 / csd.speed;
      // const r = num * obj.t
      return {
        名称: name,
        数量: num,
        设备: sb.name,
        设备数: sbNum,
        需求产物: q
          .filter(item => item.name !== name)
          .map(item => {
            return this.getPf(
              item.name,
              (item.n * num) / (obj.chanliang || 1),
              name
            );
          }),
        base: obj.base,
        img: this.imgs[name],
        sbImg: this.imgs[sb.baseName || sb.name],
        pf: currPf,
        csdNum,
        csdName: csd.name,
        csdImg: this.imgs[csd.name],
        parentName,
        power: sb.power * sbNum
      };
    },
    getYl(map, cache = {}, sb = {}, totalPower = { num: 0 }) {
      if (cache[map["名称"]]) {
        cache[map["名称"]].num += map["数量"];
        cache[map["名称"]].sbNum += map["设备数"];
      } else {
        cache[map["名称"]] = {};
        cache[map["名称"]].num = map["数量"];
        cache[map["名称"]].sbName = map["设备"];
        cache[map["名称"]].sbNum = map["设备数"];
      }
      let sbName = map["设备"];
      if (/^矿脉/.test(sbName)) {
        sbName = map["名称"] + sbName;
      }
      if (sb[sbName]) {
        sb[sbName] += map["设备数"];
      } else {
        sb[sbName] = map["设备数"];
      }
      totalPower.num += map.power;
      map["需求产物"].forEach(item => {
        this.getYl(item, cache, sb, totalPower);
      });
      return [cache, sb, totalPower.num];
    },
    getBaseYl(map, cache = {}) {
      if (map.base || !map["需求产物"] || map["需求产物"].length === 0) {
        if (cache[map["名称"]]) {
          cache[map["名称"]] += map["数量"];
        } else {
          cache[map["名称"]] = map["数量"];
        }
      }
      map["需求产物"].forEach(item => {
        this.getBaseYl(item, cache);
      });
      return cache;
    },
    clearCache() {
      localStorage.removeItem("pfConfig");
      localStorage.removeItem("sbConfig");
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
  &.vertical {
    width: 7000px;
  }
}
.panel {
  background-color: #1c3436;
  .panel-wrapper {
    display: flex;
    flex-direction: column;
    width: 768px;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: 2px;
    dl {
      display: flex;
      margin: 0;
      dd {
        width: 60px;
        margin: 0;
        background-color: #1c3436;
        margin: 2px;
        height: 60px;
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
