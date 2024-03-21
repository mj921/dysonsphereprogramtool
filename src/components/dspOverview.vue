<template>
  <el-dialog
    :title="'总览 ' + title"
    :visible.sync="_visible"
    class="dsp-overview"
  >
    <div class="text">
      <div>
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
      </div>
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
        <template v-for="(item, key) in overview.products">
          <dl v-if="item.root || showall" :key="key">
            <img :src="imgs[item.name]" alt="" />
            <span v-if="item.title" style="color: #f50a0a;">
              <el-popover
                placement="bottom-start"
                trigger="hover"
                popper-class="popper-title"
                :content="item.title"
              >
                <span slot="reference">
                  {{ item.name }} x {{ item.num | numFmt }}
                  <template v-if="item.use">({{ item.use | numFmt }})</template>
                </span>
              </el-popover>
            </span>
            <span
              v-else
              style="color: #f50a0a;"
              @touchstart="touch = item.name"
            >
              {{ item.name }} x {{ item.num | numFmt }}
            </span>
            <img :src="imgs[item.factoryName.replace('矿脉', '')]" alt="" />
            {{ item.factoryFullname }} x {{ item.factoryNum | numFmt }}
          </dl>
        </template>
      </div>
      <div>
        <dl v-for="item in sortFactorys" :key="'f' + item.key">
          <el-popover
            placement="bottom-start"
            trigger="hover"
            popper-class="popper-title"
            :content="item.key | titleFactory"
          >
            <span slot="reference">
              <img :src="imgs[item.name]" alt="" />
              {{ item.key }} x {{ item.num | numFmt }}
            </span>
          </el-popover>
        </dl>
        <dl
          v-for="(num, name) in overview.materials"
          :key="'m' + name"
          :style="num < 0 ? 'color: #0ac62a' : 'color: #f50a0a'"
        >
          <el-popover
            placement="bottom-start"
            trigger="hover"
            popper-class="popper-title"
            :content="num | titleMaterial"
          >
            <span slot="reference">
              <img :src="imgs[name.replace('矿脉', '')]" />
              {{ name }} x {{ num | numFmt }}
            </span>
          </el-popover>
        </dl>
      </div>
    </div>
    <span slot="footer">
      <el-button v-if="overall" @click="showall = !showall">
        {{ showall ? "隐藏中间产物" : "显示中间产物" }}
      </el-button>
      <el-button v-if="overall" @click="showfactory = !showfactory">
        {{ showfactory ? "隐藏工厂" : "显示工厂" }}
      </el-button>
      <el-button @click="_visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    overview: Object,
    overall: Boolean,
    factory: Array,
    title: String,
    dissipation: Number,
    imgs: Object,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showall: true,
      showfactory: true
    };
  },
  computed: {
    sortFactorys() {
      if (!this.showfactory) {
        return [];
      }
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
    titleFactory(name) {
      if (name.indexOf("矿脉") == -1) {
        return "生产设备";
      }
      if (name.indexOf("采矿机") == -1) {
        return "需要开采的矿脉 大型采矿机双倍效率";
      }
      return "自动配置的采矿设备";
    },
    titleMaterial(num) {
      if (num > 0) {
        return "额外的产物";
      }
      if (num < 0) {
        return "额外的原料";
      }
      return "产物和额外的原料相互抵消";
    },
    numFmt(val) {
      if (!val) return 0;
      return Number(val.toFixed(3));
    }
  }
};
</script>
<style lang="scss" scoped>
.dsp-overview {
  .text {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    white-space: normal;
    .text-first {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .all {
    display: flex;
    flex-direction: row;
    color: #f5c62a;
    & > * {
      flex-grow: 1;
    }
  }
  @media screen and (max-width: 860px) {
    .all {
      flex-direction: column;
    }
  }
  :deep(.el-dialog) {
    max-width: 800px;
    @media screen and (max-width: 860px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
}

:deep(.popper-title) {
  padding: 0;
}

:deep(.el-popover.popper-title) {
  padding: 0;
}

.el-popover.popper-title {
  padding: 0;
}
</style>
