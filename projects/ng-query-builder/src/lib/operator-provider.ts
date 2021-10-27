// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { FieldType } from "./models/fields/field-type";
import { between, contains, endsWith, eq, ge, gt, le, lt, ne, notBetween, notContains, notEndsWith, notStartsWith, Operator, startsWith } from "./models/operator";

export class OperatorProvider {
    get(fieldType: FieldType): Operator[] {
        if (fieldType == FieldType.text) {
            return [eq, ne, contains, notContains, startsWith, notStartsWith, endsWith, notEndsWith]
        }
        else if (fieldType == FieldType.number) {
            return [eq, ne, gt, lt, ge, le];
        }
        else if (fieldType == FieldType.date) {
            return [eq, ne, gt, lt, ge, le, between, notBetween];
        }
        else if ([FieldType.multiSelect, FieldType.select].indexOf(fieldType) != -1) {
            return [eq, ne];
        }
        else if (fieldType == FieldType.boolean) {
            return [eq, ne];
        }
        return [];
    }
}
