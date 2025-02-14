import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { loggedinUserAtom, storedAuthTokenAtom } from "@/atoms/user.atom";
import { AuthRoutes, DashboardRoutes } from "@/types/routes";

type UseAuthRedirectProps = {
  requireAuth?: boolean;
};

export function useAuthRedirect({ requireAuth = true }: UseAuthRedirectProps) {
  const navigate = useNavigate();
  const loggedInUser = useAtomValue(loggedinUserAtom);
  const authToken = useAtomValue(storedAuthTokenAtom);

  useEffect(() => {
    if (requireAuth && (!loggedInUser || !authToken)) {
      navigate(AuthRoutes.login, { replace: true });
    } else if (!requireAuth && loggedInUser && authToken) {
      navigate(DashboardRoutes.home, { replace: true });
    }
  }, [loggedInUser, authToken, requireAuth, navigate]);
  return { loggedInUser, authToken };
}
