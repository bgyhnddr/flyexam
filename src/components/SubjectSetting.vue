<template>
	<div class="container container-limited">
		<div v-if="checkPermission(['manager'])">
			<button @click="addSubject" class="btn btn-default">添加题类</button>
			<div style="position:relative">
				<spinner size="md" text="loading..."></spinner>
				<vue-strap-table :has-filter="false" :err-msg.sync="errMsg" :data.sync="data" :get-data-event="getData" :columns="columns"></vue-strap-table>
			</div>
			<modal :show.sync="showSubjectModel" effect="fade" width="400">
				<div slot="modal-header" class="modal-header">
					<h4 class="modal-title">
						题目类型
					</h4>
				</div>
				<div slot="modal-body" class="modal-body">
					<alert :type="alertType">
						{{alertText}}
					</alert>
					<bs-input :value.sync="submitData.name" label="类名"></bs-input>
					<bs-input type="textarea" :value.sync="submitData.comments" label="备注"></bs-input>
				</div>
				<div slot="modal-footer" class="modal-footer">
					<button type="button" class="btn btn-default" @click="showSubjectModel=false">关闭</button>
					<button :disabled="submitting" type="button" class="btn btn-success" @click="submitSubject">确认</button>
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
                "header": "类名",
                "bind": "name"
            }, {
                "header": "操作",
                "type": "action",
                "items": [{
                    eventName: "addQuestion",
                    tag: "button",
                    class: "btn-xs",
                    text: "题目管理"
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
                showSubjectModel: false,
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
                return this.submitData.name ? true : false
            }
        },
        methods: {
            checkPermission,
            addSubject() {
                this.submitData = {
                    id: undefined,
                    name: "",
                    comments: ""
                }
                this.showSubjectModel = true
            },
            submitSubject() {
                if (this.vaild) {
                    var that = this
                    that.submitting = true
                    manager.submitSubject(that.submitData).then(function(result) {
                        that.$broadcast("refreshData")
                        that.showSubjectModel = false
                        that.submitting = false
                    }).catch(function(err) {
                        that.serverMsg = err
                        that.submitting = false
                    })
                }
            },
            deleteSubject(row) {
                if (window.confirm("确认删除：" + row.name + "?删除后所以该类别下的题目将会清空")) {
                    var that = this
                    manager.deleteSubject({
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
                this.deleteSubject(row)
            },
            "getData": function(pageNum, countPerPage, filterKey, append) {
                let that = this
                that.$broadcast('show::spinner')
                manager.getSubjects().then(function(result) {
                    that.$broadcast('hide::spinner')
                    that.data = {
                        end: true,
                        list: result
                    }
                }).catch(function(err) {
                    that.errMsg = err
                    that.$broadcast('hide::spinner')
                })
            },
            'edit': function(row) {
                this.showSubjectModel = true
                this.submitData = {
                    id: row.id,
                    name: row.name,
                    comments: row.comments
                }
            },
            'addQuestion': function(row) {
                console.log(this.$route)
                this.$route.router.go("/admin/ExamManagement/Subject/" + row.name)
            }
        },
        ready() {
            this.$broadcast("refreshData")
        }
    }
</script>