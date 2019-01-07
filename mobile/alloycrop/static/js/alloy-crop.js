/* AlloyCrop v1.0.4
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyCrop
 */
;
(function() {
    var Matrix3D = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this.elements = window.Float32Array ? new Float32Array(16) : [];
        var te = this.elements;
        te[0] = (n11 !== undefined) ? n11 : 1;
        te[4] = n12 || 0;
        te[8] = n13 || 0;
        te[12] = n14 || 0;
        te[1] = n21 || 0;
        te[5] = (n22 !== undefined) ? n22 : 1;
        te[9] = n23 || 0;
        te[13] = n24 || 0;
        te[2] = n31 || 0;
        te[6] = n32 || 0;
        te[10] = (n33 !== undefined) ? n33 : 1;
        te[14] = n34 || 0;
        te[3] = n41 || 0;
        te[7] = n42 || 0;
        te[11] = n43 || 0;
        te[15] = (n44 !== undefined) ? n44 : 1;
    };

    Matrix3D.DEG_TO_RAD = Math.PI / 180;

    Matrix3D.prototype = {
        set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
            var te = this.elements;
            te[0] = n11;
            te[4] = n12;
            te[8] = n13;
            te[12] = n14;
            te[1] = n21;
            te[5] = n22;
            te[9] = n23;
            te[13] = n24;
            te[2] = n31;
            te[6] = n32;
            te[10] = n33;
            te[14] = n34;
            te[3] = n41;
            te[7] = n42;
            te[11] = n43;
            te[15] = n44;
            return this;
        },
        identity: function() {
            this.set(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            return this;
        },
        multiplyMatrices: function(a, be) {

            var ae = a.elements;
            var te = this.elements;
            var a11 = ae[0],
                a12 = ae[4],
                a13 = ae[8],
                a14 = ae[12];
            var a21 = ae[1],
                a22 = ae[5],
                a23 = ae[9],
                a24 = ae[13];
            var a31 = ae[2],
                a32 = ae[6],
                a33 = ae[10],
                a34 = ae[14];
            var a41 = ae[3],
                a42 = ae[7],
                a43 = ae[11],
                a44 = ae[15];

            var b11 = be[0],
                b12 = be[1],
                b13 = be[2],
                b14 = be[3];
            var b21 = be[4],
                b22 = be[5],
                b23 = be[6],
                b24 = be[7];
            var b31 = be[8],
                b32 = be[9],
                b33 = be[10],
                b34 = be[11];
            var b41 = be[12],
                b42 = be[13],
                b43 = be[14],
                b44 = be[15];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

            return this;

        },
        // 解决角度为90的整数倍导致Math.cos得到极小的数，其实是0。导致不渲染
        _rounded: function(value, i) {
            i = Math.pow(10, i || 15);
            // default
            return Math.round(value * i) / i;
        },
        appendTransform: function(x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {

            var rx = rotateX * Matrix3D.DEG_TO_RAD;
            var cosx = this._rounded(Math.cos(rx));
            var sinx = this._rounded(Math.sin(rx));
            var ry = rotateY * Matrix3D.DEG_TO_RAD;
            var cosy = this._rounded(Math.cos(ry));
            var siny = this._rounded(Math.sin(ry));
            var rz = rotateZ * Matrix3D.DEG_TO_RAD;
            var cosz = this._rounded(Math.cos(rz * -1));
            var sinz = this._rounded(Math.sin(rz * -1));

            this.multiplyMatrices(this, [
                1, 0, 0, x,
                0, cosx, sinx, y,
                0, -sinx, cosx, z,
                0, 0, 0, 1
            ]);

            this.multiplyMatrices(this, [
                cosy, 0, siny, 0,
                0, 1, 0, 0, -siny, 0, cosy, 0,
                0, 0, 0, 1
            ]);

            this.multiplyMatrices(this, [
                cosz * scaleX, sinz * scaleY, 0, 0, -sinz * scaleX, cosz * scaleY, 0, 0,
                0, 0, 1 * scaleZ, 0,
                0, 0, 0, 1
            ]);

            if (skewX || skewY) {
                this.multiplyMatrices(this, [
                    this._rounded(Math.cos(skewX * Matrix3D.DEG_TO_RAD)), this._rounded(Math.sin(skewX * Matrix3D.DEG_TO_RAD)), 0, 0, -1 * this._rounded(Math.sin(skewY * Matrix3D.DEG_TO_RAD)), this._rounded(Math.cos(skewY * Matrix3D.DEG_TO_RAD)), 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]);
            }

            if (originX || originY || originZ) {
                this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
                this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
                this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
            }
            return this;
        }
    };

    function observe(target, props, callback) {
        for (var i = 0, len = props.length; i < len; i++) {
            var prop = props[i];
            watch(target, prop, callback);
        }
    }

    function watch(target, prop, callback) {
        Object.defineProperty(target, prop, {
            get: function() {
                return this["__" + prop];
            },
            set: function(value) {
                if (value !== this["__" + prop]) {
                    this["__" + prop] = value;
                    callback();
                }

            }
        });
    }

    window.Transform = function(element) {

        observe(
            element, ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"],
            function() {
                var mtx = element.matrix3D.identity().appendTransform(element.translateX, element.translateY, element.translateZ, element.scaleX, element.scaleY, element.scaleZ, element.rotateX, element.rotateY, element.rotateZ, element.skewX, element.skewY, element.originX, element.originY, element.originZ);
                element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = "perspective(" + element.perspective + "px) matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";
            });

        observe(
            element, ["perspective"],
            function() {
                element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = "perspective(" + element.perspective + "px) matrix3d(" + Array.prototype.slice.call(element.matrix3D.elements).join(",") + ")";
            });

        element.matrix3D = new Matrix3D();
        element.perspective = 500;
        element.scaleX = element.scaleY = element.scaleZ = 1;
        //由于image自带了x\y\z，所有加上translate前缀
        element.translateX = element.translateY = element.translateZ = element.rotateX = element.rotateY = element.rotateZ = element.skewX = element.skewY = element.originX = element.originY = element.originZ = 0;
    }




    var AlloyFinger = typeof require === 'function' ?
        require('alloyfinger') :
        window.AlloyFinger
    var Transform = typeof require === 'function' ?
        require('css3transform').default :
        window.Transform

    var AlloyCrop = function(option) {
        this.renderTo = document.body;
        this.canvas = document.createElement("canvas");
        this.output = option.output;
        this.width = option.width;
        this.height = option.height;
        this.canvas.width = option.width * this.output;
        this.canvas.height = option.height * this.output;
        this.circle = option.circle;
        if (option.width !== option.height && option.circle) {
            throw "can't set circle to true when width is not equal to height"
        }
        this.ctx = this.canvas.getContext("2d");
        this.croppingBox = document.createElement("div");
        this.croppingBox.style.visibility = "hidden";
        this.croppingBox.className = option.className || '';
        this.cover = document.createElement("canvas");
        this.type = option.type || "png";
        this.cover.width = window.innerWidth;
        this.cover.height = window.innerHeight;
        this.cover_ctx = this.cover.getContext("2d");
        this.img = document.createElement("img");

        if (option.image_src.substring(0, 4).toLowerCase() === 'http') {
            this.img.crossOrigin = 'anonymous'; //resolve base64 uri bug in safari:"cross-origin image load denied by cross-origin resource sharing policy."
        }
        this.cancel = option.cancel;
        this.ok = option.ok;

        this.ok_text = option.ok_text || "选好了";
        this.cancel_text = option.cancel_text || "取消";

        this.croppingBox.appendChild(this.img);
        this.croppingBox.appendChild(this.cover);
        this.renderTo.appendChild(this.croppingBox);
        this.img.onload = this.init.bind(this);
        this.img.src = option.image_src;

        this.cancel_btn = document.createElement('a');
        this.cancel_btn.innerHTML = this.cancel_text;
        this.ok_btn = document.createElement('a');
        this.ok_btn.innerHTML = this.ok_text;

        this.croppingBox.appendChild(this.ok_btn);
        this.croppingBox.appendChild(this.cancel_btn);

        this.alloyFingerList = [];
    };

    AlloyCrop.prototype = {
        init: function() {

            this.img_width = this.img.naturalWidth;
            this.img_height = this.img.naturalHeight;
            Transform(this.img, true);
            var scaling_x = window.innerWidth / this.img_width,
                scaling_y = window.innerHeight / this.img_height;
            var scaling = scaling_x > scaling_y ? scaling_y : scaling_x;
            /*this.initScale = scaling;
            this.originScale = scaling;
            this.img.scaleX = this.img.scaleY = scaling;*/
            this.initScale = scaling_x;
            this.originScale = scaling_x;
            this.img.scaleX = this.img.scaleY = scaling_x;
            this.first = 1;
            var self = this;
            this.alloyFingerList.push(new AlloyFinger(this.croppingBox, {
                multipointStart: function(evt) {
                    //reset origin x and y
                    var centerX = (evt.touches[0].pageX + evt.touches[1].pageX) / 2;
                    var centerY = (evt.touches[0].pageY + evt.touches[1].pageY) / 2;
                    var cr = self.img.getBoundingClientRect();
                    var img_centerX = cr.left + cr.width / 2;
                    var img_centerY = cr.top + cr.height / 2;
                    var offX = centerX - img_centerX;
                    var offY = centerY - img_centerY;
                    var preOriginX = self.img.originX
                    var preOriginY = self.img.originY
                    self.img.originX = offX / self.img.scaleX;
                    self.img.originY = offY / self.img.scaleY;
                    //reset translateX and translateY

                    self.img.translateX += offX - preOriginX * self.img.scaleX;
                    self.img.translateY += offY - preOriginY * self.img.scaleX;


                    if (self.first == 1) {
                        self.img.scaleX = self.img.scaleY = self.initScale * 1.1;
                        ++self.first;
                    }

                    self.initScale = self.img.scaleX;

                },
                pinch: function(evt) {

                    var cr = self.img.getBoundingClientRect();
                    var boxOffY = (document.documentElement.clientHeight - self.height) / 2;

                    var tempo = evt.zoom;
                    var dw = (cr.width * tempo - cr.width) / 2;
                    var dh = (cr.height - cr.height * tempo) / 2;
                    if ((self.initScale * tempo <= 1.6) && (self.initScale * tempo >= self.originScale) && (dw >= cr.left) && (-dw <= (cr.right - self.width)) && (dh <= (boxOffY - cr.top)) && (dh <= (cr.bottom - boxOffY - self.height))) {
                        self.img.scaleX = self.img.scaleY = self.initScale * tempo;
                    }
                },
                pressMove: function(evt) {
                    var cr = self.img.getBoundingClientRect();
                    var boxOffY = (document.documentElement.clientHeight - self.height) / 2;
                    if ((boxOffY - cr.top - evt.deltaY >= 0) && (cr.bottom + evt.deltaY - boxOffY >= self.height)) {
                        self.img.translateY += evt.deltaY;
                    }
                    var boxOffX = (document.documentElement.clientWidth - self.width) / 2;
                    if ((cr.left + evt.deltaX <= boxOffX) && (cr.right + evt.deltaX - boxOffX >= self.width)) {
                        self.img.translateX += evt.deltaX;
                    }
                    evt.preventDefault();
                }
            }));

            this.alloyFingerList.push(new AlloyFinger(this.cancel_btn, {
                touchStart: function() {
                    self.cancel_btn.style.backgroundColor = '#ffffff';
                    self.cancel_btn.style.color = '#3B4152';
                },
                tap: this._cancel.bind(this)
            }));

            this.alloyFingerList.push(new AlloyFinger(this.ok_btn, {
                touchStart: function() {
                    self.ok_btn.style.backgroundColor = '#2bcafd';
                    self.ok_btn.style.color = '#ffffff';
                },
                tap: this._ok.bind(this)
            }));

            this.alloyFingerList.push(new AlloyFinger(document, {
                touchEnd: function() {
                    self.cancel_btn.style.backgroundColor = '#ffffff';
                    self.ok_btn.style.backgroundColor = '#2bcafd';
                }
            }));

            this.renderCover();
            this.setStyle();

        },
        _cancel: function() {
            var self = this;
            setTimeout(function() {
                self.croppingBox && self._css(self.croppingBox, {
                    display: "none"
                });
            }, 300);
            this.cancel();
        },
        _ok: function() {
            this.crop();
            var self = this;
            setTimeout(function() {
                self.croppingBox && self._css(self.croppingBox, {
                    display: "none"
                });
            }, 300);
            this.ok(this.canvas.toDataURL("image/" + this.type), this.canvas);
        },
        renderCover: function() {
            var ctx = this.cover_ctx,
                w = this.cover.width,
                h = this.cover.height,
                cw = this.width,
                ch = this.height;
            ctx.save();
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.7;
            ctx.fillRect(0, 0, this.cover.width, this.cover.height);
            ctx.restore();
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            if (this.circle) {
                ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false);
            } else {
                ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
            }
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = "white";
            if (this.circle) {
                ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false);
            } else {
                ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
            }
            ctx.stroke();
        },
        setStyle: function() {
            this._css(this.cover, {
                position: "fixed",
                zIndex: "100",
                left: "0px",
                top: "0px"
            });

            this._css(this.croppingBox, {
                color: "white",
                textAlign: "center",
                fontSize: "18px",
                textDecoration: "none",
                visibility: "visible"
            });

            this._css(this.img, {
                position: "fixed",
                zIndex: "99",
                left: "50%",
                // error position in meizu when set the top  50%
                top: window.innerHeight / 2 + "px",
                marginLeft: this.img_width / -2 + "px",
                marginTop: this.img_height / -2 + "px"
            });


            this._css(this.ok_btn, {
                position: "fixed",
                zIndex: "101",
                width: "100px",
                right: "50px",
                lineHeight: "40px",
                height: "40px",
                bottom: "20px",
                borderRadius: "2px",
                color: "#ffffff",
                backgroundColor: "#2bcafd"

            });

            this._css(this.cancel_btn, {
                position: "fixed",
                zIndex: "101",
                width: "100px",
                height: "40px",
                lineHeight: "40px",
                left: "50px",
                bottom: "20px",
                borderRadius: "2px",
                color: "#3B4152",
                backgroundColor: "#ffffff"

            });
        },
        crop: function() {
            this.calculateRect();
            //this.ctx.drawImage(this.img, this.crop_rect[0], this.crop_rect[1], this.crop_rect[2], this.crop_rect[3], 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.img, this.crop_rect[0], this.crop_rect[1], this.crop_rect[2], this.crop_rect[3], 0, 0, this.crop_rect[2] * this.img.scaleX * this.output, this.crop_rect[3] * this.img.scaleY * this.output);

        },
        calculateRect: function() {
            var cr = this.img.getBoundingClientRect();
            var c_left = window.innerWidth / 2 - this.width / 2;
            var c_top = window.innerHeight / 2 - this.height / 2;
            var cover_rect = [c_left, c_top, this.width + c_left, this.height + c_top];
            var img_rect = [cr.left, cr.top, cr.width + cr.left, cr.height + cr.top];
            var intersect_rect = this.getOverlap.apply(this, cover_rect.concat(img_rect));
            var left = (intersect_rect[0] - img_rect[0]) / this.img.scaleX;
            var top = (intersect_rect[1] - img_rect[1]) / this.img.scaleY;
            var width = intersect_rect[2] / this.img.scaleX;
            var height = intersect_rect[3] / this.img.scaleY;

            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (left + width > this.img_width) width = this.img_width - left;
            if (top + height > this.img_height) height = this.img_height - top;

            this.crop_rect = [left, top, width, height];
        },
        // top left (x1,y1) and bottom right (x2,y2) coordination
        getOverlap: function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
            if (ax2 < bx1 || ay2 < by1 || ax1 > bx2 || ay1 > by2) return [0, 0, 0, 0];

            var left = Math.max(ax1, bx1);
            var top = Math.max(ay1, by1);
            var right = Math.min(ax2, bx2);
            var bottom = Math.min(ay2, by2);
            return [left, top, right - left, bottom - top]
        },
        _css: function(el, obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    el.style[key] = obj[key];
                }
            }
        },
        destroy: function() {
            this.alloyFingerList.forEach(function(alloyFinger) {
                alloyFinger.destroy();
            });
            this.renderTo.removeChild(this.croppingBox);
            for (var key in this) {
                delete this[key];
            }
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyCrop;
    } else {
        window.AlloyCrop = AlloyCrop;
    }
})();