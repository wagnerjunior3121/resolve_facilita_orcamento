import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import logo from "./assets/logo/logo.png";

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

export default function App() {
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
      doc.text(
        "CPF/CNPJ: 26.083.727/0001-73 - IE: 564.114.999.110",
        105,
        26,
        { align: "center" }
      );
      doc.text(
        "Endereço: AV OSHIGUE MIFUNE, nº 87 - JARDIM PAULISTANO - PROMISSÃO - SP - CEP: 16.377-706",
        105,
        30,
        { align: "center" }
      );
      doc.text(
        "Tel: (14) 99147-1730 | resolvefacilita2024@gmail.com",
        105,
        34,
        { align: "center" }
      );
      doc.line(10, 38, 200, 38);

      // Dados do cliente
      doc.setFontSize(12);
      doc.text("DADOS DO CLIENTE", 10, 46);
      doc.setFontSize(10);
      doc.text(
        `Nome: ${cliente.nome || "-"}
Telefone: ${cliente.telefone || "-"} | Email: ${cliente.email || "-"}
CPF: ${cliente.cpf || "-"}
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
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Dados do Cliente</h2>
      {renderInput("Nome", cliente.nome, (v) => setCliente({ ...cliente, nome: v }))}
      {renderInput(
        "Telefone",
        cliente.telefone,
        (v) => setCliente({ ...cliente, telefone: v })
      )}
      {renderInput("Email", cliente.email, (v) => setCliente({ ...cliente, email: v }))}
      {renderInput("CPF", cliente.cpf, (v) => setCliente({ ...cliente, cpf: v }))}
      {renderInput(
        "Endereço",
        cliente.endereco,
        (v) => setCliente({ ...cliente, endereco: v })
      )}
      {renderInput("Bairro", cliente.bairro, (v) => setCliente({ ...cliente, bairro: v }))} 
      {renderInput("Cidade", cliente.cidade, (v) => setCliente({ ...cliente, cidade: v }))} 
      {renderInput("UF", cliente.uf, (v) => setCliente({ ...cliente, uf: v }))} 
      {renderInput("CEP", cliente.cep, (v) => setCliente({ ...cliente, cep: v }))}

      <h2>Serviço</h2>
      {renderInput("Descrição", servicoAtual.descricao, (v) =>
        setServicoAtual({ ...servicoAtual, descricao: v })
      )}
      {renderInput(
        "Quantidade",
        servicoAtual.quantidade,
        (v) => setServicoAtual({ ...servicoAtual, quantidade: v }),
        "number"
      )}
      {renderInput(
        "Valor (R$)",
        servicoAtual.valor,
        (v) => setServicoAtual({ ...servicoAtual, valor: v }),
        "number"
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={adicionarServico} style={{ marginRight: 10 }}>
          Adicionar Serviço
        </button>
      </div>

      <h2>Valores Extras</h2>
      {renderInput("Desconto (R$)", desconto, setDesconto, "number")}
      {renderInput("Acréscimo (R$)", acrescimo, setAcrescimo, "number")}

      <div style={{ marginTop: 20 }}>
        <button onClick={gerarPDF}>Gerar PDF</button>
      </div>

      <h2>Serviços Adicionados</h2>
      {servicos.map((s, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        >
          <p>
            {i + 1}) {s.descricao} - Quant.: {s.quantidade} - R$ {formatarValor(s.valor)}
          </p>
          <button onClick={() => excluirServico(i)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

const renderInput = (
  label: string,
  value: string,
  onChange: (v: string) => void,
  type: "text" | "number" = "text"
) => (
  <div style={{ marginBottom: 10 }}>
    <label style={{ fontWeight: 600 }}>{label}</label>
    <br />
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Digite o(a) ${label.toLowerCase()}`}
      style={{ padding: 8, width: "100%", marginTop: 4 }}
    />
  </div>
);