import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFilmStore } from "../store";

const toggleDelete = useFilmStore((state) => state.toggleDelete);

const NavBar: React.FC = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string>(location.pathname);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  function handleDelete() {
    toggleDelete();
  }

  return (
    <section className="showcase">
      <nav className="nes-container is-dark">
        <div className="container text-center">
          <div className="row">
            <div className="col float-start ">
              <h2 className="nes-text is-primary">Film Store Database</h2>
              <form className="container-fluid justify-content-start">
                <Link to="/">
                  <button
                    id="NavButton"
                    className={`nes-btn is-primary ${
                      activeButton === "/"
                        ? "nes-btn is-disabled"
                        : "btn-outline-success"
                    }`}
                    type="button"
                  >
                    List
                  </button>
                </Link>
                <Link to="/FilmForm">
                  <button
                    className={`nes-btn is-primary ${
                      activeButton === "/FilmForm"
                        ? "nes-btn is-disabled"
                        : "btn-outline-success"
                    }`}
                    type="button"
                  >
                    Form
                  </button>
                </Link>
                <Link to="/FilmGrid">
                  <button
                    className={`nes-btn is-primary ${
                      activeButton === "/FilmGrid"
                        ? "nes-btn is-disabled"
                        : "btn-outline-success"
                    }`}
                    type="button"
                  >
                    Grid
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete()}
                  className="nes-btn is-error delete-button"
                >
                  Mass delete
                </button>
              </form>
            </div>
            <div className="col d-flex justify-content-end">
              <img
                src="https://media.tenor.com/C1_KkudKHM8AAAAj/mario-dance.gif"
                height={150}
              ></img>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
