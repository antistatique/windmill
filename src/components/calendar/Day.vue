<template>
  <div class="date" :class="this.currentDay === this.daySelector ? 'selected' : ''" v-on:click="changeDay(daySelector)">
    <span v-b-tooltip.hover :title="tooltip">{{ this.tableData[4 + tableDataOffset] }}</span>
    <span class="week">{{ day }}</span>
    <span class="day">{{ dayDate }}</span>
    <span :class="'time ' + computeTimeClass()">{{ doneHours }}</span>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    tableDataOffset: Number,
    currentDay: String,
    day: String,
    dayDate: String,
    daySelector: String,
    changeDay: Function,
    tableData: Array,
    tooltip: String,
  },
  methods: {
    computeTimeClass() {
      if (this.doneHours > this.legalHours) {
        return 'extra-hours'
      }

      return '';
    },
  },
  computed: {
    doneHours: function () {
      return this.tableData[7 + this.tableDataOffset];
    },
    legalHours: function () {
      let time = this.tableData[5 + this.tableDataOffset].split('.')
      return time[0].toString().padStart(2, '0') + ':' + (time[1] * 60 / 10).toString().padStart(2, '0') // Convert to a comparable format from 8.4 to 08:24
    },
  }
}
</script>
