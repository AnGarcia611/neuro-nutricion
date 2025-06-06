import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextPressure from './ui/TextPressure';
import Threads from './ui/Threads';
import RotatingText from './ui/RotatingText';
import '../styles/contactanos.css';

function Contactanos() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Estado inicial del mute
    const audioMuted = localStorage.getItem('audioMuted') === 'true';
    setIsMuted(audioMuted);
    const pageAudio = document.getElementById('pageAudio');
    if (pageAudio) {
      pageAudio.muted = audioMuted;
    }

    // Audio de fondo
    const savedAudioTime = parseFloat(localStorage.getItem('audioTime')) || 0;

    const handleLoadedMetadata = () => {
      if (savedAudioTime > 0 && savedAudioTime < pageAudio.duration) {
        pageAudio.currentTime = savedAudioTime;
      }
    };

    const handleTimeUpdate = () => {
      localStorage.setItem('audioTime', pageAudio.currentTime);
    };

    const handleEnded = () => {
      pageAudio.currentTime = 0;
      pageAudio.play();
    };

    if (pageAudio) {
      pageAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      pageAudio.addEventListener('timeupdate', handleTimeUpdate);
      pageAudio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (pageAudio) {
        pageAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        pageAudio.removeEventListener('timeupdate', handleTimeUpdate);
        pageAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const toggleSound = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    const pageAudio = document.getElementById('pageAudio');
    if (pageAudio) {
      pageAudio.muted = newIsMuted;
    }
    localStorage.setItem('audioMuted', newIsMuted);
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <>

      <div className="contactanos-page">
        {/* Audio de fondo */}
        <audio id="pageAudio" src="audio/principal.mp3" autoPlay></audio>

        {/* Icono de sonido */}
        <div
          className={`sound-toggle ${isMuted ? 'muted' : ''} animate-scale-in animate-delay-2`}
          onClick={toggleSound}
          title="Silenciar/Activar sonido"
        >
          <span className="icon-on">
            <img src="iconos/sound_off.svg" alt="Sonido activado" />
          </span>
          <span className="icon-off">
            <img src="iconos/sound_on.svg" alt="Sonido desactivado" />
          </span>
        </div>
        <div style={{ width: '100%', height: '600px', position: 'absolute', top: -200, left: 0 }}>
          <Threads
            color={[254, 0, 120]}  /*rgb(254 5 120) [79, 47, 136, 1]*/
            amplitude={0.5}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>

        {/* <div className="header-divider"></div> */}


        {/* Contenido principal */}
        <main className="main-content animate-fade-in-up animate-delay-1">
          <div className="contact-container animate-zoom-in animate-delay-3">
            <div className="content-columns">
              <div className="left-column animate-slide-in-left animate-delay-5">
                <div className="team-section animate-fade-in-up animate-delay-7">
                  <div className="team-member animate-scale-in animate-delay-8">
                    <div className="member-photo">
                      <div className="flower-background">
                        <img src="imagenes/flores_lau.png" alt="Flores decorativas Laura" className="flower-image-laura" />
                      </div>
                      <img src="imagenes/laura.png" alt="Laura Pulido" className="person-image" />
                    </div>
                    <div className="social-icons">
                      <a href="https://www.instagram.com/mihogarunarbol/?igsh=MXVxc3M0aW41N28wcw%3D%3D#" target="_blank" rel="noopener noreferrer">
                        <img src="iconos/logo-instagram.svg" alt="Instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/laura-pulido-medina-8245b6329/" target="_blank" rel="noopener noreferrer">
                        <img src="iconos/logo-linkeding.svg" alt="LinkedIn" />
                      </a>
                    </div>
                    <div className="member-name" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgb(79, 47, 135)', background: 'none', minWidth: '290px', maxWidth: '290px', justifyContent: 'left  ' }}>
                      Laura Pulido
                      <RotatingText
                        texts={['Soñadora', 'Detallista', 'Empática', 'Innovadora', 'Creativa']}
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={3000}
                        mainClassName="rotating-text-bg"
                      />
                    </div>


                  </div>
                  <div className="team-member animate-scale-in animate-delay-10">
                    <div className="member-photo">
                      <div className="flower-background">
                        <img src="imagenes/flores_andrea.png" alt="Flores decorativas Andrea" className="flower-image-andrea" />
                      </div>
                      <img src="imagenes/andrea.png" alt="Andrea Sánchez" className="person-image" />
                    </div>
                    <div className="social-icons">
                      <a href="https://www.instagram.com/drea_111111/" target="_blank" rel="noopener noreferrer">
                        <img src="iconos/logo-instagram.svg" alt="Instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/andrea-sanchez-738835214/" target="_blank" rel="noopener noreferrer">
                        <img src="iconos/logo-linkeding.svg" alt="LinkedIn" />
                      </a>
                    </div>
                    <div className="member-name" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgb(79, 47, 135)', background: 'none', minWidth: '290px', maxWidth: '290px', justifyContent: 'left' }}>
                      Andrea Sánchez
                      <RotatingText
                        texts={['Creativa', 'Artista', 'Profesional', 'Dinámica', 'Talentosa', 'Ingeniosa']}
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={3000}
                        mainClassName="rotating-text-bg"
                      />
                    </div>

                  </div>

                </div>
                <div className="footer-content animate-fade-in-up animate-delay-12" style={{ marginTop: 0, textAlign: 'left', color: '#FE0578', fontWeight: 400, fontSize: '1.1em', maxWidth: 900, margin: '0 auto' }}>
                  <p>Creemos que <strong>informar</strong> es una forma de <strong>cuidar</strong>.<br />
                    <span style={{ color: '#FE0578', fontWeight: 700 }}>Por eso, este <span style={{ color: '#9C27B0' }}>webdoc</span> te invita a <span style={{ color: '#FE0578' }}>reconectar contigo</span>, eligiendo <span style={{ color: '#FE0578' }}>tu bienestar</span>.</span>
                  </p>
                </div>
              </div>
              <div className="right-column animate-slide-in-right animate-delay-6">
                {/* <h2 >NUESTRA</h2>  */}
                <div className="animate-fade-in-down animate-delay-9" style={{ position: 'relative', height: '50px', width: '130px' }}>
                  <TextPressure
                    text="Nuestra"
                    fontFamily='Nunito'
                    textColor="#E94E95"
                    strokeColor="#ff0000"
                    minFontSize={38}
                    flex={true}
                    alpha={false}
                    width={true}
                    weight={false}

                  />

                </div>

                {/* <h1 >Historia</h1> */}
                <div className="animate-fade-in-down animate-delay-11" style={{ position: 'relative', height: '50px', width: '250px' }}>
                  <TextPressure
                    text="Historia"
                    fontFamily='Nunito'
                    textColor="#E94E95"
                    strokeColor="#ff0000"
                    minFontSize={70}
                    flex={true}
                    alpha={false}
                    width={true}
                    weight={false}
                  />
                </div>
                <div className="about-text animate-fade-in-up animate-delay-13" >
                  <p>Diseñadoras digitales y multimedia comprometidas con la creación de experiencias emocionales e interactivas que transforman la forma en que exploramos temas vitales.<br />Desde la sensibilidad artística y la innovación tecnológica, surge nuestro enfoque: la Neuronutrición, un concepto que conecta cuerpo, mente y entorno.</p>
                  <p>Nace en Marzo 2025 esta webdoc no lineal ofrece alternativas conscientes frente a los desafíos del bienestar contemporáneo. Creemos que el cuidado está en nuestras manos y que el diseño digital puede abrir caminos de reflexión, empatía y cambio.</p>
                </div>
              </div>
            </div>
            <div className="heart-brain-logo animate-scale-in animate-delay-14">
              <img src="imagenes/heart_brain.png" alt="Heart and Brain Logo" />
            </div>
          </div>
        </main>


        {/* Íconos de navegación */}
        <div className="icons-grid-container">
          <div className="icons-grid animate-fade-in-up animate-delay-15">
            <div className="icon-box inicio" onClick={() => handleIconClick('/')}>
              <img src="iconos/icono_1.png" alt="Ícono de cerebro" className="icon" />
            </div>
            <div className="icon-box index" onClick={() => handleIconClick('/inicio')}>
              <img src="iconos/icono_2.png" alt="Ícono de alimentación" className="icon" />
            </div>
            <div className="icon-box neuro-nutricion" onClick={() => handleIconClick('/neuro-nutricion')}>
              <img src="iconos/icono_3.png" alt="Ícono de intestino" className="icon" />
            </div>
            <div className="icon-box test-emocional" onClick={() => handleIconClick('/test-emocional')}>
              <img src="iconos/icono_6.png" alt="Ícono de mano" className="icon" />
            </div>
            <div className="icon-box psicobioticos" onClick={() => handleIconClick('/psicobioticos')}>
              <img src="iconos/icono_4.png" alt="Ícono de agua" className="icon" />
            </div>
            <div className="icon-box contactanos" onClick={() => handleIconClick('/contactanos')}>
              <img src="iconos/icono_5.png" alt="Ícono de información" className="icon" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Contactanos;
