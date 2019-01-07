<template>
<div class="alloy-rotation">
    <div id="test" ref="test">
        大泽实验
    </div>
    <div class="touch-bar" ref="bar">
        滑动此处
    </div>
</div>
</template>

<script>
import AlloyTouch from 'alloytouch';
import Transform from '../../static/js/transform';
export default {
    name: 'alloy-touch',
    data() {
        return {

        }
    },
    mounted() {
        var target = document.querySelector("#test");
        Transform(target);
        var touchbar= this.$refs.bar
        new AlloyTouch({
            touch: touchbar, //反馈触摸的dom
            target: target, //运动的对象
            vertical: false,
            property: "rotateZ", //被滚动的属性
            sensitivity: 1, //不必需,默认值是1代表touch区域的1px的对应target.y的1
            change: function () {}
        })
    }
}
</script>

<style lang="scss" scoped>
.alloy-rotation {
    padding-top: 100px
}

#test {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    border: 2px solid #000;
    font-weight: bold;
    font-size: 40px;
    line-height: 1;
    padding-top: 75px;
    box-sizing: border-box;
}

.touch-bar {
    height: 30px;
    margin-top: 20px;
    border: 2px solid #000;
    font-weight: bold;
        line-height: 1;
        padding-top: 5px;
            box-sizing: border-box;
}
</style>
