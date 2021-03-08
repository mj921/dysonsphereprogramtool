<template>
  <div class="home" :class="{ vertical }">
    <div class="form">
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
      <el-radio-group v-model="type" @change="typeChange">
        <el-radio label="产量"></el-radio>
        <el-radio label="设备"></el-radio>
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
    <br />
    <tree :data="data" :vertical="vertical" />
    <el-dialog title="总览" :visible.sync="visible" width="700px">
      <div class="all">
        <div>
          <dl v-for="(item, i) in yl" :key="i">
            <img :src="imgs[item.name]" alt="" />
            <span style="color: #f50a0a;">
              {{ item.name }} x {{ item.num }}
            </span>
            <img
              :src="
                /^矿脉/.test(item.sbName)
                  ? imgs[item.name]
                  : imgs[item.sbName.replace(/\([^\)]*\)/, '')]
              "
              alt=""
            />{{ item.sbName }} x {{ item.sbNum | numFmt }}
          </dl>
        </div>
        <div>
          <dl v-for="(item, i) in sb" :key="i">
            <img
              :src="
                /矿脉/.test(item.name)
                  ? imgs[item.name.slice(0, item.name.indexOf('矿脉'))]
                  : imgs[item.name.replace(/\([^\)]*\)/, '')]
              "
              alt=""
            />
            {{ item.name }} x {{ item.num | numFmt }}
          </dl>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="参数配置" :visible.sync="configVisible" width="700px">
      <el-form label-width="100px" inline size="mini">
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
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in [
            '原油萃取站',
            '轨道采集器',
            '抽水机',
            '采矿机',
            '矿脉'
          ]"
          :key="item"
          :label="item"
        >
          <el-input
            v-model="sbConfig[item]"
            @input="iptHandle(item)"
          ></el-input>
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

export default {
  name: "Home",
  components: {
    Tree
  },
  data() {
    const list = [];
    const imgs = {};
    for (let key in wp) {
      list.push({
        name: key,
        options: wp[key].map(item => {
          const arr = item.name.split("-");
          const name = arr[arr.length - 1];
          imgs[name] = "data:image/png;base64," + item.value;
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
        sbConfig = JSON.parse(sbConfigStr);
      } catch (e) {
        console.log(e);
      }
    }
    return {
      list,
      wp,
      imgs,
      currWp: "",
      data: {},
      vertical: false,
      type: "产量",
      num: 60,
      yl: [],
      sb: [],
      visible: false,
      configVisible: false,
      sbConfig,
      sbMap
    };
  },
  watch: {
    currWp(val) {
      if (val) {
        this.createPf();
      }
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
          sbConfig = JSON.parse(sbConfigStr);
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
    createPf() {
      this.num = +(this.num + "").replace(/[^0-9]/g, "");
      if (!this.currWp) return;
      if (this.type === "产量") {
        this.data = this.getPf(this.currWp, this.num);
      } else {
        const configStr = localStorage.getItem("pfConfig");
        let config = {};
        if (configStr) {
          try {
            config = JSON.parse(configStr);
          } catch (e) {
            console.log(e);
          }
        }
        const obj = pf[this.currWp][config[this.currWp] || 0];
        this.data = this.getPf(
          this.currWp,
          ((this.num * obj.chanliang * 60) / obj.t) * getSbInfo(obj.m).speed
        );
      }
      const [yl, sb] = this.getYl(this.data);
      this.yl = Object.keys(yl).map(key => ({
        name: key,
        ...yl[key]
      }));
      this.sb = Object.keys(sb).map(key => ({
        name: key,
        num: sb[key]
      }));
      console.log("配方：", this.data);
      console.log("原料：", yl);
      console.log("基础原料：", this.getBaseYl(this.data));
    },
    getPf(name, num = 60) {
      const configStr = localStorage.getItem("pfConfig");
      let config = {};
      if (configStr) {
        try {
          config = JSON.parse(configStr);
        } catch (e) {
          console.log(e);
        }
      }
      const currPf = JSON.parse(JSON.stringify(pf[name]));
      console.log(currPf);
      const obj = currPf[config[name] || 0];
      const q = obj.q;
      const m = obj.m;
      const sb = getSbInfo(m);
      console.log(sb);
      const speed = sb.speed;
      const sbNum = ((num / 60 / speed) * obj.t) / (obj.chanliang || 1);
      // const r = num * obj.t
      return {
        名称: name,
        数量: num,
        设备: sb.name,
        设备数: sbNum,
        需求产物: q
          .filter(item => item.name !== name)
          .map(item => {
            return this.getPf(item.name, (item.n * num) / (obj.chanliang || 1));
          }),
        base: obj.base,
        img: this.imgs[name],
        sbImg: this.imgs[sb.baseName || sb.name],
        pf: currPf
      };
    },
    getYl(map, cache = {}, sb = {}) {
      console.log(map, cache, sb);
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
      console.log(map, cache, sb);
      map["需求产物"].forEach(item => {
        this.getYl(item, cache, sb);
      });
      return [cache, sb];
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
    }
  },
  created() {
    // const aa = this.getPf("宇宙矩阵")
    // console.log(aa);
    // console.log(this.getYl(aa));
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #000;
  min-height: 100vh;
  width: 1800px;
  &.vertical {
    width: 7000px;
  }
}
.all {
  color: #f5c62a;
  display: flex;
  & > * {
    flex-grow: 1;
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
</style>
<style lang="scss"></style>
