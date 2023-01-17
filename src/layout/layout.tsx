import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export const ProtectRoute: any = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  const publicRoutes: Array<string> = ["/login", "/signup"];

  if (status === "authenticated" && publicRoutes.includes(router.pathname)) {
    void router.replace("/");
  } else if (
    status === "unauthenticated" &&
    !publicRoutes.includes(router.pathname)
  ) {
    void router.replace("/login");
  }

  return children;
};
