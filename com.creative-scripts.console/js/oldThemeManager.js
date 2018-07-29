/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global window, document, CSInterface*/


/*

    Responsible for overwriting CSS at runtime according to CC app
    settings as defined by the end user.

*/
var themeManager = (function() {
    'use strict';

    /**
     * Convert the Color object to string in hexadecimal format;
     */
    function toHex(color, delta) {

        function computeValue(value, delta) {
            var computedValue = !isNaN(delta) ? value + delta : value;
            if (computedValue < 0) {
                computedValue = 0;
            } else if (computedValue > 255) {
                computedValue = 255;
            }

            computedValue = Math.floor(computedValue);

            computedValue = computedValue.toString(16);
            return computedValue.length === 1 ? "0" + computedValue : computedValue;
        }

        var hex = "";
        if (color) {
            hex = computeValue(color.red, delta) + computeValue(color.green, delta) + computeValue(color.blue, delta);
        }
        return hex;
    }


    var stylesheet = document.getElementById("hostStyle");
    if (stylesheet) {
        stylesheet = stylesheet.sheet;
    }

    function addRule(selector, rule) {
        if (stylesheet) {
            if (stylesheet.addRule) {
                stylesheet.addRule(selector, rule);
            } else if (stylesheet.insertRule) {
                stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
            }
        }
    }
    var theme, getTheme;

    getTheme = function(skinInfo) {
        var red, themes;
        themes = ['lightLight', 'light', 'dark', 'darkDark'];
        red = skinInfo.panelBackgroundColor.color.red;
        if (red > 200) { return 'lightLight'; }
        if (red > 122) { return 'light'; }
        if (red > 60) { return 'dark'; }
        return 'darkDark';
    };

    theme = {
        lightLight: {
            mainColor: "rgba(56,56,56,255)",
            editTextBackground: "rgba(255,255,255,255)",
            editTextColor: "rgba(56,56,56,255)",
            tooltipBackground: "rgba(109,109,109,255)",
            tooltipColor: "rgba(229,229,229,255)",
            tooltipBoxShadow: "1px 1px 4px 0px rgba(51,51,51,0.75)",
            editTextBorderColor: "rgba(220,220,220,255)",
            buttonHoverBackground: "rgba(189,189,189,255)",
            buttonHoverColor: "#fff",
            buttonActiveBackground: "rgba(189,189,189,255)",
            dropdownHover: "#ddd",
            // dropdownHover: "var(--mainBackground)",
            dropdownSelected: "#666666",
            scrollbarThumb: "#fff",
        },
        light: {
            mainColor: "rgba(0,0,0,255)",
            editTextBackground: "rgba(227,227,227,255)",
            editTextColor: "rgba(35,35,35,255)",
            tooltipBackground: "rgba(73,73,73,255)",
            tooltipColor: "rgba(176,176,176,255)",
            tooltipBoxShadow: "1px 1px 4px 0px rgba(51,51,51,0.75)",
            editTextBorderColor: "rgba(168,168,168,255)",
            buttonHoverBackground: "rgba(196,196,196,255)",
            buttonHoverColor: "#fff",
            buttonActiveBackground: "rgba(71,71,71,255)",
            // dropdownHover: "#bbb",
            dropdownHover: "var(--mainBackground)",
            dropdownSelected: "#666666",
            scrollbarThumb: "rgba(193, 192, 192, 0.6)",
        },
        dark: {
            mainColor: "rgba(225,225,225,255)",
            editTextBackground: "rgba(69,69,69,255)",
            editTextColor: "rgba(250,250,250,255)",
            tooltipBackground: "rgba(200,200,200,255)",
            tooltipColor: "rgba(89,89,89,255)",
            tooltipBoxShadow: "1px 1px 4px 0px rgba(51,51,51,0.75)",
            editTextBorderColor: "rgba(97,97,97,255)",
            buttonHoverBackground: "rgba(196,196,196,255)",
            buttonHoverColor: "#000",
            buttonActiveBackground: "rgba(89,89,89,255)",
            // dropdownHover: "#555",
            dropdownHover: "var(--mainBackground)",
            dropdownSelected: "#666666",
            scrollbarThumb: "rgba(193, 192, 192, 0.6)",
        },
            darkDark: {
            mainColor: "rgba(214,214,214,255)",
            editTextBackground: "rgba(38,38,38,255)",
            editTextColor: "rgba(202,202,202,255)",
            tooltipBackground: "rgba(153,153,153,255)",
            tooltipColor: "rgba(57,57,57,255)",
            tooltipBoxShadow: "1px 1px 4px 0px rgba(51,51,51,0.75)",
            editTextBorderColor: "rgba(62,62,62,255)",
            buttonHoverBackground: "rgba(196,196,196,255)",
            buttonHoverColor: "#000",
            buttonActiveBackground: "rgba(177,177,177,255)",
            dropdownHover: "#444",
            // dropdownHover: "var(--mainBackground)",
            dropdownSelected: "#666666",
            scrollbarThumb: "rgba(193, 192, 192, 0.6)",
        }
    };

    var hostToRgba = function(_var, color) {
        color = color.color;
        document.documentElement.style.setProperty(_var, `rgba(${color.red},${color.green},${color.blue},${color.alpha})`);
    };

    var setVars = function(theme) {
        var _var;
        for (_var in theme) {
            if (theme.hasOwnProperty(_var)) {
                document.documentElement.style.setProperty('--' + _var, theme[_var]);
            }
        }
    };


    /**
     * Update the theme with the AppSkinInfo retrieved from the host product.
     */
    function updateThemeWithAppSkinInfo(appSkinInfo) {
        if (!appSkinInfo) { return }

        hostToRgba('--mainBackground', appSkinInfo.panelBackgroundColor);

        setVars(theme[getTheme(appSkinInfo)]);


        ////////////////////////////////
        // Add you own css rules here //
        ////////////////////////////////
    }


    function onAppThemeColorChanged() {
        var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
        updateThemeWithAppSkinInfo(skinInfo);
    }

    function init() {

        var csInterface = new CSInterface();
        if (!csInterface.hostEnvironment) { return }
        updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
        csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
    }

    return {
        init: init
    };

}());

themeManager.init();