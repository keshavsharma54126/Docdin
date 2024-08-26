"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import GoogleButton from "@/components/GoogleButton";
import { useRouter } from "next/navigation";
import AuthLayout from "../layout";

const SignUp: React.FC = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-50 gap-5 w-screen">
        <div className="text-3xl font-bold text-teal-500">
          Welcome To DocdIN{" "}
        </div>
        <div>please sign up to continue</div>
        <Card className="p-8 shadow-lg ">
          <h1 className="text-3xl font-bold mb-6 text-teal-500">Sign Up</h1>
          <form onSubmit={handleSignIn} className="flex flex-col items-center">
            <input name="csrfToken" type="hidden" />
            <div className="mb-6 w-full">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                id="fullname"
                name="John Doe"
                type="text"
                value={fullname}
                placeholder="john doe"
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="johndoe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full hover:bg-teal-600 transition">
              Sign Up
            </button>
          </form>
          <div className="mt-6 w-full">
            <GoogleButton
              onClick={async () => {
                const res = await signIn("google");
                if (res?.ok) {
                  router.push("/");
                } else {
                  console.error("error while signing in ");
                }
              }}
            />
          </div>
          <div className="mt-4 text-center">
            <Link href="/signin" className="text-teal-500">
              Already have an accont?
              <span className="underline font-bold"> Sign in</span>
            </Link>
          </div>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
