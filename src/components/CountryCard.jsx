import CardContainer from "./CardContainer";
import DetailContainer from "./DetailContainer.jsx";
import DetailTitle from "./DetailTitle.jsx";
import DetailInfo from "./DetailInfo.jsx";
import CountryName from "./CountryName.jsx";

const CountryCard = ({ country }) => {
  return (
    <CardContainer>
      <img
        src={country.flag.url_png}
        alt=""
        className="w-full h-44 rounded-t-lg"
      />
      <div className="pl-4">
        <CountryName className={"text-xl"}>{country.names.common}</CountryName>
        <DetailContainer>
          <DetailTitle> {"Population:"} </DetailTitle>
          <DetailInfo> {country.population} </DetailInfo>
        </DetailContainer>
        <DetailContainer>
          <DetailTitle> {"Region:"} </DetailTitle>
          <DetailInfo> {country.region} </DetailInfo>
        </DetailContainer>
        <DetailContainer>
          <DetailTitle> {"Capital:"} </DetailTitle>
          <DetailInfo> {country.capitals?.[0]?.name || "Na"} </DetailInfo>
        </DetailContainer>
      </div>
    </CardContainer>
  );
};

export default CountryCard;
