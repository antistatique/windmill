<template>
    <div class="wrap-status">
        <div>
          <span class="hours">Heures <span v-show="baseWeek >= currentWeek && showSmiley">{{ this.$store.state['authorization'].smiley }}</span></span>
          <div class="denominator"><span class="numerator">{{ this.tableData[44] }}</span>/ {{ this.tableData[45] }}</div>
        </div>
        <customButton :action="toggleModaleJustifyHour" :text="'Justifier les heures'" :variant="'button button-primary'" v-show="this.dispalyJustification"/>
    </div>
</template>

<script>

import customButton from './Button.vue'

export default {
    name: 'Justification',
    components: {
      customButton
    },
    props: {
        store: Object,
        baseWeek : Number,
        currentWeek: String,
        tableData: Array,
        showSmiley: Boolean,
        toggleModaleJustifyHour: Function
    },
    data() {
        return {
            dispalyJustification: false
        }
    },
    beforeUpdate() {
        this.dispalyJustification = (this.$store.state['authorization'].smiley === '🤔' && this.baseWeek >= this.currentWeek && this.showSmiley ) // Need to use store because there is some delay before getting the new smilley value
    }
}

</script>
