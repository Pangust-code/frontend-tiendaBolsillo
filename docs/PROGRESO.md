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

## Etapa 11 — Interacción visual y tipografía persistente

- Se retiraron las flechas laterales de la publicidad; la rotación automática y los indicadores se mantienen.
- Se añadieron estados `hover` y `focus-visible` a botones, navegación, tarjetas de acciones y controles principales para mejorar la respuesta visual.
- La tipografía seleccionada ahora se guarda en `localStorage` y se aplica al panel al volver a entrar o recargar la página.

## Etapa 12 — Menú de cuenta y temas visuales

- El indicador del menú de `Pangust System` cambia entre `⌄` cuando está cerrado y `-` cuando está abierto.
- El botón de cuenta ahora tiene realce visible al pasar el mouse y mientras el menú permanece abierto.
- Se añadió el control de fondo claro/oscuro con icono de sol en la barra superior.
- La preferencia de tema se guarda en `localStorage` y se conserva al recargar.

## Etapa 13 — Contraste del modo oscuro

- Se corrigieron los colores de títulos, descripciones y opciones de configuración para mantener una lectura clara en fondo oscuro.
- Se mejoró el estado visual de las tarjetas de configuración cuando se pasa el mouse.
- El indicador de la cuenta ahora muestra `-` con el menú cerrado y `⌄` con el menú abierto, según el comportamiento solicitado.

## Etapa 14 — Menú de cuenta refinado

- Se eliminó el círculo rojo que rodeaba el indicador `⌄`.
- El menú de cuenta ahora tiene una cabecera con avatar, estado del perfil y acciones claramente separadas.
- `Mi perfil` y `Salir` tienen iconos, flechas de apoyo y realce al pasar el mouse.
- Se añadió una entrada suave del menú sin abusar de sombras, colores o bordes redondeados.
- La revisión visual mantiene una interfaz minimalista, pero con suficiente contraste, jerarquía y respuesta al usuario.

## Etapa 15 — Ajuste de acciones del menú

- Se retiraron las flechas de las acciones `Mi perfil` y `Salir`.
- Los iconos de ambas acciones se fijaron en una fila horizontal, a la izquierda de sus textos.

## Etapa 16 — Contraste de promociones en modo oscuro

- Se ajustaron los fondos de ambos anuncios para el tema oscuro.
- Se aumentó el contraste de etiquetas, títulos y descripciones.
- El botón de cada publicidad conserva una superficie clara y un estado hover visible.
- Las formas decorativas también se adaptan al fondo para no competir con el contenido.

## Etapa 17 — Contraste de acciones rápidas

- Las tarjetas de acciones rápidas ahora tienen fondo y borde adecuados para el modo oscuro.
- Los títulos y descripciones mantienen contraste alto.
- Los iconos usan un fondo de acento separado para conservar jerarquía visual.
- El hover tiene realce propio sin aumentar excesivamente la saturación.

## Etapa 20 — Transición suave de promociones

- El cambio automático entre publicidades ahora utiliza un desvanecido breve con un desplazamiento vertical mínimo.
- La tarjeta conserva su espacio para evitar saltos en el panel.
- La pausa al pasar el mouse y los indicadores de posición se mantienen sin cambios.

## Etapa 21 — Inicio y acceso de demostración

- La ruta raíz y las rutas desconocidas ahora redirigen a `/login`.
- El formulario ya no acepta cualquier texto: valida el usuario demo `pangustsystem@gmail.com` o `Pangust System`.
- Se configuró la contraseña demo fija `Pangust2026!` y un botón para completar los datos automáticamente.
- Los errores de acceso se muestran explícitamente en el formulario.

## Etapa 22 — Filtrado de estados operativos

- Las pestañas de Ofertas, Cobros y Entregas ahora filtran sus propios ejemplos.
- Cada estado muestra registros diferentes y coherentes con su categoría.
- Se evitaron listados repetidos al cambiar entre pestañas.

## Etapa 23 — Verificación para persona jurídica

- Al seleccionar `Persona jurídica / sociedad`, el documento cambia de `RUC activo` a `RUC`.
- Se añadió el bloque de datos del representante legal: nombres, apellidos, fecha de nacimiento, género y cédula.
- Se añadió el respaldo obligatorio de la cédula del representante legal.
- Se añadió el nombramiento del representante legal como documento opcional.
- El segundo nombre, apellido materno, email y nombramiento permanecen opcionales y no bloquean el envío.
- Para persona natural se conserva el flujo y los requisitos documentales anteriores.

## Etapa 24 — Respaldo de identidad según tipo de persona

- Para persona jurídica se retiró la selfie con documento, porque la cédula del representante legal es el respaldo de identidad solicitado.
- La selfie continúa disponible únicamente para persona natural.
- El requisito documental obligatorio de persona jurídica queda compuesto por RUC, fotografías, cédula del representante legal y certificado bancario.

## Etapa 25 — Espaciado y color documental

- Se igualó el espacio entre cédula, nombramiento y certificado bancario del representante legal.
- La cédula del representante legal y el certificado bancario ahora usan el mismo color neutro del nombramiento opcional.

## Etapa 18 — Hover de filtros de métricas

- Se reemplazó el hover rojo sólido de los periodos de métricas por un fondo neutro de alto contraste.
- La opción seleccionada conserva su identidad, pero al pasar el mouse usa un estado más ligero con borde sutil.
- El mismo ajuste se aplicó al contenedor y a los filtros en modo oscuro.

## Etapa 19 — Navegación de regreso

- Se añadieron flechas simples de regreso en las pantallas internas de administración y operación.
- Los botones utilizan el historial del navegador y mantienen un estilo discreto.
- El hover solo desplaza ligeramente la flecha y cambia el color para confirmar la interacción.
