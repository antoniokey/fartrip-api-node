export interface AccessToken {
  exp: number;
  sub: string;
  role: string;
  accountId: number;
}

export interface RefreshToken {
  exp: number;
  accountId: number;
}
