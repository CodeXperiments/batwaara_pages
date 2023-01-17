import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    return null;
  }
  if (status === "loading") {
    return <>Loading....</>;
  }
  return (
    <>
      <Head>
        <title>Batwaara</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <AuthShowcase />
      </main>
    </>
  );
};

export default Login;

const AuthShowcase: React.FC = () => {
  const router = useRouter();
  const { "data": sessionData } = useSession();

  const { "data": secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { "enabled": sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData
            ? async (): Promise<void> => signOut()
            : async (): Promise<void> => signIn()
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={async (): Promise<boolean> => router.push("/signup")}
      >
        To Sign Up
      </button>
    </div>
  );
};