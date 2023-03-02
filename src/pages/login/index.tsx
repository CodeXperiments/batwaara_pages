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
import { Anchor, Box, Input, PasswordInput, Title } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Button from "../../components/Buttons/Button";


interface FormProps {
  email: string;
  password: string;
}

const initialState = {
  "email": "",
  "password": "",
};

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const {
    "query": { callbackUrl },
  }: NextRouter = useRouter();

  const callback = callbackUrl as string | undefined;

  const [formValue, setFormValue] = useState<FormProps>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      "email": formValue.email,
      "password": formValue.password,
      "redirect": false, // !This refreshes page
      // "callbackUrl": "/",
    });
    if (result?.error) {
      // TODO: Handle Error
      console.log(result?.error);
    } else {
      window.location.replace((callbackUrl as string) || "/");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta property="og:title" content="Login" key="title" />
      </Head>

      <div className="flex h-screen flex-col items-center justify-center gap-4 " style={{ background: '#32B5AC' }}>
        <Title order={1} color={"white"} align="left" >{'Log In'}</Title>

        <Input.Wrapper required >
          <Input
            style={{ width: '15rem', marginBottom: 15 }}
            name="email"
            placeholder="Enter Email"
            variant="filled"
            radius={"xl"}
            size={'md'}
            onChange={handleChange}
            value={formValue.email}
            icon={<Image src='/icons/mail.svg' height={15} width={15} alt="mail" />}
          />

          <PasswordInput
            style={{ width: '15rem' }}
            name="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            variant="filled"
            radius={"xl"}
            size={'md'}
            required
            icon={<Image src='/icons/lock.svg' height={15} width={15} alt="lock" />}
          />
        </Input.Wrapper>

        <Anchor
          component="button"
          type="button"
          color="dark"
          // onClick={() => toggle()}
          size="xs"
        >
          {'Forgot Password?'}
        </Anchor>

        <Button
          style={{ width: '10rem' }}
          text="Log In"
          variant="filled"
          radius={"xl"}
          color="dark"
          onClick={handleLogin}
        />


        <Anchor
          component="button"
          type="button"
          color="dark"
          // onClick={() => toggle()}
          size="xs"
          underline
        >
          Don't have an account? Create Account
        </Anchor>


        <Box display={"flex"}>
          {providers &&
            Object.values(providers).map((provider) =>
              provider.name === "Credentials" ? null : (
                <div key={provider.name}>
                  <Button
                    text={`Sign in with ${provider.name}`}
                    radius={"xl"}
                    color="dark"
                    variant="white"
                    leftIcon={<Image src='/icons/google.svg' height={15} width={17} alt="google" />}
                    style={{ width: '15rem' }}
                    onClick={async (): Promise<SignInResponse | undefined> =>
                      await signIn(provider.id, {
                        "callbackUrl": callback ?? "/",
                      })
                    } />
                </div>
              )
            )}
        </Box>
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
