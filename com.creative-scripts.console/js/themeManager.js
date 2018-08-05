/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global window, document, CSInterface*/


/*

    Responsible for overwriting CSS at runtime according to CC app
    settings as defined by the end user.

*/

try {
    var themeManager = (function() {
        'use strict';

        function cssRule(selectorText, prop, value, sheet) {
            var element, sheets, n, l, href, found, cammelProp, dashProp, rules;
            sheets = document.styleSheets;
            if (!sheets.length)
            if (!sheet) { return; }
            // if sheet is a sting if it ends in .css then it's the href else it's the id
            if (sheet.constructor.name === 'String') {
                if ((/\.css$/i).test(sheet)) {
                    for (n = 0; n < sheets.length; n++) {
                        href = sheets[n].href;
                        if (/[^\\\/]+$/.test(href)) {
                            sheet = sheets[n];
                            break;
                        }
                    }
                } else {
                    sheet = document.getElementById(sheet);
                    if (sheet) {
                        sheet = sheet.sheet;
                    }
                }
            }
            if (sheet && sheet.constructor.name === 'CSSStyleSheet') {
                // If selector exists change the rule
                found = false;
                rules = sheet.cssRules;
                l = rules.length;
                cammelProp = prop.replace(/-(\w)/g, function(whole, letter) { return letter.toUpperCase(); });
                for (n = 0; n < l; n++) {
                    if (rules[n].selectorText === selectorText) {
                        found = true;
                        rules[n].style[cammelProp] = value;
                    }
                }
                if (!found) {
                    dashProp = prop.replace(/([A-Z])/g, function(whole, letter) { return '-' + letter.toLowerCase(); });
                    return sheet.insertRule(selectorText + ' {' + dashProp + ' : ' + value + '}', rules.length);
                }
                return true;
            } else { // no stylesheet found
                return false;
            }
        }

        var theme = {
            mainColor: {
                theme: ['#383838', '#000000', '#FFFFFF', '#D6D6D6'],
                rules: [
                { property: 'color', selector: 'body, .panel' },
                { property: 'color', selector: '.editText' },
                { property: 'color', selector: 'button, .button' },
                { property: 'color', selector: 'button:hover' },
                { property: 'color', selector: '.button:hover' }

                ]
            },
            editTextBackground: {
                theme: ['#ffffff', '#E3E3E3', '#454545', '#262626'],
                rules: [
                { property: 'background-color', selector: '.editText' },
                { property: 'background-color', selector: 'input[type="text"]' },
                { property: 'background-color', selector: '.dropdown-button-middle' },
                { property: 'background-color', selector: '.console' },
                { property: 'background-color', selector: '.selectDropdow' },
                ]
            },
            editTextColor: {
                theme: ['#000000', '#000000', '#FAFAFA', '#CACACA'],
                rules: [
                { property: 'color', selector: '.editText' },
                { property: 'color', selector: 'input[type="text"]' },
                { property: 'caret-color', selector: 'input[type="text"]' },
                { property: 'color', selector: '.console' },
                { property: 'color', selector: '.selectDropdow' },
                ]
            },
            tooltipBackground: {
                theme: ['#FFFFFF', '#494949', '#C8C8C8', '#999999'],
                rules: [{ property: 'background-color', selector: '.tooltip' }]
            },
            tooltipColor: {
                theme: ['#575757', '#B0B0B0', '#595959', '#393939'],
                rules: [{ property: 'color', selector: '.tooltip' }]
            },
            tooltipBoxShadow: {
                theme: ['1px 1px 4px 0px #686868', '1px 1px 4px 0px #545454', '1px 1px 4px 0px #3b3b3b', '1px 1px 4px 0px #333333'],
                rules: [{ property: 'box-shadow', selector: '.tooltip' }]
            },
            editTextBorderColor: {
                theme: ['#BDBDBD', '#A8A8A8', '#616161', '#3E3E3E'],
                rules: [
                { property: 'border-color', selector: 'input[type="text"]' },
                { property: 'border-color', selector: 'button, .button' },
                { property: 'background-color', selector: '.dropdown-input-div' },
                { property: 'background-color', selector: '.dropdown-div' },
                { property: 'background-color', selector: '.dropdown-button-middle' },
                { property: 'border-color', selector: '.console' },
                { property: 'box-shadow', selector: '.consoleResizer' },
                { property: 'background-color', selector: '.selectDropdow' },
                ]
            },
            buttonHoverBackground: {
                theme: ['#FBFBFB', '#C4C4C4', '#5F5F5F', '#3E3E3E'],
                rules: [
                { property: 'background-color', selector: 'button:hover' },
                { property: 'background-color', selector: '.button:hover' }
                ]
            },
            // buttonHoverColor: {
            //     theme: ['#484848', '#dddddd', '#000000', '#000000'],
            //     rules: [
            //     { property: 'color', selector: 'button:hover' },
            //     { property: 'color', selector: '.button:hover' }
            //     ]
            // },
            buttonActiveBackground: {
                theme: ['#BDBDBD', '#989898', '#595959', '#000000'],
                rules: [
                { property: 'background-color', selector: 'button:active' },
                // { property: 'background-color', selector: 'button:focus' },
                { property: 'border-color', selector: 'button:active' },
                ]
            },
            dropdownHover: {
                theme: ['#dddddd', 'rgba(100,100,100,0)', 'rgba(100,100,100,0)', '#444444'],
                rules:  [
                { property: 'background-color', selector: '.dropdown-item:hover' },
                { property: 'background-color', selector: '.dropdown-select' },
                ]
            },
            // dropdownSelected: {
            //     theme: ['#666666', '#666666', '#666666', '#666666'],
            //     rules: [{ property: 'background-color', selector: '.123' }]
            // },
            scrollbarThumb: {
                theme: ['#d9d9d9', '#cecece', '#8f8f8f', '#828282'],
                rules: [{ property: 'background-color', selector: '::-webkit-scrollbar-thumb' }]
            },
            buttonFocus: {
                theme: ['#BDBDBD', '#989898', '#666666', '#555555'],
                rules: [
                { property: 'background-color', selector: 'button:focus' },
                { property: 'background-color', selector: '.buttonSelected' },
                ]
            },
            // inputFocus: {
            //     theme: ['#46A0F5', '#46A0F5', '#46A0F5', '#46A0F5'],
            //     rules: [{ property: 'background-color', selector: '.123' }]
            // },
            // mainBackground: {
            //     theme: ['#f0f0f0', '#b8b8b8', '#535353', '#323232'],
            //     rules: [{ property: 'background-color', selector: '.123' }]

            // },
            boxShaddowEditTextBorderColor:{
                theme: ['0px -1px 0px 0px #DCDCDC', '0px -1px 0px 0px #A8A8A8', '0px -1px 0px 0px #616161', '0px -1px 0px 0px #3E3E3E'],
                rules: [
                { property: 'box-shadow', selector: 'consoleResizer' }
                ]
            }
        };
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

        var stylesheet = document.getElementById("theme").sheet;

        var getTheme;

        getTheme = function(skinInfo) {
            var red = skinInfo.panelBackgroundColor.color.red;
            if (red > 200) { return 0; }
            if (red > 122) { return 1; }
            if (red > 60) { return 2; }
            return 3;
        };


        /**
         * Update the theme with the AppSkinInfo retrieved from the host product.
         */
        function updateThemeWithAppSkinInfo(appSkinInfo) {
            if (!appSkinInfo) { return; }
            var k, value, themeColor, prop, rule, rules, applyRule, l;
            themeColor = getTheme(appSkinInfo);
            applyRule = function(x){
                cssRule(selectorText, prop, value, sheet);
            };
            for (k in theme){
                prop = theme[k];
                value = prop.theme[themeColor];
                rules = prop.rules;
                l = rules.length;
                while(l--){
                    rule = rules[l];
                    cssRule(rule.selector, rule.property, value, stylesheet);
                }
            }
            // console.log(appSkinInfo)
            var background = appSkinInfo.panelBackgroundColor.color;
            var colorString = toHex(background);
            // var colorString = `rgba(${background.red},${background.green},${background.blue},${background.alpha})`;
            cssRule('body, .panel', 'background-color', colorString, stylesheet);
            cssRule('button, .button', 'background-color', colorString, stylesheet);


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
            if (!csInterface.hostEnvironment) { return; }
            updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
            csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
        }

        return {
            init: init
        };

    }());

    themeManager.init();


} catch (e) { console.log(e.stack); }