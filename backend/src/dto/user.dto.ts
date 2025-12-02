import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}

export class UserRegisterDTO {
  @Rule(RuleType.string().required().min(3).max(20))
  username: string;

  @Rule(
    RuleType.string()
      .required()
      .regex(/^1[3-9]\d{9}$/)
  )
  mobile: string;

  @Rule(RuleType.string().email().optional())
  email?: string;

  @Rule(RuleType.string().required().min(6).max(30))
  password: string;

  @Rule(RuleType.string().min(0).max(200))
  contact?: string;

  @Rule(RuleType.string().required().length(6))
  smsCode: string;
}

export class UserUpdateDTO {
  @Rule(RuleType.string().min(0).max(50))
  username?: string;

  @Rule(RuleType.string().min(0).max(200))
  bio?: string;

  @Rule(RuleType.string().min(0).max(500))
  avatar?: string;

  @Rule(RuleType.string().min(0).max(20))
  mobile?: string;

  @Rule(RuleType.string().min(0).max(200))
  contact?: string;
}

export class ForgotPasswordDTO {
  @Rule(
    RuleType.string()
      .required()
      .regex(/^1[3-9]\d{9}$/)
  )
  mobile: string;

  @Rule(RuleType.string().required().length(6))
  smsCode: string;

  @Rule(RuleType.string().required().min(6).max(30))
  newPassword: string;
}

export class ResetPasswordDTO {
  @Rule(RuleType.string().required())
  oldPassword: string;

  @Rule(RuleType.string().required().min(6).max(30))
  newPassword: string;
}
