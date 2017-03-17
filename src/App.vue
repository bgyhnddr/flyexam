<template>
	<router-view></router-view>
</template>
<script>
    export default {}
</script>
<style>
    html,
    body {
        height: 100%
    }

    .view {
        transition: all .3s ease;
    }
    /**
* vue-router transition
*/

    body {
        background: linear-gradient(to top, rgb(212, 234, 255) 1%, #ffffff 99%) fixed;
    }

    .vux-pop-out-transition,
    .vux-pop-in-transition {
        width: 100%;
        animation-duration: 0.5s;
        animation-fill-mode: both;
        backface-visibility: hidden;
    }

    .vux-pop-out-enter,
    .vux-pop-out-leave,
    .vux-pop-in-enter,
    .vux-pop-in-leave {
        will-change: transform;
        height: 100%;
        position: absolute;
        left: 0;
    }

    .vux-pop-out-enter {
        animation-name: popInLeft;
    }

    .vux-pop-out-leave {
        animation-name: popOutRight;
    }

    .vux-pop-in-enter {
        perspective: 1000;
        animation-name: popInRight;
    }

    .vux-pop-in-leave {
        animation-name: popOutLeft;
    }

    @keyframes popInLeft {
        from {
            transform: translate3d(-100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes popOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-100%, 0, 0);
        }
    }

    @keyframes popInRight {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes popOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }
</style>
