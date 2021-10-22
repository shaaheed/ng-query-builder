import { Group } from "./group";
import { Rule } from "./rule";

export class Path {
    rules: (Rule | Group)[];
    index: number;
    constructor(rules: (Rule | Group)[], index: number) {
        this.rules = rules;
        this.index = index;
    }

    isEmpty(): boolean {
        return this.index <= -1 && this.rules.length <= 0;
    }

    static empty(): Path {
        return new Path([], -1);
    }
}