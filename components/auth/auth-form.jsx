import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
}

function AuthForm() {
  // states
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  // refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // effects

  // handlers
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (isLogin) {
      // prevent to redirect to the default error page after login fails
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(result);
      if (!result.error) {
        toast.success("Logged in successfully");
        router.replace("/profile");
      } else {
        toast.error(result.error);
      }
    } else {
      const toastId = toast.loading("Creating user...");
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        toast.dismiss(toastId);
        toast.success("User created successfully");
        console.log(result);
      } catch (error) {
        console.error(error);
        toast.dismiss(toastId);
        toast.error(error.message || "Something went wrong!");
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
