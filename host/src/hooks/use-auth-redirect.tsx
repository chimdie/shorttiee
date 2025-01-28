import { useCallback, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { loggedinUserAtom, storedAuthTokenAtom } from "@/atoms/user.atom";
import { AuthRoutes, DashboardRoutes } from "@/types/routes";


type UseAuthRedirectProps = {
  requireAuth?: boolean
}

export function useAuthRedirect({ requireAuth = true }: UseAuthRedirectProps) {
  const navigate = useNavigate()
  const loggedInUser = useAtomValue(loggedinUserAtom)
  const authToken = useAtomValue(storedAuthTokenAtom)


  const redirect = useCallback((path: string) => {
    try {
      navigate(path, { replace: true })
    } catch (error) {
      console.log("Failed to navigate", error);

    }
  }, [navigate])

  useEffect(() => {
    const isLoggedIn = loggedInUser && authToken

    if (requireAuth && !isLoggedIn) {
      redirect(AuthRoutes.login)
    } else if (!requireAuth && isLoggedIn) {
      redirect(DashboardRoutes.home)
    }
  }, [loggedInUser, authToken, requireAuth, redirect])
  return { loggedInUser, authToken }
}

