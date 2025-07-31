export type UserType = {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type ParamsType = {
  search?: string;
  offset?: number;
  limit?: number;
  count?: number;
};
