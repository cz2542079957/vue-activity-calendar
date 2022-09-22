<template>
  <div class="activityCalendar">
    <div
      class="header"
      v-show="config.showHeader"
      :style="'height:' + (config.fontSize)+ 'px;'"
    >
      <div
        v-for="(month, index) in config.headerLength"
        :key="index"
        :style="style.header(month)"
      >
        {{month.text}}
      </div>
    </div>
    <div
      class="content"
      :style="style.content()"
    >

      <div
        class="item"
        v-for="(item, index) in config.data"
        :key="index"
        :style="style.item(item.count)"
        @click="config.clickEvent(item)"
      >
      </div>
    </div>
    <div
      class="levelFlagContent"
      v-show="config.showLevelFlag"
    >
      <div :style="'font-size:'  +config.fontSize+ 'px;'">{{config.levelFlagText[0]}}</div>
      <div
        class="levelFlag"
        :style="style.levelFlag()"
      >
        <div
          v-for="(i,index) in config.colors"
          :key="index"
          :style="style.levelFlagItem(index)"
        >
        </div>
      </div>
      <div :style="'font-size:'  +config.fontSize+ 'px;'">{{config.levelFlagText[1]}}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
export default {
  name: "vue-activity-calendar",
  props: [
    "data",
    "endDate",
    "width",
    "height",
    "cellLength",
    "cellInterval",
    "cellBorderRadius",
    "header",
    "showHeader",
    "backgroundColor",
    "colors",
    "levelMapper",
    "showLevelFlag",
    "levelFlagText",
    "fontSize",
    "clickEvent",
  ],
  setup(props) {
    //接收的数据
    var data = [];

    const config = reactive({
      data: [],
      //开始日期，不接受指定
      beginDate: "",
      //结束日期，结合宽高可确认开始日期
      endDate: "",
      //calendar 宽度 n*单元格
      width: 35,
      //calendar 高度 n*单元格
      height: 7,
      //单元格边长 px
      cellLength: 16,
      //单元格间隔 px
      cellInterval: 6,
      //单元格border圆角效果 px
      cellBorderRadius: 3,
      //header 12个内容的数组，用于指定表头十二个月份显示的内容
      header: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      //header占位长度，不可指定
      headerLength: [],
      //设置是否显示header
      showHeader: true,
      //calendar背景颜色
      backgroundColor: "#ffffff",
      //颜色数组，用于指定不同活跃level的颜色
      colors: [
        "#f5f5f5",
        "#ebfaff",
        "#e5f9ff",
        "#c7f1ff",
        "#86e0fe",
        "#3ecefe",
      ],
      //与颜色数组同步，代表颜色数组长度
      levels: 5,
      //颜色映射表，可自定义颜色与count的关系
      levelMapper: function levelMapper(count) {
        //level 1
        if (count < 2) {
          return 0;
        } else if (count < 4) {
          return 1;
        } else if (count < 6) {
          return 2;
        } else if (count < 9) {
          return 3;
        } else {
          return 4;
        }
      },
      showLevelFlag: true,
      levelFlagText: ["少", "多"],
      fontSize: 12,
      //响应点击事件
      clickEvent: function clickEvent(item) {},
    });

    const style = reactive({
      header(month) {
        return (
          "left:" +
          month.length +
          "px;" +
          "font-size: " +
          config.fontSize +
          "px;"
        );
      },
      content() {
        return (
          "grid-template-columns: repeat(" +
          config.width +
          "," +
          (config.cellLength + config.cellInterval / 2) +
          "px);" +
          "grid-template-rows: repeat(" +
          config.height +
          "," +
          (config.cellLength + config.cellInterval / 2) +
          "px);" +
          "background-color:" +
          config.backgroundColor
        );
      },
      item(i) {
        return (
          "width:" +
          config.cellLength +
          "px; background-color:" +
          config.colors[config.levelMapper(i)] +
          ";" +
          "border-radius:" +
          config.cellBorderRadius +
          "px;"
        );
      },
      levelFlag() {
        return (
          "grid-template-columns: repeat(" +
          config.colors.length +
          "," +
          (config.cellLength + config.cellInterval / 2) +
          "px);" +
          "grid-template-rows: repeat(1," +
          (config.cellLength + config.cellInterval / 2) +
          "px);" +
          "background-color:" +
          config.backgroundColor
        );
      },
      levelFlagItem(i) {
        return (
          "width:" +
          config.cellLength +
          "px; background-color:" +
          config.colors[i] +
          ";" +
          "border-radius:" +
          config.cellBorderRadius +
          "px;" +
          "font-size: " +
          config.fontSize +
          "px;"
        );
      },
    });

    //计算开始日期
    function calculateBeginDate() {
      let tempMonthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let tempAll = config.width * config.height;
      let tempYMD = config.endDate.split("-");
      let endY = tempYMD[0] - 0,
        endM = tempYMD[1] - 0,
        endD = tempYMD[2] - 0;
      let begY = endY,
        begM = endM,
        begD = endD;
      if (tempAll <= endD) {
        begD = 1;
      } else {
        tempAll -= endD;
        begM = ((begM - 1 + 11) % 12) + 1;
        begD = 1;
        while (tempAll > 0) {
          if ((begY % 4 == 0 && begY % 100 != 0) || begY % 400 == 0)
            tempMonthDay[2] = 29;
          else tempMonthDay[2] = 28;
          for (let i = begM; i > 0; i--) {
            if (tempMonthDay[i] <= tempAll) {
              tempAll -= tempMonthDay[i];
              begM = ((begM - 1 + 11) % 12) + 1;
            } else {
              begD = tempMonthDay[i] - tempAll;
              tempAll = 0;
              break;
            }
          }
          if (tempAll > 0) begY -= 1;
        }
      }
      config.beginDate =
        begY +
        "-" +
        (begM < 10 ? "0" + begM : begM) +
        "-" +
        (begD < 10 ? "0" + begD : begD);
    }

    //处理数据
    function dataProcessor() {
      data.sort((a, b) => {
        if (a.date > b.date) return 1;
        else if (a.date < b.date) return -1;
        else return 0;
      });
      let tempMonthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let tempAll = config.width * config.height;
      let tempCount = 0;
      let tempYMD = config.beginDate.split("-");
      let nowY = tempYMD[0] - 0,
        nowM = tempYMD[1] - 0,
        nowD = tempYMD[2] - 0;
      if ((nowY % 4 == 0 && nowY % 100 != 0) || nowY % 400 == 0)
        tempMonthDay[2] = 29;
      //开始日期不算，向后推一天
      nowD++;
      tempCount++;
      if (nowD > tempMonthDay[nowM]) {
        nowD = 1;
        nowM++;
      }
      if (nowM > 12) {
        nowM = 1;
        nowY++;
        if ((nowY % 4 == 0 && nowY % 100 != 0) || nowY % 400 == 0)
          tempMonthDay[2] = 29;
        else tempMonthDay[2] = 28;
      }
      //开始逐个填写
      let tempArray = [];
      let j = 0;
      for (let i = 0; i < tempAll; i++) {
        let tempNowDate =
          nowY +
          "-" +
          (nowM < 10 ? "0" + nowM : nowM) +
          "-" +
          (nowD < 10 ? "0" + nowD : nowD);
        let tempItem = { index: i, count: 0, date: tempNowDate };
        if (j < data.length) {
          while (j < data.length && data[j].date < tempNowDate) j++;
          if (j < data.length && data[j].date == tempNowDate) {
            tempItem.count = data[j].count;
            j++;
          }
        }
        tempArray.push(tempItem);
        nowD += 1;
        tempCount++;
        if (nowD > tempMonthDay[nowM]) {
          nowD = 1;
          nowM += 1;
          if (nowM > 12) {
            nowM = 1;
            nowY += 1;
            if ((nowY % 4 == 0 && nowY % 100 != 0) || nowY % 400 == 0)
              tempMonthDay[2] = 29;
            else tempMonthDay[2] = 28;
          }
          //跟随月份，header也增加相应的表头
          config.headerLength.push({
            length:
              (config.cellLength + config.cellInterval / 2) *
              (tempCount / config.height),
            text: config.header[nowM - 1],
          });
        }
      }
      config.data = tempArray;
    }

    function init() {
      calculateBeginDate();
      dataProcessor();
    }

    onMounted(() => {
      //默认本地日期
      if (props.endDate) config.endDate = props.endDate;
      else {
        let t = new Date();
        config.endDate =
          t.getFullYear() +
          "-" +
          (t.getMonth() + 1 < 10
            ? "0" + (t.getMonth() + 1)
            : t.getMonth() + 1) +
          "-" +
          (t.getDate() + 1 < 10 ? "0" + t.getDate() : t.getDate());
      }
      if (props.data) data = props.data;
      if (props.height) config.height = props.height;
      if (props.width) config.width = props.width;
      if (props.cellLength) config.cellLength = props.cellLength;
      if (props.cellInterval) config.cellInterval = props.cellInterval;
      if (props.cellBorderRadius)
        config.cellBorderRadius = props.cellBorderRadius;
      if (props.header) config.header = props.header;
      if (typeof props.showHeader != "undefined")
        config.showHeader = props.showHeader;
      if (props.backgroundColor) config.backgroundColor = props.backgroundColor;
      if (props.colors) config.colors = props.colors;
      if (props.levelMapper) config.levelMapper = props.levelMapper;
      if (typeof props.showLevelFlag != "undefined")
        config.showLevelFlag = props.showLevelFlag;
      if (props.levelFlagText) config.levelFlagText = props.levelFlagText;
      if (props.fontSize) config.fontSize = props.fontSize;
      if (props.clickEvent) config.clickEvent = props.clickEvent;
      init();
    });

    return {
      config,
      style,
    };
  },
};
</script>

<style scoped>
.activityCalendar {
  width: max-content;
  height: max-content;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
  padding: 10px 0;
}

.header > div {
  width: max-content;
  top: 0;
  position: absolute;
  font-size: 16px;
}

.content {
  display: grid;
  grid-auto-flow: column;
}

.content .item {
  aspect-ratio: 1;
  margin: auto;
  transition-duration: 100ms;
}

.content .item:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.levelFlagContent {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 8px;
}

.levelFlag {
  display: grid;
  grid-auto-flow: column;
  margin: 0 5px;
}

.levelFlag > div {
  aspect-ratio: 1;
  margin: auto;
}
</style>