import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="fr">
    <Head>
      <link
        rel="manifest"
        href="/manifest.json"
        crossOrigin="use-credentials"
      />
      <link rel="apple-touch-icon" href="/icon-192x192.png" />
      <meta name="theme-color" content="#fff" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
