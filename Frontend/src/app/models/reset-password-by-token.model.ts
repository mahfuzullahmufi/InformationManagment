export interface ResetPasswordByToken {
    email: string;
    token: string;
    newPassword: string;
  }