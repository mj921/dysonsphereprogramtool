<template>
  <el-dialog
    title="戴森球方案配置"
    :visible.sync="_visible"
    class="dsp-programs"
  >
    <pre v-if="list.length == 0">
      当创建你的戴森球方案后，请先设定配置参数，然后进行产物量化计算。

      你可以选择建立多产物生产线或者规划单一星球作为方案之一。

      每个方案都有独立的参数设定和配方选择，并且会自动记录所产生的物品。

      在这个界面上你可以通过新增、删除、重命名和排序来管理方案，但是所有更改只会在点击保存按钮后生效。

      你可以通过拖动最前面的标签来调整顺序，双击或长按以编辑名称。
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
        />
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
          {{ item.name }}
        </span>
        <span
          class="drag-del"
          @click="listDelete(index)"
          title="删除方案及配置 保存后生效"
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
  </el-dialog>
</template>
<script>
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
      list: [],
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
        this.list = this.programdata.map(i => {
          this.dragOrder++;
          return { order: this.dragOrder, name: i.name, source: i.name };
        });
      }
    }
  },
  methods: {
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
      this.editIndex = -1;
      // TODO 重复
      if (this.list[index].name == "" && this.list[index].source == "") {
        this.list.splice(index, 1);
      }
    },
    listDelete(index) {
      this.list.splice(index, 1);
    },
    listAdd() {
      this.dragOrder++;
      this.list.push({ order: this.dragIndex, name: "", source: "" });
      this.listEdit(this.list.length - 1);
    },
    // 方案操作
    save() {
      this.programUpdate(this.list);
    }
  }
};
</script>
<style lang="scss" scoped>
.dsp-programs {
  :deep(.el-dialog) {
    width: 768px;
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
        height: 24px;
        width: 24px;
        margin: 8px;
        cursor: move;
        --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1024 1024' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'/%3E%3C/svg%3E");
        background-color: currentColor;
        color: inherit;
        display: inline-block;
        -webkit-mask: var(--un-icon) no-repeat;
        mask: var(--un-icon) no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        vertical-align: middle;
      }
      .drag-text {
        flex-grow: 1;
        display: block;
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
