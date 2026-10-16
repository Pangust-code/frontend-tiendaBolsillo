# Bitácora de desarrollo

## Etapa 1 — Base visual

- Se creó el proyecto con React, TypeScript y Vite.
- Se definió un diseño responsive inspirado en las capturas de la app móvil.
- Se creó el dashboard inicial del comercio.
- Se añadieron estados vacíos para Ofertas, Cobros y Entregas.

## Etapa 2 — Organización por rutas

- Se incorporó `react-router-dom`.
- La navegación dejó de depender de un estado interno único.
- Rutas actuales:

| Ruta | Estado | Propósito |
|---|---|---|
| `/login` | Implementada | Inicio de sesión simulado |
| `/inicio` | Implementada | Dashboard del negocio |
| `/ofertas` | Implementada | Estado inicial de ofertas |
| `/cobros` | Implementada | Estado inicial de cobros |
| `/entregas` | Implementada | Estado inicial de entregas |

### Inicio de sesión

La ruta `/login` incluye:

- Campo de correo.
- Campo de contraseña.
- Mostrar u ocultar contraseña.
- Validación HTML básica.
- Redirección simulada hacia `/inicio`.
- Enlace preparado hacia `/registro`.

Todavía no existe autenticación real. La redirección únicamente simula el flujo mientras no exista un backend.

## Comandos del proyecto

Los comandos se ejecutan desde:

```text
C:\Users\User\Documents\frontend-tiendaBolsillo\frontend
```

```powershell
npm install
npm run dev
npm run build
```

## Siguiente etapa

Crear el flujo de registro del negocio en rutas separadas:

1. `/registro`
2. `/registro/negocio`
3. `/registro/ubicacion`
4. `/registro/confirmacion`

Estas cuatro rutas ya están creadas con navegación visual y datos simulados. La validación avanzada, el mapa real y el envío al backend quedan para una etapa posterior.

## Etapa 3 — Administración del negocio

Se agregaron las rutas `/perfil`, `/perfil/verificacion`, `/perfil/direcciones`, `/perfil/bancos`, `/mensajes` y `/notificaciones`.

Incluyen el resumen del perfil, estado de verificación, dirección principal, estado de cuentas bancarias y estados vacíos de mensajes/notificaciones.

## Etapa 4 — Interacciones administrativas

- Carga local de cuatro imágenes para documentos del negocio.
- Formularios modales para agregar dirección y cuenta bancaria.
- Edición básica del perfil.
- Los cambios se mantienen en memoria mientras la página está abierta; todavía no se envían a un backend.

## Etapa 5 — Verificación completa

La pantalla `/perfil/verificacion` ahora contempla los bloques observados en las capturas:

- Tipo de persona: natural o jurídica/sociedad.
- RUC, razón social y fecha de inicio de actividad.
- Documento de RUC activo.
- Fachada, rótulo e interiores del establecimiento.
- Banco, tipo de cuenta, número, titular, cédula y email opcional.
- Selfie con documento de identificación.
- Certificado bancario.

El botón de envío permanece deshabilitado hasta seleccionar los archivos requeridos. La validación de formato, tamaño, datos fiscales y envío al administrador quedan pendientes de backend.

## Etapa 6 — Documentación técnica

Se creó documentación completa inicial con:

- Arquitectura de la aplicación y relaciones entre componentes.
- Diagramas Mermaid de arquitectura y flujo de verificación.
- Inventario tecnológico y de componentes.
- Entidades de negocio y reglas principales.
- Flujos de registro, verificación y operación del comercio.
- Índice general de documentación.

Archivos:

- `docs/README.md`
- `.github/modernize/assessment/engines/facts/architecture-diagram.md`
- `.github/modernize/assessment/engines/facts/business-workflows.md`

## Etapa 7 — Ajustes de navegación y operación

- Se añadió la ruta `/inicio/metricas` con periodos de 7, 30 y 90 días y rango personalizado.
- El rango personalizado permite escoger fecha inicial y final.
- El acceso a perfil ahora funciona desde el avatar superior; se eliminó el botón redundante del inicio.
- El perfil incluye disponibilidad, tipo de letra, notificaciones confiables, suscripciones, Mi negocio, gestión de cuentas y cerrar sesión.
- La campana enlaza a notificaciones y se muestra oscura dentro de esa ruta.
- Ofertas, cobros y entregas ahora muestran ejemplos y estados explícitos:
  `Disponibles`, `Aceptadas`, `Esperando cliente`, `Pendientes`, `Recibidos`, `Anulados`, `Completadas` y `Canceladas`.
- Se redujo el uso de bordes redondeados para una interfaz más sobria.

## Etapa 8 — Negocio, suscripción y gestión de cuenta

- `Mi negocio` muestra miembro desde, actividades comerciales y ubicación.
- El registro permite seleccionar múltiples actividades comerciales.
- `Suscripciones` muestra Plan Freemium activo, vencimiento, tiempo restante y enlace a `tiendabolsillo.com`.
- `Gestión de cuentas` incluye suspensión y eliminación con advertencias y confirmación.
- Los ejemplos de ofertas, cobros y entregas cambian según cada pestaña.
- El panel promocional incluye más de un anuncio y el enlace externo funciona.

## Etapa 9 — Personalización y controles interactivos

- La campana usa un ícono integrado al estilo de la interfaz.
- `Tipo de letra` permite escoger entre Nunito Sans, Montserrat y Arial.
- `Elegir fechas` abre un panel con fecha inicial y final, validando el rango.
- Las promociones tienen contador, navegación anterior/siguiente y acciones funcionales; los indicadores ahora representan anuncios reales.
- Las promociones rotan automáticamente cada 5 segundos y se pausan mientras el usuario pasa el cursor sobre el panel.

## Etapa 10 — Organización del código

Se separó el punto de entrada de las pantallas:

```text
src/
├── App.tsx              # Definición central de rutas
├── main.tsx             # Arranque de React
├── pages/
│   └── Pages.tsx        # Pantallas y layout de la aplicación
└── styles.css           # Sistema visual global
```

`App.tsx` ahora solo registra rutas y redirecciones. Esta separación permite extraer después cada grupo de pantallas a archivos independientes sin modificar la navegación.

El flujo tomará como referencia las capturas de creación de negocio, selección de categorías, ubicación en mapa y confirmación exitosa.
