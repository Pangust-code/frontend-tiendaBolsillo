# Documentación del proyecto

## Índice

- [Progreso](./PROGRESO.md)
- [Arquitectura](../.github/modernize/assessment/engines/facts/architecture-diagram.md)
- [Flujos de negocio](../.github/modernize/assessment/engines/facts/business-workflows.md)

## Alcance actual

El proyecto es un prototipo frontend responsive para el perfil de negocio de Tienda Bolsillo. Las rutas, formularios, estados vacíos y cargas de archivos son simulados y no representan todavía una integración con servicios reales.

## Rutas principales

| Área | Rutas |
|---|---|
| Acceso | `/login`, `/registro` |
| Registro | `/registro/negocio`, `/registro/ubicacion`, `/registro/confirmacion` |
| Operación | `/inicio`, `/ofertas`, `/cobros`, `/entregas` |
| Administración | `/perfil`, `/perfil/editar`, `/perfil/verificacion` |
| Cuenta | `/perfil/direcciones`, `/perfil/bancos`, `/mensajes`, `/notificaciones` |

## Cómo ejecutar

```powershell
npm install
npm run dev
npm run build
```

## Próxima documentación recomendada

Cuando exista backend, agregar contratos de API, modelo de datos, reglas de autorización, estrategia de pruebas y guía de despliegue.
