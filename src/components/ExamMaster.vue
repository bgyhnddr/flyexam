<template>
<navbar type="default">
	<!-- Brand as slot -->
	<a slot="brand" href="/" title="Home" class="navbar-brand" style="font-size:12px">
		珠海腾仁通航模拟考试系统
	</a>
	<li>
		<a v-link="{ path: '/Exam' }">考试</a>
	</li>
	<li>
		<a v-link="{ path: '/Practice' }">练习</a>
	</li>
</navbar>
<router-view></router-view>
</template>

<script>
import {
	dropdown,
	navbar
} from 'vue-strap'

export default {
	data() {
		return {}
	},
	components: {
		dropdown,
		navbar
	}
}
</script>
