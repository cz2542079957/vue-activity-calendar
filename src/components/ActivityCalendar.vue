<template>
    <div class="activityCalendar">
        <div
            class="left"
            v-show="config.showWeekDayFlag"
        >
            <div
                v-for="(weekDay, index) in config.weekDayFlagLength"
                :key="index"
                :style="style.weekDay(weekDay)"
            >
                {{weekDay.text}}
            </div>
        </div>
        <div class="right">
            <div
                class="header"
                v-show="config.showHeader"
                :style="`height: ${config.fontSize}px;`"
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
                    :style="style.item(item)"
                    @click="config.clickEvent ? config.clickEvent(item) : null "
                >
                </div>
            </div>
            <div
                class="levelFlagContent"
                v-show="config.showLevelFlag"
            >
                <div :style="`font-size: ${config.fontSize}px; color: ${config.fontColor}`">
                    {{ config.levelFlagText ? config.levelFlagText[0] : ""}}
                </div>
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
                <div :style="`font-size: ${config.fontSize}px; color: ${config.fontColor}`">
                    {{config.levelFlagText ? config.levelFlagText[1] : ""}}
                </div>
            </div>
        </div>
    </div>
</template> 

<script lang="ts" setup name="ActivityCalendar">
import {
    nextTick,
    onMounted,
    reactive,
    watch,
    computed,
    defineProps,
} from "vue";

//基础属性数据
interface settingType {
    data: { date: string; count: number; index: number }[] | null | undefined;
    endDate: string | null | undefined;
    width: number;
    height?: number;
    cellLength?: number;
    cellInterval?: number;
    cellBorderRadius?: number;
    header?: string[];
    backgroundColor?: string;
    colors: string[];
    weekDayFlagText: string[];
    levelFlagText: string[];
    fontSize: number;
    fontColor: string;
}

//控制属性
interface controllerType {
    showHeader?: boolean;
    showWeekDayFlag?: boolean;
    showLevelFlag?: boolean;
}

//函数属性
interface functionType {
    levelMapper?: Function;
    clickEvent?: Function;
}

//不可指定的控制属性
interface computedType {
    beginDate?: string;
    levels?: number;
    headerLength?: { length: number; text: string }[];
    weekDayFlagLength?: { length: number; text: string }[];
}

type objectType = settingType &
    controllerType &
    functionType &
    computedType & { [name: string]: any };

const props = defineProps([
    "data",
    "endDate",
    "width",
    "height",
    "cellLength",
    "cellInterval",
    "cellBorderRadius",
    "header",
    "backgroundColor",
    "colors",
    "weekDayFlagText",
    "levelFlagText",
    "fontSize",
    "fontColor",
    //
    "showHeader",
    "showWeekDayFlag",
    "showLevelFlag",
    //
    "levelMapper",
    "clickEvent",
]);

var propsChange = computed(() => {
    return props;
});

watch(
    propsChange,
    (nv, ov) => {
        init();
    },
    {
        deep: true,
    }
);

var data: { date: string; count: number }[] | null | undefined = [];

const config = reactive<objectType>({
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
    colors: ["#f5f5f5", "#ebfaff", "#e5f9ff", "#c7f1ff", "#86e0fe", "#3ecefe"],
    //是否显示左侧的星期标志
    showWeekDayFlag: true,
    //自定义左侧星期标志
    weekDayFlagText: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //weekFlag占位高度，不接受指定
    weekDayFlagLength: [],
    //与颜色数组同步，代表颜色数组长度
    levels: 6,
    //颜色映射表，可自定义颜色与count的关系
    levelMapper: function levelMapper(count: any) {
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
    },
    showLevelFlag: true,
    levelFlagText: ["少", "多"],
    fontSize: 12,
    fontColor: "#080808",
    //响应点击事件
    clickEvent: function clickEvent(item: any) {},
});

const style = reactive({
    header(month: { length: number; text: string }): string {
        return `
            left: ${month.length}px;
            font-size: ${config.fontSize}px; 
            color: ${config.fontColor};
        `;
    },
    weekDay(weekDay: { length: number; text: string }): string {
        return `
            top: ${weekDay.length - 8}px;
            font-size: ${config.fontSize - 2}px;
            color: ${config.fontColor};

        `;
    },
    content(): string {
        //加一的原因是为了对上星期，单元格发生了一定的位移，这时候可能会多出一列
        return `
            grid-template-columns: repeat(${config.width + 1},${
            config.cellLength + config.cellInterval / 2
        }px);  
            grid-template-rows: repeat(${config.height} ,${
            config.cellLength + config.cellInterval / 2
        }px);
            background-color: ${config.backgroundColor};
        `;
    },
    item(varitem: { index: number; count: number; date: string }): string {
        return `
            width: ${config.cellLength}px;
            height: config.cellLength px; 
            background-color: ${
                config?.colors[
                    config.levelMapper ? config.levelMapper(varitem.count) : 0
                ]
            };
            border-radius: ${config.cellBorderRadius}px;
            visibility: ${varitem.index < 0 ? "hidden;" : ""};
        `;
    },
    levelFlag(): string {
        return `
            grid-template-columns: repeat(${config.colors.length},${
            config.cellLength + config.cellInterval / 2
        }px);
            grid-template-rows: repeat(1,${
                config.cellLength + config.cellInterval / 2
            }px);
            background-color: ${config.backgroundColor};
        `;
    },
    levelFlagItem(i: number): string {
        return `
            width: ${config.cellLength}px; 
            background-color:  ${config.colors[i]}; 
            border-radius: ${config.cellBorderRadius}px;
            font-size: ${config.fontSize}px;
        `;
    },
});

//计算开始日期
function calculateBeginDate() {
    let tempMonthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let tempAll = config.width * config.height;
    if (!config.endDate) return;
    let tempYMD = config.endDate.split("-");
    let endY = Number(tempYMD[0]) - 0,
        endM = Number(tempYMD[1]) - 0,
        endD = Number(tempYMD[2]) - 0;
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
    if (!data) return;
    //根据日期排序
    data.sort((a, b) => {
        if (a.date > b.date) return 1;
        else if (a.date < b.date) return -1;
        else return 0;
    });
    //保存月份天数
    let tempMonthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //保存表格最大容纳单元格数
    let tempAll = config.width * config.height;
    //保存当前处理的单元格数
    let tempCount = 0;
    //保存起始日期的 年 月 日
    if (!config.beginDate) return;
    let tempYMD = config.beginDate.split("-");
    let nowY = Number(tempYMD[0]) - 0,
        nowM = Number(tempYMD[1]) - 0,
        nowD = Number(tempYMD[2]) - 0;
    //更新平年闰年月份天数表
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
    let tempArray: { index: number; count: number; date: string }[] = [];
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
            if (config.headerLength) {
                config.headerLength.push({
                    length:
                        (config.cellLength + config.cellInterval / 2) *
                        (tempCount / config.height),
                    text: config.header[nowM - 1],
                });
            }
        }
    }
    //结束日期的星期 并且空格填充偏移量，为了让endDate在对的日期上
    let endWeekDay = new Date(nowY + "-" + nowM + "-" + (nowD - 1)).getDay();
    for (let i = 0; i < endWeekDay; i++)
        tempArray.unshift({ index: i - endWeekDay, date: "", count: 0 });
    config.data = tempArray;
    //显示星期标志
    if (config.showWeekDayFlag && config.weekDayFlagText) {
        //长度超过7，截取前7个
        if (config.weekDayFlagText.length > 7) {
            config.weekDayFlagText = config.weekDayFlagText.slice(0, 7);
        }
        for (let i = 0; i < config.height; i++) {
            if (i % 2 != 0) continue;
            config.weekDayFlagLength.push({
                length:
                    (config.fontSize * 4) / 2 +
                    20 +
                    config.cellInterval +
                    i * (config.cellLength + config.cellInterval / 2),
                text: config.weekDayFlagText[i % 7],
            });
        }
    }
}

//数据初始化
function init() {
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
    if (props.showHeader) config.showHeader = props.showHeader;
    if (props.backgroundColor) config.backgroundColor = props.backgroundColor;
    if (props.colors) config.colors = props.colors;
    if (typeof props.showWeekDayFlag == "boolean")
        config.showWeekDayFlag = props.showWeekDayFlag;
    if (props.weekDayFlagText) config.weekDayFlagText = props.weekDayFlagText;
    if (props.levelMapper) config.levelMapper = props.levelMapper;
    if (typeof props.showLevelFlag == "boolean")
        config.showLevelFlag = props.showLevelFlag;
    if (props.levelFlagText) config.levelFlagText = props.levelFlagText;
    if (props.fontSize) config.fontSize = props.fontSize;
    if (props.fontColor) config.fontColor = props.fontColor;
    if (props.clickEvent) config.clickEvent = props.clickEvent;
    calculateBeginDate();
    dataProcessor();
}

onMounted(() => {
    nextTick(() => {
        init();
    });
});
</script>
  
<style scoped lang="scss">
.activityCalendar {
    width: max-content;
    height: max-content;
    box-sizing: border-box;
    display: flex;

    .left {
        width: 100px;
        position: relative;

        > div {
            width: max-content;
            right: 0;
            position: absolute;
            font-size: 16px;
        }
    }

    .right {
        width: max-content;
        height: max-content;
        box-sizing: border-box;
        padding: 14px;
        display: flex;
        flex-direction: column;
        .header {
            position: relative;
            padding: 10px 0;
            div {
                width: max-content;
                top: 0;
                position: absolute;
            }
        }

        .content {
            display: grid;
            grid-auto-flow: column;
            .item {
                aspect-ratio: 1;
                margin: auto;
                transition-duration: 100ms;
                &:hover {
                    cursor: pointer;
                    transform: scale(1.2);
                }
            }
        }

        .levelFlagContent {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 10px 8px;

            .levelFlag {
                display: grid;
                grid-auto-flow: column;
                margin: 0 5px;

                div {
                    aspect-ratio: 1;
                    margin: auto;
                }
            }
        }
    }
}
</style>