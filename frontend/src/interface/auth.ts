export interface authUser {
  id: string;
  username: string;
  avatar: string;
  status: string;
  group: {
    name: string;
    permissions: string[];
  }
}

export interface RegisterFormModel {
  username: string;
  password: string;
}
