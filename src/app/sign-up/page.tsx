"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

//react icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      router.push("/sign-in");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <Card className="w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Sign up
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-500">
            Use email or service to create an account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-red-500/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600 mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={pending}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg mt-4"
              size="lg"
              disabled={pending}
            >
              Continue
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="flex my-2 justify-evenly items-center">
            <Button
              disabled={false}
              onClick={() => {}}
              variant="outline"
              size="lg"
              className="bg-slate-100 hover:bg-slate-200 transition-all ease-in-out p-2 rounded-full"
            >
              <FcGoogle className="w-6 h-6" />
            </Button>
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="bg-slate-100 hover:bg-slate-200 transition-all ease-in-out p-2 rounded-full"
            >
              <FaGithub className="w-6 h-6" />
            </Button>
          </div>

          <p className="text-center text-sm mt-2 text-gray-500">
            Already have an account?
            <Link
              className="text-blue-600 ml-4 hover:underline cursor-pointer"
              href="sign-in"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
