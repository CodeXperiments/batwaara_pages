import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import CustomButton from "../../components/Buttons/CustomButton";
import CustomLoader from "../../components/CustomLoader";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    return <></>;
  } else if (status === "loading") {
    return <CustomLoader />;
  }

  return (
    <>
      <div>SignUp</div>

      <CustomButton
        text="To login"
        onClick={async (): Promise<boolean> => router.push("/login")}
        radius="xl"
        variant="filled"
      />
    </>
  );
};

export default SignUp;
