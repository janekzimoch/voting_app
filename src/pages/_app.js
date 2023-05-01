import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component className="background" {...pageProps} />
    </Layout>
  );
}
