import { FieldType } from "./field-type";
import { between, contains, endsWith, eq, ge, gt, le, lt, ne, notBetween, notContains, notEndsWith, notStartsWith, Operator, startsWith } from "./operator";

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
