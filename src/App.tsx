import { Container, MantineProvider } from "@mantine/core";
import { HeaderTabs } from "./components/HeaderTabs";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import { Home } from "./components/Home";

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Container size="xl">
          <HeaderTabs />
          <Container fluid mt="md" p="sm">
            <Routes>
              <Route path={ROUTES.HOME.path} element={<Home />} />
              <Route
                path={ROUTES.LIGHT_LOCATORS_GENERATOR.path}
                element={<p>generator page</p>}
              />
            </Routes>
          </Container>
        </Container>
      </BrowserRouter>
    </MantineProvider>
  );
}
