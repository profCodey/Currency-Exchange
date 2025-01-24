import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AUTH_TOKENS } from "src/configs/auth";
import { queryClient } from "src/pages/_app";

export function useLogout() {
  const router = useRouter();

  return function () {
    Cookies.remove(AUTH_TOKENS.ACCESS_TOKEN);
    Cookies.remove(AUTH_TOKENS.REFRESH_TOKEN);
    Cookies.remove(AUTH_TOKENS.CATEGORY);
    queryClient.clear();
    router.push("/login");
  };
}

export function logout(){
    Cookies.remove(AUTH_TOKENS.ACCESS_TOKEN);
    Cookies.remove(AUTH_TOKENS.REFRESH_TOKEN);
    Cookies.remove(AUTH_TOKENS.CATEGORY);
    queryClient.clear();
}
