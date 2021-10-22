import { Component, OnInit, ViewChild } from '@angular/core';
import { Field } from '../models/field';
import { FieldType } from '../models/field-type';
import { Filter } from '../models/filter';
import { Rule } from '../models/rule';
import { QueryBuilderService } from './builder.service';
import { FilterComponent } from '../filter/filter.component';
import { contains, eq, ge, gt, notStartsWith, Operator } from '../models/operator';
import { Condition } from '../models/condition';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { Group } from '../models/group';
import { Config } from '../models/config';

@Component({
  selector: 'ng-query-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  rules: (Rule | Group)[] = [];
  currentFilter: Filter | undefined;
  @ViewChild('filterModal') filterModal: FilterComponent | undefined;
  config: Config;

  private editedRule: Rule | undefined;
  private addRuleAfterId: string | undefined;
  private addRuleType: string | undefined;

  constructor(private service: QueryBuilderService) {
    this.config = new Config();
  }

  ngOnInit(): void {
    this.service.addFields([
      new Field('Age', 'age', FieldType.number),
      new Field('Name', 'name', FieldType.text),
      new Field('Email', 'email', FieldType.text),
      new Field('Phone', 'phone', FieldType.text),
      new Field('Birthday', 'birthday', FieldType.date)
    ]);

    // default items
    const age = new Rule(this.service.getFields()[0], gt, '20');
    this.service.addRule(age);

    const name = new Rule(this.service.getFields()[1], contains, 'abc');
    this.service.addRule(name);

    const g1 = new Group();
    const email = new Rule(this.service.getFields()[2], eq, 'xyz');
    g1.rules.push(email);

    const birthday = new Rule(this.service.getFields()[4], ge, '15/09/1990');
    g1.rules.push(birthday);

    const name2 = name.clone();
    name2.value = 'name2';
    g1.rules.push(name2);

    const g2 = new Group();
    const name3 = name.clone();
    name3.value = 'name3';
    g2.rules.push(name3);
    g1.rules.push(g2);

    const g3 = new Group();
    const name4 = name.clone();
    name4.value = 'name4';
    g3.rules.push(name4);
    g2.rules.push(g3);

    this.service.addRule(g1);

    this.service.addRule(new Rule(this.service.getFields()[3], notStartsWith, '017'));
    this.rules = this.service.getRules();
  }

  ngAfterViewInit() {
    if (this.filterModal) {
      this.filterModal.onApply.subscribe(x => {
        if (this.filterModal?.filter) {
          const filter: Filter = this.filterModal?.filter;
          let rule: Rule | Group;
          if (this.filterModal.mode == 'edit' && this.editedRule) {
            // rule = this.rules[this.editedRule];
            this.editedRule.field = filter.field as Field;
            this.editedRule.operator = filter.operator as Operator;
            this.editedRule.value = filter.value as any;
          }
          else {
            rule = new Rule(filter.field as Field, filter.operator as Operator, filter.value as any);
            if (this.addRuleType == 'group') {
              const group = new Group();
              group.rules.push(rule);
              rule = group;
            }
            this.service.addRuleById(rule, this.addRuleAfterId);
          }
          this.rules = this.service.getRules();
        }
        this.editedRule = undefined;
        this.addRuleAfterId = undefined;
      })
    }
  }

  getQuery(): Filter {
    this.currentFilter = this.service.newFilter();
    return this.currentFilter;
  }

  addFilter(type?: string, id?: string): void {
    if (this.filterModal) {
      this.addRuleType = type;
      this.addRuleAfterId = id;
      this.filterModal.filter = this.service.newFilter();
      this.filterModal.mode = 'add';
      this.filterModal.open();
    }
  }

  toggleCondition(condition: Condition): void {
    if (condition.value == 'and') {
      condition.value = 'or'
    }
    else {
      condition.value = 'and'
    }
  }

  onRuleAction(action: string, rule: Rule | Group, popover?: NzPopoverDirective): void {
    popover?.hide();
    switch (action) {
      case 'edit':
        if (this.filterModal) {
          const type = rule.type || (<any>rule)._type;
          if (type == 'rule') {
            rule = <Rule>rule;
            this.editedRule = rule;
            this.filterModal.open(this.service.newFilter(), rule.field?.value, rule.operator?.value, rule.value);
          }
        }
        break;
      case 'add_rule':
        this.addFilter('rule', rule.id);
        break;
      case 'add_group':
        this.addFilter('group', rule.id);
        break;
      case 'delete':
        this.service.deleteRule(rule.id);
        this.rules = this.service.getRules();
        break;
    }
  }

  onGroupAction(action: string, rule: Rule | Group, popover?: NzPopoverDirective): void {
    popover?.hide();
    switch (action) {
      case 'add_rule':
      case 'add_group':
        this.addFilter('');
        break;
      case 'delete':
        this.service.deleteGroup(rule.id);
        this.rules = this.service.getRules();
        break;
    }
  }

}
