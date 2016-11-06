<template>
	<navbar type="default">
		<!-- Brand as slot -->
		<a slot="brand" href="/" title="Home" class="navbar-brand">
        珠海腾仁通航模拟考试系统
        </a>
		<li>
			<a v-link="{ path: '/Exam' }">考试</a>
		</li>
		<li>
			<a v-link="{ path: '/Practice' }">练习</a>
		</li>
	</navbar>
	<router-view transition="vux-pop-in"></router-view>
</template>

<script>
    import {
        dropdown,
        navbar
    } from 'vue-strap'
    require('bootstrap3/dist/css/bootstrap.css')

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