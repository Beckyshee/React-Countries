import  { useEffect, useReducer } from "react";
import Filter from "./Filter";
import './Countries.jsx'

const apiURL = "https://restcountries.com/v3.1/all";

const initialState = {
  countries: [],
  filtered: [],
  searchInput: "",
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        filtered: action.payload,
        isLoading: false,
      };
    case "SET_FILTERED":
      return {
        ...state,
        filtered: action.payload,
      };
    case "SET_SEARCH_INPUT":
      return {
        ...state,
        searchInput: action.payload,
      };
    default:
      return state;
  }
};

const Countries = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(apiURL);
        const countries = await response.json();
        dispatch({ type: "SET_COUNTRIES", payload: countries });
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const searchCountries = (searchValue) => {
    dispatch({ type: "SET_SEARCH_INPUT", payload: searchValue });

    if (searchValue) {
      const filteredCountries = state.countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      dispatch({ type: "SET_FILTERED", payload: filteredCountries });
    } else {
      dispatch({ type: "SET_FILTERED", payload: state.countries });
    }
  };

  return (
    <>
      <Filter
        searchInput={state.searchInput}
        setSearchInput={searchCountries}
        setFiltered={(filtered) =>
          dispatch({ type: "SET_FILTERED", payload: filtered })
        }
        setCountries={(countries) =>
          dispatch({ type: "SET_COUNTRIES", payload: countries })
        }
        countries={state.countries}
      />
      {state.isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : state.searchInput.length > 1 ? (
        <section className="countries">
          {state.filtered.map((country, index) => (
            <div key={index} className="country">
              <img src={country.flags.png} alt={country.name.common} />
              <div className="details">
                <h4 className="country-name">
                  Name: <span>{country.name.common}</span>
                </h4>
                <h4>
                  Population: <span>{country.population.toLocaleString()}</span>
                </h4>
                <h4>
                  Region: <span>{country.region}</span>
                </h4>
                <h4>
                  Capital: <span>{country.capital}</span>
                </h4>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="countries">
          {state.countries.map((country, index) => (
            <div key={index} className="country">
              <img src={country.flags.png} alt={country.name.common} />
              <div className="details">
                <h4 className="country-name">
                  Name: <span>{country.name.common}</span>
                </h4>
                <h4>
                  Population: <span>{country.population.toLocaleString()}</span>
                </h4>
                <h4>
                  Region: <span>{country.region}</span>
                </h4>
                <h4>
                  Capital: <span>{country.capital}</span>
                </h4>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Countries;
