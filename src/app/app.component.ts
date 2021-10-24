// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Component } from '@angular/core';
import { Condition } from 'projects/ng-query-builder/src/lib/models/condition';
import { Field } from 'projects/ng-query-builder/src/lib/models/fields/field';
import { FieldType } from 'projects/ng-query-builder/src/lib/models/fields/field-type';
import { MultiSelectField } from 'projects/ng-query-builder/src/lib/models/fields/multi-select-field';
import { Group } from 'projects/ng-query-builder/src/lib/models/group';
import { contains, endsWith, eq, ge, gt, le, ne, notStartsWith } from 'projects/ng-query-builder/src/lib/models/operator';
import { Option } from 'projects/ng-query-builder/src/lib/models/option';
import { Rule } from 'projects/ng-query-builder/src/lib/models/rule';
import { QueryBuilderService } from 'projects/ng-query-builder/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sql: string = '';

  constructor(private queryBuilder: QueryBuilderService) {

  }

  ngOnInit() {
    const countryField = new MultiSelectField('Country', 'country',
      [
        new Option('Bangladesh', 'bd'),
        new Option('Others', 'others')
      ]
    );
    const genderField = new MultiSelectField('Gender', 'gender',
      [
        new Option('Male', 'male'),
        new Option('Female', 'female'),
        new Option('Others', 'others')
      ]
    );
    const ageField = new Field('Age', 'age', FieldType.number);
    const nameField = new Field('Name', 'name', FieldType.text);
    const emailField = new Field('Email', 'email', FieldType.text);
    const phoneField = new Field('Phone', 'phone', FieldType.text);
    const birthdayField = new Field('Birthday', 'birthday', FieldType.date);
    const addressField = new Field('Address', 'address', FieldType.text);
    this.queryBuilder.addFields([
      ageField,
      nameField,
      emailField,
      phoneField,
      birthdayField,
      addressField,
      countryField,
      genderField
    ]);

    this.queryBuilder.onUpdate.subscribe(() => {
      this.sql = this.queryBuilder.toSql();
    });

    // default items
    const nameRule = new Rule(nameField, contains, 'Islam');
    this.queryBuilder.addRule(nameRule);

    const g = new Group();
    const countryRule = new Rule(countryField, eq, 'bd');
    g.addRule(countryRule);

    const genderRule = new Rule(genderField, ne, 'male');
    g.addRule(genderRule);

    const g1 = new Group();
    const ageRule = new Rule(ageField, ge, '25', Condition.or);
    g1.addRule(ageRule);

    const birthdayRule = new Rule(birthdayField, le, '15/09/1990');
    g1.addRule(birthdayRule);

    g.addRule(g1);
    this.queryBuilder.addRule(g);

    const g2 = new Group();
    const phoneRule = new Rule(phoneField, notStartsWith, '017', Condition.or);
    g2.addRule(phoneRule);

    const email = new Rule(emailField, endsWith, '@gmail.com');
    g2.addRule(email);

    this.queryBuilder.addRule(g2);

    const addressRule = new Rule(addressField, eq, 'Tangail')
    this.queryBuilder.addRule(addressRule);

    this.sql = this.queryBuilder.toSql();
  }

}
