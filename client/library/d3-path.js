// https://d3js.org/d3-path/ v1.0.9 Copyright 2019 Mike Bostock
!(function (t, i) {
  "object" == typeof exports && "undefined" != typeof module
    ? i(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], i)
    : i(((t = t || self).d3 = t.d3 || {}));
})(this, function (t) {
  "use strict";
  var i = Math.PI,
    s = 2 * i,
    h = s - 1e-6;
  function e() {
    (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = "");
  }
  function _() {
    return new e();
  }
  (e.prototype = _.prototype = {
    constructor: e,
    moveTo: function (t, i) {
      this._ +=
        "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +i);
    },
    closePath: function () {
      null !== this._x1 &&
        ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += "Z"));
    },
    lineTo: function (t, i) {
      this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +i);
    },
    quadraticCurveTo: function (t, i, s, h) {
      this._ +=
        "Q" + +t + "," + +i + "," + (this._x1 = +s) + "," + (this._y1 = +h);
    },
    bezierCurveTo: function (t, i, s, h, e, _) {
      this._ +=
        "C" +
        +t +
        "," +
        +i +
        "," +
        +s +
        "," +
        +h +
        "," +
        (this._x1 = +e) +
        "," +
        (this._y1 = +_);
    },
    arcTo: function (t, s, h, e, _) {
      (t = +t), (s = +s), (h = +h), (e = +e), (_ = +_);
      var n = this._x1,
        o = this._y1,
        r = h - t,
        a = e - s,
        u = n - t,
        f = o - s,
        c = u * u + f * f;
      if (_ < 0) throw new Error("negative radius: " + _);
      if (null === this._x1)
        this._ += "M" + (this._x1 = t) + "," + (this._y1 = s);
      else if (c > 1e-6)
        if (Math.abs(f * r - a * u) > 1e-6 && _) {
          var x = h - n,
            y = e - o,
            M = r * r + a * a,
            l = x * x + y * y,
            d = Math.sqrt(M),
            p = Math.sqrt(c),
            v = _ * Math.tan((i - Math.acos((M + c - l) / (2 * d * p))) / 2),
            b = v / p,
            w = v / d;
          Math.abs(b - 1) > 1e-6 &&
            (this._ += "L" + (t + b * u) + "," + (s + b * f)),
            (this._ +=
              "A" +
              _ +
              "," +
              _ +
              ",0,0," +
              +(f * x > u * y) +
              "," +
              (this._x1 = t + w * r) +
              "," +
              (this._y1 = s + w * a));
        } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = s);
      else;
    },
    arc: function (t, e, _, n, o, r) {
      (t = +t), (e = +e), (r = !!r);
      var a = (_ = +_) * Math.cos(n),
        u = _ * Math.sin(n),
        f = t + a,
        c = e + u,
        x = 1 ^ r,
        y = r ? n - o : o - n;
      if (_ < 0) throw new Error("negative radius: " + _);
      null === this._x1
        ? (this._ += "M" + f + "," + c)
        : (Math.abs(this._x1 - f) > 1e-6 || Math.abs(this._y1 - c) > 1e-6) &&
          (this._ += "L" + f + "," + c),
        _ &&
          (y < 0 && (y = (y % s) + s),
          y > h
            ? (this._ +=
                "A" +
                _ +
                "," +
                _ +
                ",0,1," +
                x +
                "," +
                (t - a) +
                "," +
                (e - u) +
                "A" +
                _ +
                "," +
                _ +
                ",0,1," +
                x +
                "," +
                (this._x1 = f) +
                "," +
                (this._y1 = c))
            : y > 1e-6 &&
              (this._ +=
                "A" +
                _ +
                "," +
                _ +
                ",0," +
                +(y >= i) +
                "," +
                x +
                "," +
                (this._x1 = t + _ * Math.cos(o)) +
                "," +
                (this._y1 = e + _ * Math.sin(o))));
    },
    rect: function (t, i, s, h) {
      this._ +=
        "M" +
        (this._x0 = this._x1 = +t) +
        "," +
        (this._y0 = this._y1 = +i) +
        "h" +
        +s +
        "v" +
        +h +
        "h" +
        -s +
        "Z";
    },
    toString: function () {
      return this._;
    },
  }),
    (t.path = _),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
