# App de Estudio — Luis

Colección de herramientas de estudio y seguimiento personal.  
La aplicación principal activa es el **Cuantificador Hormonal PRO**.

---

## ⚗️ Cuantificador Hormonal PRO (PWA offline)

Estima tus niveles de testosterona, HGH, IGF-1, DHT y cortisol
en función de tu entreno, sueño, ayuno, meditación y dieta.  
**Funciona sin internet** después de la primera carga.

### 📁 Archivos
```
hormonas/
├── index.html           ← app principal
├── styles.css           ← estilos offline (sin Tailwind CDN)
├── manifest.webmanifest ← metadatos PWA
├── service-worker.js    ← caché offline
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## 1 · Habilitar GitHub Pages

1. Ve a **Settings → Pages** en el repositorio.
2. En *Source*, selecciona la rama **`main`** (o la que uses) y la carpeta **`/ (root)`**.
3. Haz clic en **Save**.
4. Espera ~1 minuto. La URL será:  
   `https://<tu-usuario>.github.io/<nombre-del-repo>/hormonas/`

---

## 2 · Instalar como app en Android (Edge o Chrome)

1. Abre la URL anterior en **Microsoft Edge** o **Chrome** (Android).
2. Espera que la página cargue completamente.
3. Toca el menú (⋯) → **"Agregar a pantalla de inicio"** (Edge)  
   o el banner **"Instalar app"** que aparece automáticamente.
4. Acepta. Aparecerá un ícono ⚗️ en tu pantalla de inicio.
5. La próxima vez que la abras **no necesitas internet**.

---

## 3 · Probar modo offline

### En el móvil
1. Instala la app (paso 2).
2. Activa el **modo avión** en tu teléfono.
3. Abre la app desde el ícono. Debe cargar normalmente.

### En el navegador de escritorio (DevTools)
1. Abre la URL en Chrome/Edge.
2. Abre DevTools (`F12`) → pestaña **Application** → **Service Workers**.
3. Confirma que el SW está "Activated and is running".
4. En la pestaña **Network**, activa **Offline**.
5. Recarga la página (Ctrl+R). Debe seguir funcionando.

---

## Notas técnicas

- **Sin dependencias externas**: no usa Tailwind CDN ni Google Fonts.
- **Service Worker**: estrategia *stale-while-revalidate* — responde desde caché
  al instante y actualiza en segundo plano cuando hay internet.
- **Cache name**: `hormonas-v1`. Si haces cambios y quieres forzar actualización,
  incrementa la versión en `service-worker.js` (`CACHE_NAME = 'hormonas-v2'`).
- Probado en: Edge Android, Chrome Android, Chrome Desktop, Firefox Desktop.
