import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Buttons/Button";

const About: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-center">About</h1>
      <div className="flex w-full justify-center">
        <Button
          text="To Home"
          onClick={async (): Promise<boolean> => router.push("/")}
        />
      </div>
    </>
  );
};

export default About;
