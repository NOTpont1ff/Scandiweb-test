import { useEffect, useRef, useState } from "react";
import { FilmData } from "../types/Film";
import { fetchFilms } from "../services/filmService";
import { useFilmStore } from "../store";
const FilmGrid = () => {
  const [film, setFilm] = useState<FilmData[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<FilmData[]>([]);
  const filterCategoryRef = useRef<HTMLSelectElement>(null);
  const toggleSelection = useFilmStore((state) => state.toggleSelection);
  const selectedItems = useFilmStore((state) => state.selectedItems);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    const data = await fetchFilms();
    setFilm(data);
    setFilteredFilms(data);
  };

  const handleFilter = () => {
    const category = filterCategoryRef.current?.value;
    if (category === "All" || !category) {
      setFilteredFilms(film);
    } else {
      setFilteredFilms(film.filter((f) => f.category === category));
    }
  };

  if (filteredFilms.length === 0) {
    console.log("State is empty");
    return (
      <section className="showcase padding">
        <section className="nes-container with-title">
          <p className="text-center">No data records ;(</p>
          <i className="nes-squirtle text-center"></i>
        </section>
      </section>
    );
  }

  return (
    <>
      <section className="showcase padding">
        <section className="nes-container with-title">
          <h2 className="title ">Grid</h2>
          <div id="FilterID " className="container text-center">
            <div className="row">
              <div className="col">
                <select className="nes-input" ref={filterCategoryRef}>
                  <option value="All">All</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
              <div className="col">
                <button className="nes-btn is-primary " onClick={handleFilter}>
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <div className="row">
              {filteredFilms.map((filmData) => (
                <div
                  key={filmData.ID}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 "
                  id="Balls"
                >
                  <div className="nes-container with-title is-centered">
                    <p className="title">{filmData.name}</p>
                    <div className="card-body" id="GridDiv">
                      {" "}
                      <div className="image-item">
                        <img src={filmData.URL} alt="Film" />
                      </div>
                      <p className="card-text">{filmData.category}</p>
                      <p className="card-text">{filmData.price}.00 $</p>
                      <label>
                        <input
                          type="checkbox"
                          className="nes-checkbox"
                          onChange={() => toggleSelection(filmData.ID)}
                        />
                        <span>Delete</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default FilmGrid;
