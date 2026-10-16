# Architecture Diagram

El frontend de Tienda Bolsillo es una SPA responsive para administrar un comercio local. En esta fase utiliza datos simulados y navegación local.

## Arquitectura de la aplicación

<!-- mermaid-checked: no \n, no em-dash/en-dash, no {} in labels, subgraphs are id["label"], arrows are -->|"label"|, all subgraphs closed by end, ids unique -->
~~~mermaid
flowchart TD
    subgraph Client["Capa del cliente"]
        Browser["Navegador web"]
    end
    subgraph App["Capa de aplicación"]
        React["Interfaz React"]
        Router["React Router"]
        State["Estado local de interfaz"]
    end
    subgraph Assets["Recursos del proyecto"]
        Styles["CSS adaptable"]
        Docs["Documentación del proyecto"]
    end
    subgraph Future["Servicios futuros"]
        API["API del backend"]
        Storage["Almacenamiento de archivos"]
    end

    Browser -->|"carga la SPA"| React
    React -->|"navega entre rutas"| Router
    React -->|"controla formularios"| State
    React -->|"usa el sistema visual"| Styles
    React -.->|"integración futura"| API
    API -.->|"cargas futuras"| Storage
    Docs -.->|"guía la implementación"| React
~~~

### Resumen de tecnologías

| Capa | Tecnología | Versión | Propósito |
|---|---|---:|---|
| Interfaz | React | 19 | Interfaz basada en componentes |
| Lenguaje | TypeScript | 5.9 | Seguridad de tipos |
| Construcción | Vite | 7 | Servidor de desarrollo y compilación |
| Enrutamiento | React Router | 7 | Rutas independientes de la aplicación |
| Estilos | CSS | Nativo | Sistema visual adaptable |
| Validación | HTML y estado de React | Actual | Interacción de formularios del frontend |

### Almacenamiento de datos y servicios externos

La versión actual no se conecta a una base de datos, API, proveedor de autenticación, proveedor de mapas ni servicio de almacenamiento de archivos. Los formularios y nombres de archivos cargados se simulan en memoria. Un backend futuro debería persistir el perfil del comercio, los datos de verificación, la información bancaria, las referencias documentales, las notificaciones, ofertas, cobros y entregas.

### Decisiones arquitectónicas principales

- Las rutas se separan por área del negocio en lugar de mantener todas las pantallas en una sola vista.
- Los patrones reutilizables de layout, formularios, modales, tarjetas y estados vacíos mantienen la interfaz consistente.
- El frontend está desacoplado de supuestos del backend para permitir integrar una API más adelante.

## Relaciones entre componentes

<!-- mermaid-checked: no \n, no em-dash/en-dash, no {} in labels, subgraphs are id["label"], arrows are -->|"label"|, all subgraphs closed by end, ids unique -->
~~~mermaid
flowchart LR
    subgraph PresentationLayer["Presentación"]
        cApp["Rutas de App"]
        cLayout["Layout de la aplicación"]
        cPages["Componentes de página"]
    end
    subgraph StateLayer["Estado de interfaz"]
        cForms["Formularios de registro"]
        cAdmin["Estado administrativo"]
    end
    subgraph InfrastructureLayer["Infraestructura"]
        cRouter["Enrutador del navegador"]
        cCss["CSS adaptable"]
        cBuild["Compilación de Vite"]
    end

    cApp -->|"declara"| cRouter
    cRouter -->|"renderiza"| cLayout
    cLayout -->|"aloja"| cPages
    cPages -->|"actualiza"| cForms
    cPages -->|"actualiza"| cAdmin
    cPages -->|"usa"| cCss
    cBuild -->|"empaqueta"| cApp
~~~

### Inventario de componentes

| Componente | Capa | Tipo | Responsabilidad |
|---|---|---|---|
| App | Presentación | Contenedor de rutas | Asocia URL con pantallas |
| AppLayout | Presentación | Layout compartido | Barra lateral, barra superior y contenido |
| Dashboard | Presentación | Página | Resumen del negocio y acciones rápidas |
| LoginPage | Presentación | Página | Flujo de inicio de sesión simulado |
| Páginas de registro | Presentación | Flujo de páginas | Incorporación del negocio |
| Páginas de perfil | Presentación | Páginas administrativas | Verificación, perfil, direcciones y bancos |
| Modal | Presentación | Componente compartido | Confirmaciones y captura de datos local |
| Estado de React | Estado de interfaz | Gestión de estado | Datos temporales de formularios y modales |
| CSS adaptable | Infraestructura | Hoja de estilos | Adaptación para escritorio y móvil |
