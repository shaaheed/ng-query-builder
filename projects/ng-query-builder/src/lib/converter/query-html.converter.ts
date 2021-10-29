// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Group } from "../models/group";
import { Rule } from "../models/rule";
import { Converter } from "./converter";

export class QueryHtmlConverter implements Converter<string> {

    convert(rules: (Rule | Group)[]): string {
        return this.convertToQueryHtml(rules);
    }

    convertToQueryHtml(rules: (Rule | Group)[], html: string = ''): string {
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (i != 0) {
                html += ` ${this.condition(rules[i - 1].condition.value)}`;
            }
            if (rule instanceof Rule) {
                html += ` ${this.field(rule.field.value)} ${this.operator(rule.operator.value)} ${this.value(rule.value)}`;
            }
            else if (rule instanceof Group) {
                html += ` (${this.convertToQueryHtml(rule.rules).trim()})`;
            }
        }
        return html;
    }

    field(value: string): string {
        return this.span(value, 'field');
    }

    operator(value: string): string {
        return this.span(value, 'operator');
    }

    value(value: string): string {
        return this.span(`"${value}"`, 'value');
    }

    condition(value: string): string {
        return this.span(value, 'condition');
    }

    span(value: string, cls: string = ''): string {
        return `<span${cls ? ` class=${cls}` : ''}>${value}</span>`;
    }

}