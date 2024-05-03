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
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/utils";

export default function SignUpForm() {
  const signUp = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !name || !password) {
      throw new Error("Please provide all fields");
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist");
    }

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    redirect("/login");
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up your account !</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUp}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" placeholder="Your Name" />
              </div>
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
              Sign Up
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
            Already Have account?
            <Link href={"/login"}>
              <Button
                className="text-blue-600 hover:text-blue-400"
                variant={"link"}
              >
                Login
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
