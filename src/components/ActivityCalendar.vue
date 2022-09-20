<template>
  <div class="activityCalendar">
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in config.data"
        :key="index"
        :style="
          'width:' +
          config.cellLength +
          'px; background-color:' +
          config.colors[item.count]
        "
      ></div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/runtime-core";
export default {
  name: "ActivityCalendar",
  props: [
    "endDate",
    "width",
    "height",
    "cellLength",
    "header",
    "colors",
    "levels",
  ],
  setup(props) {
    const config = reactive({
      data: [
        { date: "2020-08-02", count: 2 },
        { date: "2020-08-03", count: 3 },
        { date: "2020-08-04", count: 1 },
        { date: "2020-08-05", count: 0 },
        { date: "2020-08-06", count: 0 },
        { date: "2020-08-07", count: 0 },
        { date: "2020-08-08", count: 6 },
        { date: "2020-08-15", count: 6 },
        { date: "2020-08-22", count: 6 },
        { date: "2020-08-29", count: 6 },
        { date: "2020-09-05", count: 6 },
        { date: "2020-09-28", count: 6 },
        { date: "2020-09-22", count: 6 },
        { date: "2020-09-23", count: 6 },
        { date: "2020-09-24", count: 6 },
        { date: "2020-10-04", count: 6 },
        { date: "2020-10-02", count: 6 },
        { date: "2020-10-10", count: 6 },
        { date: "2020-10-11", count: 6 },
        { date: "2020-10-17", count: 6 },
        { date: "2020-10-19", count: 6 },
        { date: "2020-10-23", count: 6 },
        { date: "2020-10-27", count: 6 },
        { date: "2020-10-28", count: 6 },
        { date: "2020-10-29", count: 6 },
        { date: "2020-11-22", count: 6 },
        { date: "2020-11-30", count: 6 },
        { date: "2020-12-08", count: 6 },
        { date: "2020-12-16", count: 6 },
        { date: "2020-12-24", count: 6 },
        { date: "2021-01-01", count: 6 },
        { date: "2021-01-09", count: 6 },
        { date: "2021-01-16", count: 6 },
        { date: "2021-01-22", count: 6 },
        { date: "2021-01-28", count: 6 },
        { date: "2021-02-03", count: 6 },
        { date: "2021-02-09", count: 6 },
        { date: "2021-02-15", count: 6 },
        { date: "2021-02-21", count: 6 },
        { date: "2021-03-21", count: 6 },
        { date: "2021-03-22", count: 6 },
        { date: "2021-03-23", count: 6 },
        { date: "2021-03-24", count: 6 },
        { date: "2021-03-25", count: 6 },
        { date: "2021-03-26", count: 6 },
        { date: "2021-03-27", count: 6 },
        { date: "2021-03-28", count: 6 },
        { date: "2021-03-31", count: 6 },
        { date: "2021-04-03", count: 6 },
        { date: "2021-04-07", count: 6 },
        { date: "2021-04-04", count: 6 },
        { date: "2021-04-10", count: 6 },
        { date: "2021-04-11", count: 6 },
        { date: "2021-04-14", count: 6 },
        { date: "2021-04-17", count: 6 },
        { date: "2021-04-18", count: 6 },
        { date: "2021-04-21", count: 6 },
        { date: "2021-04-24", count: 6 },
        { date: "2021-04-25", count: 6 },
        { date: "2021-04-28", count: 6 },
        { date: "2021-05-01", count: 6 },
        { date: "2021-05-02", count: 6 },
        { date: "2021-05-05", count: 6 },
        { date: "2021-05-08", count: 6 },
        { date: "2021-05-09", count: 6 },
        { date: "2021-05-12", count: 6 },
        { date: "2021-05-15", count: 6 },
      ],
      endDate: "",
      width: 25,
      height: 6,
      cellLength: 20,
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
      colors: [
        "#ffffff",
        "#ebfaff",
        "#e5f9ff",
        "#c7f1ff",
        "#86e0fe",
        "#3ecefe",
      ],

      levels: 5,
    });

    onMounted(() => {
      if (props.endDate) config.endDate = props.endDate;
    });

    return {
      config,
    };
  },
};
</script>

<style scoped>
.content {
  display: grid;
  grid-auto-flow: column;
}

.content .item {
  aspect-ratio: 1;
}
</style>