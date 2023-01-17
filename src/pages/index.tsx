import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <h1 className="m-5 text-center text-3xl font-bold text-cyan-500 md:text-cyan-700">
        Dashboard
      </h1>
      <h6 className="text-center text-xl font-bold ">
        Welcome, {data?.user?.name} !
      </h6>

      <div className="m-5 flex w-full justify-center">
        <button
          className="rounded bg-cyan-300 p-3 shadow-xl"
          onClick={async (): Promise<void> =>
            signOut({ "callbackUrl": "/login" })
          }
        >
          Let me out
        </button>
      </div>
    </>
  );
};

export default Dashboard;
