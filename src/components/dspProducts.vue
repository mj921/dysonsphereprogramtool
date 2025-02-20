<template>
  <div class="tree" v-if="data.productName" :class="{ vertical }">
    <div class="tree-wrapper">
      <el-popover
        v-model="visible"
        placement="right"
        trigger="click"
        popper-class="tree-popper"
      >
        <div
          slot="reference"
          class="tree-block"
          :class="{ 'has-children': data.formulaMaterial.length > 1 }"
        >
          <div :class="`sprayed-${data.sprayedMode}`">
            <img :src="imgs[data.productName]" />
            {{ data.productName }} x {{ data.productNum | numFmt }}
          </div>
          <template v-if="simple">
            <div>
              <img :src="imgs[data.factoryName.replace('矿脉', '')]" />
              {{ data.factoryFullname }} x {{ data.factoryNum | numFmt }}
            </div>
            <div>
              <img v-if="imgs[data.beltName]" :src="imgs[data.beltName]" />
              {{ data.beltName }} x {{ data.beltNum | numFmt }}
            </div>
            <div
              v-if="data.sprayedMode != 'none'"
              :set="(sprayed = factorys['增产剂'])"
            >
              <img :src="imgs[sprayed.name]" />
              <template v-if="data.sprayedMode == 'speedup'">
                加速{{ sprayed.speedup * 100 - 100 }}%
              </template>
              <template v-else> 增产{{ sprayed.extra * 100 - 100 }}% </template>
              x {{ data.sprayedNum | numFmt }}
            </div>
            <div v-for="(num, name) in data.extraProduct" :key="'s' + name">
              <img :src="imgs[name]" />
              {{ name }} x {{ num | numFmt }}
            </div>
            <div v-for="(num, name) in data.extraMaterial" :key="'q' + name">
              <img :src="imgs[name]" />
              {{ name }} x {{ -num | numFmt }}
            </div>
          </template>
        </div>
        <div>
          <dl v-if="data.sprayedType != -1" class="sprayed-options">
            <span
              v-for="(item, i) in getProductList(data)"
              :key="item"
              @click.stop="changeSprayed(data, i)"
            >
              {{ item }}
            </span>
          </dl>
          <dl
            v-for="(item, i) in data.formulaAll"
            :key="i"
            class="tree-pf"
            :class="{ curr: data.formulaIndex === i }"
            @click.stop="changeFormula(data, i)"
            :title="item.title"
          >
            <template v-if="item.q.length > 0">
              <div v-for="(jtem, j) in item.q" :key="'q' + j">
                <img v-if="item.m == '射线接收站'" :src="imgs['射线接收站']" />
                <template v-if="data.formulaIndex === i">
                  <img
                    :src="imgs[jtem.name]"
                    :class="{ drak: !data.formulaExec[j] }"
                    @click="changeState(data, jtem.name)"
                  /><span>{{ jtem.n }}</span>
                </template>
                <template v-else>
                  <img :src="imgs[jtem.name]" />
                  <span>{{ jtem.n }}</span>
                </template>
              </div>
              <div class="time">
                <div class="time-num">{{ item.t }} s</div>
                <div>→</div>
              </div>
              <div v-for="(jtem, j) in item.s" :key="'s' + j">
                <img
                  v-if="data.formulaIndex == i && j == 0 && item.q.length > 0"
                  :src="imgs[jtem.name]"
                  @click="changeStateAll(data)"
                />
                <img v-else :src="imgs[jtem.name]" />
                <span>{{ jtem.n }}</span>
              </div>
            </template>
            <template v-else>
              <div v-if="item.m === '矿脉' || item.m === '黑雾残骸'">
                <img :src="imgs[data.productName]" />
              </div>
              <div v-else>
                <img :src="imgs[item.m]" />
              </div>
              <div class="time">
                <div class="time-num">{{ item.t }} s</div>
                <div>→</div>
              </div>
              <div v-for="(jtem, j) in item.s" :key="'s' + j">
                <img :src="imgs[jtem.name]" />
                <span v-if="item.mp">
                  {{ factorys[`${item.m}_${jtem.name}`].speed | numFmt }}
                </span>
                <span v-else>{{ factorys[item.m].speed | numFmt }}</span>
              </div>
            </template>
          </dl>
        </div>
      </el-popover>
    </div>
    <div class="tree-yl" v-if="data.formulaMaterial.length > 0">
      <div
        class="tree-children"
        :class="{ 'not-line': data.formulaMaterial.length <= 1 }"
        v-for="(item, i) in data.formulaMaterial"
        :key="i"
      >
        <dsp-products
          :data="item"
          :factorys="factorys"
          :program="program"
          :vertical="vertical"
          :simple="simple"
        />
      </div>
    </div>
  </div>
</template>
<script>
import imgs from "../data/imgs";
import { factorydefault, loadConfig } from "../data/sb";
export default {
  name: "dspProducts",
  props: {
    data: Object,
    factorys: Object,
    program: String,
    vertical: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  inject: ["productUpdate"],
  filters: {
    numFmt(val) {
      return Number(val.toFixed(3));
    }
  },
  data() {
    return {
      imgs: imgs,
      visible: false
    };
  },
  methods: {
    getProductList(data) {
      const sprayed = this.factorys["增产剂"];
      if (sprayed === undefined || sprayed.count == 0) {
        return ["未设置增产剂参数"];
      }
      if (data.sprayedType == 1) {
        return ["无", `加速${sprayed.speedup * 100 - 100}%`];
      }
      return [
        "无",
        `加速${sprayed.speedup * 100 - 100}%`,
        `增产${sprayed.extra * 100 - 100}%`
      ];
    },
    changeState(data, item) {
      this.changeData(`${data.parent}-${data.productName}`, config => {
        const pos = config.select.indexOf(item);
        if (pos == -1) {
          config.select.push(item);
        } else {
          config.select.splice(pos, 1);
        }
      });
    },
    changeStateAll(data) {
      this.changeData(`${data.parent}-${data.productName}`, config => {
        if (config.select.length == 0) {
          config.select = data.formulaAll[data.formulaIndex].q.map(
            item => item.name
          );
        } else {
          config.select = [];
        }
      });
    },
    changeSprayed(data, i) {
      const mode = ["none", "speedup", "extra"];
      if (data.sprayedMode != mode[i]) {
        this.changeData(
          `${data.parent}-${data.productName}`,
          config => (config.sprayed = mode[i])
        );
      }
    },
    changeFormula(data, i) {
      if (data.formulaIndex != i) {
        this.changeData(
          `${data.parent}-${data.productName}`,
          config => (config.formula = i)
        );
      }
    },
    changeData(name, fn) {
      const key = this.program
        ? `${factorydefault.product}-${this.program}`
        : factorydefault.product;
      const config = loadConfig(key, {});
      if (!config[name]) {
        config[name] = { formula: 0, sprayed: "", select: [] };
      }

      fn(config[name]);
      if (
        config[name].formula == 0 &&
        config[name].sprayed == "" &&
        config[name].select.length == 0
      ) {
        delete config[name];
      }

      localStorage.setItem(key, JSON.stringify(config));
      this.visible = false;
      this.productUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
.tree {
  display: flex;
  background-color: #000;
  color: #f0e293;
  font-size: 12px;
  width: 100%;
  align-items: center;
  .tree-wrapper {
    padding: 5px;
    align-items: center;
    display: flex;
    .tree-block {
      border-radius: 5px;
      padding: 8px;
      box-shadow: 0 0 3px 1px rgba($color: #f5c62a, $alpha: 1);
      line-height: 20px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: top;
      }
      .sprayed-speedup {
        color: #ffb377;
      }
      .sprayed-extra {
        color: #6affff;
      }
      &.has-children {
        margin-right: 10px;
        position: relative;
        &::after {
          position: absolute;
          height: 1px;
          top: 50%;
          right: -13px;
          width: 10px;
          background-color: #f5c62a;
          content: "";
        }
      }
    }
  }
  .tree-yl {
    padding: 5px;
    display: flex;
    flex-direction: column;
    .tree-children {
      position: relative;
      padding-left: 8px;
      flex-shrink: 0;
      &::before {
        position: absolute;
        height: 1px;
        top: 50%;
        left: -4px;
        width: 10px;
        background-color: #f5c62a;
        content: "";
      }
      &::after {
        position: absolute;
        height: 100%;
        top: 0;
        left: -5px;
        width: 1px;
        background-color: #f5c62a;
        content: "";
      }
      &:first-child::after {
        top: 50%;
        height: 50%;
      }
      &:last-child::after {
        height: 50%;
      }
      &.not-line::after {
        display: none;
      }
    }
  }
  &.vertical {
    display: inline-flex;
    flex-direction: column;
    width: auto;
    .tree-wrapper {
      justify-content: center;
      flex-grow: 1;
      .tree-block {
        &.has-children {
          margin-bottom: 10px;
          margin-right: 0;
          &::after {
            width: 1px;
            right: auto;
            left: 50%;
            top: auto;
            bottom: -13px;
            height: 10px;
          }
        }
      }
    }
    .tree-yl {
      flex-direction: row;
      display: inline-flex;
      .tree-children {
        padding-top: 8px;
        padding-left: 0;
        &::before {
          width: 1px;
          left: 50%;
          top: -4px;
          height: 10px;
        }
        &::after {
          width: 100%;
          left: 0;
          top: -5px;
          height: 1px;
        }
        &:first-child::after {
          left: 50%;
          width: 50%;
        }
        &:last-child::after {
          width: 50%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-popover.tree-popper {
  border-radius: 5px;
  padding: 8px;
  line-height: 40px;
  font-size: 18px;
  background-color: #000;
  box-shadow: 0 0 3px 1px rgba($color: #f5c62a, $alpha: 1);
  border: none;
  color: #dcdcdc;
  .sprayed-options {
    margin: 0;
    span {
      display: inline-block;
      margin-right: 8px;
      min-width: 32px;
      text-align: center;
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
  &[x-placement^="right"] {
    .popper__arrow {
      border-right-color: #f5c62a !important;
      &::after {
        border-right-color: #000 !important;
      }
    }
  }
  &[x-placement^="left"] {
    .popper__arrow {
      border-left-color: #f5c62a !important;
      &::after {
        border-left-color: #000 !important;
      }
    }
  }
}
</style>
