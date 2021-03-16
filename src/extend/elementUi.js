import {
  Input,
  Select,
  Option,
  OptionGroup,
  Form,
  FormItem,
  Dialog,
  RadioGroup,
  Radio,
  Popover,
  Checkbox,
  Button,
  Tabs,
  TabPane
} from "element-ui";
import "element-ui/lib/theme-chalk/input.css";
import "element-ui/lib/theme-chalk/select.css";
import "element-ui/lib/theme-chalk/option.css";
import "element-ui/lib/theme-chalk/option-group.css";
import "element-ui/lib/theme-chalk/form.css";
import "element-ui/lib/theme-chalk/form-item.css";
import "element-ui/lib/theme-chalk/dialog.css";
import "element-ui/lib/theme-chalk/radio-group.css";
import "element-ui/lib/theme-chalk/radio.css";
import "element-ui/lib/theme-chalk/popover.css";
import "element-ui/lib/theme-chalk/checkbox.css";
import "element-ui/lib/theme-chalk/button.css";
import "element-ui/lib/theme-chalk/tabs.css";
import "element-ui/lib/theme-chalk/tab-pane.css";
import "element-ui/lib/theme-chalk/icon.css";
const components = [
  Input,
  Select,
  Option,
  OptionGroup,
  Form,
  FormItem,
  Dialog,
  RadioGroup,
  Radio,
  Popover,
  Checkbox,
  Button,
  Tabs,
  TabPane
];
export default Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};
