import { useContext } from "react";
import { ThemeContext } from "./Context";

const CardContainer = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`drop-shadow-xl rounded-lg w-[min(256px, full)] h-96 element-${theme}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
