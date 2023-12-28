<template>
  <el-dialog title="参数配置" :visible.sync="_visible" class="dsp-setting">
    <el-form label-width="120px" inline size="mini" class="dsp-setting-form">
      <template v-for="(factorys, name) in factoryparams">
        <template v-if="!Array.isArray(factorys)">
          <el-form-item
            v-if="!factorys.noset"
            :key="name"
            :label="name"
            :title="factorys.title"
          >
            <el-input v-model="setting[name]" @blur="changeSetting(name)">
              <template slot="append">{{ factorys.unit || "/ s" }}</template>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item
          v-else-if="factorys.length > 1"
          :key="name"
          :label="name"
          :title="`请选择${name}`"
        >
          <el-select v-model="setting[name]" :popper-append-to-body="false">
            <el-option
              v-for="(item, i) in factorys"
              :key="i"
              :value="i"
              :label="item.fullname || item.name"
              :title="item.title"
            >
              <img v-if="imgs[item.name]" :src="imgs[item.name]" />
              {{ item.fullname || item.name }}
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="传送带运力" v-if="setting['传送带'] === 3">
        <el-input
          v-model="setting['自定义传送带']"
          @input="changeSetting('自定义传送带')"
        >
          <template slot="append">/ s</template>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="save">保存</el-button>
      <el-button @click="cancel">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { factorydefault, factoryparams } from "../data/sb";
import imgs from "../data/imgs";
export default {
  props: {
    setting: Object,
    visible: {
      type: Boolean,
      default: false
    }
  },
  inject: ["settingsave", "settingcancel"],
  data() {
    return {
      imgs,
      factoryparams
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
    changeSetting(type) {
      if (type == "分馏塔" && this.setting[type] == "传送带速度") {
        return;
      } else if (typeof this.setting[type] == "number") {
        return;
      }

      const val = Number(
        this.setting[type]
          .replace(/[^.0-9]/g, "")
          .replace(/^(\d*\.\d*)[^0-9]/, "$1")
          .replace(/^\.+/, "")
      );

      if (this.setting[type] == 0) {
        this.setting[type] = factorydefault[type];
      } else if (type == "能量散失" && this.setting[type] > 70) {
        this.setting[type] = 70;
      } else if (type == "采矿速度" && this.setting[type] < 100) {
        this.setting[type] = 100;
      } else if (type == "采矿机" || type == "大型采矿机 ") {
        this.setting[type] = Math.ceil(val);
      } else {
        this.setting[type] = val;
      }

      // 更新巨行星采集率
      if (type == "采矿速度" || /采集器/.test(type)) {
        const fn = (a, b) => {
          const total = ((a + b) * 8 * this.setting["采矿速度"]) / 100;
          return (total - 30) / total;
        };
        this.setting["气巨采集器"] = fn(
          this.setting["气巨采集器_氢"] * 9,
          this.setting["气巨采集器_重氢"] * 9
        );
        this.setting["冰巨采集器"] = fn(
          this.setting["冰巨采集器_氢"] * 9,
          this.setting["冰巨采集器_可燃冰"] * 4.8
        );
      }
    },
    cancel() {
      this.settingcancel();
    },
    save() {
      this.settingsave();
    }
  }
};
</script>
<style lang="scss" scoped>
$small-screen: 600px;
.dsp-setting {
  :deep(.exxxxl-form-item__content) {
    width: calc(100% - 120px);
  }
  :deep(.exxxl-form .el-form-item .el-input) {
    width: auto;
  }
  .dsp-setting-form {
    display: flex;
    flex-wrap: wrap;
  }
  :deep(.el-dialog) {
    width: 768px;
    @media screen and (max-width: 860px) {
      width: 60%;
    }
    @media screen and (max-width: $small-screen) {
      width: 90%;
      .el-form-item__content {
        width: calc(100% - 120px);
      }
      .el-form-item .el-input {
        width: auto;
      }
    }
  }
}
</style>
