import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
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

  .input-group input,
  .input-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
  }

  .input-group input:focus,
  .input-group textarea:focus {
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
  }

  .btn-back:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .problem-item {
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .problem-info {
    flex: 1;
  }

  .problem-info p {
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

  .signature-pad {
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    padding: 8px;
    margin-top: 12px;
    text-align: center;
    background: #fff;
  }

  .signature-canvas {
    width: 100%;
    height: 150px;
    touch-action: none;
    border-radius: 6px;
    background: #fff;
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

    .problem-item {
      flex-direction: column !important;
      align-items: stretch !important;
    }

    .problem-item .btn-danger {
      margin-top: 10px !important;
    }

    .grid-2,
    .grid-3 {
      grid-template-columns: 1fr !important;
      gap: 10px !important;
    }
  }
`;

interface LaudoProps {
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

type ProblemaRelatado = {
  descricao: string;
  constatacao: string;
  recomendacao: string;
  imagem?: string;
};

export default function LaudoTecnico({ onBack }: LaudoProps) {
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

  const [problemas, setProblemas] = useState<ProblemaRelatado[]>([]);
  const [problemaAtual, setProblemaAtual] = useState<ProblemaRelatado>({
    descricao: "",
    constatacao: "",
    recomendacao: "",
    imagem: undefined,
  });

  // Resize / compress image to limit PDF size and memory usage
  const compressImage = (file: File, maxWidth = 1024, quality = 0.75): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            const ratio = width / height;
            width = maxWidth;
            height = Math.round(maxWidth / ratio);
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(String(reader.result));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
          try {
            const dataUrl = canvas.toDataURL(mime, quality);
            resolve(dataUrl);
          } catch (err) {
            // fallback to original if compression fails
            resolve(String(reader.result));
          }
        };
        img.onerror = () => {
          resolve(String(reader.result));
        };
        img.src = String(reader.result);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  // Handle optional image selection for the current problem (compresses before storing)
  const handleProblemaFile = async (file?: File) => {
    if (!file) {
      setProblemaAtual({ ...problemaAtual, imagem: undefined });
      return;
    }
    try {
      const compressed = await compressImage(file, 1024, 0.75);
      setProblemaAtual({ ...problemaAtual, imagem: compressed });
    } catch (e) {
      // fallback: try to read raw file as data URL
      const reader = new FileReader();
      reader.onload = () => setProblemaAtual({ ...problemaAtual, imagem: String(reader.result) });
      reader.readAsDataURL(file);
    }
  };

  const [observacoes, setObservacoes] = useState("");
  // Signature pad state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2.5;
  }, []);

  const getPointerPos = (e: PointerEvent | MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ((e as TouchEvent).touches) {
      const t = (e as TouchEvent).touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    const ev = e as MouseEvent | PointerEvent;
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawing.current = true;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPointerPos(e.nativeEvent, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPointerPos(e.nativeEvent, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawing.current = false;
    const data = canvas.toDataURL("image/png");
    // If canvas is blank, don't save
    if (data === canvas.toDataURL()) {
      setSignatureDataUrl(data);
    } else {
      setSignatureDataUrl(data);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(undefined);
  };

  const adicionarProblema = () => {
    if (problemaAtual.descricao.trim()) {
      setProblemas([...problemas, problemaAtual]);
      setProblemaAtual({ descricao: "", constatacao: "", recomendacao: "", imagem: undefined });
    }
  };

  const excluirProblema = (index: number) => {
    setProblemas(problemas.filter((_, i) => i !== index));
  };

  const gerarLaudo = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, "PNG", 10, 10, 40, 20);
      doc.setFontSize(16);
      doc.text("RESOLVE FACILITA", 105, 20, { align: "center" });

      doc.setFontSize(10);
      const headerLines = [
        "CPF/CNPJ: 26.083.727/0001-73 - IE: 564.114.999.110",
        "Registro Nacional: 3.087.162.582-8",
        "Endereço: AV OSHIGUE MIFUNE, nº 87 - JARDIM PAULISTANO - PROMISSÃO - SP - CEP: 16.377-706",
        "Tel: (14) 99147-1730",
        "E-mails: resolvefacilita2024@gmail.com - barbosaederson1@hotmail.com",
        `Data: ${new Date().toLocaleDateString()}`,
      ];
      // center the header block under the title with controlled spacing
      const headerStartY = 24;
      const headerLineHeight = 5; // small spacing to keep block compact
      headerLines.forEach((line, idx) => {
        doc.text(line, 105, headerStartY + idx * headerLineHeight, { align: "center" });
      });

      doc.setFontSize(12);
      doc.text("LAUDO TÉCNICO", 105, 60, { align: "center" });

      doc.setFontSize(10);
      doc.text("CLIENTE:", 10, 75);
      // print client fields as separate lines to avoid indentation/paragraph issues
      const clientLines = [
        `Nome: ${cliente.nome}`,
        `Telefone: ${cliente.telefone}`,
        `Email: ${cliente.email}`,
        `CPF: ${cliente.cpf}`,
        `Endereço: ${cliente.endereco}, ${cliente.bairro} - ${cliente.cidade}, ${cliente.uf} - CEP: ${cliente.cep}`,
      ];
      const clientStartY = 80;
      const clientLineHeight = 6;
      clientLines.forEach((line, idx) => {
        doc.text(line, 10, clientStartY + idx * clientLineHeight);
      });

      doc.text("PROBLEMAS ENCONTRADOS:", 10, 115);
      let y = 120;
      problemas.forEach((p, i) => {
        doc.text(`${i + 1}. ${p.descricao}`, 10, y);
        y += 5;
        doc.text(`   Constatação: ${p.constatacao}`, 10, y);
        y += 5;
        doc.text(`   Recomendação: ${p.recomendacao}`, 10, y);
        y += 8;

        // If an image was attached, include it in the PDF (safely)
        if ((p as any).imagem) {
          try {
            const imgData = (p as any).imagem as string;
            const imgType = imgData.startsWith("data:image/png") ? "PNG" : "JPEG";
            const imgW = 60;
            const imgH = 45;
            if (y + imgH > 280) {
              doc.addPage();
              y = 20;
            }
            doc.addImage(imgData, imgType as any, 10, y, imgW, imgH);
            y += imgH + 6;
          } catch (e) {
            // ignore image insertion errors and continue
            y += 6;
          }
        }
      });

      if (observacoes) {
        doc.text("OBSERVAÇÕES:", 10, y);
        y += 5;
        doc.text(observacoes, 10, y, { maxWidth: 190 });
      }

      // If there's a signature, add it above the footer
      let footerY = 270;
      if (typeof signatureDataUrl !== "undefined" && signatureDataUrl) {
        try {
          const sigType = signatureDataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
          const sigW = 60;
          const sigH = 30;
          if (y + sigH + 20 > 260) {
            doc.addPage();
            footerY = 260;
          }
          doc.addImage(signatureDataUrl, sigType as any, 105 - sigW / 2, footerY - 30, sigW, sigH);
          doc.setFontSize(10);
          doc.text("Assinatura do responsável", 105, footerY, { align: "center" });
          footerY += 12;
        } catch (e) {
          // ignore signature insertion errors
        }
      }

      doc.text("RESOLVE FACILITA - EDERSON BARBOSA", 105, footerY + 10, {
        align: "center",
      });

      doc.save("laudo-tecnico.pdf");
    };
  };

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
          // Apply masks for specific fields
          if (/telefone/i.test(label)) {
            const onlyDigits = raw.replace(/\D/g, "");
            let formatted = onlyDigits;
            if (onlyDigits.length <= 10) {
              // (DD) ####-####
              formatted = onlyDigits
                .replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, (m, g1, g2, g3) => {
                  if (!g2) return `(${g1}`;
                  if (!g3) return `(${g1}) ${g2}`;
                  return `(${g1}) ${g2}-${g3}`;
                });
            } else {
              // (DD) # ####-#### for 11 digits
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
            const onlyDigits = raw.replace(/\D/g, "").slice(0, 11);
            const formatted = onlyDigits
              .replace(/(\d{3})(\d)/, "$1.$2")
              .replace(/(\d{3})(\d)/, "$1.$2")
              .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
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

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "20px 0", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <button className="btn btn-back" onClick={onBack}>← Voltar</button>
        <div className="form-container" style={{ width: "100%", maxWidth: "800px", background: "rgba(255, 255, 255, 0.95)", borderRadius: "20px", padding: "40px", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)", marginTop: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img src={logo} alt="Logo" style={{ height: "60px", marginBottom: "15px" }} />
            <h1 style={{ fontSize: "32px", color: "#667eea", margin: "10px 0 5px" }}>Gerar Laudo Técnico</h1>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Documento técnico de inspeção e diagnóstico</p>
          </div>

          <h3 className="section-title">📝 Dados do Cliente</h3>
          <div className="grid-2">
            {renderInput("Nome", cliente.nome, (v) => setCliente({ ...cliente, nome: v }))}
            {renderInput("Telefone", cliente.telefone, (v) => setCliente({ ...cliente, telefone: v }))}
            {renderInput("Email", cliente.email, (v) => setCliente({ ...cliente, email: v }))}
            {renderInput("CPF", cliente.cpf, (v) => setCliente({ ...cliente, cpf: v }))}
            {renderInput("Endereço", cliente.endereco, (v) => setCliente({ ...cliente, endereco: v }))}
            {renderInput("Bairro", cliente.bairro, (v) => setCliente({ ...cliente, bairro: v }))}
            {renderInput("Cidade", cliente.cidade, (v) => setCliente({ ...cliente, cidade: v }))}
            {renderInput("UF", cliente.uf, (v) => setCliente({ ...cliente, uf: v }))}
            {renderInput("CEP", cliente.cep, (v) => setCliente({ ...cliente, cep: v }))}
          </div>

          <h3 className="section-title">⚠️ Problemas Encontrados</h3>
          <div className="grid-3">
            {renderInput("Descrição do Problema", problemaAtual.descricao, (v) => setProblemaAtual({ ...problemaAtual, descricao: v }))}
            {renderInput("Constatação", problemaAtual.constatacao, (v) => setProblemaAtual({ ...problemaAtual, constatacao: v }))}
            {renderInput("Recomendação", problemaAtual.recomendacao, (v) => setProblemaAtual({ ...problemaAtual, recomendacao: v }))}
          </div>

          <div className="input-group">
            <label>Foto (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                handleProblemaFile(f);
              }}
            />
            {problemaAtual.imagem && (
              <div style={{ marginTop: 10 }}>
                <img src={problemaAtual.imagem} alt="preview" style={{ maxWidth: 160, maxHeight: 120, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }} />
              </div>
            )}
          </div>

          <button className="btn btn-secondary" onClick={adicionarProblema}>+ Adicionar Problema</button>

          <h3 className="section-title">📋 Observações Gerais</h3>
          <div className="input-group">
            <label>Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Adicione observações gerais sobre o laudo"
              style={{ height: "120px", resize: "vertical" }}
            />
          </div>

          <h3 className="section-title">✍️ Assinatura</h3>
          <div className="input-group">
            <label>Assinatura do responsável (desenhe abaixo)</label>
            <div className="signature-pad">
              <canvas
                ref={canvasRef}
                className="signature-canvas"
                onPointerDown={startDraw}
                onPointerMove={draw}
                onPointerUp={endDraw}
                onPointerLeave={endDraw}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 8, justifyContent: "center" }}>
                <button type="button" className="btn btn-secondary" onClick={clearSignature}>Limpar</button>
                {signatureDataUrl ? (
                  <img src={signatureDataUrl} alt="assinatura" style={{ height: 60, borderRadius: 4, boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }} />
                ) : (
                  <div style={{ color: "#888", alignSelf: "center" }}>Nenhuma assinatura</div>
                )}
              </div>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={gerarLaudo}>📄 Gerar PDF do Laudo</button>
          </div>

          {problemas.length > 0 && (
            <>
              <h3 className="section-title">✅ Problemas Adicionados</h3>
              {problemas.map((p, i) => (
                <div key={i} className="problem-item">
                  <div className="problem-info">
                    <p><strong>Problema {i + 1}:</strong> {p.descricao}</p>
                    <p><strong>Constatação:</strong> {p.constatacao}</p>
                    <p><strong>Recomendação:</strong> {p.recomendacao}</p>
                  </div>
                  <button className="btn btn-danger" onClick={() => excluirProblema(i)}>Excluir</button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
