export interface AccessToken {
  exp: number;
  sub: string;
}

export interface RefreshToken {
  exp: number;
}
