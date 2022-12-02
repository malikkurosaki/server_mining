import { createGetInitialProps } from '@mantine/next';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd'

// const getInitialProps = createGetInitialProps();
type Prop = {}

export default class _Document extends Document<Prop>{
  // static getInitialProps = getInitialProps;

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps }

  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
