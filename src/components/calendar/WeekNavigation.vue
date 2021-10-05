<template>
    <div class="header-calendar">
        <!-- Left arrow -->
        <div class="d-flex p-3" v-on:click="$store.state['authorization'].keyArray != 0 ? changeWeek(-1) : null">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-arrow-left">
            <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
              <path d="M16.25,23.25,5.53,12.53a.749.749,0,0,1,0-1.06L16.25.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
            </g>
          </svg>
        </div>

        <div class="d-flex justify-content-center align-items-center flex-grow-1 flex-column">
          <div class="month">{{ currentMonth }}</div>
          <div class="week">Semaine {{ currentWeek }}</div>
          <div class="flex justify-content-center">
            <customButton :action="today" :text="'Aujourd\'hui'" v-show="(currentWeek != baseWeek)" :variant="'button button-tertiary'"/>
          </div>
        </div>

        <!-- Right arrow -->
        <div class="d-flex p-3" v-on:click="$store.state['authorization'].keyArray != $store.state['authorization'].mainTableData.length ? changeWeek(1) : null">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-arrow-right">
            <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
              <path d="M5.5.75,16.22,11.47a.749.749,0,0,1,0,1.06L5.5,23.25" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
            </g>
          </svg>
        </div>
      </div>
</template>

<script>
import customButton from '../Button'

export default {
    name: 'WeekNavigation',
    components: {
      customButton
    },
    props: {
        store: Object,
        currentWeek : String,
        currentMonth : String,
        changeWeek: Function,
        today: Function,
    },
    updated() {
      this.baseWeek = this.baseWeek === null ? this.currentWeek : this.baseWeek
    },
    data() {
        return {
            baseWeek: this.currentWeek,
        }
    }
}
</script>
