# Flujos principales del negocio

Tienda Bolsillo ayuda a comercios locales a registrarse, validar su identidad y administrar ofertas, cobros, entregas y comunicación con clientes cercanos.

## Entidades de negocio

| Entidad | Servicio / Contexto delimitado | Descripción | Relaciones principales |
|---|---|---|---|
| Comercio | Gestión del comercio | Negocio que usa la plataforma | Contiene perfil, locales y documentos |
| Perfil del comercio | Identidad y verificación | Información legal y comercial | Pertenece al comercio |
| Ubicación | Gestión del comercio | Local geolocalizado | Pertenece al comercio |
| Verificación | Cumplimiento | Solicitud de revisión documental | Referencia al comercio y sus documentos |
| Cuenta bancaria | Cobros | Cuenta para recibir pagos | Pertenece al comercio |
| Oferta | Comercio | Propuesta enviada a un pedido | Conecta al comercio con la solicitud del cliente |
| Cobro | Cobros | Cobro asociado a una venta | Se relaciona con una oferta aceptada |
| Entrega | Logística | Entrega o retiro del pedido | Se relaciona con una oferta aceptada |
| Notificación | Comunicación | Alerta operacional | Pertenece al comercio |

## Relación entre servicios y dominios

| Servicio | Contexto de dominio | Entidades propias | Dependencias externas |
|---|---|---|---|
| Registro del comercio | Gestión del comercio | Comercio, perfil y ubicación | API y mapas futuros |
| Verificación | Cumplimiento | Verificación y documentos | Almacenamiento y revisión futuros |
| Ofertas | Comercio | Oferta | API futura de pedidos |
| Cobros | Cobros | Cobro y cuenta bancaria | Proveedor de pagos futuro |
| Entregas | Logística | Entrega | Servicio de entregas futuro |
| Comunicación | Comunicación | Notificación y mensajes | Proveedor de notificaciones futuro |

## Flujos principales

### Flujo 1: Registrar un negocio

1. La persona usuaria elige `Mi negocio`.
2. Ingresa los datos de la cuenta y del negocio.
3. Selecciona actividades comerciales y ubicación.
4. Acepta los términos y la política de privacidad.
5. La plataforma crea el perfil del comercio.
6. El comercio es redirigido al inicio de sesión y luego a la verificación.

### Flujo 2: Enviar la verificación de identidad

1. El comercio selecciona el tipo de persona: natural o jurídica.
2. Ingresa el RUC, la razón social y la fecha de inicio de actividad.
3. Carga el respaldo del RUC activo.
4. Carga cuatro fotografías del establecimiento.
5. Ingresa la información de la cuenta bancaria.
6. Carga una selfie con identificación y el certificado bancario.
7. Una persona administradora revisa la solicitud antes de habilitar ofertas, cobros y entregas.

### Flujo 3: Operar el negocio

1. El comercio consulta las solicitudes disponibles.
2. Envía o acepta una oferta.
3. El cliente acepta la oferta y el cobro queda pendiente.
4. El comercio prepara el pedido.
5. La entrega se completa o queda disponible para retiro local.
6. Se registra el cobro y se actualizan las métricas.

## Flujos de datos entre servicios

La API futura compondrá el perfil del comercio, el estado de verificación, las ubicaciones y el estado de la cuenta bancaria para el área de perfil. Las ofertas referenciarán al comercio y a una solicitud de pedido; las ofertas aceptadas producirán registros de cobro y entrega. Las notificaciones se generarán a partir de cambios en verificaciones, ofertas, cobros y entregas. Si un servicio dependiente no está disponible, el frontend debe mostrar el último estado conocido y una opción explícita para reintentar, en lugar de informar éxito silenciosamente.

## Secuencia del flujo de negocio

<!-- mermaid-checked: every participant uses `participant Id as "Label"`, no \n in aliases/messages/notes, every alt/opt/loop closed by end, no `:` inside any alias -->
~~~mermaid
sequenceDiagram
    participant Owner as "Comercio"
    participant Web as "Frontend web"
    participant Api as "API del backend"
    participant Review as "Persona administradora"
    participant Files as "Almacenamiento de archivos"

    Owner->>Web: Abrir formulario de verificación
    Web->>Owner: Mostrar campos legales y documentos
    Owner->>Web: Ingresar datos del comercio
    Owner->>Web: Seleccionar tipo de persona y cargar archivos
    Web->>Api: Enviar solicitud de verificación
    Api->>Files: Guardar referencias documentales
    Files-->>Api: Confirmar archivos guardados
    Api->>Review: Crear solicitud de revisión
    alt Documentos completos
        Review->>Api: Aprobar verificación del comercio
        Api-->>Web: Habilitar operaciones del negocio
        Web-->>Owner: Mostrar estado aprobado
    else Documentos incompletos
        Review->>Api: Solicitar correcciones
        Api-->>Web: Devolver requisitos faltantes
        Web-->>Owner: Mostrar mensaje de corrección
    end
~~~

## Reglas de negocio y lógica de decisión

- Los campos de identidad requeridos incluyen tipo de persona, RUC, razón social y fecha de inicio de actividad.
- Las evidencias requeridas del establecimiento incluyen fachada, rótulo y dos fotografías interiores.
- Los datos bancarios requeridos incluyen banco, tipo y número de cuenta, titular e identificación del titular.
- La selfie con identificación y el certificado bancario son obligatorios antes del envío.
- La verificación permanece pendiente hasta que una persona administradora revise la solicitud.
- Un comercio no puede ofertar, cobrar ni entregar mientras la verificación esté incompleta.
- La suspensión o eliminación de la cuenta debe bloquearse cuando existan cobros pendientes, entregas activas u ofertas aceptadas en proceso de cobro.
- La validación del frontend debe mostrar los errores explícitamente y no presentar un envío simulado como aprobación real del backend.
