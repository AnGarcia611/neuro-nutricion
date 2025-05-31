import Aurora from "./components/ui/Aurora";
import BlurText from "./components/ui/BlurText";
import Carousel from "./components/ui/Carousel";
import FadeContent from "./components/ui/FadeContent";
import SplashCursor from "./components/ui/SplashCursor";
import Stack from "./components/ui/Stack";
import TextPressure from "./components/ui/TextPressure";
import Threads from "./components/ui/Threads";
import TiltedCard from "./components/ui/TiltedCard";

export default function UITestPage() {
    return (
        <div style={{ padding: 32, background: "#181c1f", minHeight: "100vh", color: "#fff" }}>
            <h1 style={{ textAlign: "center", marginBottom: 32 }}>UI Components Test Page</h1>
            <section style={{ marginBottom: 48 }}>
                <h2>Aurora</h2>
                <div style={{ width: "auto", height: 200, borderRadius: 16, overflow: "hidden", margin: "auto", position: 'relative', background: '#111' }}>
                    <Aurora colorStops={["#00d8ff", "#7cff67", "#ff00cc"]} amplitude={1.2} blend={0.4} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24, letterSpacing: 1, textShadow: '0 2px 8px #000' }}>Aurora Demo</div>
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h1>BlurText </h1>
                <BlurText
                    text="Animación de texto con BlurText: Cada palabra aparece animada y desenfocada."
                    delay={500}
                    className="blur-text" />
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>FadeContent</h2>
                <FadeContent blur duration={1200}>
                    <div style={{ background: "#222", padding: 24, borderRadius: 8 }}>
                        <h3>FadeContent Demo</h3>
                        <p>Este contenido aparece con fade y blur al hacer scroll. Puedes poner cualquier contenido aquí.</p>
                    </div>
                </FadeContent>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>SplashCursor</h2>
                <div style={{ position: "relative", height: 200, background: "#222", borderRadius: 8, overflow: 'hidden' }}>
                    {/* <SplashCursor /> */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24, letterSpacing: 1, textShadow: '0 2px 8px #000' }}>Mueve el mouse aquí</div>
                </div>
            </section>
            <section >
                <h2>Stack</h2>
                <Stack
                    randomRotation={true}
                    sendToBackOnClick={true}
                    cardsData={[
                        { id: 1, img: '/imagenes/imagen_1.png' },
                        { id: 2, img: '/imagenes/imagen_2.png' },
                        { id: 3, img: '/imagenes/imagen_3.png' },
                        { id: 4, img: '/imagenes/imagen_4.png' }
                    ]} />
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>TextPressure</h2>
                <div >
                    <TextPressure text="TextPressure Demo" />
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>Threads</h2>
                <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                    <Threads
                        amplitude={1}
                        distance={0}
                        enableMouseInteraction={true}
                    />
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>TiltedCard</h2>
                <div style={{ width: 320, margin: "auto" }}>
                    <TiltedCard
                        imageSrc="/imagenes/triste.png"
                        altText="Demo Card"
                        showTooltip={false}
                        showMobileWarning={false}
                        scaleOnHover={1.1}
                        rotateAmplitude={30}
                    />
                </div>
            </section>
        </div>
    );
}
