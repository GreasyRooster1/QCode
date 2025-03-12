import {createTheme} from 'thememirror';
import {tags as t} from '@lezer/highlight';

const hackerManTheme = createTheme({
    variant: 'dark',
    settings: {
        background: '#000000',
        foreground: '#00ff00',
        caret: '#00ff00',
        selection: '#082108',
        lineHighlight: '#001900',
        gutterBackground: '#000000',
        gutterForeground: '#00ff00',
    },
    styles: [
        {
            tag: t.comment,
            color: '#007a02',
        },
        {
            tag: t.variableName,
            color: '#009903',
        },
        {
            tag: [t.string, t.special(t.brace)],
            color: '#00c203',
        },
        {
            tag: t.number,
            color: '#00ff04',
        },
        {
            tag: t.bool,
            color: '#00ff04',
        },
        {
            tag: t.null,
            color: '#00ad03',
        },
        {
            tag: t.keyword,
            color: '#00ff04',
        },
        {
            tag: t.operator,
            color: '#006602',
        },
        {
            tag: t.className,
            color: '#007002',
        },
        {
            tag: t.definition(t.typeName),
            color: '#008502',
        },
        {
            tag: t.typeName,
            color: '#009402',
        },
        {
            tag: t.angleBracket,
            color: '#00bd03',
        },
        {
            tag: t.tagName,
            color: '#00e604',
        },
        {
            tag: t.attributeName,
            color: '#007a02',
        },
    ],
});

export {hackerManTheme}