import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import MassDeleteProvider from "./components/Context/MassDeleteContext";

const Layout = () => {
  return (
    <MassDeleteProvider>
      <div className="App">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </MassDeleteProvider>
  );
};

export default Layout;
