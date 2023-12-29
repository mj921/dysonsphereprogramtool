<template>
  <el-dialog
    :title="'参数配置 ' + name"
    :visible.sync="_visible"
    class="dsp-setting"
  >
    <el-form label-width="120px" inline size="mini" class="dsp-setting-form">
      <el-form-item
        key="戴森球方案"
        label="戴森球方案"
        :title="`请选择戴森球方案`"
      >
        <el-select
          v-model="name"
          @change="changeProgram"
          :popper-append-to-body="false"
          filterable
          clearable
        >
          <el-option
            v-for="(item, i) in programdata"
            :key="i"
            :value="item.name"
            :label="item.name"
            :title="item.title"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
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
      <el-button @click="reset" title="重置当前方案的配置TODO">
        重置
      </el-button>
      <el-button @click="save" title="保存配置并更新当前产物数据">
        保存
      </el-button>
      <el-button @click="_visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { factorydefault, factoryparams, loadConfig } from "../data/sb";
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
  inject: ["settingUpdate"],
  data() {
    return {
      name: "",
      setting: {},
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
  watch: {
    visible(val) {
      if (val) {
        this.name = this.programname;
        this.setting = loadConfig(
          factorydefault.setting,
          { ...factorydefault },
          this.name
        );
      }
    }
  },
  methods: {
    changeProgram() {
      this.setting = loadConfig(
        factorydefault.setting,
        { ...factorydefault },
        this.name
      );
    },
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
    save() {
      const key = this.name
        ? `${factorydefault.setting}-${this.name}`
        : factorydefault.setting;
      localStorage.setItem(key, JSON.stringify(this.setting));
      this._visible = false;
      this.settingUpdate(this.name, this.setting);
    },
    reset() {
      this.setting = { ...factorydefault };
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
    @media screen and (max-width: $small-screen) {
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
