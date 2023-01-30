import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomButton from "../components/Buttons/CustomButton";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const { data } = useSession();
  const router = useRouter();

  const [isPageLoading, setPageIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<any>();

  const userData = {
    "email": "rrchampavat007@gmail.com",
    "password": "Test@123",
  };

  const handleSubmit = () => {
    const { mutate, isLoading, error } = trpc.auth.registerUser.useMutation();

    setPageIsLoading(isLoading);
    setErrorMsg(error);

    mutate({
      "email": "rrchampavat007@gmail.com",
      "password": "Test@123",
    });
  };

  return (
    <>
      <h1 className={"mt-5 text-center text-3xl font-bold text-cyan-500"}>
        Dashboard
      </h1>
      <h6 className="my-5 text-center text-xl font-bold ">
        Welcome, {data?.user?.name} !
      </h6>

      <div className=" flex w-full justify-center">
        <CustomButton
          text="Let me out"
          variant="filled"
          className="mr-5 p-3 shadow-xl"
          onClick={async (): Promise<void> =>
            signOut({ "callbackUrl": "/login" })
          }
        />
        <CustomButton
          text="To about"
          className="p-3 shadow-xl"
          onClick={async (): Promise<boolean> => router.push("/about")}
        />

        <CustomButton
          text="Register"
          className="p-3 shadow-xl"
          onClick={handleSubmit}
          isLoading={isPageLoading}
        />

        {errorMsg && <p>Error while register : {errorMsg?.message}</p>}
      </div>
    </>
  );
};

export default Dashboard;
