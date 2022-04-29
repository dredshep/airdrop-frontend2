import { Html, Head, Main, NextScript } from 'next/document'
const GID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string

export default function Document() {
  return (
    <Html>
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GID}', { page_title: window.location.pathname , page_path: window.location.pathname });
          `,
          }}
        />
        {/* <!-- Twitter universal website tag code --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(e,t,n,s,u,a)
              {e.twq ||
                ((s = e.twq =
                  function () {
                    s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments)
                  }),
                (s.version = '1.1'),
                (s.queue = []),
                (u = t.createElement(n)),
                (u.async = !0),
                (u.src = '//static.ads-twitter.com/uwt.js'),
                (a = t.getElementsByTagName(n)[0]),
                a.parentNode.insertBefore(u, a))}
              (window,document,'script'); // Insert Twitter Pixel ID and Standard Event data below
              twq('init','o84sx'); twq('track','PageView');
            `,
          }}
        />
        <script>
          {`
          
          `}
        </script>

        {/* <!-- End Twitter universal website tag code --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="DeFi coverage protecting your capital" />
        <meta
          name="keywords"
          content="Ethereum, Solace, DeFi, Stablecoin, Protocol, Decentralized, Finance, Uniswap, Yearn, Aave, Compound, Curve, Sushiswap, Coverage, Crypto, Solace Finance, Solace Protocol"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://solace.fi/" />
        <meta property="og:title" content="solace° • Decentralized Coverage Protocol" />
        <meta property="og:description" content="DeFi coverage protecting your capital" />
        <meta property="og:image" content="/images/sharing.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SolaceFi" />
        <meta property="twitter:url" content="https://solace.fi/" />
        <meta property="twitter:title" content="solace° • Decentralized Coverage Protocol" />
        <meta property="twitter:description" content="DeFi coverage protecting your capital" />
        <meta property="twitter:image" content="/images/sharing.png"></meta>
      </Head>
      <body>
        <Main /> <NextScript />
      </body>
    </Html>
  )
}
