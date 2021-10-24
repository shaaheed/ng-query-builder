// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { uuid } from "../utils/utils";
import { Condition } from "./condition";
import { Rule } from "./rule";
import { Type } from "./type";

export class Group {
    id: string;
    type: Type = Type.group;
    rules: (Rule | Group)[] = [];
    condition: Condition = Condition.and;

    constructor() {
        this.id = uuid();
    }

    addRule(rule: Rule | Group): void {
        this.rules.push(rule);
    }
}