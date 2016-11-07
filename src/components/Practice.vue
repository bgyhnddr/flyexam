<template>
	<div class="container container-limited">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span>{{subject.name}}</span>
			</div>
			<div class="panel-body">
				<div>当前：{{activeIndex+1}}/{{subject.questions.length}}</div>
				<div v-for="row in subject.questions">
					<div v-if="$index == activeIndex">
						<h4>{{row.content}}</h4>
						<radio v-for="a in row.answers" type="primary" :disabled="row.done" :checked.sync="row.choose" :value="a.value">
							<img :style="a.right&&row.done?'border:3px solid':'';" v-if="a.type=='img'" :src="getImg(a.value)"></img>
							<span v-if="a.type=='string'">{{a.value}}</span>
                            <span v-if="a.right&&row.done" class="glyphicon glyphicon-ok pull-right animated shake hidden-xs hidden-sm"></span>
						</radio>
					</div>
				</div>
			</div>
			<div class="panel-footer">
				<div class="text-center" style="overflow:hidden">
					<button v-if="showAnswerButton" type="button" class="btn btn-success pull-left" @click="confirm">显示答案</button>
					<button v-if="!showAnswerButton&&activeIndex<subject.questions.length-1" type="button" class="btn btn-success pull-left" @click="next">下一题</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import exam from '../api/exam'
    import {
        radio
    } from 'vue-strap'
    export default {
        data() {
            return {
                subject: {
                    name: "",
                    questions: []
                },
                activeIndex: 0
            }
        },
        computed: {
            showAnswerButton() {
                if (this.subject.questions.length > this.activeIndex) {
                    return !this.subject.questions[this.activeIndex].done
                } else {
                    return false
                }
            }
        },
        components: {
            radio
        },
        methods: {
            confirm() {
                this.subject.questions[this.activeIndex].done = true
            },
            next() {
                if (this.activeIndex >= this.subject.questions.length - 1) {
                    this.activeIndex = this.subject.questions.length - 1
                } else {
                    this.activeIndex += 1
                }
            },
            getSubject(id) {
                var that = this
                return exam.getSubject({
                    id: id
                }).then((result) => {
                    that.subject = {
                        name: result.name,
                        questions: result.questions.map((o) => {
                            o.done = false
                            o.choose = ""
                            return o
                        })
                    }
                }).catch((err) => {
                    window.alert(err)
                })
            },
            getImg(id) {
                return '/service/public/upload/getAttachment?id=' + id
            }
        },
        watch: {},
        ready() {
            this.getSubject(this.$route.params.id)
        }
    }
</script>