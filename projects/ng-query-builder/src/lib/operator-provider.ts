// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { FieldType } from "./models/fields/field-type";
import { between, contains, endsWith, eq, ge, gt, le, lt, ne, notBetween, notContains, notEndsWith, notStartsWith, Operator, startsWith } from "./models/operator";

export class OperatorProvider {
    get(fieldType: FieldType): Operator[] {
        if (fieldType == FieldType.text) {
            return [eq, ne, contains, notContains, startsWith, notStartsWith, endsWith, notEndsWith]
        }
        else if (fieldType == 'number') {
            return [eq, ne, gt, lt, ge, le];
        }
        else if (fieldType == 'date') {
            return [eq, ne, gt, lt, ge, le, between, notBetween];
        }
        return [];
    }
}
