<template>
	<div class="container-fluid container-limited">
		<div v-for="row of subjects">
			<div class="panel panel-default">
				<div class="panel-heading">
					<span>{{row.name}}</span>
				</div>
				<div class="panel-body">
					<button @click="begin(row)" class="btn btn-default">开始练习</button>
					<div>题库：{{row.question_count}}条</div>
					<!--<bs-input :value.sync="row.comments" label="备注" readonly type="textarea"></bs-input>-->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import exam from '../api/exam'
    import {
        input as bsInput
    } from 'vue-strap'

    export default {
        data() {
            return {
                subjects: []
            }
        },
        components: {
            bsInput
        },
        methods: {
            getSubjects() {
                var that = this
                return exam.getSubjects().then((result) => {
                    that.subjects = result
                })
            },
            begin(row) {
                this.$route.router.go("/Practice/" + row.id)
            }
        },
        ready() {
            this.getSubjects()
        }
    }
</script>