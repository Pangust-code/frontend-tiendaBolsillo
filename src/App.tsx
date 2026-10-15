import { useState } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

type View = 'inicio' | 'ofertas' | 'cobros' | 'entregas'

const navItems: { id: View; label: string; icon: string; path: string }[] = [
  { id: 'inicio', label: 'Inicio', icon: '⌂', path: '/inicio' },
  { id: 'ofertas', label: 'Ofertas', icon: '▤', path: '/ofertas' },
  { id: 'cobros', label: 'Cobros', icon: '▣', path: '/cobros' },
  { id: 'entregas', label: 'Entregas', icon: '▱', path: '/entregas' },
]

const metrics = [
  { label: 'Ofertas activas', value: '0', helper: 'Sin solicitudes nuevas', tone: 'red' },
  { label: 'Cobros pendientes', value: '$0,00', helper: 'No hay pagos por recibir', tone: 'purple' },
  { label: 'Entregas en curso', value: '0', helper: 'Todo está al día', tone: 'blue' },
]

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistrationStartPage />} />
      <Route path="/registro/negocio" element={<RegistrationBusinessPage />} />
      <Route path="/registro/ubicacion" element={<RegistrationLocationPage />} />
      <Route path="/registro/confirmacion" element={<RegistrationConfirmationPage />} />
      <Route element={<AppLayout />}>
        <Route path="/inicio" element={<Dashboard />} />
        <Route path="/ofertas" element={<EmptyModule view="ofertas" />} />
        <Route path="/cobros" element={<EmptyModule view="cobros" />} />
        <Route path="/entregas" element={<EmptyModule view="entregas" />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/perfil/editar" element={<EditProfilePage />} />
        <Route path="/perfil/verificacion" element={<VerificationPage />} />
        <Route path="/perfil/direcciones" element={<AddressesPage />} />
        <Route path="/perfil/bancos" element={<BanksPage />} />
        <Route path="/mensajes" element={<SimpleAdminPage title="Mensajes" description="Tus conversaciones con clientes aparecerán aquí." icon="◌" />} />
        <Route path="/notificaciones" element={<SimpleAdminPage title="Notificaciones" description="Aquí aparecerán tus alertas y actualizaciones." icon="♧" />} />
      </Route>
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Routes>
  )
}

function AppLayout() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const activeItem = navItems.find((item) => item.path === location.pathname) ?? navItems[0]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <Link className="brand" to="/inicio" onClick={() => setMenuOpen(false)}>
          <div className="brand-mark"><span>tb</span></div>
          <div><strong>tienda</strong><strong className="brand-red"> bolsillo</strong><small>Panel del negocio</small></div>
        </Link>
        <div className="workspace-label">MI NEGOCIO</div>
        <nav className="main-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link className={`nav-item ${activeItem.id === item.id ? 'active' : ''}`} key={item.id} to={item.path} onClick={() => setMenuOpen(false)}>
              <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setProfileOpen(true)}><span className="nav-icon">⚙</span><span>Configuración</span></button>
          <div className="help-card"><span>?</span><div><strong>¿Necesitas ayuda?</strong><small>Estamos para ayudarte</small></div></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className="breadcrumbs"><span>Mi negocio</span><b>/</b><strong>{activeItem.label}</strong></div>
          <div className="topbar-actions">
            <Link className="notification-button" aria-label="Notificaciones" to="/notificaciones">♧<i /></Link>
            <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)}>
              <span className="avatar">PS</span><span className="profile-name">Pangust Sustem</span><span className="chevron">⌄</span>
            </button>
            {profileOpen && <div className="profile-menu"><strong>Pangust Sustem</strong><span>Perfil incompleto</span><hr /><button>Mi perfil</button><button onClick={() => setProfileOpen(false)}>Cerrar menú</button></div>}
          </div>
        </header>
        <div className="page"><Outlet /></div>
      </main>
    </div>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim() && password.trim()) navigate('/inicio')
  }

  function RegistrationStart() {
    return (
      <main className="auth-page registration-start">
        <section className="auth-visual"><Link className="auth-brand" to="/login"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link><div className="auth-message"><span className="auth-kicker">CREA TU CUENTA</span><h1>Haz crecer<br /><em>tu negocio.</em></h1><p>Empieza a conectar con clientes cercanos y lleva tu negocio al siguiente nivel.</p></div></section>
        <section className="auth-form-wrap"><div className="choice-form"><div className="mobile-auth-brand"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></div><p className="eyebrow">PRIMER PASO</p><h1>¿Cómo quieres usar Tienda Bolsillo?</h1><p className="auth-intro">Elige el tipo de cuenta que mejor se adapta a ti.</p><Link className="role-card selected" to="/registro/negocio"><span className="role-icon">▦</span><span><strong>Mi negocio</strong><small>Ofrece tus productos o servicios a clientes cercanos.</small></span><b>→</b></Link><button className="role-card" type="button"><span className="role-icon">⌖</span><span><strong>Soy cliente</strong><small>Encuentra productos y servicios cerca de ti.</small></span><b>→</b></button><p className="register-prompt">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p></div></section>
      </main>
    )
  }

  function RegistrationBusiness() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '', confirm: '', name: '', phone: '' })
    const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: event.target.value })
    return <RegistrationLayout step={1} title="Datos de tu negocio" subtitle="Cuéntanos un poco sobre ti y tu negocio." onBack={() => navigate('/registro')}><div className="form-grid"><Field label="Correo electrónico" type="email" value={form.email} onChange={update('email')} placeholder="tu@correo.com" /><Field label="Teléfono de contacto" type="tel" value={form.phone} onChange={update('phone')} placeholder="099 999 9999" /><Field label="Contraseña" type="password" value={form.password} onChange={update('password')} placeholder="Mínimo 8 caracteres" /><Field label="Confirmar contraseña" type="password" value={form.confirm} onChange={update('confirm')} placeholder="Repite tu contraseña" /><Field className="full-field" label="Nombre comercial" value={form.name} onChange={update('name')} placeholder="Ej. Pangust Sustem" /></div><button className="primary-button wide-button" onClick={() => navigate('/registro/ubicacion')}>Continuar <span>→</span></button></RegistrationLayout>
  }

  function RegistrationLocation() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('')
    return <RegistrationLayout step={2} title="Ubica tu negocio" subtitle="Ayúdanos a mostrar tu negocio a los clientes más cercanos." onBack={() => navigate('/registro/negocio')}><div className="form-grid"><label>Actividad comercial<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Selecciona una categoría</option><option>Tienda de barrio</option><option>Construcción y Hogar</option><option>Salud y Nutrición</option><option>Tecnología y Electrónica</option><option>Vehículos y accesorios</option></select></label><label>Provincia<select defaultValue="Azuay"><option>Azuay</option><option>Guayas</option><option>Pichincha</option></select></label><label>Cantón<select defaultValue="Cuenca"><option>Cuenca</option><option>Quito</option><option>Guayaquil</option></select></label><label>Parroquia<select defaultValue="Ricaurte"><option>Ricaurte</option><option>El Vecino</option><option>Yanuncay</option></select></label></div><button className="map-picker" type="button"><span>⌖</span><div><strong>Marcar ubicación en el mapa</strong><small>Selecciona la ubicación exacta de tu negocio</small></div><b>→</b></button><label className="check-row"><input type="checkbox" /> Acepto los <u>Términos y condiciones</u> y la <u>Política de privacidad</u>.</label><button className="primary-button wide-button" onClick={() => navigate('/registro/confirmacion')}>Crear negocio <span>→</span></button></RegistrationLayout>
  }

  function RegistrationConfirmation() {
    return <main className="confirmation-page"><div className="confirmation-card"><div className="success-mark">✓</div><p className="eyebrow">REGISTRO COMPLETADO</p><h1>Tu negocio está en camino</h1><p>Hemos creado tu cuenta. Ahora puedes iniciar sesión y completar la verificación para comenzar a ofertar, cobrar y entregar.</p><Link className="primary-button wide-button" to="/login">Iniciar sesión <span>→</span></Link><Link className="back-link" to="/registro">Volver al inicio</Link></div></main>
  }

  function RegistrationLayout({ step, title, subtitle, onBack, children }: { step: number; title: string; subtitle: string; onBack: () => void; children: React.ReactNode }) {
    return <main className="registration-page"><div className="registration-top"><button onClick={onBack}>←</button><Link className="auth-brand" to="/registro"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link><span className="step-label">Paso {step} de 2</span></div><div className="registration-content"><div className="progress-bar"><span style={{ width: `${step * 50}%` }} /></div><p className="eyebrow">CREAR NEGOCIO</p><h1>{title}</h1><p className="auth-intro">{subtitle}</p>{children}</div></main>
  }

  function Field({ label, className = '', ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return <label className={className}>{label}<input {...props} required /></label>
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link className="auth-brand" to="/inicio"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link>
        <div className="auth-message"><span className="auth-kicker">PARA NEGOCIOS LOCALES</span><h1>Tu negocio,<br /><em>más cerca.</em></h1><p>Conecta con clientes de tu zona y haz crecer tu negocio con Tienda Bolsillo.</p><div className="auth-orbit"><span>✦</span><span>+</span><span>↗</span></div></div>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="mobile-auth-brand"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></div>
          <p className="eyebrow">BIENVENIDO DE NUEVO</p><h1>Inicia sesión</h1><p className="auth-intro">Accede al panel de administración de tu negocio.</p>
          <label htmlFor="email">Correo electrónico</label><input id="email" type="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <div className="label-row"><label htmlFor="password">Contraseña</label><button type="button" className="forgot-button">¿La olvidaste?</button></div>
          <div className="password-field"><input id="password" type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" aria-label="Mostrar contraseña" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '◉' : '◌'}</button></div>
          <button className="primary-button auth-submit" type="submit">Iniciar sesión <span>→</span></button>
          <div className="auth-divider"><span>o</span></div>
          <p className="register-prompt">¿Aún no tienes una cuenta?</p><Link className="secondary-auth-button" to="/registro">Crear cuenta de negocio</Link>
          <small className="auth-legal">Al continuar, aceptas nuestros <a href="#terminos">Términos y condiciones</a> y <a href="#privacidad">Política de privacidad</a>.</small>
        </form>
      </section>
    </main>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  return (
    <>
      <section className="welcome-row"><div><p className="eyebrow">MI NEGOCIO</p><h1>Hola, Pangust Sustem <span>👋</span></h1><p className="muted">Este es el resumen de la actividad de tu tienda.</p></div><button className="outline-button" onClick={() => navigate('/perfil')}>Ver mi perfil <span>→</span></button></section>
      <button className="verification-banner" onClick={() => navigate('/perfil/verificacion')}><span className="banner-icon">!</span><span><strong>Completa la verificación de tu negocio</strong><small>Aún no puedes ofertar, cobrar ni entregar.</small></span><b>→</b></button>
      <section className="metric-grid">{metrics.map((metric) => <article className="metric-card" key={metric.label}><div className={`metric-icon ${metric.tone}`}>{metric.tone === 'red' ? '↗' : metric.tone === 'purple' ? '$' : '⌁'}</div><div><p>{metric.label}</p><h2>{metric.value}</h2><small>{metric.helper}</small></div></article>)}</section>
      <section className="content-grid"><article className="panel promo-panel"><div className="panel-heading"><div><p className="eyebrow">PROMOCIONES</p><h2>Impulsa tu negocio</h2></div><button className="icon-button">⋮</button></div><div className="promo-art"><div><span>PUBLICA</span><strong>Tus mejores<br />ofertas aquí</strong><small>Llega a más clientes de tu zona.</small><button className="light-button">Conocer más <span>→</span></button></div><div className="promo-shape">%</div></div><div className="dots"><i className="selected" /><i /><i /></div></article><article className="panel metrics-panel"><div className="panel-heading"><div><p className="eyebrow">RESUMEN</p><h2>Mis métricas</h2></div><button className="period-button">30 días⌄</button></div><div className="empty-chart"><div className="chart-icon">▥</div><strong>Todavía no hay nada que medir</strong><p>Cuando respondas solicitudes, aquí verás cómo le va a tu negocio.</p><button className="text-button">Ver métricas detalladas →</button></div></article></section>
      <section className="quick-actions"><h2>Acciones rápidas</h2><div><button onClick={() => navigate('/perfil/verificacion')}><span>✦</span><strong>Completar perfil</strong><small>Habilita todas las funciones</small></button><button onClick={() => navigate('/perfil/direcciones')}><span>⌖</span><strong>Agregar dirección</strong><small>Registra un nuevo local</small></button><button onClick={() => navigate('/perfil')}><span>▤</span><strong>Ver configuración</strong><small>Administra tu negocio</small></button></div></section>
    </>
  )
}

function RegistrationStartPage() {
  return <main className="auth-page"><section className="auth-visual"><Link className="auth-brand" to="/login"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link><div className="auth-message"><span className="auth-kicker">CREA TU CUENTA</span><h1>Haz crecer<br /><em>tu negocio.</em></h1><p>Empieza a conectar con clientes cercanos.</p></div></section><section className="auth-form-wrap"><div className="choice-form"><p className="eyebrow">PRIMER PASO</p><h1>¿Cómo quieres usar Tienda Bolsillo?</h1><p className="auth-intro">Elige el tipo de cuenta que mejor se adapta a ti.</p><Link className="role-card selected" to="/registro/negocio"><span className="role-icon">▦</span><span><strong>Mi negocio</strong><small>Ofrece tus productos o servicios a clientes cercanos.</small></span><b>→</b></Link><button className="role-card" type="button"><span className="role-icon">⌖</span><span><strong>Soy cliente</strong><small>Encuentra productos y servicios cerca de ti.</small></span><b>→</b></button><p className="register-prompt">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p></div></section></main>
}

function RegistrationBusinessPage() {
  const navigate = useNavigate()
  return <RegistrationLayoutPage step={1} title="Datos de tu negocio" subtitle="Cuéntanos un poco sobre ti y tu negocio." onBack={() => navigate('/registro')}><div className="form-grid"><FieldPage label="Correo electrónico" type="email" placeholder="tu@correo.com" /><FieldPage label="Teléfono de contacto" type="tel" placeholder="099 999 9999" /><FieldPage label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" /><FieldPage label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña" /><FieldPage className="full-field" label="Nombre comercial" placeholder="Ej. Pangust Sustem" /></div><button className="primary-button wide-button" onClick={() => navigate('/registro/ubicacion')}>Continuar <span>→</span></button></RegistrationLayoutPage>
}

function RegistrationLocationPage() {
  const navigate = useNavigate()
  return <RegistrationLayoutPage step={2} title="Ubica tu negocio" subtitle="Ayúdanos a mostrar tu negocio a los clientes más cercanos." onBack={() => navigate('/registro/negocio')}><div className="form-grid"><label>Actividad comercial<select defaultValue=""><option value="">Selecciona una categoría</option><option>Tienda de barrio</option><option>Construcción y Hogar</option><option>Salud y Nutrición</option><option>Tecnología y Electrónica</option></select></label><label>Provincia<select defaultValue="Azuay"><option>Azuay</option><option>Guayas</option><option>Pichincha</option></select></label><label>Cantón<select defaultValue="Cuenca"><option>Cuenca</option><option>Quito</option><option>Guayaquil</option></select></label><label>Parroquia<select defaultValue="Ricaurte"><option>Ricaurte</option><option>El Vecino</option><option>Yanuncay</option></select></label></div><button className="map-picker" type="button"><span>⌖</span><div><strong>Marcar ubicación en el mapa</strong><small>Selecciona la ubicación exacta de tu negocio</small></div><b>→</b></button><label className="check-row"><input type="checkbox" /> Acepto los <u>Términos y condiciones</u> y la <u>Política de privacidad</u>.</label><button className="primary-button wide-button" onClick={() => navigate('/registro/confirmacion')}>Crear negocio <span>→</span></button></RegistrationLayoutPage>
}

function RegistrationConfirmationPage() {
  return <main className="confirmation-page"><div className="confirmation-card"><div className="success-mark">✓</div><p className="eyebrow">REGISTRO COMPLETADO</p><h1>Tu negocio está en camino</h1><p>Hemos creado tu cuenta. Ahora puedes iniciar sesión y completar la verificación.</p><Link className="primary-button wide-button" to="/login">Iniciar sesión <span>→</span></Link><Link className="back-link" to="/registro">Volver al inicio</Link></div></main>
}

function RegistrationLayoutPage({ step, title, subtitle, onBack, children }: { step: number; title: string; subtitle: string; onBack: () => void; children: React.ReactNode }) {
  return <main className="registration-page"><div className="registration-top"><button onClick={onBack}>←</button><Link className="auth-brand" to="/registro"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link><span className="step-label">Paso {step} de 2</span></div><div className="registration-content"><div className="progress-bar"><span style={{ width: `${step * 50}%` }} /></div><p className="eyebrow">CREAR NEGOCIO</p><h1>{title}</h1><p className="auth-intro">{subtitle}</p>{children}</div></main>
}

function FieldPage({ label, className = '', ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className={className}>{label}<input {...props} required /></label>
}

function EmptyModule({ view }: { view: View }) {
  const title = view === 'ofertas' ? 'Ofertas' : view === 'cobros' ? 'Cobros' : 'Entregas'
  const description = view === 'ofertas' ? 'Aquí aparecerán las solicitudes de clientes cercanos.' : view === 'cobros' ? 'Aquí verás el resumen de tus pagos recibidos.' : 'Aquí gestionarás los pedidos listos para entregar.'
  return <section className="module-page"><div className="module-heading"><div><p className="eyebrow">OPERACIÓN</p><h1>{title}</h1><p className="muted">{description}</p></div><button className="primary-button">+ Nueva acción</button></div><div className="tabs"><button className="tab active">Todos</button><button className="tab">Pendientes</button><button className="tab">Historial</button></div><div className="module-empty"><div className="large-empty-icon">✦</div><h2>No hay {title.toLowerCase()} todavía</h2><p>Cuando tengas actividad, la información aparecerá en este espacio.</p></div></section>
}

function AdminShell({ eyebrow = 'ADMINISTRACIÓN', title, description, children }: { eyebrow?: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="admin-page"><div className="admin-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div></div>{children}</section>
}

function ProfilePage() {
  const navigate = useNavigate()
  const options = [
    ['✎', 'Editar perfil', 'Actualiza la información de tu negocio', '/perfil/editar'],
    ['✓', 'Verificar identidad', 'Completa la verificación para operar', '/perfil/verificacion'],
    ['⌖', 'Mis direcciones', 'Administra tus locales registrados', '/perfil/direcciones'],
    ['▣', 'Cuentas bancarias', 'Configura dónde recibir tus pagos', '/perfil/bancos'],
    ['◌', 'Mensajes', 'Conversa con tus clientes', '/mensajes'],
  ]
  return <AdminShell eyebrow="CUENTA DEL NEGOCIO" title="Perfil del negocio" description="Administra la información y configuración de Pangust Sustem."><div className="profile-summary"><div className="profile-avatar-large">PS</div><div><h2>Pangust Sustem</h2><p>Perfil incompleto <span>•</span> Sin calificar</p></div><button className="outline-button" onClick={() => navigate('/perfil/verificacion')}>Completar perfil →</button></div><div className="admin-options">{options.map(([icon, label, text, path]) => <button key={label} onClick={() => navigate(path)}><span className="option-icon">{icon}</span><span><strong>{label}</strong><small>{text}</small></span><b>→</b></button>)}</div></AdminShell>
}

function VerificationPage() {
  const [files, setFiles] = useState<Record<string, string>>({})
  const updateFile = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setFiles({ ...files, [name]: file.name })
  }
  return <AdminShell eyebrow="PERFIL DEL NEGOCIO" title="Verificar identidad" description="Completa la información legal y documental de tu negocio."><div className="verification-card"><div className="verification-status"><span>!</span><div><strong>Los nuevos datos no se aplican de inmediato</strong><small>Un administrador revisará la solicitud y los documentos antes de aprobarla.</small></div></div><div className="verification-section"><p className="form-section-title">TIPO DE PERSONA</p><div className="form-grid"><label>Tipo de persona<select defaultValue=""><option value="">Selecciona una opción</option><option>Persona natural</option><option>Persona jurídica / sociedad</option></select></label></div><p className="form-section-title">DATOS DE IDENTIFICACIÓN</p><div className="form-grid"><FieldPage label="RUC" placeholder="Ej. 0102030405001" /><FieldPage label="Razón social" placeholder="Nombre legal registrado" /><FieldPage label="Fecha de inicio de actividad comercial" type="date" /><div className="document-row"><strong>RUC activo</strong><label className="document-button"><input type="file" accept=".pdf,image/*" onChange={(event) => updateFile('ruc', event)} />+ {files.ruc ?? 'Agregar documento'}</label></div></div></div><div className="verification-section"><p className="form-section-title">FOTOS DEL ESTABLECIMIENTO</p><p className="section-hint">JPG, PNG o WebP · Máximo 5 MB por archivo</p><div className="upload-grid">{['Fachada / entrada', 'Rótulo o letrero', 'Interior 1', 'Interior 2'].map((name) => <label className="upload-box" key={name}><input type="file" accept="image/*" onChange={(event) => updateFile(name, event)} /><span>{files[name] ? '✓' : '+'}</span><small>{files[name] ?? name}</small></label>)}</div></div><div className="verification-section"><p className="form-section-title">CUENTA BANCARIA DEL NEGOCIO</p><div className="form-grid"><label>Banco<select defaultValue=""><option value="">Selecciona un banco</option><option>Banco Pichincha</option><option>Banco Guayaquil</option><option>Produbanco</option></select></label><label>Tipo de cuenta<select defaultValue=""><option value="">Selecciona una opción</option><option>Ahorros</option><option>Corriente</option></select></label><FieldPage label="Número de cuenta" placeholder="Número de cuenta" /><FieldPage label="Nombre del titular" placeholder="Nombre completo" /><FieldPage label="Cédula del titular" placeholder="Número de cédula" /><FieldPage label="Email (opcional)" type="email" placeholder="correo@ejemplo.com" /></div></div><div className="verification-section"><p className="form-section-title">RESPALDO DOCUMENTAL</p><label className="selfie-upload"><input type="file" accept="image/*" onChange={(event) => updateFile('selfie', event)} /><strong>Selfie con tu documento de identificación *</strong><small>{files.selfie ?? 'Toca para agregar una imagen'}</small></label><label className="document-button"><input type="file" accept=".pdf,image/*" onChange={(event) => updateFile('certificate', event)} />+ {files.certificate ?? 'Agregar certificado bancario'}</label></div><button className="submit-green" disabled={Object.keys(files).length < 7}>✈ Enviar</button></div></AdminShell>
}

function AddressesPage() {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  return <AdminShell title="Mis direcciones" description="Gestiona los locales asociados a tu negocio."><div className="admin-toolbar"><span>{added ? '2 locales registrados' : '1 local registrado'}</span><button className="primary-button" onClick={() => setOpen(true)}>+ Agregar dirección</button></div><div className="address-card"><div className="option-icon">⌖</div><div><span className="address-label">LOCAL PRINCIPAL</span><h3>Ricaurte, Cuenca</h3><p>Coordenadas: -2.89600, -79.00520</p></div><span className="main-badge">PRINCIPAL</span><button className="more-button">⋮</button></div>{added && <div className="address-card extra-address"><div className="option-icon">⌖</div><div><span className="address-label">NUEVO LOCAL</span><h3>Centro, Cuenca</h3><p>Dirección agregada localmente</p></div></div>}{open && <Modal title="Agregar dirección" onClose={() => setOpen(false)}><FieldPage label="Nombre del local" placeholder="Ej. Sucursal Centro" /><FieldPage label="Dirección" placeholder="Calle principal y secundaria" /><button className="primary-button wide-button" onClick={() => { setAdded(true); setOpen(false) }}>Guardar dirección</button></Modal>}</AdminShell>
}

function BanksPage() {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  return <AdminShell title="Cuentas bancarias" description="Registra una cuenta para recibir los pagos de tus ventas."><div className="admin-toolbar"><span>{added ? '1 cuenta registrada' : 'No hay cuentas registradas'}</span><button className="primary-button" onClick={() => setOpen(true)}>+ Nueva cuenta</button></div>{added ? <div className="address-card"><div className="option-icon">▣</div><div><span className="address-label">CUENTA PRINCIPAL</span><h3>Banco Pichincha ·· 4589</h3><p>Cuenta de ahorros · Titular del negocio</p></div><span className="main-badge">ACTIVA</span></div> : <div className="module-empty compact-empty"><div className="large-empty-icon">▣</div><h2>Aún no tienes una cuenta bancaria</h2><p>Agrega una cuenta para poder recibir tus pagos.</p></div>}{open && <Modal title="Nueva cuenta bancaria" onClose={() => setOpen(false)}><label>Banco<select defaultValue=""><option value="">Selecciona un banco</option><option>Banco Pichincha</option><option>Banco Guayaquil</option><option>Produbanco</option></select></label><FieldPage label="Número de cuenta" placeholder="0000000000" /><FieldPage label="Nombre del titular" placeholder="Nombre completo" /><button className="primary-button wide-button" onClick={() => { setAdded(true); setOpen(false) }}>Guardar cuenta</button></Modal>}</AdminShell>
}

function EditProfilePage() {
  return <AdminShell title="Editar perfil" description="Actualiza la información visible de tu negocio."><div className="edit-card"><FieldPage label="Nombre comercial" defaultValue="Pangust Sustem" /><FieldPage label="Teléfono de contacto" defaultValue="0958867933" /><label>Descripción del negocio<textarea defaultValue="Productos y servicios para tu hogar." /></label><button className="primary-button wide-button">Guardar cambios</button></div></AdminShell>
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><h2>{title}</h2><button onClick={onClose}>×</button></div>{children}</div></div>
}

function SimpleAdminPage({ title, description, icon }: { title: string; description: string; icon: string }) {
  return <AdminShell title={title} description={description}><div className="module-empty admin-empty"><div className="large-empty-icon">{icon}</div><h2>{title === 'Mensajes' ? 'Sin conversaciones' : 'Sin notificaciones'}</h2><p>{description}</p></div></AdminShell>
}

export default App
