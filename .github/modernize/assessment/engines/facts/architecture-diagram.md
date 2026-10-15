# Architecture Diagram

El frontend de Tienda Bolsillo es una SPA responsive para administrar un comercio local. En esta fase utiliza datos simulados y navegación local; el backend, autenticación real y persistencia quedan preparados como siguientes integraciones.

## Application Architecture

<!-- mermaid-checked: no \n, no em-dash/en-dash, no {} in labels, subgraphs are id["label"], arrows are -->|"label"|, all subgraphs closed by end, ids unique -->
~~~mermaid
flowchart TD
    subgraph Client["Client Layer"]
        Browser["Web Browser"]
    end
    subgraph App["Application Layer"]
        React["React UI"]
        Router["React Router"]
        State["Local UI State"]
    end
    subgraph Assets["Project Assets"]
        Styles["Responsive CSS"]
        Docs["Project Documentation"]
    end
    subgraph Future["Future Services"]
        API["Backend API"]
        Storage["File Storage"]
    end

    Browser -->|"loads SPA"| React
    React -->|"navigates routes"| Router
    React -->|"controls forms"| State
    React -->|"uses visual system"| Styles
    React -.->|"future integration"| API
    API -.->|"future uploads"| Storage
    Docs -.->|"guides implementation"| React
~~~

### Technology Stack Summary

| Layer | Technology | Version | Purpose |
|---|---|---:|---|
| UI | React | 19 | Component-based interface |
| Language | TypeScript | 5.9 | Type safety |
| Build | Vite | 7 | Development server and production build |
| Routing | React Router | 7 | Independent application routes |
| Styling | CSS | Native | Responsive visual system |
| Validation | HTML and React state | Current | Frontend-only form interaction |

### Data Storage & External Services

The current version does not connect to a database, API, authentication provider, map provider, or file storage service. Forms and uploaded file names are simulated in memory. A future backend should persist the merchant profile, KYC data, bank account metadata, document references, notifications, offers, payments, and deliveries.

### Key Architectural Decisions

- Routes are separated by business area instead of keeping all screens in one view.
- Reusable layout, form, modal, card, and empty-state patterns keep the UI consistent.
- The frontend is deliberately decoupled from backend assumptions so API integration can be added later.

## Component Relationships

<!-- mermaid-checked: no \n, no em-dash/en-dash, no {} in labels, subgraphs are id["label"], arrows are -->|"label"|, all subgraphs closed by end, ids unique -->
~~~mermaid
flowchart LR
    subgraph PresentationLayer["Presentation"]
        cApp["App Routes"]
        cLayout["App Layout"]
        cPages["Page Components"]
    end
    subgraph StateLayer["UI State"]
        cForms["Registration Forms"]
        cAdmin["Admin State"]
    end
    subgraph InfrastructureLayer["Infrastructure"]
        cRouter["Browser Router"]
        cCss["Responsive CSS"]
        cBuild["Vite Build"]
    end

    cApp -->|"declares"| cRouter
    cRouter -->|"renders"| cLayout
    cLayout -->|"hosts"| cPages
    cPages -->|"updates"| cForms
    cPages -->|"updates"| cAdmin
    cPages -->|"uses"| cCss
    cBuild -->|"bundles"| cApp
~~~

### Component Inventory

| Component | Layer | Type | Responsibility |
|---|---|---|---|
| App | Presentation | Route container | Maps URLs to screens |
| AppLayout | Presentation | Shared layout | Sidebar, topbar and page outlet |
| Dashboard | Presentation | Page | Business summary and quick actions |
| LoginPage | Presentation | Page | Simulated login flow |
| Registration pages | Presentation | Page flow | Business onboarding |
| Profile pages | Presentation | Admin pages | KYC, profile, addresses and banks |
| Modal | Presentation | Shared component | Local confirmation and data entry |
| React state | UI State | State management | Temporary form and modal data |
| Responsive CSS | Infrastructure | Stylesheet | Desktop and mobile adaptation |
