import logo from './assets/logo/logo.png';

interface LandingPageProps {
  onSelectOrcamento: () => void;
  onSelectLaudo: () => void;
}

const styles = `
  * {
    box-sizing: border-box;
  }

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

  @keyframes floatAnimation {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
    }
    50% {
      box-shadow: 0 0 0 15px rgba(0, 123, 255, 0);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .header-container {
    animation: slideDown 0.8s ease-out;
  }

  .card-container {
    animation: fadeInUp 1s ease-out 0.2s both;
  }

  .button-card {
    animation: fadeInUp 1s ease-out both;
    transition: all 0.3s ease;
  }

  .button-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2) !important;
  }

  .button-card:nth-child(1) {
    animation-delay: 0.4s;
  }

  .button-card:nth-child(2) {
    animation-delay: 0.6s;
  }

  @media (max-width: 768px) {
    .header-container h1 {
      font-size: 2.5rem !important;
    }

    .header-container p {
      font-size: 1rem !important;
    }

    .button-card h2 {
      font-size: 1.3rem !important;
    }

    .button-card p {
      font-size: 0.9rem !important;
    }

    .cards-grid {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
      padding: 0 15px !important;
    }
  }

  @media (max-width: 480px) {
    .header-container h1 {
      font-size: 1.8rem !important;
      letter-spacing: -1px !important;
    }

    .header-container p {
      font-size: 0.95rem !important;
    }

    .button-card {
      padding: 25px 20px !important;
    }

    .button-card h2 {
      font-size: 1.1rem !important;
    }

    .button-card p {
      font-size: 0.85rem !important;
    }

    .button-card > div:first-child {
      font-size: 2.5rem !important;
      margin-bottom: 10px !important;
    }

    .cards-grid {
      grid-template-columns: 1fr !important;
      gap: 15px !important;
      padding: 0 10px !important;
    }
  }
`;

export default function LandingPage({
  onSelectOrcamento,
  onSelectLaudo,
}: LandingPageProps) {
  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Efeito de partículas de fundo */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.1,
            pointerEvents: "none",
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                background: "white",
                borderRadius: "50%",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `floatAnimation ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: Math.random() * 5 + "s",
              }}
            />
          ))}
        </div>

        {/* Container principal */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "800px",
            width: "90%",
          }}
        >
          {/* Header */}
          <div className="header-container">
            {/* Logo */}
            <div
              style={{
                marginBottom: "30px",
                animation: "slideDown 0.8s ease-out",
              }}
            >
              <img
                src={logo}
                alt="Resolve Facilita Logo"
                style={{
                  maxWidth: "120px",
                  height: "auto",
                  filter: "drop-shadow(0 4px 15px rgba(0, 0, 0, 0.2))",
                }}
              />
            </div>
            <h1
              style={{
                color: "#fff",
                fontSize: "3.5rem",
                fontWeight: "800",
                marginBottom: "10px",
                textShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                letterSpacing: "-2px",
              }}
            >
              RESOLVE FACILITA
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.2rem",
                marginBottom: "15px",
                fontWeight: "300",
              }}
            >
              Documentação Profissional Simplificada
            </p>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #ff6b6b, #fff, #4ecdc4)",
                margin: "0 auto 40px",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Descrição */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "1.1rem",
              marginBottom: "50px",
              lineHeight: "1.6",
              fontWeight: "300",
            }}
          >
            Escolha o serviço que deseja utilizar e gere documentos profissionais em segundos.
          </p>

          {/* Cards dos botões */}
          <div
            className="cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "30px",
              width: "100%",
              maxWidth: "800px",
              padding: "0 20px",
            }}
          >
            {/* Card Orçamento */}
            <div
              className="button-card"
              onClick={onSelectOrcamento}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                padding: "40px 30px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                border: "2px solid transparent",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "15px",
                }}
              >
                📋
              </div>
              <h2
                style={{
                  color: "#333",
                  fontSize: "1.5rem",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Gerar Orçamento
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
              >
                Crie orçamentos profissionais com serviços, valores e descontos personalizados.
              </p>
              <div
                style={{
                  marginTop: "20px",
                  height: "3px",
                  background: "linear-gradient(90deg, transparent, #667eea, transparent)",
                  opacity: 0.3,
                }}
              />
            </div>

            {/* Card Laudo */}
            <div
              className="button-card"
              onClick={onSelectLaudo}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                padding: "40px 30px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                border: "2px solid transparent",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "15px",
                }}
              >
                📄
              </div>
              <h2
                style={{
                  color: "#333",
                  fontSize: "1.5rem",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Gerar Laudo Técnico
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
              >
                Elabore laudos técnicos detalhados com análise de problemas e recomendações.
              </p>
              <div
                style={{
                  marginTop: "20px",
                  height: "3px",
                  background: "linear-gradient(90deg, transparent, #764ba2, transparent)",
                  opacity: 0.3,
                }}
              />
            </div>
          </div>

          {/* Rodapé com informação */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.9rem",
              marginTop: "30px",
              fontWeight: "300",
            }}
          >
            ✨ Documentos gerados em tempo real
          </p>
        </div>
      </div>
    </>
  );
}