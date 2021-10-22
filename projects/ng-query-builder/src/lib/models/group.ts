import { uuid } from "../utils/utils";
import { Condition } from "./condition";
import { Rule } from "./rule";
import { Type } from "./type";

export class Group {
    id: string;
    type: Type = Type.group;
    rules: (Rule | Group)[] = [];
    condition: Condition = Condition.and;

    constructor() {
        this.id = uuid();
    }
}