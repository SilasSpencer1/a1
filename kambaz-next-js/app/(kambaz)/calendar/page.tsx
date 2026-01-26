import Link from "next/link";
export default function MyCalendar() {
  return (
    <div id="wd-calendar">
      <h2>Calendar</h2>
      <p>Your course calendar and upcoming events will appear here.</p>
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

