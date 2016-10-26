<template>
	<div class="container-fluid container-limited">
		<div v-if="checkPermission(['manager'])">
			<ol class="breadcrumb">
				<li><a v-link="{ path: '/admin/ExamManagement/Subject' }">题目类型</a></li>
				<li class="active">{{$route.params.subject}}</li>
			</ol>
            <button @click="addQuestion" class="btn btn-default">添加题目</button>
			<div style="position:relative">
				<spinner size="md" text="loading..."></spinner>
				<vue-strap-table :err-msg.sync="errMsg" :data.sync="data" :get-data-event="getData" :columns="columns"></vue-strap-table>
			</div>
            <modal :show.sync="showQuestionModel" effect="fade" width="400">
				<div slot="modal-header" class="modal-header">
					<h4 class="modal-title">
						题目
					</h4>
				</div>
				<div slot="modal-body" class="modal-body">
					<alert :type="alertType">
						{{alertText}}
					</alert>
					<bs-input type="textarea" :value.sync="submitData.content" label="内容"></bs-input>
				</div>
				<div slot="modal-footer" class="modal-footer">
					<button type="button" class="btn btn-default" @click="showQuestionModel=false">关闭</button>
					<button :disabled="submitting" type="button" class="btn btn-success" @click="submitQuestion">确认</button>
				</div>
			</modal>
		</div>
	</div>
</template>
<script>
    import VueStrapTable from './extend/vue-strap-table'
    import {
        spinner,
        modal,
        alert,
        input as bsInput
    } from 'vue-strap'
    import manager from '../api/manager'
    import checkPermission from '../extend/check-permission'

    export default {
        props: {
            selectable: {
                type: Boolean,
                default: false
            },
            selectEvent: {
                type: String,
                default: 'select'
            }
        },
        components: {
            VueStrapTable,
            spinner,
            modal,
            alert,
            bsInput
        },
        data() {
            let columns = [{
                "header": "内容",
                "bind": "content"
            }, {
                "header": "操作",
                "type": "action",
                "items": [{
                    eventName: "addAnswer",
                    tag: "button",
                    class: "btn-xs",
                    text: "选项管理"
                }, {
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
            if (this.selectable) {
                columns.unshift({
                    "header": "",
                    "type": "action",
                    "items": [{
                        eventName: this.selectEvent,
                        tag: "button",
                        class: "btn-xs",
                        text: "choose"
                    }]
                })
            }
            return {
                submitting: false,
                getData: "getData",
                showQuestionModel: false,
                data: {},
                serverMsg: "",
                columns: columns,
                errMsg: "",
                submitData: {
                    id: "",
                    name: "",
                    comments: ""
                }
            }
        },
        computed: {
            alertType() {
                return this.vaild ? "success" : "warning"
            },
            alertText() {
                if (this.serverMsg) {
                    return this.serverMsg;
                }
                let returnText = "OK";
                if (!this.vaild) {
                    returnText = "输入信息"
                }
                return returnText
            },
            vaild() {
                return this.submitData.content ? true : false
            }
        },
        methods: {
            checkPermission,
            addQuestion() {
                this.submitData = {
                    id: undefined,
                    content: ""
                }
                this.showQuestionModel = true
            },
            submitQuestion() {
                if (this.vaild) {
                    var that = this
                    that.submitting = true
                    manager.submitQuestion({
                        id: that.submitData.id,
                        content: that.submitData.content,
                        subject: this.$route.params.subject
                    }).then(function(result) {
                        that.$broadcast("refreshData")
                        that.showQuestionModel = false
                        that.submitting = false
                    }).catch(function(err) {
                        that.serverMsg = err
                        that.submitting = false
                    })
                }
            },
            deleteQuestion(row) {
                if (window.confirm("是否确认删除题目：" + row.content)) {
                    var that = this
                    manager.deleteQuestion({
                        id: row.id
                    }).then(function(result) {
                        that.$broadcast("refreshData")
                    }).catch(function(err) {
                        window.alert(err)
                    })
                }
            }
        },
        events: {
            "delete": function(row) {
                this.deleteQuestion(row)
            },
            "getData": function(pageNum, countPerPage, filterKey, append) {
                let that = this
                that.$broadcast('show::spinner')
                manager.getQuestions(that.$route.params.subject, pageNum, countPerPage, filterKey).then(function(result) {
                    that.$broadcast('hide::spinner')
                    that.data = result
                }).catch(function(err) {
                    that.errMsg = err
                    that.$broadcast('hide::spinner')
                })
            },
            'edit': function(row) {
                this.showQuestionModel = true
                this.submitData = {
                    id: row.id,
                    name: row.content
                }
            },
            'addAnswer': function(row) {
                this.$route.router.go("/admin/ExamManagement/Subject/" + this.$route.params.subject + "/" + row.id)
            }
        },
        ready() {
            this.$broadcast("refreshData")
        }
    }
</script>