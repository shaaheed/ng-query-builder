// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { clone, uuid } from "../utils/utils";
import { Condition } from "./condition";
import { Field } from "./fields/field";
import { Operator } from "./operator";
import { Type } from "./type";

export class Rule {

    id: string;
    field: Field;
    condition: Condition;
    value: string;
    operator: Operator;

    get type(): Type {
        return this._type;
    }
    private _type: Type = Type.rule;

    constructor(field: Field, operator: Operator, value: string, condition?: Condition) {
        this.id = uuid();
        this.field = field;
        this.value = value;
        this.operator = operator;
        this.condition = condition ?? Condition.and
    }

    clone() {
        const _clone = clone(this);
        return new Rule(_clone.field, _clone.operator, _clone.value, _clone.condition);
    }
}