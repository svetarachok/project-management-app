import { SignUpResponse } from "../../../auth/models/auth.model";

export interface UserState {
  isAuth: boolean;
  user: SignUpResponse | null;
}

export const initialUserState: UserState = {
  isAuth: false,
  user: null,
}
