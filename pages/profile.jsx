import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // if not session, the redirect to the auth page
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        // whether the redirect is permanent or temporary
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
