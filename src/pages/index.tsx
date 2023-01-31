import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CustomButton from "../components/Buttons/CustomButton";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  // !Keep the below commented code for future reference

  // const userData = {
  //   "email": "rrchampavat007@gmail.com",
  //   "password": "Test@123",
  // };

  // const { mutate, isLoading, error, data } =
  //   trpc.auth.registerUser.useMutation();

  // const handleSubmit = () => {
  //   mutate(userData);
  // };

  return (
    <>
      <h1 className={"mt-5 text-center text-3xl font-bold text-cyan-500"}>
        Dashboard
      </h1>
      <h6 className="my-5 text-center text-xl font-bold ">
        Welcome, {session.data?.user?.name} !
      </h6>

      <div className="flex w-full justify-center">
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

        {/* <CustomButton
          text="Register"
          className="p-3 shadow-xl"
          onClick={handleSubmit}
          isLoading={isLoading}
        />

        {error && <pre>{JSON.stringify(data, null, 0)}</pre>} */}
      </div>
    </>
  );
};

export default Dashboard;
