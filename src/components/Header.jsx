import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "./Context";
import Button from "./Button";
import Section from './Section.jsx'
import  Container  from "./Container.jsx";


const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Section className={`element-${theme} drop-shadow-lg`}>
      <Container className="flex justify-between py-5">
        <h2 className="text-2xl font-bolder w-60">Where in the world?</h2>
        <Button
          onClick={handleToggleTheme}
        >
          <FaMoon />
          Dark Mode
        </Button>
      </Container>
    </Section>
  );
};

export default Header;
