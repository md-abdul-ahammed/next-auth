import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export default function LoginForm() {
  const loginHandler = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password) {
      throw new Error("Please provide all fields");
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      const err = error as CredentialsSignin;
      return err.message;
    }
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Loign</CardTitle>
          <CardDescription>Loign your account !</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Name of your project"
                />
              </div>
            </div>
            <Button className="mt-4" type="submit">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex justify-center w-full font-bold">Or</div>
        </CardFooter>

        <CardFooter className="flex justify-between">
          <form className="justify-center flex flex-1" action="">
            <Button variant={"outline"}>Login with Google</Button>
          </form>
        </CardFooter>

        <CardFooter className="flex justify-between">
          <div className="flex items-center justify-center w-full">
            Don&lsquo;t Have account?
            <Link href={"/sign-up"}>
              <Button
                className="text-blue-600 hover:text-blue-400"
                variant={"link"}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
