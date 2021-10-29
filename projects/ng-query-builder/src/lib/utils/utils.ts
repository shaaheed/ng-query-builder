// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

export const uuid = () => {
    return (Math.random() * Math.random() * Date.now()).toString();
}

export const clone = <T>(obj: T): T => {
    return <T>JSON.parse(JSON.stringify(obj))
}

export const isString = (value: any): boolean => {
    return value.constructor.name == 'String';
}

export const jsonSyntaxHighlight = (json: any) => {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: string) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        if (cls == 'key') {
            const arr = match.split(':');
            return '<span class="' + cls + '">' + arr[0] + '</span>:';
        }
        else {
            return '<span class="' + cls + '">' + match + '</span>';
        }
    });
}