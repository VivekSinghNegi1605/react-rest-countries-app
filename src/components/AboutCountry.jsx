import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ThemeContext } from "./Context";
import Section from "./Section.jsx";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import DetailContainer from "./DetailContainer.jsx";
import DetailTitle from "./DetailTitle.jsx";
import DetailInfo from "./DetailInfo.jsx";
import CountryName from "./CountryName.jsx";

const TOKEN = import.meta.env.VITE_APP_TOKEN;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function AboutCountry() {
  const { theme } = useContext(ThemeContext);
  const [countryData, setCountryData] = useState([]);
  const { cca3 } = useParams();
  const navigate = useNavigate();

  async function fetchData(cca3) {
    try {
      const endpoint =
        cca3?.length === 3 ? `codes.alpha_3=${cca3}` : `uuid=${cca3}`;

      const response = await fetch(`${BASE_URL}?${endpoint}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.errors?.[0]?.message || "Failed to fetch country",
        );
      }

      setCountryData(data.data.objects);
    } catch (error) {
      console.error("Country fetch error:", error);
    }
  }

  useEffect(() => {
    fetchData(cca3);
  }, []);

  return (
    <Section className={`${theme} min-h-[91.8%]`}>
      <Container className="py-10">
        <Button onClick={() => navigate("/")}>
          <FaArrowLeftLong />
          Back
        </Button>

        {countryData && countryData[0] ? (
          <div className="flex flex-wrap sm:flex-nowrap my-20 justify-between gap-x-4">
            <div className=" w-full h-2/3">
              <img src={countryData[0].flag.url_png} alt="" className="h-96" />
            </div>
            <div className="h-full w-3/5">
              <CountryName className={"text-3xl"}>
                {countryData[0].names.common}
              </CountryName>
              <div className="flex flex-wrap gap-y-4 justify-between">
                <div>
                  <DetailContainer>
                    <DetailTitle>Native Name:</DetailTitle>
                    {
                      countryData[0].names.native[
                        Object.keys(countryData[0].names.native)[0]
                      ].common
                    }
                    <DetailInfo></DetailInfo>
                  </DetailContainer>
                  <DetailContainer>
                    <DetailTitle>Population:</DetailTitle>
                    <DetailInfo>{countryData[0].population}</DetailInfo>
                  </DetailContainer>
                  <DetailContainer>
                    <DetailTitle>Region:</DetailTitle>
                    <DetailInfo>{countryData[0].region}</DetailInfo>
                  </DetailContainer>
                  <DetailContainer>
                    <DetailTitle>Sub Region:</DetailTitle>
                    <DetailInfo>{countryData[0].subregion}</DetailInfo>
                  </DetailContainer>
                  <DetailContainer>
                    <DetailTitle>Capital:</DetailTitle>
                    <DetailInfo>
                      {countryData[0].capitals?.[0]?.name || "Na"}
                    </DetailInfo>
                  </DetailContainer>
                </div>
                <div>
                  <DetailContainer>
                    <DetailTitle>Top Level Domain:</DetailTitle>
                    <DetailInfo>{countryData[0].tlds}</DetailInfo>
                  </DetailContainer>
                  <DetailContainer>
                    <DetailTitle>Currencies:</DetailTitle>
                    <DetailInfo></DetailInfo>
                    {Object.keys(countryData[0].currencies).join(", ")}
                  </DetailContainer>
                  <DetailContainer>
                    <DetailTitle>Languages:</DetailTitle>
                    <DetailInfo></DetailInfo>
                    {Object.values(countryData[0].languages).join(", ")}
                  </DetailContainer>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-4 items-center my-5">
                  <span className="font-bold">Border Countries:</span>
                  {countryData[0].borders && countryData[0].borders.length
                    ? countryData[0].borders.map((code) => {
                        return (
                          <Button
                            key={code}
                            onClick={() => {
                              fetchData(code);
                            }}
                          >
                            {code}
                          </Button>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export default AboutCountry;
