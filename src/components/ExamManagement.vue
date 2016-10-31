<template>
	<div>
		<div v-if="checkPermission(['manager'])">
			<navbar type="default">
				<a slot="brand" class="navbar-brand">考试管理</a>
				<li>
					<a v-link="{ path: '/admin/ExamManagement/Subject' }">题目管理</a>
				</li>
				<li>
					<a v-link="{ path: '/admin/ExamManagement/Topic' }">考试类型管理</a>
				</li>
			</navbar>
			<router-view transition="vux-pop-in"></router-view>
		</div>
	</div>
</template>

<script>
    import {
        navbar
    } from 'vue-strap'
    import checkPermission from '../extend/check-permission'

    export default {
        components: {
            navbar
        },
        methods: {
            checkPermission
        }
    }
</script>