<template>
<div >
    <div id="crop_result" style="text-align: center; padding-top: 30px; height: 230px; line-height: 300px;"></div>
    <button class="btn" id="crop_btn">裁剪长方形</button>
    <button class="btn" id="crop_circle_btn">裁剪圆形</button>

</div>
</template>

<script>
import AlloyFinger from 'alloyfinger';
import AlloyCrop from '../../static/js/alloy-crop';

export default {
    name: 'alloy-crop',
    data() {
        return {

        }
    },
    mounted() {
        var crop_btn = document.querySelector("#crop_btn");
        var crop_result = document.querySelector("#crop_result");
        var crop_circle_btn = document.querySelector("#crop_circle_btn");
        var mAlloyCrop;

        function showToolPanel() {
            crop_btn.style.display = "inline-block";
            crop_result.style.display = "block";
            crop_circle_btn.style.display = "inline-block";
        }

        function hideToolPanel() {
            crop_btn.style.display = "none";
            crop_result.style.display = "none";
            crop_circle_btn.style.display = "none";
            crop_result.innerHTML = "";
        }

        new AlloyFinger(crop_btn, {
            tap: function () {
                hideToolPanel();
                mAlloyCrop = new AlloyCrop({
                    image_src: "https://fuss10.elemecdn.com/8/33/8908b20bb991a5a6bba301bd358e3jpeg.jpeg",
                    width: 200,
                    height: 100,
                    output: 1.5,
                    className: 'm-clip-box',
                    ok: function (base64, canvas) {
                        crop_result.appendChild(canvas);
                        crop_result.querySelector("canvas").style.borderRadius = "0%";
                        mAlloyCrop.destroy();
                        showToolPanel();
                    },
                    cancel: function () {
                        mAlloyCrop.destroy();
                        showToolPanel();
                    }
                });

            }
        });

        new AlloyFinger(crop_circle_btn, {
            tap: function () {
                hideToolPanel();
                mAlloyCrop = new AlloyCrop({
                    image_src: "https://fuss10.elemecdn.com/8/33/8908b20bb991a5a6bba301bd358e3jpeg.jpeg",
                    circle: true,
                    width: 200,
                    height: 200,
                    output: 1,
                    ok: function (base64, canvas) {
                        crop_result.appendChild(canvas);
                        crop_result.querySelector("canvas").style.borderRadius = "50%";
                        mAlloyCrop.destroy();
                        showToolPanel();
                    },
                    cancel: function () {
                        mAlloyCrop.destroy();
                        showToolPanel();
                    }

                });

            }
        });
    }
}
</script>

<style lang="scss">
body {
    text-align: center;
}

#crop_btn {
    color: white;
    background-color: #836FFF;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    width: 110px;
    text-align: center;
    border-radius: 2px;
}

button {
    appearance: none;
    -webkit-appearance: none;
    border: 0;
    background: none;
}

#crop_circle_btn {
    color: white;
    background-color: #836FFF;
    height: 40px;
    line-height: 40px;
    width: 110px;
    text-align: center;
    border-radius: 2px;
    display: inline-block;
    margin-left: 20px;
}

#crop_circle_btn:active,
#crop_btn:active {
    background-color: #6854e4;
}
</style>
