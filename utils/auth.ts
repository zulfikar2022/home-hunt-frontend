import { jwtDecode } from "jwt-decode";
export interface CustomJwtPayload {
  id: string;
  email: string;
  role: string;
  profileImage: string;
  name: string;
  iat: number;
  exp: number;
}
export function verifyToken(token: string) {
  const decodedToke = jwtDecode<CustomJwtPayload>(token);
  if (!decodedToke) {
    throw new Error("Token verification failed.");
  }
  return decodedToke;
}

export function tokenDecoder(token: string) {
  return jwtDecode<CustomJwtPayload>(token);
}
