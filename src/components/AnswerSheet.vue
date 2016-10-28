<template>
	<div class="col-sm-2">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span>答题卡</span>
			</div>
			<div class="panel-body">
				<div class="answer-sheet">
					<div v-for="row of data" class="col-sm-1 text-center answer-cell" v-bind:class="{ 'answer-cell-done': row.done }">
						{{$index+1}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                data: []
            }
        },
        ready() {
            for (var i = 0; i < 155; i++) {
                this.data.push({
                    done: false
                })
            }
        }
    }
</script>
<style>
    .answer-sheet {}
    
    .answer-cell {
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
        background-color: yellow;
    }
</style>