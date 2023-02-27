import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Buttons/Button";

const SignUp: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>SignUp</title>
        <meta property="og:title" content="SignUp" key="title" />
      </Head>
      <div>SignUp</div>

      <Button
        text="To login"
        onClick={async (): Promise<boolean> => router.push("/login")}
        radius="xl"
        variant="filled"
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    return {
      "redirect": {
        "permanent": false,
        "destination": "/",
      },
    };
  }

  return {
    "props": {},
  };
};

export default SignUp;
