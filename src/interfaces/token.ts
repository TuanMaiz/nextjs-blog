import jwtDecode from "jwt-decode";


export interface Token{
    userId: number;
    iat: number;
    exp: number;
    
}
export function isValid(token : string) : boolean{
    const user: Token = jwtDecode(token)
    if (user && user.exp && user.exp > Math.floor(Date.now() / 1000)) {
        return true
      } else {
        localStorage.removeItem("token");
        return false
      }
}