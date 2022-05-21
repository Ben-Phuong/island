import "../styles/globals.css"
import type { AppProps } from "next/app"
import Footer from "../components/Footer"
import Header from "../components/Header"
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
