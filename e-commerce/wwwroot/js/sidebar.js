! function(a) {
    "use strict";
    var b = {
        initialised: !1,
        version: 1.1,
        mobile: !1,
        responsiveExtra: !1,
        headerClone: !1,
        container: a("#portfolio-item-container"),
        portfolioElAnimation: !0,
        init: function() {
            if (!this.initialised) {
                this.initialised = !0,
                this.checkMobile(),
                this.checkPlaceholder(),
                this.searchInput(),
                this.filterColorBg(),
                this.priceSlider(),
                this.collapseArrows(),
                this.selectBox()
                var a = this;
                "function" == typeof imagesLoaded && imagesLoaded(a.container, function() {
                    a.isotopeActivate(), a.isotopeFilter()
                })
            }
        },
        checkMobile: function() {
            this.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? !0 : !1
        },
        checkPlaceholder: function() {
            a.support.placeholder = function() {
                var a = document.createElement("input");
                return "placeholder" in a
            }(), !a.support.placeholder && a.fn.placeholder && a("input, textarea").placeholder()
        },

        searchInput: function() {
            var b = a(".search-form");
            a(".header-search-btn, .search-close-btn").on("click", function(a) {
                b.hasClass("active") ? b.removeClass("active") : b.addClass("active"), a.preventDefault()
            })
        },
        filterColorBg: function() {
            a(".filter-color-box").each(function() {
                var b = a(this),
                    c = b.data("bgcolor");
                b.css("background-color", c)
            })
        },

        priceSlider: function() {
            a.fn.noUiSlider && a("#price-range").noUiSlider({
                range: [0, 800],
                start: [120, 640],
                handles: 2,
                connect: !0,
                serialization: {
                    to: [a("#price-range-low"), a("#price-range-high")]
                }
            })
        },

        collapseArrows: function() {
            a(".panel").each(function() {
                var b = a(this),
                    c = b.find(".accordion-btn"),
                    d = b.find(".accordion-body");
                c.length && d.on("shown.bs.collapse", function() {
                    c.hasClass("open") || c.addClass("open")
                }).on("hidden.bs.collapse", function() {
                    c.hasClass("open") && c.removeClass("open")
                })
            }), a(".category-widget-btn").on("click", function(b) {
                var c = a(this),
                    d = c.closest("li");
                d.hasClass("open") ? d.find("ul").slideUp(400, function() {
                    d.removeClass("open")
                }) : d.find("ul").slideDown(400, function() {
                    d.addClass("open")
                }), b.preventDefault()
            })
        },
        checkSupport: function(a, b) {
            return a.length && b ? !0 : !1
        },

        selectBox: function() {
            a.fn.selectbox && a(".selectbox").selectbox({
                effect: "fade"
            })
        },

    };
    b.init(), a(window).on("load", function() {

    }), a(window).on("scroll", function() {

    })
}(jQuery);