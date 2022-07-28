import { Container, MantineProvider } from "@mantine/core";
import { HeaderTabs } from "./components/HeaderTabs";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import { Home } from "./components/Home";
import LightLocatorsGeneratorTab from "./components/LightLocatorsGeneratorTab";
import { useEffect } from "react";

export default function App() {
  // Analytics script for prod
  useEffect(() => {
    if (import.meta.env.PROD) {
      const script = document.createElement("script");

      script.src = "https://athena.david-sima.dev/umami.js";
      script.async = true;
      script.defer = true;
      script.setAttribute(
        "data-website-id",
        "2d43657d-0b56-43f0-864a-930b350bacef"
      );

      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Container size={1500} style={{ minHeight: "100vh" }}>
          <HeaderTabs />
          <Container fluid mt="md" p="sm">
            <Routes>
              <Route path={ROUTES.HOME.path} element={<Home />} />
              <Route
                path={ROUTES.LIGHT_LOCATORS_GENERATOR.path}
                element={<LightLocatorsGeneratorTab />}
              />
            </Routes>
          </Container>
        </Container>
      </BrowserRouter>
    </MantineProvider>
  );
}
