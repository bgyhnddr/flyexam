<template>
	<div class="container-fluid container-limited">
        <button class="btn btn-default" @click="$route.router.go('/Exam')">离开考试</button>
		<timers :timeup.sync="timeup"></timers>
        <h3>得分：{{score}}</h3>
        <answer-sheet :timeup.sync="timeup" :questions.sync="questions" :active-index.sync="activeIndex"></answer-sheet>
        <question :timeup.sync="timeup" :questions.sync="questions" :active-index.sync="activeIndex"></question>
	</div>
</template>
<script>
    import Timers from './Timers'
    import AnswerSheet from './AnswerSheet'
    import Question from './Question'
    import exam from '../api/exam'

    export default {
        components: {
            Timers,
            AnswerSheet,
            Question
        },
        data() {
            return {
                activeIndex: 0,
                questions: [],
                timeup: false
            }
        },
        computed: {
            score() {
                var that = this
                if (that.timeup) {
                    return that.questions.reduce((sum, o) => {
                        if (o.answers.some(a => a.value == o.choose && a.right)) {
                            return sum + 1
                        } else {
                            return sum
                        }
                    }, 0)
                } else {
                    return ""
                }
            }
        },
        methods: {
            getExam(id) {
                var that = this
                return exam.getExam({
                    id: id
                }).then((result) => {
                    that.questions = result.map(o => {
                        o.choose = ""
                        return o
                    })
                })
            }
        },
        ready() {
            this.getExam(this.$route.params.id)
        }
    }
</script>