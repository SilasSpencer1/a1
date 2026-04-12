"use client";
import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl } from "react-bootstrap";
import * as client from "../../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  const saveUser = async () => {
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");
    const updatedUser = { ...user, firstName: firstName || user.firstName, lastName: lastName || user.lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };
  const saveEmail = async () => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
  };
  const saveRole = async (newRole: string) => {
    const updatedUser = { ...user, role: newRole };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingRole(false);
  };
  const deleteUser = async (id: string) => {
    await client.deleteUser(id);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25" style={{ zIndex: 1000, overflowY: "auto" }}>
      <button onClick={onClose} className="btn position-absolute end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => { setName(`${user.firstName || ""} ${user.lastName || ""}`.trim()); setEditing(true); }}
            className="float-end fs-5 mt-2 wd-edit" style={{ cursor: "pointer" }} />
        )}
        {editing && (
          <FaCheck onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save" style={{ cursor: "pointer" }} />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => { setName(`${user.firstName || ""} ${user.lastName || ""}`.trim()); setEditing(true); }} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl className="w-75 wd-edit-name"
            defaultValue={`${user.firstName || ""} ${user.lastName || ""}`.trim()}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveUser(); }} />
        )}
      </div>
      <hr />
      <div className="mb-2">
        <b>Email:</b>{" "}
        {editingEmail ? (
          <>
            <FormControl type="email" defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveEmail(); }} />
            <FaCheck onClick={saveEmail} className="mt-1" style={{ cursor: "pointer" }} />
          </>
        ) : (
          <span onClick={() => { setEmail(user.email); setEditingEmail(true); }} style={{ cursor: "pointer" }}>
            {user.email} <FaPencil className="ms-1 fs-6" />
          </span>
        )}
      </div>
      <div className="mb-2">
        <b>Role:</b>{" "}
        {editingRole ? (
          <select className="form-control" defaultValue={user.role || "USER"}
            onChange={(e) => saveRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="TA">TA</option>
            <option value="ADMIN">Admin</option>
          </select>
        ) : (
          <span className="wd-roles" onClick={() => setEditingRole(true)} style={{ cursor: "pointer" }}>
            {user.role} <FaPencil className="ms-1 fs-6" />
          </span>
        )}
      </div>
      <div className="mb-2"><b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span></div>
      <div className="mb-2"><b>Section:</b> <span className="wd-section">{user.section}</span></div>
      <div className="mb-2"><b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span></div>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">Delete</button>
      <button onClick={onClose} className="btn btn-secondary float-end me-2 wd-cancel">Cancel</button>
    </div>
  );
}
