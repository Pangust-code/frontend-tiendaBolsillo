# Tienda Bolsillo Web

Frontend inicial para migrar el panel de negocio de la aplicación móvil Tienda Bolsillo a una experiencia web responsive.

## Decisiones iniciales

- **React + TypeScript + Vite:** estructura rápida, tipada y sencilla de ampliar.
- **React Router:** cada módulo tiene una ruta independiente y enlaces navegables.
- **CSS propio:** permite reproducir el lenguaje visual de las capturas sin añadir una dependencia de estilos antes de validar el diseño.
- **Datos locales simulados:** el alcance actual es frontend; no hay autenticación, API ni persistencia real.
- **Diseño responsive:** sidebar para escritorio y menú lateral desplegable en pantallas pequeñas.

## Alcance de esta versión

- Dashboard del negocio con resumen, alerta de verificación, métricas, promoción y acciones rápidas.
- Navegación funcional entre Inicio, Ofertas, Cobros y Entregas.
- Estados vacíos para los módulos operativos.
- Menú de perfil simulado.
- Ruta pública de inicio de sesión en `/login`.
- Identidad visual basada en las capturas móviles y la documentación entregada.

## Ejecutar

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## Próximos pasos

1. Añadir validación y registro del negocio desde `/registro`.
2. Crear flujo de verificación KYC y carga de documentos.
3. Completar perfil, direcciones, bancos y notificaciones.
4. Sustituir los datos simulados por servicios reales cuando exista backend.
