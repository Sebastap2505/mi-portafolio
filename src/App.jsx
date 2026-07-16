import { useState, useEffect } from 'react';
import Terminal from './Terminal';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  const [text, setText] = useState("");
  const fullText = "HOLA, SOY SEBASTIÁN_";
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index === 0) {
          setIsDeleting(false);
          setIndex(0);
        }
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const getNavClass = (section) => {
    const baseClass = "py-3 px-4 flex items-center gap-3 w-full transition-all duration-200 border-l-4";
    if (activeSection === section) {
      return `${baseClass} bg-primary-fixed-dim/10 text-primary-fixed-dim border-primary-fixed-dim translate-x-1`;
    }
    return `${baseClass} text-outline border-transparent hover:text-primary-fixed-dim hover:bg-surface-container-high`;
  };

  const certs = [
    {
      title: "Google IT Support Professional Certificate",
      desc: "Valida competencias en soporte técnico, sistemas operativos, seguridad y resolución de problemas.",
      link: "https://coursera.org/share/338d4d74f4842d20a1eac53f9a0e55b5"
    },
    {
      title: "Desarrollo con IA - BIG school",
      desc: "Formación en integración de Inteligencia Artificial aplicada al desarrollo de software.",
      link: "https://drive.google.com/file/d/1Cjg9k4UMyT-efOlJg74YLjzbGEEtA6QV/view"
    }
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col md:flex-row overflow-x-hidden selection:bg-primary-fixed-dim selection:text-background">
      <div className="scanlines"></div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <nav className={`fixed md:flex bg-surface-container-lowest text-secondary-fixed-dim font-label-md uppercase tracking-widest w-64 border-r border-outline-variant h-full flex-col pt-20 pb-8 z-40 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} left-0 top-0 shadow-2xl md:shadow-none`}>
        <div className="px-6 mb-12 flex items-center gap-4">
          <img 
            className="w-10 h-10 rounded-full border border-primary-fixed-dim drop-shadow-[0_0_2px_#a4d659] object-cover" 
            alt="Avatar" 
            src="/sebastian.png" 
          />
          <div>
            <h2 className="font-headline-md text-primary-fixed-dim truncate w-32">S_AYUSO</h2>
            <p className="text-[10px] text-outline opacity-70">sys_engineer</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col w-full">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className={getNavClass('about')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            PERFIL
          </a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)} className={getNavClass('skills')}>
            <span className="material-symbols-outlined">memory</span>
            HABILIDADES
          </a>
          <a href="#certificaciones" onClick={() => setIsMenuOpen(false)} className={getNavClass('certificaciones')}>
            <span className="material-symbols-outlined">verified</span>
            CERTIFICACIONES
          </a>
          <a href="#console" onClick={() => setIsMenuOpen(false)} className={getNavClass('console')}>
            <span className="material-symbols-outlined">terminal</span>
            CONSOLA
          </a>
          
          <a href="https://github.com/Sebastap2505" target="_blank" rel="noreferrer" className="text-outline hover:text-primary-fixed-dim py-3 px-4 flex items-center gap-3 w-full hover:bg-surface-container-high transition-all duration-200 mt-8 border-t border-surface-variant pt-4">
            <span className="material-symbols-outlined">code</span>
            GITHUB
          </a>

          <div className="px-4 mt-6">
            <a 
              href="/cv_sebastian_ayuso.pdf" 
              download="CV_Sebastian_Ayuso.pdf"
              className="bg-primary-fixed-dim/10 text-primary-fixed-dim border border-primary-fixed-dim w-full py-2 hover:bg-primary-fixed-dim hover:text-background transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">download</span>
              DESCARGAR CV
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10 w-full">
        <header className="bg-surface-dim text-primary-fixed-dim font-headline-md tracking-tighter border-b border-outline-variant shadow-[0_0_10px_rgba(164,214,89,0.1)] flex justify-between items-center w-full px-4 md:px-8 h-16 sticky top-0 z-20 backdrop-blur-md">
          <div className="font-bold tracking-widest md:tracking-[0.2em] flex items-center gap-2">
            <button 
              className="md:hidden flex items-center justify-center mr-2 text-primary-fixed-dim hover:bg-surface-container-high p-1 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined text-[28px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <span className="material-symbols-outlined text-[24px] hidden md:block">dataset</span>
            <span className="text-sm md:text-base">RESUMEN_PROFESIONAL</span>
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-16 flex-1 flex flex-col gap-16 pb-12">
          
          <section id="about" className="relative w-full pt-10 pb-12 md:py-16 border-b border-outline-variant flex flex-col lg:flex-row items-center justify-between overflow-hidden gap-12 scroll-mt-24">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-[48px] font-mono tracking-tight text-primary-fixed-dim mb-0 md:mb-6 uppercase h-[120px] md:h-[140px]">
                &gt; {text}
                <span className="animate-pulse border-l-4 border-primary-fixed-dim ml-1"></span>
              </h1>
              <p className="font-mono italic text-sm md:text-base text-primary-fixed-dim/80 border-l-0 md:border-l-2 border-primary-fixed-dim/80 pl-0 md:pl-4 text-center md:text-left mx-auto lg:mx-0 max-w-md lg:max-w-none">
                /* Ing. en Sistemas. Especialista en soporte TI, infraestructura y mantenimiento. Resolutivo ante incidencias y creador de soluciones digitales mediante IA. */
              </p>
            </div>

            <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 shrink-0 mt-4 lg:mt-0 lg:mr-4">
              <div className="absolute inset-0 bg-primary-fixed-dim/20 translate-x-4 translate-y-4 border border-primary-fixed-dim/50 hidden md:block"></div>
              <img 
                src="/sebastian.png" 
                alt="Sebastián Ayuso" 
                className="relative z-10 w-full h-full object-cover border-2 border-primary-fixed-dim transition-all duration-500 cursor-crosshair"
              />
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-primary-fixed-dim z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-primary-fixed-dim z-20"></div>
            </div>
          </section>

          <section id="skills" className="w-full flex flex-col gap-8 scroll-mt-24">
            <div className="flex items-center gap-4 border-b border-surface-variant pb-2">
              <span className="material-symbols-outlined text-secondary-fixed-dim">memory</span>
              <h2 className="text-lg md:text-xl text-on-surface uppercase tracking-widest">TECNOLOGÍAS_Y_HABILIDADES</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
              {['Soporte Técnico', 'Desarrollo Web', 'Inteligencia Artificial', 'Hardware', 'Software', 'Ofimática'].map((skill, i) => (
                <div className="hacker-panel p-4 md:p-6 flex flex-col items-center justify-center gap-4 hover:border-primary-fixed-dim hover:drop-shadow-[0_0_5px_#a4d659] transition-all cursor-crosshair group relative overflow-hidden" key={i}>
                  <span className="text-xs md:text-label-md uppercase tracking-widest text-on-surface-variant group-hover:text-primary-fixed-dim relative z-10 text-center">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="certificaciones" className="w-full flex flex-col gap-8 scroll-mt-24">
            <div className="flex items-center gap-4 border-b border-surface-variant pb-2">
              <span className="material-symbols-outlined text-primary-fixed-dim">verified</span>
              <h2 className="text-lg md:text-xl text-on-surface uppercase tracking-widest">CERTIFICACIONES</h2>
            </div>
            
            {certs.map((cert, i) => (
              <div key={i} className={`hacker-panel p-6 border-l-4 border-primary-fixed-dim flex flex-col md:flex-row justify-between items-center gap-4 ${i === 0 ? 'mb-4' : ''}`}>
                <div>
                  <h3 className="text-primary-fixed-dim font-bold text-lg">{cert.title}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{cert.desc}</p>
                </div>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-primary-fixed-dim/10 text-primary-fixed-dim border border-primary-fixed-dim px-4 py-2 hover:bg-primary-fixed-dim hover:text-background transition-all font-bold text-sm uppercase tracking-widest shrink-0"
                >
                  Verificar
                </a>
              </div>
            ))}
          </section>

          <section id="console" className="w-full flex flex-col gap-8 scroll-mt-24">
            <div className="w-full h-[400px] md:h-[500px] relative">
              <Terminal />
            </div>
          </section>

        </div>

        <footer className="border-t border-outline-variant bg-surface-container-lowest p-8 flex flex-col items-center justify-center gap-4 z-20 relative">
          <div className="text-xs text-outline tracking-widest uppercase">
            © {new Date().getFullYear()} Ing Sebastián Ayuso
          </div>
        </footer>
      </main>
    </div>
  );
}