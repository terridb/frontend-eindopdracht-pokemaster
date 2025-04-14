import {jwtDecode} from "jwt-decode";

export function checkTokenValidity(token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = currentTime > expirationTime;

    return !isExpired;
}