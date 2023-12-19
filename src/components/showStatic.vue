<template>
  <el-dialog
    title="总览"
    :visible.sync="_visible"
    width="700px"
    class="show-static"
  >
    <div>
      总耗电大约：{{ totalPower | numFmt }} M
      <template v-if="dysonPower"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;戴森球大约：{{
          dysonPower | numFmt
        }}
        M</template
      >
    </div>
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
      <el-button @click="_visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    totalPower: Number,
    yl: Array,
    sb: Array,
    imgs: Object
  },
  computed: {
    dysonPower() {
      for (let i of this.yl) {
        if (i.name == "临界光子") {
          return i.num * 20;
        }
      }
      return 0;
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
.show-static {
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
  }
}
</style>
