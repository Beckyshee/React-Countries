import { useEffect, useState } from "react";

const Filter = ({ setFiltered, setCountries, countries }) => {
  const regions = [
    { name: "Filter by region", desc: "All" },
    { name: "Africa", desc: "Africa" },
    { name: "Americas", desc: "Americas" },
    { name: "Asia", desc: "Asia" },
    { name: "Europe", desc: "Europe" },
    { name: "Oceania", desc: "Oceania" },
  ];

  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searchAndFilter = (searchValue, region) => {
    setSearchInput(searchValue);

    const filteredCountries = countries.filter((country) =>
      Object.values(country)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    setFiltered(
      filteredCountries.filter((country) =>
        region === "All" ? country : country.region === region
      )
    );
  };

  useEffect(() => {
    const fetchCountriesByRegion = async () => {
      const url =
        selectedRegion === "All"
          ? "https://restcountries.com/v3.1/all"
          : `https://restcountries.com/v3.1/all${selectedRegion}`;

      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
    };

    fetchCountriesByRegion();
  }, [selectedRegion, setCountries]);

  return (
    <form className="form" id="form" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        id="search"
        autoComplete="off"
        placeholder="Search Country"
        value={searchInput}
        onChange={(e) => searchAndFilter(e.target.value, selectedRegion)}
      />

      <div className="select">
        <select
          name="select"
          id="select"
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            searchAndFilter(searchInput, e.target.value);
          }}
          value={selectedRegion}
        >
          {regions.map((regionOption) => (
            <option key={regionOption.name} value={regionOption.desc}>
              {regionOption.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default Filter;
