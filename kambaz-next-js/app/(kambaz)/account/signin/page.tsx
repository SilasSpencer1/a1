"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button, Alert } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Sign in failed");
    }
  };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <FormControl defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/account/signup">Sign up</Link>
      <hr />
      <Link href="/about" className="text-muted small">About this project</Link>
    </div>
  );
}
