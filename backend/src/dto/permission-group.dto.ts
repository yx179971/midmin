import { BaseListParamsDTO } from './base';
import { Rule, RuleType } from '@midwayjs/validate';

export class PermissionGroupListDTO extends BaseListParamsDTO {}

export class PermissionGroupCreateDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.array().items(RuleType.string()).default([]))
  permissions: string[];
}

export class PermissionGroupUpdateDTO extends PermissionGroupCreateDTO {}
