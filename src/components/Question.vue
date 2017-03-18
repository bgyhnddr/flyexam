<template>
	<div class="col-sm-9">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span>第{{activeIndex+1}}题</span>
			</div>
			<div class="panel-body">
				<div v-for="row in questions">
					<div v-if="$index == activeIndex">
						<h4>{{row.content}}</h4>
                        <radio v-for="a in row.answers" type="primary" :disabled="timeup" :checked.sync="row.choose" :value="a.value">
                            <span>{{getABC($index+1)}}、</span>
							<img style="max-width: 200px;" v-if="a.type=='img'" :src="getImg(a.value)"></img>
							<span v-if="a.type=='string'">{{a.value}}</span>
                            <span v-if="a.right&&timeup" class="glyphicon glyphicon-ok pull-right animated shake hidden-xs hidden-sm"></span>
						</radio>
					</div>
				</div>
			</div>
			<div class="panel-footer">
				<div class="text-center" style="overflow:hidden">
					<button v-if="activeIndex>0" type="button" class="btn btn-success pull-left" @click="prev">上一题</button>
					<button type="button" class="btn pull-center" v-bind:class="{ 'btn-primary': questions[activeIndex].mark, 'btn-default': !questions[activeIndex].mark }" @click="mark">标记问题</button>
					<button v-if="activeIndex<questions.length-1" type="button" class="btn btn-success pull-right" @click="next">下一题</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import {
        radio,
        checkbox
    } from 'vue-strap'
    export default {
        data() {
            return {
                data: {}
            }
        },
        components: {
            radio,
            checkbox
        },
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
        methods: {
            prev() {
                if (this.activeIndex <= 0) {
                    this.activeIndex = 0
                } else {
                    this.activeIndex -= 1
                }
            },
            next() {
                if (this.activeIndex >= this.questions.length - 1) {
                    this.activeIndex = this.questions.length - 1
                } else {
                    this.activeIndex += 1
                }
            },
            getImg(id) {
                return '/service/public/upload/getAttachment?id=' + id
            },
            getABC(index) {
                return String.fromCharCode(64 + parseInt(index))
            },
            mark() {
                var obj = this.questions[this.activeIndex]
                obj.mark = obj.mark ? "" : "mark"
                var newObj = {}
                for (var i in obj) {
                    newObj[i] = obj[i]
                }

                this.questions.$set(this.activeIndex, newObj)
            }
        },
        watch: {},
        ready() {}
    }
</script>
