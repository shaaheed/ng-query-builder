// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Component, OnInit, ViewChild } from '@angular/core';
import { Field } from '../models/fields/field';
import { FieldType } from '../models/fields/field-type';
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
