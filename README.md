# KAIZEN — Consultoría Empresarial

Sitio web estático (HTML/CSS/JS puro, sin build step) para KAIZEN, basado en la maqueta de diseño.

## Estructura
```
kaizen-web/
├── index.html
├── css/style.css
├── js/script.js
└── README.md
```

## Animaciones incluidas
- **Título del hero**: efecto de escritura (typing) letra por letra con cursor parpadeante.
- **Fotos** (hero, nosotros, informes): fade-in + leve escala al entrar en el viewport.
- **Íconos y cards** (features, valores, servicios, recursos, stats): zoom-in escalonado al hacer scroll.
- Todo respeta `prefers-reduced-motion`.

## Ejecutar en local
Solo abre `index.html` en el navegador, o usa un server simple:
```bash
npx serve .
```

## Subir a GitHub
```bash
cd kaizen-web
git init
git add .
git commit -m "Sitio inicial KAIZEN"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/kaizen-web.git
git push -u origin main
```

## Desplegar en Vercel
1. Entra a [vercel.com](https://vercel.com) → **Add New Project**.
2. Importa el repo de GitHub `kaizen-web`.
3. Framework Preset: **Other** (sitio estático, no requiere build command).
4. Deploy — listo, sin configuración adicional.

También puedes usar la CLI:
```bash
npm i -g vercel
vercel
```

## Próximos pasos sugeridos
- Reemplazar las imágenes de Unsplash (marcadores de posición) por fotografía real de KAIZEN.
- Conectar el formulario de contacto a un servicio real (Formspree, Resend, o una función serverless en Vercel).
- Agregar páginas internas para "Ver ejemplos de informes" y "Ver todos los recursos" si se necesitan como vistas separadas.
