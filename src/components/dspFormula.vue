<template>
  <el-dialog title="查看配方" :visible.sync="_visible" class="dsp-formula">
    <dsp-product-select
      :visible.sync="selectVisible"
      :productname="productname"
      :imgs="imgs"
      @select="onProductSelect"
    >
      <el-button type="primary" size="small" style="margin-right: 16px;">
        选择产物(图片)
      </el-button>
      <el-checkbox v-model="largeSorter">分拣器放大</el-checkbox>
      <div
        v-for="({ materials, time, products, factorys }, fIndex) in formulaList"
        :key="fIndex"
        class="pf-card"
      >
        <div v-if="materials.length > 0" class="tree-pf">
          <div v-for="(jtem, j) in materials" :key="`g_${fIndex}_${j}`">
            <img :src="imgs[jtem.name]" />
            <span>{{ jtem.n }}</span>
          </div>
          <div class="time">
            <div class="time-num">{{ time }} s</div>
            <div>→</div>
          </div>
          <div v-for="(jtem, j) in products" :key="`s_${fIndex}_${j}`">
            <img :src="imgs[jtem.name]" />
            <span>{{ jtem.n }}</span>
          </div>
        </div>
        <div class="pf-sorter">
          <dl
            v-for="({ name, beltLevel, num }, ffIndex) in factorys"
            :key="`f_${fIndex}_${ffIndex}`"
          >
            <dsp-img :name="name" /><span v-if="num"> * {{ num }}</span>
            <div
              class="pf-sorter-belt"
              v-for="(items, n) in beltLevel"
              :key="`c_${fIndex}_${n}`"
              :style="{ 'line-height': `${size}px` }"
            >
              第{{ n + 1 }}条传送带
              <span
                v-for="m in items"
                :key="`cw_${fIndex}_${n}_${m.name}`"
                class="pf-sorter-belt-item"
              >
                <dsp-img :name="m.name" />
                <dsp-img :name="m.belt.name" :size="size" />
                {{ m.need | numFmt }}
              </span>
            </div>
          </dl>
        </div>
      </div>
    </dsp-product-select>
    <span slot="footer">
      <el-button @click="_visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { formulaAll } from "../data/pf1";
import { factoryparams } from "../data/sb";
import DspImg from "./dspImg.vue";
import DspProductSelect from "./dspProductSelect.vue";

export default {
  components: {
    DspProductSelect,
    DspImg
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imgs: Object
  },
  data() {
    return {
      selectVisible: false,
      productname: "",
      formulaList: [],
      largeSorter: false
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
    },
    size() {
      return this.largeSorter ? 32 : 20;
    }
  },
  filters: {
    numFmt(val) {
      if (!val) return 0;
      return Number(val.toFixed(3));
    }
  },
  methods: {
    onProductSelect(productname) {
      // m 设备 t 时间 q 原料 s 产物
      this.productname = productname;
      const sorterList = factoryparams["分拣器"];
      this.formulaList = formulaAll[productname].map(el => {
        const maxBelt = Math.min(3, el.q.length + el.s.length);
        const factorys = factoryparams[el.m].map(({ name, speed }) => {
          const time = el.t / speed;
          const beltLevel = [];
          let bIndex = 0;
          while (bIndex++ < maxBelt) {
            const items = [];
            el.q.forEach(({ name, n }) => {
              const need = (n / time) * bIndex;
              items.push({
                name,
                need,
                belt: sorterList.find(({ speed }) => speed >= need)
              });
            });
            el.s.forEach(({ name, n }) => {
              const need = (n / time) * bIndex;
              items.push({
                name,
                need,
                belt: sorterList.find(({ speed }) => speed >= need)
              });
            });
            beltLevel.push(items);
          }
          return {
            name,
            beltLevel
          };
        });
        if (el.m === "矩阵研究站") {
          factoryparams[el.m].forEach(({ name, speed }) => {
            const time = el.t / speed / 15;
            const beltLevel = [];
            let bIndex = 0;
            while (bIndex++ < maxBelt) {
              const items = [];
              el.q.forEach(({ name, n }) => {
                const need = (n / time) * bIndex;
                items.push({
                  name,
                  need,
                  belt: sorterList.find(({ speed }) => speed >= need)
                });
              });
              el.s.forEach(({ name, n }) => {
                const need = (n / time) * bIndex;
                items.push({
                  name,
                  need,
                  belt: sorterList.find(({ speed }) => speed >= need)
                });
              });
              beltLevel.push(items);
            }
            factorys.push({
              name,
              beltLevel,
              num: 15
            });
          });
        }
        return {
          time: el.t,
          factorys,
          materials: el.q,
          products: el.s
        };
      });
      this.selectVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.dsp-formula {
  .pf-card {
    margin-top: 16px;
    border: 1px solid #f5c62a;
    border-radius: 4px;
    .tree-pf {
      border-bottom: 1px solid #f5c62a;
      padding: 4px 10px 0;
    }
    .pf-sorter {
      padding: 10px;
      .pf-sorter-belt {
        white-space: normal;
        .pf-sorter-belt-item {
          display: inline-block;
          margin: 0 8px;
          img {
            vertical-align: middle;
          }
        }
      }
    }
  }
  @media screen and (max-width: 860px) {
    .all {
      flex-direction: column;
    }
  }
  @include deepStyle(".el-dialog") {
    max-width: 800px;
    @media screen and (max-width: 860px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
}

@include deepStyle(".popper-title") {
  padding: 0;
}

@include deepStyle(".el-popover.popper-title") {
  padding: 0;
}

.el-popover.popper-title {
  padding: 0;
}
</style>
