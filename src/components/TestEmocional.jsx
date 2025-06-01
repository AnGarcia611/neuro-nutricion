import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/test-emocional.css';
import FadeContent from './ui/FadeContent';
import BlurText from './ui/BlurText';
import Iridescence from './ui/Iridescence';

function TestEmocional() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [containerBg, setContainerBg] = useState('#AE1B8F');

  useEffect(() => {
    // Estado inicial del mute
    const audioMuted = localStorage.getItem('audioMuted') === 'true';
    setIsMuted(audioMuted);
    const pageAudio = document.getElementById('pageAudio');
    if (pageAudio) {
      pageAudio.muted = audioMuted;
    }

    // Configurar lógica del test emocional
    const emojis = document.querySelectorAll('.emoji-option');
    const handPointer = document.querySelector('.hand-pointer');
    const resetButton = document.querySelector('.reset-button');
    const stateImages = {
      estresado: document.querySelector('.state-image.estresado'),
      triste: document.querySelector('.state-image.triste'),
      alegre: document.querySelector('.state-image.alegre')
    };

    const states = [
      {
        name: 'initial',
        backgroundColor: '#AE1B8F',
        subtitle: '¿Cómo te has sentido últimamente?',
        handImage: 'imagenes/mano.png',
        recommendation: ''
      },
      {
        name: 'stressed',
        backgroundColor: '#EC6F2D',
        subtitle: 'El estrés prolongado puede alterar el equilibrio de tu sistema nervioso y afectar tu bienestar general.',
        handImage: 'imagenes/estresado.png',
        recommendation: 'Incorpora alimentos como avena, banano, nueces o chocolate negro e infusiones naturales. Estos ayudan a regular la serotonina y promover una sensación de calma.'
      },
      {
        name: 'sad',
        backgroundColor: '#FA79B6',
        subtitle: 'La falta de motivación y energía puede estar vinculada a deficiencias de nutrientes clave en tu dieta.',
        handImage: 'imagenes/triste.png',
        recommendation: ' Añade alimentos ricos en omega-3, vitamina D y antioxidantes como pescado azul, huevo y frutas rojas. Favorecen la claridad mental y el equilibrio emocional.'
      },
      {
        name: 'happy',
        backgroundColor: '#2C9DFF',
        subtitle: '¡Estás en sintonía con tu cuerpo y tu mente! Una buena alimentación puede ayudarte a mantener ese estado.',
        handImage: 'imagenes/alegre.png',
        recommendation: 'Continúa con una dieta balanceada que incluya frutas, verduras frescas y suficiente agua. Tu energía es el reflejo de tus hábitos.'
      }
    ];

    if (resetButton) {
      resetButton.style.display = 'none';
    }

    function changeState(state) {
      setContainerBg(state.backgroundColor);

      const subtitles = document.querySelectorAll('.test-subtitle');
      const recommendationSubtitle = subtitles[2];

      if (state.name === 'initial') {
        subtitles[0].style.display = 'block';
        subtitles[1].style.display = 'block';
        recommendationSubtitle.style.display = 'none';
        document.querySelector('.parrafo-recomendacion').textContent = state.recommendation;
        document.querySelector('.emojis-row').style.display = 'flex';
        Object.values(stateImages).forEach(img => img && img.classList.add('hidden'));
      } else {
        subtitles[0].style.display = 'none';
        subtitles[1].style.display = 'none';
        recommendationSubtitle.style.display = 'block';
        recommendationSubtitle.textContent = state.subtitle;
        document.querySelector('.parrafo-recomendacion').textContent = state.recommendation;
        document.querySelector('.emojis-row').style.display = 'none';
      }

      if (handPointer) {
        handPointer.classList.add('rotate-out');
        setTimeout(() => {
          handPointer.src = state.handImage;
          handPointer.classList.remove('rotate-out');
          handPointer.classList.add('rotate-in');
          setTimeout(() => {
            handPointer.classList.remove('rotate-in');
          }, 500);
        }, 250);
      }

      if (resetButton) {
        resetButton.style.display = state.name === 'initial' ? 'none' : 'block';
      }
    }

    // Configurar eventos de emojis
    emojis.forEach((emoji, index) => {
      emoji.addEventListener('click', () => {
        const stateNames = ['stressed', 'sad', 'happy'];
        const stateName = stateNames[index];
        const state = states.find(s => s.name === stateName);

        if (state) {
          changeState(state);

          // Mostrar imagen de estado correspondiente
          Object.values(stateImages).forEach(img => img && img.classList.add('hidden'));
          const stateImage = stateImages[stateName === 'stressed' ? 'estresado' : stateName === 'sad' ? 'triste' : 'alegre'];
          if (stateImage) {
            stateImage.classList.remove('hidden');
          }
        }
      });
    });

    // Configurar botón reset
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        const initialState = states[0];
        changeState(initialState);
      });
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
    <div className="test-emocional-container" style={{ minHeight: '100vh', minWidth: '100vw', background: containerBg, transition: 'background 0.5s' }}>

      {/* Audio de fondo */}
      <audio id="pageAudio" src="audio/principal.mp3" autoPlay></audio>

      {/* Icono de sonido */}
      <div
        className={`sound-toggle ${isMuted ? 'muted' : ''}`}
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

      {/* Imágenes de estados emocionales */}
      <div className="state-images">
        <img src="imagenes/fondo_estresado.png" alt="Estresado" className="state-image estresado hidden" />
        <img src="imagenes/fondo_triste.png" alt="Triste" className="state-image triste hidden" />
        <img src="imagenes/fondo_alegre.png" alt="Alegre" className="state-image alegre hidden" />
      </div>
      <img src="imagenes/fondo_1.svg" alt="Fondo 1" className="background-figure background-figure-1" />
      <img src="imagenes/fondo_2.svg" alt="Fondo 2" className="background-figure background-figure-2" />
      <div className="hand-pointer-container">
        <img src="imagenes/mano.png" alt="Mano apuntando" className="hand-pointer" />
      </div>
      <div className="test-emocional-background">

        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="test-container">
        <BlurText
          text="TEST EMOCIONAL"
          delay={500}
          className="test-title"
        />

        <FadeContent blur duration={1200}>
          <h2 className="test-subtitle">¿Cómo te has sentido últimamente?</h2>
          <h2 className="test-subtitle">Selecciona una opción</h2>
          <h2 className="test-subtitle"></h2>
          <p className="parrafo-recomendacion"></p>
        </FadeContent>



        <button className="reset-button">VOLVER</button>

        <div className="emojis-row">
          <div className="emoji-option">
            <div className="emoji-container">
              <img src="imagenes/estresado.png" alt="Estresado" />
            </div>
            <span className="emoji-label">ESTRESADO/A</span>
          </div>

          <div className="emoji-option">
            <div className="emoji-container">
              <img src="imagenes/triste.png" alt="Triste" />
            </div>
            <span className="emoji-label">TRISTE</span>
          </div>

          <div className="emoji-option">
            <div className="emoji-container">
              <img src="imagenes/alegre.png" alt="Alegre" />
            </div>
            <span className="emoji-label">ALEGRE</span>
          </div>
        </div>
      </div>

      {/* Íconos en la parte inferior */}
      <div className="icons-grid">
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

      <Iridescence
        color1="#560BA4"
        color2="#FE0578"
        color3="#FE0578"
        speed={1}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(174, 27, 143, 0.70)', zIndex: -5 }}></div>
    </div>
  );
}

export default TestEmocional;
