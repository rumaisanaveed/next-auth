import { getSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect, useState } from "react";

function UserProfile() {
  // Redirect away if NOT auth
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     setLoading(false);
  //     if (!session) {
  //       window.location.href = "/auth";
  //     }
  //   });
  // }, []);

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const changePasswordHandler = async (passwordData) => {
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
