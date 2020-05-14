<template>
	<nav class="navbar fixed-bottom navbar-light bg-light justify-content-around">
		<router-link class="navbar-brand" to="/home"><BIconCalendar/></router-link> 
		<router-link class="navbar-brand" to="/dashboard"><BIconClipboardData/></router-link> 
	</nav>
</template>
<script>
import { BIconClipboardData, BIconCalendar } from 'bootstrap-vue'
export default {
	components: {
		BIconCalendar,
		BIconClipboardData
	}
}
</script>