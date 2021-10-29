// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Group } from "../models/group";
import { Rule } from "../models/rule";
import { Converter } from "./converter";

export class JsonConverter implements Converter<string> {

    convert(rules: (Rule | Group)[]): string {
        const json = JSON.stringify(this.convertToJson(rules), undefined, 2);
        return json;
    }

    convertToJson(rules: any[]) {
        const json = JSON.parse(JSON.stringify(rules));
        for (let i = 0; i < json.length; i++) {
            const rule = json[i];
            const type = rule.type || rule._type;

            delete rule.id;
            delete rule._type;
            delete rule.type;
            
            if (type == 'rule') {
                rule.field = rule.field.value;
                rule.operator = rule.operator.value;
            }
            else if (type == 'group') {
                rule.rules = this.convertToJson(rule.rules);
            }
            rule.condition = rule.condition.value;
        }
        return json;
    }
}