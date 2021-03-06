// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Type } from "./type"

export class Condition {
    type: Type = Type.condition;
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    static get and() {
        return new Condition('and');
    }
    static get or() {
        return new Condition('or')
    };
}