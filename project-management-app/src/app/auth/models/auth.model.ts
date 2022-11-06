export interface SignUpResponse {
  "id": string;
  "name": string;
  "login": string;
}

export interface User {
  "name"?: string;
  "login": string;
  "password": string;
}

export interface TokenModel {
  token: string;
}
