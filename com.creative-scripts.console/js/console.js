/* globals Vue, scrollIntoView, VTooltip, jsx, AIEventAdapter, gVue, AIEvent, VueFocus, fuzzaldrin */
// jshint: undeclared: true, esversion: 6, undefinded: true
Vue.config.devtools = true;
var log = console.log;
var quote = function(value, quoteType) {
    quoteType = quoteType || "'";
    return quoteType + value + quoteType;

};
window.gVue = new Vue({
    data: function() {
        return {};
    }
});

log('hello')
var __log = function(message, style, __class, elementType, consoleID) {
    if (typeof message === 'undefined') {
        return;
    }
    if (typeof consoleID !== 'string') {
        consoleID = 'consoleOutput';
    }
    var _console = document.getElementById(consoleID);
    if (!_console) {
        console.log(message + '\n[Panel console not found]');
        return message;
    }
    if (typeof elementType !== 'string' || elementType === '') {
        elementType = 'div';
    }
    var newNode = document.createElement(elementType);
    var m = (typeof message === 'object') ? JSON.stringify(message) : message;
    if (this.counter !== undefined) {
        this.counter = this.counter + 1 || 1;
        m = this.counter + '] ' + m;
    }
    newNode.innerText = m;
    if (style && style !== '') {
        newNode.style.cssText = style;
    }
    if (__class && __class !== '') {
        newNode.className = __class;
    }
    _console.appendChild(newNode);
    _console.scrollTop = _console.scrollHeight + 10000;
    // _console.scrollTop = _console.scrollHeight;
    return message;
};

__log.show = function(consoleID) {
    if (typeof consoleID !== 'string') {
        consoleID = 'console';
    }
    var _console = document.getElementById(consoleID);
    if (!_console) {
        return;
    }
    _console.style.display = 'block';
};
__log.hide = function(consoleID) {
    if (typeof consoleID !== 'string') {
        consoleID = 'console';
    }
    var _console = document.getElementById(consoleID);
    if (!_console) {
        return;
    }
    _console.style.display = 'none';
};
__log.toggle = function(consoleID) {
    if (typeof consoleID !== 'string') {
        consoleID = 'console';
    }
    var _console = document.getElementById(consoleID);
    if (!_console) {
        return;
    }
    if (_console.style.display === 'block' || _console.style.display === '') {
        _console.style.display = 'none';
    } else {
        _console.style.display = 'block';
    }
};

__log.rColor = function(property) {
    if (property !== '') {
        property = property ? ';' + property + ':' : ';background:';
    }
    var r, g, b, pastel, css;
    pastel = "9abcdef";
    r = (Math.random() * 7) | 0;
    g = (Math.random() * 7) | 0;
    b = (Math.random() * 7) | 0;
    pastel = '#' + pastel[r] + pastel[g] + pastel[b];
    css = property + pastel + ';';
    return css;
};

__log.line = function(message, randomColor) {
    try {
        throw new Error('line number').stack;
    } catch (stack) {
        var line = '' + stack.split(/[\n\r]/)[2];
        line = '' + line.match(/:\d+:[^:]+$/);
        line = line.replace(/:(\d+):[^:]+$/, '$1');
        if (message === undefined) {
            message = 'line';
        }
        if (message) {
            var css;
            if (randomColor === undefined) {
                randomColor = true;
            }
            css = __log.rColor();
            __log(message + ': ' + line, css);
        }
        return line;
    }
};

jsx.evalFile('__log.jsx');

var jsxLog = function(data) {
    var message, style, __class, elementType, consoleID;
    data = ('' + data.data).split(';;@;\u0800;:@#;');
    message = data[0];
    style = data[1];
    __class = data[2];
    elementType = data[3];
    consoleID = data[4];

    if (style === '') {
        style = undefined;
    }
    if (__class === '') {
        __class = undefined;
    }
    if (elementType === '') {
        elementType = undefined;
    }
    if (consoleID === '') {
        consoleID = undefined;
    }
    __log(message, style, __class, elementType, consoleID);
};


if (window.__adobe_cep__) {
    var csInterface = new CSInterface();
    csInterface.addEventListener('com.creative-scripts.console.__log', jsxLog);
}



try {
    try {
        // See https://raw.githubusercontent.com/Adobe-CEP/Samples/AE_Key_Events/AfterEffectsPanel/ext.js
        // Saved in ../Resources/registerKeyEventsInterest.js
        // https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx Windows Key Codes
        // https://gist.github.com/kemmason/949034 Mac Key Codes
        if (window.__adobe_cep__) {
            window.__adobe_cep__.registerKeyEventsInterest(JSON.stringify(
                [{
                        "keyCode": 53
                    }, {
                        "keyCode": 48
                    }, // Mac Tab
                    {
                        "keyCode": 48,
                        "shiftKey": true
                    }, // Mac Tab
                    {
                        "keyCode": 115
                    }, // Mac Home
                    {
                        "keyCode": 116
                    }, // Mac Page Up
                    {
                        "keyCode": 119
                    }, // Mac End
                    {
                        "keyCode": 121
                    }, // Mac Page Down
                    {
                        "keyCode": 123
                    }, // Mac Left
                    {
                        "keyCode": 124
                    }, // Mac Right
                    {
                        "keyCode": 125
                    }, // Mac Down
                    {
                        "keyCode": 126
                    }, // Mac Up
                    {
                        "keyCode": 52
                    }, // Mac Enter
                    {
                        "keyCode": 76
                    }, // Mac Enter Number Pad
                    {
                        "keyCode": 49
                    }, // Mac Space
                    {
                        "keyCode": 8,
                        "metaKey": true
                    }, // Windows Ctrl C
                    {
                        "keyCode": 9
                    }, // Windows Tab
                    {
                        "keyCode": 9,
                        "shiftKey": true
                    }, // Windows Tab
                    {
                        "keyCode": 33
                    }, // Windows Page Up
                    {
                        "keyCode": 34
                    }, // Windows Page Down
                    {
                        "keyCode": 35
                    }, // Windows End
                    {
                        "keyCode": 36
                    }, // Windows Home
                    {
                        "keyCode": 37
                    }, // Windows Left
                    {
                        "keyCode": 38
                    }, // Windows Up
                    {
                        "keyCode": 39
                    }, // Windows Right
                    {
                        "keyCode": 40
                    }, // Windows Down
                    {
                        "keyCode": 13
                    }, // Windows Enter
                    {
                        "keyCode": 32
                    }, // Windows Space
                    {
                        "keyCode": 0x43,
                        "ctrlKey": true
                    }, // Windows Ctrl C
                ]));
        }
    } catch (e) {}

    // Prevent escape from blurring panel focus
    document.addEventListener('keydown', function(keydown) {
        // console.log(keydown)
        if (keydown.keyCode === 27 || keydown.keyCode === 9) { // escape and tab
            keydown.stopPropagation();
            keydown.preventDefault();
            return false;
        }
    });



    Vue.component('console', {
        props: ['id'],
        template: `
        <div :id="id || 'console'">
        <textarea
                :id="'evalCode' + (id ? id : '')"
                ref="consoleInput"
                class="console"
                v-model="code"
                style="border-color: lightblue; width: calc(100% - 5px);"
                contenteditable="true"
                @keydown.enter="logEnter"
        ></textarea>
        <div
          class="console"
          ref="consoleOutput"
          :id="'consoleOutput' + (id ? id : '')"
          contenteditable="true"
        ></div>
        <div style="font-size: 9pt;text-align: left;">
            <strong>Instructions</strong><br>
            Code in top box, results in bottom box.<br>
            <strong>Enter</strong> executes line.<br>
            <strong>Command (alt) + Enter</strong> executes selected lines without inserting a line break.<br>
            <strong>Shift + Enter</strong> inserts line break without executing code.<br>
            <strong>Ctrl + Command (alt) + Enter</strong> executes entire console press.<br>
            <strong>Drag bottom right corners of boxes to adjust their heights.</strong>
        </div>
        <div  style="font-size: 9pt;text-align: center;">
            <button @click="consoleInputDiv.value = ''">Clear Code</button>
            <button @click="consoleOutputDiv.innerText = ''">Clear Results</button>
        </div>
        </div>`,
        created: function() {
            gVue.$on('consoleFocus', this.focusTab);
        },
        mounted: function() {
            this.consoleInputDiv = this.$refs.consoleInput;
            this.consoleOutputDiv = this.$refs.consoleOutput;
        },
        data: function() {
            return {
                focus: null,
                id: null,
                code: null,
            };
        },
        methods: {
            focusTab: function() {
                this.focus = true;
            },
            jsxResult: function(result) {
                if (result !== 'undefined') {
                    __log(result, 'font-weight:600;');
                }
            },
            logEnter: function(key) {
                var contents = this.code;
                if (key.shiftKey) {
                    return;
                }
                if (key.altKey || key.metaKey) {
                    key.stopPropagation();
                    key.preventDefault();
                    if (key.ctrlKey) {
                        return jsx.evalscript(contents, this.jsxResult);
                    }
                }
                var div = this.consoleInputDiv;
                var codeStart = div.selectionStart;
                var codeEnd = div.selectionEnd;
                var before = contents.slice(0, codeStart).replace(/^[\S\s]*?([^\r\n]*)$/, '$1');
                var middle = contents.slice(codeStart, codeEnd);
                var after = contents.slice(codeEnd).replace(/([^\r\n]*)[\S\s]*$/, '$1');
                var script = before + middle + after;
                __log(script, 'font-style:italic;');
                // __log('**********************************\n', 'background:yellow');
                // __log(before, 'background:lightgreen', undefined, 'span');
                // __log(middle, 'background:orange', undefined, 'span');
                // __log(after, 'background:pink', undefined, 'span');
                jsx.evalscript(script, this.jsxResult);
            },
        }
    });


    var app = new Vue({
        el: '#app',
        template: `
        <div>
            <console></console>
        </div>
            `,
        data: function() {
            return {};
        },
    });

} catch (e) {
    console.log(e.stack);
}