# Core Business Workflows

Tienda Bolsillo ayuda a comercios locales a registrarse, validar su identidad y administrar ofertas, cobros, entregas y comunicación con clientes cercanos.

## Domain Entities

| Entity | Service / Bounded Context | Description | Key Relationships |
|---|---|---|---|
| Merchant | Merchant Management | Negocio que usa la plataforma | Owns profile, locations and documents |
| Merchant Profile | Identity and KYC | Información legal y comercial | Belongs to Merchant |
| Location | Merchant Management | Local geolocalizado | Belongs to Merchant |
| Verification | Compliance | Solicitud de revisión documental | References Merchant and documents |
| Bank Account | Payments | Cuenta para recibir pagos | Belongs to Merchant |
| Offer | Commerce | Propuesta enviada a un pedido | Connects Merchant and customer request |
| Payment | Payments | Cobro asociado a una venta | Relates to accepted Offer |
| Delivery | Logistics | Entrega o retiro del pedido | Relates to accepted Offer |
| Notification | Communication | Alerta operacional | Belongs to Merchant |

## Service-to-Domain Mapping

| Service | Domain Context | Owned Entities | External Dependencies |
|---|---|---|---|
| Merchant onboarding | Merchant Management | Merchant, Merchant Profile, Location | Future API and maps |
| Verification | Compliance | Verification and documents | Future file storage and review service |
| Offers | Commerce | Offer | Future orders API |
| Payments | Payments | Payment, Bank Account | Future payment provider |
| Deliveries | Logistics | Delivery | Future delivery service |
| Communication | Communication | Notification and messages | Future notification provider |

## Primary Workflows

### Workflow 1: Register a business

1. The user chooses `Mi negocio`.
2. The user enters account and commercial data.
3. The user selects category and location.
4. The user accepts terms and privacy policy.
5. The platform creates the merchant profile.
6. The merchant is redirected to login and later verification.

### Workflow 2: Submit identity verification

1. The merchant selects person type: natural or legal entity.
2. The merchant enters RUC, legal name and commercial start date.
3. The merchant uploads active RUC evidence.
4. The merchant uploads four establishment photos.
5. The merchant enters bank account information.
6. The merchant uploads an identity selfie and bank certificate.
7. An administrator reviews the request before enabling offers, payments and deliveries.

### Workflow 3: Operate the business

1. The merchant views available requests.
2. The merchant sends or accepts an offer.
3. The customer accepts the offer and payment becomes pending.
4. The merchant prepares the order.
5. The delivery is completed or made available for local pickup.
6. The payment is recorded and metrics are updated.

## Cross-Service Data Flows

The future API will compose merchant profile, verification status, locations and bank account status for the profile area. Offers will reference the merchant and an order request; accepted offers will produce payment and delivery records. Notifications will be generated from changes in verification, offers, payments and deliveries. If a dependent service is unavailable, the frontend should show the last known status and an explicit retry state rather than silently reporting success.

## Business Workflow Sequence

<!-- mermaid-checked: every participant uses `participant Id as "Label"`, no \n in aliases/messages/notes, every alt/opt/loop closed by end, no `:` inside any alias -->
~~~mermaid
sequenceDiagram
    participant Owner as "Merchant"
    participant Web as "Web Frontend"
    participant Api as "Backend API"
    participant Review as "Administrator"
    participant Files as "File Storage"

    Owner->>Web: Open verification form
    Web->>Owner: Show legal and document fields
    Owner->>Web: Enter merchant data
    Owner->>Web: Select person type and upload files
    Web->>Api: Submit verification request
    Api->>Files: Store document references
    Files-->>Api: Confirm stored files
    Api->>Review: Create review request
    alt Documents complete
        Review->>Api: Approve merchant verification
        Api-->>Web: Enable business operations
        Web-->>Owner: Show approved status
    else Documents incomplete
        Review->>Api: Request corrections
        Api-->>Web: Return missing requirements
        Web-->>Owner: Show correction message
    end
~~~

## Business Rules & Decision Logic

- Required identity fields include person type, RUC, legal name and commercial start date.
- Required establishment evidence includes facade, sign and two interior photos.
- Required banking data includes bank, account type, account number, account holder and holder identification.
- Selfie with identification and bank certificate are required before submission.
- Verification is pending until an administrator reviews the request.
- A merchant cannot offer, collect payments or deliver while verification is incomplete.
- Account suspension or deletion must be blocked when there are pending payments, active deliveries or accepted offers in payment processing.
- Frontend validation must show errors explicitly and must not present a simulated submission as a completed backend approval.
