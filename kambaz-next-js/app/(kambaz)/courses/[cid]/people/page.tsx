"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";
import * as coursesClient from "../../client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsers = async () => {
    if (!cid) return;
    try {
      const list = await coursesClient.findUsersForCourse(cid as string);
      setUsers(list);
    } catch {
      setUsers([]);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [cid]);
  return (
    <div id="wd-people">
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
