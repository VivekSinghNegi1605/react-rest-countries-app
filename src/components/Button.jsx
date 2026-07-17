import { useContext } from "react";
import { ThemeContext } from "./Context";


const Button = ({ children, onClick }) => {
  const {theme} = useContext(ThemeContext)
  return <button onClick={onClick} className={`element-${theme} flex items-center gap-4 text-lg py-1 px-4 rounded-lg drop-shadow-xl`}>{children}</button>;
};

export default Button;
