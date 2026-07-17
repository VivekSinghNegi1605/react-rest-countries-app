import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Context";

const Filter = ({ data, selectedRegion, setSelectedRegion }) => {
  const { theme } = useContext(ThemeContext);
  const [regionData, setRegionData] = useState([]);

  function getRegionData(data) {
    let regions = [];
    data.forEach(({ region }) => {
      if (!regions.includes(region)) {
        regions.push(region);
      }
    });
    setRegionData(regions);
  }

  useEffect(() => {
    getRegionData(data);
  }, []);

  function handleSelectChange(event) {
    setSelectedRegion(event.target.value);
  }
  return (
    <select
      className={`element-${theme} px-5 py-1 rounded-md w-72 outline-none drop-shadow-xl`}
      name="region"
      value={selectedRegion}
      id="region"
      onChange={handleSelectChange}
    >
      <option value="">Filter by Region</option>
      {regionData.map((region, index) => (
        <option value={region} key={index}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default Filter;
