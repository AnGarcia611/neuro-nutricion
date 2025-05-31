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
                <div style={{ width: 400, height: 200, borderRadius: 16, overflow: "hidden", margin: "auto", position: 'relative', background: '#111' }}>
                    <Aurora colorStops={["#00d8ff", "#7cff67", "#ff00cc"]} amplitude={1.2} blend={0.4} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24, letterSpacing: 1, textShadow: '0 2px 8px #000' }}>Aurora Demo</div>
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>BlurText</h2>
                <BlurText text="Animación de texto con BlurText: Cada palabra aparece animada y desenfocada." delay={100} />
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>Carousel</h2>
                <Carousel baseWidth={400} autoplay pauseOnHover loop items={[
                    { title: 'Uno', description: 'Primer slide', id: 1, icon: <span role='img' aria-label='uno'>🌟</span> },
                    { title: 'Dos', description: 'Segundo slide', id: 2, icon: <span role='img' aria-label='dos'>🔥</span> },
                    { title: 'Tres', description: 'Tercer slide', id: 3, icon: <span role='img' aria-label='tres'>🎉</span> },
                ]} />
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
                    <SplashCursor />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24, letterSpacing: 1, textShadow: '0 2px 8px #000' }}>Mueve el mouse aquí</div>
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>Stack</h2>
                <Stack randomRotation sendToBackOnClick cardsData={[
                    { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
                    { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
                    { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
                    { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }
                ]} />
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>TextPressure</h2>
                <div style={{ width: 400, height: 100, margin: "auto" }}>
                    <TextPressure text="TextPressure Demo" flex stroke textColor="#fff" strokeColor="#00d8ff" />
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>Threads</h2>
                <div style={{ width: 400, height: 200, margin: "auto", background: "#222", borderRadius: 8, position: "relative" }}>
                    <Threads color={[0, 1, 1]} amplitude={1.2} distance={0.5} enableMouseInteraction />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24, letterSpacing: 1, textShadow: '0 2px 8px #000' }}>Threads Demo</div>
                </div>
            </section>
            <section style={{ marginBottom: 48 }}>
                <h2>TiltedCard</h2>
                <div style={{ width: 320, margin: "auto" }}>
                    <TiltedCard
                        imageSrc="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
                        altText="Demo Card"
                        captionText="Tooltip: Tarjeta 3D interactiva"
                        overlayContent={<div style={{ color: '#fff', padding: 8 }}>Overlay Content<br />Puedes poner aquí info extra.</div>}
                        displayOverlayContent={true}
                        showTooltip={true}
                        showMobileWarning={false}
                    />
                </div>
            </section>
        </div>
    );
}
