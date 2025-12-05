import { Rule, RuleType } from '@midwayjs/validate';
import { MeUpdateDTO } from './user.dto';

export class RegisterDTO extends MeUpdateDTO {
  @Rule(RuleType.string().required().min(6).max(30))
  password: string;
}

export class newPasswordDTO {
  @Rule(RuleType.string().valid('sms', 'email').default('sms'))
  method: 'sms' | 'email';

  @Rule(
    RuleType.string()
      .optional()
      .regex(/^1[3-9]\d{9}$/)
  )
  mobile?: string;

  @Rule(RuleType.string().email().optional())
  email?: string;

  @Rule(RuleType.string().required().min(6).max(30))
  newPassword: string;
}
