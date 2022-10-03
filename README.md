# 项目介绍
    本组件是面向Vue开发者的，一款类似于GitHub贡献日历图表的组件。
    
    它具有高自由度，您可以将它用于显示类似贡献图的日历图表。
![](https://img-blog.csdnimg.cn/b29215f31bbe4872a2e77085310792fa.png)

# 使用方式

本组件需要在Vue3上运行，使用方式：
``` bash
    npm install vue-activity-calendar
```

main.js
``` javascript
//你需要引入该组件
import vueActivityCalendar from "vue-activity-calendar";
//同时引入css文件，确保基本样式可用
import "vue-activity-calendar/vue-activity-calendar.css"; 
//以下是vue3的组件装载环节，这里不详细描述了
const app = createApp(App);
app.use(vueActivityCalendar); 
```

App.vue
```html
<template>
  <vue-activity-calendar
    :data="data"
    :width="40"
    :height="7"
    :cellLength="20"
    :cellInterval="10"
    :colors="colors"
    :cellBorderRadius="4" 
    :fontSize="12"
    :showLevelFlag="false"
  />
</template>
```

那么接下来就能正常使用了

# 文档

|    参数    |    类型     |    描述                |
| :-------- | :------- | :------------------------- |
| `data` | `Array` | **必要**. 你要渲染的数据，它应该是一个数组，并且它的元素是对象结构，具体为{ date: "2022-09-22", count: 5 }，其中date表示日期，格式为：'yyyy-mm-dd'，count表示程度（活跃度） |
| `endDate`      | `String` | **默认本地日期**. 截止日期 |
| `width` | `Number` | **默认35**. 宽度w，一共容纳w个小单元格 |
| `height`      | `Number` | **默认7**. 高度h，一共容纳h个小单元格 | 
| `cellLength`      | `Number` | **默认16**. 单元格边长，单位px |
| `cellInterval` | `Number` | **默认6**. 单元格间隔，单位px |
| `cellBorderRadius`      | `Number` | **默认3**. 单元格的border-radius属性值，单位px |
| `header` | `Array` | **默认为中文的[一月~十二月]**. 图表的表头显示的文字，传入长为12的字符串数组 |
| `showHeader`      | `Boolean` | **默认true**. 是否显示header |
| `backgroundColor` | `String` | **默认#ffffff**. 图表背景颜色传入rgb十六位数值 |
| `colors`      | `Array` | **默认["#f5f5f5","#ebfaff","#e5f9ff","#c7f1ff","#86e0fe","#3ecefe",]**. 不同程度对应的颜色 |
| `levelMapper` | `Funciton` | **可自定义**. 该函数用于将data数组元素中的count数值映射成第n个颜色，即colors[n] |
| `showLevelFlag`      | `Boolean` | **默认true**. 是否显示颜色层级示意图（显示于右下方） |
| `levelFlagText` | `Array` | **可自定义**. 颜色层级示意图的两侧的文字，需要一个长度为2的字符串数组 |
| `fontSize`      | `Number` | **默认12**. 文字大小，单位px |
| `fontColor`      | `String` | **默认#080808**. 文字颜色 |
| `clickEvent`      | `Funciton` | **可自定义**. 单元格点击事件回调函数 | 

以下是levelMapper的默认函数，仅作为参考，作者建议：colors传入颜色十六进制字符串数组，假设长度为8，也就是分为8个活跃度层级，那么levelMapper应当设置8个条件分支，根据count分配等级，返回值就是colors数组的索引值index
```javascript
function levelMapper(count) {
  if (count == 0) {
    return 0;
  } else if (count <= 1) {
    return 1;
  } else if (count <= 3) {
    return 2;
  } else if (count <= 6) {
    return 3;
  } else if (count <= 9) {
    return 4;
  } else {
    return 5;
  }
}
```

# 感谢使用，谢谢支持
如果有bug请发送邮箱2542079957@qq.com，感谢支持！
