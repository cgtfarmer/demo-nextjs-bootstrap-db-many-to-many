import NavbarTop from '@/frontend/components/layout/navbar-top';
import Footer from '@/frontend/components/layout/footer';

const Component = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <NavbarTop />
      </header>

      <main className="container">
        {children}
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Component;
