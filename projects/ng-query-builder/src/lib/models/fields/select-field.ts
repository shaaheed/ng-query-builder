// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Observable } from "rxjs";
import { FieldType } from "./field-type";
import { Option } from "../option";
import { Field } from "./field";

export class SelectField extends Field {

    options: Option[] = [];
    fetch?: Observable<Option[]>;

    constructor(name: string, value: string, options: Option[], type: FieldType = FieldType.select) {
        super(name, value, type);
        this.options = options;
    }
}