"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormControl, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    if (user.password !== verify) {
      setError("Passwords do not match");
      return;
    }
    try {
      const newUser = await client.signup(user);
      dispatch(setCurrentUser(newUser));
      router.push("/account/profile");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <FormControl
        placeholder="username"
        className="wd-username mb-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        placeholder="password"
        type="password"
        className="wd-password mb-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        placeholder="verify password"
        type="password"
        className="wd-password-verify mb-2"
        onChange={(e) => setVerify(e.target.value)}
      />
      <Button onClick={signup} className="w-100 mb-2">
        Sign up
      </Button>
      <br />
      <Link href="/account/signin">Sign in</Link>
    </div>
  );
}
