import { useState } from "react";
import LandingPage from "./LandingPage";
import LaudoTecnico from "./LaudoTecnico";
import Orcamento from "./Orcamento";

type Page = "landing" | "orcamento" | "laudo";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  return (
    <>
      {currentPage === "landing" && (
        <LandingPage
          onSelectOrcamento={() => setCurrentPage("orcamento")}
          onSelectLaudo={() => setCurrentPage("laudo")}
        />
      )}
      {currentPage === "orcamento" && (
        <Orcamento onBack={() => setCurrentPage("landing")} />
      )}
      {currentPage === "laudo" && (
        <LaudoTecnico onBack={() => setCurrentPage("landing")} />
      )}
    </>
  );
}