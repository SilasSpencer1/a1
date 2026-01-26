import Link from "next/link";
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <h1>Kambaz</h1>
      <p>Welcome to Kambaz - A Learning Management System</p>
      <Link href="/labs">View Lab Exercises</Link>
      <br />
      <Link href="/account/signin">Sign In</Link>
      <br />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}


