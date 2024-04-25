import { Outlet } from "react-router-dom";
import { Section, SectionHeading } from "../components";

const Home = () => {
  return (
    <Section>
      <SectionHeading>Home</SectionHeading>
      <Outlet />
    </Section>
  );
};

export default Home;
