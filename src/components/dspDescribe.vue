<template>
  <el-dialog title="说明" :visible.sync="_visible" class="dsp-describe">
    <el-tabs tab-position="top" value="工具">
      <el-tab-pane label="工具" name="工具">
        <pre>
  产物选择
      产物列表最后额外显示自然资源；不显示燃料和弹药类型，因为具有其他分类属性。
      产物表格可以选择类型筛选，未选中类型产物只会显示变暗，但仍可选中。
      产物表格类型筛选燃料时，未显示不在表格内的自然资源：木、煤矿、原油、可燃冰。
  方案配置
      当创建你的戴森球方案后，请先设定配置参数，然后进行产物量化计算。
      你可以选择建立多产物生产线或者规划单一星球作为方案之一。
      每个方案都有独立的参数设定和配方选择，并且会自动记录所产生的物品。
      通过新增、删除、重命名和排序来管理方案，但是所有更改只会在点击保存按钮后生效。
      你可以通过拖动最前面的标签来调整顺序，双击或长按以编辑名称。
  参数配置
      参数采集速度会影响：矿脉、采矿机、大型采矿机、轨道采集器、抽水机、原油萃取站。
      矿脉速度为：30/min 抽水机速度为：50/min，两者只能被采集速度科技提升。
      采矿机速度按照覆盖矿脉数量计算；大型采矿机效率是2倍，可增加耗电额外再获得300%提升。
      轨道采集器的采集速度对于气巨星和冰巨星分别计算，在不同巨行星采集消耗资源比例不同生产资源数量不固定。
      采矿设备默认为无，配置后对总览中未采集的矿脉进行采集，采集设备显示为采矿机矿脉。
      参数配置如果选择了戴森球方案将修改指定方案的参数；在点击保存按钮后才参数生效，并且同时更新当前产物数据，其他产物不执行更新数据。
  产物树
      产物多列数据依次显示：产物、生产设备、传送带、增产剂、额外产物(正数)、额外原料(负数)。
      产物存在额外产物时，可在需要该原料的配方禁用生产，使额外产物和额外原料在总览相互抵消。
      产物需要传送带数量按全部产物计算，原料传送带数量参考一下产物需要的传送带数量。
      产物如果使用了增产剂效果，会改变产物名称显示颜色并显示增产剂效果。
      产物树在选中右上水平展示时，改变显示方向。
      产物树在选中右上简化展示时，仅显示产物。
      产物树中点击一项产物方框时出现当前产物操作菜单。
      产物菜单如果可以使用增产剂，显示增产剂的无、加速、增加选择选项。
      产物菜单如果存在多种配方可以选择使用那种配方。
      产物菜单点击当前配方的原料或产物，改变是否生产原料的状态。
      产物菜在电脑端上下滑动用鼠标 左右滑动用键盘方向键，手机端使用触摸滑动。
  总览
      总览黄色、红色、绿色文字分别表示：生产设备、生产产物或额外产物、额外原料
      总览左侧显示生产的每种产物和生产设备的名称和数量，如果带有括号数字，表示作为终极产物被额外原料消耗的数量，可以悬浮查看详情。
      总览左侧可以查看每种矿脉使用采矿机、大型采矿机、未开采矿脉的数量。
      总览右侧依次显示：生产设备、需要采集的矿脉、额外产物(正数)、额外原料(负数)。
        </pre>
      </el-tab-pane>
      <el-tab-pane label="游戏" name="游戏">
        <pre>
  传送带速度分别为每秒6/12/30个货物，经过自动集装机后数量*2，满科技星际物流运输站输出数量*4。
  分馏塔生产速度由传送带速度决定，提高传送带速度和使用增产剂可以提升分馏塔效率。
  具有增产剂效果的增产剂会增加使用次数，2/3级次数分别为(24*1.2-1=27)/(60*1.25-1=74)，简称自喷涂。
  
  轨道采集器运行时需要30Mj电力，不会消耗电力而消耗采集物的能量，采矿速度科技会增强工作效率。
  轨道采集器每分钟资源数量为：资源速度*8(基础效率)*100%(采矿速度科技)*采集比例(功率-30/功率)*60
  气巨星采集功率为: (1.0(氢速度/s)*9(氢能量)+0.04(重氢速度/s)*9(重氢能量)) * 8 * 100%
  冰巨星采集功率为: (0.3(氢速度/s)*9(氢能量)+0.8(可燃冰速度/s)*4.8(可燃冰能量)) * 8 * 100%

  射线接收站生成光子功率为：6-15(持续接受) * 8(光子模式) * 100-400%(带增产的透镜)=480Mj
  射线接收站接收1.2Gj能量后生成一个光子，最快1200/480=2.5秒生成一个光子。
  射线接收站请求戴森球电力为：每秒功率/(1-射线散射)，请求电力不足时接收站平分请求。
        </pre>
      </el-tab-pane>
      <el-tab-pane label="其他" name="其他">
        <pre>
  源代码 github：<a href="https://github.com/mj921/dysonsphereprogramtool">https://github.com/mj921/dysonsphereprogramtool</a>

  编译时间: {{ currentDate }} 编译版本: {{ gitVersion }}
        </pre>
        <div class="clear-data">
          <el-button @click="clearAll">清空全部数据</el-button>
          <el-button @click="clearDefault">
            清空默认方案全部参数和配方
          </el-button>
          <el-button @click="clearCurrent">
            清空当前方案全部参数和配方
          </el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer">
      <el-button @click="_visible = false">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { factorydefault } from "../data/sb";

export default {
  props: {
    programname: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  inject: ["settingUpdate"],
  data() {
    return {
      gitVersion: process.env.GIT_VERSION.slice(0, 7),
      currentDate: process.env.CURRENT_DATE.replace(
        /^([0-9\\-]+)T([0-9:]{8}).*/,
        "$1 $2"
      )
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
    clearAll() {
      localStorage.clear();
      location.reload();
    },
    clearDefault() {
      const oldversion = [
        "sbConfig",
        "pfConfig",
        "dsp-setting",
        "dsp-product",
        "dsp-formula",
        "dsp-sprayed"
      ];
      oldversion.forEach(i => localStorage.removeItem(i));
      this.settingUpdate("", { ...factorydefault });
    },
    clearCurrent() {
      if (this.programname) {
        localStorage.removeItem(
          `${factorydefault.setting}-${this.programname}`
        );
        localStorage.removeItem(
          `${factorydefault.product}-${this.programname}`
        );
      } else {
        localStorage.removeItem(factorydefault.setting);
        localStorage.removeItem(factorydefault.product);
      }
      this.settingUpdate(this.programname, { ...factorydefault });
    }
  }
};
</script>
<style lang="scss" scoped>
.dsp-describe {
  pre {
    width: 100%;
    white-space: pre-wrap;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 16px;
    line-height: 1.5;
    a {
      color: #f5c62a;
      text-decoration: none;
    }
    a:hover {
      color: #f50a0a;
    }
  }
  .clear-data {
    display: flex;
    flex-wrap: wrap;
    button {
      margin: 0 0 4px 10px;
    }
  }
  @include deepStyle(".el-dialog") {
    max-width: 960px;
    @media screen and (max-width: 860px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
}
</style>
