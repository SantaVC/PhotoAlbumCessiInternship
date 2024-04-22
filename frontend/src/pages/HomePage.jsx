import { Outlet } from "react-router-dom";
import { Section, SectionHeading } from "../components";

const HomePage = () => {
  return (
    <Section>
      <SectionHeading>HomePage</SectionHeading>
      <Outlet />
    </Section>
  );
};

export default HomePage;
