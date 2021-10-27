// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Group } from "../models/group";
import { Rule } from "../models/rule";
import { Converter } from "./converter";

export class JsonConverter implements Converter<string> {

    convert(rules: (Rule | Group)[]): string {
        return JSON.stringify(this.convertToJson(rules), undefined, 2);
    }

    convertToJson(rules: any[]) {
        const json = JSON.parse(JSON.stringify(rules));
        for (let i = 0; i < json.length; i++) {
            const rule = json[i];
            const type = rule.type || rule._type;

            delete rule.id;
            delete rule._type;

            rule.type = type;
            if (type == 'rule') {
                delete rule.field.disable;
            }
            else if (type == 'group') {
                this.convertToJson(rule.rules);
            }
        }
        return json;
    }

}