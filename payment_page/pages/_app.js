import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return(
        <>
        <Head>
          {/* Title Tag */}
          <title>{"KarmaPay"}</title>
          {/* Meta Description Attribute */}
          <meta name="description" content={"KarmaPay is an open-source project that aims to simplify online payments by providing a unified API endpoint for multiple payment gateways. It abstracts the complexities of integration, allowing developers to seamlessly work with various payment providers while maintaining a single, consistent interface."} />
          {/* Meta Robots Attribute */}
          <meta name="robots" content="index, follow" />
          {/* Meta Keywords Attribute (less important nowadays) */}
          <meta
            name="keywords"
            content="KarmaPay, PG, payments, payment gateways"
          />
          {/* Meta Viewport Tag for responsive web design */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* Meta Charset Tag */}
          <meta charSet="UTF-8" />
          {/* Meta Language Tag */}
          <meta httpEquiv="content-language" content="en" />
          {/* Meta Author Tag */}
          <meta name="author" content="CoffeeCodes" />
          {/* Dynamic Open Graph Image */}
          <meta
            property="og:image"
            content={
              "https://noobsverse-internal.s3.ap-south-1.amazonaws.com/karmapay-removebg-preview.png"
            }
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/karmapay-removebg-preview.png"
          />
        </Head>
            <Component {...pageProps} />
        </>
    )    
}