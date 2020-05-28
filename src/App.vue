<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from './components/navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  #app {
    font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .btn.btn-costum {
    font-size: 16px;
    background-color: #e30074;
    color: white;
    border-color: #edf0f3;
  }
  .btn.btn-costum:hover {
    font-size: 16px;
    background-color: #e30074;
    color: white;
    border-color: #edf0f3;
  }
  .border {
    border-radius: 10px;
  }
  .stamp-hours {
    margin: 1rem;
  }
  .header-calendar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .wrap-status {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: .5rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    background-color: #eff4fa;
  }
  .calendar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 1.5rem;
  }
  .table-data {
    width: 100%;
    border-collapse: collapse;
  }
  table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    border-spacing: 2px;
    border-color: grey;
  }
  .buttons-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .header-calendar .icon {
    color: #c4cad0;
  }
  .icon, .icon svg {
    width: 1em;
    height: 1em;
  }
  .icon {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-item-align: center;
    align-self: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    top: .11em;
    font-size: 1rem;
    color: inherit;
  }
  .header-calendar .month {
    font-size: .625rem;
    font-weight: 400;
    text-align: center;
  }
  .header-calendar .week {
    font-size: .875rem;
    font-weight: 600;
    text-align: center;
  }
  .wrap-status .hours {
    font-size: .75rem;
  }
  .wrap-status .denominator {
    font-weight: 600;
  }
  .wrap-status .numerator {
    font-size: 1.3125rem;
    font-weight: 600;
  }
  .button.button-primary {
    padding: 1rem;
    background-color: #e30074;
    font-size: 1rem;
    color: #fff;
    -webkit-transition: background .2s;
    transition: background .2s;
  }
  .button.button-tertiary {
    background-color: #e30074;
    font-size: 1rem;
    color: #fff;
    -webkit-transition: background .2s;
    transition: background .2s;
  }
  .button {
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }
  button {
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    background-color: buttonface;
    box-sizing: border-box;
    margin: 0em;
    font: 400 11px system-ui;
    padding: 1px 7px 2px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    border-image: initial;
  }
  .calendar .date {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }
  .date {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: .5rem;
    border-radius: 3px;
    border: 1px solid transparent;
    font-weight: 400;
  }
  .date .week {
    color: #8a9198;
  }
  .date .day {
    color: #000032;
  }
  .date .time {
    font-size: .8rem;
  }
  .date.selected {
    border: 1px solid #e30074;
  }
  .entry-hours thead th {
    font-size: .875rem;
  }
  .table-data thead th {
    margin-bottom: .5rem;
    border-radius: 4px;
    padding: .125rem .5rem;
    line-height: 1.5rem;
    color: #000032;
    background-color: #edf0f3;
    text-align: left;
  }
  .table-data tbody tr {
    border-bottom: 1px solid #dbe1e7;
  }
  .entry-hours tbody td {
    padding: 1rem .5rem;
  }
  .table-data tbody td:last-of-type {
    text-align: right;
  }
  .entry-hours tbody tr:last-of-type {
    border-bottom: 0;
  }
  .buttons-row button:first-child {
    flex-grow: 1;
    padding: 0px;
  }
  .buttons-row button {
    flex: 0 0 3.15rem;
    margin-right: .5rem; 
  }
  .buttons-row button:last-of-type {
    margin-right: 0;
  }
  .entry-hours .button.button-secondary {
    padding: .3125rem;
    margin-right: 1.5rem;
  }
  .button.button-secondary {
    padding: 1rem;
    color: #e30074;
    background-color: #faddea;
  }
  .form-control-custom {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    width: 70%;
    text-align: center;
    color: #495057;
    padding: 0.375rem 0.75rem;
  }
  .form-control {
    width: 70% !important;
    text-align: center;
  }
  .button.button-number {
    padding-bottom: .5rem;
    padding-top: .5rem;
    background-color: #fff;
    color: #52565b;
    -webkit-transition: background-color .2s;
    transition: background-color .2s;
    width: 100%;
  }
  .button.button-validation {
    width: 100%;
    padding: 1rem;
    background-color: #e30074;
    font-size: 1rem;
    color: #fff;
    -webkit-transition: background .2s;
    transition: background .2s;
  }
  	.username {
		display: inline-block;
		margin: 0;
		padding: .55rem .96rem;
		font-size: 1rem;
		color: #fff!important;
		background-color: hsla(0,0%,100%,.19);
		text-align: center;
	}
	.title, .username {
		border-radius: 4px;
		font-weight: 600;
	}
	h1 {
		display: block;
		font-size: 2em;
		margin-block-start: 0.67em;
		margin-block-end: 0.67em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}
	.header {
		background-color: #000032;
		text-align: center;
		padding-top: .5rem;
		padding-bottom: .5rem;
		opacity: .9;
		margin: 0;
	}
	.header .icon-right {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: end;
		-ms-flex-pack: end;
		justify-content: flex-end;
		margin-right: 1.5rem;
	}
	.header .header-title-bold {
		margin-top: 0;
		margin-bottom: 0;
		padding: .5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: #fff;
	}
	.header .header-subtitle-regular {
		margin: 0;
		font-size: .75rem;
		font-weight: 400;
		color: #fff;
	}
	.header .icon-right .icon {
		font-size: 1.25rem;
		color: #fff;
	}
	.data-tables {
		margin: 1rem;
	}
	.table-count {
		margin-bottom: 1.5rem;
	}
	.table-data {
		width: 100%;
		border-collapse: collapse;
	}
	.table-data thead th {
		margin-bottom: .5rem;
		border-radius: 4px;
		padding: .125rem .5rem;
		line-height: 1.5rem;
		color: #000032;
		background-color: #edf0f3;
		text-align: left;
	}
	.table-data tbody tr {
		border-bottom: 1px solid #dbe1e7;
	}
	.table-count tbody td {
		padding: .5rem;
	}
	.table-count tbody td:last-of-type {
		font-weight: 600;
	}
	.table-data tbody td:first-of-type {
		text-align: left;
	}
	.table-data tbody td:last-of-type {
		text-align: right;
	}
</style>
