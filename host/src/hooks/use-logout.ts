import { storedAuthTokenAtom, loggedinUserAtom } from "@/atoms/user.atom";
import { AuthRoutes } from "@/types/routes";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const setStoredToken = useSetAtom(storedAuthTokenAtom);
  const setUser = useSetAtom(loggedinUserAtom);

  const logout = (options: Partial<{ redirect: boolean }> | undefined) => {
    setStoredToken(RESET);
    setUser(RESET);

    if (options?.redirect) {
      navigate("/", { replace: true });
      navigate(AuthRoutes.login, { replace: true });
    }
  };
  return logout;
};
