<template>
	<div class="container container-limited">
        <button class="btn btn-default" @click="$route.router.go('/Exam')">离开考试</button>
        <button v-if="limit" class="btn btn-primary" @click="limit=0">立即交卷</button>
		<timers :limit.sync="limit" :timeup.sync="timeup"></timers>
        <h3>{{name}}</h3>
        <h3>总分：{{scoreTotal}}</h3>
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
                scoreTotal: 0,
                activeIndex: 0,
                questions: [],
                timeup: false,
                limit: 0,
                name: ""
            }
        },
        computed: {
            score() {
                var that = this
                if (that.timeup) {
                    var score = that.questions.reduce((sum, o) => {
                        if (o.answers.some(a => a.value == o.choose && a.right)) {
                            return sum + 1
                        } else {
                            return sum
                        }
                    }, 0)
                    return (score / that.questions.length * that.scoreTotal).toFixed(2)
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
                    that.limit = result.limit
                    that.name = result.name
                    that.scoreTotal = result.score
                    that.questions = result.questions.map(o => {
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