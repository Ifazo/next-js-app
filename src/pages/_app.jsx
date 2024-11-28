import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Playfair_Display } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "react-hot-toast";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={playfairDisplay.className}>
      <SessionProvider session={session}>
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
        </Provider>
      </SessionProvider>
    </main>
  );
}
