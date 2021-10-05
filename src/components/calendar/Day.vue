<template>
    <div class="date" :class="this.selected ? 'selected' : ''" v-on:click="changeDay(daySelector)">
        <span v-b-tooltip.hover :title="tooltip">{{ this.tableData[4 + tableDataOffset] }}</span>
        <span class="week">{{ day }}</span>
        <span class="day">{{ dayDate }}</span>
        <span class="time" :class="this.tableData[5 + tableDataOffset] < this.tableData[6 + tableDataOffset] ? 'extra-hours':''">{{ this.tableData[7 + tableDataOffset] == totalWorkTime ? totalWorkTime : this.tableData[7 + tableDataOffset] }}</span>
    </div>
</template>
    
<script>
export default {
    name: 'Day',
    props: {
        tableDataOffset: Number,
        currentDay: String,
        selected: Boolean,
        day: String,
        dayDate: String,
        totalWorkTime: String,
        daySelector: String,
        changeDay: Function,
        tableData: Array,
        tooltip: String,
    },
    data() {
    },
}
</script>
