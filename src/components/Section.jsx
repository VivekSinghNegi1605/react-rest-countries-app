import { useContext } from "react";
import { ThemeContext } from "./Context";

const Section = ({children, className}) => {
  const {theme} = useContext(ThemeContext)
  return <section className={`px-2 ${className}`}>
    {children}
  </section>;
};

export default Section;
