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

function AboutCountry() {
  const { theme } = useContext(ThemeContext);
  const [countryData, setCountryData] = useState([]);
  const { cca3 } = useParams();
  const navigate = useNavigate();

  async function fetchData(cca3) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${cca3}`
      );
      const data = await response.json();
      setCountryData(data);
    } catch (error) {}
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
              <img src={countryData[0].flags.png} alt="" className="h-96" />
            </div>
            <div className="h-full w-3/5">
              <CountryName className={'text-3xl'}>
                {countryData[0].name.common}
              </CountryName>
              <div className="flex flex-wrap gap-y-4 justify-between">
                <div>
                  <DetailContainer>
                    <DetailTitle>Native Name:</DetailTitle>
                    {
                      countryData[0].name.nativeName[
                        Object.keys(countryData[0].name.nativeName)[0]
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
                    <DetailInfo>{countryData[0].capital}</DetailInfo>
                  </DetailContainer>
                </div>
                <div>
                  <DetailContainer>
                    <DetailTitle>Top Level Domain:</DetailTitle>
                    <DetailInfo>{countryData[0].tld}</DetailInfo>
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
                        return <Button key={code} onClick={()=>{fetchData(code)}}>{code}</Button>;
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
