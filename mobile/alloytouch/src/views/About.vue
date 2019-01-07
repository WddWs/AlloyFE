<template>
<div class="alloy-touch">
    <div id="test" ref="test" :style="{transform:'translateX('+translatex+'px) translateY('+translatey+'px)'}">
        大泽实验
        <p>{{num}}(点击+1)</p>

    </div>
</div>
</template>

<script>
import AlloyTouch from 'alloytouch';
export default {
    name: 'alloy-touch',
    data() {
        return {
            translatex: 0,
            translatey: 0,
            num: 0
        }
    },
    mounted() {
        let that = this;
        var test = this.$refs.test;
        var alloyTouch = new AlloyTouch({
            touch: test, //反馈触摸的dom
            pressMove: function (evt) {
                that.translatex += evt.deltaX;
                that.translatey += evt.deltaY;
            },
            tap: function () {
                that.num += 1
            },
            touchStart: function (evt, value) {
                console.log('start')
            },
            touchMove: function (evt, value) {
                 console.log('move')
            },
            touchEnd: function (evt, value) {
                 console.log('end')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
#test {
    width: 200px;
    height: 200px;
    border: 1px solid #000;
    font-weight: bold;
    font-size: 40px;
    line-height: 1;
    padding-top: 70px;
    box-sizing: border-box;

    p {
        margin: 0;
        font-size: 16px;
        margin-top: 10px;
    }
}

.alloy-touch {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
