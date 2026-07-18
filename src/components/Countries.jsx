import { useState, useEffect, useContext } from "react";
import Search from "./Search.jsx";
import Filter from "./Filter.jsx";
import CountryCard from "./CountryCard.jsx";
import { Link } from "react-router-dom";
import UseLocalStorage from "./UseLocalStorage.jsx";
import Section from "./Section.jsx";
import Container from "./Container.jsx";
import { ThemeContext } from "./Context.jsx";
import CardsContainer from "./CardsContainer.jsx";
import SearchFilterContainer from "./SearchFilterContainer.jsx";

const TOKEN = import.meta.env.VITE_APP_TOKEN;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Countries = () => {
  const { theme } = useContext(ThemeContext);
  const [searchValue, setSearchValue] = UseLocalStorage("searchValue", "");
  const [selectedRegion, setSelectedRegion] = UseLocalStorage(
    "selectedRegion",
    "",
  );
  const [data, setData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchCountries() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}?limit=100`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.data.objects);
      setData(jsonData.data.objects);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (data && data.length) {
      let newCountryData = data;
      if (selectedRegion) {
        newCountryData = newCountryData.filter(({ region }) => {
          return region === selectedRegion;
        });
      }
      if (searchValue) {
        newCountryData = newCountryData.filter(({ names }) => {
          return names.common.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      setCountriesData(newCountryData);
    }
  }, [searchValue, selectedRegion, data]);

  if (loading) {
    return (
      <Section className={`${theme} min-h-[91.8%]`}>
        <Container>
          <div className="">Loading...</div>
        </Container>
      </Section>
    );
  } else if (errorMsg) {
    return (
      <Section className={`${theme} min-h-[91.8%]`}>
        <Container>
          <div className="">Error: {errorMsg}</div>
        </Container>
      </Section>
    );
  } else {
    return (
      <Section className={`${theme} min-h-[91.8%]`}>
        <Container className="py-10">
          <SearchFilterContainer>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            <Filter
              data={data}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </SearchFilterContainer>

          <CardsContainer>
            {countriesData.map((country) => (
              <Link
                to={`/about/${country.codes?.alpha_3?.length === 3 ? country.codes.alpha_3 : country.uuid}`}
                key={country.uuid}
              >
                <CountryCard country={country} theme={theme} />
              </Link>
            ))}
          </CardsContainer>
        </Container>
      </Section>
    );
  }
};

export default Countries;
