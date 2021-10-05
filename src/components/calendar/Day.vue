<template>
  <div class="date" :class="this.selected ? 'selected' : ''" v-on:click="changeDay(daySelector)">
    <span v-b-tooltip.hover :title="tooltip">{{ this.tableData[4 + tableDataOffset] }}</span>
    <span class="week">{{ day }}</span>
    <span class="day">{{ dayDate }}</span>
    <span :class="'time ' + computeTimeClass()">{{ totalHours }}</span>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    tableDataOffset: Number,
    selected: Boolean,
    day: String,
    dayDate: String,
    daySelector: String,
    changeDay: Function,
    tableData: Array,
    tooltip: String,
  },
  methods: {
    computeTimeClass() {
      if (this.doneHours < this.legalHours || this.doneHours > this.legalHours) {
        return 'extra-hours'
      }

      return '';
    },
  },
  computed: {
    doneHours: function () {
      return this.tableData[6 + this.tableDataOffset];
    },
    legalHours: function () {
      return this.tableData[5 + this.tableDataOffset];
    },
    totalHours: function () {
      return this.tableData[7 + this.tableDataOffset];
    },
    emoji: function() {
      return this.tableData[4 + this.tableDataOffset] ?? '?';
    }
  }
}
</script>
