# Inventario de Componentes React - Neuro Nutrición

## Resumen Ejecutivo

Este documento proporciona un inventario completo de todos los componentes React y sus archivos CSS correspondientes en el proyecto Neuro Nutrición. El proyecto utiliza una arquitectura React con routing y manejo de estado local.

---

## 📁 Estructura de Archivos

### Componentes React (`/src/components/`)
- **Index.jsx** - Pantalla de bienvenida con intro
- **Inicio.jsx** - Página principal con video de fondo
- **NeuroNutricion.jsx** - Sección principal con cards interactivas
- **TestEmocional.jsx** - Test interactivo de estado emocional
- **Psicobioticos.jsx** - Información sobre psicobióticos
- **Contactanos.jsx** - Página de contacto y acerca de
- **ui/TextPressure.jsx** - Componente de texto con efectos

### Archivos CSS (`/src/styles/`)
- **index.css** - Estilos para Index.jsx
- **inicio.css** - Estilos para Inicio.jsx  
- **neuro-nutricion.css** - Estilos para NeuroNutricion.jsx
- **test-emocional.css** - Estilos para TestEmocional.jsx
- **psicobioticos.css** - Estilos para Psicobioticos.jsx
- **contactanos.css** - Estilos para Contactanos.jsx
- **footer.css** - Estilos compartidos para navegación

---

## 🔍 Análisis Detallado por Componente

### 1. **Index.jsx** → `index.css`

**Propósito:** Pantalla de introducción con GIF animado y audio

**Clases CSS principales:**
- `.intro-overlay` - Contenedor principal del overlay
- `.intro-gif` - Imagen de bienvenida
- `.sound-toggle` - Control de audio (inline)
- `.icon-on`, `.icon-off` - Estados del icono de sonido

**Funcionalidades:**
- Auto-redirect después de 5.5 segundos
- Control de audio persistente
- Manejo de estado muted

---

### 2. **Inicio.jsx** → `inicio.css`

**Propósito:** Página principal con video de fondo y tarjeta informativa

**Clases CSS principales:**
- `#background-video` - Video de fondo
- `.corner-icon` - Icono de regreso al inicio
- `.sound-toggle` - Control de audio
- `.info-card` - Tarjeta principal de información
- `.card-footer` - Pie de tarjeta
- `.comenzar-btn` - Botón de navegación
- `.divider` - Línea divisora

**Responsividad:**
- Media queries para tablets (768px+)
- Media queries para desktop (1024px+)
- Posicionamiento adaptativo

---

### 3. **NeuroNutricion.jsx** → `neuro-nutricion.css`

**Propósito:** Página principal del contenido con sistema de cards interactivas

**Clases CSS principales:**
- `.neuro-nutricion-container` - Contenedor principal
- `.header-section` - Sección de encabezado
- `.titulo-principal` - Título principal
- `.description` - Descripción
- `.cards-container` - Contenedor de tarjetas
- `.card` - Tarjeta individual
- `.card.active` - Tarjeta activa
- `.card.adjacent` - Tarjetas adyacentes
- `.card-info` - Información de la tarjeta
- `.leer-mas-btn` - Botones de acción
- `.icons-grid` - Grid de navegación inferior

**Cards específicas:**
- `.intestino-card` - Card del intestino
- `.doctor-card` - Card del doctor
- `.main-card` - Card principal (activa por defecto)
- `.cerebro-libro-card` - Card cerebro y libro
- `.comida-mala-card` - Card comida no saludable

**Interactividad:**
- Hover effects en desktop
- Touch interactions en móvil
- Animaciones de transición
- Sistema de tarjetas adyacentes

---

### 4. **TestEmocional.jsx** → `test-emocional.css`

**Propósito:** Test interactivo para evaluar estado emocional

**Clases CSS principales:**
- `.test-emocional-background` - Fondo con círculos
- `.circle` (`.circle-1`, `.circle-2`, `.circle-3`) - Elementos decorativos
- `.background-figure` - Figuras de fondo SVG
- `.hand-pointer-container` - Contenedor de imagen de mano
- `.hand-pointer` - Imagen de mano interactiva
- `.test-container` - Contenedor principal del test
- `.test-title` - Título del test
- `.test-subtitle` - Subtítulos dinámicos
- `.emojis-row` - Fila de opciones emocionales
- `.emoji-option` - Opción individual
- `.emoji-container` - Contenedor de emoji
- `.emoji-label` - Etiqueta del emoji
- `.reset-button` - Botón de reset
- `.parrafo-recomendacion` - Párrafo de recomendación

**Estados emocionales:**
- **Estresado**: Color `#EC6F2D`
- **Triste**: Color `#FA79B6`
- **Alegre**: Color `#2C9DFF`
- **Inicial**: Color `#AE1B8F`

---

### 5. **Psicobioticos.jsx** → `psicobioticos.css`

**Propósito:** Información educativa sobre psicobióticos con carrusel de imágenes

**Clases CSS principales:**
- `.content-section` - Sección principal
- `.content-container` - Contenedor de contenido
- `.info-section` - Sección de información
- `.header-section` - Encabezado
- `.text-container` - Contenedor de texto
- `.image-container` - Contenedor de imágenes
- `.illustration` - Imagen principal del carrusel
- `.icon-arrow-hand` - Icono de flecha interactiva

**Características:**
- Background gradient: `linear-gradient(to right, #3b3b98, #e55039)`
- Carrusel automático de 5 imágenes
- Efectos de hover y animaciones

---

### 6. **Contactanos.jsx** → `contactanos.css`

**Propósito:** Página de contacto y información del equipo

**Clases CSS principales:**
- `.header-container` - Contenedor del header
- `.logo-container` - Contenedor del logo
- `.header-divider` - Línea divisora del header
- `.main-content` - Contenido principal
- `.contact-container` - Contenedor de contacto
- `.content-columns` - Columnas de contenido
- `.left-column`, `.right-column` - Columnas específicas
- `.team-section` - Sección del equipo
- `.team-member` - Miembro del equipo
- `.member-photo` - Foto del miembro
- `.flower-background` - Fondo decorativo
- `.flower-image-laura`, `.flower-image-andrea` - Imágenes específicas
- `.member-name` - Nombre del miembro
- `.member-title` - Título del miembro
- `.about-section` - Sección acerca de
- `.contact-buttons` - Botones de contacto
- `.social-icons` - Iconos sociales
- `.heart-brain-logo` - Logo corazón-cerebro

**Componente especial:**
- Integra `TextPressure` para efectos de texto dinámicos

---

### 7. **ui/TextPressure.jsx** (Sin CSS específico)

**Propósito:** Componente reutilizable para efectos de texto interactivos

**Props principales:**
- `text` - Texto a mostrar
- `fontFamily` - Familia de fuente
- `width`, `weight`, `italic` - Parámetros de fuente variable
- `flex`, `stroke`, `scale` - Efectos visuales
- `textColor`, `strokeColor` - Colores

**Estilos inline:**
- Genera CSS dinámico basado en props
- Efectos de hover y proximidad del cursor
- Transformaciones de fuente variable

---

## 🌐 Archivos CSS Compartidos

### **footer.css**
**Usado por:** Todos los componentes que necesitan navegación

**Clases principales:**
- `.icons-grid` - Grid de navegación inferior
- `.icon-box` - Caja individual de icono
- `.icon-box.inicio`, `.icon-box.index`, etc. - Variantes específicas

**Funcionalidades:**
- Navegación inferior fija
- Responsive design
- Efectos hover
- Sombras y transiciones

---

## 📱 Responsividad Global

Todos los archivos CSS implementan un enfoque **Mobile First** con breakpoints:

- **Mobile**: `< 480px`
- **Tablet**: `481px - 768px`  
- **Desktop**: `> 1024px`
- **Tablet Landscape**: `769px - 1024px`

## 🎵 Funcionalidades Comunes

### Control de Audio
Todos los componentes implementan:
- Toggle de mute persistente
- Continuidad de audio entre páginas
- Iconos de estado visual

### Navegación
- React Router para SPA
- Grid de iconos inferior
- Navegación programática

### Animaciones
- Keyframes CSS para entradas
- Transiciones suaves
- Efectos hover/touch

---

## 🔧 Tecnologías y Patrones

- **React 18** con Hooks (useState, useEffect, useRef)
- **React Router** para navegación
- **CSS Modules** approach
- **Mobile First** responsive design
- **CSS Grid** y **Flexbox**
- **CSS Custom Properties** para theming
- **Intersection Observer** patterns
- **Local Storage** para persistencia

---

## 📋 Estado del Proyecto

✅ **Completado:**
- Todos los componentes principales
- Estilos responsive
- Navegación funcional
- Control de audio global

🔄 **En desarrollo:**
- Optimizaciones de performance
- Accesibilidad mejorada
- PWA features

---

*Generado el: Mayo 28, 2025*
*Proyecto: Neuro Nutrición React App*
