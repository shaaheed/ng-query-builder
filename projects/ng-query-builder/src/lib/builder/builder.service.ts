import { Injectable } from '@angular/core';
import { Field } from '../models/field';
import { Group } from '../models/group';
import { Operator } from '../models/operator';
import { OperatorProvider } from '../models/operator-provider';
import { Rule } from '../models/rule';
import { Filter } from '../models/filter';
import { Type } from '../models/type';
import { Path } from '../models/path';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private rules: (Group | Rule)[] = [];
  private fields: Field[] = [];
  private operatorProvider: OperatorProvider = new OperatorProvider();

  constructor() { }

  setOperatorProvider(operatorProvider: OperatorProvider) {
    this.operatorProvider = operatorProvider;
  }

  getOperatorProvider(): OperatorProvider {
    return this.operatorProvider;
  }

  addRule(rule: Rule | Group): void {
    this.rules.push(rule);
  }

  getRules(): (Group | Rule)[] {
    return this.rules;
  }

  addField(field: Field): Field[] {
    this.fields.push(field);
    return this.fields;
  }

  addFields(fields: Field[]): Field[] {
    this.fields.push(...fields);
    return this.fields;
  }

  getFields(): Field[] {
    return this.fields;
  }

  getOperators(field: Field): Operator[] {
    return this.operatorProvider.get(field?.type);
  }

  newFilter(): Filter {
    return new Filter(this.getFields());
  }

  deleteRule(id: string) {
    const paths: Path[] = this.findPaths(this.rules, id);
    if (paths.length == 1) {
      paths[0].rules.splice(paths[0].index, 1);
    }
    else if (paths.length > 1) {
      let pathIndex = paths.length - 1;
      let path = paths[pathIndex];
      if (path?.rules?.length == 1) {
        // single rule must be deleted with his parent
        pathIndex = paths.length - 2;
        path = paths[pathIndex];
      }
      if (path) {
        path.rules.splice(path.index, 1);
        if (path.rules.length == 1) {
          if (this.isGroup(path.rules[0])) {
            const parentPath = paths[pathIndex - 1];
            let parentRule = parentPath?.rules[parentPath?.index];
            if (this.isGroup(parentRule)) {
              parentRule = parentRule as Group;
              parentRule.rules = (path.rules.splice(0, 1)[0] as Group).rules;
            }
          }
        }
      }
    }

    if (this.rules?.length == 1 && this.isGroup(this.rules[0])) {
      this.rules = (this.rules.splice(0, 1)[0] as Group).rules;
    }
  }

  deleteGroup(id: string) {
    const paths: Path[] = this.findPaths(this.rules, id);
    let path = Path.empty();
    if (paths.length == 1) {
      path = paths[0];
    }
    else if (paths.length > 1) {
      let pathIndex = paths.length - 1;
      path = paths[pathIndex];
    }
    if (!path.isEmpty()) {
      path.rules.splice(path.index, 1);
    }
    if (this.rules?.length == 1 && this.isGroup(this.rules[0])) {
      this.rules = (this.rules.splice(0, 1)[0] as Group).rules;
    }
  }

  addRuleById(rule: Rule | Group, id?: string): void {
    if (!id) {
      this.rules.push(rule);
    }
    else {
      const paths: Path[] = this.findPaths(this.rules, id);
      let path: Path = Path.empty();
      if (paths.length == 1) {
        path = paths[0];
      }
      else if (paths.length > 1) {
        let pathIndex = paths.length - 1;
        path = paths[pathIndex];
      }
      if (!path.isEmpty()) {
        if (path.index + 1 < path.rules.length) {
          path.rules.splice(path.index + 1, 0, rule);
        }
        else {
          path.rules.push(rule);
        }
      }
    }
  }

  findPaths(
    rules: (Rule | Group)[],
    id: string,
    paths: Path[] = []
  ): Path[] {
    for (let i = 0; i < rules.length; i++) {
      paths.push(new Path(rules, i));
      const rule = rules[i];
      if (id == rule.id) {
        return paths;
      }
      if (rule instanceof Group && rule.rules?.length > 0) {
        const path = this.findPaths(rule.rules, id, paths);
        if (path.length) {
          return path;
        }
      }
    }
    return [];
  }

  getType(rule: Rule | Group): string {
    return rule.type || (<any>rule)._type;
  }

  isGroup(rule: Rule | Group): boolean {
    return this.getType(rule) == Type.group;
  }

  isRule(rule: Rule | Group): boolean {
    return this.getType(rule) == Type.rule;
  }

}
