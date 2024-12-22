import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut();
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status === "unauthenticated" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {/* only by authenticated users */}
          {session && status === "authenticated" && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
