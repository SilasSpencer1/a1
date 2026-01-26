import Link from "next/link";
export default function Inbox() {
  return (
    <div id="wd-inbox">
      <h2>Inbox</h2>
      <p>Your messages and notifications will appear here.</p>
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

