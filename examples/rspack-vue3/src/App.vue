<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import VueLogo from '~icons/logos/vue'

console.log(VueLogo)
const title = ref("Rspack + Vue");
</script>

<template>
	<div>
		<a href="https://www.rspack.dev/" target="_blank">
			<img src="./assets/rspack.svg" class="logo" alt="Rspack logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<VueLogo class="logo vue" style="width: 6em;" alt="Vue logo" />
		</a>
	</div>
	<HelloWorld :msg="title" />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
