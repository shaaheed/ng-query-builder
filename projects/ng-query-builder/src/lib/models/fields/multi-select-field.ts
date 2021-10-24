// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Observable } from "rxjs";
import { FieldType } from "./field-type";
import { Option } from "../option";
import { Field } from "./field";

export class MultiSelectField extends Field {

    options?: Option[];
    fetch?: Observable<Option[]>;

    constructor(name: string, value: string, options?: Option[]) {
        super(name, value, FieldType.multiSelect);
        this.options = options;
    }
}