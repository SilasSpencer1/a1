"use client";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./account/reducer";
import * as client from "./account/client";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const user = await client.profile();
        dispatch(setCurrentUser(user));
      } catch {
        // not signed in — leave currentUser null
      } finally {
        setPending(false);
      }
    })();
  }, []);
  if (pending) return null;
  return <>{children}</>;
}
