import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Toaster richColors position="top-right" />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
