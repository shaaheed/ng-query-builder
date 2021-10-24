// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Group } from "../models/group";
import { Rule } from "../models/rule";
import { Converter } from "./converter";

export class SqlConverter implements Converter<string> {

    convert(rules: (Rule | Group)[]): string {
        return this.convertSql(rules);
    }

    convertSql(rules: (Rule | Group)[], sql: string = ''): string {
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (i != 0) {
                sql += ` ${rules[i - 1].condition.value}`;
            }
            if (rule instanceof Rule) {
                sql += ` ${rule.field.value} ${rule.operator.value} ${rule.value}`;
            }
            else if (rule instanceof Group) {
                sql += ` (${this.convertSql(rule.rules)})`;
            }
        }
        return sql;
    }

}