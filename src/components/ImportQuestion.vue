<template>
	<div>
		<div v-if="checkPermission(['manager'])">
            <input v-el:uploadinput type="file">
            <button :disabled="importing" @click="upload" class="btn btn-default">{{importing?'录入中':'开始导入'}}</button>
		</div>
	</div>
</template>
<script>
    import checkPermission from '../extend/check-permission'
    import Vue from 'vue'

    export default {
        components: {},
        data() {
            return {
                importing: false
            }
        },
        methods: {
            checkPermission,
            upload() {
                var that = this
                var formData = new FormData();
                formData.append('ufile', this.$els.uploadinput.files[0])
                that.importing = true
                Vue.http.post('/service/private/manager/importQuestion', formData, {
                    progress: function(event) {
                        that.percent = Math.round((event.loaded / event.total) * 100)
                    },
                    before(request) {
                        that.uploadRequest = request
                    }
                }).then(function(result) {
                    that.importing = false
                    console.log(result)
                }).catch(function(error) {
                    that.importing = false
                    console.log(error)
                })
            }
        }
    }
</script>