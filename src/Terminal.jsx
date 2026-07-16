import { useState, useEffect, useRef } from 'react';

const defaultStyle = "text-on-surface-variant";
const highlightStyle = "text-yellow-400 font-bold";
const titleStyle = "text-primary-fixed-dim font-bold";

const staticTerminalData = [
  { segments: [{ text: "PERFIL DE SEBASTIÁN AYUSO", style: titleStyle }] },
  { segments: [{ text: "--------------------------------------------------", style: titleStyle }] },
  { segments: [{ text: "\nEXPERIENCIA LABORAL:", style: defaultStyle }] },
  { segments: [
    { text: "1. Auxiliar de soporte técnico - ", style: defaultStyle },
    { text: "Instituto Nacional de Migración", style: highlightStyle },
    { text: " (10/2025-04/2026):\n- Mantenimiento preventivo y correctivo de equipos.\n- Instalación y configuración de Software.\n- Soporte a redes y telecomunicaciones.\n- Gestión de respaldos de información institucional.\n- Soporte técnico presencial y documentación de incidencias.", style: defaultStyle }
  ]},
  { segments: [
    { text: "\n2. Auxiliar de Sistemas - ", style: defaultStyle },
    { text: "Universidad UNID", style: highlightStyle },
    { text: " (05/2025-08/2025):\n- Mantenimiento preventivo y correctivo.\n- Atención a usuarios de forma presencial.\n- Cambios de contraseñas y soporte técnico.", style: defaultStyle }
  ]},
  { segments: [
    { text: "\n3. Asistente de TI - ", style: defaultStyle },
    { text: "Feedback Consultores", style: highlightStyle },
    { text: " (09/2024-01/2025):\n- Mantenimiento preventivo y correctivo de equipos.\n- Soporte a usuarios presencial y vía remoto.\n- Registro de incidencias técnicas.", style: defaultStyle }
  ]},
  { segments: [
    { text: "\nEDUCACIÓN:", style: defaultStyle },
    { text: "\nIngeniería en Sistemas Computacionales - ", style: defaultStyle },
    { text: "UNID", style: highlightStyle },
    { text: " (Septiembre 2022 - Agosto 2025)", style: defaultStyle }
  ]},
  { segments: [{ text: "\nHABILIDADES:", style: defaultStyle }] },
  { segments: [{ text: "- Técnicas: Diseño y desarrollo web, Infraestructura TI, Uso de inteligencia artificial, Paquetería Office.\n- Personales: Iniciativa, Comunicación efectiva, Toma de decisiones, Aprendizaje rápido, Trabajo en equipo.\n- Idiomas: Español (Nativo), Inglés (B1 Intermedio).", style: defaultStyle }] },
  { segments: [{ text: "\nCONTACTO:", style: defaultStyle }] },
  { segments: [{ text: "- Tel: 9845276526 | Email: sebastianayuso05@gmail.com", style: defaultStyle }] },
  { segments: [{ text: "--------------------------------------------------", style: titleStyle }] }
];

const windowControls = ['bg-[#ff5f56]', 'bg-[#ffbd2e]', 'bg-[#27c93f]'];

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const terminalRef = useRef(null); 

  useEffect(() => {
    setHistory(staticTerminalData);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full h-full bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col font-mono text-sm overflow-hidden select-text shadow-xl">
      <div className="bg-[#1c1b1b] px-4 py-2 flex items-center gap-2 border-b border-[#1a1a1a] select-none">
        {windowControls.map((color, idx) => (
          <div key={idx} className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
        ))}
        <span className="ml-2 text-[10px] text-outline uppercase tracking-widest">sys_profile_viewer</span>
      </div>

      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto space-y-1 whitespace-pre-wrap text-on-surface-variant scroll-smooth">
        {history.map((line, i) => (
          <div key={i}>
            {line.segments.map((seg, sIndex) => (
              <span key={sIndex} className={seg.style || defaultStyle}>
                {seg.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}