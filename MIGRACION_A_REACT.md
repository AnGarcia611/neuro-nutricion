# Migración del Proyecto a React (manteniendo despliegue en GitHub Pages)

## 1. Preparación

- Verifica que tienes acceso de escritura al repositorio y permisos para configurar GitHub Pages.
- Haz un backup del proyecto actual por si necesitas revertir cambios.

**Complejidad:** Baja  
**Riesgos:** Mínimos

---

## 2. Crear el proyecto React dentro del repositorio

- Elige una herramienta: `create-react-app` o Vite.
- Inicializa el proyecto React en una carpeta nueva (por ejemplo, `/react-app`).
- No borres el contenido original hasta finalizar la migración.

**Complejidad:** Baja  
**Riesgos:** Mínimos

---

## 3. Migrar recursos estáticos

- Copia imágenes, iconos y audios a la carpeta `/react-app/public`.
- Ajusta rutas relativas si es necesario.

**Complejidad:** Baja  
**Riesgos:** Rutas incorrectas pueden romper la carga de recursos.

---

## 4. Convertir páginas HTML a componentes React

- Crea un componente para cada página principal.
- Convierte HTML a JSX (cambia `class` por `className`, etc.).
- Divide en componentes reutilizables si es conveniente.

**Complejidad:** Media  
**Riesgos:** Errores de sintaxis JSX, atributos mal convertidos.

---

## 5. Migrar scripts JS a lógica React

- Identifica la lógica de cada script.
- Usa hooks (`useEffect`, `useState`) para animaciones, eventos y estados.
- Integra la lógica en los componentes correspondientes.

**Complejidad:** Media-Alta  
**Riesgos:**  
  - Errores en el manejo del ciclo de vida.
  - Funcionalidades que no se comportan igual que en vanilla JS.

---

## 6. Migrar y adaptar estilos CSS

- Copia los archivos CSS a `/react-app/src` o mantenlos globales.
- Opcional: migra a CSS Modules o styled-components.
- Ajusta rutas de recursos en CSS si es necesario.

**Complejidad:** Baja-Media  
**Riesgos:**  
  - Conflictos de nombres de clases.
  - Estilos que no se aplican igual por el scope de React.

---

## 7. Configurar React Router

- Instala `react-router-dom`.
- Configura rutas para cada página.
- Usa `HashRouter` para asegurar compatibilidad con GitHub Pages.

**Complejidad:** Media  
**Riesgos:**  
  - Rutas que no funcionan correctamente.
  - Navegación rota si no se configuran bien los paths.

---

## 8. Configurar despliegue con `gh-pages`

- Instala el paquete `gh-pages` en `/react-app`.
- En `package.json`, agrega `"homepage": "https://<usuario>.github.io/<repositorio>/"`.
- Agrega scripts:
  ```json
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
  ```
- Ejecuta `npm run deploy` desde `/react-app`.

**Complejidad:** Baja  
**Riesgos:**  
  - Error en la URL de `homepage`.
  - Problemas de permisos en GitHub.
  - El build no se publica correctamente.

---

## 9. Pruebas y ajustes finales

- Prueba todas las rutas y funcionalidades en la versión publicada.
- Verifica carga de recursos y estilos.
- Corrige bugs visuales o de lógica.

**Complejidad:** Variable  
**Riesgos:**  
  - Bugs inesperados.
  - Diferencias de comportamiento respecto al proyecto original.

---

## 10. Limpieza

- Una vez verificado el funcionamiento, puedes eliminar los archivos antiguos si lo deseas.
- Actualiza la documentación del repositorio.

---

**Nota:**  
Durante la migración, mantén ambas versiones (original y React) hasta que la nueva esté completamente funcional y publicada correctamente en GitHub Pages.
