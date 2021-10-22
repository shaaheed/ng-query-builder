import { Field } from "./field";
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