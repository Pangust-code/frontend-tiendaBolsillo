import { Navigate, Route, Routes } from 'react-router-dom'
import {
  AccountManagementPage,
  AddressesPage,
  AppLayout,
  BanksPage,
  BusinessPage,
  Dashboard,
  EditProfilePage,
  EmptyModule,
  LoginPage,
  MetricsPage,
  ProfilePage,
  RegistrationBusinessPage,
  RegistrationConfirmationPage,
  RegistrationLocationPage,
  RegistrationStartPage,
  SimpleAdminPage,
  SubscriptionsPage,
  TypographyPage,
  VerificationPage,
} from './pages/Pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistrationStartPage />} />
      <Route path="/registro/negocio" element={<RegistrationBusinessPage />} />
      <Route path="/registro/ubicacion" element={<RegistrationLocationPage />} />
      <Route path="/registro/confirmacion" element={<RegistrationConfirmationPage />} />
      <Route element={<AppLayout />}>
        <Route path="/inicio" element={<Dashboard />} />
        <Route path="/inicio/metricas" element={<MetricsPage />} />
        <Route path="/ofertas" element={<EmptyModule view="ofertas" />} />
        <Route path="/cobros" element={<EmptyModule view="cobros" />} />
        <Route path="/entregas" element={<EmptyModule view="entregas" />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/perfil/editar" element={<EditProfilePage />} />
        <Route path="/perfil/tipografia" element={<TypographyPage />} />
        <Route path="/perfil/verificacion" element={<VerificationPage />} />
        <Route path="/perfil/direcciones" element={<AddressesPage />} />
        <Route path="/perfil/bancos" element={<BanksPage />} />
        <Route path="/perfil/suscripciones" element={<SubscriptionsPage />} />
        <Route path="/perfil/negocio" element={<BusinessPage />} />
        <Route path="/perfil/cuentas" element={<AccountManagementPage />} />
        <Route path="/mensajes" element={<SimpleAdminPage title="Mensajes" description="Tus conversaciones con clientes aparecerán aquí." icon="◌" />} />
        <Route path="/notificaciones" element={<SimpleAdminPage title="Notificaciones" description="Aquí aparecerán tus alertas y actualizaciones." icon="♧" />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
