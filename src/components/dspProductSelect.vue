<template>
  <el-popover
    v-model="_visible"
    popper-class="dsp-form-map"
    trigger="click"
    content="viewport"
    :placement="width > 800 ? 'top' : 'left'"
  >
    <template slot="reference">
      <slot></slot>
    </template>
    <div class="select-tabs">
      <dl
        v-for="(val, key) in itemall.map"
        class="select-tab"
        :class="{ curr: itemtab === key }"
        :key="key"
        @click="itemtab = key"
      >
        <img v-if="key == 'items'" src="../assets/component-icon.png" alt="" />
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
        <dl v-for="i in 8" :key="`${item}-row-${i}`">
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
</template>
<script>
import productAll from "@/data/data";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    productname: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: window.innerWidth
    },
    imgs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const itemmap = {};
    for (let key in productAll.map) {
      itemmap[key] = {};
      productAll[key].forEach(i => {
        const arr = i.split("-");
        const name = arr[arr.length - 1];
        itemmap[key][arr.slice(0, 2).join("-")] = name;
      });
    }
    return {
      itemfilter: [],
      itemactive: {},
      itemmap,
      itemtab: "items",
      itemall: productAll
    };
  },
  computed: {
    _visible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
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
    productSelect(name) {
      this.$emit("select", name);
    }
  }
};
</script>
<style lang="scss">
.el-popover.dsp-form-map {
  background-color: #1c3436;
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
    @media screen and (max-width: 600px) {
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
