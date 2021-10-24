// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Field } from "./fields/field";
import { Operator } from "./operator";

export class Filter {
    fields: Field[] = [];
    field: Field | undefined;
    operator: Operator | undefined;
    operators: Operator[] = [];
    value: string | undefined;
    options?: string[] = [];

    constructor(fields: Field[]) {
        this.fields = fields;
    }
}