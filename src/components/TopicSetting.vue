<template>
	<div class="container-fluid container-limited">
		<div v-if="checkPermission(['manager'])">
			<div v-for="row of exams">
				<div class="panel panel-default">
					<div v-if="row.edit" class="panel-heading">
						<input v-model="row.name"></input>
						<button class="btn btn-default btn-xs">保存</button>
						<button @click="row.edit=false" class="btn btn-default btn-xs">取消</button>
					</div>
					<div v-else class="panel-heading">
						<span>{{row.name}}</span>
						<button @click="editExam(row)" class="btn btn-default btn-xs">修改</button>
					</div>
					<div v-if="row.edit" class="panel-body">
						<bs-input :value.sync="row.submitData.time_limit" label="时限" type="number"></bs-input>
						<v-select :options="subjects" multiple options-value="val" :value.sync="row.submitData.selected" @change="selectChange(row)"
							:clear-button="true"></v-select>
						<div v-for="es of row.submitData.exam_subjects">
							{{es.name}}
							<bs-input :value.sync="es.question_count" label="题数" type="number"></bs-input>
						</div>
					</div>
					<div v-else class="panel-body">
						<div>时限：{{row.time_limit}}分钟</div>
						<div>总分：{{countScore(row)}}</div>
						<div>题类：</div>
						<ul class="list-group">
							<li v-for="exam_subject of row.exam_subjects" class="list-group-item">
								<span class="badge">{{exam_subject.question_count}}</span>{{exam_subject.subject.name}}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import manager from '../api/manager'
    import checkPermission from '../extend/check-permission'
    import {
        input as bsInput,
        select as vSelect
    } from 'vue-strap'

    export default {
        data() {
            return {
                exams: [],
                subjects: []
            }
        },
        components: {
            bsInput,
            vSelect
        },
        methods: {
            checkPermission,
            getExams() {
                var that = this
                return manager.getExams().then((result) => {
                    that.exams = result.map((o) => {
                        o.edit = false
                        o.submitData = {
                            id: o.id,
                            time_limit: o.time_limit,
                            selected: o.exam_subjects.map(es => es.subject.id),
                            exam_subjects: o.exam_subjects.map((d) => {
                                return {
                                    id: d.id,
                                    name: d.subject.name,
                                    question_count: d.question_count
                                }
                            })
                        }
                        return o
                    })
                })
            },
            getSubjects() {
                var that = this
                manager.getSubjects().then(function(result) {
                    that.subjects = result.map((o) => {
                        return {
                            val: o.id,
                            label: o.name
                        }
                    })
                }).catch(function(err) {
                    that.errMsg = err
                })
            },
            countScore(row) {
                return row.exam_subjects.reduce((a, b) => {
                    return a + b.question_count
                }, 0)
            },
            editExam(row) {
                row.submitData = {
                    id: row.id,
                    time_limit: row.time_limit,
                    selected: row.exam_subjects.map(es => es.subject.id),
                    exam_subjects: row.exam_subjects.map((o) => {
                        return {
                            subject_id: o.subject.id,
                            name: o.subject.name,
                            question_count: o.question_count
                        }
                    })
                }
                row.edit = true
            },
            getExamSubject(row, id) {
                return row.exam_subjects.filter(o => o.subject.id == id)[0]
            },
            selectChange(row) {
                var that = this
                var newList = []
                row.submitData.selected.forEach((selectId) => {
                    var rows = row.submitData.exam_subjects.filter(o => o.subject_id == selectId)
                    if (rows.length > 0) {
                        console.log(rows[0].question_count)
                        newList.push(rows[0])
                    } else {
                        var name = that.subjects.filter(s => s.val == selectId)[0].label
                        newList.push({
                            subject_id: selectId,
                            name: name,
                            question_count: 0
                        })
                    }
                })
                row.submitData.exam_subjects = newList
            }
        },
        ready() {
            this.getExams()
            this.getSubjects()
        }
    }
</script>