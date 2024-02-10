import 'bootstrap/dist/css/bootstrap.min.css';
import '@/frontend/styles/globals.css';
import Layout from '@/frontend/components/layout/default-layout';

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
