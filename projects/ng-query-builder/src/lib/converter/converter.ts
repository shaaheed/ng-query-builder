// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Group } from "../models/group";
import { Rule } from "../models/rule";

export interface Converter<T> {
    convert(rules: (Rule | Group)[]): T
}