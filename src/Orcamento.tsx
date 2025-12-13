import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import logo from "./assets/logo/logo.png";

const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-container {
    animation: fadeInUp 0.6s ease-out;
  }

  .section-title {
    color: #333;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 3px solid #667eea;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-group label {
    display: block;
    font-weight: 600;
    color: #555;
    margin-bottom: 8px;
    font-size: 0.95rem;
  }

  .input-group input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
  }

  .input-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .button-group {
    display: flex;
    gap: 15px;
    margin-top: 30px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 12px 30px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
    flex: 1;
    min-width: 150px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  .btn-secondary {
    background: #28a745;
    color: white;
  }

  .btn-secondary:hover {
    background: #1e7e34;
    transform: translateY(-2px);
  }

  .btn-danger {
    background: #dc3545;
    color: white;
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .btn-danger:hover {
    background: #c82333;
  }

  .btn-back {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    flex: none !important;
    width: auto !important;
  }

  .btn-back:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .service-item {
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .service-info {
    flex: 1;
  }

  .service-info p {
    margin: 5px 0;
    color: #555;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 1024px) {
    .form-container {
      width: 90% !important;
      max-width: 700px !important;
    }

    .grid-3 {
      grid-template-columns: 1fr 1fr !important;
    }
  }

  @media (max-width: 768px) {
    .form-container {
      width: 95% !important;
      max-width: 600px !important;
      padding: 30px 20px !important;
      margin: 10px !important;
    }

    .section-title {
      font-size: 1.3rem !important;
      margin-top: 20px !important;
      margin-bottom: 15px !important;
    }

    .input-group {
      margin-bottom: 12px !important;
    }

    .input-group label {
      font-size: 0.9rem !important;
    }

    .btn {
      padding: 10px 20px !important;
      font-size: 0.95rem !important;
      min-width: 120px !important;
    }

    .button-group {
      gap: 10px !important;
      margin-top: 20px !important;
    }

    .grid-2,
    .grid-3 {
      grid-template-columns: 1fr !important;
      gap: 15px !important;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      width: 98% !important;
      max-width: 100% !important;
      padding: 20px 15px !important;
      margin: 5px !important;
      border-radius: 12px !important;
    }

    .form-container h1 {
      font-size: 24px !important;
      margin: 5px 0 !important;
    }

    .form-container > div:first-child p {
      font-size: 12px !important;
    }

    .section-title {
      font-size: 1.1rem !important;
      margin-top: 15px !important;
      margin-bottom: 12px !important;
      padding-bottom: 8px !important;
    }

    .input-group label {
      font-size: 0.9rem !important;
      margin-bottom: 6px !important;
    }

    .input-group input,
    .input-group textarea {
      padding: 10px 12px !important;
      font-size: 0.95rem !important;
    }

    .btn {
      padding: 10px 15px !important;
      font-size: 0.9rem !important;
      min-width: 100px !important;
    }

    .button-group {
      flex-direction: column !important;
      gap: 8px !important;
      margin-top: 15px !important;
    }

    .button-group .btn {
      width: 100% !important;
      flex: none !important;
    }

    .service-item {
      flex-direction: column !important;
      align-items: stretch !important;
    }

    .service-item .btn-danger {
      margin-top: 10px !important;
    }

    .grid-2,
    .grid-3 {
      grid-template-columns: 1fr !important;
      gap: 10px !important;
    }
  }
`;

interface OrcamentoProps {
  onBack: () => void;
}

type Cliente = {
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
};

type Servico = {
  descricao: string;
  quantidade: string;
  valor: string;
};

export default function Orcamento({ onBack }: OrcamentoProps) {
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
  });

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicoAtual, setServicoAtual] = useState<Servico>({
    descricao: "",
    quantidade: "1",
    valor: "",
  });

  const [desconto, setDesconto] = useState("0");
  const [acrescimo, setAcrescimo] = useState("0");

  const formatarValor = (v: string | number) =>
    parseFloat(String(v || "0")).toFixed(2).replace(".", ",");

  const adicionarServico = () => {
    if (!servicoAtual.descricao || !servicoAtual.valor) return;
    setServicos([...servicos, servicoAtual]);
    setServicoAtual({ descricao: "", quantidade: "1", valor: "" });
  };

  const excluirServico = (index: number) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  const gerarPDF = () => {
    const totalServicos = servicos.reduce(
      (acc, s) => acc + parseFloat(s.valor || "0") * parseFloat(s.quantidade || "1"),
      0
    );

    const total =
      totalServicos - parseFloat(desconto || "0") + parseFloat(acrescimo || "0");

    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      // Cabeçalho
      doc.addImage(img, "PNG", 10, 10, 15, 15);
      doc.setFontSize(18);
      doc.text("RESOLVE FACILITA", 105, 20, { align: "center" });

      doc.setFontSize(10);
      const headerLines = [
        "CPF/CNPJ: 26.083.727/0001-73 - IE: 564.114.999.110",
        "Registro Nacional: 3.087.162.582-2",
        "Endereço: AV OSHIGUE MIFUNE, nº 87 - JARDIM PAULISTANO - PROMISSÃO - SP - CEP: 16.377-706",
        "Tel: (14) 99147-1730 | resolvefacilita2024@gmail.com",
      ];
      const headerStartY = 24;
      const headerLineHeight = 5;
      headerLines.forEach((line, idx) => {
        doc.text(line, 105, headerStartY + idx * headerLineHeight, { align: "center" });
      });
      // Draw separator positioned above the client block
      const clientHeadingY = 46; // y position for the "DADOS DO CLIENTE" title
      const separatorY = clientHeadingY - 4; // a few points above the client heading
      doc.line(10, separatorY, 200, separatorY);

      // Dados do cliente
      doc.setFontSize(12);
      doc.text("DADOS DO CLIENTE", 10, clientHeadingY);
      doc.setFontSize(10);
      // Ajusta o rótulo para CPF ou CNPJ automaticamente conforme entrada (11 vs 14 dígitos)
      const idDigits = (cliente.cpf || "").replace(/\D/g, "");
      const idLabel = idDigits.length === 14 ? "CNPJ" : "CPF";
      doc.text(
        `Nome: ${cliente.nome || "-"}
Telefone: ${cliente.telefone || "-"} | Email: ${cliente.email || "-"}
${idLabel}: ${cliente.cpf || "-"}
Endereço: ${cliente.endereco || "-"}
Bairro: ${cliente.bairro || "-"} - ${cliente.cidade || "-"} / ${cliente.uf || "-"} - CEP: ${cliente.cep || "-"}`,
        10,
        52
      );

      // Tabela de serviços
      autoTable(doc, {
        startY: 90,
        head: [["Descrição", "Qtd", "Valor Unit.", "Total"]],
        body: servicos.map((s) => [
          s.descricao,
          s.quantidade,
          `R$ ${formatarValor(s.valor)}`,
          `R$ ${formatarValor(
            parseFloat(s.valor) * parseFloat(s.quantidade)
          )}`,
        ]),
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [60, 60, 60],
          textColor: 255,
          halign: "center",
        },
        bodyStyles: {
          halign: "center",
        },
      });

      let finalY = (doc as any).lastAutoTable.finalY + 10;

      // Totais
      doc.setFontSize(11);
      doc.text("RESUMO FINANCEIRO", 10, finalY);
      doc.setFontSize(10);
      doc.text(`Subtotal: R$ ${formatarValor(totalServicos)}`, 10, finalY + 6);
      doc.text(`Desconto: R$ ${formatarValor(desconto)}`, 10, finalY + 12);
      doc.text(`Acréscimo: R$ ${formatarValor(acrescimo)}`, 10, finalY + 18);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Total: R$ ${formatarValor(total)}`, 10, finalY + 28);

      // Rodapé
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Orçamento nº 001 - Emitido em: ${new Date().toLocaleDateString()} (Válido por 7 dias)`,
        105,
        280,
        { align: "center" }
      );
      doc.text("RESOLVE FACILITA - EDERSON BARBOSA", 105, 287, {
        align: "center",
      });

      doc.save("orcamento.pdf");
    };
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "20px 0", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "10px" }}>
          <button className="btn btn-back" onClick={onBack}>← Voltar</button>
        </div>
        <div className="form-container" style={{ width: "100%", maxWidth: "800px", background: "rgba(255, 255, 255, 0.95)", borderRadius: "20px", padding: "40px", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)", marginTop: "0px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px", paddingBottom: "30px", borderBottom: "2px solid #f0f0f0" }}>
            <img src={logo} alt="Resolve Facilita" style={{ maxWidth: "100px", height: "auto", marginBottom: "15px" }} />
            <h1 style={{ color: "#333", fontSize: "2.5rem", margin: "0 0 10px 0", fontWeight: "800" }}>Gerar Orçamento</h1>
            <p style={{ color: "#666", fontSize: "1rem", margin: 0 }}>Preencha os dados para gerar seu orçamento profissional</p>
          </div>
          <h3 className="section-title">📝 Dados do Cliente</h3>
          <div className="grid-2">
            {renderInput("Nome", cliente.nome, (v) => setCliente({ ...cliente, nome: v }))}
            {renderInput("Telefone", cliente.telefone, (v) => setCliente({ ...cliente, telefone: v }))}
            {renderInput("Email", cliente.email, (v) => setCliente({ ...cliente, email: v }))}
            {renderInput("CPF/CNPJ", cliente.cpf, (v) => setCliente({ ...cliente, cpf: v }))}
            {renderInput("Endereço", cliente.endereco, (v) => setCliente({ ...cliente, endereco: v }))}
            {renderInput("Bairro", cliente.bairro, (v) => setCliente({ ...cliente, bairro: v }))}
            {renderInput("Cidade", cliente.cidade, (v) => setCliente({ ...cliente, cidade: v }))}
            {renderInput("UF", cliente.uf, (v) => setCliente({ ...cliente, uf: v }))}
            {renderInput("CEP", cliente.cep, (v) => setCliente({ ...cliente, cep: v }))}
          </div>
          <h3 className="section-title">💼 Serviço</h3>
          <div className="grid-3">
            {renderInput("Descrição", servicoAtual.descricao, (v) => setServicoAtual({ ...servicoAtual, descricao: v }))}
            {renderInput("Quantidade", servicoAtual.quantidade, (v) => setServicoAtual({ ...servicoAtual, quantidade: v }), "number")}
            {renderInput("Valor (R$)", servicoAtual.valor, (v) => setServicoAtual({ ...servicoAtual, valor: v }), "number")}
          </div>
          <h3 className="section-title">💰 Valores Extras</h3>
          <div className="grid-2">
            {renderInput("Desconto (R$)", desconto, setDesconto, "number")}
            {renderInput("Acréscimo (R$)", acrescimo, setAcrescimo, "number")}
          </div>
          <div className="button-group">
            <button className="btn btn-secondary" onClick={adicionarServico}>➕ Adicionar Serviço</button>
            <button className="btn btn-primary" onClick={gerarPDF}>📥 Gerar PDF</button>
          </div>
          <h3 className="section-title">📋 Serviços</h3>
          {servicos.length === 0 ? <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>Nenhum serviço adicionado</p> : servicos.map((s, i) => (
            <div key={i} className="service-item">
              <div className="service-info">
                <p><strong>Item {i + 1}:</strong> {s.descricao}</p>
                <p>Quantidade: {s.quantidade} | Valor: R$ {formatarValor(s.valor)}</p>
              </div>
              <button className="btn btn-danger" onClick={() => excluirServico(i)}>🗑️ Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const renderInput = (
  label: string,
  value: string,
  onChange: (v: string) => void,
  type: "text" | "number" = "text"
) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => {
        const raw = e.target.value;
        if (/telefone/i.test(label)) {
          const onlyDigits = raw.replace(/\D/g, "");
          let formatted = onlyDigits;
          if (onlyDigits.length <= 10) {
            formatted = onlyDigits
              .replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, (m, g1, g2, g3) => {
                if (!g2) return `(${g1}`;
                if (!g3) return `(${g1}) ${g2}`;
                return `(${g1}) ${g2}-${g3}`;
              });
          } else {
            formatted = onlyDigits.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/, (m, g1, g2, g3, g4) => {
              if (!g2) return `(${g1}`;
              if (!g3) return `(${g1}) ${g2} ${g3}`;
              if (!g4) return `(${g1}) ${g2} ${g3}-${g4}`;
              return `(${g1}) ${g2} ${g3}-${g4}`;
            });
          }
          onChange(formatted);
          return;
        }

        if (/cpf/i.test(label)) {
          const onlyDigits = raw.replace(/\D/g, "").slice(0, 14); // suporta CPF (11) ou CNPJ (14)
          let formatted = onlyDigits;
          if (onlyDigits.length <= 11) {
            // Formatação progressiva para CPF: XXX.XXX.XXX-XX
            formatted = onlyDigits.replace(/^(\d{1,3})(\d{0,3})?(\d{0,3})?(\d{0,2})?$/, (_, a = "", b = "", c = "", d = "") => {
              let out = a;
              if (b) out += `.${b}`;
              if (c) out += `.${c}`;
              if (d) out += `-${d}`;
              return out;
            });
          } else {
            // Formatação progressiva para CNPJ: XX.XXX.XXX/XXXX-XX
            formatted = onlyDigits.replace(/^(\d{1,2})(\d{0,3})?(\d{0,3})?(\d{0,4})?(\d{0,2})?$/, (_, a = "", b = "", c = "", d = "", e = "") => {
              let out = a;
              if (b) out += `.${b}`;
              if (c) out += `.${c}`;
              if (d) out += `/${d}`;
              if (e) out += `-${e}`;
              return out;
            });
          }
          onChange(formatted);
          return;
        }

        if (/cep/i.test(label)) {
          const onlyDigits = raw.replace(/\D/g, "").slice(0, 8);
          const formatted = onlyDigits.replace(/(\d{5})(\d{1,3})?/, (m, g1, g2) => (g2 ? `${g1}-${g2}` : g1));
          onChange(formatted);
          return;
        }

        onChange(raw);
      }}
      placeholder={`Digite o(a) ${label.toLowerCase()}`}
    />
  </div>
);
