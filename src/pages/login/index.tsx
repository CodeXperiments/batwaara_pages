import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
  SignInResponse,
} from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { BuiltInProviderType } from "next-auth/providers";

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const {
    "query": { callbackUrl },
  }: NextRouter = useRouter();

  const callback = callbackUrl as string | undefined;
  return (
    <>
      <Head>
        <title>Login</title>
        <meta property="og:title" content="Login" key="title" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="flex items-center justify-center rounded-md bg-slate-200 p-4 shadow-lg"
                onClick={async (): Promise<SignInResponse | undefined> =>
                  await signIn(provider.id, {
                    "callbackUrl": callback ?? "/",
                  })
                }
              >
                <p className=" text-xl text-slate-800">
                  Sign in with {provider.name}
                </p>
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}> = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    return {
      "redirect": {
        "permanent": false,
        "destination": "/",
      },
    };
  }
  const providers = await getProviders();
  return {
    "props": { providers },
  };
};

export default SignIn;
