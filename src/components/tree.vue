<template>
  <div class="tree" v-if="data['名称']" :class="{ vertical }">
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
          :class="{
            'has-children': data['需求产物'] && data['需求产物'].length > 1
          }"
        >
          <div>
            <img :src="data.img" /> {{ data["名称"] }} x
            {{ data["数量"] | numFmt }}
          </div>
          <div>
            <img
              :src="data['设备'].slice(0, 2) === '矿脉' ? data.img : data.sbImg"
            />
            {{ data["设备"] }} x {{ data["设备数"] | numFmt }}
          </div>
          <div>
            <img v-if="data.csdImg" :src="data.csdImg" />{{ data.csdName }} x
            {{ data.csdNum | numFmt }}
          </div>
        </div>
        <div>
          <dl
            class="tree-pf"
            :class="{
              curr:
                ((data.parentName &&
                  config[data.parentName] &&
                  typeof config[data.parentName] === 'object' &&
                  config[data.parentName][data['名称']]) ||
                  0) === i
            }"
            v-for="(item, i) in data.pf"
            :key="i"
            @click.stop="changePf(data, i)"
          >
            <template
              v-if="
                [
                  '采矿机',
                  '轨道采集器',
                  '原油萃取站',
                  '抽水机',
                  '射线接收站'
                ].indexOf(item.m) > -1
              "
            >
              <img :src="imgs[item.m]" />
              <div class="not-time" v-if="item.s && item.s.length > 0">
                <div>→</div>
              </div>
              <div v-for="(jtem, j) in item.s" :key="'s' + j">
                <img :src="imgs[jtem.name]" />
              </div>
            </template>
            <template v-else-if="item.m === '矿脉'">
              <img :src="imgs[data['名称']]" />
              <div class="not-time" v-if="item.s && item.s.length > 0">
                <div>→</div>
              </div>
              <div v-for="(jtem, j) in item.s" :key="'s' + j">
                <img :src="imgs[jtem.name]" />
              </div>
            </template>
            <template v-else>
              <div v-for="(jtem, j) in item.q" :key="'q' + j">
                <img :src="imgs[jtem.name]" /><span>{{ jtem.n }}</span>
              </div>
              <div
                class="time"
                v-if="
                  item.q && item.q.length > 0 && item.s && item.s.length > 0
                "
              >
                <div class="time-num">{{ item.t }} s</div>
                <div>→</div>
              </div>
              <div v-for="(jtem, j) in item.s" :key="'s' + j">
                <img :src="imgs[jtem.name]" /><span>{{ jtem.n || 1 }}</span>
              </div>
            </template>
          </dl>
        </div>
      </el-popover>
    </div>
    <div class="tree-yl" v-if="data['需求产物'] && data['需求产物'].length > 0">
      <div
        class="tree-children"
        :class="{ 'not-line': data['需求产物'].length <= 1 }"
        v-for="(item, i) in data['需求产物']"
        :key="i"
      >
        <tree :data="item" :vertical="vertical" />
      </div>
    </div>
  </div>
</template>

<script>
import imgs from "../data/imgs";
export default {
  name: "Tree",
  props: {
    data: Object,
    vertical: {
      type: Boolean,
      default: false
    }
  },
  inject: ["createPf"],
  filters: {
    numFmt(val) {
      return val
        .toFixed(2)
        .replace(/\.00$/, "")
        .replace(/(\.\d)0$/, "$1");
    }
  },
  data() {
    const configStr = localStorage.getItem("pfConfig");
    let config = {};
    if (configStr) {
      try {
        config = JSON.parse(configStr);
      } catch (e) {
        console.log(e);
      }
    }
    return {
      imgs,
      config,
      visible: false
    };
  },
  methods: {
    changePf(data, i) {
      const configStr = localStorage.getItem("pfConfig");
      let config = {};
      if (configStr) {
        try {
          config = JSON.parse(configStr);
        } catch (e) {
          console.log(e);
        }
      }
      if (
        ((config[data.parentName] &&
          typeof config[data.parentName] === "object" &&
          config[data.parentName][data["名称"]]) ||
          0) !== i
      ) {
        if (
          config[data.parentName] &&
          typeof config[data.parentName] === "object"
        ) {
          config[data.parentName][data["名称"]] = i;
        } else {
          config[data.parentName] = {
            [data["名称"]]: i
          };
        }
        this.config = config;
        localStorage.setItem("pfConfig", JSON.stringify(config));
        this.createPf();
      }
      this.visible = false;
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
  .tree-pf {
    display: flex;
    &.curr {
      background-color: rgba($color: #ffffff, $alpha: 0.3);
    }
    .time {
      margin: 0 5px;
      line-height: 16px;
      font-size: 24px;
      .time-num {
        font-size: 12px;
        line-height: 12px;
      }
      &.not-time {
        line-height: 40px;
      }
    }
    span {
      vertical-align: bottom;
      font-size: 12px;
      line-height: 1em;
    }
  }
  img {
    width: 40px;
    height: 40px;
    vertical-align: top;
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
