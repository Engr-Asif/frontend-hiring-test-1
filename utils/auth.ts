import { jwtDecode } from "jwt-decode";

export const isValidToken = (accessToken: any): any => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  if (!decoded) return;
  const currentTime: any = Date.now() / 1000;
  return decoded?.exp > currentTime;
};

export const getExpirationTime = (accessToken: string): number => {
  const decoded: any = jwtDecode(accessToken);
  const currentTime: any = Date.now() / 1000; // Current Time in Milliseconds
  return (decoded?.exp - currentTime) * 1000 - 1 * 60 * 1000; //This Expiration time is less than the Expiration time of AccessToken Because I want to get New Access Token Before 1 min of Expiration of Old One
};
