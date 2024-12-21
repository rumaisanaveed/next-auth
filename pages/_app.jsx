import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </Layout>
  );
}
