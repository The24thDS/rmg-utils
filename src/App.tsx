import { Container, MantineProvider, Stack } from "@mantine/core";
import Header from "./components/Header/Header";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import Home from "./components/Home";
import LightLocatorsGeneratorTab from "./components/LightLocatorsGeneratorTab";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Privacy from "./static_pages/Privacy";

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
        <Stack
          sx={{
            minHeight: "100vh",
            maxWidth: "1500px",
          }}
          mx="auto"
        >
          <Header />
          <Container fluid mt="md" p="sm" mx={0}>
            <Routes>
              <Route path={ROUTES.HOME.path} element={<Home />} />
              <Route
                path={ROUTES.LIGHT_LOCATORS_GENERATOR.path}
                element={<LightLocatorsGeneratorTab />}
              />
              <Route path={ROUTES.PRIVACY.path} element={<Privacy />} />
            </Routes>
          </Container>
          <Footer />
        </Stack>
      </BrowserRouter>
    </MantineProvider>
  );
}
