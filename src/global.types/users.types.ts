export type TUser = {
  id: number;
  name: string;
  username: string;
};

export type TUsers = TUser[];

export type TUserMapAccumulator = {
  [id: number]: string;
};
