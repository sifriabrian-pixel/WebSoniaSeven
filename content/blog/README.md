# Cómo cargar artículos del blog

Cada artículo es un archivo `.md` en esta carpeta. El nombre del archivo
define la URL (`mi-articulo.md` → `/blog/mi-articulo`).

Formato:

```md
---
title: Título del artículo
excerpt: Resumen corto que aparece en el listado.
date: 2026-01-15
---

Contenido del artículo en texto plano, separado en párrafos por una
línea en blanco.
```

No hace falta instalar nada ni tocar código: con agregar el archivo
`.md` acá, el artículo aparece automáticamente en `/blog` y genera su
propia página en `/blog/[slug]`.
