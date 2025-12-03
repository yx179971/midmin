import { Rule, RuleType } from '@midwayjs/validate';

export class BaseListParamsDTO {
  @Rule(RuleType.string().empty(''))
  keyword?: string;

  @Rule(RuleType.string().default('-createdAt'))
  orderBy?: string;

  @Rule(RuleType.boolean().allow('').optional())
  deleted?: boolean;
}

export class BaseSearchParamsDTO extends BaseListParamsDTO {
  @Rule(RuleType.number().default(1))
  page?: number;

  @Rule(RuleType.number().default(20))
  pageSize?: number;
}
