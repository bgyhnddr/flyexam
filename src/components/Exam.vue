<template>
	<div class="container-fluid container-limited">
        <button class="btn btn-default" @click="$route.router.go('/Exam')">离开考试</button>
		<timers></timers>
        <answer-sheet></answer-sheet>
        <question></question>
	</div>
</template>
<script>
    import Timers from './Timers'
    import AnswerSheet from './AnswerSheet'
    import Question from './Question'

    export default {
        components: {
            Timers,
            AnswerSheet,
            Question
        }
    }
</script>