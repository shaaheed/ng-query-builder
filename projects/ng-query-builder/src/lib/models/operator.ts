export class Operator {
    name: string;
    value: string;
    symbol: string;

    constructor(name: string, value: string, symbol: string) {
        this.name = name;
        this.value = value;
        this.symbol = symbol;
    }
}

export const eq: Operator = new Operator('equals to', 'eq', '=');
export const ne: Operator = new Operator('not equals to', 'ne', '!=');
export const gt: Operator = new Operator('greater than', 'gt', '>');
export const lt: Operator = new Operator('less than', 'lt', '<');
export const ge: Operator = new Operator('greater than or equals to', 'ge', '>=');
export const le: Operator = new Operator('less than or equals to', 'le', '<=');
export const contains: Operator = new Operator('contains', 'contains', 'contains');
export const notContains: Operator = new Operator('not contains', 'notContains', 'not contains');
export const startsWith: Operator = new Operator('starts with', 'startsWith', 'starts with');
export const notStartsWith: Operator = new Operator('not starts with', 'notStartsWith', 'not starts with');
export const endsWith: Operator = new Operator('ends with', 'endsWith', 'ends with');
export const notEndsWith: Operator = new Operator('not ends with', 'notEndsWith', 'not ends with');
export const between: Operator = new Operator('between', 'between', 'between');
export const notBetween: Operator = new Operator('not between', 'notBetween', 'not between');

