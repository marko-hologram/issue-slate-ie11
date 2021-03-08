// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=Element.prototype.closest%2CNode.prototype.contains%2CNodeList.prototype.forEach"></script>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=CustomEvent%2CPromise"></script>
          <script src="https://cdn.jsdelivr.net/npm/@webcomponents/shadydom@1.7.4/shadydom.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@webcomponents/shadycss@1.10.1/scoping-shim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@webcomponents/shadycss@1.10.1/apply-shim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@webcomponents/shadycss@1.10.1/custom-style-interface.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
