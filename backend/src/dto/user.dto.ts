import { Rule, RuleType } from '@midwayjs/validate';
import { BaseListParamsDTO } from './base';

export class UserListDTO extends BaseListParamsDTO {}

export class MeUpdateDTO {
  @Rule(RuleType.string().required().min(3).max(20))
  username: string;

  @Rule(RuleType.string().min(0).max(200).default(''))
  bio?: string;

  @Rule(RuleType.string().min(0).max(500).default(''))
  avatar?: string;

  @Rule(
    RuleType.string()
      .optional()
      .regex(/^1[3-9]\d{9}$/)
  )
  mobile?: string;

  @Rule(RuleType.string().email().optional())
  email?: string;
}

export class UserUpdateDTO extends MeUpdateDTO {
  @Rule(RuleType.string().min(0).max(20))
  status?: string;

  @Rule(RuleType.string().min(0).max(50))
  groupId?: string;

  @Rule(RuleType.date().optional().default(null))
  lockUntil?: Date;
}

export class UserUpdatePwdDTO {
  @Rule(RuleType.string().optional().min(6).max(30).default(''))
  password?: string;

  @Rule(RuleType.string().required().min(6).max(30))
  newPassword: string;
}
