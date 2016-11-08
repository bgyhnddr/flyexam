<template>
	<div class="container container-limited">
        <div v-for="row of exams" class="col-sm-3 text-center">
			<div class="panel panel-default">
				<div class="panel-heading">
					<span>{{row.name}}</span>
				  </div>
				<div class="panel-body">
					<button @click="begin(row)" class="btn btn-default">开始考试</button>
					<div>时限：{{row.time_limit}}分钟</div>
					<div>总分：{{row.score}}分</div>
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
                exams: []
            }
        },
        components: {
            bsInput
        },
        methods: {
            getExams() {
                var that = this
                return exam.getExams().then((result) => {
                    that.exams = result
                })
            },
            countScore(row) {
                return row.exam_subjects.reduce((a, b) => {
                    return a + b.question_count
                }, 0)
            },
            begin(row) {
                this.$route.router.go("/Exam/" + row.id)
            }
        },
        ready() {
            this.getExams()
        }
    }
</script>