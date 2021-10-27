// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { FieldType } from "./field-type";
import { Option } from "../option";
import { SelectField } from "./select-field";

export class MultiSelectField extends SelectField {

    constructor(name: string, value: string, options: Option[]) {
        super(name, value, options, FieldType.multiSelect);
    }

}