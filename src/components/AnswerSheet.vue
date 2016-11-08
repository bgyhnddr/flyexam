<template>
	<div class="col-sm-3">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span>答题卡</span>
			</div>
			<div class="panel-body">
				<div class="answer-sheet">
					<div @click="clickAnswer(row,$index)" v-for="row of questions" class="text-center answer-cell {{getCellClass(row)}}">
						{{$index+1}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        props: {
            questions: {
                type: Array,
                default: []
            },
            timeup: {
                type: Boolean,
                default: false
            },
            activeIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {}
        },
        methods: {
            getCellClass(row) {
                if (this.timeup) {
                    if (row.answers.filter((o) => {
                            return o.value == row.choose && o.right
                        }).length > 0) {
                        return "answer-cell-done"
                    } else {
                        return "answer-cell-wrong"
                    }
                } else {
                    if (row.mark) {
                        return "answer-cell-mark"
                    } else if (row.choose) {
                        return "answer-cell-done"
                    } else {
                        return ""
                    }
                }
            },
            clickAnswer(row, index) {
                this.activeIndex = index
            }
        },
        ready() {}
    }
</script>
<style>
    .answer-cell {
        display: inline-block;
        margin-left: 1px;
        margin-top: 1px;
        display: inline-block;
        background-color: #f9f9f9;
        height: 25px;
        width: 25px;
        line-height: 25px;
        cursor: pointer;
        text-align: center;
        font-size: 12px;
        transition: all 0.3s;
        padding: 0
    }
    
    .answer-cell:hover {
        background-color: #aad7ff;
    }
    
    .answer-cell-done {
        background-color: yellowgreen;
    }
    
    .answer-cell-mark {
        color: white;
        background-color: blue;
    }
    
    .answer-cell-wrong {
        color: white;
        background-color: red;
    }
</style>