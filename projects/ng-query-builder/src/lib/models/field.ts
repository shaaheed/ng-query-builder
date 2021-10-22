import { FieldType } from "./field-type";

export class Field {
    name: string;
    value: string;
    type: FieldType;
    disabled: boolean;

    constructor(name: string, value: string, type: FieldType) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.disabled = false;
    }
}