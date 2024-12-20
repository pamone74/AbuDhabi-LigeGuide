/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var qE = Object.create;
  var xn = Object.defineProperty;
  var GE = Object.getOwnPropertyDescriptor;
  var VE = Object.getOwnPropertyNames;
  var XE = Object.getPrototypeOf,
    UE = Object.prototype.hasOwnProperty;
  var fe = (e, t) => () => (e && (t = e((e = 0))), t);
  var f = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    xe = (e, t) => {
      for (var n in t) xn(e, n, { get: t[n], enumerable: !0 });
    },
    sa = (e, t, n, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of VE(t))
          !UE.call(e, i) &&
            i !== n &&
            xn(e, i, {
              get: () => t[i],
              enumerable: !(r = GE(t, i)) || r.enumerable,
            });
      return e;
    };
  var ae = (e, t, n) => (
      (n = e != null ? qE(XE(e)) : {}),
      sa(
        t || !e || !e.__esModule
          ? xn(n, "default", { value: e, enumerable: !0 })
          : n,
        e
      )
    ),
    He = (e) => sa(xn({}, "__esModule", { value: !0 }), e);
  var ua = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let r = function (a) {
          let u = window.getComputedStyle(a, null),
            c = u.getPropertyValue("position"),
            g = u.getPropertyValue("overflow"),
            p = u.getPropertyValue("display");
          (!c || c === "static") && (a.style.position = "relative"),
            g !== "hidden" && (a.style.overflow = "hidden"),
            (!p || p === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            c = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let g in c)
            u.getPropertyValue(g) !== c[g] && (a.style[g] = c[g]);
        },
        o = function (a) {
          let u = a.parentNode;
          r(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let c = a[u].nodeName.toLowerCase();
            if (c === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              c === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var ca = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(r) {
        Webflow.env("design") ||
          ($("video").each(function () {
            r && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            r ? n($(this)) : t($(this));
          }));
      }
      function t(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function n(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)");
        r.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          r.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                n(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Br = f(() => {
    "use strict";
    window.tram = (function (e) {
      function t(l, E) {
        var _ = new me.Bare();
        return _.init(l, E);
      }
      function n(l) {
        return l.replace(/[A-Z]/g, function (E) {
          return "-" + E.toLowerCase();
        });
      }
      function r(l) {
        var E = parseInt(l.slice(1), 16),
          _ = (E >> 16) & 255,
          b = (E >> 8) & 255,
          C = 255 & E;
        return [_, b, C];
      }
      function i(l, E, _) {
        return (
          "#" + ((1 << 24) | (l << 16) | (E << 8) | _).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, E) {
        c("Type warning: Expected: [" + l + "] Got: [" + typeof E + "] " + E);
      }
      function a(l, E, _) {
        c("Units do not match [" + l + "]: " + E + ", " + _);
      }
      function u(l, E, _) {
        if ((E !== void 0 && (_ = E), l === void 0)) return _;
        var b = _;
        return (
          wn.test(l) || !Yt.test(l)
            ? (b = parseInt(l, 10))
            : Yt.test(l) && (b = 1e3 * parseFloat(l)),
          0 > b && (b = 0),
          b === b ? b : _
        );
      }
      function c(l) {
        j.debug && window && window.console.warn(l);
      }
      function g(l) {
        for (var E = -1, _ = l ? l.length : 0, b = []; ++E < _; ) {
          var C = l[E];
          C && b.push(C);
        }
        return b;
      }
      var p = (function (l, E, _) {
          function b(Q) {
            return typeof Q == "object";
          }
          function C(Q) {
            return typeof Q == "function";
          }
          function w() {}
          function B(Q, H) {
            function M() {
              var Te = new J();
              return C(Te.init) && Te.init.apply(Te, arguments), Te;
            }
            function J() {}
            H === _ && ((H = Q), (Q = Object)), (M.Bare = J);
            var re,
              he = (w[l] = Q[l]),
              Le = (J[l] = M[l] = new w());
            return (
              (Le.constructor = M),
              (M.mixin = function (Te) {
                return (J[l] = M[l] = B(M, Te)[l]), M;
              }),
              (M.open = function (Te) {
                if (
                  ((re = {}),
                  C(Te) ? (re = Te.call(M, Le, he, M, Q)) : b(Te) && (re = Te),
                  b(re))
                )
                  for (var $t in re) E.call(re, $t) && (Le[$t] = re[$t]);
                return C(Le.init) || (Le.init = Q), M;
              }),
              M.open(H)
            );
          }
          return B;
        })("prototype", {}.hasOwnProperty),
        d = {
          ease: [
            "ease",
            function (l, E, _, b) {
              var C = (l /= b) * l,
                w = C * l;
              return (
                E +
                _ * (-2.75 * w * C + 11 * C * C + -15.5 * w + 8 * C + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, E, _, b) {
              var C = (l /= b) * l,
                w = C * l;
              return E + _ * (-1 * w * C + 3 * C * C + -3 * w + 2 * C);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, E, _, b) {
              var C = (l /= b) * l,
                w = C * l;
              return (
                E +
                _ * (0.3 * w * C + -1.6 * C * C + 2.2 * w + -1.8 * C + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, E, _, b) {
              var C = (l /= b) * l,
                w = C * l;
              return E + _ * (2 * w * C + -5 * C * C + 2 * w + 2 * C);
            },
          ],
          linear: [
            "linear",
            function (l, E, _, b) {
              return (_ * l) / b + E;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, E, _, b) {
              return _ * (l /= b) * l + E;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, E, _, b) {
              return -_ * (l /= b) * (l - 2) + E;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, E, _, b) {
              return (l /= b / 2) < 1
                ? (_ / 2) * l * l + E
                : (-_ / 2) * (--l * (l - 2) - 1) + E;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, E, _, b) {
              return _ * (l /= b) * l * l + E;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, E, _, b) {
              return _ * ((l = l / b - 1) * l * l + 1) + E;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, E, _, b) {
              return (l /= b / 2) < 1
                ? (_ / 2) * l * l * l + E
                : (_ / 2) * ((l -= 2) * l * l + 2) + E;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, E, _, b) {
              return _ * (l /= b) * l * l * l + E;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, E, _, b) {
              return -_ * ((l = l / b - 1) * l * l * l - 1) + E;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, E, _, b) {
              return (l /= b / 2) < 1
                ? (_ / 2) * l * l * l * l + E
                : (-_ / 2) * ((l -= 2) * l * l * l - 2) + E;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, E, _, b) {
              return _ * (l /= b) * l * l * l * l + E;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, E, _, b) {
              return _ * ((l = l / b - 1) * l * l * l * l + 1) + E;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, E, _, b) {
              return (l /= b / 2) < 1
                ? (_ / 2) * l * l * l * l * l + E
                : (_ / 2) * ((l -= 2) * l * l * l * l + 2) + E;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, E, _, b) {
              return -_ * Math.cos((l / b) * (Math.PI / 2)) + _ + E;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, E, _, b) {
              return _ * Math.sin((l / b) * (Math.PI / 2)) + E;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, E, _, b) {
              return (-_ / 2) * (Math.cos((Math.PI * l) / b) - 1) + E;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, E, _, b) {
              return l === 0 ? E : _ * Math.pow(2, 10 * (l / b - 1)) + E;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, E, _, b) {
              return l === b
                ? E + _
                : _ * (-Math.pow(2, (-10 * l) / b) + 1) + E;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, E, _, b) {
              return l === 0
                ? E
                : l === b
                ? E + _
                : (l /= b / 2) < 1
                ? (_ / 2) * Math.pow(2, 10 * (l - 1)) + E
                : (_ / 2) * (-Math.pow(2, -10 * --l) + 2) + E;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, E, _, b) {
              return -_ * (Math.sqrt(1 - (l /= b) * l) - 1) + E;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, E, _, b) {
              return _ * Math.sqrt(1 - (l = l / b - 1) * l) + E;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, E, _, b) {
              return (l /= b / 2) < 1
                ? (-_ / 2) * (Math.sqrt(1 - l * l) - 1) + E
                : (_ / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + E;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, E, _, b, C) {
              return (
                C === void 0 && (C = 1.70158),
                _ * (l /= b) * l * ((C + 1) * l - C) + E
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, E, _, b, C) {
              return (
                C === void 0 && (C = 1.70158),
                _ * ((l = l / b - 1) * l * ((C + 1) * l + C) + 1) + E
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, E, _, b, C) {
              return (
                C === void 0 && (C = 1.70158),
                (l /= b / 2) < 1
                  ? (_ / 2) * l * l * (((C *= 1.525) + 1) * l - C) + E
                  : (_ / 2) *
                      ((l -= 2) * l * (((C *= 1.525) + 1) * l + C) + 2) +
                    E
              );
            },
          ],
        },
        h = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        v = document,
        m = window,
        T = "bkwld-tram",
        y = /[\-\.0-9]/g,
        S = /[A-Z]/,
        A = "number",
        R = /^(rgb|#)/,
        P = /(em|cm|mm|in|pt|pc|px)$/,
        O = /(em|cm|mm|in|pt|pc|px|%)$/,
        F = /(deg|rad|turn)$/,
        V = "unitless",
        X = /(all|none) 0s ease 0s/,
        k = /^(width|height)$/,
        Z = " ",
        N = v.createElement("a"),
        I = ["Webkit", "Moz", "O", "ms"],
        L = ["-webkit-", "-moz-", "-o-", "-ms-"],
        U = function (l) {
          if (l in N.style) return { dom: l, css: l };
          var E,
            _,
            b = "",
            C = l.split("-");
          for (E = 0; E < C.length; E++)
            b += C[E].charAt(0).toUpperCase() + C[E].slice(1);
          for (E = 0; E < I.length; E++)
            if (((_ = I[E] + b), _ in N.style))
              return { dom: _, css: L[E] + l };
        },
        q = (t.support = {
          bind: Function.prototype.bind,
          transform: U("transform"),
          transition: U("transition"),
          backface: U("backface-visibility"),
          timing: U("transition-timing-function"),
        });
      if (q.transition) {
        var te = q.timing.dom;
        if (((N.style[te] = d["ease-in-back"][0]), !N.style[te]))
          for (var Y in h) d[Y][0] = h[Y];
      }
      var se = (t.frame = (function () {
          var l =
            m.requestAnimationFrame ||
            m.webkitRequestAnimationFrame ||
            m.mozRequestAnimationFrame ||
            m.oRequestAnimationFrame ||
            m.msRequestAnimationFrame;
          return l && q.bind
            ? l.bind(m)
            : function (E) {
                m.setTimeout(E, 16);
              };
        })()),
        Ie = (t.now = (function () {
          var l = m.performance,
            E = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return E && q.bind
            ? E.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        ke = p(function (l) {
          function E(z, oe) {
            var de = g(("" + z).split(Z)),
              ue = de[0];
            oe = oe || {};
            var be = it[ue];
            if (!be) return c("Unsupported property: " + ue);
            if (!oe.weak || !this.props[ue]) {
              var De = be[0],
                Oe = this.props[ue];
              return (
                Oe || (Oe = this.props[ue] = new De.Bare()),
                Oe.init(this.$el, de, be, oe),
                Oe
              );
            }
          }
          function _(z, oe, de) {
            if (z) {
              var ue = typeof z;
              if (
                (oe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ue == "number" && oe)
              )
                return (
                  (this.timer = new ne({
                    duration: z,
                    context: this,
                    complete: w,
                  })),
                  void (this.active = !0)
                );
              if (ue == "string" && oe) {
                switch (z) {
                  case "hide":
                    M.call(this);
                    break;
                  case "stop":
                    B.call(this);
                    break;
                  case "redraw":
                    J.call(this);
                    break;
                  default:
                    E.call(this, z, de && de[1]);
                }
                return w.call(this);
              }
              if (ue == "function") return void z.call(this, this);
              if (ue == "object") {
                var be = 0;
                Le.call(
                  this,
                  z,
                  function (Ee, FE) {
                    Ee.span > be && (be = Ee.span), Ee.stop(), Ee.animate(FE);
                  },
                  function (Ee) {
                    "wait" in Ee && (be = u(Ee.wait, 0));
                  }
                ),
                  he.call(this),
                  be > 0 &&
                    ((this.timer = new ne({ duration: be, context: this })),
                    (this.active = !0),
                    oe && (this.timer.complete = w));
                var De = this,
                  Oe = !1,
                  On = {};
                se(function () {
                  Le.call(De, z, function (Ee) {
                    Ee.active && ((Oe = !0), (On[Ee.name] = Ee.nextStyle));
                  }),
                    Oe && De.$el.css(On);
                });
              }
            }
          }
          function b(z) {
            (z = u(z, 0)),
              this.active
                ? this.queue.push({ options: z })
                : ((this.timer = new ne({
                    duration: z,
                    context: this,
                    complete: w,
                  })),
                  (this.active = !0));
          }
          function C(z) {
            return this.active
              ? (this.queue.push({ options: z, args: arguments }),
                void (this.timer.complete = w))
              : c(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function w() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var z = this.queue.shift();
              _.call(this, z.options, !0, z.args);
            }
          }
          function B(z) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var oe;
            typeof z == "string"
              ? ((oe = {}), (oe[z] = 1))
              : (oe = typeof z == "object" && z != null ? z : this.props),
              Le.call(this, oe, Te),
              he.call(this);
          }
          function Q(z) {
            B.call(this, z), Le.call(this, z, $t, ME);
          }
          function H(z) {
            typeof z != "string" && (z = "block"), (this.el.style.display = z);
          }
          function M() {
            B.call(this), (this.el.style.display = "none");
          }
          function J() {
            this.el.offsetHeight;
          }
          function re() {
            B.call(this), e.removeData(this.el, T), (this.$el = this.el = null);
          }
          function he() {
            var z,
              oe,
              de = [];
            this.upstream && de.push(this.upstream);
            for (z in this.props)
              (oe = this.props[z]), oe.active && de.push(oe.string);
            (de = de.join(",")),
              this.style !== de &&
                ((this.style = de), (this.el.style[q.transition.dom] = de));
          }
          function Le(z, oe, de) {
            var ue,
              be,
              De,
              Oe,
              On = oe !== Te,
              Ee = {};
            for (ue in z)
              (De = z[ue]),
                ue in Be
                  ? (Ee.transform || (Ee.transform = {}),
                    (Ee.transform[ue] = De))
                  : (S.test(ue) && (ue = n(ue)),
                    ue in it
                      ? (Ee[ue] = De)
                      : (Oe || (Oe = {}), (Oe[ue] = De)));
            for (ue in Ee) {
              if (((De = Ee[ue]), (be = this.props[ue]), !be)) {
                if (!On) continue;
                be = E.call(this, ue);
              }
              oe.call(this, be, De);
            }
            de && Oe && de.call(this, Oe);
          }
          function Te(z) {
            z.stop();
          }
          function $t(z, oe) {
            z.set(oe);
          }
          function ME(z) {
            this.$el.css(z);
          }
          function Me(z, oe) {
            l[z] = function () {
              return this.children
                ? DE.call(this, oe, arguments)
                : (this.el && oe.apply(this, arguments), this);
            };
          }
          function DE(z, oe) {
            var de,
              ue = this.children.length;
            for (de = 0; ue > de; de++) z.apply(this.children[de], oe);
            return this;
          }
          (l.init = function (z) {
            if (
              ((this.$el = e(z)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              j.keepInherited && !j.fallback)
            ) {
              var oe = ge(this.el, "transition");
              oe && !X.test(oe) && (this.upstream = oe);
            }
            q.backface &&
              j.hideBackface &&
              K(this.el, q.backface.css, "hidden");
          }),
            Me("add", E),
            Me("start", _),
            Me("wait", b),
            Me("then", C),
            Me("next", w),
            Me("stop", B),
            Me("set", Q),
            Me("show", H),
            Me("hide", M),
            Me("redraw", J),
            Me("destroy", re);
        }),
        me = p(ke, function (l) {
          function E(_, b) {
            var C = e.data(_, T) || e.data(_, T, new ke.Bare());
            return C.el || C.init(_), b ? C.start(b) : C;
          }
          l.init = function (_, b) {
            var C = e(_);
            if (!C.length) return this;
            if (C.length === 1) return E(C[0], b);
            var w = [];
            return (
              C.each(function (B, Q) {
                w.push(E(Q, b));
              }),
              (this.children = w),
              this
            );
          };
        }),
        x = p(function (l) {
          function E() {
            var w = this.get();
            this.update("auto");
            var B = this.get();
            return this.update(w), B;
          }
          function _(w, B, Q) {
            return B !== void 0 && (Q = B), w in d ? w : Q;
          }
          function b(w) {
            var B = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(w);
            return (B ? i(B[1], B[2], B[3]) : w).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var C = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (w, B, Q, H) {
            (this.$el = w), (this.el = w[0]);
            var M = B[0];
            Q[2] && (M = Q[2]),
              vt[M] && (M = vt[M]),
              (this.name = M),
              (this.type = Q[1]),
              (this.duration = u(B[1], this.duration, C.duration)),
              (this.ease = _(B[2], this.ease, C.ease)),
              (this.delay = u(B[3], this.delay, C.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = k.test(this.name)),
              (this.unit = H.unit || this.unit || j.defaultUnit),
              (this.angle = H.angle || this.angle || j.defaultAngle),
              j.fallback || H.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    Z +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? Z + d[this.ease][0] : "") +
                    (this.delay ? Z + this.delay + "ms" : "")));
          }),
            (l.set = function (w) {
              (w = this.convert(w, this.type)), this.update(w), this.redraw();
            }),
            (l.transition = function (w) {
              (this.active = !0),
                (w = this.convert(w, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  w == "auto" && (w = E.call(this))),
                (this.nextStyle = w);
            }),
            (l.fallback = function (w) {
              var B =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (w = this.convert(w, this.type)),
                this.auto &&
                  (B == "auto" && (B = this.convert(this.get(), this.type)),
                  w == "auto" && (w = E.call(this))),
                (this.tween = new ee({
                  from: B,
                  to: w,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return ge(this.el, this.name);
            }),
            (l.update = function (w) {
              K(this.el, this.name, w);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                K(this.el, this.name, this.get()));
              var w = this.tween;
              w && w.context && w.destroy();
            }),
            (l.convert = function (w, B) {
              if (w == "auto" && this.auto) return w;
              var Q,
                H = typeof w == "number",
                M = typeof w == "string";
              switch (B) {
                case A:
                  if (H) return w;
                  if (M && w.replace(y, "") === "") return +w;
                  Q = "number(unitless)";
                  break;
                case R:
                  if (M) {
                    if (w === "" && this.original) return this.original;
                    if (B.test(w))
                      return w.charAt(0) == "#" && w.length == 7 ? w : b(w);
                  }
                  Q = "hex or rgb string";
                  break;
                case P:
                  if (H) return w + this.unit;
                  if (M && B.test(w)) return w;
                  Q = "number(px) or string(unit)";
                  break;
                case O:
                  if (H) return w + this.unit;
                  if (M && B.test(w)) return w;
                  Q = "number(px) or string(unit or %)";
                  break;
                case F:
                  if (H) return w + this.angle;
                  if (M && B.test(w)) return w;
                  Q = "number(deg) or string(angle)";
                  break;
                case V:
                  if (H || (M && O.test(w))) return w;
                  Q = "number(unitless) or string(unit or %)";
              }
              return s(Q, w), w;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        G = p(x, function (l, E) {
          l.init = function () {
            E.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), R));
          };
        }),
        W = p(x, function (l, E) {
          (l.init = function () {
            E.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (_) {
              this.$el[this.name](_);
            });
        }),
        D = p(x, function (l, E) {
          function _(b, C) {
            var w, B, Q, H, M;
            for (w in b)
              (H = Be[w]),
                (Q = H[0]),
                (B = H[1] || w),
                (M = this.convert(b[w], Q)),
                C.call(this, B, M, Q);
          }
          (l.init = function () {
            E.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                Be.perspective &&
                  j.perspective &&
                  ((this.current.perspective = j.perspective),
                  K(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (b) {
              _.call(this, b, function (C, w) {
                this.current[C] = w;
              }),
                K(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (b) {
              var C = this.values(b);
              this.tween = new ie({
                current: this.current,
                values: C,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var w,
                B = {};
              for (w in this.current) B[w] = w in C ? C[w] : this.current[w];
              (this.active = !0), (this.nextStyle = this.style(B));
            }),
            (l.fallback = function (b) {
              var C = this.values(b);
              this.tween = new ie({
                current: this.current,
                values: C,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              K(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (b) {
              var C,
                w = "";
              for (C in b) w += C + "(" + b[C] + ") ";
              return w;
            }),
            (l.values = function (b) {
              var C,
                w = {};
              return (
                _.call(this, b, function (B, Q, H) {
                  (w[B] = Q),
                    this.current[B] === void 0 &&
                      ((C = 0),
                      ~B.indexOf("scale") && (C = 1),
                      (this.current[B] = this.convert(C, H)));
                }),
                w
              );
            });
        }),
        ee = p(function (l) {
          function E(M) {
            Q.push(M) === 1 && se(_);
          }
          function _() {
            var M,
              J,
              re,
              he = Q.length;
            if (he)
              for (se(_), J = Ie(), M = he; M--; )
                (re = Q[M]), re && re.render(J);
          }
          function b(M) {
            var J,
              re = e.inArray(M, Q);
            re >= 0 &&
              ((J = Q.slice(re + 1)),
              (Q.length = re),
              J.length && (Q = Q.concat(J)));
          }
          function C(M) {
            return Math.round(M * H) / H;
          }
          function w(M, J, re) {
            return i(
              M[0] + re * (J[0] - M[0]),
              M[1] + re * (J[1] - M[1]),
              M[2] + re * (J[2] - M[2])
            );
          }
          var B = { ease: d.ease[1], from: 0, to: 1 };
          (l.init = function (M) {
            (this.duration = M.duration || 0), (this.delay = M.delay || 0);
            var J = M.ease || B.ease;
            d[J] && (J = d[J][1]),
              typeof J != "function" && (J = B.ease),
              (this.ease = J),
              (this.update = M.update || o),
              (this.complete = M.complete || o),
              (this.context = M.context || this),
              (this.name = M.name);
            var re = M.from,
              he = M.to;
            re === void 0 && (re = B.from),
              he === void 0 && (he = B.to),
              (this.unit = M.unit || ""),
              typeof re == "number" && typeof he == "number"
                ? ((this.begin = re), (this.change = he - re))
                : this.format(he, re),
              (this.value = this.begin + this.unit),
              (this.start = Ie()),
              M.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = Ie()),
                (this.active = !0),
                E(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), b(this));
            }),
            (l.render = function (M) {
              var J,
                re = M - this.start;
              if (this.delay) {
                if (re <= this.delay) return;
                re -= this.delay;
              }
              if (re < this.duration) {
                var he = this.ease(re, 0, 1, this.duration);
                return (
                  (J = this.startRGB
                    ? w(this.startRGB, this.endRGB, he)
                    : C(this.begin + he * this.change)),
                  (this.value = J + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (J = this.endHex || this.begin + this.change),
                (this.value = J + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (M, J) {
              if (((J += ""), (M += ""), M.charAt(0) == "#"))
                return (
                  (this.startRGB = r(J)),
                  (this.endRGB = r(M)),
                  (this.endHex = M),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var re = J.replace(y, ""),
                  he = M.replace(y, "");
                re !== he && a("tween", J, M), (this.unit = re);
              }
              (J = parseFloat(J)),
                (M = parseFloat(M)),
                (this.begin = this.value = J),
                (this.change = M - J);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var Q = [],
            H = 1e3;
        }),
        ne = p(ee, function (l) {
          (l.init = function (E) {
            (this.duration = E.duration || 0),
              (this.complete = E.complete || o),
              (this.context = E.context),
              this.play();
          }),
            (l.render = function (E) {
              var _ = E - this.start;
              _ < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        ie = p(ee, function (l, E) {
          (l.init = function (_) {
            (this.context = _.context),
              (this.update = _.update),
              (this.tweens = []),
              (this.current = _.current);
            var b, C;
            for (b in _.values)
              (C = _.values[b]),
                this.current[b] !== C &&
                  this.tweens.push(
                    new ee({
                      name: b,
                      from: this.current[b],
                      to: C,
                      duration: _.duration,
                      delay: _.delay,
                      ease: _.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (_) {
              var b,
                C,
                w = this.tweens.length,
                B = !1;
              for (b = w; b--; )
                (C = this.tweens[b]),
                  C.context &&
                    (C.render(_), (this.current[C.name] = C.value), (B = !0));
              return B
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((E.destroy.call(this), this.tweens)) {
                var _,
                  b = this.tweens.length;
                for (_ = b; _--; ) this.tweens[_].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        j = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !q.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!q.transition) return (j.fallback = !0);
        j.agentTests.push("(" + l + ")");
        var E = new RegExp(j.agentTests.join("|"), "i");
        j.fallback = E.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new ee(l);
        }),
        (t.delay = function (l, E, _) {
          return new ne({ complete: E, duration: l, context: _ });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var K = e.style,
        ge = e.css,
        vt = { transform: q.transform && q.transform.css },
        it = {
          color: [G, R],
          background: [G, R, "background-color"],
          "outline-color": [G, R],
          "border-color": [G, R],
          "border-top-color": [G, R],
          "border-right-color": [G, R],
          "border-bottom-color": [G, R],
          "border-left-color": [G, R],
          "border-width": [x, P],
          "border-top-width": [x, P],
          "border-right-width": [x, P],
          "border-bottom-width": [x, P],
          "border-left-width": [x, P],
          "border-spacing": [x, P],
          "letter-spacing": [x, P],
          margin: [x, P],
          "margin-top": [x, P],
          "margin-right": [x, P],
          "margin-bottom": [x, P],
          "margin-left": [x, P],
          padding: [x, P],
          "padding-top": [x, P],
          "padding-right": [x, P],
          "padding-bottom": [x, P],
          "padding-left": [x, P],
          "outline-width": [x, P],
          opacity: [x, A],
          top: [x, O],
          right: [x, O],
          bottom: [x, O],
          left: [x, O],
          "font-size": [x, O],
          "text-indent": [x, O],
          "word-spacing": [x, O],
          width: [x, O],
          "min-width": [x, O],
          "max-width": [x, O],
          height: [x, O],
          "min-height": [x, O],
          "max-height": [x, O],
          "line-height": [x, V],
          "scroll-top": [W, A, "scrollTop"],
          "scroll-left": [W, A, "scrollLeft"],
        },
        Be = {};
      q.transform &&
        ((it.transform = [D]),
        (Be = {
          x: [O, "translateX"],
          y: [O, "translateY"],
          rotate: [F],
          rotateX: [F],
          rotateY: [F],
          scale: [A],
          scaleX: [A],
          scaleY: [A],
          skew: [F],
          skewX: [F],
          skewY: [F],
        })),
        q.transform &&
          q.backface &&
          ((Be.z = [O, "translateZ"]),
          (Be.rotateZ = [F]),
          (Be.scaleZ = [A]),
          (Be.perspective = [P]));
      var wn = /ms/,
        Yt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var fa = f((SF, la) => {
    "use strict";
    var kE = window.$,
      BE = Br() && kE.tram;
    la.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        n = Array.prototype,
        r = Object.prototype,
        i = Function.prototype,
        o = n.push,
        s = n.slice,
        a = n.concat,
        u = r.toString,
        c = r.hasOwnProperty,
        g = n.forEach,
        p = n.map,
        d = n.reduce,
        h = n.reduceRight,
        v = n.filter,
        m = n.every,
        T = n.some,
        y = n.indexOf,
        S = n.lastIndexOf,
        A = Array.isArray,
        R = Object.keys,
        P = i.bind,
        O =
          (e.each =
          e.forEach =
            function (I, L, U) {
              if (I == null) return I;
              if (g && I.forEach === g) I.forEach(L, U);
              else if (I.length === +I.length) {
                for (var q = 0, te = I.length; q < te; q++)
                  if (L.call(U, I[q], q, I) === t) return;
              } else
                for (var Y = e.keys(I), q = 0, te = Y.length; q < te; q++)
                  if (L.call(U, I[Y[q]], Y[q], I) === t) return;
              return I;
            });
      (e.map = e.collect =
        function (I, L, U) {
          var q = [];
          return I == null
            ? q
            : p && I.map === p
            ? I.map(L, U)
            : (O(I, function (te, Y, se) {
                q.push(L.call(U, te, Y, se));
              }),
              q);
        }),
        (e.find = e.detect =
          function (I, L, U) {
            var q;
            return (
              F(I, function (te, Y, se) {
                if (L.call(U, te, Y, se)) return (q = te), !0;
              }),
              q
            );
          }),
        (e.filter = e.select =
          function (I, L, U) {
            var q = [];
            return I == null
              ? q
              : v && I.filter === v
              ? I.filter(L, U)
              : (O(I, function (te, Y, se) {
                  L.call(U, te, Y, se) && q.push(te);
                }),
                q);
          });
      var F =
        (e.some =
        e.any =
          function (I, L, U) {
            L || (L = e.identity);
            var q = !1;
            return I == null
              ? q
              : T && I.some === T
              ? I.some(L, U)
              : (O(I, function (te, Y, se) {
                  if (q || (q = L.call(U, te, Y, se))) return t;
                }),
                !!q);
          });
      (e.contains = e.include =
        function (I, L) {
          return I == null
            ? !1
            : y && I.indexOf === y
            ? I.indexOf(L) != -1
            : F(I, function (U) {
                return U === L;
              });
        }),
        (e.delay = function (I, L) {
          var U = s.call(arguments, 2);
          return setTimeout(function () {
            return I.apply(null, U);
          }, L);
        }),
        (e.defer = function (I) {
          return e.delay.apply(e, [I, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (I) {
          var L, U, q;
          return function () {
            L ||
              ((L = !0),
              (U = arguments),
              (q = this),
              BE.frame(function () {
                (L = !1), I.apply(q, U);
              }));
          };
        }),
        (e.debounce = function (I, L, U) {
          var q,
            te,
            Y,
            se,
            Ie,
            ke = function () {
              var me = e.now() - se;
              me < L
                ? (q = setTimeout(ke, L - me))
                : ((q = null), U || ((Ie = I.apply(Y, te)), (Y = te = null)));
            };
          return function () {
            (Y = this), (te = arguments), (se = e.now());
            var me = U && !q;
            return (
              q || (q = setTimeout(ke, L)),
              me && ((Ie = I.apply(Y, te)), (Y = te = null)),
              Ie
            );
          };
        }),
        (e.defaults = function (I) {
          if (!e.isObject(I)) return I;
          for (var L = 1, U = arguments.length; L < U; L++) {
            var q = arguments[L];
            for (var te in q) I[te] === void 0 && (I[te] = q[te]);
          }
          return I;
        }),
        (e.keys = function (I) {
          if (!e.isObject(I)) return [];
          if (R) return R(I);
          var L = [];
          for (var U in I) e.has(I, U) && L.push(U);
          return L;
        }),
        (e.has = function (I, L) {
          return c.call(I, L);
        }),
        (e.isObject = function (I) {
          return I === Object(I);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var V = /(.)^/,
        X = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        k = /\\|'|\r|\n|\u2028|\u2029/g,
        Z = function (I) {
          return "\\" + X[I];
        },
        N = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (I, L, U) {
          !L && U && (L = U), (L = e.defaults({}, L, e.templateSettings));
          var q = RegExp(
              [
                (L.escape || V).source,
                (L.interpolate || V).source,
                (L.evaluate || V).source,
              ].join("|") + "|$",
              "g"
            ),
            te = 0,
            Y = "__p+='";
          I.replace(q, function (me, x, G, W, D) {
            return (
              (Y += I.slice(te, D).replace(k, Z)),
              (te = D + me.length),
              x
                ? (Y +=
                    `'+
((__t=(` +
                    x +
                    `))==null?'':_.escape(__t))+
'`)
                : G
                ? (Y +=
                    `'+
((__t=(` +
                    G +
                    `))==null?'':__t)+
'`)
                : W &&
                  (Y +=
                    `';
` +
                    W +
                    `
__p+='`),
              me
            );
          }),
            (Y += `';
`);
          var se = L.variable;
          if (se) {
            if (!N.test(se))
              throw new Error("variable is not a bare identifier: " + se);
          } else
            (Y =
              `with(obj||{}){
` +
              Y +
              `}
`),
              (se = "obj");
          Y =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            Y +
            `return __p;
`;
          var Ie;
          try {
            Ie = new Function(L.variable || "obj", "_", Y);
          } catch (me) {
            throw ((me.source = Y), me);
          }
          var ke = function (me) {
            return Ie.call(this, me, e);
          };
          return (
            (ke.source =
              "function(" +
              se +
              `){
` +
              Y +
              "}"),
            ke
          );
        }),
        e
      );
    })();
  });
  var ze = f((wF, va) => {
    "use strict";
    var ce = {},
      _t = {},
      It = [],
      Wr = window.Webflow || [],
      ot = window.jQuery,
      qe = ot(window),
      HE = ot(document),
      We = ot.isFunction,
      Fe = (ce._ = fa()),
      pa = (ce.tram = Br() && ot.tram),
      Cn = !1,
      zr = !1;
    pa.config.hideBackface = !1;
    pa.config.keepInherited = !0;
    ce.define = function (e, t, n) {
      _t[e] && ha(_t[e]);
      var r = (_t[e] = t(ot, Fe, n) || {});
      return ga(r), r;
    };
    ce.require = function (e) {
      return _t[e];
    };
    function ga(e) {
      ce.env() &&
        (We(e.design) && qe.on("__wf_design", e.design),
        We(e.preview) && qe.on("__wf_preview", e.preview)),
        We(e.destroy) && qe.on("__wf_destroy", e.destroy),
        e.ready && We(e.ready) && WE(e);
    }
    function WE(e) {
      if (Cn) {
        e.ready();
        return;
      }
      Fe.contains(It, e.ready) || It.push(e.ready);
    }
    function ha(e) {
      We(e.design) && qe.off("__wf_design", e.design),
        We(e.preview) && qe.off("__wf_preview", e.preview),
        We(e.destroy) && qe.off("__wf_destroy", e.destroy),
        e.ready && We(e.ready) && zE(e);
    }
    function zE(e) {
      It = Fe.filter(It, function (t) {
        return t !== e.ready;
      });
    }
    ce.push = function (e) {
      if (Cn) {
        We(e) && e();
        return;
      }
      Wr.push(e);
    };
    ce.env = function (e) {
      var t = window.__wf_design,
        n = typeof t < "u";
      if (!e) return n;
      if (e === "design") return n && t;
      if (e === "preview") return n && !t;
      if (e === "slug") return n && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var Rn = navigator.userAgent.toLowerCase(),
      Ea = (ce.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      jE = (ce.env.chrome =
        /chrome/.test(Rn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(Rn.match(/chrome\/(\d+)\./)[1], 10)),
      KE = (ce.env.ios = /(ipod|iphone|ipad)/.test(Rn));
    ce.env.safari = /safari/.test(Rn) && !jE && !KE;
    var Hr;
    Ea &&
      HE.on("touchstart mousedown", function (e) {
        Hr = e.target;
      });
    ce.validClick = Ea
      ? function (e) {
          return e === Hr || ot.contains(e, Hr);
        }
      : function () {
          return !0;
        };
    var ya = "resize.webflow orientationchange.webflow load.webflow",
      YE = "scroll.webflow " + ya;
    ce.resize = jr(qe, ya);
    ce.scroll = jr(qe, YE);
    ce.redraw = jr();
    function jr(e, t) {
      var n = [],
        r = {};
      return (
        (r.up = Fe.throttle(function (i) {
          Fe.each(n, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, r.up),
        (r.on = function (i) {
          typeof i == "function" && (Fe.contains(n, i) || n.push(i));
        }),
        (r.off = function (i) {
          if (!arguments.length) {
            n = [];
            return;
          }
          n = Fe.filter(n, function (o) {
            return o !== i;
          });
        }),
        r
      );
    }
    ce.location = function (e) {
      window.location = e;
    };
    ce.env() && (ce.location = function () {});
    ce.ready = function () {
      (Cn = !0), zr ? $E() : Fe.each(It, da), Fe.each(Wr, da), ce.resize.up();
    };
    function da(e) {
      We(e) && e();
    }
    function $E() {
      (zr = !1), Fe.each(_t, ga);
    }
    var ft;
    ce.load = function (e) {
      ft.then(e);
    };
    function ma() {
      ft && (ft.reject(), qe.off("load", ft.resolve)),
        (ft = new ot.Deferred()),
        qe.on("load", ft.resolve);
    }
    ce.destroy = function (e) {
      (e = e || {}),
        (zr = !0),
        qe.triggerHandler("__wf_destroy"),
        e.domready != null && (Cn = e.domready),
        Fe.each(_t, ha),
        ce.resize.off(),
        ce.scroll.off(),
        ce.redraw.off(),
        (It = []),
        (Wr = []),
        ft.state() === "pending" && ma();
    };
    ot(ce.ready);
    ma();
    va.exports = window.Webflow = ce;
  });
  var Ta = f((OF, Ia) => {
    "use strict";
    var _a = ze();
    _a.define(
      "brand",
      (Ia.exports = function (e) {
        var t = {},
          n = document,
          r = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          c;
        t.ready = function () {
          var h = r.attr("data-wf-status"),
            v = r.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(v) && s.hostname !== v && (h = !0),
            h &&
              !a &&
              ((c = c || p()),
              d(),
              setTimeout(d, 500),
              e(n).off(u, g).on(u, g));
        };
        function g() {
          var h =
            n.fullScreen ||
            n.mozFullScreen ||
            n.webkitIsFullScreen ||
            n.msFullscreenElement ||
            !!n.webkitFullscreenElement;
          e(c).attr("style", h ? "display: none !important;" : "");
        }
        function p() {
          var h = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            v = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            m = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return h.append(v, m), h[0];
        }
        function d() {
          var h = i.children(o),
            v = h.length && h.get(0) === c,
            m = _a.env("editor");
          if (v) {
            m && h.remove();
            return;
          }
          h.length && h.remove(), m || i.append(c);
        }
        return t;
      })
    );
  });
  var Aa = f((xF, ba) => {
    "use strict";
    var Kr = ze();
    Kr.define(
      "edit",
      (ba.exports = function (e, t, n) {
        if (
          ((n = n || {}),
          (Kr.env("test") || Kr.env("frame")) && !n.fixture && !QE())
        )
          return { exit: 1 };
        var r = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          c = n.load || d,
          g = !1;
        try {
          g =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        g
          ? c()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            c()
          : i.on(a, p).triggerHandler(a);
        function p() {
          u || (/\?edit/.test(s.hash) && c());
        }
        function d() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, p),
            S(function (R) {
              e.ajax({
                url: y("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: h(R),
              });
            });
        }
        function h(R) {
          return function (P) {
            if (!P) {
              console.error("Could not load editor data");
              return;
            }
            (P.thirdPartyCookiesSupported = R),
              v(T(P.scriptPath), function () {
                window.WebflowEditor(P);
              });
          };
        }
        function v(R, P) {
          e.ajax({ type: "GET", url: R, dataType: "script", cache: !0 }).then(
            P,
            m
          );
        }
        function m(R, P, O) {
          throw (console.error("Could not load editor script: " + P), O);
        }
        function T(R) {
          return R.indexOf("//") >= 0
            ? R
            : y("https://editor-api.webflow.com" + R);
        }
        function y(R) {
          return R.replace(/([^:])\/\//g, "$1/");
        }
        function S(R) {
          var P = window.document.createElement("iframe");
          (P.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (P.style.display = "none"),
            (P.sandbox = "allow-scripts allow-same-origin");
          var O = function (F) {
            F.data === "WF_third_party_cookies_unsupported"
              ? (A(P, O), R(!1))
              : F.data === "WF_third_party_cookies_supported" &&
                (A(P, O), R(!0));
          };
          (P.onerror = function () {
            A(P, O), R(!1);
          }),
            window.addEventListener("message", O, !1),
            window.document.body.appendChild(P);
        }
        function A(R, P) {
          window.removeEventListener("message", P, !1), R.remove();
        }
        return r;
      })
    );
    function QE() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var wa = f((RF, Sa) => {
    "use strict";
    var ZE = ze();
    ZE.define(
      "focus-visible",
      (Sa.exports = function () {
        function e(n) {
          var r = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(A) {
            return !!(
              A &&
              A !== document &&
              A.nodeName !== "HTML" &&
              A.nodeName !== "BODY" &&
              "classList" in A &&
              "contains" in A.classList
            );
          }
          function u(A) {
            var R = A.type,
              P = A.tagName;
            return !!(
              (P === "INPUT" && s[R] && !A.readOnly) ||
              (P === "TEXTAREA" && !A.readOnly) ||
              A.isContentEditable
            );
          }
          function c(A) {
            A.getAttribute("data-wf-focus-visible") ||
              A.setAttribute("data-wf-focus-visible", "true");
          }
          function g(A) {
            A.getAttribute("data-wf-focus-visible") &&
              A.removeAttribute("data-wf-focus-visible");
          }
          function p(A) {
            A.metaKey ||
              A.altKey ||
              A.ctrlKey ||
              (a(n.activeElement) && c(n.activeElement), (r = !0));
          }
          function d() {
            r = !1;
          }
          function h(A) {
            a(A.target) && (r || u(A.target)) && c(A.target);
          }
          function v(A) {
            a(A.target) &&
              A.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              g(A.target));
          }
          function m() {
            document.visibilityState === "hidden" && (i && (r = !0), T());
          }
          function T() {
            document.addEventListener("mousemove", S),
              document.addEventListener("mousedown", S),
              document.addEventListener("mouseup", S),
              document.addEventListener("pointermove", S),
              document.addEventListener("pointerdown", S),
              document.addEventListener("pointerup", S),
              document.addEventListener("touchmove", S),
              document.addEventListener("touchstart", S),
              document.addEventListener("touchend", S);
          }
          function y() {
            document.removeEventListener("mousemove", S),
              document.removeEventListener("mousedown", S),
              document.removeEventListener("mouseup", S),
              document.removeEventListener("pointermove", S),
              document.removeEventListener("pointerdown", S),
              document.removeEventListener("pointerup", S),
              document.removeEventListener("touchmove", S),
              document.removeEventListener("touchstart", S),
              document.removeEventListener("touchend", S);
          }
          function S(A) {
            (A.target.nodeName && A.target.nodeName.toLowerCase() === "html") ||
              ((r = !1), y());
          }
          document.addEventListener("keydown", p, !0),
            document.addEventListener("mousedown", d, !0),
            document.addEventListener("pointerdown", d, !0),
            document.addEventListener("touchstart", d, !0),
            document.addEventListener("visibilitychange", m, !0),
            T(),
            n.addEventListener("focus", h, !0),
            n.addEventListener("blur", v, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Ra = f((CF, xa) => {
    "use strict";
    var Oa = ze();
    Oa.define(
      "focus",
      (xa.exports = function () {
        var e = [],
          t = !1;
        function n(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function r(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          r(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Oa.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", n, !0),
            document.addEventListener("click", n, !0));
        }
        return { ready: o };
      })
    );
  });
  var La = f((PF, Pa) => {
    "use strict";
    var Yr = window.jQuery,
      je = {},
      Pn = [],
      Ca = ".w-ix",
      Ln = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Yr(t).triggerHandler(je.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Yr(t).triggerHandler(je.types.OUTRO));
        },
      };
    je.triggers = {};
    je.types = { INTRO: "w-ix-intro" + Ca, OUTRO: "w-ix-outro" + Ca };
    je.init = function () {
      for (var e = Pn.length, t = 0; t < e; t++) {
        var n = Pn[t];
        n[0](0, n[1]);
      }
      (Pn = []), Yr.extend(je.triggers, Ln);
    };
    je.async = function () {
      for (var e in Ln) {
        var t = Ln[e];
        Ln.hasOwnProperty(e) &&
          (je.triggers[e] = function (n, r) {
            Pn.push([t, r]);
          });
      }
    };
    je.async();
    Pa.exports = je;
  });
  var Fa = f((LF, Da) => {
    "use strict";
    var $r = La();
    function Na(e, t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
    }
    var JE = window.jQuery,
      Nn = {},
      Ma = ".w-ix",
      ey = {
        reset: function (e, t) {
          $r.triggers.reset(e, t);
        },
        intro: function (e, t) {
          $r.triggers.intro(e, t), Na(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          $r.triggers.outro(e, t), Na(t, "COMPONENT_INACTIVE");
        },
      };
    Nn.triggers = {};
    Nn.types = { INTRO: "w-ix-intro" + Ma, OUTRO: "w-ix-outro" + Ma };
    JE.extend(Nn.triggers, ey);
    Da.exports = Nn;
  });
  var Qr = f((NF, qa) => {
    var ty =
      typeof global == "object" && global && global.Object === Object && global;
    qa.exports = ty;
  });
  var Ge = f((MF, Ga) => {
    var ny = Qr(),
      ry = typeof self == "object" && self && self.Object === Object && self,
      iy = ny || ry || Function("return this")();
    Ga.exports = iy;
  });
  var Tt = f((DF, Va) => {
    var oy = Ge(),
      ay = oy.Symbol;
    Va.exports = ay;
  });
  var Ba = f((FF, ka) => {
    var Xa = Tt(),
      Ua = Object.prototype,
      sy = Ua.hasOwnProperty,
      uy = Ua.toString,
      Qt = Xa ? Xa.toStringTag : void 0;
    function cy(e) {
      var t = sy.call(e, Qt),
        n = e[Qt];
      try {
        e[Qt] = void 0;
        var r = !0;
      } catch {}
      var i = uy.call(e);
      return r && (t ? (e[Qt] = n) : delete e[Qt]), i;
    }
    ka.exports = cy;
  });
  var Wa = f((qF, Ha) => {
    var ly = Object.prototype,
      fy = ly.toString;
    function dy(e) {
      return fy.call(e);
    }
    Ha.exports = dy;
  });
  var at = f((GF, Ka) => {
    var za = Tt(),
      py = Ba(),
      gy = Wa(),
      hy = "[object Null]",
      Ey = "[object Undefined]",
      ja = za ? za.toStringTag : void 0;
    function yy(e) {
      return e == null
        ? e === void 0
          ? Ey
          : hy
        : ja && ja in Object(e)
        ? py(e)
        : gy(e);
    }
    Ka.exports = yy;
  });
  var Zr = f((VF, Ya) => {
    function my(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    Ya.exports = my;
  });
  var Jr = f((XF, $a) => {
    var vy = Zr(),
      _y = vy(Object.getPrototypeOf, Object);
    $a.exports = _y;
  });
  var Je = f((UF, Qa) => {
    function Iy(e) {
      return e != null && typeof e == "object";
    }
    Qa.exports = Iy;
  });
  var ei = f((kF, Ja) => {
    var Ty = at(),
      by = Jr(),
      Ay = Je(),
      Sy = "[object Object]",
      wy = Function.prototype,
      Oy = Object.prototype,
      Za = wy.toString,
      xy = Oy.hasOwnProperty,
      Ry = Za.call(Object);
    function Cy(e) {
      if (!Ay(e) || Ty(e) != Sy) return !1;
      var t = by(e);
      if (t === null) return !0;
      var n = xy.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && Za.call(n) == Ry;
    }
    Ja.exports = Cy;
  });
  var es = f((ti) => {
    "use strict";
    Object.defineProperty(ti, "__esModule", { value: !0 });
    ti.default = Py;
    function Py(e) {
      var t,
        n = e.Symbol;
      return (
        typeof n == "function"
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var ts = f((ri, ni) => {
    "use strict";
    Object.defineProperty(ri, "__esModule", { value: !0 });
    var Ly = es(),
      Ny = My(Ly);
    function My(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var bt;
    typeof self < "u"
      ? (bt = self)
      : typeof window < "u"
      ? (bt = window)
      : typeof global < "u"
      ? (bt = global)
      : typeof ni < "u"
      ? (bt = ni)
      : (bt = Function("return this")());
    var Dy = (0, Ny.default)(bt);
    ri.default = Dy;
  });
  var ii = f((Zt) => {
    "use strict";
    Zt.__esModule = !0;
    Zt.ActionTypes = void 0;
    Zt.default = os;
    var Fy = ei(),
      qy = is(Fy),
      Gy = ts(),
      ns = is(Gy);
    function is(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var rs = (Zt.ActionTypes = { INIT: "@@redux/INIT" });
    function os(e, t, n) {
      var r;
      if (
        (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
        typeof n < "u")
      ) {
        if (typeof n != "function")
          throw new Error("Expected the enhancer to be a function.");
        return n(os)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function c() {
        a === s && (a = s.slice());
      }
      function g() {
        return o;
      }
      function p(m) {
        if (typeof m != "function")
          throw new Error("Expected listener to be a function.");
        var T = !0;
        return (
          c(),
          a.push(m),
          function () {
            if (T) {
              (T = !1), c();
              var S = a.indexOf(m);
              a.splice(S, 1);
            }
          }
        );
      }
      function d(m) {
        if (!(0, qy.default)(m))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof m.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, m));
        } finally {
          u = !1;
        }
        for (var T = (s = a), y = 0; y < T.length; y++) T[y]();
        return m;
      }
      function h(m) {
        if (typeof m != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = m), d({ type: rs.INIT });
      }
      function v() {
        var m,
          T = p;
        return (
          (m = {
            subscribe: function (S) {
              if (typeof S != "object")
                throw new TypeError("Expected the observer to be an object.");
              function A() {
                S.next && S.next(g());
              }
              A();
              var R = T(A);
              return { unsubscribe: R };
            },
          }),
          (m[ns.default] = function () {
            return this;
          }),
          m
        );
      }
      return (
        d({ type: rs.INIT }),
        (r = { dispatch: d, subscribe: p, getState: g, replaceReducer: h }),
        (r[ns.default] = v),
        r
      );
    }
  });
  var ai = f((oi) => {
    "use strict";
    oi.__esModule = !0;
    oi.default = Vy;
    function Vy(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var us = f((si) => {
    "use strict";
    si.__esModule = !0;
    si.default = Hy;
    var as = ii(),
      Xy = ei(),
      zF = ss(Xy),
      Uy = ai(),
      jF = ss(Uy);
    function ss(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function ky(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function By(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, { type: as.ActionTypes.INIT });
        if (typeof r > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof n(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                as.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Hy(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        typeof e[i] == "function" && (n[i] = e[i]);
      }
      var o = Object.keys(n);
      if (!1) var s;
      var a;
      try {
        By(n);
      } catch (u) {
        a = u;
      }
      return function () {
        var c =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          g = arguments[1];
        if (a) throw a;
        if (!1) var p;
        for (var d = !1, h = {}, v = 0; v < o.length; v++) {
          var m = o[v],
            T = n[m],
            y = c[m],
            S = T(y, g);
          if (typeof S > "u") {
            var A = ky(m, g);
            throw new Error(A);
          }
          (h[m] = S), (d = d || S !== y);
        }
        return d ? h : c;
      };
    }
  });
  var ls = f((ui) => {
    "use strict";
    ui.__esModule = !0;
    ui.default = Wy;
    function cs(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Wy(e, t) {
      if (typeof e == "function") return cs(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(e), r = {}, i = 0; i < n.length; i++) {
        var o = n[i],
          s = e[o];
        typeof s == "function" && (r[o] = cs(s, t));
      }
      return r;
    }
  });
  var li = f((ci) => {
    "use strict";
    ci.__esModule = !0;
    ci.default = zy;
    function zy() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var r = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, r.apply(void 0, arguments));
      };
    }
  });
  var fs = f((fi) => {
    "use strict";
    fi.__esModule = !0;
    var jy =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    fi.default = Qy;
    var Ky = li(),
      Yy = $y(Ky);
    function $y(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Qy() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (r) {
        return function (i, o, s) {
          var a = r(i, o, s),
            u = a.dispatch,
            c = [],
            g = {
              getState: a.getState,
              dispatch: function (d) {
                return u(d);
              },
            };
          return (
            (c = t.map(function (p) {
              return p(g);
            })),
            (u = Yy.default.apply(void 0, c)(a.dispatch)),
            jy({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var di = f((Ne) => {
    "use strict";
    Ne.__esModule = !0;
    Ne.compose =
      Ne.applyMiddleware =
      Ne.bindActionCreators =
      Ne.combineReducers =
      Ne.createStore =
        void 0;
    var Zy = ii(),
      Jy = At(Zy),
      em = us(),
      tm = At(em),
      nm = ls(),
      rm = At(nm),
      im = fs(),
      om = At(im),
      am = li(),
      sm = At(am),
      um = ai(),
      ZF = At(um);
    function At(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ne.createStore = Jy.default;
    Ne.combineReducers = tm.default;
    Ne.bindActionCreators = rm.default;
    Ne.applyMiddleware = om.default;
    Ne.compose = sm.default;
  });
  var Ve,
    pi,
    Ke,
    cm,
    lm,
    Mn,
    fm,
    gi = fe(() => {
      "use strict";
      (Ve = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (pi = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (Ke = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (cm = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (lm = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Mn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (fm = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Ae,
    dm,
    Dn = fe(() => {
      "use strict";
      (Ae = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (dm = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var pm,
    ds = fe(() => {
      "use strict";
      pm = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var gm,
    hm,
    Em,
    ym,
    mm,
    vm,
    _m,
    hi,
    ps = fe(() => {
      "use strict";
      Dn();
      ({
        TRANSFORM_MOVE: gm,
        TRANSFORM_SCALE: hm,
        TRANSFORM_ROTATE: Em,
        TRANSFORM_SKEW: ym,
        STYLE_SIZE: mm,
        STYLE_FILTER: vm,
        STYLE_FONT_VARIATION: _m,
      } = Ae),
        (hi = {
          [gm]: !0,
          [hm]: !0,
          [Em]: !0,
          [ym]: !0,
          [mm]: !0,
          [vm]: !0,
          [_m]: !0,
        });
    });
  var ye = {};
  xe(ye, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => qm,
    IX2_ANIMATION_FRAME_CHANGED: () => Pm,
    IX2_CLEAR_REQUESTED: () => xm,
    IX2_ELEMENT_STATE_CHANGED: () => Fm,
    IX2_EVENT_LISTENER_ADDED: () => Rm,
    IX2_EVENT_STATE_CHANGED: () => Cm,
    IX2_INSTANCE_ADDED: () => Nm,
    IX2_INSTANCE_REMOVED: () => Dm,
    IX2_INSTANCE_STARTED: () => Mm,
    IX2_MEDIA_QUERIES_DEFINED: () => Vm,
    IX2_PARAMETER_CHANGED: () => Lm,
    IX2_PLAYBACK_REQUESTED: () => wm,
    IX2_PREVIEW_REQUESTED: () => Sm,
    IX2_RAW_DATA_IMPORTED: () => Im,
    IX2_SESSION_INITIALIZED: () => Tm,
    IX2_SESSION_STARTED: () => bm,
    IX2_SESSION_STOPPED: () => Am,
    IX2_STOP_REQUESTED: () => Om,
    IX2_TEST_FRAME_RENDERED: () => Xm,
    IX2_VIEWPORT_WIDTH_CHANGED: () => Gm,
  });
  var Im,
    Tm,
    bm,
    Am,
    Sm,
    wm,
    Om,
    xm,
    Rm,
    Cm,
    Pm,
    Lm,
    Nm,
    Mm,
    Dm,
    Fm,
    qm,
    Gm,
    Vm,
    Xm,
    gs = fe(() => {
      "use strict";
      (Im = "IX2_RAW_DATA_IMPORTED"),
        (Tm = "IX2_SESSION_INITIALIZED"),
        (bm = "IX2_SESSION_STARTED"),
        (Am = "IX2_SESSION_STOPPED"),
        (Sm = "IX2_PREVIEW_REQUESTED"),
        (wm = "IX2_PLAYBACK_REQUESTED"),
        (Om = "IX2_STOP_REQUESTED"),
        (xm = "IX2_CLEAR_REQUESTED"),
        (Rm = "IX2_EVENT_LISTENER_ADDED"),
        (Cm = "IX2_EVENT_STATE_CHANGED"),
        (Pm = "IX2_ANIMATION_FRAME_CHANGED"),
        (Lm = "IX2_PARAMETER_CHANGED"),
        (Nm = "IX2_INSTANCE_ADDED"),
        (Mm = "IX2_INSTANCE_STARTED"),
        (Dm = "IX2_INSTANCE_REMOVED"),
        (Fm = "IX2_ELEMENT_STATE_CHANGED"),
        (qm = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (Gm = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (Vm = "IX2_MEDIA_QUERIES_DEFINED"),
        (Xm = "IX2_TEST_FRAME_RENDERED");
    });
  var _e = {};
  xe(_e, {
    ABSTRACT_NODE: () => Gv,
    AUTO: () => Ov,
    BACKGROUND: () => Iv,
    BACKGROUND_COLOR: () => _v,
    BAR_DELIMITER: () => Cv,
    BORDER_COLOR: () => Tv,
    BOUNDARY_SELECTOR: () => Wm,
    CHILDREN: () => Pv,
    COLON_DELIMITER: () => Rv,
    COLOR: () => bv,
    COMMA_DELIMITER: () => xv,
    CONFIG_UNIT: () => Jm,
    CONFIG_VALUE: () => Ym,
    CONFIG_X_UNIT: () => $m,
    CONFIG_X_VALUE: () => zm,
    CONFIG_Y_UNIT: () => Qm,
    CONFIG_Y_VALUE: () => jm,
    CONFIG_Z_UNIT: () => Zm,
    CONFIG_Z_VALUE: () => Km,
    DISPLAY: () => Av,
    FILTER: () => Ev,
    FLEX: () => Sv,
    FONT_VARIATION_SETTINGS: () => yv,
    HEIGHT: () => vv,
    HTML_ELEMENT: () => Fv,
    IMMEDIATE_CHILDREN: () => Lv,
    IX2_ID_DELIMITER: () => Um,
    OPACITY: () => hv,
    PARENT: () => Mv,
    PLAIN_OBJECT: () => qv,
    PRESERVE_3D: () => Dv,
    RENDER_GENERAL: () => Xv,
    RENDER_PLUGIN: () => kv,
    RENDER_STYLE: () => Uv,
    RENDER_TRANSFORM: () => Vv,
    ROTATE_X: () => cv,
    ROTATE_Y: () => lv,
    ROTATE_Z: () => fv,
    SCALE_3D: () => uv,
    SCALE_X: () => ov,
    SCALE_Y: () => av,
    SCALE_Z: () => sv,
    SIBLINGS: () => Nv,
    SKEW: () => dv,
    SKEW_X: () => pv,
    SKEW_Y: () => gv,
    TRANSFORM: () => ev,
    TRANSLATE_3D: () => iv,
    TRANSLATE_X: () => tv,
    TRANSLATE_Y: () => nv,
    TRANSLATE_Z: () => rv,
    WF_PAGE: () => km,
    WIDTH: () => mv,
    WILL_CHANGE: () => wv,
    W_MOD_IX: () => Hm,
    W_MOD_JS: () => Bm,
  });
  var Um,
    km,
    Bm,
    Hm,
    Wm,
    zm,
    jm,
    Km,
    Ym,
    $m,
    Qm,
    Zm,
    Jm,
    ev,
    tv,
    nv,
    rv,
    iv,
    ov,
    av,
    sv,
    uv,
    cv,
    lv,
    fv,
    dv,
    pv,
    gv,
    hv,
    Ev,
    yv,
    mv,
    vv,
    _v,
    Iv,
    Tv,
    bv,
    Av,
    Sv,
    wv,
    Ov,
    xv,
    Rv,
    Cv,
    Pv,
    Lv,
    Nv,
    Mv,
    Dv,
    Fv,
    qv,
    Gv,
    Vv,
    Xv,
    Uv,
    kv,
    hs = fe(() => {
      "use strict";
      (Um = "|"),
        (km = "data-wf-page"),
        (Bm = "w-mod-js"),
        (Hm = "w-mod-ix"),
        (Wm = ".w-dyn-item"),
        (zm = "xValue"),
        (jm = "yValue"),
        (Km = "zValue"),
        (Ym = "value"),
        ($m = "xUnit"),
        (Qm = "yUnit"),
        (Zm = "zUnit"),
        (Jm = "unit"),
        (ev = "transform"),
        (tv = "translateX"),
        (nv = "translateY"),
        (rv = "translateZ"),
        (iv = "translate3d"),
        (ov = "scaleX"),
        (av = "scaleY"),
        (sv = "scaleZ"),
        (uv = "scale3d"),
        (cv = "rotateX"),
        (lv = "rotateY"),
        (fv = "rotateZ"),
        (dv = "skew"),
        (pv = "skewX"),
        (gv = "skewY"),
        (hv = "opacity"),
        (Ev = "filter"),
        (yv = "font-variation-settings"),
        (mv = "width"),
        (vv = "height"),
        (_v = "backgroundColor"),
        (Iv = "background"),
        (Tv = "borderColor"),
        (bv = "color"),
        (Av = "display"),
        (Sv = "flex"),
        (wv = "willChange"),
        (Ov = "AUTO"),
        (xv = ","),
        (Rv = ":"),
        (Cv = "|"),
        (Pv = "CHILDREN"),
        (Lv = "IMMEDIATE_CHILDREN"),
        (Nv = "SIBLINGS"),
        (Mv = "PARENT"),
        (Dv = "preserve-3d"),
        (Fv = "HTML_ELEMENT"),
        (qv = "PLAIN_OBJECT"),
        (Gv = "ABSTRACT_NODE"),
        (Vv = "RENDER_TRANSFORM"),
        (Xv = "RENDER_GENERAL"),
        (Uv = "RENDER_STYLE"),
        (kv = "RENDER_PLUGIN");
    });
  var Es = {};
  xe(Es, {
    ActionAppliesTo: () => dm,
    ActionTypeConsts: () => Ae,
    EventAppliesTo: () => pi,
    EventBasedOn: () => Ke,
    EventContinuousMouseAxes: () => cm,
    EventLimitAffectedElements: () => lm,
    EventTypeConsts: () => Ve,
    IX2EngineActionTypes: () => ye,
    IX2EngineConstants: () => _e,
    InteractionTypeConsts: () => pm,
    QuickEffectDirectionConsts: () => fm,
    QuickEffectIds: () => Mn,
    ReducedMotionTypes: () => hi,
  });
  var Re = fe(() => {
    "use strict";
    gi();
    Dn();
    ds();
    ps();
    gs();
    hs();
    Dn();
    gi();
  });
  var Bv,
    ys,
    ms = fe(() => {
      "use strict";
      Re();
      ({ IX2_RAW_DATA_IMPORTED: Bv } = ye),
        (ys = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case Bv:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var St = f((pe) => {
    "use strict";
    Object.defineProperty(pe, "__esModule", { value: !0 });
    var Hv =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    pe.clone = qn;
    pe.addLast = Is;
    pe.addFirst = Ts;
    pe.removeLast = bs;
    pe.removeFirst = As;
    pe.insert = Ss;
    pe.removeAt = ws;
    pe.replaceAt = Os;
    pe.getIn = Gn;
    pe.set = Vn;
    pe.setIn = Xn;
    pe.update = Rs;
    pe.updateIn = Cs;
    pe.merge = Ps;
    pe.mergeDeep = Ls;
    pe.mergeIn = Ns;
    pe.omit = Ms;
    pe.addDefaults = Ds;
    var vs = "INVALID_ARGS";
    function _s(e) {
      throw new Error(e);
    }
    function Ei(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var Wv = {}.hasOwnProperty;
    function qn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Ei(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        n[i] = e[i];
      }
      return n;
    }
    function Ce(e, t, n) {
      var r = n;
      r == null && _s(vs);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var c = s[u];
        if (c != null) {
          var g = Ei(c);
          if (g.length)
            for (var p = 0; p <= g.length; p++) {
              var d = g[p];
              if (!(e && r[d] !== void 0)) {
                var h = c[d];
                t && Fn(r[d]) && Fn(h) && (h = Ce(e, t, r[d], h)),
                  !(h === void 0 || h === r[d]) &&
                    (i || ((i = !0), (r = qn(r))), (r[d] = h));
              }
            }
        }
      }
      return r;
    }
    function Fn(e) {
      var t = typeof e > "u" ? "undefined" : Hv(e);
      return e != null && (t === "object" || t === "function");
    }
    function Is(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Ts(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function bs(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function As(e) {
      return e.length ? e.slice(1) : e;
    }
    function Ss(e, t, n) {
      return e
        .slice(0, t)
        .concat(Array.isArray(n) ? n : [n])
        .concat(e.slice(t));
    }
    function ws(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Os(e, t, n) {
      if (e[t] === n) return e;
      for (var r = e.length, i = Array(r), o = 0; o < r; o++) i[o] = e[o];
      return (i[t] = n), i;
    }
    function Gn(e, t) {
      if ((!Array.isArray(t) && _s(vs), e != null)) {
        for (var n = e, r = 0; r < t.length; r++) {
          var i = t[r];
          if (((n = n?.[i]), n === void 0)) return n;
        }
        return n;
      }
    }
    function Vn(e, t, n) {
      var r = typeof t == "number" ? [] : {},
        i = e ?? r;
      if (i[t] === n) return i;
      var o = qn(i);
      return (o[t] = n), o;
    }
    function xs(e, t, n, r) {
      var i = void 0,
        o = t[r];
      if (r === t.length - 1) i = n;
      else {
        var s =
          Fn(e) && Fn(e[o]) ? e[o] : typeof t[r + 1] == "number" ? [] : {};
        i = xs(s, t, n, r + 1);
      }
      return Vn(e, o, i);
    }
    function Xn(e, t, n) {
      return t.length ? xs(e, t, n, 0) : n;
    }
    function Rs(e, t, n) {
      var r = e?.[t],
        i = n(r);
      return Vn(e, t, i);
    }
    function Cs(e, t, n) {
      var r = Gn(e, t),
        i = n(r);
      return Xn(e, t, i);
    }
    function Ps(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ce.call.apply(Ce, [null, !1, !1, e, t, n, r, i, o].concat(a))
        : Ce(!1, !1, e, t, n, r, i, o);
    }
    function Ls(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ce.call.apply(Ce, [null, !1, !0, e, t, n, r, i, o].concat(a))
        : Ce(!1, !0, e, t, n, r, i, o);
    }
    function Ns(e, t, n, r, i, o, s) {
      var a = Gn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          c = arguments.length,
          g = Array(c > 7 ? c - 7 : 0),
          p = 7;
        p < c;
        p++
      )
        g[p - 7] = arguments[p];
      return (
        g.length
          ? (u = Ce.call.apply(Ce, [null, !1, !1, a, n, r, i, o, s].concat(g)))
          : (u = Ce(!1, !1, a, n, r, i, o, s)),
        Xn(e, t, u)
      );
    }
    function Ms(e, t) {
      for (var n = Array.isArray(t) ? t : [t], r = !1, i = 0; i < n.length; i++)
        if (Wv.call(e, n[i])) {
          r = !0;
          break;
        }
      if (!r) return e;
      for (var o = {}, s = Ei(e), a = 0; a < s.length; a++) {
        var u = s[a];
        n.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Ds(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ce.call.apply(Ce, [null, !0, !1, e, t, n, r, i, o].concat(a))
        : Ce(!0, !1, e, t, n, r, i, o);
    }
    var zv = {
      clone: qn,
      addLast: Is,
      addFirst: Ts,
      removeLast: bs,
      removeFirst: As,
      insert: Ss,
      removeAt: ws,
      replaceAt: Os,
      getIn: Gn,
      set: Vn,
      setIn: Xn,
      update: Rs,
      updateIn: Cs,
      merge: Ps,
      mergeDeep: Ls,
      mergeIn: Ns,
      omit: Ms,
      addDefaults: Ds,
    };
    pe.default = zv;
  });
  var qs,
    jv,
    Kv,
    Yv,
    $v,
    Qv,
    Fs,
    Gs,
    Vs = fe(() => {
      "use strict";
      Re();
      (qs = ae(St())),
        ({
          IX2_PREVIEW_REQUESTED: jv,
          IX2_PLAYBACK_REQUESTED: Kv,
          IX2_STOP_REQUESTED: Yv,
          IX2_CLEAR_REQUESTED: $v,
        } = ye),
        (Qv = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Fs = Object.create(null, {
          [jv]: { value: "preview" },
          [Kv]: { value: "playback" },
          [Yv]: { value: "stop" },
          [$v]: { value: "clear" },
        })),
        (Gs = (e = Qv, t) => {
          if (t.type in Fs) {
            let n = [Fs[t.type]];
            return (0, qs.setIn)(e, [n], { ...t.payload });
          }
          return e;
        });
    });
  var Se,
    Zv,
    Jv,
    e_,
    t_,
    n_,
    r_,
    i_,
    o_,
    a_,
    s_,
    Xs,
    u_,
    Us,
    ks = fe(() => {
      "use strict";
      Re();
      (Se = ae(St())),
        ({
          IX2_SESSION_INITIALIZED: Zv,
          IX2_SESSION_STARTED: Jv,
          IX2_TEST_FRAME_RENDERED: e_,
          IX2_SESSION_STOPPED: t_,
          IX2_EVENT_LISTENER_ADDED: n_,
          IX2_EVENT_STATE_CHANGED: r_,
          IX2_ANIMATION_FRAME_CHANGED: i_,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: o_,
          IX2_VIEWPORT_WIDTH_CHANGED: a_,
          IX2_MEDIA_QUERIES_DEFINED: s_,
        } = ye),
        (Xs = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (u_ = 20),
        (Us = (e = Xs, t) => {
          switch (t.type) {
            case Zv: {
              let { hasBoundaryNodes: n, reducedMotion: r } = t.payload;
              return (0, Se.merge)(e, {
                hasBoundaryNodes: n,
                reducedMotion: r,
              });
            }
            case Jv:
              return (0, Se.set)(e, "active", !0);
            case e_: {
              let {
                payload: { step: n = u_ },
              } = t;
              return (0, Se.set)(e, "tick", e.tick + n);
            }
            case t_:
              return Xs;
            case i_: {
              let {
                payload: { now: n },
              } = t;
              return (0, Se.set)(e, "tick", n);
            }
            case n_: {
              let n = (0, Se.addLast)(e.eventListeners, t.payload);
              return (0, Se.set)(e, "eventListeners", n);
            }
            case r_: {
              let { stateKey: n, newState: r } = t.payload;
              return (0, Se.setIn)(e, ["eventState", n], r);
            }
            case o_: {
              let { actionListId: n, isPlaying: r } = t.payload;
              return (0, Se.setIn)(e, ["playbackState", n], r);
            }
            case a_: {
              let { width: n, mediaQueries: r } = t.payload,
                i = r.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: c } = r[s];
                if (n >= u && n <= c) {
                  o = a;
                  break;
                }
              }
              return (0, Se.merge)(e, { viewportWidth: n, mediaQueryKey: o });
            }
            case s_:
              return (0, Se.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var Hs = f((m2, Bs) => {
    function c_() {
      (this.__data__ = []), (this.size = 0);
    }
    Bs.exports = c_;
  });
  var Un = f((v2, Ws) => {
    function l_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Ws.exports = l_;
  });
  var Jt = f((_2, zs) => {
    var f_ = Un();
    function d_(e, t) {
      for (var n = e.length; n--; ) if (f_(e[n][0], t)) return n;
      return -1;
    }
    zs.exports = d_;
  });
  var Ks = f((I2, js) => {
    var p_ = Jt(),
      g_ = Array.prototype,
      h_ = g_.splice;
    function E_(e) {
      var t = this.__data__,
        n = p_(t, e);
      if (n < 0) return !1;
      var r = t.length - 1;
      return n == r ? t.pop() : h_.call(t, n, 1), --this.size, !0;
    }
    js.exports = E_;
  });
  var $s = f((T2, Ys) => {
    var y_ = Jt();
    function m_(e) {
      var t = this.__data__,
        n = y_(t, e);
      return n < 0 ? void 0 : t[n][1];
    }
    Ys.exports = m_;
  });
  var Zs = f((b2, Qs) => {
    var v_ = Jt();
    function __(e) {
      return v_(this.__data__, e) > -1;
    }
    Qs.exports = __;
  });
  var eu = f((A2, Js) => {
    var I_ = Jt();
    function T_(e, t) {
      var n = this.__data__,
        r = I_(n, e);
      return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
    }
    Js.exports = T_;
  });
  var en = f((S2, tu) => {
    var b_ = Hs(),
      A_ = Ks(),
      S_ = $s(),
      w_ = Zs(),
      O_ = eu();
    function wt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    wt.prototype.clear = b_;
    wt.prototype.delete = A_;
    wt.prototype.get = S_;
    wt.prototype.has = w_;
    wt.prototype.set = O_;
    tu.exports = wt;
  });
  var ru = f((w2, nu) => {
    var x_ = en();
    function R_() {
      (this.__data__ = new x_()), (this.size = 0);
    }
    nu.exports = R_;
  });
  var ou = f((O2, iu) => {
    function C_(e) {
      var t = this.__data__,
        n = t.delete(e);
      return (this.size = t.size), n;
    }
    iu.exports = C_;
  });
  var su = f((x2, au) => {
    function P_(e) {
      return this.__data__.get(e);
    }
    au.exports = P_;
  });
  var cu = f((R2, uu) => {
    function L_(e) {
      return this.__data__.has(e);
    }
    uu.exports = L_;
  });
  var Ye = f((C2, lu) => {
    function N_(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    lu.exports = N_;
  });
  var yi = f((P2, fu) => {
    var M_ = at(),
      D_ = Ye(),
      F_ = "[object AsyncFunction]",
      q_ = "[object Function]",
      G_ = "[object GeneratorFunction]",
      V_ = "[object Proxy]";
    function X_(e) {
      if (!D_(e)) return !1;
      var t = M_(e);
      return t == q_ || t == G_ || t == F_ || t == V_;
    }
    fu.exports = X_;
  });
  var pu = f((L2, du) => {
    var U_ = Ge(),
      k_ = U_["__core-js_shared__"];
    du.exports = k_;
  });
  var Eu = f((N2, hu) => {
    var mi = pu(),
      gu = (function () {
        var e = /[^.]+$/.exec((mi && mi.keys && mi.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function B_(e) {
      return !!gu && gu in e;
    }
    hu.exports = B_;
  });
  var vi = f((M2, yu) => {
    var H_ = Function.prototype,
      W_ = H_.toString;
    function z_(e) {
      if (e != null) {
        try {
          return W_.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    yu.exports = z_;
  });
  var vu = f((D2, mu) => {
    var j_ = yi(),
      K_ = Eu(),
      Y_ = Ye(),
      $_ = vi(),
      Q_ = /[\\^$.*+?()[\]{}|]/g,
      Z_ = /^\[object .+?Constructor\]$/,
      J_ = Function.prototype,
      eI = Object.prototype,
      tI = J_.toString,
      nI = eI.hasOwnProperty,
      rI = RegExp(
        "^" +
          tI
            .call(nI)
            .replace(Q_, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function iI(e) {
      if (!Y_(e) || K_(e)) return !1;
      var t = j_(e) ? rI : Z_;
      return t.test($_(e));
    }
    mu.exports = iI;
  });
  var Iu = f((F2, _u) => {
    function oI(e, t) {
      return e?.[t];
    }
    _u.exports = oI;
  });
  var st = f((q2, Tu) => {
    var aI = vu(),
      sI = Iu();
    function uI(e, t) {
      var n = sI(e, t);
      return aI(n) ? n : void 0;
    }
    Tu.exports = uI;
  });
  var kn = f((G2, bu) => {
    var cI = st(),
      lI = Ge(),
      fI = cI(lI, "Map");
    bu.exports = fI;
  });
  var tn = f((V2, Au) => {
    var dI = st(),
      pI = dI(Object, "create");
    Au.exports = pI;
  });
  var Ou = f((X2, wu) => {
    var Su = tn();
    function gI() {
      (this.__data__ = Su ? Su(null) : {}), (this.size = 0);
    }
    wu.exports = gI;
  });
  var Ru = f((U2, xu) => {
    function hI(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    xu.exports = hI;
  });
  var Pu = f((k2, Cu) => {
    var EI = tn(),
      yI = "__lodash_hash_undefined__",
      mI = Object.prototype,
      vI = mI.hasOwnProperty;
    function _I(e) {
      var t = this.__data__;
      if (EI) {
        var n = t[e];
        return n === yI ? void 0 : n;
      }
      return vI.call(t, e) ? t[e] : void 0;
    }
    Cu.exports = _I;
  });
  var Nu = f((B2, Lu) => {
    var II = tn(),
      TI = Object.prototype,
      bI = TI.hasOwnProperty;
    function AI(e) {
      var t = this.__data__;
      return II ? t[e] !== void 0 : bI.call(t, e);
    }
    Lu.exports = AI;
  });
  var Du = f((H2, Mu) => {
    var SI = tn(),
      wI = "__lodash_hash_undefined__";
    function OI(e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = SI && t === void 0 ? wI : t),
        this
      );
    }
    Mu.exports = OI;
  });
  var qu = f((W2, Fu) => {
    var xI = Ou(),
      RI = Ru(),
      CI = Pu(),
      PI = Nu(),
      LI = Du();
    function Ot(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Ot.prototype.clear = xI;
    Ot.prototype.delete = RI;
    Ot.prototype.get = CI;
    Ot.prototype.has = PI;
    Ot.prototype.set = LI;
    Fu.exports = Ot;
  });
  var Xu = f((z2, Vu) => {
    var Gu = qu(),
      NI = en(),
      MI = kn();
    function DI() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Gu(),
          map: new (MI || NI)(),
          string: new Gu(),
        });
    }
    Vu.exports = DI;
  });
  var ku = f((j2, Uu) => {
    function FI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Uu.exports = FI;
  });
  var nn = f((K2, Bu) => {
    var qI = ku();
    function GI(e, t) {
      var n = e.__data__;
      return qI(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
    }
    Bu.exports = GI;
  });
  var Wu = f((Y2, Hu) => {
    var VI = nn();
    function XI(e) {
      var t = VI(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Hu.exports = XI;
  });
  var ju = f(($2, zu) => {
    var UI = nn();
    function kI(e) {
      return UI(this, e).get(e);
    }
    zu.exports = kI;
  });
  var Yu = f((Q2, Ku) => {
    var BI = nn();
    function HI(e) {
      return BI(this, e).has(e);
    }
    Ku.exports = HI;
  });
  var Qu = f((Z2, $u) => {
    var WI = nn();
    function zI(e, t) {
      var n = WI(this, e),
        r = n.size;
      return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
    }
    $u.exports = zI;
  });
  var Bn = f((J2, Zu) => {
    var jI = Xu(),
      KI = Wu(),
      YI = ju(),
      $I = Yu(),
      QI = Qu();
    function xt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    xt.prototype.clear = jI;
    xt.prototype.delete = KI;
    xt.prototype.get = YI;
    xt.prototype.has = $I;
    xt.prototype.set = QI;
    Zu.exports = xt;
  });
  var ec = f((eq, Ju) => {
    var ZI = en(),
      JI = kn(),
      eT = Bn(),
      tT = 200;
    function nT(e, t) {
      var n = this.__data__;
      if (n instanceof ZI) {
        var r = n.__data__;
        if (!JI || r.length < tT - 1)
          return r.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new eT(r);
      }
      return n.set(e, t), (this.size = n.size), this;
    }
    Ju.exports = nT;
  });
  var _i = f((tq, tc) => {
    var rT = en(),
      iT = ru(),
      oT = ou(),
      aT = su(),
      sT = cu(),
      uT = ec();
    function Rt(e) {
      var t = (this.__data__ = new rT(e));
      this.size = t.size;
    }
    Rt.prototype.clear = iT;
    Rt.prototype.delete = oT;
    Rt.prototype.get = aT;
    Rt.prototype.has = sT;
    Rt.prototype.set = uT;
    tc.exports = Rt;
  });
  var rc = f((nq, nc) => {
    var cT = "__lodash_hash_undefined__";
    function lT(e) {
      return this.__data__.set(e, cT), this;
    }
    nc.exports = lT;
  });
  var oc = f((rq, ic) => {
    function fT(e) {
      return this.__data__.has(e);
    }
    ic.exports = fT;
  });
  var sc = f((iq, ac) => {
    var dT = Bn(),
      pT = rc(),
      gT = oc();
    function Hn(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.__data__ = new dT(); ++t < n; ) this.add(e[t]);
    }
    Hn.prototype.add = Hn.prototype.push = pT;
    Hn.prototype.has = gT;
    ac.exports = Hn;
  });
  var cc = f((oq, uc) => {
    function hT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
        if (t(e[n], n, e)) return !0;
      return !1;
    }
    uc.exports = hT;
  });
  var fc = f((aq, lc) => {
    function ET(e, t) {
      return e.has(t);
    }
    lc.exports = ET;
  });
  var Ii = f((sq, dc) => {
    var yT = sc(),
      mT = cc(),
      vT = fc(),
      _T = 1,
      IT = 2;
    function TT(e, t, n, r, i, o) {
      var s = n & _T,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var c = o.get(e),
        g = o.get(t);
      if (c && g) return c == t && g == e;
      var p = -1,
        d = !0,
        h = n & IT ? new yT() : void 0;
      for (o.set(e, t), o.set(t, e); ++p < a; ) {
        var v = e[p],
          m = t[p];
        if (r) var T = s ? r(m, v, p, t, e, o) : r(v, m, p, e, t, o);
        if (T !== void 0) {
          if (T) continue;
          d = !1;
          break;
        }
        if (h) {
          if (
            !mT(t, function (y, S) {
              if (!vT(h, S) && (v === y || i(v, y, n, r, o))) return h.push(S);
            })
          ) {
            d = !1;
            break;
          }
        } else if (!(v === m || i(v, m, n, r, o))) {
          d = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), d;
    }
    dc.exports = TT;
  });
  var gc = f((uq, pc) => {
    var bT = Ge(),
      AT = bT.Uint8Array;
    pc.exports = AT;
  });
  var Ec = f((cq, hc) => {
    function ST(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r, i) {
          n[++t] = [i, r];
        }),
        n
      );
    }
    hc.exports = ST;
  });
  var mc = f((lq, yc) => {
    function wT(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r) {
          n[++t] = r;
        }),
        n
      );
    }
    yc.exports = wT;
  });
  var bc = f((fq, Tc) => {
    var vc = Tt(),
      _c = gc(),
      OT = Un(),
      xT = Ii(),
      RT = Ec(),
      CT = mc(),
      PT = 1,
      LT = 2,
      NT = "[object Boolean]",
      MT = "[object Date]",
      DT = "[object Error]",
      FT = "[object Map]",
      qT = "[object Number]",
      GT = "[object RegExp]",
      VT = "[object Set]",
      XT = "[object String]",
      UT = "[object Symbol]",
      kT = "[object ArrayBuffer]",
      BT = "[object DataView]",
      Ic = vc ? vc.prototype : void 0,
      Ti = Ic ? Ic.valueOf : void 0;
    function HT(e, t, n, r, i, o, s) {
      switch (n) {
        case BT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case kT:
          return !(e.byteLength != t.byteLength || !o(new _c(e), new _c(t)));
        case NT:
        case MT:
        case qT:
          return OT(+e, +t);
        case DT:
          return e.name == t.name && e.message == t.message;
        case GT:
        case XT:
          return e == t + "";
        case FT:
          var a = RT;
        case VT:
          var u = r & PT;
          if ((a || (a = CT), e.size != t.size && !u)) return !1;
          var c = s.get(e);
          if (c) return c == t;
          (r |= LT), s.set(e, t);
          var g = xT(a(e), a(t), r, i, o, s);
          return s.delete(e), g;
        case UT:
          if (Ti) return Ti.call(e) == Ti.call(t);
      }
      return !1;
    }
    Tc.exports = HT;
  });
  var Wn = f((dq, Ac) => {
    function WT(e, t) {
      for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
      return e;
    }
    Ac.exports = WT;
  });
  var ve = f((pq, Sc) => {
    var zT = Array.isArray;
    Sc.exports = zT;
  });
  var bi = f((gq, wc) => {
    var jT = Wn(),
      KT = ve();
    function YT(e, t, n) {
      var r = t(e);
      return KT(e) ? r : jT(r, n(e));
    }
    wc.exports = YT;
  });
  var xc = f((hq, Oc) => {
    function $T(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = 0, o = []; ++n < r; ) {
        var s = e[n];
        t(s, n, e) && (o[i++] = s);
      }
      return o;
    }
    Oc.exports = $T;
  });
  var Ai = f((Eq, Rc) => {
    function QT() {
      return [];
    }
    Rc.exports = QT;
  });
  var Si = f((yq, Pc) => {
    var ZT = xc(),
      JT = Ai(),
      eb = Object.prototype,
      tb = eb.propertyIsEnumerable,
      Cc = Object.getOwnPropertySymbols,
      nb = Cc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                ZT(Cc(e), function (t) {
                  return tb.call(e, t);
                }));
          }
        : JT;
    Pc.exports = nb;
  });
  var Nc = f((mq, Lc) => {
    function rb(e, t) {
      for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
      return r;
    }
    Lc.exports = rb;
  });
  var Dc = f((vq, Mc) => {
    var ib = at(),
      ob = Je(),
      ab = "[object Arguments]";
    function sb(e) {
      return ob(e) && ib(e) == ab;
    }
    Mc.exports = sb;
  });
  var rn = f((_q, Gc) => {
    var Fc = Dc(),
      ub = Je(),
      qc = Object.prototype,
      cb = qc.hasOwnProperty,
      lb = qc.propertyIsEnumerable,
      fb = Fc(
        (function () {
          return arguments;
        })()
      )
        ? Fc
        : function (e) {
            return ub(e) && cb.call(e, "callee") && !lb.call(e, "callee");
          };
    Gc.exports = fb;
  });
  var Xc = f((Iq, Vc) => {
    function db() {
      return !1;
    }
    Vc.exports = db;
  });
  var zn = f((on, Ct) => {
    var pb = Ge(),
      gb = Xc(),
      Bc = typeof on == "object" && on && !on.nodeType && on,
      Uc = Bc && typeof Ct == "object" && Ct && !Ct.nodeType && Ct,
      hb = Uc && Uc.exports === Bc,
      kc = hb ? pb.Buffer : void 0,
      Eb = kc ? kc.isBuffer : void 0,
      yb = Eb || gb;
    Ct.exports = yb;
  });
  var jn = f((Tq, Hc) => {
    var mb = 9007199254740991,
      vb = /^(?:0|[1-9]\d*)$/;
    function _b(e, t) {
      var n = typeof e;
      return (
        (t = t ?? mb),
        !!t &&
          (n == "number" || (n != "symbol" && vb.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Hc.exports = _b;
  });
  var Kn = f((bq, Wc) => {
    var Ib = 9007199254740991;
    function Tb(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ib;
    }
    Wc.exports = Tb;
  });
  var jc = f((Aq, zc) => {
    var bb = at(),
      Ab = Kn(),
      Sb = Je(),
      wb = "[object Arguments]",
      Ob = "[object Array]",
      xb = "[object Boolean]",
      Rb = "[object Date]",
      Cb = "[object Error]",
      Pb = "[object Function]",
      Lb = "[object Map]",
      Nb = "[object Number]",
      Mb = "[object Object]",
      Db = "[object RegExp]",
      Fb = "[object Set]",
      qb = "[object String]",
      Gb = "[object WeakMap]",
      Vb = "[object ArrayBuffer]",
      Xb = "[object DataView]",
      Ub = "[object Float32Array]",
      kb = "[object Float64Array]",
      Bb = "[object Int8Array]",
      Hb = "[object Int16Array]",
      Wb = "[object Int32Array]",
      zb = "[object Uint8Array]",
      jb = "[object Uint8ClampedArray]",
      Kb = "[object Uint16Array]",
      Yb = "[object Uint32Array]",
      le = {};
    le[Ub] =
      le[kb] =
      le[Bb] =
      le[Hb] =
      le[Wb] =
      le[zb] =
      le[jb] =
      le[Kb] =
      le[Yb] =
        !0;
    le[wb] =
      le[Ob] =
      le[Vb] =
      le[xb] =
      le[Xb] =
      le[Rb] =
      le[Cb] =
      le[Pb] =
      le[Lb] =
      le[Nb] =
      le[Mb] =
      le[Db] =
      le[Fb] =
      le[qb] =
      le[Gb] =
        !1;
    function $b(e) {
      return Sb(e) && Ab(e.length) && !!le[bb(e)];
    }
    zc.exports = $b;
  });
  var Yc = f((Sq, Kc) => {
    function Qb(e) {
      return function (t) {
        return e(t);
      };
    }
    Kc.exports = Qb;
  });
  var Qc = f((an, Pt) => {
    var Zb = Qr(),
      $c = typeof an == "object" && an && !an.nodeType && an,
      sn = $c && typeof Pt == "object" && Pt && !Pt.nodeType && Pt,
      Jb = sn && sn.exports === $c,
      wi = Jb && Zb.process,
      eA = (function () {
        try {
          var e = sn && sn.require && sn.require("util").types;
          return e || (wi && wi.binding && wi.binding("util"));
        } catch {}
      })();
    Pt.exports = eA;
  });
  var Yn = f((wq, el) => {
    var tA = jc(),
      nA = Yc(),
      Zc = Qc(),
      Jc = Zc && Zc.isTypedArray,
      rA = Jc ? nA(Jc) : tA;
    el.exports = rA;
  });
  var Oi = f((Oq, tl) => {
    var iA = Nc(),
      oA = rn(),
      aA = ve(),
      sA = zn(),
      uA = jn(),
      cA = Yn(),
      lA = Object.prototype,
      fA = lA.hasOwnProperty;
    function dA(e, t) {
      var n = aA(e),
        r = !n && oA(e),
        i = !n && !r && sA(e),
        o = !n && !r && !i && cA(e),
        s = n || r || i || o,
        a = s ? iA(e.length, String) : [],
        u = a.length;
      for (var c in e)
        (t || fA.call(e, c)) &&
          !(
            s &&
            (c == "length" ||
              (i && (c == "offset" || c == "parent")) ||
              (o &&
                (c == "buffer" || c == "byteLength" || c == "byteOffset")) ||
              uA(c, u))
          ) &&
          a.push(c);
      return a;
    }
    tl.exports = dA;
  });
  var $n = f((xq, nl) => {
    var pA = Object.prototype;
    function gA(e) {
      var t = e && e.constructor,
        n = (typeof t == "function" && t.prototype) || pA;
      return e === n;
    }
    nl.exports = gA;
  });
  var il = f((Rq, rl) => {
    var hA = Zr(),
      EA = hA(Object.keys, Object);
    rl.exports = EA;
  });
  var Qn = f((Cq, ol) => {
    var yA = $n(),
      mA = il(),
      vA = Object.prototype,
      _A = vA.hasOwnProperty;
    function IA(e) {
      if (!yA(e)) return mA(e);
      var t = [];
      for (var n in Object(e)) _A.call(e, n) && n != "constructor" && t.push(n);
      return t;
    }
    ol.exports = IA;
  });
  var dt = f((Pq, al) => {
    var TA = yi(),
      bA = Kn();
    function AA(e) {
      return e != null && bA(e.length) && !TA(e);
    }
    al.exports = AA;
  });
  var un = f((Lq, sl) => {
    var SA = Oi(),
      wA = Qn(),
      OA = dt();
    function xA(e) {
      return OA(e) ? SA(e) : wA(e);
    }
    sl.exports = xA;
  });
  var cl = f((Nq, ul) => {
    var RA = bi(),
      CA = Si(),
      PA = un();
    function LA(e) {
      return RA(e, PA, CA);
    }
    ul.exports = LA;
  });
  var dl = f((Mq, fl) => {
    var ll = cl(),
      NA = 1,
      MA = Object.prototype,
      DA = MA.hasOwnProperty;
    function FA(e, t, n, r, i, o) {
      var s = n & NA,
        a = ll(e),
        u = a.length,
        c = ll(t),
        g = c.length;
      if (u != g && !s) return !1;
      for (var p = u; p--; ) {
        var d = a[p];
        if (!(s ? d in t : DA.call(t, d))) return !1;
      }
      var h = o.get(e),
        v = o.get(t);
      if (h && v) return h == t && v == e;
      var m = !0;
      o.set(e, t), o.set(t, e);
      for (var T = s; ++p < u; ) {
        d = a[p];
        var y = e[d],
          S = t[d];
        if (r) var A = s ? r(S, y, d, t, e, o) : r(y, S, d, e, t, o);
        if (!(A === void 0 ? y === S || i(y, S, n, r, o) : A)) {
          m = !1;
          break;
        }
        T || (T = d == "constructor");
      }
      if (m && !T) {
        var R = e.constructor,
          P = t.constructor;
        R != P &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof R == "function" &&
            R instanceof R &&
            typeof P == "function" &&
            P instanceof P
          ) &&
          (m = !1);
      }
      return o.delete(e), o.delete(t), m;
    }
    fl.exports = FA;
  });
  var gl = f((Dq, pl) => {
    var qA = st(),
      GA = Ge(),
      VA = qA(GA, "DataView");
    pl.exports = VA;
  });
  var El = f((Fq, hl) => {
    var XA = st(),
      UA = Ge(),
      kA = XA(UA, "Promise");
    hl.exports = kA;
  });
  var ml = f((qq, yl) => {
    var BA = st(),
      HA = Ge(),
      WA = BA(HA, "Set");
    yl.exports = WA;
  });
  var xi = f((Gq, vl) => {
    var zA = st(),
      jA = Ge(),
      KA = zA(jA, "WeakMap");
    vl.exports = KA;
  });
  var Zn = f((Vq, wl) => {
    var Ri = gl(),
      Ci = kn(),
      Pi = El(),
      Li = ml(),
      Ni = xi(),
      Sl = at(),
      Lt = vi(),
      _l = "[object Map]",
      YA = "[object Object]",
      Il = "[object Promise]",
      Tl = "[object Set]",
      bl = "[object WeakMap]",
      Al = "[object DataView]",
      $A = Lt(Ri),
      QA = Lt(Ci),
      ZA = Lt(Pi),
      JA = Lt(Li),
      e0 = Lt(Ni),
      pt = Sl;
    ((Ri && pt(new Ri(new ArrayBuffer(1))) != Al) ||
      (Ci && pt(new Ci()) != _l) ||
      (Pi && pt(Pi.resolve()) != Il) ||
      (Li && pt(new Li()) != Tl) ||
      (Ni && pt(new Ni()) != bl)) &&
      (pt = function (e) {
        var t = Sl(e),
          n = t == YA ? e.constructor : void 0,
          r = n ? Lt(n) : "";
        if (r)
          switch (r) {
            case $A:
              return Al;
            case QA:
              return _l;
            case ZA:
              return Il;
            case JA:
              return Tl;
            case e0:
              return bl;
          }
        return t;
      });
    wl.exports = pt;
  });
  var Ml = f((Xq, Nl) => {
    var Mi = _i(),
      t0 = Ii(),
      n0 = bc(),
      r0 = dl(),
      Ol = Zn(),
      xl = ve(),
      Rl = zn(),
      i0 = Yn(),
      o0 = 1,
      Cl = "[object Arguments]",
      Pl = "[object Array]",
      Jn = "[object Object]",
      a0 = Object.prototype,
      Ll = a0.hasOwnProperty;
    function s0(e, t, n, r, i, o) {
      var s = xl(e),
        a = xl(t),
        u = s ? Pl : Ol(e),
        c = a ? Pl : Ol(t);
      (u = u == Cl ? Jn : u), (c = c == Cl ? Jn : c);
      var g = u == Jn,
        p = c == Jn,
        d = u == c;
      if (d && Rl(e)) {
        if (!Rl(t)) return !1;
        (s = !0), (g = !1);
      }
      if (d && !g)
        return (
          o || (o = new Mi()),
          s || i0(e) ? t0(e, t, n, r, i, o) : n0(e, t, u, n, r, i, o)
        );
      if (!(n & o0)) {
        var h = g && Ll.call(e, "__wrapped__"),
          v = p && Ll.call(t, "__wrapped__");
        if (h || v) {
          var m = h ? e.value() : e,
            T = v ? t.value() : t;
          return o || (o = new Mi()), i(m, T, n, r, o);
        }
      }
      return d ? (o || (o = new Mi()), r0(e, t, n, r, i, o)) : !1;
    }
    Nl.exports = s0;
  });
  var Di = f((Uq, ql) => {
    var u0 = Ml(),
      Dl = Je();
    function Fl(e, t, n, r, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Dl(e) && !Dl(t))
        ? e !== e && t !== t
        : u0(e, t, n, r, Fl, i);
    }
    ql.exports = Fl;
  });
  var Vl = f((kq, Gl) => {
    var c0 = _i(),
      l0 = Di(),
      f0 = 1,
      d0 = 2;
    function p0(e, t, n, r) {
      var i = n.length,
        o = i,
        s = !r;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = n[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = n[i];
        var u = a[0],
          c = e[u],
          g = a[1];
        if (s && a[2]) {
          if (c === void 0 && !(u in e)) return !1;
        } else {
          var p = new c0();
          if (r) var d = r(c, g, u, e, t, p);
          if (!(d === void 0 ? l0(g, c, f0 | d0, r, p) : d)) return !1;
        }
      }
      return !0;
    }
    Gl.exports = p0;
  });
  var Fi = f((Bq, Xl) => {
    var g0 = Ye();
    function h0(e) {
      return e === e && !g0(e);
    }
    Xl.exports = h0;
  });
  var kl = f((Hq, Ul) => {
    var E0 = Fi(),
      y0 = un();
    function m0(e) {
      for (var t = y0(e), n = t.length; n--; ) {
        var r = t[n],
          i = e[r];
        t[n] = [r, i, E0(i)];
      }
      return t;
    }
    Ul.exports = m0;
  });
  var qi = f((Wq, Bl) => {
    function v0(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    Bl.exports = v0;
  });
  var Wl = f((zq, Hl) => {
    var _0 = Vl(),
      I0 = kl(),
      T0 = qi();
    function b0(e) {
      var t = I0(e);
      return t.length == 1 && t[0][2]
        ? T0(t[0][0], t[0][1])
        : function (n) {
            return n === e || _0(n, e, t);
          };
    }
    Hl.exports = b0;
  });
  var cn = f((jq, zl) => {
    var A0 = at(),
      S0 = Je(),
      w0 = "[object Symbol]";
    function O0(e) {
      return typeof e == "symbol" || (S0(e) && A0(e) == w0);
    }
    zl.exports = O0;
  });
  var er = f((Kq, jl) => {
    var x0 = ve(),
      R0 = cn(),
      C0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      P0 = /^\w*$/;
    function L0(e, t) {
      if (x0(e)) return !1;
      var n = typeof e;
      return n == "number" ||
        n == "symbol" ||
        n == "boolean" ||
        e == null ||
        R0(e)
        ? !0
        : P0.test(e) || !C0.test(e) || (t != null && e in Object(t));
    }
    jl.exports = L0;
  });
  var $l = f((Yq, Yl) => {
    var Kl = Bn(),
      N0 = "Expected a function";
    function Gi(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(N0);
      var n = function () {
        var r = arguments,
          i = t ? t.apply(this, r) : r[0],
          o = n.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, r);
        return (n.cache = o.set(i, s) || o), s;
      };
      return (n.cache = new (Gi.Cache || Kl)()), n;
    }
    Gi.Cache = Kl;
    Yl.exports = Gi;
  });
  var Zl = f(($q, Ql) => {
    var M0 = $l(),
      D0 = 500;
    function F0(e) {
      var t = M0(e, function (r) {
          return n.size === D0 && n.clear(), r;
        }),
        n = t.cache;
      return t;
    }
    Ql.exports = F0;
  });
  var ef = f((Qq, Jl) => {
    var q0 = Zl(),
      G0 =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      V0 = /\\(\\)?/g,
      X0 = q0(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(G0, function (n, r, i, o) {
            t.push(i ? o.replace(V0, "$1") : r || n);
          }),
          t
        );
      });
    Jl.exports = X0;
  });
  var Vi = f((Zq, tf) => {
    function U0(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
        i[n] = t(e[n], n, e);
      return i;
    }
    tf.exports = U0;
  });
  var uf = f((Jq, sf) => {
    var nf = Tt(),
      k0 = Vi(),
      B0 = ve(),
      H0 = cn(),
      W0 = 1 / 0,
      rf = nf ? nf.prototype : void 0,
      of = rf ? rf.toString : void 0;
    function af(e) {
      if (typeof e == "string") return e;
      if (B0(e)) return k0(e, af) + "";
      if (H0(e)) return of ? of.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -W0 ? "-0" : t;
    }
    sf.exports = af;
  });
  var lf = f((e1, cf) => {
    var z0 = uf();
    function j0(e) {
      return e == null ? "" : z0(e);
    }
    cf.exports = j0;
  });
  var ln = f((t1, ff) => {
    var K0 = ve(),
      Y0 = er(),
      $0 = ef(),
      Q0 = lf();
    function Z0(e, t) {
      return K0(e) ? e : Y0(e, t) ? [e] : $0(Q0(e));
    }
    ff.exports = Z0;
  });
  var Nt = f((n1, df) => {
    var J0 = cn(),
      eS = 1 / 0;
    function tS(e) {
      if (typeof e == "string" || J0(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -eS ? "-0" : t;
    }
    df.exports = tS;
  });
  var tr = f((r1, pf) => {
    var nS = ln(),
      rS = Nt();
    function iS(e, t) {
      t = nS(t, e);
      for (var n = 0, r = t.length; e != null && n < r; ) e = e[rS(t[n++])];
      return n && n == r ? e : void 0;
    }
    pf.exports = iS;
  });
  var nr = f((i1, gf) => {
    var oS = tr();
    function aS(e, t, n) {
      var r = e == null ? void 0 : oS(e, t);
      return r === void 0 ? n : r;
    }
    gf.exports = aS;
  });
  var Ef = f((o1, hf) => {
    function sS(e, t) {
      return e != null && t in Object(e);
    }
    hf.exports = sS;
  });
  var mf = f((a1, yf) => {
    var uS = ln(),
      cS = rn(),
      lS = ve(),
      fS = jn(),
      dS = Kn(),
      pS = Nt();
    function gS(e, t, n) {
      t = uS(t, e);
      for (var r = -1, i = t.length, o = !1; ++r < i; ) {
        var s = pS(t[r]);
        if (!(o = e != null && n(e, s))) break;
        e = e[s];
      }
      return o || ++r != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && dS(i) && fS(s, i) && (lS(e) || cS(e)));
    }
    yf.exports = gS;
  });
  var _f = f((s1, vf) => {
    var hS = Ef(),
      ES = mf();
    function yS(e, t) {
      return e != null && ES(e, t, hS);
    }
    vf.exports = yS;
  });
  var Tf = f((u1, If) => {
    var mS = Di(),
      vS = nr(),
      _S = _f(),
      IS = er(),
      TS = Fi(),
      bS = qi(),
      AS = Nt(),
      SS = 1,
      wS = 2;
    function OS(e, t) {
      return IS(e) && TS(t)
        ? bS(AS(e), t)
        : function (n) {
            var r = vS(n, e);
            return r === void 0 && r === t ? _S(n, e) : mS(t, r, SS | wS);
          };
    }
    If.exports = OS;
  });
  var rr = f((c1, bf) => {
    function xS(e) {
      return e;
    }
    bf.exports = xS;
  });
  var Xi = f((l1, Af) => {
    function RS(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Af.exports = RS;
  });
  var wf = f((f1, Sf) => {
    var CS = tr();
    function PS(e) {
      return function (t) {
        return CS(t, e);
      };
    }
    Sf.exports = PS;
  });
  var xf = f((d1, Of) => {
    var LS = Xi(),
      NS = wf(),
      MS = er(),
      DS = Nt();
    function FS(e) {
      return MS(e) ? LS(DS(e)) : NS(e);
    }
    Of.exports = FS;
  });
  var ut = f((p1, Rf) => {
    var qS = Wl(),
      GS = Tf(),
      VS = rr(),
      XS = ve(),
      US = xf();
    function kS(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? VS
        : typeof e == "object"
        ? XS(e)
          ? GS(e[0], e[1])
          : qS(e)
        : US(e);
    }
    Rf.exports = kS;
  });
  var Ui = f((g1, Cf) => {
    var BS = ut(),
      HS = dt(),
      WS = un();
    function zS(e) {
      return function (t, n, r) {
        var i = Object(t);
        if (!HS(t)) {
          var o = BS(n, 3);
          (t = WS(t)),
            (n = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, n, r);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Cf.exports = zS;
  });
  var ki = f((h1, Pf) => {
    function jS(e, t, n, r) {
      for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Pf.exports = jS;
  });
  var Nf = f((E1, Lf) => {
    var KS = /\s/;
    function YS(e) {
      for (var t = e.length; t-- && KS.test(e.charAt(t)); );
      return t;
    }
    Lf.exports = YS;
  });
  var Df = f((y1, Mf) => {
    var $S = Nf(),
      QS = /^\s+/;
    function ZS(e) {
      return e && e.slice(0, $S(e) + 1).replace(QS, "");
    }
    Mf.exports = ZS;
  });
  var ir = f((m1, Gf) => {
    var JS = Df(),
      Ff = Ye(),
      ew = cn(),
      qf = 0 / 0,
      tw = /^[-+]0x[0-9a-f]+$/i,
      nw = /^0b[01]+$/i,
      rw = /^0o[0-7]+$/i,
      iw = parseInt;
    function ow(e) {
      if (typeof e == "number") return e;
      if (ew(e)) return qf;
      if (Ff(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Ff(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = JS(e);
      var n = nw.test(e);
      return n || rw.test(e) ? iw(e.slice(2), n ? 2 : 8) : tw.test(e) ? qf : +e;
    }
    Gf.exports = ow;
  });
  var Uf = f((v1, Xf) => {
    var aw = ir(),
      Vf = 1 / 0,
      sw = 17976931348623157e292;
    function uw(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = aw(e)), e === Vf || e === -Vf)) {
        var t = e < 0 ? -1 : 1;
        return t * sw;
      }
      return e === e ? e : 0;
    }
    Xf.exports = uw;
  });
  var Bi = f((_1, kf) => {
    var cw = Uf();
    function lw(e) {
      var t = cw(e),
        n = t % 1;
      return t === t ? (n ? t - n : t) : 0;
    }
    kf.exports = lw;
  });
  var Hf = f((I1, Bf) => {
    var fw = ki(),
      dw = ut(),
      pw = Bi(),
      gw = Math.max;
    function hw(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = n == null ? 0 : pw(n);
      return i < 0 && (i = gw(r + i, 0)), fw(e, dw(t, 3), i);
    }
    Bf.exports = hw;
  });
  var Hi = f((T1, Wf) => {
    var Ew = Ui(),
      yw = Hf(),
      mw = Ew(yw);
    Wf.exports = mw;
  });
  var Kf = {};
  xe(Kf, {
    ELEMENT_MATCHES: () => vw,
    FLEX_PREFIXED: () => Wi,
    IS_BROWSER_ENV: () => Xe,
    TRANSFORM_PREFIXED: () => ct,
    TRANSFORM_STYLE_PREFIXED: () => ar,
    withBrowser: () => or,
  });
  var jf,
    Xe,
    or,
    vw,
    Wi,
    ct,
    zf,
    ar,
    sr = fe(() => {
      "use strict";
      (jf = ae(Hi())),
        (Xe = typeof window < "u"),
        (or = (e, t) => (Xe ? e() : t)),
        (vw = or(() =>
          (0, jf.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Wi = or(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            n = "";
          try {
            let { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return n;
          } catch {
            return n;
          }
        }, "flex")),
        (ct = or(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              n = "Transform",
              { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i] + n;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (zf = ct.split("transform")[0]),
        (ar = zf ? zf + "TransformStyle" : "transformStyle");
    });
  var zi = f((b1, Jf) => {
    var _w = 4,
      Iw = 0.001,
      Tw = 1e-7,
      bw = 10,
      fn = 11,
      ur = 1 / (fn - 1),
      Aw = typeof Float32Array == "function";
    function Yf(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function $f(e, t) {
      return 3 * t - 6 * e;
    }
    function Qf(e) {
      return 3 * e;
    }
    function cr(e, t, n) {
      return ((Yf(t, n) * e + $f(t, n)) * e + Qf(t)) * e;
    }
    function Zf(e, t, n) {
      return 3 * Yf(t, n) * e * e + 2 * $f(t, n) * e + Qf(t);
    }
    function Sw(e, t, n, r, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (n - t) / 2), (o = cr(s, r, i) - e), o > 0 ? (n = s) : (t = s);
      while (Math.abs(o) > Tw && ++a < bw);
      return s;
    }
    function ww(e, t, n, r) {
      for (var i = 0; i < _w; ++i) {
        var o = Zf(t, n, r);
        if (o === 0) return t;
        var s = cr(t, n, r) - e;
        t -= s / o;
      }
      return t;
    }
    Jf.exports = function (t, n, r, i) {
      if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = Aw ? new Float32Array(fn) : new Array(fn);
      if (t !== n || r !== i)
        for (var s = 0; s < fn; ++s) o[s] = cr(s * ur, t, r);
      function a(u) {
        for (var c = 0, g = 1, p = fn - 1; g !== p && o[g] <= u; ++g) c += ur;
        --g;
        var d = (u - o[g]) / (o[g + 1] - o[g]),
          h = c + d * ur,
          v = Zf(h, t, r);
        return v >= Iw ? ww(u, h, t, r) : v === 0 ? h : Sw(u, c, c + ur, t, r);
      }
      return function (c) {
        return t === n && r === i
          ? c
          : c === 0
          ? 0
          : c === 1
          ? 1
          : cr(a(c), n, i);
      };
    };
  });
  var pn = {};
  xe(pn, {
    bounce: () => uO,
    bouncePast: () => cO,
    ease: () => Ow,
    easeIn: () => xw,
    easeInOut: () => Cw,
    easeOut: () => Rw,
    inBack: () => Jw,
    inCirc: () => Yw,
    inCubic: () => Mw,
    inElastic: () => nO,
    inExpo: () => zw,
    inOutBack: () => tO,
    inOutCirc: () => Qw,
    inOutCubic: () => Fw,
    inOutElastic: () => iO,
    inOutExpo: () => Kw,
    inOutQuad: () => Nw,
    inOutQuart: () => Vw,
    inOutQuint: () => kw,
    inOutSine: () => Ww,
    inQuad: () => Pw,
    inQuart: () => qw,
    inQuint: () => Xw,
    inSine: () => Bw,
    outBack: () => eO,
    outBounce: () => Zw,
    outCirc: () => $w,
    outCubic: () => Dw,
    outElastic: () => rO,
    outExpo: () => jw,
    outQuad: () => Lw,
    outQuart: () => Gw,
    outQuint: () => Uw,
    outSine: () => Hw,
    swingFrom: () => aO,
    swingFromTo: () => oO,
    swingTo: () => sO,
  });
  function Pw(e) {
    return Math.pow(e, 2);
  }
  function Lw(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function Nw(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function Mw(e) {
    return Math.pow(e, 3);
  }
  function Dw(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function Fw(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function qw(e) {
    return Math.pow(e, 4);
  }
  function Gw(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function Vw(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function Xw(e) {
    return Math.pow(e, 5);
  }
  function Uw(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function kw(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function Bw(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function Hw(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function Ww(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function zw(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function jw(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function Kw(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function Yw(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function $w(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function Qw(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function Zw(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Jw(e) {
    let t = et;
    return e * e * ((t + 1) * e - t);
  }
  function eO(e) {
    let t = et;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function tO(e) {
    let t = et;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function nO(e) {
    let t = et,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        -(
          r *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / n)
        ));
  }
  function rO(e) {
    let t = et,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) + 1);
  }
  function iO(e) {
    let t = et,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (n || (n = 0.3 * 1.5),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        e < 1
          ? -0.5 *
            (r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n))
          : r *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n) *
              0.5 +
            1);
  }
  function oO(e) {
    let t = et;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function aO(e) {
    let t = et;
    return e * e * ((t + 1) * e - t);
  }
  function sO(e) {
    let t = et;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function uO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function cO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var dn,
    et,
    Ow,
    xw,
    Rw,
    Cw,
    ji = fe(() => {
      "use strict";
      (dn = ae(zi())),
        (et = 1.70158),
        (Ow = (0, dn.default)(0.25, 0.1, 0.25, 1)),
        (xw = (0, dn.default)(0.42, 0, 1, 1)),
        (Rw = (0, dn.default)(0, 0, 0.58, 1)),
        (Cw = (0, dn.default)(0.42, 0, 0.58, 1));
    });
  var td = {};
  xe(td, {
    applyEasing: () => fO,
    createBezierEasing: () => lO,
    optimizeFloat: () => gn,
  });
  function gn(e, t = 5, n = 10) {
    let r = Math.pow(n, t),
      i = Number(Math.round(e * r) / r);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function lO(e) {
    return (0, ed.default)(...e);
  }
  function fO(e, t, n) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : gn(n ? (t > 0 ? n(t) : t) : t > 0 && e && pn[e] ? pn[e](t) : t);
  }
  var ed,
    Ki = fe(() => {
      "use strict";
      ji();
      ed = ae(zi());
    });
  var id = {};
  xe(id, {
    createElementState: () => rd,
    ixElements: () => SO,
    mergeActionState: () => Yi,
  });
  function rd(e, t, n, r, i) {
    let o =
      n === dO ? (0, Mt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Mt.mergeIn)(e, [r], { id: r, ref: t, refId: o, refType: n });
  }
  function Yi(e, t, n, r, i) {
    let o = OO(i);
    return (0, Mt.mergeIn)(e, [t, AO, n], r, o);
  }
  function OO(e) {
    let { config: t } = e;
    return wO.reduce((n, r) => {
      let i = r[0],
        o = r[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (n[o] = a), n;
    }, {});
  }
  var Mt,
    S1,
    dO,
    w1,
    pO,
    gO,
    hO,
    EO,
    yO,
    mO,
    vO,
    _O,
    IO,
    TO,
    bO,
    nd,
    AO,
    SO,
    wO,
    od = fe(() => {
      "use strict";
      Mt = ae(St());
      Re();
      ({
        HTML_ELEMENT: S1,
        PLAIN_OBJECT: dO,
        ABSTRACT_NODE: w1,
        CONFIG_X_VALUE: pO,
        CONFIG_Y_VALUE: gO,
        CONFIG_Z_VALUE: hO,
        CONFIG_VALUE: EO,
        CONFIG_X_UNIT: yO,
        CONFIG_Y_UNIT: mO,
        CONFIG_Z_UNIT: vO,
        CONFIG_UNIT: _O,
      } = _e),
        ({
          IX2_SESSION_STOPPED: IO,
          IX2_INSTANCE_ADDED: TO,
          IX2_ELEMENT_STATE_CHANGED: bO,
        } = ye),
        (nd = {}),
        (AO = "refState"),
        (SO = (e = nd, t = {}) => {
          switch (t.type) {
            case IO:
              return nd;
            case TO: {
              let {
                  elementId: n,
                  element: r,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Mt.getIn)(u, [n, r]) !== r && (u = rd(u, r, s, n, o)),
                Yi(u, n, a, i, o)
              );
            }
            case bO: {
              let {
                elementId: n,
                actionTypeId: r,
                current: i,
                actionItem: o,
              } = t.payload;
              return Yi(e, n, r, i, o);
            }
            default:
              return e;
          }
        });
      wO = [
        [pO, yO],
        [gO, mO],
        [hO, vO],
        [EO, _O],
      ];
    });
  var ad = f(($i) => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    function xO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    xO($i, {
      clearPlugin: function () {
        return DO;
      },
      createPluginInstance: function () {
        return NO;
      },
      getPluginConfig: function () {
        return RO;
      },
      getPluginDestination: function () {
        return LO;
      },
      getPluginDuration: function () {
        return CO;
      },
      getPluginOrigin: function () {
        return PO;
      },
      renderPlugin: function () {
        return MO;
      },
    });
    var RO = (e) => e.value,
      CO = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let n = parseFloat(e.getAttribute("data-duration"));
        return n > 0
          ? n * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      PO = (e) => e || { value: 0 },
      LO = (e) => ({ value: e.value }),
      NO = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      },
      MO = (e, t, n) => {
        if (!e) return;
        let r = t[n.actionTypeId].value / 100;
        e.goToFrame(e.frames * r);
      },
      DO = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var ud = f((Qi) => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    function FO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    FO(Qi, {
      clearPlugin: function () {
        return zO;
      },
      createPluginInstance: function () {
        return HO;
      },
      getPluginConfig: function () {
        return XO;
      },
      getPluginDestination: function () {
        return BO;
      },
      getPluginDuration: function () {
        return UO;
      },
      getPluginOrigin: function () {
        return kO;
      },
      renderPlugin: function () {
        return WO;
      },
    });
    var qO = (e) => document.querySelector(`[data-w-id="${e}"]`),
      GO = () => window.Webflow.require("spline"),
      VO = (e, t) => e.filter((n) => !t.includes(n)),
      XO = (e, t) => e.value[t],
      UO = () => null,
      sd = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      kO = (e, t) => {
        let n = t.config.value,
          r = Object.keys(n);
        if (e) {
          let o = Object.keys(e),
            s = VO(r, o);
          return s.length ? s.reduce((u, c) => ((u[c] = sd[c]), u), e) : e;
        }
        return r.reduce((o, s) => ((o[s] = sd[s]), o), {});
      },
      BO = (e) => e.value,
      HO = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? qO(n) : null;
      },
      WO = (e, t, n) => {
        let r = GO(),
          i = r.getInstance(e),
          o = n.config.target.objectId,
          s = (a) => {
            if (!a)
              throw new Error("Invalid spline app passed to renderSpline");
            let u = o && a.findObjectById(o);
            if (!u) return;
            let { PLUGIN_SPLINE: c } = t;
            c.positionX != null && (u.position.x = c.positionX),
              c.positionY != null && (u.position.y = c.positionY),
              c.positionZ != null && (u.position.z = c.positionZ),
              c.rotationX != null && (u.rotation.x = c.rotationX),
              c.rotationY != null && (u.rotation.y = c.rotationY),
              c.rotationZ != null && (u.rotation.z = c.rotationZ),
              c.scaleX != null && (u.scale.x = c.scaleX),
              c.scaleY != null && (u.scale.y = c.scaleY),
              c.scaleZ != null && (u.scale.z = c.scaleZ);
          };
        i ? s(i.spline) : r.setLoadHandler(e, s);
      },
      zO = () => null;
  });
  var cd = f((eo) => {
    "use strict";
    Object.defineProperty(eo, "__esModule", { value: !0 });
    function jO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    jO(eo, {
      clearPlugin: function () {
        return nx;
      },
      createPluginInstance: function () {
        return ex;
      },
      getPluginConfig: function () {
        return $O;
      },
      getPluginDestination: function () {
        return JO;
      },
      getPluginDuration: function () {
        return QO;
      },
      getPluginOrigin: function () {
        return ZO;
      },
      renderPlugin: function () {
        return tx;
      },
    });
    var Zi = "--wf-rive-fit",
      Ji = "--wf-rive-alignment",
      KO = (e) => document.querySelector(`[data-w-id="${e}"]`),
      YO = () => window.Webflow.require("rive"),
      $O = (e, t) => e.value.inputs[t],
      QO = () => null,
      ZO = (e, t) => {
        if (e) return e;
        let n = {},
          { inputs: r = {} } = t.config.value;
        for (let i in r) r[i] == null && (n[i] = 0);
        return n;
      },
      JO = (e) => e.value.inputs ?? {},
      ex = (e, t) => {
        if ((t.config?.target?.selectorGuids || []).length > 0) return e;
        let r = t?.config?.target?.pluginElement;
        return r ? KO(r) : null;
      },
      tx = (e, { PLUGIN_RIVE: t }, n) => {
        let r = YO(),
          i = r.getInstance(e),
          o = r.rive.StateMachineInputType,
          { name: s, inputs: a = {} } = n.config.value || {};
        function u(c) {
          if (c.loaded) g();
          else {
            let p = () => {
              g(), c?.off("load", p);
            };
            c?.on("load", p);
          }
          function g() {
            let p = c.stateMachineInputs(s);
            if (p != null) {
              if ((c.isPlaying || c.play(s, !1), Zi in a || Ji in a)) {
                let d = c.layout,
                  h = a[Zi] ?? d.fit,
                  v = a[Ji] ?? d.alignment;
                (h !== d.fit || v !== d.alignment) &&
                  (c.layout = d.copyWith({ fit: h, alignment: v }));
              }
              for (let d in a) {
                if (d === Zi || d === Ji) continue;
                let h = p.find((v) => v.name === d);
                if (h != null)
                  switch (h.type) {
                    case o.Boolean: {
                      if (a[d] != null) {
                        let v = !!a[d];
                        h.value = v;
                      }
                      break;
                    }
                    case o.Number: {
                      let v = t[d];
                      v != null && (h.value = v);
                      break;
                    }
                    case o.Trigger: {
                      a[d] && h.fire();
                      break;
                    }
                  }
              }
            }
          }
        }
        i?.rive ? u(i.rive) : r.setLoadHandler(e, u);
      },
      nx = (e, t) => null;
  });
  var no = f((to) => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    Object.defineProperty(to, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return rx;
      },
    });
    var ld = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function rx(e) {
      let t,
        n,
        r,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof ld[o] == "string" ? ld[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (n = parseInt(u[1] + u[1], 16)),
            (r = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (n = parseInt(u.substring(2, 4), 16)),
            (r = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          c = parseFloat(u[0]),
          g = parseFloat(u[1].replace("%", "")) / 100,
          p = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let d = (1 - Math.abs(2 * p - 1)) * g,
          h = d * (1 - Math.abs(((c / 60) % 2) - 1)),
          v = p - d / 2,
          m,
          T,
          y;
        c >= 0 && c < 60
          ? ((m = d), (T = h), (y = 0))
          : c >= 60 && c < 120
          ? ((m = h), (T = d), (y = 0))
          : c >= 120 && c < 180
          ? ((m = 0), (T = d), (y = h))
          : c >= 180 && c < 240
          ? ((m = 0), (T = h), (y = d))
          : c >= 240 && c < 300
          ? ((m = h), (T = 0), (y = d))
          : ((m = d), (T = 0), (y = h)),
          (t = Math.round((m + v) * 255)),
          (n = Math.round((T + v) * 255)),
          (r = Math.round((y + v) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          c = parseFloat(u[0]),
          g = parseFloat(u[1].replace("%", "")) / 100,
          p = parseFloat(u[2].replace("%", "")) / 100,
          d = (1 - Math.abs(2 * p - 1)) * g,
          h = d * (1 - Math.abs(((c / 60) % 2) - 1)),
          v = p - d / 2,
          m,
          T,
          y;
        c >= 0 && c < 60
          ? ((m = d), (T = h), (y = 0))
          : c >= 60 && c < 120
          ? ((m = h), (T = d), (y = 0))
          : c >= 120 && c < 180
          ? ((m = 0), (T = d), (y = h))
          : c >= 180 && c < 240
          ? ((m = 0), (T = h), (y = d))
          : c >= 240 && c < 300
          ? ((m = h), (T = 0), (y = d))
          : ((m = d), (T = 0), (y = h)),
          (t = Math.round((m + v) * 255)),
          (n = Math.round((T + v) * 255)),
          (r = Math.round((y + v) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: n, blue: r, alpha: i };
    }
  });
  var fd = f((ro) => {
    "use strict";
    Object.defineProperty(ro, "__esModule", { value: !0 });
    function ix(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    ix(ro, {
      clearPlugin: function () {
        return px;
      },
      createPluginInstance: function () {
        return lx;
      },
      getPluginConfig: function () {
        return ax;
      },
      getPluginDestination: function () {
        return cx;
      },
      getPluginDuration: function () {
        return sx;
      },
      getPluginOrigin: function () {
        return ux;
      },
      renderPlugin: function () {
        return dx;
      },
    });
    var ox = no(),
      ax = (e, t) => e.value[t],
      sx = () => null,
      ux = (e, t) => {
        if (e) return e;
        let n = t.config.value,
          r = t.config.target.objectId,
          i = getComputedStyle(document.documentElement).getPropertyValue(r);
        if (n.size != null) return { size: parseInt(i, 10) };
        if (n.unit === "%" || n.unit === "-") return { size: parseFloat(i) };
        if (n.red != null && n.green != null && n.blue != null)
          return (0, ox.normalizeColor)(i);
      },
      cx = (e) => e.value,
      lx = () => null,
      fx = {
        color: {
          match: ({ red: e, green: t, blue: n, alpha: r }) =>
            [e, t, n, r].every((i) => i != null),
          getValue: ({ red: e, green: t, blue: n, alpha: r }) =>
            `rgba(${e}, ${t}, ${n}, ${r})`,
        },
        size: {
          match: ({ size: e }) => e != null,
          getValue: ({ size: e }, t) => {
            switch (t) {
              case "-":
                return e;
              default:
                return `${e}${t}`;
            }
          },
        },
      },
      dx = (e, t, n) => {
        let {
            target: { objectId: r },
            value: { unit: i },
          } = n.config,
          o = t.PLUGIN_VARIABLE,
          s = Object.values(fx).find((a) => a.match(o, i));
        s && document.documentElement.style.setProperty(r, s.getValue(o, i));
      },
      px = (e, t) => {
        let n = t.config.target.objectId;
        document.documentElement.style.removeProperty(n);
      };
  });
  var pd = f((io) => {
    "use strict";
    Object.defineProperty(io, "__esModule", { value: !0 });
    Object.defineProperty(io, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return mx;
      },
    });
    var lr = (Re(), He(Es)),
      gx = fr(ad()),
      hx = fr(ud()),
      Ex = fr(cd()),
      yx = fr(fd());
    function dd(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (dd = function (r) {
        return r ? n : t;
      })(e);
    }
    function fr(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = dd(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var mx = new Map([
      [lr.ActionTypeConsts.PLUGIN_LOTTIE, { ...gx }],
      [lr.ActionTypeConsts.PLUGIN_SPLINE, { ...hx }],
      [lr.ActionTypeConsts.PLUGIN_RIVE, { ...Ex }],
      [lr.ActionTypeConsts.PLUGIN_VARIABLE, { ...yx }],
    ]);
  });
  var gd = {};
  xe(gd, {
    clearPlugin: () => lo,
    createPluginInstance: () => _x,
    getPluginConfig: () => ao,
    getPluginDestination: () => uo,
    getPluginDuration: () => vx,
    getPluginOrigin: () => so,
    isPluginType: () => gt,
    renderPlugin: () => co,
  });
  function gt(e) {
    return oo.pluginMethodMap.has(e);
  }
  var oo,
    ht,
    ao,
    so,
    vx,
    uo,
    _x,
    co,
    lo,
    fo = fe(() => {
      "use strict";
      sr();
      oo = ae(pd());
      (ht = (e) => (t) => {
        if (!Xe) return () => null;
        let n = oo.pluginMethodMap.get(t);
        if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
        let r = n[e];
        if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
        return r;
      }),
        (ao = ht("getPluginConfig")),
        (so = ht("getPluginOrigin")),
        (vx = ht("getPluginDuration")),
        (uo = ht("getPluginDestination")),
        (_x = ht("createPluginInstance")),
        (co = ht("renderPlugin")),
        (lo = ht("clearPlugin"));
    });
  var Ed = f((M1, hd) => {
    function Ix(e, t) {
      return e == null || e !== e ? t : e;
    }
    hd.exports = Ix;
  });
  var md = f((D1, yd) => {
    function Tx(e, t, n, r) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (r && o && (n = e[++i]); ++i < o; ) n = t(n, e[i], i, e);
      return n;
    }
    yd.exports = Tx;
  });
  var _d = f((F1, vd) => {
    function bx(e) {
      return function (t, n, r) {
        for (var i = -1, o = Object(t), s = r(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (n(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    vd.exports = bx;
  });
  var Td = f((q1, Id) => {
    var Ax = _d(),
      Sx = Ax();
    Id.exports = Sx;
  });
  var po = f((G1, bd) => {
    var wx = Td(),
      Ox = un();
    function xx(e, t) {
      return e && wx(e, t, Ox);
    }
    bd.exports = xx;
  });
  var Sd = f((V1, Ad) => {
    var Rx = dt();
    function Cx(e, t) {
      return function (n, r) {
        if (n == null) return n;
        if (!Rx(n)) return e(n, r);
        for (
          var i = n.length, o = t ? i : -1, s = Object(n);
          (t ? o-- : ++o < i) && r(s[o], o, s) !== !1;

        );
        return n;
      };
    }
    Ad.exports = Cx;
  });
  var go = f((X1, wd) => {
    var Px = po(),
      Lx = Sd(),
      Nx = Lx(Px);
    wd.exports = Nx;
  });
  var xd = f((U1, Od) => {
    function Mx(e, t, n, r, i) {
      return (
        i(e, function (o, s, a) {
          n = r ? ((r = !1), o) : t(n, o, s, a);
        }),
        n
      );
    }
    Od.exports = Mx;
  });
  var Cd = f((k1, Rd) => {
    var Dx = md(),
      Fx = go(),
      qx = ut(),
      Gx = xd(),
      Vx = ve();
    function Xx(e, t, n) {
      var r = Vx(e) ? Dx : Gx,
        i = arguments.length < 3;
      return r(e, qx(t, 4), n, i, Fx);
    }
    Rd.exports = Xx;
  });
  var Ld = f((B1, Pd) => {
    var Ux = ki(),
      kx = ut(),
      Bx = Bi(),
      Hx = Math.max,
      Wx = Math.min;
    function zx(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = r - 1;
      return (
        n !== void 0 &&
          ((i = Bx(n)), (i = n < 0 ? Hx(r + i, 0) : Wx(i, r - 1))),
        Ux(e, kx(t, 3), i, !0)
      );
    }
    Pd.exports = zx;
  });
  var Md = f((H1, Nd) => {
    var jx = Ui(),
      Kx = Ld(),
      Yx = jx(Kx);
    Nd.exports = Yx;
  });
  function Dd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function $x(e, t) {
    if (Dd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let i = 0; i < n.length; i++)
      if (!Object.hasOwn(t, n[i]) || !Dd(e[n[i]], t[n[i]])) return !1;
    return !0;
  }
  var ho,
    Fd = fe(() => {
      "use strict";
      ho = $x;
    });
  var ep = {};
  xe(ep, {
    cleanupHTMLElement: () => jR,
    clearAllStyles: () => zR,
    clearObjectCache: () => pR,
    getActionListProgress: () => YR,
    getAffectedElements: () => _o,
    getComputedStyle: () => IR,
    getDestinationValues: () => xR,
    getElementId: () => yR,
    getInstanceId: () => hR,
    getInstanceOrigin: () => AR,
    getItemConfigByKey: () => OR,
    getMaxDurationItemIndex: () => Jd,
    getNamespacedParameterId: () => ZR,
    getRenderType: () => $d,
    getStyleProp: () => RR,
    mediaQueriesEqual: () => eC,
    observeStore: () => _R,
    reduceListToGroup: () => $R,
    reifyState: () => mR,
    renderHTMLElement: () => CR,
    shallowEqual: () => ho,
    shouldAllowMediaQuery: () => JR,
    shouldNamespaceEventParameter: () => QR,
    stringifyTarget: () => tC,
  });
  function pR() {
    dr.clear();
  }
  function hR() {
    return "i" + gR++;
  }
  function yR(e, t) {
    for (let n in e) {
      let r = e[n];
      if (r && r.ref === t) return r.id;
    }
    return "e" + ER++;
  }
  function mR({ events: e, actionLists: t, site: n } = {}) {
    let r = (0, Er.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = n && n.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: r,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function _R({ store: e, select: t, onChange: n, comparator: r = vR }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let c = t(i());
      if (c == null) {
        s();
        return;
      }
      r(c, a) || ((a = c), n(a, e));
    }
    return s;
  }
  function Vd(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function _o({
    config: e,
    event: t,
    eventTarget: n,
    elementRoot: r,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (N, I) =>
          N.concat(
            _o({
              config: { target: I },
              event: t,
              eventTarget: n,
              elementRoot: r,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: c,
        getSiblingElements: g,
        matchSelector: p,
        elementContains: d,
        isSiblingNode: h,
      } = i,
      { target: v } = e;
    if (!v) return [];
    let {
      id: m,
      objectId: T,
      selector: y,
      selectorGuids: S,
      appliesTo: A,
      useEventTarget: R,
    } = Vd(v);
    if (T) return [dr.has(T) ? dr.get(T) : dr.set(T, {}).get(T)];
    if (A === pi.PAGE) {
      let N = s(m);
      return N ? [N] : [];
    }
    let O = (t?.action?.config?.affectedElements ?? {})[m || y] || {},
      F = !!(O.id || O.selector),
      V,
      X,
      k,
      Z = t && a(Vd(t.target));
    if (
      (F
        ? ((V = O.limitAffectedElements), (X = Z), (k = a(O)))
        : (X = k = a({ id: m, selector: y, selectorGuids: S })),
      t && R)
    ) {
      let N = n && (k || R === !0) ? [n] : u(Z);
      if (k) {
        if (R === lR) return u(k).filter((I) => N.some((L) => d(I, L)));
        if (R === qd) return u(k).filter((I) => N.some((L) => d(L, I)));
        if (R === Gd) return u(k).filter((I) => N.some((L) => h(L, I)));
      }
      return N;
    }
    return X == null || k == null
      ? []
      : Xe && r
      ? u(k).filter((N) => r.contains(N))
      : V === qd
      ? u(X, k)
      : V === cR
      ? c(u(X)).filter(p(k))
      : V === Gd
      ? g(u(X)).filter(p(k))
      : u(k);
  }
  function IR({ element: e, actionItem: t }) {
    if (!Xe) return {};
    let { actionTypeId: n } = t;
    switch (n) {
      case Vt:
      case Xt:
      case Ut:
      case kt:
      case mr:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function AR(e, t = {}, n = {}, r, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = r;
    if (gt(s)) return so(s)(t[s], r);
    switch (r.actionTypeId) {
      case Ft:
      case qt:
      case Gt:
      case mn:
        return t[r.actionTypeId] || Io[r.actionTypeId];
      case vn:
        return TR(t[r.actionTypeId], r.config.filters);
      case _n:
        return bR(t[r.actionTypeId], r.config.fontVariations);
      case jd:
        return { value: (0, tt.default)(parseFloat(o(e, gr)), 1) };
      case Vt: {
        let a = o(e, $e),
          u = o(e, Qe),
          c,
          g;
        return (
          r.config.widthUnit === lt
            ? (c = Xd.test(a) ? parseFloat(a) : parseFloat(n.width))
            : (c = (0, tt.default)(parseFloat(a), parseFloat(n.width))),
          r.config.heightUnit === lt
            ? (g = Xd.test(u) ? parseFloat(u) : parseFloat(n.height))
            : (g = (0, tt.default)(parseFloat(u), parseFloat(n.height))),
          { widthValue: c, heightValue: g }
        );
      }
      case Xt:
      case Ut:
      case kt:
        return BR({
          element: e,
          actionTypeId: r.actionTypeId,
          computedStyle: n,
          getStyle: o,
        });
      case mr:
        return { value: (0, tt.default)(o(e, hr), n.display) };
      case dR:
        return t[r.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function xR({ element: e, actionItem: t, elementApi: n }) {
    if (gt(t.actionTypeId)) return uo(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case Ft:
      case qt:
      case Gt:
      case mn: {
        let { xValue: r, yValue: i, zValue: o } = t.config;
        return { xValue: r, yValue: i, zValue: o };
      }
      case Vt: {
        let { getStyle: r, setStyle: i, getProperty: o } = n,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: c } = t.config;
        if (!Xe) return { widthValue: u, heightValue: c };
        if (s === lt) {
          let g = r(e, $e);
          i(e, $e, ""), (u = o(e, "offsetWidth")), i(e, $e, g);
        }
        if (a === lt) {
          let g = r(e, Qe);
          i(e, Qe, ""), (c = o(e, "offsetHeight")), i(e, Qe, g);
        }
        return { widthValue: u, heightValue: c };
      }
      case Xt:
      case Ut:
      case kt: {
        let {
          rValue: r,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = n,
            c = u(e, a),
            g = (0, Bd.normalizeColor)(c);
          return {
            rValue: g.red,
            gValue: g.green,
            bValue: g.blue,
            aValue: g.alpha,
          };
        }
        return { rValue: r, gValue: i, bValue: o, aValue: s };
      }
      case vn:
        return t.config.filters.reduce(SR, {});
      case _n:
        return t.config.fontVariations.reduce(wR, {});
      default: {
        let { value: r } = t.config;
        return { value: r };
      }
    }
  }
  function $d(e) {
    if (/^TRANSFORM_/.test(e)) return Wd;
    if (/^STYLE_/.test(e)) return mo;
    if (/^GENERAL_/.test(e)) return yo;
    if (/^PLUGIN_/.test(e)) return zd;
  }
  function RR(e, t) {
    return e === mo ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function CR(e, t, n, r, i, o, s, a, u) {
    switch (a) {
      case Wd:
        return DR(e, t, n, i, s);
      case mo:
        return HR(e, t, n, i, o, s);
      case yo:
        return WR(e, i, s);
      case zd: {
        let { actionTypeId: c } = i;
        if (gt(c)) return co(c)(u, t, i);
      }
    }
  }
  function DR(e, t, n, r, i) {
    let o = MR.map((a) => {
        let u = Io[a],
          {
            xValue: c = u.xValue,
            yValue: g = u.yValue,
            zValue: p = u.zValue,
            xUnit: d = "",
            yUnit: h = "",
            zUnit: v = "",
          } = t[a] || {};
        switch (a) {
          case Ft:
            return `${Jx}(${c}${d}, ${g}${h}, ${p}${v})`;
          case qt:
            return `${eR}(${c}${d}, ${g}${h}, ${p}${v})`;
          case Gt:
            return `${tR}(${c}${d}) ${nR}(${g}${h}) ${rR}(${p}${v})`;
          case mn:
            return `${iR}(${c}${d}, ${g}${h})`;
          default:
            return "";
        }
      }).join(" "),
      { setStyle: s } = i;
    Et(e, ct, i), s(e, ct, o), GR(r, n) && s(e, ar, oR);
  }
  function FR(e, t, n, r) {
    let i = (0, Er.default)(t, (s, a, u) => `${s} ${u}(${a}${NR(u, n)})`, ""),
      { setStyle: o } = r;
    Et(e, hn, r), o(e, hn, i);
  }
  function qR(e, t, n, r) {
    let i = (0, Er.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = r;
    Et(e, En, r), o(e, En, i);
  }
  function GR({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
    return (
      (e === Ft && r !== void 0) ||
      (e === qt && r !== void 0) ||
      (e === Gt && (t !== void 0 || n !== void 0))
    );
  }
  function kR(e, t) {
    let n = e.exec(t);
    return n ? n[1] : "";
  }
  function BR({ element: e, actionTypeId: t, computedStyle: n, getStyle: r }) {
    let i = vo[t],
      o = r(e, i),
      s = XR.test(o) ? o : n[i],
      a = kR(UR, s).split(yn);
    return {
      rValue: (0, tt.default)(parseInt(a[0], 10), 255),
      gValue: (0, tt.default)(parseInt(a[1], 10), 255),
      bValue: (0, tt.default)(parseInt(a[2], 10), 255),
      aValue: (0, tt.default)(parseFloat(a[3]), 1),
    };
  }
  function HR(e, t, n, r, i, o) {
    let { setStyle: s } = o;
    switch (r.actionTypeId) {
      case Vt: {
        let { widthUnit: a = "", heightUnit: u = "" } = r.config,
          { widthValue: c, heightValue: g } = n;
        c !== void 0 && (a === lt && (a = "px"), Et(e, $e, o), s(e, $e, c + a)),
          g !== void 0 &&
            (u === lt && (u = "px"), Et(e, Qe, o), s(e, Qe, g + u));
        break;
      }
      case vn: {
        FR(e, n, r.config, o);
        break;
      }
      case _n: {
        qR(e, n, r.config, o);
        break;
      }
      case Xt:
      case Ut:
      case kt: {
        let a = vo[r.actionTypeId],
          u = Math.round(n.rValue),
          c = Math.round(n.gValue),
          g = Math.round(n.bValue),
          p = n.aValue;
        Et(e, a, o),
          s(e, a, p >= 1 ? `rgb(${u},${c},${g})` : `rgba(${u},${c},${g},${p})`);
        break;
      }
      default: {
        let { unit: a = "" } = r.config;
        Et(e, i, o), s(e, i, n.value + a);
        break;
      }
    }
  }
  function WR(e, t, n) {
    let { setStyle: r } = n;
    switch (t.actionTypeId) {
      case mr: {
        let { value: i } = t.config;
        i === aR && Xe ? r(e, hr, Wi) : r(e, hr, i);
        return;
      }
    }
  }
  function Et(e, t, n) {
    if (!Xe) return;
    let r = Yd[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Dt);
    if (!s) {
      o(e, Dt, r);
      return;
    }
    let a = s.split(yn).map(Kd);
    a.indexOf(r) === -1 && o(e, Dt, a.concat(r).join(yn));
  }
  function Qd(e, t, n) {
    if (!Xe) return;
    let r = Yd[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Dt);
    !s ||
      s.indexOf(r) === -1 ||
      o(
        e,
        Dt,
        s
          .split(yn)
          .map(Kd)
          .filter((a) => a !== r)
          .join(yn)
      );
  }
  function zR({ store: e, elementApi: t }) {
    let { ixData: n } = e.getState(),
      { events: r = {}, actionLists: i = {} } = n;
    Object.keys(r).forEach((o) => {
      let s = r[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        c = i[u];
      c && Ud({ actionList: c, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Ud({ actionList: i[o], elementApi: t });
      });
  }
  function Ud({ actionList: e = {}, event: t, elementApi: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e;
    r &&
      r.forEach((o) => {
        kd({ actionGroup: o, event: t, elementApi: n });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            kd({ actionGroup: a, event: t, elementApi: n });
          });
        });
  }
  function kd({ actionGroup: e, event: t, elementApi: n }) {
    let { actionItems: r } = e;
    r.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      gt(o)
        ? (a = (u) => lo(o)(u, i))
        : (a = Zd({ effect: KR, actionTypeId: o, elementApi: n })),
        _o({ config: s, event: t, elementApi: n }).forEach(a);
    });
  }
  function jR(e, t, n) {
    let { setStyle: r, getStyle: i } = n,
      { actionTypeId: o } = t;
    if (o === Vt) {
      let { config: s } = t;
      s.widthUnit === lt && r(e, $e, ""), s.heightUnit === lt && r(e, Qe, "");
    }
    i(e, Dt) && Zd({ effect: Qd, actionTypeId: o, elementApi: n })(e);
  }
  function KR(e, t, n) {
    let { setStyle: r } = n;
    Qd(e, t, n), r(e, t, ""), t === ct && r(e, ar, "");
  }
  function Jd(e) {
    let t = 0,
      n = 0;
    return (
      e.forEach((r, i) => {
        let { config: o } = r,
          s = o.delay + o.duration;
        s >= t && ((t = s), (n = i));
      }),
      n
    );
  }
  function YR(e, t) {
    let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      n.forEach((u, c) => {
        if (r && c === 0) return;
        let { actionItems: g } = u,
          p = g[Jd(g)],
          { config: d, actionTypeId: h } = p;
        i.id === p.id && (a = s + o);
        let v = $d(h) === yo ? 0 : d.duration;
        s += d.delay + v;
      }),
      s > 0 ? gn(a / s) : 0
    );
  }
  function $R({ actionList: e, actionItemId: t, rawData: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, yr.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      r && r.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: c }) => c.some(s));
        }),
      (0, yr.setIn)(n, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function QR(e, { basedOn: t }) {
    return (
      (e === Ve.SCROLLING_IN_VIEW && (t === Ke.ELEMENT || t == null)) ||
      (e === Ve.MOUSE_MOVE && t === Ke.ELEMENT)
    );
  }
  function ZR(e, t) {
    return e + fR + t;
  }
  function JR(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function eC(e, t) {
    return ho(e && e.sort(), t && t.sort());
  }
  function tC(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Eo + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
    return t + Eo + n + Eo + r;
  }
  var tt,
    Er,
    pr,
    yr,
    Bd,
    Qx,
    Zx,
    Jx,
    eR,
    tR,
    nR,
    rR,
    iR,
    oR,
    aR,
    gr,
    hn,
    En,
    $e,
    Qe,
    Hd,
    sR,
    uR,
    qd,
    cR,
    Gd,
    lR,
    hr,
    Dt,
    lt,
    yn,
    fR,
    Eo,
    Wd,
    yo,
    mo,
    zd,
    Ft,
    qt,
    Gt,
    mn,
    jd,
    vn,
    _n,
    Vt,
    Xt,
    Ut,
    kt,
    mr,
    dR,
    Kd,
    vo,
    Yd,
    dr,
    gR,
    ER,
    vR,
    Xd,
    TR,
    bR,
    SR,
    wR,
    OR,
    Io,
    PR,
    LR,
    NR,
    MR,
    VR,
    XR,
    UR,
    Zd,
    tp = fe(() => {
      "use strict";
      (tt = ae(Ed())), (Er = ae(Cd())), (pr = ae(Md())), (yr = ae(St()));
      Re();
      Fd();
      Ki();
      Bd = ae(no());
      fo();
      sr();
      ({
        BACKGROUND: Qx,
        TRANSFORM: Zx,
        TRANSLATE_3D: Jx,
        SCALE_3D: eR,
        ROTATE_X: tR,
        ROTATE_Y: nR,
        ROTATE_Z: rR,
        SKEW: iR,
        PRESERVE_3D: oR,
        FLEX: aR,
        OPACITY: gr,
        FILTER: hn,
        FONT_VARIATION_SETTINGS: En,
        WIDTH: $e,
        HEIGHT: Qe,
        BACKGROUND_COLOR: Hd,
        BORDER_COLOR: sR,
        COLOR: uR,
        CHILDREN: qd,
        IMMEDIATE_CHILDREN: cR,
        SIBLINGS: Gd,
        PARENT: lR,
        DISPLAY: hr,
        WILL_CHANGE: Dt,
        AUTO: lt,
        COMMA_DELIMITER: yn,
        COLON_DELIMITER: fR,
        BAR_DELIMITER: Eo,
        RENDER_TRANSFORM: Wd,
        RENDER_GENERAL: yo,
        RENDER_STYLE: mo,
        RENDER_PLUGIN: zd,
      } = _e),
        ({
          TRANSFORM_MOVE: Ft,
          TRANSFORM_SCALE: qt,
          TRANSFORM_ROTATE: Gt,
          TRANSFORM_SKEW: mn,
          STYLE_OPACITY: jd,
          STYLE_FILTER: vn,
          STYLE_FONT_VARIATION: _n,
          STYLE_SIZE: Vt,
          STYLE_BACKGROUND_COLOR: Xt,
          STYLE_BORDER: Ut,
          STYLE_TEXT_COLOR: kt,
          GENERAL_DISPLAY: mr,
          OBJECT_VALUE: dR,
        } = Ae),
        (Kd = (e) => e.trim()),
        (vo = Object.freeze({ [Xt]: Hd, [Ut]: sR, [kt]: uR })),
        (Yd = Object.freeze({
          [ct]: Zx,
          [Hd]: Qx,
          [gr]: gr,
          [hn]: hn,
          [$e]: $e,
          [Qe]: Qe,
          [En]: En,
        })),
        (dr = new Map());
      gR = 1;
      ER = 1;
      vR = (e, t) => e === t;
      (Xd = /px/),
        (TR = (e, t) =>
          t.reduce(
            (n, r) => (n[r.type] == null && (n[r.type] = PR[r.type]), n),
            e || {}
          )),
        (bR = (e, t) =>
          t.reduce(
            (n, r) => (
              n[r.type] == null &&
                (n[r.type] = LR[r.type] || r.defaultValue || 0),
              n
            ),
            e || {}
          ));
      (SR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (wR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (OR = (e, t, n) => {
          if (gt(e)) return ao(e)(n, t);
          switch (e) {
            case vn: {
              let r = (0, pr.default)(n.filters, ({ type: i }) => i === t);
              return r ? r.value : 0;
            }
            case _n: {
              let r = (0, pr.default)(
                n.fontVariations,
                ({ type: i }) => i === t
              );
              return r ? r.value : 0;
            }
            default:
              return n[t];
          }
        });
      (Io = {
        [Ft]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [qt]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Gt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [mn]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (PR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (LR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (NR = (e, t) => {
          let n = (0, pr.default)(t.filters, ({ type: r }) => r === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (MR = Object.keys(Io));
      (VR = "\\(([^)]+)\\)"), (XR = /^rgb/), (UR = RegExp(`rgba?${VR}`));
      Zd =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (r) => {
          switch (t) {
            case Ft:
            case qt:
            case Gt:
            case mn:
              e(r, ct, n);
              break;
            case vn:
              e(r, hn, n);
              break;
            case _n:
              e(r, En, n);
              break;
            case jd:
              e(r, gr, n);
              break;
            case Vt:
              e(r, $e, n), e(r, Qe, n);
              break;
            case Xt:
            case Ut:
            case kt:
              e(r, vo[t], n);
              break;
            case mr:
              e(r, hr, n);
              break;
          }
        };
    });
  var yt = f((To) => {
    "use strict";
    Object.defineProperty(To, "__esModule", { value: !0 });
    function nC(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    nC(To, {
      IX2BrowserSupport: function () {
        return rC;
      },
      IX2EasingUtils: function () {
        return oC;
      },
      IX2Easings: function () {
        return iC;
      },
      IX2ElementsReducer: function () {
        return aC;
      },
      IX2VanillaPlugins: function () {
        return sC;
      },
      IX2VanillaUtils: function () {
        return uC;
      },
    });
    var rC = Bt((sr(), He(Kf))),
      iC = Bt((ji(), He(pn))),
      oC = Bt((Ki(), He(td))),
      aC = Bt((od(), He(id))),
      sC = Bt((fo(), He(gd))),
      uC = Bt((tp(), He(ep)));
    function np(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (np = function (r) {
        return r ? n : t;
      })(e);
    }
    function Bt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = np(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
  });
  var _r,
    nt,
    cC,
    lC,
    fC,
    dC,
    pC,
    gC,
    vr,
    rp,
    hC,
    EC,
    bo,
    yC,
    mC,
    vC,
    _C,
    ip,
    op = fe(() => {
      "use strict";
      Re();
      (_r = ae(yt())),
        (nt = ae(St())),
        ({
          IX2_RAW_DATA_IMPORTED: cC,
          IX2_SESSION_STOPPED: lC,
          IX2_INSTANCE_ADDED: fC,
          IX2_INSTANCE_STARTED: dC,
          IX2_INSTANCE_REMOVED: pC,
          IX2_ANIMATION_FRAME_CHANGED: gC,
        } = ye),
        ({
          optimizeFloat: vr,
          applyEasing: rp,
          createBezierEasing: hC,
        } = _r.IX2EasingUtils),
        ({ RENDER_GENERAL: EC } = _e),
        ({
          getItemConfigByKey: bo,
          getRenderType: yC,
          getStyleProp: mC,
        } = _r.IX2VanillaUtils),
        (vC = (e, t) => {
          let {
              position: n,
              parameterId: r,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: c,
              skipMotion: g,
              skipToValue: p,
            } = e,
            { parameters: d } = t.payload,
            h = Math.max(1 - s, 0.01),
            v = d[r];
          v == null && ((h = 1), (v = a));
          let m = Math.max(v, 0) || 0,
            T = vr(m - n),
            y = g ? p : vr(n + T * h),
            S = y * 100;
          if (y === n && e.current) return e;
          let A, R, P, O;
          for (let V = 0, { length: X } = i; V < X; V++) {
            let { keyframe: k, actionItems: Z } = i[V];
            if ((V === 0 && (A = Z[0]), S >= k)) {
              A = Z[0];
              let N = i[V + 1],
                I = N && S !== k;
              (R = I ? N.actionItems[0] : null),
                I && ((P = k / 100), (O = (N.keyframe - k) / 100));
            }
          }
          let F = {};
          if (A && !R)
            for (let V = 0, { length: X } = o; V < X; V++) {
              let k = o[V];
              F[k] = bo(u, k, A.config);
            }
          else if (A && R && P !== void 0 && O !== void 0) {
            let V = (y - P) / O,
              X = A.config.easing,
              k = rp(X, V, c);
            for (let Z = 0, { length: N } = o; Z < N; Z++) {
              let I = o[Z],
                L = bo(u, I, A.config),
                te = (bo(u, I, R.config) - L) * k + L;
              F[I] = te;
            }
          }
          return (0, nt.merge)(e, { position: y, current: F });
        }),
        (_C = (e, t) => {
          let {
              active: n,
              origin: r,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: c,
              destinationKeys: g,
              pluginDuration: p,
              instanceDelay: d,
              customEasingFn: h,
              skipMotion: v,
            } = e,
            m = u.config.easing,
            { duration: T, delay: y } = u.config;
          p != null && (T = p),
            (y = d ?? y),
            s === EC ? (T = 0) : (o || v) && (T = y = 0);
          let { now: S } = t.payload;
          if (n && r) {
            let A = S - (i + y);
            if (a) {
              let V = S - i,
                X = T + y,
                k = vr(Math.min(Math.max(0, V / X), 1));
              e = (0, nt.set)(e, "verboseTimeElapsed", X * k);
            }
            if (A < 0) return e;
            let R = vr(Math.min(Math.max(0, A / T), 1)),
              P = rp(m, R, h),
              O = {},
              F = null;
            return (
              g.length &&
                (F = g.reduce((V, X) => {
                  let k = c[X],
                    Z = parseFloat(r[X]) || 0,
                    I = (parseFloat(k) - Z) * P + Z;
                  return (V[X] = I), V;
                }, {})),
              (O.current = F),
              (O.position = R),
              R === 1 && ((O.active = !1), (O.complete = !0)),
              (0, nt.merge)(e, O)
            );
          }
          return e;
        }),
        (ip = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case cC:
              return t.payload.ixInstances || Object.freeze({});
            case lC:
              return Object.freeze({});
            case fC: {
              let {
                  instanceId: n,
                  elementId: r,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: c,
                  isCarrier: g,
                  origin: p,
                  destination: d,
                  immediate: h,
                  verbose: v,
                  continuous: m,
                  parameterId: T,
                  actionGroups: y,
                  smoothing: S,
                  restingValue: A,
                  pluginInstance: R,
                  pluginDuration: P,
                  instanceDelay: O,
                  skipMotion: F,
                  skipToValue: V,
                } = t.payload,
                { actionTypeId: X } = i,
                k = yC(X),
                Z = mC(k, X),
                N = Object.keys(d).filter(
                  (L) => d[L] != null && typeof d[L] != "string"
                ),
                { easing: I } = i.config;
              return (0, nt.set)(e, n, {
                id: n,
                elementId: r,
                active: !1,
                position: 0,
                start: 0,
                origin: p,
                destination: d,
                destinationKeys: N,
                immediate: h,
                verbose: v,
                current: null,
                actionItem: i,
                actionTypeId: X,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: c,
                renderType: k,
                isCarrier: g,
                styleProp: Z,
                continuous: m,
                parameterId: T,
                actionGroups: y,
                smoothing: S,
                restingValue: A,
                pluginInstance: R,
                pluginDuration: P,
                instanceDelay: O,
                skipMotion: F,
                skipToValue: V,
                customEasingFn:
                  Array.isArray(I) && I.length === 4 ? hC(I) : void 0,
              });
            }
            case dC: {
              let { instanceId: n, time: r } = t.payload;
              return (0, nt.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: r,
              });
            }
            case pC: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let r = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== n && (r[a] = e[a]);
              }
              return r;
            }
            case gC: {
              let n = e,
                r = Object.keys(e),
                { length: i } = r;
              for (let o = 0; o < i; o++) {
                let s = r[o],
                  a = e[s],
                  u = a.continuous ? vC : _C;
                n = (0, nt.set)(n, s, u(a, t));
              }
              return n;
            }
            default:
              return e;
          }
        });
    });
  var IC,
    TC,
    bC,
    ap,
    sp = fe(() => {
      "use strict";
      Re();
      ({
        IX2_RAW_DATA_IMPORTED: IC,
        IX2_SESSION_STOPPED: TC,
        IX2_PARAMETER_CHANGED: bC,
      } = ye),
        (ap = (e = {}, t) => {
          switch (t.type) {
            case IC:
              return t.payload.ixParameters || {};
            case TC:
              return {};
            case bC: {
              let { key: n, value: r } = t.payload;
              return (e[n] = r), e;
            }
            default:
              return e;
          }
        });
    });
  var lp = {};
  xe(lp, { default: () => SC });
  var up,
    cp,
    AC,
    SC,
    fp = fe(() => {
      "use strict";
      up = ae(di());
      ms();
      Vs();
      ks();
      cp = ae(yt());
      op();
      sp();
      ({ ixElements: AC } = cp.IX2ElementsReducer),
        (SC = (0, up.combineReducers)({
          ixData: ys,
          ixRequest: Gs,
          ixSession: Us,
          ixElements: AC,
          ixInstances: ip,
          ixParameters: ap,
        }));
    });
  var pp = f((uG, dp) => {
    var wC = at(),
      OC = ve(),
      xC = Je(),
      RC = "[object String]";
    function CC(e) {
      return typeof e == "string" || (!OC(e) && xC(e) && wC(e) == RC);
    }
    dp.exports = CC;
  });
  var hp = f((cG, gp) => {
    var PC = Xi(),
      LC = PC("length");
    gp.exports = LC;
  });
  var yp = f((lG, Ep) => {
    var NC = "\\ud800-\\udfff",
      MC = "\\u0300-\\u036f",
      DC = "\\ufe20-\\ufe2f",
      FC = "\\u20d0-\\u20ff",
      qC = MC + DC + FC,
      GC = "\\ufe0e\\ufe0f",
      VC = "\\u200d",
      XC = RegExp("[" + VC + NC + qC + GC + "]");
    function UC(e) {
      return XC.test(e);
    }
    Ep.exports = UC;
  });
  var wp = f((fG, Sp) => {
    var vp = "\\ud800-\\udfff",
      kC = "\\u0300-\\u036f",
      BC = "\\ufe20-\\ufe2f",
      HC = "\\u20d0-\\u20ff",
      WC = kC + BC + HC,
      zC = "\\ufe0e\\ufe0f",
      jC = "[" + vp + "]",
      Ao = "[" + WC + "]",
      So = "\\ud83c[\\udffb-\\udfff]",
      KC = "(?:" + Ao + "|" + So + ")",
      _p = "[^" + vp + "]",
      Ip = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Tp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      YC = "\\u200d",
      bp = KC + "?",
      Ap = "[" + zC + "]?",
      $C = "(?:" + YC + "(?:" + [_p, Ip, Tp].join("|") + ")" + Ap + bp + ")*",
      QC = Ap + bp + $C,
      ZC = "(?:" + [_p + Ao + "?", Ao, Ip, Tp, jC].join("|") + ")",
      mp = RegExp(So + "(?=" + So + ")|" + ZC + QC, "g");
    function JC(e) {
      for (var t = (mp.lastIndex = 0); mp.test(e); ) ++t;
      return t;
    }
    Sp.exports = JC;
  });
  var xp = f((dG, Op) => {
    var eP = hp(),
      tP = yp(),
      nP = wp();
    function rP(e) {
      return tP(e) ? nP(e) : eP(e);
    }
    Op.exports = rP;
  });
  var Cp = f((pG, Rp) => {
    var iP = Qn(),
      oP = Zn(),
      aP = dt(),
      sP = pp(),
      uP = xp(),
      cP = "[object Map]",
      lP = "[object Set]";
    function fP(e) {
      if (e == null) return 0;
      if (aP(e)) return sP(e) ? uP(e) : e.length;
      var t = oP(e);
      return t == cP || t == lP ? e.size : iP(e).length;
    }
    Rp.exports = fP;
  });
  var Lp = f((gG, Pp) => {
    var dP = "Expected a function";
    function pP(e) {
      if (typeof e != "function") throw new TypeError(dP);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Pp.exports = pP;
  });
  var wo = f((hG, Np) => {
    var gP = st(),
      hP = (function () {
        try {
          var e = gP(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Np.exports = hP;
  });
  var Oo = f((EG, Dp) => {
    var Mp = wo();
    function EP(e, t, n) {
      t == "__proto__" && Mp
        ? Mp(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (e[t] = n);
    }
    Dp.exports = EP;
  });
  var qp = f((yG, Fp) => {
    var yP = Oo(),
      mP = Un(),
      vP = Object.prototype,
      _P = vP.hasOwnProperty;
    function IP(e, t, n) {
      var r = e[t];
      (!(_P.call(e, t) && mP(r, n)) || (n === void 0 && !(t in e))) &&
        yP(e, t, n);
    }
    Fp.exports = IP;
  });
  var Xp = f((mG, Vp) => {
    var TP = qp(),
      bP = ln(),
      AP = jn(),
      Gp = Ye(),
      SP = Nt();
    function wP(e, t, n, r) {
      if (!Gp(e)) return e;
      t = bP(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = SP(t[i]),
          c = n;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var g = a[u];
          (c = r ? r(g, u, a) : void 0),
            c === void 0 && (c = Gp(g) ? g : AP(t[i + 1]) ? [] : {});
        }
        TP(a, u, c), (a = a[u]);
      }
      return e;
    }
    Vp.exports = wP;
  });
  var kp = f((vG, Up) => {
    var OP = tr(),
      xP = Xp(),
      RP = ln();
    function CP(e, t, n) {
      for (var r = -1, i = t.length, o = {}; ++r < i; ) {
        var s = t[r],
          a = OP(e, s);
        n(a, s) && xP(o, RP(s, e), a);
      }
      return o;
    }
    Up.exports = CP;
  });
  var Hp = f((_G, Bp) => {
    var PP = Wn(),
      LP = Jr(),
      NP = Si(),
      MP = Ai(),
      DP = Object.getOwnPropertySymbols,
      FP = DP
        ? function (e) {
            for (var t = []; e; ) PP(t, NP(e)), (e = LP(e));
            return t;
          }
        : MP;
    Bp.exports = FP;
  });
  var zp = f((IG, Wp) => {
    function qP(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    Wp.exports = qP;
  });
  var Kp = f((TG, jp) => {
    var GP = Ye(),
      VP = $n(),
      XP = zp(),
      UP = Object.prototype,
      kP = UP.hasOwnProperty;
    function BP(e) {
      if (!GP(e)) return XP(e);
      var t = VP(e),
        n = [];
      for (var r in e)
        (r == "constructor" && (t || !kP.call(e, r))) || n.push(r);
      return n;
    }
    jp.exports = BP;
  });
  var $p = f((bG, Yp) => {
    var HP = Oi(),
      WP = Kp(),
      zP = dt();
    function jP(e) {
      return zP(e) ? HP(e, !0) : WP(e);
    }
    Yp.exports = jP;
  });
  var Zp = f((AG, Qp) => {
    var KP = bi(),
      YP = Hp(),
      $P = $p();
    function QP(e) {
      return KP(e, $P, YP);
    }
    Qp.exports = QP;
  });
  var eg = f((SG, Jp) => {
    var ZP = Vi(),
      JP = ut(),
      eL = kp(),
      tL = Zp();
    function nL(e, t) {
      if (e == null) return {};
      var n = ZP(tL(e), function (r) {
        return [r];
      });
      return (
        (t = JP(t)),
        eL(e, n, function (r, i) {
          return t(r, i[0]);
        })
      );
    }
    Jp.exports = nL;
  });
  var ng = f((wG, tg) => {
    var rL = ut(),
      iL = Lp(),
      oL = eg();
    function aL(e, t) {
      return oL(e, iL(rL(t)));
    }
    tg.exports = aL;
  });
  var ig = f((OG, rg) => {
    var sL = Qn(),
      uL = Zn(),
      cL = rn(),
      lL = ve(),
      fL = dt(),
      dL = zn(),
      pL = $n(),
      gL = Yn(),
      hL = "[object Map]",
      EL = "[object Set]",
      yL = Object.prototype,
      mL = yL.hasOwnProperty;
    function vL(e) {
      if (e == null) return !0;
      if (
        fL(e) &&
        (lL(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          dL(e) ||
          gL(e) ||
          cL(e))
      )
        return !e.length;
      var t = uL(e);
      if (t == hL || t == EL) return !e.size;
      if (pL(e)) return !sL(e).length;
      for (var n in e) if (mL.call(e, n)) return !1;
      return !0;
    }
    rg.exports = vL;
  });
  var ag = f((xG, og) => {
    var _L = Oo(),
      IL = po(),
      TL = ut();
    function bL(e, t) {
      var n = {};
      return (
        (t = TL(t, 3)),
        IL(e, function (r, i, o) {
          _L(n, i, t(r, i, o));
        }),
        n
      );
    }
    og.exports = bL;
  });
  var ug = f((RG, sg) => {
    function AL(e, t) {
      for (
        var n = -1, r = e == null ? 0 : e.length;
        ++n < r && t(e[n], n, e) !== !1;

      );
      return e;
    }
    sg.exports = AL;
  });
  var lg = f((CG, cg) => {
    var SL = rr();
    function wL(e) {
      return typeof e == "function" ? e : SL;
    }
    cg.exports = wL;
  });
  var dg = f((PG, fg) => {
    var OL = ug(),
      xL = go(),
      RL = lg(),
      CL = ve();
    function PL(e, t) {
      var n = CL(e) ? OL : xL;
      return n(e, RL(t));
    }
    fg.exports = PL;
  });
  var gg = f((LG, pg) => {
    var LL = Ge(),
      NL = function () {
        return LL.Date.now();
      };
    pg.exports = NL;
  });
  var yg = f((NG, Eg) => {
    var ML = Ye(),
      xo = gg(),
      hg = ir(),
      DL = "Expected a function",
      FL = Math.max,
      qL = Math.min;
    function GL(e, t, n) {
      var r,
        i,
        o,
        s,
        a,
        u,
        c = 0,
        g = !1,
        p = !1,
        d = !0;
      if (typeof e != "function") throw new TypeError(DL);
      (t = hg(t) || 0),
        ML(n) &&
          ((g = !!n.leading),
          (p = "maxWait" in n),
          (o = p ? FL(hg(n.maxWait) || 0, t) : o),
          (d = "trailing" in n ? !!n.trailing : d));
      function h(O) {
        var F = r,
          V = i;
        return (r = i = void 0), (c = O), (s = e.apply(V, F)), s;
      }
      function v(O) {
        return (c = O), (a = setTimeout(y, t)), g ? h(O) : s;
      }
      function m(O) {
        var F = O - u,
          V = O - c,
          X = t - F;
        return p ? qL(X, o - V) : X;
      }
      function T(O) {
        var F = O - u,
          V = O - c;
        return u === void 0 || F >= t || F < 0 || (p && V >= o);
      }
      function y() {
        var O = xo();
        if (T(O)) return S(O);
        a = setTimeout(y, m(O));
      }
      function S(O) {
        return (a = void 0), d && r ? h(O) : ((r = i = void 0), s);
      }
      function A() {
        a !== void 0 && clearTimeout(a), (c = 0), (r = u = i = a = void 0);
      }
      function R() {
        return a === void 0 ? s : S(xo());
      }
      function P() {
        var O = xo(),
          F = T(O);
        if (((r = arguments), (i = this), (u = O), F)) {
          if (a === void 0) return v(u);
          if (p) return clearTimeout(a), (a = setTimeout(y, t)), h(u);
        }
        return a === void 0 && (a = setTimeout(y, t)), s;
      }
      return (P.cancel = A), (P.flush = R), P;
    }
    Eg.exports = GL;
  });
  var vg = f((MG, mg) => {
    var VL = yg(),
      XL = Ye(),
      UL = "Expected a function";
    function kL(e, t, n) {
      var r = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(UL);
      return (
        XL(n) &&
          ((r = "leading" in n ? !!n.leading : r),
          (i = "trailing" in n ? !!n.trailing : i)),
        VL(e, t, { leading: r, maxWait: t, trailing: i })
      );
    }
    mg.exports = kL;
  });
  var Ig = {};
  xe(Ig, {
    actionListPlaybackChanged: () => Wt,
    animationFrameChanged: () => Tr,
    clearRequested: () => pN,
    elementStateChanged: () => Fo,
    eventListenerAdded: () => Ir,
    eventStateChanged: () => No,
    instanceAdded: () => Mo,
    instanceRemoved: () => Do,
    instanceStarted: () => br,
    mediaQueriesDefined: () => Go,
    parameterChanged: () => Ht,
    playbackRequested: () => fN,
    previewRequested: () => lN,
    rawDataImported: () => Ro,
    sessionInitialized: () => Co,
    sessionStarted: () => Po,
    sessionStopped: () => Lo,
    stopRequested: () => dN,
    testFrameRendered: () => gN,
    viewportWidthChanged: () => qo,
  });
  var _g,
    BL,
    HL,
    WL,
    zL,
    jL,
    KL,
    YL,
    $L,
    QL,
    ZL,
    JL,
    eN,
    tN,
    nN,
    rN,
    iN,
    oN,
    aN,
    sN,
    uN,
    cN,
    Ro,
    Co,
    Po,
    Lo,
    lN,
    fN,
    dN,
    pN,
    Ir,
    gN,
    No,
    Tr,
    Ht,
    Mo,
    br,
    Do,
    Fo,
    Wt,
    qo,
    Go,
    Ar = fe(() => {
      "use strict";
      Re();
      (_g = ae(yt())),
        ({
          IX2_RAW_DATA_IMPORTED: BL,
          IX2_SESSION_INITIALIZED: HL,
          IX2_SESSION_STARTED: WL,
          IX2_SESSION_STOPPED: zL,
          IX2_PREVIEW_REQUESTED: jL,
          IX2_PLAYBACK_REQUESTED: KL,
          IX2_STOP_REQUESTED: YL,
          IX2_CLEAR_REQUESTED: $L,
          IX2_EVENT_LISTENER_ADDED: QL,
          IX2_TEST_FRAME_RENDERED: ZL,
          IX2_EVENT_STATE_CHANGED: JL,
          IX2_ANIMATION_FRAME_CHANGED: eN,
          IX2_PARAMETER_CHANGED: tN,
          IX2_INSTANCE_ADDED: nN,
          IX2_INSTANCE_STARTED: rN,
          IX2_INSTANCE_REMOVED: iN,
          IX2_ELEMENT_STATE_CHANGED: oN,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: aN,
          IX2_VIEWPORT_WIDTH_CHANGED: sN,
          IX2_MEDIA_QUERIES_DEFINED: uN,
        } = ye),
        ({ reifyState: cN } = _g.IX2VanillaUtils),
        (Ro = (e) => ({ type: BL, payload: { ...cN(e) } })),
        (Co = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: HL,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Po = () => ({ type: WL })),
        (Lo = () => ({ type: zL })),
        (lN = ({ rawData: e, defer: t }) => ({
          type: jL,
          payload: { defer: t, rawData: e },
        })),
        (fN = ({
          actionTypeId: e = Ae.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: r,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: KL,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: s,
            eventId: r,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (dN = (e) => ({ type: YL, payload: { actionListId: e } })),
        (pN = () => ({ type: $L })),
        (Ir = (e, t) => ({
          type: QL,
          payload: { target: e, listenerParams: t },
        })),
        (gN = (e = 1) => ({ type: ZL, payload: { step: e } })),
        (No = (e, t) => ({ type: JL, payload: { stateKey: e, newState: t } })),
        (Tr = (e, t) => ({ type: eN, payload: { now: e, parameters: t } })),
        (Ht = (e, t) => ({ type: tN, payload: { key: e, value: t } })),
        (Mo = (e) => ({ type: nN, payload: { ...e } })),
        (br = (e, t) => ({ type: rN, payload: { instanceId: e, time: t } })),
        (Do = (e) => ({ type: iN, payload: { instanceId: e } })),
        (Fo = (e, t, n, r) => ({
          type: oN,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: r },
        })),
        (Wt = ({ actionListId: e, isPlaying: t }) => ({
          type: aN,
          payload: { actionListId: e, isPlaying: t },
        })),
        (qo = ({ width: e, mediaQueries: t }) => ({
          type: sN,
          payload: { width: e, mediaQueries: t },
        })),
        (Go = () => ({ type: uN }));
    });
  var we = {};
  xe(we, {
    elementContains: () => Uo,
    getChildElements: () => AN,
    getClosestElement: () => In,
    getProperty: () => vN,
    getQuerySelector: () => Xo,
    getRefType: () => ko,
    getSiblingElements: () => SN,
    getStyle: () => mN,
    getValidDocument: () => IN,
    isSiblingNode: () => bN,
    matchSelector: () => _N,
    queryDocument: () => TN,
    setStyle: () => yN,
  });
  function yN(e, t, n) {
    e.style[t] = n;
  }
  function mN(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function vN(e, t) {
    return e[t];
  }
  function _N(e) {
    return (t) => t[Vo](e);
  }
  function Xo({ id: e, selector: t }) {
    if (e) {
      let n = e;
      if (e.indexOf(Tg) !== -1) {
        let r = e.split(Tg),
          i = r[0];
        if (((n = r[1]), i !== document.documentElement.getAttribute(Ag)))
          return null;
      }
      return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
    }
    return t;
  }
  function IN(e) {
    return e == null || e === document.documentElement.getAttribute(Ag)
      ? document
      : null;
  }
  function TN(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function Uo(e, t) {
    return e.contains(t);
  }
  function bN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function AN(e) {
    let t = [];
    for (let n = 0, { length: r } = e || []; n < r; n++) {
      let { children: i } = e[n],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function SN(e = []) {
    let t = [],
      n = [];
    for (let r = 0, { length: i } = e; r < i; r++) {
      let { parentNode: o } = e[r];
      if (!o || !o.children || !o.children.length || n.indexOf(o) !== -1)
        continue;
      n.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function ko(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? hN
        : EN
      : null;
  }
  var bg,
    Vo,
    Tg,
    hN,
    EN,
    Ag,
    In,
    Sg = fe(() => {
      "use strict";
      bg = ae(yt());
      Re();
      ({ ELEMENT_MATCHES: Vo } = bg.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Tg,
          HTML_ELEMENT: hN,
          PLAIN_OBJECT: EN,
          WF_PAGE: Ag,
        } = _e);
      In = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[Vo] && n[Vo](t)) return n;
              n = n.parentNode;
            } while (n != null);
            return null;
          };
    });
  var Bo = f((qG, Og) => {
    var wN = Ye(),
      wg = Object.create,
      ON = (function () {
        function e() {}
        return function (t) {
          if (!wN(t)) return {};
          if (wg) return wg(t);
          e.prototype = t;
          var n = new e();
          return (e.prototype = void 0), n;
        };
      })();
    Og.exports = ON;
  });
  var Sr = f((GG, xg) => {
    function xN() {}
    xg.exports = xN;
  });
  var Or = f((VG, Rg) => {
    var RN = Bo(),
      CN = Sr();
    function wr(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    wr.prototype = RN(CN.prototype);
    wr.prototype.constructor = wr;
    Rg.exports = wr;
  });
  var Ng = f((XG, Lg) => {
    var Cg = Tt(),
      PN = rn(),
      LN = ve(),
      Pg = Cg ? Cg.isConcatSpreadable : void 0;
    function NN(e) {
      return LN(e) || PN(e) || !!(Pg && e && e[Pg]);
    }
    Lg.exports = NN;
  });
  var Fg = f((UG, Dg) => {
    var MN = Wn(),
      DN = Ng();
    function Mg(e, t, n, r, i) {
      var o = -1,
        s = e.length;
      for (n || (n = DN), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && n(a)
          ? t > 1
            ? Mg(a, t - 1, n, r, i)
            : MN(i, a)
          : r || (i[i.length] = a);
      }
      return i;
    }
    Dg.exports = Mg;
  });
  var Gg = f((kG, qg) => {
    var FN = Fg();
    function qN(e) {
      var t = e == null ? 0 : e.length;
      return t ? FN(e, 1) : [];
    }
    qg.exports = qN;
  });
  var Xg = f((BG, Vg) => {
    function GN(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    Vg.exports = GN;
  });
  var Bg = f((HG, kg) => {
    var VN = Xg(),
      Ug = Math.max;
    function XN(e, t, n) {
      return (
        (t = Ug(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var r = arguments, i = -1, o = Ug(r.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = r[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
          return (a[t] = n(s)), VN(e, this, a);
        }
      );
    }
    kg.exports = XN;
  });
  var Wg = f((WG, Hg) => {
    function UN(e) {
      return function () {
        return e;
      };
    }
    Hg.exports = UN;
  });
  var Kg = f((zG, jg) => {
    var kN = Wg(),
      zg = wo(),
      BN = rr(),
      HN = zg
        ? function (e, t) {
            return zg(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: kN(t),
              writable: !0,
            });
          }
        : BN;
    jg.exports = HN;
  });
  var $g = f((jG, Yg) => {
    var WN = 800,
      zN = 16,
      jN = Date.now;
    function KN(e) {
      var t = 0,
        n = 0;
      return function () {
        var r = jN(),
          i = zN - (r - n);
        if (((n = r), i > 0)) {
          if (++t >= WN) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    Yg.exports = KN;
  });
  var Zg = f((KG, Qg) => {
    var YN = Kg(),
      $N = $g(),
      QN = $N(YN);
    Qg.exports = QN;
  });
  var eh = f((YG, Jg) => {
    var ZN = Gg(),
      JN = Bg(),
      eM = Zg();
    function tM(e) {
      return eM(JN(e, void 0, ZN), e + "");
    }
    Jg.exports = tM;
  });
  var rh = f(($G, nh) => {
    var th = xi(),
      nM = th && new th();
    nh.exports = nM;
  });
  var oh = f((QG, ih) => {
    function rM() {}
    ih.exports = rM;
  });
  var Ho = f((ZG, sh) => {
    var ah = rh(),
      iM = oh(),
      oM = ah
        ? function (e) {
            return ah.get(e);
          }
        : iM;
    sh.exports = oM;
  });
  var ch = f((JG, uh) => {
    var aM = {};
    uh.exports = aM;
  });
  var Wo = f((eV, fh) => {
    var lh = ch(),
      sM = Object.prototype,
      uM = sM.hasOwnProperty;
    function cM(e) {
      for (
        var t = e.name + "", n = lh[t], r = uM.call(lh, t) ? n.length : 0;
        r--;

      ) {
        var i = n[r],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    fh.exports = cM;
  });
  var Rr = f((tV, dh) => {
    var lM = Bo(),
      fM = Sr(),
      dM = 4294967295;
    function xr(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = dM),
        (this.__views__ = []);
    }
    xr.prototype = lM(fM.prototype);
    xr.prototype.constructor = xr;
    dh.exports = xr;
  });
  var gh = f((nV, ph) => {
    function pM(e, t) {
      var n = -1,
        r = e.length;
      for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
      return t;
    }
    ph.exports = pM;
  });
  var Eh = f((rV, hh) => {
    var gM = Rr(),
      hM = Or(),
      EM = gh();
    function yM(e) {
      if (e instanceof gM) return e.clone();
      var t = new hM(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = EM(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    hh.exports = yM;
  });
  var vh = f((iV, mh) => {
    var mM = Rr(),
      yh = Or(),
      vM = Sr(),
      _M = ve(),
      IM = Je(),
      TM = Eh(),
      bM = Object.prototype,
      AM = bM.hasOwnProperty;
    function Cr(e) {
      if (IM(e) && !_M(e) && !(e instanceof mM)) {
        if (e instanceof yh) return e;
        if (AM.call(e, "__wrapped__")) return TM(e);
      }
      return new yh(e);
    }
    Cr.prototype = vM.prototype;
    Cr.prototype.constructor = Cr;
    mh.exports = Cr;
  });
  var Ih = f((oV, _h) => {
    var SM = Rr(),
      wM = Ho(),
      OM = Wo(),
      xM = vh();
    function RM(e) {
      var t = OM(e),
        n = xM[t];
      if (typeof n != "function" || !(t in SM.prototype)) return !1;
      if (e === n) return !0;
      var r = wM(n);
      return !!r && e === r[0];
    }
    _h.exports = RM;
  });
  var Sh = f((aV, Ah) => {
    var Th = Or(),
      CM = eh(),
      PM = Ho(),
      zo = Wo(),
      LM = ve(),
      bh = Ih(),
      NM = "Expected a function",
      MM = 8,
      DM = 32,
      FM = 128,
      qM = 256;
    function GM(e) {
      return CM(function (t) {
        var n = t.length,
          r = n,
          i = Th.prototype.thru;
        for (e && t.reverse(); r--; ) {
          var o = t[r];
          if (typeof o != "function") throw new TypeError(NM);
          if (i && !s && zo(o) == "wrapper") var s = new Th([], !0);
        }
        for (r = s ? r : n; ++r < n; ) {
          o = t[r];
          var a = zo(o),
            u = a == "wrapper" ? PM(o) : void 0;
          u &&
          bh(u[0]) &&
          u[1] == (FM | MM | DM | qM) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[zo(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && bh(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var c = arguments,
            g = c[0];
          if (s && c.length == 1 && LM(g)) return s.plant(g).value();
          for (var p = 0, d = n ? t[p].apply(this, c) : g; ++p < n; )
            d = t[p].call(this, d);
          return d;
        };
      });
    }
    Ah.exports = GM;
  });
  var Oh = f((sV, wh) => {
    var VM = Sh(),
      XM = VM();
    wh.exports = XM;
  });
  var Rh = f((uV, xh) => {
    function UM(e, t, n) {
      return (
        e === e &&
          (n !== void 0 && (e = e <= n ? e : n),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    xh.exports = UM;
  });
  var Ph = f((cV, Ch) => {
    var kM = Rh(),
      jo = ir();
    function BM(e, t, n) {
      return (
        n === void 0 && ((n = t), (t = void 0)),
        n !== void 0 && ((n = jo(n)), (n = n === n ? n : 0)),
        t !== void 0 && ((t = jo(t)), (t = t === t ? t : 0)),
        kM(jo(e), t, n)
      );
    }
    Ch.exports = BM;
  });
  var Xh,
    Uh,
    kh,
    Bh,
    HM,
    WM,
    zM,
    jM,
    KM,
    YM,
    $M,
    QM,
    ZM,
    JM,
    eD,
    tD,
    nD,
    rD,
    iD,
    Hh,
    Wh,
    oD,
    aD,
    sD,
    zh,
    uD,
    cD,
    jh,
    lD,
    Ko,
    Kh,
    Lh,
    Nh,
    Yh,
    bn,
    fD,
    Ze,
    $h,
    dD,
    Pe,
    Ue,
    An,
    Qh,
    Yo,
    Mh,
    $o,
    pD,
    Tn,
    gD,
    hD,
    ED,
    Zh,
    Dh,
    yD,
    Fh,
    mD,
    vD,
    _D,
    qh,
    Pr,
    Lr,
    Gh,
    Vh,
    Jh,
    eE = fe(() => {
      "use strict";
      (Xh = ae(Oh())), (Uh = ae(nr())), (kh = ae(Ph()));
      Re();
      Qo();
      Ar();
      (Bh = ae(yt())),
        ({
          MOUSE_CLICK: HM,
          MOUSE_SECOND_CLICK: WM,
          MOUSE_DOWN: zM,
          MOUSE_UP: jM,
          MOUSE_OVER: KM,
          MOUSE_OUT: YM,
          DROPDOWN_CLOSE: $M,
          DROPDOWN_OPEN: QM,
          SLIDER_ACTIVE: ZM,
          SLIDER_INACTIVE: JM,
          TAB_ACTIVE: eD,
          TAB_INACTIVE: tD,
          NAVBAR_CLOSE: nD,
          NAVBAR_OPEN: rD,
          MOUSE_MOVE: iD,
          PAGE_SCROLL_DOWN: Hh,
          SCROLL_INTO_VIEW: Wh,
          SCROLL_OUT_OF_VIEW: oD,
          PAGE_SCROLL_UP: aD,
          SCROLLING_IN_VIEW: sD,
          PAGE_FINISH: zh,
          ECOMMERCE_CART_CLOSE: uD,
          ECOMMERCE_CART_OPEN: cD,
          PAGE_START: jh,
          PAGE_SCROLL: lD,
        } = Ve),
        (Ko = "COMPONENT_ACTIVE"),
        (Kh = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Lh } = _e),
        ({ getNamespacedParameterId: Nh } = Bh.IX2VanillaUtils),
        (Yh = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (bn = Yh(({ element: e, nativeEvent: t }) => e === t.target)),
        (fD = Yh(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (Ze = (0, Xh.default)([bn, fD])),
        ($h = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: r } = n,
              i = r[t];
            if (i && !pD[i.eventTypeId]) return i;
          }
          return null;
        }),
        (dD = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: r } = n.config;
          return !!$h(e, r);
        }),
        (Pe = ({ store: e, event: t, element: n, eventStateKey: r }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            c = $h(e, u);
          return (
            c &&
              zt({
                store: e,
                eventId: u,
                eventTarget: n,
                eventStateKey: u + Lh + r.split(Lh)[1],
                actionListId: (0, Uh.default)(c, "action.config.actionListId"),
              }),
            zt({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            Sn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            i
          );
        }),
        (Ue = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
        (An = { handler: Ue(Ze, Pe) }),
        (Qh = { ...An, types: [Ko, Kh].join(" ") }),
        (Yo = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Mh = "mouseover mouseout"),
        ($o = { types: Yo }),
        (pD = { PAGE_START: jh, PAGE_FINISH: zh }),
        (Tn = (() => {
          let e = window.pageXOffset !== void 0,
            n =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : n.scrollLeft,
            scrollTop: e ? window.pageYOffset : n.scrollTop,
            stiffScrollTop: (0, kh.default)(
              e ? window.pageYOffset : n.scrollTop,
              0,
              n.scrollHeight - window.innerHeight
            ),
            scrollWidth: n.scrollWidth,
            scrollHeight: n.scrollHeight,
            clientWidth: n.clientWidth,
            clientHeight: n.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (gD = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (hD = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: r, relatedTarget: i } = t,
            o = e.contains(r);
          if (n === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(n === "mouseout" && o && s);
        }),
        (ED = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: r, clientHeight: i } = Tn(),
            o = n.scrollOffsetValue,
            u = n.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return gD(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: r,
            bottom: i - u,
          });
        }),
        (Zh = (e) => (t, n) => {
          let { type: r } = t.nativeEvent,
            i = [Ko, Kh].indexOf(r) !== -1 ? r === Ko : n.isActive,
            o = { ...n, isActive: i };
          return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
        }),
        (Dh = (e) => (t, n) => {
          let r = { elementHovered: hD(t) };
          return (
            ((n ? r.elementHovered !== n.elementHovered : r.elementHovered) &&
              e(t, r)) ||
            r
          );
        }),
        (yD = (e) => (t, n) => {
          let r = { ...n, elementVisible: ED(t) };
          return (
            ((n ? r.elementVisible !== n.elementVisible : r.elementVisible) &&
              e(t, r)) ||
            r
          );
        }),
        (Fh =
          (e) =>
          (t, n = {}) => {
            let { stiffScrollTop: r, scrollHeight: i, innerHeight: o } = Tn(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: c } = s,
              g = c === "PX",
              p = i - o,
              d = Number((r / p).toFixed(2));
            if (n && n.percentTop === d) return n;
            let h = (g ? u : (o * (u || 0)) / 100) / p,
              v,
              m,
              T = 0;
            n &&
              ((v = d > n.percentTop),
              (m = n.scrollingDown !== v),
              (T = m ? d : n.anchorTop));
            let y = a === Hh ? d >= T + h : d <= T - h,
              S = {
                ...n,
                percentTop: d,
                inBounds: y,
                anchorTop: T,
                scrollingDown: v,
              };
            return (n && y && (m || S.inBounds !== n.inBounds) && e(t, S)) || S;
          }),
        (mD = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (vD = (e) => (t, n) => {
          let r = { finished: document.readyState === "complete" };
          return r.finished && !(n && n.finshed) && e(t), r;
        }),
        (_D = (e) => (t, n) => {
          let r = { started: !0 };
          return n || e(t), r;
        }),
        (qh =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let r = { clickCount: (n.clickCount % 2) + 1 };
            return (r.clickCount !== n.clickCount && e(t, r)) || r;
          }),
        (Pr = (e = !0) => ({
          ...Qh,
          handler: Ue(
            e ? Ze : bn,
            Zh((t, n) => (n.isActive ? An.handler(t, n) : n))
          ),
        })),
        (Lr = (e = !0) => ({
          ...Qh,
          handler: Ue(
            e ? Ze : bn,
            Zh((t, n) => (n.isActive ? n : An.handler(t, n)))
          ),
        })),
        (Gh = {
          ...$o,
          handler: yD((e, t) => {
            let { elementVisible: n } = t,
              { event: r, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[r.action.config.autoStopEventId] && t.triggered
              ? t
              : (r.eventTypeId === Wh) === n
              ? (Pe(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Vh = 0.05),
        (Jh = {
          [ZM]: Pr(),
          [JM]: Lr(),
          [QM]: Pr(),
          [$M]: Lr(),
          [rD]: Pr(!1),
          [nD]: Lr(!1),
          [eD]: Pr(),
          [tD]: Lr(),
          [cD]: { types: "ecommerce-cart-open", handler: Ue(Ze, Pe) },
          [uD]: { types: "ecommerce-cart-close", handler: Ue(Ze, Pe) },
          [HM]: {
            types: "click",
            handler: Ue(
              Ze,
              qh((e, { clickCount: t }) => {
                dD(e) ? t === 1 && Pe(e) : Pe(e);
              })
            ),
          },
          [WM]: {
            types: "click",
            handler: Ue(
              Ze,
              qh((e, { clickCount: t }) => {
                t === 2 && Pe(e);
              })
            ),
          },
          [zM]: { ...An, types: "mousedown" },
          [jM]: { ...An, types: "mouseup" },
          [KM]: {
            types: Mh,
            handler: Ue(
              Ze,
              Dh((e, t) => {
                t.elementHovered && Pe(e);
              })
            ),
          },
          [YM]: {
            types: Mh,
            handler: Ue(
              Ze,
              Dh((e, t) => {
                t.elementHovered || Pe(e);
              })
            ),
          },
          [iD]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: r,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: c,
                  restingState: g = 0,
                } = n,
                {
                  clientX: p = o.clientX,
                  clientY: d = o.clientY,
                  pageX: h = o.pageX,
                  pageY: v = o.pageY,
                } = r,
                m = a === "X_AXIS",
                T = r.type === "mouseout",
                y = g / 100,
                S = u,
                A = !1;
              switch (s) {
                case Ke.VIEWPORT: {
                  y = m
                    ? Math.min(p, window.innerWidth) / window.innerWidth
                    : Math.min(d, window.innerHeight) / window.innerHeight;
                  break;
                }
                case Ke.PAGE: {
                  let {
                    scrollLeft: R,
                    scrollTop: P,
                    scrollWidth: O,
                    scrollHeight: F,
                  } = Tn();
                  y = m ? Math.min(R + h, O) / O : Math.min(P + v, F) / F;
                  break;
                }
                case Ke.ELEMENT:
                default: {
                  S = Nh(i, u);
                  let R = r.type.indexOf("mouse") === 0;
                  if (R && Ze({ element: t, nativeEvent: r }) !== !0) break;
                  let P = t.getBoundingClientRect(),
                    { left: O, top: F, width: V, height: X } = P;
                  if (!R && !mD({ left: p, top: d }, P)) break;
                  (A = !0), (y = m ? (p - O) / V : (d - F) / X);
                  break;
                }
              }
              return (
                T && (y > 1 - Vh || y < Vh) && (y = Math.round(y)),
                (s !== Ke.ELEMENT || A || A !== o.elementHovered) &&
                  ((y = c ? 1 - y : y), e.dispatch(Ht(S, y))),
                {
                  elementHovered: A,
                  clientX: p,
                  clientY: d,
                  pageX: h,
                  pageY: v,
                }
              );
            },
          },
          [lD]: {
            types: Yo,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: r } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = Tn(),
                a = i / (o - s);
              (a = r ? 1 - a : a), e.dispatch(Ht(n, a));
            },
          },
          [sD]: {
            types: Yo,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: r },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: c,
                } = Tn(),
                {
                  basedOn: g,
                  selectedAxis: p,
                  continuousParameterGroupId: d,
                  startsEntering: h,
                  startsExiting: v,
                  addEndOffset: m,
                  addStartOffset: T,
                  addOffsetValue: y = 0,
                  endOffsetValue: S = 0,
                } = n,
                A = p === "X_AXIS";
              if (g === Ke.VIEWPORT) {
                let R = A ? o / a : s / u;
                return (
                  R !== i.scrollPercent && t.dispatch(Ht(d, R)),
                  { scrollPercent: R }
                );
              } else {
                let R = Nh(r, d),
                  P = e.getBoundingClientRect(),
                  O = (T ? y : 0) / 100,
                  F = (m ? S : 0) / 100;
                (O = h ? O : 1 - O), (F = v ? F : 1 - F);
                let V = P.top + Math.min(P.height * O, c),
                  k = P.top + P.height * F - V,
                  Z = Math.min(c + k, u),
                  I = Math.min(Math.max(0, c - V), Z) / Z;
                return (
                  I !== i.scrollPercent && t.dispatch(Ht(R, I)),
                  { scrollPercent: I }
                );
              }
            },
          },
          [Wh]: Gh,
          [oD]: Gh,
          [Hh]: {
            ...$o,
            handler: Fh((e, t) => {
              t.scrollingDown && Pe(e);
            }),
          },
          [aD]: {
            ...$o,
            handler: Fh((e, t) => {
              t.scrollingDown || Pe(e);
            }),
          },
          [zh]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ue(bn, vD(Pe)),
          },
          [jh]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ue(bn, _D(Pe)),
          },
        });
    });
  var yE = {};
  xe(yE, {
    observeRequests: () => XD,
    startActionGroup: () => Sn,
    startEngine: () => Gr,
    stopActionGroup: () => zt,
    stopAllActionGroups: () => gE,
    stopEngine: () => Vr,
  });
  function XD(e) {
    mt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: BD }),
      mt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: HD }),
      mt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: WD }),
      mt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: zD });
  }
  function UD(e) {
    mt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Vr(e),
          lE({ store: e, elementApi: we }),
          Gr({ store: e, allowEvents: !0 }),
          fE();
      },
    });
  }
  function kD(e, t) {
    let n = mt({
      store: e,
      select: ({ ixSession: r }) => r.tick,
      onChange: (r) => {
        t(r), n();
      },
    });
  }
  function BD({ rawData: e, defer: t }, n) {
    let r = () => {
      Gr({ store: n, rawData: e, allowEvents: !0 }), fE();
    };
    t ? setTimeout(r, 0) : r();
  }
  function fE() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function HD(e, t) {
    let {
        actionTypeId: n,
        actionListId: r,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: c = !0,
      } = e,
      { rawData: g } = e;
    if (r && i && g && a) {
      let p = g.actionLists[r];
      p && (g = RD({ actionList: p, actionItemId: i, rawData: g }));
    }
    if (
      (Gr({ store: t, rawData: g, allowEvents: s, testManual: u }),
      (r && n === Ae.GENERAL_START_ACTION) || Zo(n))
    ) {
      zt({ store: t, actionListId: r }),
        pE({ store: t, actionListId: r, eventId: o });
      let p = Sn({
        store: t,
        eventId: o,
        actionListId: r,
        immediate: a,
        verbose: c,
      });
      c && p && t.dispatch(Wt({ actionListId: r, isPlaying: !a }));
    }
  }
  function WD({ actionListId: e }, t) {
    e ? zt({ store: t, actionListId: e }) : gE({ store: t }), Vr(t);
  }
  function zD(e, t) {
    Vr(t), lE({ store: t, elementApi: we });
  }
  function Gr({ store: e, rawData: t, allowEvents: n, testManual: r }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(Ro(t)),
      i.active ||
        (e.dispatch(
          Co({
            hasBoundaryNodes: !!document.querySelector(Mr),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        n &&
          (ZD(e), jD(), e.getState().ixSession.hasDefinedMediaQueries && UD(e)),
        e.dispatch(Po()),
        KD(e, r));
  }
  function jD() {
    let { documentElement: e } = document;
    e.className.indexOf(tE) === -1 && (e.className += ` ${tE}`);
  }
  function KD(e, t) {
    let n = (r) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(Tr(r, o)), t ? kD(e, n) : requestAnimationFrame(n));
    };
    n(window.performance.now());
  }
  function Vr(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: n } = t;
      n.forEach(YD), ND(), e.dispatch(Lo());
    }
  }
  function YD({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function $D({
    store: e,
    eventStateKey: t,
    eventTarget: n,
    eventId: r,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: c, ixSession: g } = e.getState(),
      { events: p } = c,
      d = p[r],
      { eventTypeId: h } = d,
      v = {},
      m = {},
      T = [],
      { continuousActionGroups: y } = s,
      { id: S } = s;
    CD(h, i) && (S = PD(t, S));
    let A = g.hasBoundaryNodes && n ? In(n, Mr) : null;
    y.forEach((R) => {
      let { keyframe: P, actionItems: O } = R;
      O.forEach((F) => {
        let { actionTypeId: V } = F,
          { target: X } = F.config;
        if (!X) return;
        let k = X.boundaryMode ? A : null,
          Z = MD(X) + Jo + V;
        if (((m[Z] = QD(m[Z], P, F)), !v[Z])) {
          v[Z] = !0;
          let { config: N } = F;
          Dr({
            config: N,
            event: d,
            eventTarget: n,
            elementRoot: k,
            elementApi: we,
          }).forEach((I) => {
            T.push({ element: I, key: Z });
          });
        }
      });
    }),
      T.forEach(({ element: R, key: P }) => {
        let O = m[P],
          F = (0, rt.default)(O, "[0].actionItems[0]", {}),
          { actionTypeId: V } = F,
          k = (
            V === Ae.PLUGIN_RIVE
              ? (F.config?.target?.selectorGuids || []).length === 0
              : qr(V)
          )
            ? ta(V)(R, F)
            : null,
          Z = ea({ element: R, actionItem: F, elementApi: we }, k);
        na({
          store: e,
          element: R,
          eventId: r,
          actionListId: o,
          actionItem: F,
          destination: Z,
          continuous: !0,
          parameterId: S,
          actionGroups: O,
          smoothing: a,
          restingValue: u,
          pluginInstance: k,
        });
      });
  }
  function QD(e = [], t, n) {
    let r = [...e],
      i;
    return (
      r.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = r.length), r.push({ keyframe: t, actionItems: [] })),
      r[i].actionItems.push(n),
      r
    );
  }
  function ZD(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: n } = t;
    dE(e),
      (0, jt.default)(n, (i, o) => {
        let s = Jh[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        iF({ logic: s, store: e, events: i });
      });
    let { ixSession: r } = e.getState();
    r.eventListeners.length && eF(e);
  }
  function eF(e) {
    let t = () => {
      dE(e);
    };
    JD.forEach((n) => {
      window.addEventListener(n, t), e.dispatch(Ir(window, [n, t]));
    }),
      t();
  }
  function dE(e) {
    let { ixSession: t, ixData: n } = e.getState(),
      r = window.innerWidth;
    if (r !== t.viewportWidth) {
      let { mediaQueries: i } = n;
      e.dispatch(qo({ width: r, mediaQueries: i }));
    }
  }
  function iF({ logic: e, store: t, events: n }) {
    oF(n);
    let { types: r, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = tF(n, rF);
    if (!(0, iE.default)(a)) return;
    (0, jt.default)(a, (p, d) => {
      let h = n[d],
        { action: v, id: m, mediaQueries: T = o.mediaQueryKeys } = h,
        { actionListId: y } = v.config;
      DD(T, o.mediaQueryKeys) || t.dispatch(Go()),
        v.actionTypeId === Ae.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(h.config) ? h.config : [h.config]).forEach((A) => {
            let { continuousParameterGroupId: R } = A,
              P = (0, rt.default)(s, `${y}.continuousParameterGroups`, []),
              O = (0, rE.default)(P, ({ id: X }) => X === R),
              F = (A.smoothing || 0) / 100,
              V = (A.restingState || 0) / 100;
            O &&
              p.forEach((X, k) => {
                let Z = m + Jo + k;
                $D({
                  store: t,
                  eventStateKey: Z,
                  eventTarget: X,
                  eventId: m,
                  eventConfig: A,
                  actionListId: y,
                  parameterGroup: O,
                  smoothing: F,
                  restingValue: V,
                });
              });
          }),
        (v.actionTypeId === Ae.GENERAL_START_ACTION || Zo(v.actionTypeId)) &&
          pE({ store: t, actionListId: y, eventId: m });
    });
    let u = (p) => {
        let { ixSession: d } = t.getState();
        nF(a, (h, v, m) => {
          let T = n[v],
            y = d.eventState[m],
            { action: S, mediaQueries: A = o.mediaQueryKeys } = T;
          if (!Fr(A, d.mediaQueryKey)) return;
          let R = (P = {}) => {
            let O = i(
              {
                store: t,
                element: h,
                event: T,
                eventConfig: P,
                nativeEvent: p,
                eventStateKey: m,
              },
              y
            );
            FD(O, y) || t.dispatch(No(m, O));
          };
          S.actionTypeId === Ae.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(T.config) ? T.config : [T.config]).forEach(R)
            : R();
        });
      },
      c = (0, uE.default)(u, VD),
      g = ({ target: p = document, types: d, throttle: h }) => {
        d.split(" ")
          .filter(Boolean)
          .forEach((v) => {
            let m = h ? c : u;
            p.addEventListener(v, m), t.dispatch(Ir(p, [v, m]));
          });
      };
    Array.isArray(r) ? r.forEach(g) : typeof r == "string" && g(e);
  }
  function oF(e) {
    if (!GD) return;
    let t = {},
      n = "";
    for (let r in e) {
      let { eventTypeId: i, target: o } = e[r],
        s = Xo(o);
      t[s] ||
        ((i === Ve.MOUSE_CLICK || i === Ve.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (n += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (n) {
      let r = document.createElement("style");
      (r.textContent = n), document.body.appendChild(r);
    }
  }
  function pE({ store: e, actionListId: t, eventId: n }) {
    let { ixData: r, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = r,
      a = s[n],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let c = (0, rt.default)(u, "actionItemGroups[0].actionItems", []),
        g = (0, rt.default)(a, "mediaQueries", r.mediaQueryKeys);
      if (!Fr(g, i.mediaQueryKey)) return;
      c.forEach((p) => {
        let { config: d, actionTypeId: h } = p,
          v =
            d?.target?.useEventTarget === !0 && d?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : d,
          m = Dr({ config: v, event: a, elementApi: we }),
          T = qr(h);
        m.forEach((y) => {
          let S = T ? ta(h)(y, p) : null;
          na({
            destination: ea({ element: y, actionItem: p, elementApi: we }, S),
            immediate: !0,
            store: e,
            element: y,
            eventId: n,
            actionItem: p,
            actionListId: t,
            pluginInstance: S,
          });
        });
      });
    }
  }
  function gE({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, jt.default)(t, (n) => {
      if (!n.continuous) {
        let { actionListId: r, verbose: i } = n;
        ra(n, e), i && e.dispatch(Wt({ actionListId: r, isPlaying: !1 }));
      }
    });
  }
  function zt({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && n ? In(n, Mr) : null;
    (0, jt.default)(o, (u) => {
      let c = (0, rt.default)(u, "actionItem.config.target.boundaryMode"),
        g = r ? u.eventStateKey === r : !0;
      if (u.actionListId === i && u.eventId === t && g) {
        if (a && c && !Uo(a, u.element)) return;
        ra(u, e),
          u.verbose && e.dispatch(Wt({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function Sn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: c } = e.getState(),
      { events: g } = u,
      p = g[t] || {},
      { mediaQueries: d = u.mediaQueryKeys } = p,
      h = (0, rt.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: v, useFirstGroupAsInitialState: m } = h;
    if (!v || !v.length) return !1;
    o >= v.length && (0, rt.default)(p, "config.loop") && (o = 0),
      o === 0 && m && o++;
    let y =
        (o === 0 || (o === 1 && m)) && Zo(p.action?.actionTypeId)
          ? p.config.delay
          : void 0,
      S = (0, rt.default)(v, [o, "actionItems"], []);
    if (!S.length || !Fr(d, c.mediaQueryKey)) return !1;
    let A = c.hasBoundaryNodes && n ? In(n, Mr) : null,
      R = wD(S),
      P = !1;
    return (
      S.forEach((O, F) => {
        let { config: V, actionTypeId: X } = O,
          k = qr(X),
          { target: Z } = V;
        if (!Z) return;
        let N = Z.boundaryMode ? A : null;
        Dr({
          config: V,
          event: p,
          eventTarget: n,
          elementRoot: N,
          elementApi: we,
        }).forEach((L, U) => {
          let q = k ? ta(X)(L, O) : null,
            te = k ? qD(X)(L, O) : null;
          P = !0;
          let Y = R === F && U === 0,
            se = OD({ element: L, actionItem: O }),
            Ie = ea({ element: L, actionItem: O, elementApi: we }, q);
          na({
            store: e,
            element: L,
            actionItem: O,
            eventId: t,
            eventTarget: n,
            eventStateKey: r,
            actionListId: i,
            groupIndex: o,
            isCarrier: Y,
            computedStyle: se,
            destination: Ie,
            immediate: s,
            verbose: a,
            pluginInstance: q,
            pluginDuration: te,
            instanceDelay: y,
          });
        });
      }),
      P
    );
  }
  function na(e) {
    let { store: t, computedStyle: n, ...r } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: c,
        eventId: g,
      } = r,
      p = !u,
      d = AD(),
      { ixElements: h, ixSession: v, ixData: m } = t.getState(),
      T = bD(h, i),
      { refState: y } = h[T] || {},
      S = ko(i),
      A = v.reducedMotion && hi[o.actionTypeId],
      R;
    if (A && u)
      switch (m.events[g]?.eventTypeId) {
        case Ve.MOUSE_MOVE:
        case Ve.MOUSE_MOVE_IN_VIEWPORT:
          R = c;
          break;
        default:
          R = 0.5;
          break;
      }
    let P = xD(i, y, n, o, we, a);
    if (
      (t.dispatch(
        Mo({
          instanceId: d,
          elementId: T,
          origin: P,
          refType: S,
          skipMotion: A,
          skipToValue: R,
          ...r,
        })
      ),
      hE(document.body, "ix2-animation-started", d),
      s)
    ) {
      aF(t, d);
      return;
    }
    mt({ store: t, select: ({ ixInstances: O }) => O[d], onChange: EE }),
      p && t.dispatch(br(d, v.tick));
  }
  function ra(e, t) {
    hE(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: n, actionItem: r } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[n] || {};
    s === cE && LD(o, r, we), t.dispatch(Do(e.id));
  }
  function hE(e, t, n) {
    let r = document.createEvent("CustomEvent");
    r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
  }
  function aF(e, t) {
    let { ixParameters: n } = e.getState();
    e.dispatch(br(t, 0)), e.dispatch(Tr(performance.now(), n));
    let { ixInstances: r } = e.getState();
    EE(r[t], e);
  }
  function EE(e, t) {
    let {
        active: n,
        continuous: r,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: c,
        groupIndex: g,
        eventId: p,
        eventTarget: d,
        eventStateKey: h,
        actionListId: v,
        isCarrier: m,
        styleProp: T,
        verbose: y,
        pluginInstance: S,
      } = e,
      { ixData: A, ixSession: R } = t.getState(),
      { events: P } = A,
      O = P && P[p] ? P[p] : {},
      { mediaQueries: F = A.mediaQueryKeys } = O;
    if (Fr(F, R.mediaQueryKey) && (r || n || i)) {
      if (c || (u === TD && i)) {
        t.dispatch(Fo(o, a, c, s));
        let { ixElements: V } = t.getState(),
          { ref: X, refType: k, refState: Z } = V[o] || {},
          N = Z && Z[a];
        (k === cE || qr(a)) && SD(X, Z, N, p, s, T, we, u, S);
      }
      if (i) {
        if (m) {
          let V = Sn({
            store: t,
            eventId: p,
            eventTarget: d,
            eventStateKey: h,
            actionListId: v,
            groupIndex: g + 1,
            verbose: y,
          });
          y && !V && t.dispatch(Wt({ actionListId: v, isPlaying: !1 }));
        }
        ra(e, t);
      }
    }
  }
  var rE,
    rt,
    iE,
    oE,
    aE,
    sE,
    jt,
    uE,
    Nr,
    ID,
    Zo,
    Jo,
    Mr,
    cE,
    TD,
    tE,
    Dr,
    bD,
    ea,
    mt,
    AD,
    SD,
    lE,
    wD,
    OD,
    xD,
    RD,
    CD,
    PD,
    Fr,
    LD,
    ND,
    MD,
    DD,
    FD,
    qr,
    ta,
    qD,
    nE,
    GD,
    VD,
    JD,
    tF,
    nF,
    rF,
    Qo = fe(() => {
      "use strict";
      (rE = ae(Hi())),
        (rt = ae(nr())),
        (iE = ae(Cp())),
        (oE = ae(ng())),
        (aE = ae(ig())),
        (sE = ae(ag())),
        (jt = ae(dg())),
        (uE = ae(vg()));
      Re();
      Nr = ae(yt());
      Ar();
      Sg();
      eE();
      (ID = Object.keys(Mn)),
        (Zo = (e) => ID.includes(e)),
        ({
          COLON_DELIMITER: Jo,
          BOUNDARY_SELECTOR: Mr,
          HTML_ELEMENT: cE,
          RENDER_GENERAL: TD,
          W_MOD_IX: tE,
        } = _e),
        ({
          getAffectedElements: Dr,
          getElementId: bD,
          getDestinationValues: ea,
          observeStore: mt,
          getInstanceId: AD,
          renderHTMLElement: SD,
          clearAllStyles: lE,
          getMaxDurationItemIndex: wD,
          getComputedStyle: OD,
          getInstanceOrigin: xD,
          reduceListToGroup: RD,
          shouldNamespaceEventParameter: CD,
          getNamespacedParameterId: PD,
          shouldAllowMediaQuery: Fr,
          cleanupHTMLElement: LD,
          clearObjectCache: ND,
          stringifyTarget: MD,
          mediaQueriesEqual: DD,
          shallowEqual: FD,
        } = Nr.IX2VanillaUtils),
        ({
          isPluginType: qr,
          createPluginInstance: ta,
          getPluginDuration: qD,
        } = Nr.IX2VanillaPlugins),
        (nE = navigator.userAgent),
        (GD = nE.match(/iPad/i) || nE.match(/iPhone/)),
        (VD = 12);
      JD = ["resize", "orientationchange"];
      (tF = (e, t) => (0, oE.default)((0, sE.default)(e, t), aE.default)),
        (nF = (e, t) => {
          (0, jt.default)(e, (n, r) => {
            n.forEach((i, o) => {
              let s = r + Jo + o;
              t(i, r, s);
            });
          });
        }),
        (rF = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Dr({ config: t, elementApi: we });
        });
    });
  var _E = f((oa) => {
    "use strict";
    Object.defineProperty(oa, "__esModule", { value: !0 });
    function sF(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    sF(oa, {
      actions: function () {
        return lF;
      },
      destroy: function () {
        return vE;
      },
      init: function () {
        return gF;
      },
      setEnv: function () {
        return pF;
      },
      store: function () {
        return Xr;
      },
    });
    var uF = di(),
      cF = fF((fp(), He(lp))),
      ia = (Qo(), He(yE)),
      lF = dF((Ar(), He(Ig)));
    function fF(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function mE(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (mE = function (r) {
        return r ? n : t;
      })(e);
    }
    function dF(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = mE(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var Xr = (0, uF.createStore)(cF.default);
    function pF(e) {
      e() && (0, ia.observeRequests)(Xr);
    }
    function gF(e) {
      vE(), (0, ia.startEngine)({ store: Xr, rawData: e, allowEvents: !0 });
    }
    function vE() {
      (0, ia.stopEngine)(Xr);
    }
  });
  var AE = f((vV, bE) => {
    "use strict";
    var IE = ze(),
      TE = _E();
    TE.setEnv(IE.env);
    IE.define(
      "ix2",
      (bE.exports = function () {
        return TE;
      })
    );
  });
  var wE = f((_V, SE) => {
    "use strict";
    var Kt = ze();
    Kt.define(
      "links",
      (SE.exports = function (e, t) {
        var n = {},
          r = e(window),
          i,
          o = Kt.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          c = /index\.(html|php)$/,
          g = /\/$/,
          p,
          d;
        n.ready = n.design = n.preview = h;
        function h() {
          (i = o && Kt.env("design")),
            (d = Kt.env("slug") || s.pathname || ""),
            Kt.scroll.off(m),
            (p = []);
          for (var y = document.links, S = 0; S < y.length; ++S) v(y[S]);
          p.length && (Kt.scroll.on(m), m());
        }
        function v(y) {
          if (!y.getAttribute("hreflang")) {
            var S =
              (i && y.getAttribute("href-disabled")) || y.getAttribute("href");
            if (((a.href = S), !(S.indexOf(":") >= 0))) {
              var A = e(y);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var R = e(a.hash);
                R.length && p.push({ link: A, sec: R, active: !1 });
                return;
              }
              if (!(S === "#" || S === "")) {
                var P =
                  a.href === s.href || S === d || (c.test(S) && g.test(d));
                T(A, u, P);
              }
            }
          }
        }
        function m() {
          var y = r.scrollTop(),
            S = r.height();
          t.each(p, function (A) {
            if (!A.link.attr("hreflang")) {
              var R = A.link,
                P = A.sec,
                O = P.offset().top,
                F = P.outerHeight(),
                V = S * 0.5,
                X = P.is(":visible") && O + F - V >= y && O + V <= y + S;
              A.active !== X && ((A.active = X), T(R, u, X));
            }
          });
        }
        function T(y, S, A) {
          var R = y.hasClass(S);
          (A && R) || (!A && !R) || (A ? y.addClass(S) : y.removeClass(S));
        }
        return n;
      })
    );
  });
  var xE = f((IV, OE) => {
    "use strict";
    var Ur = ze();
    Ur.define(
      "scroll",
      (OE.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          n = window.location,
          r = v() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (N) {
              window.setTimeout(N, 15);
            },
          u = Ur.env("editor") ? ".w-editor-body" : "body",
          c =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          g = 'a[href="#"]',
          p = 'a[href*="#"]:not(.w-tab-link):not(' + g + ")",
          d = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          h = document.createElement("style");
        h.appendChild(document.createTextNode(d));
        function v() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var m = /^#[a-zA-Z0-9][\w:.-]*$/;
        function T(N) {
          return m.test(N.hash) && N.host + N.pathname === n.host + n.pathname;
        }
        let y =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function S() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            y.matches
          );
        }
        function A(N, I) {
          var L;
          switch (I) {
            case "add":
              (L = N.attr("tabindex")),
                L
                  ? N.attr("data-wf-tabindex-swap", L)
                  : N.attr("tabindex", "-1");
              break;
            case "remove":
              (L = N.attr("data-wf-tabindex-swap")),
                L
                  ? (N.attr("tabindex", L),
                    N.removeAttr("data-wf-tabindex-swap"))
                  : N.removeAttr("tabindex");
              break;
          }
          N.toggleClass("wf-force-outline-none", I === "add");
        }
        function R(N) {
          var I = N.currentTarget;
          if (
            !(
              Ur.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(I.className))
            )
          ) {
            var L = T(I) ? I.hash : "";
            if (L !== "") {
              var U = e(L);
              U.length &&
                (N && (N.preventDefault(), N.stopPropagation()),
                P(L, N),
                window.setTimeout(
                  function () {
                    O(U, function () {
                      A(U, "add"),
                        U.get(0).focus({ preventScroll: !0 }),
                        A(U, "remove");
                    });
                  },
                  N ? 0 : 300
                ));
            }
          }
        }
        function P(N) {
          if (
            n.hash !== N &&
            r &&
            r.pushState &&
            !(Ur.env.chrome && n.protocol === "file:")
          ) {
            var I = r.state && r.state.hash;
            I !== N && r.pushState({ hash: N }, "", N);
          }
        }
        function O(N, I) {
          var L = i.scrollTop(),
            U = F(N);
          if (L !== U) {
            var q = V(N, L, U),
              te = Date.now(),
              Y = function () {
                var se = Date.now() - te;
                window.scroll(0, X(L, U, se, q)),
                  se <= q ? a(Y) : typeof I == "function" && I();
              };
            a(Y);
          }
        }
        function F(N) {
          var I = e(c),
            L = I.css("position") === "fixed" ? I.outerHeight() : 0,
            U = N.offset().top - L;
          if (N.data("scroll") === "mid") {
            var q = i.height() - L,
              te = N.outerHeight();
            te < q && (U -= Math.round((q - te) / 2));
          }
          return U;
        }
        function V(N, I, L) {
          if (S()) return 0;
          var U = 1;
          return (
            s.add(N).each(function (q, te) {
              var Y = parseFloat(te.getAttribute("data-scroll-time"));
              !isNaN(Y) && Y >= 0 && (U = Y);
            }),
            (472.143 * Math.log(Math.abs(I - L) + 125) - 2e3) * U
          );
        }
        function X(N, I, L, U) {
          return L > U ? I : N + (I - N) * k(L / U);
        }
        function k(N) {
          return N < 0.5
            ? 4 * N * N * N
            : (N - 1) * (2 * N - 2) * (2 * N - 2) + 1;
        }
        function Z() {
          var { WF_CLICK_EMPTY: N, WF_CLICK_SCROLL: I } = t;
          o.on(I, p, R),
            o.on(N, g, function (L) {
              L.preventDefault();
            }),
            document.head.insertBefore(h, document.head.firstChild);
        }
        return { ready: Z };
      })
    );
  });
  var CE = f((TV, RE) => {
    "use strict";
    var hF = ze();
    hF.define(
      "touch",
      (RE.exports = function (e) {
        var t = {},
          n = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new r(o) : null
            );
          });
        function r(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            c,
            g;
          o.addEventListener("touchstart", p, !1),
            o.addEventListener("touchmove", d, !1),
            o.addEventListener("touchend", h, !1),
            o.addEventListener("touchcancel", v, !1),
            o.addEventListener("mousedown", p, !1),
            o.addEventListener("mousemove", d, !1),
            o.addEventListener("mouseup", h, !1),
            o.addEventListener("mouseout", v, !1);
          function p(T) {
            var y = T.touches;
            (y && y.length > 1) ||
              ((s = !0),
              y ? ((a = !0), (c = y[0].clientX)) : (c = T.clientX),
              (g = c));
          }
          function d(T) {
            if (s) {
              if (a && T.type === "mousemove") {
                T.preventDefault(), T.stopPropagation();
                return;
              }
              var y = T.touches,
                S = y ? y[0].clientX : T.clientX,
                A = S - g;
              (g = S),
                Math.abs(A) > u &&
                  n &&
                  String(n()) === "" &&
                  (i("swipe", T, { direction: A > 0 ? "right" : "left" }), v());
            }
          }
          function h(T) {
            if (s && ((s = !1), a && T.type === "mouseup")) {
              T.preventDefault(), T.stopPropagation(), (a = !1);
              return;
            }
          }
          function v() {
            s = !1;
          }
          function m() {
            o.removeEventListener("touchstart", p, !1),
              o.removeEventListener("touchmove", d, !1),
              o.removeEventListener("touchend", h, !1),
              o.removeEventListener("touchcancel", v, !1),
              o.removeEventListener("mousedown", p, !1),
              o.removeEventListener("mousemove", d, !1),
              o.removeEventListener("mouseup", h, !1),
              o.removeEventListener("mouseout", v, !1),
              (o = null);
          }
          this.destroy = m;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var PE = f((aa) => {
    "use strict";
    Object.defineProperty(aa, "__esModule", { value: !0 });
    Object.defineProperty(aa, "default", {
      enumerable: !0,
      get: function () {
        return EF;
      },
    });
    function EF(e, t, n, r, i, o, s, a, u, c, g, p, d) {
      return function (h) {
        e(h);
        var v = h.form,
          m = {
            name: v.attr("data-name") || v.attr("name") || "Untitled Form",
            pageId: v.attr("data-wf-page-id") || "",
            elementId: v.attr("data-wf-element-id") || "",
            source: t.href,
            test: n.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              v.html()
            ),
            trackingCookies: r(),
          };
        let T = v.attr("data-wf-flow");
        T && (m.wfFlow = T), i(h);
        var y = o(v, m.fields);
        if (y) return s(y);
        if (((m.fileUploads = a(v)), u(h), !c)) {
          g(h);
          return;
        }
        p.ajax({
          url: d,
          type: "POST",
          data: m,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (S) {
            S && S.code === 200 && (h.success = !0), g(h);
          })
          .fail(function () {
            g(h);
          });
      };
    }
  });
  var NE = f((AV, LE) => {
    "use strict";
    var kr = ze(),
      yF = (e, t, n, r) => {
        let i = document.createElement("div");
        t.appendChild(i),
          turnstile.render(i, {
            sitekey: e,
            callback: function (o) {
              n(o);
            },
            "error-callback": function () {
              r();
            },
          });
      };
    kr.define(
      "forms",
      (LE.exports = function (e, t) {
        let n = "TURNSTILE_LOADED";
        var r = {},
          i = e(document),
          o,
          s = window.location,
          a = window.XDomainRequest && !window.atob,
          u = ".w-form",
          c,
          g = /e(-)?mail/i,
          p = /^\S+@\S+$/,
          d = window.alert,
          h = kr.env(),
          v,
          m,
          T;
        let y = i.find("[data-turnstile-sitekey]").data("turnstile-sitekey"),
          S;
        var A = /list-manage[1-9]?.com/i,
          R = t.debounce(function () {
            d(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              O(), P(), !h && !v && V();
            };
        function P() {
          (c = e("html").attr("data-wf-site")),
            (m = "https://webflow.com/api/v1/form/" + c),
            a &&
              m.indexOf("https://webflow.com") >= 0 &&
              (m = m.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (T = `${m}/signFile`),
            (o = e(u + " form")),
            o.length && o.each(F);
        }
        function O() {
          y &&
            ((S = document.createElement("script")),
            (S.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"),
            document.head.appendChild(S),
            (S.onload = () => {
              i.trigger(n);
            }));
        }
        function F(x, G) {
          var W = e(G),
            D = e.data(G, u);
          D || (D = e.data(G, u, { form: W })), X(D);
          var ee = W.closest("div.w-form");
          (D.done = ee.find("> .w-form-done")),
            (D.fail = ee.find("> .w-form-fail")),
            (D.fileUploads = ee.find(".w-file-upload")),
            D.fileUploads.each(function (j) {
              Ie(j, D);
            }),
            y &&
              ((D.wait = !1),
              k(D),
              i.on(typeof turnstile < "u" ? "ready" : n, function () {
                yF(
                  y,
                  G,
                  (j) => {
                    (D.turnstileToken = j), X(D);
                  },
                  () => {
                    k(D);
                  }
                );
              }));
          var ne =
            D.form.attr("aria-label") || D.form.attr("data-name") || "Form";
          D.done.attr("aria-label") || D.form.attr("aria-label", ne),
            D.done.attr("tabindex", "-1"),
            D.done.attr("role", "region"),
            D.done.attr("aria-label") ||
              D.done.attr("aria-label", ne + " success"),
            D.fail.attr("tabindex", "-1"),
            D.fail.attr("role", "region"),
            D.fail.attr("aria-label") ||
              D.fail.attr("aria-label", ne + " failure");
          var ie = (D.action = W.attr("action"));
          if (
            ((D.handler = null),
            (D.redirect = W.attr("data-redirect")),
            A.test(ie))
          ) {
            D.handler = te;
            return;
          }
          if (!ie) {
            if (c) {
              D.handler = (() => {
                let j = PE().default;
                return j(X, s, kr, L, se, Z, d, N, k, c, Y, e, m);
              })();
              return;
            }
            R();
          }
        }
        function V() {
          (v = !0),
            i.on("submit", u + " form", function (j) {
              var K = e.data(this, u);
              K.handler && ((K.evt = j), K.handler(K));
            });
          let x = ".w-checkbox-input",
            G = ".w-radio-input",
            W = "w--redirected-checked",
            D = "w--redirected-focus",
            ee = "w--redirected-focus-visible",
            ne = ":focus-visible, [data-wf-focus-visible]",
            ie = [
              ["checkbox", x],
              ["radio", G],
            ];
          i.on(
            "change",
            u + ' form input[type="checkbox"]:not(' + x + ")",
            (j) => {
              e(j.target).siblings(x).toggleClass(W);
            }
          ),
            i.on("change", u + ' form input[type="radio"]', (j) => {
              e(`input[name="${j.target.name}"]:not(${x})`).map((ge, vt) =>
                e(vt).siblings(G).removeClass(W)
              );
              let K = e(j.target);
              K.hasClass("w-radio-input") || K.siblings(G).addClass(W);
            }),
            ie.forEach(([j, K]) => {
              i.on(
                "focus",
                u + ` form input[type="${j}"]:not(` + K + ")",
                (ge) => {
                  e(ge.target).siblings(K).addClass(D),
                    e(ge.target).filter(ne).siblings(K).addClass(ee);
                }
              ),
                i.on(
                  "blur",
                  u + ` form input[type="${j}"]:not(` + K + ")",
                  (ge) => {
                    e(ge.target).siblings(K).removeClass(`${D} ${ee}`);
                  }
                );
            });
        }
        function X(x) {
          var G = (x.btn = x.form.find(':input[type="submit"]'));
          (x.wait = x.btn.attr("data-wait") || null),
            (x.success = !1),
            G.prop("disabled", !!(y && !x.turnstileToken)),
            x.label && G.val(x.label);
        }
        function k(x) {
          var G = x.btn,
            W = x.wait;
          G.prop("disabled", !0), W && ((x.label = G.val()), G.val(W));
        }
        function Z(x, G) {
          var W = null;
          return (
            (G = G || {}),
            x
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (D, ee) {
                var ne = e(ee),
                  ie = ne.attr("type"),
                  j =
                    ne.attr("data-name") ||
                    ne.attr("name") ||
                    "Field " + (D + 1);
                j = encodeURIComponent(j);
                var K = ne.val();
                if (ie === "checkbox") K = ne.is(":checked");
                else if (ie === "radio") {
                  if (G[j] === null || typeof G[j] == "string") return;
                  K =
                    x
                      .find('input[name="' + ne.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof K == "string" && (K = e.trim(K)),
                  (G[j] = K),
                  (W = W || U(ne, ie, j, K));
              }),
            W
          );
        }
        function N(x) {
          var G = {};
          return (
            x.find(':input[type="file"]').each(function (W, D) {
              var ee = e(D),
                ne =
                  ee.attr("data-name") || ee.attr("name") || "File " + (W + 1),
                ie = ee.attr("data-value");
              typeof ie == "string" && (ie = e.trim(ie)), (G[ne] = ie);
            }),
            G
          );
        }
        let I = { _mkto_trk: "marketo" };
        function L() {
          return document.cookie.split("; ").reduce(function (G, W) {
            let D = W.split("="),
              ee = D[0];
            if (ee in I) {
              let ne = I[ee],
                ie = D.slice(1).join("=");
              G[ne] = ie;
            }
            return G;
          }, {});
        }
        function U(x, G, W, D) {
          var ee = null;
          return (
            G === "password"
              ? (ee = "Passwords cannot be submitted.")
              : x.attr("required")
              ? D
                ? g.test(x.attr("type")) &&
                  (p.test(D) ||
                    (ee = "Please enter a valid email address for: " + W))
                : (ee = "Please fill out the required field: " + W)
              : W === "g-recaptcha-response" &&
                !D &&
                (ee = "Please confirm you\u2019re not a robot."),
            ee
          );
        }
        function q(x) {
          se(x), Y(x);
        }
        function te(x) {
          X(x);
          var G = x.form,
            W = {};
          if (/^https/.test(s.href) && !/^https/.test(x.action)) {
            G.attr("method", "post");
            return;
          }
          se(x);
          var D = Z(G, W);
          if (D) return d(D);
          k(x);
          var ee;
          t.each(W, function (K, ge) {
            g.test(ge) && (W.EMAIL = K),
              /^((full[ _-]?)?name)$/i.test(ge) && (ee = K),
              /^(first[ _-]?name)$/i.test(ge) && (W.FNAME = K),
              /^(last[ _-]?name)$/i.test(ge) && (W.LNAME = K);
          }),
            ee &&
              !W.FNAME &&
              ((ee = ee.split(" ")),
              (W.FNAME = ee[0]),
              (W.LNAME = W.LNAME || ee[1]));
          var ne = x.action.replace("/post?", "/post-json?") + "&c=?",
            ie = ne.indexOf("u=") + 2;
          ie = ne.substring(ie, ne.indexOf("&", ie));
          var j = ne.indexOf("id=") + 3;
          (j = ne.substring(j, ne.indexOf("&", j))),
            (W["b_" + ie + "_" + j] = ""),
            e
              .ajax({ url: ne, data: W, dataType: "jsonp" })
              .done(function (K) {
                (x.success = K.result === "success" || /already/.test(K.msg)),
                  x.success || console.info("MailChimp error: " + K.msg),
                  Y(x);
              })
              .fail(function () {
                Y(x);
              });
        }
        function Y(x) {
          var G = x.form,
            W = x.redirect,
            D = x.success;
          if (D && W) {
            kr.location(W);
            return;
          }
          x.done.toggle(D),
            x.fail.toggle(!D),
            D ? x.done.focus() : x.fail.focus(),
            G.toggle(!D),
            X(x);
        }
        function se(x) {
          x.evt && x.evt.preventDefault(), (x.evt = null);
        }
        function Ie(x, G) {
          if (!G.fileUploads || !G.fileUploads[x]) return;
          var W,
            D = e(G.fileUploads[x]),
            ee = D.find("> .w-file-upload-default"),
            ne = D.find("> .w-file-upload-uploading"),
            ie = D.find("> .w-file-upload-success"),
            j = D.find("> .w-file-upload-error"),
            K = ee.find(".w-file-upload-input"),
            ge = ee.find(".w-file-upload-label"),
            vt = ge.children(),
            it = j.find(".w-file-upload-error-msg"),
            Be = ie.find(".w-file-upload-file"),
            wn = ie.find(".w-file-remove-link"),
            Yt = Be.find(".w-file-upload-file-name"),
            l = it.attr("data-w-size-error"),
            E = it.attr("data-w-type-error"),
            _ = it.attr("data-w-generic-error");
          if (
            (h ||
              ge.on("click keydown", function (H) {
                (H.type === "keydown" && H.which !== 13 && H.which !== 32) ||
                  (H.preventDefault(), K.click());
              }),
            ge.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            wn.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            h)
          )
            K.on("click", function (H) {
              H.preventDefault();
            }),
              ge.on("click", function (H) {
                H.preventDefault();
              }),
              vt.on("click", function (H) {
                H.preventDefault();
              });
          else {
            wn.on("click keydown", function (H) {
              if (H.type === "keydown") {
                if (H.which !== 13 && H.which !== 32) return;
                H.preventDefault();
              }
              K.removeAttr("data-value"),
                K.val(""),
                Yt.html(""),
                ee.toggle(!0),
                ie.toggle(!1),
                ge.focus();
            }),
              K.on("change", function (H) {
                (W = H.target && H.target.files && H.target.files[0]),
                  W &&
                    (ee.toggle(!1),
                    j.toggle(!1),
                    ne.toggle(!0),
                    ne.focus(),
                    Yt.text(W.name),
                    Q() || k(G),
                    (G.fileUploads[x].uploading = !0),
                    ke(W, w));
              });
            var b = ge.outerHeight();
            K.height(b), K.width(1);
          }
          function C(H) {
            var M = H.responseJSON && H.responseJSON.msg,
              J = _;
            typeof M == "string" && M.indexOf("InvalidFileTypeError") === 0
              ? (J = E)
              : typeof M == "string" &&
                M.indexOf("MaxFileSizeError") === 0 &&
                (J = l),
              it.text(J),
              K.removeAttr("data-value"),
              K.val(""),
              ne.toggle(!1),
              ee.toggle(!0),
              j.toggle(!0),
              j.focus(),
              (G.fileUploads[x].uploading = !1),
              Q() || X(G);
          }
          function w(H, M) {
            if (H) return C(H);
            var J = M.fileName,
              re = M.postData,
              he = M.fileId,
              Le = M.s3Url;
            K.attr("data-value", he), me(Le, re, W, J, B);
          }
          function B(H) {
            if (H) return C(H);
            ne.toggle(!1),
              ie.css("display", "inline-block"),
              ie.focus(),
              (G.fileUploads[x].uploading = !1),
              Q() || X(G);
          }
          function Q() {
            var H = (G.fileUploads && G.fileUploads.toArray()) || [];
            return H.some(function (M) {
              return M.uploading;
            });
          }
        }
        function ke(x, G) {
          var W = new URLSearchParams({ name: x.name, size: x.size });
          e.ajax({ type: "GET", url: `${T}?${W}`, crossDomain: !0 })
            .done(function (D) {
              G(null, D);
            })
            .fail(function (D) {
              G(D);
            });
        }
        function me(x, G, W, D, ee) {
          var ne = new FormData();
          for (var ie in G) ne.append(ie, G[ie]);
          ne.append("file", W, D),
            e
              .ajax({
                type: "POST",
                url: x,
                data: ne,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                ee(null);
              })
              .fail(function (j) {
                ee(j);
              });
        }
        return r;
      })
    );
  });
  ua();
  ca();
  Ta();
  Aa();
  wa();
  Ra();
  Fa();
  AE();
  wE();
  xE();
  CE();
  NE();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|75d1cb73-5482-a4b1-c633-58b165bf6f53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|75d1cb73-5482-a4b1-c633-58b165bf6f53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708634871530,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|75d1cb73-5482-a4b1-c633-58b165bf6f53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|75d1cb73-5482-a4b1-c633-58b165bf6f53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708634871530,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|652432e246a62d13320e3077",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|652432e246a62d13320e3077",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708640342204,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-12",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65d937aab1e5669c24c17d03|f933ec93-7772-e94c-c2de-2d178324a0ec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65d937aab1e5669c24c17d03|f933ec93-7772-e94c-c2de-2d178324a0ec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708734416029,
    },
    "e-12": {
      id: "e-12",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-11",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65d937aab1e5669c24c17d03|f933ec93-7772-e94c-c2de-2d178324a0ec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65d937aab1e5669c24c17d03|f933ec93-7772-e94c-c2de-2d178324a0ec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708734416029,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65d937aab1e5669c24c17d03|65d937aab1e5669c24c17d08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65d937aab1e5669c24c17d03|65d937aab1e5669c24c17d08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708736277664,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916159629,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-15",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916159630,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916185518,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916185552,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-20",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235394,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-19",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235394,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235394,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-21",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235394,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235956,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-23",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235956,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235956,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916235956,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236420,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-27",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236420,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236420,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236420,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236740,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236740,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-34",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236740,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-33",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1708916236740,
    },
    "e-39": {
      id: "e-39",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-40",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|df2ca8f6-2f62-dc06-1b6d-3df986682a91",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|df2ca8f6-2f62-dc06-1b6d-3df986682a91",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709072301529,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-39",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|df2ca8f6-2f62-dc06-1b6d-3df986682a91",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|df2ca8f6-2f62-dc06-1b6d-3df986682a91",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709072301529,
    },
    "e-43": {
      id: "e-43",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-44",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|9c1bc16c-eeab-8b64-3e8d-b8ebec4a17a1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|9c1bc16c-eeab-8b64-3e8d-b8ebec4a17a1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709277894294,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-46" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|9c0091ac-7c5d-c778-79f6-b499e054e3d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|9c0091ac-7c5d-c778-79f6-b499e054e3d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380637584,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-48" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|1b23ace6-97a5-343c-8593-b986d95d1239",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|1b23ace6-97a5-343c-8593-b986d95d1239",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380677814,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-50" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|807369e7-07e2-7d77-7f2f-785f8528340d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|807369e7-07e2-7d77-7f2f-785f8528340d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380694195,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-52" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|fcffdfa0-a4a6-feef-f103-352a7caadcf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|fcffdfa0-a4a6-feef-f103-352a7caadcf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380703030,
    },
    "e-53": {
      id: "e-53",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-54" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|b9fdf55c-59d6-b6dd-e90c-c1b07ba8a2cb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|b9fdf55c-59d6-b6dd-e90c-c1b07ba8a2cb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380712663,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-56" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|ec4c58c7-98d0-3b42-f86f-8483a456d4b0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|ec4c58c7-98d0-3b42-f86f-8483a456d4b0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380730762,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-58" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".div-block-4",
        originalId:
          "652432e246a62d13320e3074|63cd8c52-59d2-cb9b-e5b3-417a13963cf6",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".div-block-4",
          originalId:
            "652432e246a62d13320e3074|63cd8c52-59d2-cb9b-e5b3-417a13963cf6",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380857361,
    },
    "e-59": {
      id: "e-59",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-60" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|eb7c8b06-f029-632a-f74f-903999f070b6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|eb7c8b06-f029-632a-f74f-903999f070b6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709380887995,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-62" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|6aae4c28-b45d-7c0e-cc31-9de0662bb9d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|6aae4c28-b45d-7c0e-cc31-9de0662bb9d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709380900075,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-64" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|cb534f2c-fa9b-3c93-f57e-6b256ca70218",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|cb534f2c-fa9b-3c93-f57e-6b256ca70218",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709380912960,
    },
    "e-65": {
      id: "e-65",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-66" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|45fee35d-e2a0-ae77-4148-225c0a6a51f0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|45fee35d-e2a0-ae77-4148-225c0a6a51f0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380931528,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-68" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|45fee35d-e2a0-ae77-4148-225c0a6a51f8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|45fee35d-e2a0-ae77-4148-225c0a6a51f8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380940769,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-70" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|45fee35d-e2a0-ae77-4148-225c0a6a5200",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|45fee35d-e2a0-ae77-4148-225c0a6a5200",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709380948920,
    },
    "e-75": {
      id: "e-75",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-76" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|6e16642d-31af-8581-3169-fdfd4f30076b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|6e16642d-31af-8581-3169-fdfd4f30076b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709380983842,
    },
    "e-77": {
      id: "e-77",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-78" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|053cc013-5e91-5970-7e8a-a62387ee09e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|053cc013-5e91-5970-7e8a-a62387ee09e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709381003475,
    },
    "e-79": {
      id: "e-79",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-80" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|990f45d7-bf1c-0029-9d2b-19049b8774a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709381022090,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-82" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0a6a311b-0701-40a1-b99d-7f00be5b4cdf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709381030774,
    },
    "e-83": {
      id: "e-83",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-84" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|739a9a78-6f84-a048-f85f-a7cfd908d6d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709381039868,
    },
    "e-85": {
      id: "e-85",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-86" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0055dc3e-e134-85b6-79e9-879b5780070d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709381049007,
    },
    "e-87": {
      id: "e-87",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-88" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|c9c94f29-e80e-b0c8-b6ad-bc58c7375cc2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709381064845,
    },
    "e-89": {
      id: "e-89",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-90" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|7b2969bb-367f-c7d2-b045-bcf5a60e7bd4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|7b2969bb-367f-c7d2-b045-bcf5a60e7bd4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709381076921,
    },
    "e-91": {
      id: "e-91",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-92" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|65700824-11df-46de-0028-f87010b5be32",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|65700824-11df-46de-0028-f87010b5be32",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709381082942,
    },
    "e-93": {
      id: "e-93",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-94" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|4c31fd7e-bd78-977c-b8be-022dcb126e17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|4c31fd7e-bd78-977c-b8be-022dcb126e17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709381113661,
    },
    "e-95": {
      id: "e-95",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-96" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|0f43532d-c59b-7642-bc4e-8249de8da0e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|0f43532d-c59b-7642-bc4e-8249de8da0e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709381120307,
    },
    "e-97": {
      id: "e-97",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-98" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|e36b35df-ebbe-1071-4306-8db507e7876a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|e36b35df-ebbe-1071-4306-8db507e7876a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709381129853,
    },
    "e-99": {
      id: "e-99",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-100" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|f46ee446-ce45-8bb2-adaa-5ff65dcd4f31",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|f46ee446-ce45-8bb2-adaa-5ff65dcd4f31",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709381138060,
    },
    "e-119": {
      id: "e-119",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-120" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|261154bc-68ff-dd33-4498-bcfb61aebbea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|261154bc-68ff-dd33-4498-bcfb61aebbea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709735005923,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-122" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|261154bc-68ff-dd33-4498-bcfb61aebbf0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|261154bc-68ff-dd33-4498-bcfb61aebbf0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709735005923,
    },
    "e-129": {
      id: "e-129",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-130" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|261154bc-68ff-dd33-4498-bcfb61aebc08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|261154bc-68ff-dd33-4498-bcfb61aebc08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1709735005923,
    },
    "e-131": {
      id: "e-131",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-132" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|dc4d5c71-497c-7fe1-4b8b-a8b81df71706",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|dc4d5c71-497c-7fe1-4b8b-a8b81df71706",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709735228429,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-134" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|dc4d5c71-497c-7fe1-4b8b-a8b81df7170d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|dc4d5c71-497c-7fe1-4b8b-a8b81df7170d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709735228429,
    },
    "e-135": {
      id: "e-135",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-136" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|dc4d5c71-497c-7fe1-4b8b-a8b81df71714",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|dc4d5c71-497c-7fe1-4b8b-a8b81df71714",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1709735228429,
    },
    "e-151": {
      id: "e-151",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-152",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button-nodes",
        originalId:
          "65e99266481a9b4db851c233|46f9fd21-4e05-ca55-bcb4-412b18d0b91a",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button-nodes",
          originalId:
            "65e99266481a9b4db851c233|46f9fd21-4e05-ca55-bcb4-412b18d0b91a",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712235704553,
    },
    "e-155": {
      id: "e-155",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-156" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d42",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d42",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713259330627,
    },
    "e-157": {
      id: "e-157",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-158" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d48",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d48",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713259330627,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-160" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d4e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d4e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713259330627,
    },
    "e-161": {
      id: "e-161",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-162" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713259330627,
    },
    "e-163": {
      id: "e-163",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-164" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d5a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d5a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713259330627,
    },
    "e-165": {
      id: "e-165",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-166" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d60",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|7d2c0a72-3943-a172-014e-cfb105d15d60",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713259330627,
    },
    "e-173": {
      id: "e-173",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-174" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".team-card",
        originalId:
          "652432e246a62d13320e3074|35fa5f02-3498-184f-4ea9-d1a58ab66b77",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".team-card",
          originalId:
            "652432e246a62d13320e3074|35fa5f02-3498-184f-4ea9-d1a58ab66b77",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1713264084730,
    },
    "e-175": {
      id: "e-175",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-176",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|62c323e3-d552-39c1-cd7a-53d3e7dea385",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|62c323e3-d552-39c1-cd7a-53d3e7dea385",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713459623640,
    },
    "e-176": {
      id: "e-176",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-175",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e5baa93c69897885b46b1c|62c323e3-d552-39c1-cd7a-53d3e7dea385",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e5baa93c69897885b46b1c|62c323e3-d552-39c1-cd7a-53d3e7dea385",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713459623640,
    },
    "e-177": {
      id: "e-177",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-178",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99266481a9b4db851c233|e1c15fe5-2ef8-4a22-f88f-260eff27bffb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99266481a9b4db851c233|e1c15fe5-2ef8-4a22-f88f-260eff27bffb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713459719549,
    },
    "e-178": {
      id: "e-178",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-177",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99266481a9b4db851c233|e1c15fe5-2ef8-4a22-f88f-260eff27bffb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99266481a9b4db851c233|e1c15fe5-2ef8-4a22-f88f-260eff27bffb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713459719549,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-180",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|9671a8fe-a81a-ecb1-4131-e8a348214baa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|9671a8fe-a81a-ecb1-4131-e8a348214baa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713461598143,
    },
    "e-180": {
      id: "e-180",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-179",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6615505050cbd80e62173a16|9671a8fe-a81a-ecb1-4131-e8a348214baa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6615505050cbd80e62173a16|9671a8fe-a81a-ecb1-4131-e8a348214baa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713461598143,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-182" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|adcd7662-4e6f-4106-68c6-3a87b5102740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|adcd7662-4e6f-4106-68c6-3a87b5102740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1719664286647,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-184",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "668d26aa04b49440b6aad928|3405e37b-765f-e55e-58e9-db94a8894619",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "668d26aa04b49440b6aad928|3405e37b-765f-e55e-58e9-db94a8894619",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720608961842,
    },
    "e-184": {
      id: "e-184",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-183",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "668d26aa04b49440b6aad928|3405e37b-765f-e55e-58e9-db94a8894619",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "668d26aa04b49440b6aad928|3405e37b-765f-e55e-58e9-db94a8894619",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720608961842,
    },
    "e-189": {
      id: "e-189",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-190",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "668d26aa04b49440b6aad928|b4acd9ea-851a-f26d-c5be-51e29537593a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "668d26aa04b49440b6aad928|b4acd9ea-851a-f26d-c5be-51e29537593a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721136228695,
    },
    "e-233": {
      id: "e-233",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-234",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|721dd588-1c3d-9c3c-fca6-682e5acc895a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|721dd588-1c3d-9c3c-fca6-682e5acc895a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1724313834586,
    },
    "e-247": {
      id: "e-247",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-248",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|606303a4-4173-48e1-1af2-452b9aedc862",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|606303a4-4173-48e1-1af2-452b9aedc862",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1725197489061,
    },
    "e-251": {
      id: "e-251",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-252",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "668d26aa04b49440b6aad928|af4b4d8e-87f2-63f7-8c4f-38ad036548ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "668d26aa04b49440b6aad928|af4b4d8e-87f2-63f7-8c4f-38ad036548ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1725365812701,
    },
    "e-253": {
      id: "e-253",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-254",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|293e6c71-ec06-299c-9606-e0e3a09dc978",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|293e6c71-ec06-299c-9606-e0e3a09dc978",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1725623707747,
    },
    "e-281": {
      id: "e-281",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-282",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|3b950585-d27f-36fe-922e-1b5fd49672a0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|3b950585-d27f-36fe-922e-1b5fd49672a0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1726581734514,
    },
    "e-299": {
      id: "e-299",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-300",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|7ba2cb3a-d91f-9622-61fc-1ff29b2f8e3f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|7ba2cb3a-d91f-9622-61fc-1ff29b2f8e3f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1727437478692,
    },
    "e-301": {
      id: "e-301",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-302",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|fbaba985-ae27-ca2b-0667-51c8a4b4c615",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|fbaba985-ae27-ca2b-0667-51c8a4b4c615",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1727437485835,
    },
    "e-303": {
      id: "e-303",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-304",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|dc50d7d0-0db5-a6b1-a73b-7c5baaa89481",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|dc50d7d0-0db5-a6b1-a73b-7c5baaa89481",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1727437525155,
    },
    "e-307": {
      id: "e-307",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-308",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|0fc747e6-44ab-4725-518a-713480a2c289",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|0fc747e6-44ab-4725-518a-713480a2c289",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1727701868817,
    },
    "e-319": {
      id: "e-319",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-320" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652432e246a62d13320e3074|796de2f2-f0d9-4591-1d76-fdafa63ed26e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652432e246a62d13320e3074|796de2f2-f0d9-4591-1d76-fdafa63ed26e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1727866416145,
    },
    "e-327": {
      id: "e-327",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-328",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|546b7f17-eefd-fe12-af67-5f20d77978ad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|546b7f17-eefd-fe12-af67-5f20d77978ad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1727869435138,
    },
    "e-331": {
      id: "e-331",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-332",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|090d9acf-d96e-c2dd-8a1a-45a626e2e3c4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|090d9acf-d96e-c2dd-8a1a-45a626e2e3c4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728050355946,
    },
    "e-333": {
      id: "e-333",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-334",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|8e909d3c-e8d2-ffbd-d73f-7fa2d162de6d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|8e909d3c-e8d2-ffbd-d73f-7fa2d162de6d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728050363706,
    },
    "e-347": {
      id: "e-347",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-348",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|702cc6e4-b60c-93b1-1391-e7f9de64fd61",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|702cc6e4-b60c-93b1-1391-e7f9de64fd61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728562741594,
    },
    "e-351": {
      id: "e-351",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-352",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|a7a03c03-b7d4-6d41-5dad-5bfe95e4cd1e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|a7a03c03-b7d4-6d41-5dad-5bfe95e4cd1e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728903402585,
    },
    "e-353": {
      id: "e-353",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-354",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|0b1334dd-d892-9b50-26c9-75fb5f6624d9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|0b1334dd-d892-9b50-26c9-75fb5f6624d9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728903413508,
    },
    "e-361": {
      id: "e-361",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-362",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|92afc22a-c7ba-e21d-8d6c-7248a4e281dc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|92afc22a-c7ba-e21d-8d6c-7248a4e281dc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1729769697120,
    },
    "e-363": {
      id: "e-363",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-364",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|cb2be428-5d52-a81c-8745-fc805be1b64b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|cb2be428-5d52-a81c-8745-fc805be1b64b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1729769699807,
    },
    "e-367": {
      id: "e-367",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-368",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|73d58752-6650-a0f3-6f7f-e6c41d0dc077",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|73d58752-6650-a0f3-6f7f-e6c41d0dc077",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1730126007516,
    },
    "e-369": {
      id: "e-369",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-370",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|bc9e94d5-5833-ee46-0f61-a932368c6a52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|bc9e94d5-5833-ee46-0f61-a932368c6a52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1730126009785,
    },
    "e-371": {
      id: "e-371",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-372",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|0db32ee2-755e-0ce0-2428-52e3f787214a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|0db32ee2-755e-0ce0-2428-52e3f787214a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1730126017076,
    },
    "e-375": {
      id: "e-375",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-376",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|39d34fa4-0373-61a9-40c2-fbb96109e77f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|39d34fa4-0373-61a9-40c2-fbb96109e77f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1730371777958,
    },
    "e-381": {
      id: "e-381",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-382",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|f2ccd313-b384-b623-2117-3ee59673f813",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|f2ccd313-b384-b623-2117-3ee59673f813",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1730371796013,
    },
    "e-383": {
      id: "e-383",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-384",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|cfd5cfd2-0048-2a4c-6e49-17eadbcf9270",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|cfd5cfd2-0048-2a4c-6e49-17eadbcf9270",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731846439184,
    },
    "e-385": {
      id: "e-385",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-386",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|968199be-9219-b99f-1bf7-e09a0f857025",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|968199be-9219-b99f-1bf7-e09a0f857025",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731846442362,
    },
    "e-387": {
      id: "e-387",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-388",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65de5f7d8d88cda0a9ed134c|a0ccbb78-489b-6720-caf5-984ba7202049",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65de5f7d8d88cda0a9ed134c|a0ccbb78-489b-6720-caf5-984ba7202049",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731846451052,
    },
  },
  actionLists: {
    "a-4": {
      id: "a-4",
      title: "mobile-menu-open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                widthValue: 100,
                heightValue: 0,
                widthUnit: "%",
                heightUnit: "%",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                widthValue: 100,
                heightValue: 100,
                widthUnit: "%",
                heightUnit: "vh",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708634882994,
    },
    "a-5": {
      id: "a-5",
      title: "mobile-menu-close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708634935569,
    },
    "a-6": {
      id: "a-6",
      title: "mobile-menu-close-2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile-menu",
                  selectorGuids: ["721288a0-57fd-5975-ab11-074678a462ac"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708640349627,
    },
    "a-10": {
      id: "a-10",
      title: "faq-open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer",
                  selectorGuids: ["0357d1c2-fc97-b1b9-3a32-d61e11dbe955"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708916897596,
    },
    "a-11": {
      id: "a-11",
      title: "faq-close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer",
                  selectorGuids: ["0357d1c2-fc97-b1b9-3a32-d61e11dbe955"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708916946803,
    },
    "a-8": {
      id: "a-8",
      title: "faq-hover-on",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-heading",
                  selectorGuids: ["98016f20-f427-3115-6ed3-bea539fd42c6"],
                },
                globalSwatchId: "",
                rValue: 47,
                bValue: 254,
                gValue: 66,
                aValue: 1,
              },
            },
            {
              id: "a-8-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".image-5",
                  selectorGuids: ["6915f6c0-0b48-408a-8f56-27ab7882937b"],
                },
                xValue: 0.8,
                yValue: 0.8,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708916473597,
    },
    "a-9": {
      id: "a-9",
      title: "faq-hover-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-heading",
                  selectorGuids: ["98016f20-f427-3115-6ed3-bea539fd42c6"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-9-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".image-5",
                  selectorGuids: ["6915f6c0-0b48-408a-8f56-27ab7882937b"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708916539564,
    },
    "a-16": {
      id: "a-16",
      title: "close-form",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".node-form-wrapper",
                  selectorGuids: ["dda1a2f2-7c1c-3429-22f0-e0672122b10c"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-16-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".page-wrapper",
                  selectorGuids: ["7c8f5397-18c6-ede2-b41e-0e272ac0f402"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-16-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".node-form-wrapper",
                  selectorGuids: ["dda1a2f2-7c1c-3429-22f0-e0672122b10c"],
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".node-form",
                  selectorGuids: ["dec593f7-b068-e962-ebec-e2fc28ceec1c"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1709277536702,
    },
    "a-15": {
      id: "a-15",
      title: "display-form",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".node-form-wrapper",
                  selectorGuids: ["dda1a2f2-7c1c-3429-22f0-e0672122b10c"],
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".page-wrapper",
                  selectorGuids: ["7c8f5397-18c6-ede2-b41e-0e272ac0f402"],
                },
                value: 0.18,
                unit: "",
              },
            },
            {
              id: "a-15-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".node-form-wrapper",
                  selectorGuids: ["dda1a2f2-7c1c-3429-22f0-e0672122b10c"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-15-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".node-form-wrapper",
                  selectorGuids: ["dda1a2f2-7c1c-3429-22f0-e0672122b10c"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-15-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".node-form",
                  selectorGuids: ["dec593f7-b068-e962-ebec-e2fc28ceec1c"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1709277536702,
    },
    "a-12": {
      id: "a-12",
      title: "nodes-open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nodes",
                  selectorGuids: ["c31eb7fd-4580-6f2d-cdbe-370012b5ca1f"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1708973279704,
    },
    slideInLeft: {
      id: "slideInLeft",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: -100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
