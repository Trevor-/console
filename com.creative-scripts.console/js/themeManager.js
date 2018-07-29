/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global window, document, CSInterface*/


/*

    Responsible for overwriting CSS at runtime according to CC app
    settings as defined by the end user.

*/

try{
var themeManager = (function() {
    'use strict';

    /**
     * Convert the Color object to string in hexadecimal format;
     * This is needed for the older app 2015 needs 2018 does not
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
        return '#' + hex;
    }

    var stylesheet = document.getElementById("theme");

    var theme, getTheme;

    getTheme = function(skinInfo) {
        var red, themes;
        themes = ['lightLight', 'light', 'dark', 'darkDark'];
        red = skinInfo.panelBackgroundColor.color.red;
        if (red > 200) { return '../css/lightLight.css'; }
        if (red > 122) { return '../css/light.css'; }
        if (red > 60) { return '../css/dark.css'; }
        return '../css/darkDark.css';
    };


    /**
     * Update the theme with the AppSkinInfo retrieved from the host product.
     */
    function updateThemeWithAppSkinInfo(appSkinInfo) {
        if (!appSkinInfo) { return; }
        stylesheet.href = getTheme(appSkinInfo);
        // console.log(appSkinInfo)
        var background = appSkinInfo.panelBackgroundColor.color;
        var colorString = toHex(background);
        // var colorString = `rgba(${background.red},${background.green},${background.blue},${background.alpha})`;
        console.log(colorString)
        var elements = document.querySelectorAll('body, .panel');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorString;
        }

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
}catch(e){console.log(e.stack);}