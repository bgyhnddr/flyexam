<template>
	<div class="container-fluid container-limited">
		<div v-if="checkPermission(['manager'])">
			<ol class="breadcrumb">
				<li><a v-link="{ path: '/admin/ExamManagement/Subject' }">题目类型</a></li>
				<li><a v-link="{ path: '/admin/ExamManagement/Subject/'+$route.params.subject }">{{$route.params.subject}}</a></li>
				<li class="active">答案管理</li>
			</ol>
			<div>
				<h4>{{question.content}}</h4>
				<table class="table table-hover table-condensed">
					<thead>
						<tr>
							<th>
								答案
							</th>
							<th>
								正确
							</th>
							<th>
								操作
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="row of question.answers">
							<td>
								<div v-if="row.type=='img'">
									<img style="width:200px" :src="getImg(row.value)" />
								</div>
								<div v-else>
									{{ row.value }}
								</div>
							</td>
							<td>
								{{ row.right?'是':'否' }}
							</td>
							<td>
								<button @click="editAnswer(row)" class="btn btn-default btn-xs">修改</button>
								<button @click="deleteAnswer(row)" class="btn btn-default btn-xs">删除</button>
							</td>
						</tr>
						<tr>
							<td colspan="4">
								<button @click="addAnswer" class="btn btn-default btn-xs">添加</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<modal :show.sync="showAnswerModel" effect="fade" width="400">
				<div slot="modal-header" class="modal-header">
					<h4 class="modal-title">
						答案
					</h4>
				</div>
				<div slot="modal-body" class="modal-body">
					<alert :type="alertType">
						{{alertText}}
					</alert>
					<div class="form-group">
						<label class="control-label">答案类型:</label>
						<v-select :value.sync="submitData.type" clear-button>
							<v-option value="string">文字</v-option>
							<v-option value="img">图片</v-option>
						</v-select>
					</div>
					<bs-input v-if="submitData.type=='string'" :value.sync="submitData.value" label="答案"></bs-input>
					<div v-if="submitData.type=='img'">
						<img style="width:200px" :src="getImg(submitData.value)" />
						<vue-strap-upload :file-id.sync="submitFileId"></vue-strap-upload>
					</div>
					<checkbox :checked.sync="submitRight" value="checked" type="primary">正确</checkbox>
				</div>
				<div slot="modal-footer" class="modal-footer">
					<button type="button" class="btn btn-default" @click="showAnswerModel=false">关闭</button>
					<button :disabled="submitting" type="button" class="btn btn-success" @click="submitAnswer">确认</button>
				</div>
			</modal>
		</div>
	</div>
</template>
<script>
    import manager from '../api/manager'
    import checkPermission from '../extend/check-permission'
    import VueStrapUpload from './extend/vue-strap-upload'
    import {
        spinner,
        modal,
        alert,
        input as bsInput,
        select as vSelect,
        option as vOption,
        checkbox
    } from 'vue-strap'
    export default {
        components: {
            spinner,
            modal,
            alert,
            bsInput,
            vSelect,
            vOption,
            checkbox,
            VueStrapUpload
        },
        data() {
            return {
                question: {},
                submitData: {
                    id: undefined,
                    type: "string",
                    value: "",
                    right: false
                },
                showAnswerModel: false,
                serverMsg: "",
                submitting: false
            }
        },
        computed: {
            alertType() {
                return this.valid() ? "success" : "warning"
            },
            alertText() {
                if (this.serverMsg) {
                    return this.serverMsg;
                }
                let returnText = "please login";
                if (!this.valid()) {
                    returnText = "请填入数据"
                }
                return returnText
            },
            submitFileId: {
                // getter
                get: function() {
                    return parseInt(this.submitData.value)
                },
                // setter
                set: function(newValue) {
                    this.submitData.value = newValue
                }
            },
            submitRight: {
                // getter
                get: function() {
                    return this.submitData.right ? "checked" : null
                },
                // setter
                set: function(newValue) {
                    this.submitData.right = newValue == "checked"
                }
            }
        },
        methods: {
            checkPermission,
            getImg(id) {
                return '/service/private/upload/getAttachment?id=' + id
            },
            getQuestionAnswers() {
                var that = this
                return manager.getQuestionAnswers({
                    id: that.$route.params.question
                }).then((result) => {
                    that.question = result
                }).catch((err) => {
                    window.alert(err)
                })
            },
            submitAnswer() {
                var that = this
                that.submitting = true
                manager.submitAnswer(that.submitData).then(() => {
                    that.submitting = false
                    that.showAnswerModel = false
                    that.getQuestionAnswers()
                }).catch((err) => {
                    window.alert(err)
                    that.submitting = false
                })
            },
            addAnswer() {
                this.submitData = {
                    id: undefined,
                    type: "string",
                    value: "",
                    right: false,
                    question_id: this.$route.params.question
                }
                this.showAnswerModel = true
            },
            editAnswer(row) {
                this.submitData = {
                    id: row.id,
                    type: row.type,
                    value: row.value,
                    right: row.right
                }
                this.showAnswerModel = true
            },
            deleteAnswer(row) {
                var that = this
                if (window.confirm("是否确认删除答案")) {
                    manager.deleteAnswer({
                        id: row.id
                    }).then((result) => {
                        that.getQuestionAnswers()
                    }).catch(function(err) {
                        window.alert(err)
                    })
                }
            },
            valid() {
            }
        },
        ready() {
            this.getQuestionAnswers()
        }
    }
</script>
