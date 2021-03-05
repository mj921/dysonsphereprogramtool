<template>
  <div class="home" :class="{ vertical }">
    <div class="form">
      <el-select v-model="currWp" filterable>
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="!!item.disabled"
        >
        </el-option>
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
    <br />
    <tree :data="data" :vertical="vertical" />
  </div>
</template>

<script>
import pf from "../data/pf1";
import getSpeed from "../data/sb";
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
        value: key,
        label: key,
        disabled: true
      });
      wp[key].forEach(item => {
        const arr = item.name.split("-");
        const name = arr[arr.length - 1];
        imgs[name] = "data:image/png;base64," + item.value;
        list.push({
          value: name,
          label: name
        });
      });
    }
    return {
      list,
      wp,
      imgs,
      currWp: "",
      data: {},
      vertical: false,
      type: "产量",
      num: 60
    };
  },
  watch: {
    currWp(val) {
      if (val) {
        this.createPf();
      }
    }
  },
  provide() {
    return {
      createPf: this.createPf
    };
  },
  methods: {
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
        console.log(
          ((this.num * obj.chanliang) / obj.t) * getSpeed(obj.m).speed
        );
        this.data = this.getPf(
          this.currWp,
          ((this.num * obj.chanliang * 60) / obj.t) * getSpeed(obj.m).speed
        );
      }
      console.log("配方：", this.data);
      console.log("原料：", this.getYl(this.data));
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
      const obj = pf[name][config[name] || 0];
      const q = obj.q;
      const m = obj.m;
      const sb = getSpeed(m);
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
        pf: pf[name]
      };
    },
    getYl(map, cache = {}) {
      if (cache[map["名称"]]) {
        cache[map["名称"]] += map["数量"];
      } else {
        cache[map["名称"]] = map["数量"];
      }
      map["需求产物"].forEach(item => {
        this.getYl(item, cache);
      });
      return cache;
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
</style>
<style lang="scss">
.form {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  .el-input {
    .el-input__inner {
      background-color: #000;
      border-color: #f5c62a;
      color: #f5c62a;
      &::placeholder {
        color: rgba($color: #f5c62a, $alpha: 0.7);
      }
    }
  }

  .el-select .el-input {
    .el-select__caret {
      color: #f5c62a;
    }
    &.is-focus {
      .el-input__inner {
        border-color: #f5c62a;
      }
    }
  }
  .el-radio {
    color: rgba($color: #f5c62a, $alpha: 0.6);
    .el-radio__input {
      .el-radio__inner {
        border-color: rgba($color: #f5c62a, $alpha: 0.6);
        background-color: #000;
      }
    }
    &.is-checked {
      .el-radio__input {
        &.is-checked {
          & + .el-radio__label {
            color: #f5c62a;
          }
          .el-radio__inner {
            background-color: #f5c62a;
            &::after {
              background-color: #000;
            }
          }
        }
      }
    }
  }
  .el-checkbox {
    color: rgba($color: #f5c62a, $alpha: 0.6);
    .el-checkbox__input {
      .el-checkbox__inner {
        background-color: #000;
        border-color: rgba($color: #f5c62a, $alpha: 0.6);
      }
      &.is-checked {
        & + .el-checkbox__label {
          color: #f5c62a;
        }
        .el-checkbox__inner {
          background-color: #f5c62a;
          border-color: #f5c62a;
        }
      }
    }
  }
}
.el-select-dropdown {
  background-color: #000 !important;
  border-color: #f5c62a !important;
  .el-select-dropdown__item {
    color: #f5c62a;
    &.is-disabled {
      color: rgba($color: #f5c62a, $alpha: 0.6);
      &.hover,
      &:hover {
        color: rgba($color: #f50a0a, $alpha: 0.6);
      }
    }
    &.selected {
      color: #f50a0a;
    }
    &.hover,
    &:hover {
      background-color: rgb(241, 234, 126) !important;
      color: #f50a0a;
    }
  }
}
</style>
