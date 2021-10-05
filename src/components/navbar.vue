<template>
	<nav class="navbar fixed-bottom bg-light justify-content-around nav mx-auto rounded-top" v-bind:style="{maxWidth: '730px', minWidth: '330px', flexWrap: 'noWrap'}">
		<router-link class="navbar-brand" to="/home">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-edit">
				<g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
					<path d="M11.250 17.250 A6.000 6.000 0 1 0 23.250 17.250 A6.000 6.000 0 1 0 11.250 17.250 Z" fill="none" :stroke="this.$route.path === '/home' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M19.902 17.25L17.25 17.25 17.25 14.598" fill="none" :stroke="this.$route.path === '/home' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M8.25,20.25h-6a1.464,1.464,0,0,1-1.5-1.5V3.857A1.557,1.557,0,0,1,2.25,2.25h15a1.557,1.557,0,0,1,1.5,1.607V8.25" fill="none" :stroke="this.$route.path === '/home' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M5.25 0.75L5.25 5.25" fill="none" :stroke="this.$route.path == '/home' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M9.75 0.75L9.75 5.25" fill="none" :stroke="this.$route.path == '/home' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M14.25 0.75L14.25 5.25" fill="none" :stroke="this.$route.path == '/home' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
				</g>
			</svg>
		</router-link>
		<router-link class="navbar-brand" to="/dashboard">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-dashboad">
				<g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
					<path d="M12,4.5A11.336,11.336,0,0,0,.75,15.923V18a1.5,1.5,0,0,0,1.5,1.5h19.5a1.5,1.5,0,0,0,1.5-1.5v-2.08A11.336,11.336,0,0,0,12,4.5Z" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M9,19.5v-.75a3,3,0,0,1,6,0v.75" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M14.25 9.003L12 15.753" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M4.875 15.003L4.875 15.003" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M4.875,15a.375.375,0,1,0,.375.375A.375.375,0,0,0,4.875,15" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M6.375 11.253L6.375 11.253" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M6.375,11.253a.375.375,0,1,0,.375.375.375.375,0,0,0-.375-.375" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M19.125 15.003L19.125 15.003" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M19.125,15a.375.375,0,1,0,.375.375A.375.375,0,0,0,19.125,15" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M17.625 11.253L17.625 11.253" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M17.625,11.253a.375.375,0,1,0,.375.375.375.375,0,0,0-.375-.375" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M9.375 8.253L9.375 8.253" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
					<path d="M9.375,8.253a.375.375,0,1,0,.375.375.375.375,0,0,0-.375-.375" fill="none" :stroke="this.$route.path === '/dashboard' ? '#000':'#999'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
				</g>
			</svg>
		</router-link>
	</nav>
</template>

<style>
	a {
		padding: 3em;
	}

	.nav router-link {
		display: block;
		width: 50%;
		text-align: center;
		padding: .25rem;
		cursor: pointer;
	}
	.nav .active .icon {
		color: #000;
	}
	.nav .icon {
		font-size: 2.0625rem;
		color: #999;
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
</style>
