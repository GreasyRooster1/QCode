//safe usage of eval() in modules

function safeEval(src) {
    return eval(`with({window: {},
        document: {},
        eval: {},
        XMLHttpRequest: {},
        globalThis:{},
        Function: {}}) {${src}}`);
}