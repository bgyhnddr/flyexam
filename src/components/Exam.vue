<template>
<div class="container container-limited">
	<button class="btn btn-default" @click="$route.router.go('/Exam')">离开考试</button>
	<button v-if="limit" class="btn btn-primary" @click="limit=0">立即交卷</button>
	<timers :limit.sync="limit" :timeup.sync="timeup"></timers>
	<h3>{{name}}</h3>
	<h3>总分：{{scoreTotal}}</h3>
	<h3>得分：{{score}}</h3>
	<answer-sheet class="window-show" :timeup.sync="timeup" :questions.sync="questions" :active-index.sync="activeIndex"></answer-sheet>
	<button class="btn btn-primary window-hide" @click="sideShow=true">答题卡</button>
	<aside :show.sync="sideShow" placement="left" header="答题卡" width="350">
		<answer-sheet-side :side-show.sync="sideShow" :timeup.sync="timeup" :questions.sync="questions" :active-index.sync="activeIndex"></answer-sheet-side>
	</aside>
	<question :timeup.sync="timeup" :questions.sync="questions" :active-index.sync="activeIndex"></question>
</div>
</template>
<script>
import Timers from './Timers'
import AnswerSheet from './AnswerSheet'
import AnswerSheetSide from './AnswerSheetSide'
import Question from './Question'
import exam from '../api/exam'
import {
	aside
} from 'vue-strap'
export default {
	components: {
		Timers,
		AnswerSheet,
		Question,
		AnswerSheetSide,
		aside
	},
	data() {
		return {
			scoreTotal: 0,
			activeIndex: 0,
			questions: [],
			timeup: false,
			limit: 0,
			name: "",
			sideShow: false
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
<style>
.window-show {
	display: none;
}

@media (min-width: 768px) {
	.window-show {
		display: block;
	}
	.window-hide {
		display: none;
	}
}
</style>
