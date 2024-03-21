<template>
  <el-dialog
    title="戴森球方案配置"
    class="dsp-programs"
    :visible.sync="_visible"
    :close-on-click-modal="false"
  >
    <pre v-if="list.length == 0">
      当创建你的戴森球方案后，请先设定配置参数，然后进行产物量化计算。

      你可以选择建立多产物生产线或者规划单一星球作为方案之一。

      每个方案都有独立的参数设定和配方选择，并且会自动记录所产生的物品。

      在这个界面上你可以通过新增、删除、重命名和排序来管理方案，但是所有更改只会在点击保存按钮后生效。

      你可以通过拖动最前面的标签来调整顺序，双击或长按以编辑名称。

      使用复制按钮复制方案数据，在输入名称时输入数据，会导入方案数据。
    </pre>
    <transition-group name="drag" class="programs-list" tag="ul">
      <li v-for="(item, index) in list" :key="item.order" class="programs-item">
        <span
          class="drag-icon"
          draggable
          @dragstart="dragstart(index)"
          @dragenter="dragenter($event, index)"
          @dragover="dragover($event, index)"
          @touchstart="touchStart($event, index)"
          @touchmove="touchMove($event, index)"
          @touchend="touchEnd($event)"
        >
          <img v-if="imgs[item.describe]" :src="imgs[item.describe]" alt="" />
          <span v-else class="drag-icon-default"></span>
        </span>
        <el-input
          v-if="index == editIndex"
          v-model="list[index].name"
          ref="editfocus"
          @blur="listSave"
        >
        </el-input>
        <span
          v-else
          class="drag-text"
          v-on:dblclick="listEdit(index)"
          @touchstart="longTouchStart(index)"
          @touchend="longTouchEnd"
        >
          <template v-if="item.source != '' && item.source != item.name">
            {{ item.source }} =>
          </template>
          {{ item.name }}
        </span>
        <span v-if="item.import">已导入</span>
        <span
          v-else-if="item.source"
          class="drag-copy"
          @click="copy(item.source)"
          >复制</span
        >
        <span v-else>新增</span>
        <span
          class="drag-del"
          title="删除方案及配置 保存后生效"
          @click="listDelete(index)"
        >
          x
        </span>
      </li>
    </transition-group>
    <span slot="footer">
      <el-button @click="listAdd">
        新增
      </el-button>
      <el-button @click="save" title="保存方案提交数据修改">
        保存
      </el-button>
      <el-button @click="_visible = false">关闭</el-button>
    </span>
    <el-input v-if="clipboard" v-model="clipboard"></el-input>
  </el-dialog>
</template>
<script>
import { factorydefault, loadConfig } from "../data/sb";
import imgs from "../data/imgs";
export default {
  props: {
    programname: String,
    programdata: Array,
    visible: {
      type: Boolean,
      default: false
    }
  },
  inject: ["programUpdate"],
  data() {
    return {
      imgs: imgs,
      list: [],
      clipboard: "",
      editIndex: -1,
      dragIndex: -1,
      dragPos: 0,
      dragOrder: 0
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
  watch: {
    visible(val) {
      if (val) {
        this.list = this.programdata.map((o, i) => {
          this.dragOrder++;
          return {
            order: this.dragOrder,
            name: o.name,
            source: o.name,
            describe: this.getDescribe(this.programdata[i].data)
          };
        });
      }
    }
  },
  methods: {
    getDescribe(data) {
      if (data !== undefined) {
        for (const val of Object.values(data)) {
          return val.name;
        }
      }
      return "";
    },
    // 拖拽 长按事件处理
    dragstart(index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      e.preventDefault();
      const moving = this.list[this.dragIndex];
      this.list.splice(this.dragIndex, 1);
      this.list.splice(index, 0, moving);
      this.dragIndex = index;
    },
    dragover(e) {
      e.preventDefault();
    },
    touchStart(e, index) {
      e.preventDefault();
      this.dragIndex = index;
      this.dragPos = e.touches[0].pageY;
    },
    touchMove(e) {
      e.preventDefault();
      const size = e.touches[0].pageY - this.dragPos;
      if (size < -46 || size > 46) {
        const moving = this.list[this.dragIndex];
        const index =
          this.dragIndex +
          (size > 0 ? Math.floor(size / 46) : Math.ceil(size / 46));
        this.list.splice(this.dragIndex, 1);
        this.list.splice(index, 0, moving);
        this.dragIndex = index;
        this.dragPos = e.touches[0].pageY;
      }
    },
    touchEnd(e) {
      e.preventDefault();
    },
    longTouchStart(index) {
      this.longPressTimer = setTimeout(() => {
        this.listEdit(index);
      }, 400);
    },
    longTouchEnd() {
      clearTimeout(this.longPressTimer);
    },
    // 编辑数据列表
    listEdit(index) {
      this.editIndex = index;
      this.$nextTick(() => {
        if (Array.isArray(this.$refs.editfocus)) {
          for (const dom of this.$refs.editfocus) {
            dom.focus();
          }
        }
      });
    },
    listSave() {
      const index = this.editIndex;
      const name = this.list[index].name;
      this.editIndex = -1;
      // 导入数据
      const data = this.decode(name);
      if (data != null) {
        if (this.list[index].source == "") {
          this.list[index].name = data.name;
        } else {
          this.list[index].name = this.list[index].source;
        }
        this.list[index].import = data;
      }

      // 重置重复值
      const repeat = this.list.some((v, i) => i != index && v.name == name);
      if (repeat) {
        this.list[index].name = this.list[index].source;
      }
      // 移除空值
      if (this.list[index].name == "" && this.list[index].source == "") {
        this.list.splice(index, 1);
        return;
      }

      // this.encode(this.list[index].source)
    },
    listDelete(index) {
      this.list.splice(index, 1);
    },
    listAdd() {
      this.dragOrder++;
      this.list.push({ order: this.dragOrder, name: "", source: "" });
      this.listEdit(this.list.length - 1);
    },
    // 方案操作
    save() {
      this.programUpdate(this.list);
      this._visible = false;
    },
    copy(name) {
      const data = this.encode(name);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data);
      } else {
        this.clipboard = data;
      }
    },
    encode(name) {
      const decodemap = {
        产量: 1,
        设备: 2,
        传送带: 3,
        speedup: 4,
        extra: 5,
        none: 0,
        "": 0
      };
      const program = this.programdata.find(i => i.name == name);
      if (program === undefined) {
        return "无法获取方案数据";
      }
      const product = loadConfig(factorydefault.product, {}, name);
      const setting = loadConfig(factorydefault.setting, {}, name);
      const data1 = {};
      const data2 = [];
      const data3 = [];

      for (const [key, val] of Object.entries(setting)) {
        if (val !== factorydefault[key]) {
          data1[key] = val;
        }
      }
      for (const [key, val] of Object.entries(program.data)) {
        data2.push([
          key,
          val.confignum,
          decodemap[val.configtype],
          val.configmaterial ? 1 : 0
        ]);
      }
      for (const [key, val] of Object.entries(product)) {
        data3.push([key, val.formula, decodemap[val.sprayed], ...val.select]);
      }

      return (
        `分享戴森球量化方案:${name} 数据:` +
        JSON.stringify({
          s: data1,
          d: data2,
          p: data3
        })
      );
    },
    decode(str) {
      const match = str.match(/^分享戴森球量化方案:(\S+) 数据:(.*)/);
      if (match === null) {
        return null;
      }

      const decodemap = ["", "产量", "设备", "传送带", "speedup", "extra"];
      const data = JSON.parse(match[2]);
      const setting = data.s;
      const program = {};
      const product = {};
      data.d.forEach(i => {
        program[i[0]] = {
          name: i[0],
          confignum: i[1],
          configtype: decodemap[i[2]] || "产量",
          configmaterial: i[3] == 1
        };
      });
      data.p.forEach(i => {
        product[i[0]] = {
          formula: i[1],
          sprayed: decodemap[i[2]] || "",
          select: i.slice(3)
        };
      });
      return {
        name: match[1],
        setting: { ...factorydefault, ...setting },
        program,
        product
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.dsp-programs {
  @include deepStyle(".el-dialog") {
    max-width: 768px;
    @media screen and (max-width: 860px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
  pre {
    white-space: pre-wrap;
  }
  img {
    width: 40px;
    height: 40px;
  }
  .programs-list {
    list-style: none;
    padding-inline-start: 0;
    .programs-item {
      display: flex;
      width: 100%;
      height: 40px;
      margin-bottom: 6px;
      border-radius: 4px;
      background: rgba(245, 198, 42, 0.6);
      color: #fff;
      line-height: 40px;
      .drag-icon {
        cursor: move;
      }
      .drag-icon-default {
        display: inline-block;
        height: 24px;
        width: 24px;
        margin: 8px;
        background-color: currentColor;
        color: inherit;
        -webkit-mask: var(--un-icon) no-repeat;
        mask: var(--un-icon) no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        vertical-align: middle;
        --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1024 1024' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'/%3E%3C/svg%3E");
      }
      .drag-text {
        flex-grow: 1;
        display: block;
      }
      .drag-copy {
        cursor: pointer;
      }
      .drag-del {
        height: 40px;
        width: 40px;
        cursor: pointer;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
