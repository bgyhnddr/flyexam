<template>
	<div>
		<div v-if="checkPermission(['manager'])">
			<ol class="breadcrumb">
				<li><a v-link="{ path: '/admin/ExamManagement/Subject' }">题目类型</a></li>
				<li><a v-link="{ path: '/admin/ExamManagement/Subject/'+$route.params.subject }">{{$route.params.subject}}</a></li>
				<li class="active">答案管理</li>
			</ol>
			<div class="container-fluid container-limited">
				<h4>{{question.content}}</h4>
                <bs-input label="正确答案" :value.sync="question.answer_correct.answer_detail.value" type="text">
					<span slot="before" class="input-group-btn">
                        <button class="btn btn-default">保存更改</button>
                    </span>
				</bs-input>
				<vue-strap-table :has-filter="false" :data="worngData" :columns="wrong.columns"></vue-strap-table>
			</div>
		</div>
	</div>
</template>
<script>
    import manager from '../api/manager'
    import checkPermission from '../extend/check-permission'
    import VueStrapTable from './extend/vue-strap-table'
    import {
        input as bsInput
    } from 'vue-strap'

    export default {
        components: {
            VueStrapTable,
            bsInput
        },
        data() {
            return {
                question: {},
                wrong: {
                    columns: [{
                        "header": "错误答案",
                        "bind": "text"
                    }, {
                        "header": "操作",
                        "type": "action",
                        "items": [{
                            eventName: "edit",
                            tag: "button",
                            class: "btn-xs",
                            text: "编辑"
                        }, {
                            eventName: "delete",
                            tag: "button",
                            class: "btn-xs",
                            text: "删除"
                        }]
                    }]
                }
            }
        },
        computed: {
            worngData() {
                return {
                    end: true,
                    list: this.question.answer_wrongs
                }
            }
        },
        methods: {
            checkPermission,
            getQuestionAnswers() {
                var that = this
                return manager.getQuestionAnswers({
                    id: that.$route.params.question
                }).then((result) => {
                    that.question = result
                }).catch((err) => {
                    window.alert(err)
                })
            }
        },
        ready() {
            this.getQuestionAnswers()
        }
    }
</script>