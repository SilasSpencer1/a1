"use client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../../courses/[cid]/people/PeopleTable";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const list = await client.findAllUsers();
      setUsers(list);
    } catch {
      setUsers([]);
    }
  };

  const filterUsersByRole = async (r: string) => {
    setRole(r);
    if (r) {
      const list = await client.findUsersByRole(r);
      setUsers(list);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (n: string) => {
    setName(n);
    if (n) {
      const list = await client.findUsersByPartialName(n);
      setUsers(list);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-3">
      <h3>Users</h3>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" /> Users
      </button>
      <FormControl
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <br />
      <br />
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
