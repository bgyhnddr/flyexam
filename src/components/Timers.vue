<template>
	<div>
		剩余时间：{{timeLeft}}
        <div class="progress">
			<progressbar :now="now" type="info" striped animated></progressbar>
		</div>
	</div>
</template>
<script>
    import {
        progressbar
    } from 'vue-strap'

    export default {
        data() {
            return {
                timeLeft: "00:00"
            }
        },
        props: {
            now: {
                type: Number,
                default: 0
            },
            counting: {
                type: Boolean,
                default: false
            },
            beginTime: {
                type: Object,
                default: undefined
            },
            limit: {
                type: Number,
                default: 0
            },
            timeup: {
                type: Boolean,
                default: false
            }
        },
        computed: {},
        methods: {
            countLeftTime() {
                if (this.counting) {
                    var now = new Date()
                    var timespan = now - this.beginTime

                    var limit = this.limit * 1000 * 60
                    var leftTime = limit - timespan

                    this.now = leftTime / limit * 100
                    if (leftTime < 0) {
                        this.timeLeft = "00:00"
                        this.timeup = true
                        this.counting = false
                        this.now = 0
                    } else {
                        var minute = leftTime / 1000 / 60
                        var lm = Math.floor(minute)
                        var ls = Math.round((minute - lm) * 60)
                        ls = ls.toString().length == 1 ? "0" + ls.toString() : ls
                        lm = lm.toString().length == 1 ? "0" + lm.toString() : lm

                        this.timeLeft = lm + ":" + ls
                        this.timeup = false
                    }
                }

                setTimeout(this.countLeftTime, 1000)
                console.log(1)
            }
        },
        components: {
            progressbar
        },
        watch: {
            'limit': function(val) {
                if (this.val != 0) {
                    this.counting = true
                    this.beginTime = new Date()
                }
            }
        },
        ready() {
            if (this.beginTime == undefined) {
                this.beginTime = new Date()
            }
            this.countLeftTime()
        }
    }
</script>