import Link from "next/link";

export default function About() {
  const repoUrl = "https://github.com/SilasSpencer1/a1";
  return (
    <div className="p-4" style={{ maxWidth: 720 }}>
      <h1>About this project</h1>
      <hr />
      <h4>Team</h4>
      <ul>
        <li>Silas Spencer</li>
      </ul>
      <h4>Repositories</h4>
      <p className="text-muted">
        This is a monorepo containing both the Next.js client and the Node.js / Express server.
      </p>
      <ul>
        <li>
          Frontend (Next.js):{" "}
          <a href={repoUrl} target="_blank" rel="noreferrer">
            {repoUrl}
          </a>{" "}
          — directory <code>kambaz-next-js/</code>
        </li>
        <li>
          Server (Node.js + Express + Mongoose):{" "}
          <a href={repoUrl} target="_blank" rel="noreferrer">
            {repoUrl}
          </a>{" "}
          — directory <code>kambaz-node-server-app/</code>
        </li>
      </ul>
      <h4>Live deployments</h4>
      <ul>
        <li>
          Client: <a href="https://a1-dun-chi.vercel.app">https://a1-dun-chi.vercel.app</a>{" "}
          (Vercel)
        </li>
        <li>
          Server:{" "}
          <a href="https://kambaz-server-silas.fly.dev/hello">
            https://kambaz-server-silas.fly.dev
          </a>{" "}
          (Fly.io)
        </li>
        <li>Database: MongoDB Atlas</li>
      </ul>
      <hr />
      <Link href="/account/signin">← Back to sign in</Link>
    </div>
  );
}
