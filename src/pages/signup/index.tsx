import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    return null;
  } else if (status === "loading") {
    return <>Loading....</>;
  }

  return (
    <>
      <div>SignUp</div>
      <button onClick={async (): Promise<boolean> => router.push("/login")}>
        To Login
      </button>
    </>
  );
};

export default SignUp;
