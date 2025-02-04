import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "nes.css/css/nes.min.css";
import Layout from "./Layout";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import FilmForm from "./components/FilmForm";
import FilmList from "./components/FilmList";
import FilmGrid from "./components/FilmGrid";

const App: React.FC = () => {
  return (
    <>
      <div>
        <div className="row">
          <div className="col">
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<FilmList />} />
                  <Route
                    path="/FilmForm"
                    element={
                      <FilmForm onFilmAdded={() => window.location.reload()} />
                    }
                  />
                  <Route path="/FilmGrid" element={<FilmGrid />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
