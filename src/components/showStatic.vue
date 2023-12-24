<template>
  <el-dialog title="总览" :visible.sync="_visible" class="dsp-overview">
    <div class="text">
      总耗电大约：{{ overview.power | numFmt }} M
      <span
        v-if="overview.products['临界光子-射线接收站']"
        title="实际接受戴森球发电量受到能量散失影响"
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 戴森球大约：{{
          ((overview.products["临界光子-射线接收站"].num * 2000) /
            (100 - dissipation))
            | numFmt
        }}
        M
      </span>
      <div v-for="name in ['冰巨采集器', '气巨采集器']" :key="'warn' + name">
        <span v-if="overview.factorys[name] > 40">
          {{ name }} x
          {{ overview.factorys[name] | numFmt }}
          数量大于40，巨行星资源速度差异会影响采集速度计算准确性。
        </span>
      </div>
    </div>
    <div class="all">
      <div>
        <dl v-for="(item, key) in overview.products" :key="key">
          <img :src="imgs[item.name]" alt="" />
          <span style="color: #f50a0a;">
            {{ item.name }} x {{ item.num }}
          </span>
          <img :src="imgs[item.factoryName.replace('矿脉', '')]" alt="" />
          {{ item.factoryFullname }} x {{ item.factoryNum | numFmt }}
        </dl>
      </div>
      <div>
        <dl
          v-for="item in sortFactorys"
          :key="'f' + item.key"
          :title="
            item.key.indexOf('矿脉') != -1
              ? '需要开采的矿脉 大型采矿机双倍效率'
              : '生产设备'
          "
        >
          <img :src="imgs[item.name]" alt="" />
          {{ item.key }} x {{ item.num | numFmt }}
        </dl>
        <dl
          v-for="(num, name) in overview.materials"
          :key="'m' + name"
          :style="num > 0 ? 'color: #f50a0a' : 'color: #0ac62a'"
          :title="num > 0 ? '额外的产物' : '额外的原料'"
        >
          <img :src="imgs[name.replace('矿脉', '')]" />
          {{ name }} x {{ num | numFmt }}
        </dl>
      </div>
    </div>
    <span slot="footer">
      <el-button @click="_visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    overview: Object,
    factory: Array,
    dissipation: Number,
    imgs: Object,
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sortFactorys() {
      const vals = [];
      for (let key in this.overview.factorys) {
        const name = key.replace("矿脉", "");
        vals.push({
          key,
          name,
          num: this.overview.factorys[key],
          index: this.factory.indexOf(name)
        });
      }
      vals.sort((a, b) => a.index - b.index);
      return vals;
    },
    _visible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  filters: {
    numFmt(val) {
      if (!val) return 0;
      return val
        .toFixed(2)
        .replace(/\.00$/, "")
        .replace(/(\.\d)0$/, "$1");
    }
  }
};
</script>
<style lang="scss" scoped>
.dsp-overview {
  :deep(.el-dialog) {
    max-width: 800px;
  }
  .text {
    white-space: normal;
  }
  .all {
    display: flex;
    flex-direction: row;
    color: #f5c62a;
    & > * {
      flex-grow: 1;
    }
  }
  @media screen and (max-width: 600px) {
    :deep(.el-dialog) {
      width: 90%;
    }
    .all {
      flex-direction: column;
    }
  }
}
</style>
