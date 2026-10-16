import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

type View = 'inicio' | 'ofertas' | 'cobros' | 'entregas'
const FONT_STORAGE_KEY = 'tienda-bolsillo-font'
const THEME_STORAGE_KEY = 'tienda-bolsillo-theme'
const DEMO_EMAIL = 'pangustsystem@gmail.com'
const DEMO_PASSWORD = 'Pangust2026!'

function applyStoredFont(font: string) {
  document.documentElement.style.setProperty('--app-font', `"${font}"`)
}

function applyTheme(theme: 'light' | 'dark') {
  document.body.classList.toggle('dark-mode', theme === 'dark')
}

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

export function AppLayout() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light')
  const location = useLocation()
  const navigate = useNavigate()
  const activeItem = navItems.find((item) => item.path === location.pathname) ?? navItems[0]

  useEffect(() => {
    const storedFont = window.localStorage.getItem(FONT_STORAGE_KEY) ?? 'Nunito Sans'
    applyStoredFont(storedFont)
    applyTheme(theme)
  }, [theme])

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }

  return (
    <div className={`app-shell ${theme === 'dark' ? 'dark-theme' : ''}`}>
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
          <button className="nav-item" onClick={() => navigate('/perfil')}><span className="nav-icon">⚙</span><span>Configuración</span></button>
          <div className="help-card"><span>?</span><div><strong>¿Necesitas ayuda?</strong><small>Estamos para ayudarte</small></div></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className="breadcrumbs"><span>Mi negocio</span><b>/</b><strong>{activeItem.label}</strong></div>
          <div className="topbar-actions">
            <Link className={`notification-button ${location.pathname === '/notificaciones' ? 'active' : ''}`} aria-label="Notificaciones" to="/notificaciones"><span className="bell-icon" /><i /></Link>
            <button className="theme-button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Activar fondo oscuro' : 'Activar fondo claro'} title={theme === 'light' ? 'Fondo oscuro' : 'Fondo claro'}>
              <span>☼</span><small>{theme === 'light' ? 'Claro' : 'Oscuro'}</small>
            </button>
            <button className={`profile-button ${profileOpen ? 'profile-open' : ''}`} onClick={() => setProfileOpen(!profileOpen)}>
              <span className="avatar">PS</span><span className="profile-name">Pangust System</span><span className="chevron">{profileOpen ? '⌄' : '-'}</span>
            </button>
            {profileOpen && <div className="profile-menu"><div className="profile-menu-heading"><span className="menu-avatar">PS</span><div><strong>Pangust System</strong><span>Perfil incompleto</span></div></div><hr /><button className="profile-menu-item" onClick={() => { setProfileOpen(false); navigate('/perfil') }}><span>◉</span><strong>Mi perfil</strong></button><button className="profile-menu-item profile-menu-exit" onClick={() => { setProfileOpen(false); navigate('/login') }}><span>↪</span><strong>Salir</strong></button></div>}
          </div>
        </header>
        <div className="page"><Outlet /></div>
      </main>
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const identifier = email.trim().toLowerCase()
    const validIdentifier = identifier === DEMO_EMAIL || identifier === 'pangust system'
    if (validIdentifier && password === DEMO_PASSWORD) {
      setLoginError('')
      navigate('/inicio')
      return
    }
    setLoginError('Revisa el usuario y la contraseña de demostración.')
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
    return <RegistrationLayout step={1} title="Datos de tu negocio" subtitle="Cuéntanos un poco sobre ti y tu negocio." onBack={() => navigate('/registro')}><div className="form-grid"><Field label="Correo electrónico" type="email" value={form.email} onChange={update('email')} placeholder="tu@correo.com" /><Field label="Teléfono de contacto" type="tel" value={form.phone} onChange={update('phone')} placeholder="099 999 9999" /><Field label="Contraseña" type="password" value={form.password} onChange={update('password')} placeholder="Mínimo 8 caracteres" /><Field label="Confirmar contraseña" type="password" value={form.confirm} onChange={update('confirm')} placeholder="Repite tu contraseña" /><Field className="full-field" label="Nombre comercial" value={form.name} onChange={update('name')} placeholder="Ej. Pangust System
    " /></div><button className="primary-button wide-button" onClick={() => navigate('/registro/ubicacion')}>Continuar <span>→</span></button></RegistrationLayout>
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
        <Link className="auth-brand" to="/login"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link>
        <div className="auth-message"><span className="auth-kicker">PARA NEGOCIOS LOCALES</span><h1>Tu negocio,<br /><em>más cerca.</em></h1><p>Conecta con clientes de tu zona y haz crecer tu negocio con Tienda Bolsillo.</p><div className="auth-orbit"><span>✦</span><span>+</span><span>↗</span></div></div>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="mobile-auth-brand"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></div>
          <p className="eyebrow">BIENVENIDO DE NUEVO</p><h1>Inicia sesión</h1><p className="auth-intro">Accede al panel de administración de tu negocio.</p>
          <label htmlFor="email">Correo electrónico</label><input id="email" type="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <div className="label-row"><label htmlFor="password">Contraseña</label><button type="button" className="forgot-button">¿La olvidaste?</button></div>
          <div className="password-field"><input id="password" type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" aria-label="Mostrar contraseña" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '◉' : '◌'}</button></div>
          {loginError && <p className="login-error" role="alert">{loginError}</p>}
          <button className="primary-button auth-submit" type="submit">Iniciar sesión <span>→</span></button>
          <div className="demo-credentials"><strong>Acceso de demostración</strong><small>Usuario: pangustsystem@gmail.com</small><small>Contraseña: Pangust2026!</small><button type="button" onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setLoginError('') }}>Usar estos datos</button></div>
          <div className="auth-divider"><span>o</span></div>
          <p className="register-prompt">¿Aún no tienes una cuenta?</p><Link className="secondary-auth-button" to="/registro">Crear cuenta de negocio</Link>
          <small className="auth-legal">Al continuar, aceptas nuestros <a href="#terminos">Términos y condiciones</a> y <a href="#privacidad">Política de privacidad</a>.</small>
        </form>
      </section>
    </main>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const [promoIndex, setPromoIndex] = useState(0)
  const [promoPaused, setPromoPaused] = useState(false)

  useEffect(() => {
    if (promoPaused) return
    const timer = window.setInterval(() => {
      setPromoIndex((current) => (current === 0 ? 1 : 0))
    }, 5000)
    return () => window.clearInterval(timer)
  }, [promoPaused])
  return (
    <>
      <section className="welcome-row"><div><p className="eyebrow">MI NEGOCIO</p><h1>Hola, Pangust System <span>👋</span></h1><p className="muted">Este es el resumen de la actividad de tu tienda.</p></div></section>
      <button className="verification-banner" onClick={() => navigate('/perfil/verificacion')}><span className="banner-icon">!</span><span><strong>Completa la verificación de tu negocio</strong><small>Aún no puedes ofertar, cobrar ni entregar.</small></span><b>→</b></button>
      <section className="metric-grid">{metrics.map((metric) => <article className="metric-card" key={metric.label}><div className={`metric-icon ${metric.tone}`}>{metric.tone === 'red' ? '↗' : metric.tone === 'purple' ? '$' : '⌁'}</div><div><p>{metric.label}</p><h2>{metric.value}</h2><small>{metric.helper}</small></div></article>)}</section>
      <section className="content-grid"><article className="panel promo-panel" onMouseEnter={() => setPromoPaused(true)} onMouseLeave={() => setPromoPaused(false)}><div className="panel-heading"><div><p className="eyebrow">PROMOCIONES</p><h2>Impulsa tu negocio</h2></div><span className="promo-counter">{promoIndex + 1} / 2</span></div><div className="promo-list"><div key={promoIndex} className={`promo-art promo-swap ${promoIndex === 1 ? 'promo-second' : ''}`}><div>{promoIndex === 0 ? <><span>PUBLICA</span><strong>Tus mejores<br />ofertas aquí</strong><small>Llega a más clientes de tu zona.</small><a className="light-button" href="https://tiendabolsillo.com" target="_blank" rel="noreferrer">Conocer más <span>→</span></a></> : <><span>CRECE</span><strong>Conecta con<br />más clientes</strong><small>Haz visible tu negocio local.</small><button className="light-button" onClick={() => navigate('/perfil/suscripciones')}>Ver opciones <span>→</span></button></>}</div><div className="promo-shape">{promoIndex === 0 ? '%' : '↗'}</div></div></div><div className="dots"><i className={promoIndex === 0 ? 'selected' : ''} /><i className={promoIndex === 1 ? 'selected' : ''} /></div></article><article className="panel metrics-panel"><div className="panel-heading"><div><p className="eyebrow">RESUMEN</p><h2>Mis métricas</h2></div><button className="period-button" onClick={() => navigate('/inicio/metricas')}>Ver detalle →</button></div><div className="empty-chart"><div className="chart-icon">▥</div><strong>Todavía no hay nada que medir</strong><p>Cuando respondas solicitudes, aquí verás cómo le va a tu negocio.</p><button className="text-button" onClick={() => navigate('/inicio/metricas')}>Ver métricas detalladas →</button></div></article></section>
      <section className="quick-actions"><h2>Acciones rápidas</h2><div><button onClick={() => navigate('/perfil/verificacion')}><span>✦</span><strong>Completar perfil</strong><small>Habilita todas las funciones</small></button><button onClick={() => navigate('/perfil/direcciones')}><span>⌖</span><strong>Agregar dirección</strong><small>Registra un nuevo local</small></button><button onClick={() => navigate('/perfil')}><span>▤</span><strong>Ver configuración</strong><small>Administra tu negocio</small></button></div></section>
    </>
  )
}

export function MetricsPage() {
  const [period, setPeriod] = useState('30 días')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [calendarOpen, setCalendarOpen] = useState(false)
  return <AdminShell eyebrow="INICIO" title="Mis métricas" description="Consulta el rendimiento de tu negocio por periodo."><div className="metrics-filters"><button className={period === '7 días' ? 'selected' : ''} onClick={() => setPeriod('7 días')}>7 días</button><button className={period === '30 días' ? 'selected' : ''} onClick={() => setPeriod('30 días')}>30 días</button><button className={period === '90 días' ? 'selected' : ''} onClick={() => setPeriod('90 días')}>90 días</button><button className={period === 'personalizado' ? 'selected' : ''} onClick={() => setCalendarOpen(!calendarOpen)}>Elegir fechas <span>▣</span></button></div>{calendarOpen && <div className="calendar-panel"><div><label>Fecha de inicio<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label><label>Fecha final<input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} /></label></div><button className="primary-button" disabled={!startDate || !endDate} onClick={() => { setPeriod('personalizado'); setCalendarOpen(false) }}>Aplicar fechas</button></div>}<div className="date-range"><span>Periodo seleccionado: <strong>{period === 'personalizado' && startDate && endDate ? `${startDate} al ${endDate}` : period}</strong></span></div><div className="metrics-large-grid">{['Ofertas enviadas', 'Ventas concretadas', 'Tiempo promedio de respuesta', 'Ingresos generados'].map((item) => <article className="metric-card" key={item}><div className="metric-icon red">↗</div><div><p>{item}</p><h2>0</h2><small>Aún no hay datos en este periodo</small></div></article>)}</div><div className="module-empty compact-empty"><div className="large-empty-icon">▥</div><h2>No hay actividad para mostrar</h2><p>Cuando respondas solicitudes, aquí aparecerán tus resultados.</p></div></AdminShell>
}

export function RegistrationStartPage() {
  return <main className="auth-page"><section className="auth-visual"><Link className="auth-brand" to="/login"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link><div className="auth-message"><span className="auth-kicker">CREA TU CUENTA</span><h1>Haz crecer<br /><em>tu negocio.</em></h1><p>Empieza a conectar con clientes cercanos.</p></div></section><section className="auth-form-wrap"><div className="choice-form"><p className="eyebrow">PRIMER PASO</p><h1>¿Cómo quieres usar Tienda Bolsillo?</h1><p className="auth-intro">Elige el tipo de cuenta que mejor se adapta a ti.</p><Link className="role-card selected" to="/registro/negocio"><span className="role-icon">▦</span><span><strong>Mi negocio</strong><small>Ofrece tus productos o servicios a clientes cercanos.</small></span><b>→</b></Link><button className="role-card" type="button"><span className="role-icon">⌖</span><span><strong>Soy cliente</strong><small>Encuentra productos y servicios cerca de ti.</small></span><b>→</b></button><p className="register-prompt">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p></div></section></main>
}

export function RegistrationBusinessPage() {
  const navigate = useNavigate()
  return <RegistrationLayoutPage step={1} title="Datos de tu negocio" subtitle="Cuéntanos un poco sobre ti y tu negocio." onBack={() => navigate('/registro')}><div className="form-grid"><FieldPage label="Correo electrónico" type="email" placeholder="tu@correo.com" /><FieldPage label="Teléfono de contacto" type="tel" placeholder="099 999 9999" /><FieldPage label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" /><FieldPage label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña" /><FieldPage className="full-field" label="Nombre comercial" placeholder="Ej. Pangust System
  " /></div><button className="primary-button wide-button" onClick={() => navigate('/registro/ubicacion')}>Continuar <span>→</span></button></RegistrationLayoutPage>
}

export function RegistrationLocationPage() {
  const navigate = useNavigate()
  const [activities, setActivities] = useState<string[]>([])
  const toggleActivity = (activity: string) => setActivities(activities.includes(activity) ? activities.filter((item) => item !== activity) : [...activities, activity])
  return <RegistrationLayoutPage step={2} title="Ubica tu negocio" subtitle="Selecciona una o más actividades y registra dónde atenderás a tus clientes." onBack={() => navigate('/registro/negocio')}><div className="activity-picker"><label>Actividad comercial</label><div className="activity-options">{['Tienda de barrio', 'Construcción y Hogar', 'Salud y Nutrición', 'Tecnología y Electrónica', 'Veterinaria y Agropecuaria', 'Vehículos y accesorios'].map((activity) => <button type="button" className={activities.includes(activity) ? 'selected' : ''} key={activity} onClick={() => toggleActivity(activity)}>{activity}<span>{activities.includes(activity) ? '✓' : '+'}</span></button>)}</div><small>{activities.length ? `${activities.length} actividades seleccionadas` : 'Puedes seleccionar varias actividades.'}</small></div><div className="form-grid"><label>Provincia<select defaultValue="Azuay"><option>Azuay</option><option>Guayas</option><option>Pichincha</option></select></label><label>Cantón<select defaultValue="Cuenca"><option>Cuenca</option><option>Quito</option><option>Guayaquil</option></select></label><label>Parroquia<select defaultValue="Ricaurte"><option>Ricaurte</option><option>El Vecino</option><option>Yanuncay</option></select></label></div><button className="map-picker" type="button"><span>⌖</span><div><strong>Marcar ubicación en el mapa</strong><small>Selecciona la ubicación exacta de tu negocio</small></div><b>→</b></button><label className="check-row"><input type="checkbox" /> Acepto los <u>Términos y condiciones</u> y la <u>Política de privacidad</u>.</label><button className="primary-button wide-button" disabled={!activities.length} onClick={() => navigate('/registro/confirmacion')}>Crear negocio <span>→</span></button></RegistrationLayoutPage>
}

export function RegistrationConfirmationPage() {
  return <main className="confirmation-page"><div className="confirmation-card"><div className="success-mark">✓</div><p className="eyebrow">REGISTRO COMPLETADO</p><h1>Tu negocio está en camino</h1><p>Hemos creado tu cuenta. Ahora puedes iniciar sesión y completar la verificación.</p><Link className="primary-button wide-button" to="/login">Iniciar sesión <span>→</span></Link><Link className="back-link" to="/registro">Volver al inicio</Link></div></main>
}

export function RegistrationLayoutPage({ step, title, subtitle, onBack, children }: { step: number; title: string; subtitle: string; onBack: () => void; children: React.ReactNode }) {
  return <main className="registration-page"><div className="registration-top"><button onClick={onBack}>←</button><Link className="auth-brand" to="/registro"><span className="auth-brand-mark">tb</span><strong>tienda <b>bolsillo</b></strong></Link><span className="step-label">Paso {step} de 2</span></div><div className="registration-content"><div className="progress-bar"><span style={{ width: `${step * 50}%` }} /></div><p className="eyebrow">CREAR NEGOCIO</p><h1>{title}</h1><p className="auth-intro">{subtitle}</p>{children}</div></main>
}

export function FieldPage({ label, className = '', ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className={className}>{label}<input {...props} required /></label>
}

export function EmptyModule({ view }: { view: View }) {
  const navigate = useNavigate()
  const title = view === 'ofertas' ? 'Ofertas' : view === 'cobros' ? 'Cobros' : 'Entregas'
  const description = view === 'ofertas' ? 'Aquí aparecerán las solicitudes de clientes cercanos.' : view === 'cobros' ? 'Aquí verás el resumen de tus pagos recibidos.' : 'Aquí gestionarás los pedidos listos para entregar.'
  const tabs = view === 'ofertas' ? ['Disponibles', 'Aceptadas', 'Esperando cliente'] : view === 'cobros' ? ['Pendientes', 'Recibidos', 'Anulados'] : ['Pendientes', 'Completadas', 'Canceladas']
  const examples = view === 'ofertas' ? [['Pintura para sala', '$180 - $240', 'Cliente cercano · Hace 12 min'], ['Reparación de tubería', '$85 - $120', 'Cliente cercano · Hace 28 min'], ['Instalación de tomacorrientes', '$60 - $90', 'Cliente cercano · Hace 1 h']] : view === 'cobros' ? [['Pintura para sala', '$180,00', 'Pendiente de pago'], ['Reparación de tubería', '$95,00', 'Pago recibido'], ['Instalación eléctrica', '$60,00', 'Cobro anulado']] : [['Entrega de materiales', 'Ricaurte → Centro', 'Preparando pedido'], ['Pedido de pintura', 'El Vecino → Ricaurte', 'Completada'], ['Accesorios eléctricos', 'Centro → Yanuncay', 'Cancelada']]
  const [activeTab, setActiveTab] = useState(tabs[0])
  return <section className="module-page"><div className="module-heading"><div><button className="back-button" onClick={() => navigate(-1)} aria-label="Regresar"><span>←</span> Regresar</button><p className="eyebrow">OPERACIÓN</p><h1>{title}</h1><p className="muted">{description}</p></div></div><div className="tabs">{tabs.map((tab) => <button className={`tab ${activeTab === tab ? 'active' : ''}`} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="example-list">{examples.map(([name, amount, status]) => <article className="example-row" key={name}><div className="example-icon">{view === 'ofertas' ? '▤' : view === 'cobros' ? '$' : '▱'}</div><div><strong>{name}</strong><small>{amount}</small></div><span className="status-label">{activeTab} · {status}</span><button className="more-button">⋮</button></article>)}</div></section>
}

export function AdminShell({ eyebrow = 'ADMINISTRACIÓN', title, description, children }: { eyebrow?: string; title: string; description: string; children: React.ReactNode }) {
  const navigate = useNavigate()
  return <section className="admin-page"><div className="admin-heading"><div><button className="back-button" onClick={() => navigate(-1)} aria-label="Regresar"><span>←</span> Regresar</button><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div></div>{children}</section>
}

export function ProfilePage() {
  const navigate = useNavigate()
  const options = [
    ['⏻', 'Activo para recibir pedidos', 'Próximamente', 'toggle'],
    ['✎', 'Editar perfil', 'Actualiza la información de tu negocio', '/perfil/editar'],
    ['✓', 'Verificar identidad', 'Completa la verificación para operar', '/perfil/verificacion'],
    ['T', 'Tipo de letra', 'Predeterminada', '/perfil/tipografia'],
    ['♧', 'Notificaciones confiables', 'Configura tus avisos', '/notificaciones'],
    ['⌖', 'Mis direcciones', 'Administra tus locales registrados', '/perfil/direcciones'],
    ['▣', 'Cuentas bancarias', 'Configura dónde recibir tus pagos', '/perfil/bancos'],
    ['♢', 'Suscripciones', 'Consulta tus planes comerciales', '/perfil/suscripciones'],
    ['▦', 'Mi negocio', 'Categorías y datos del establecimiento', '/perfil/negocio'],
    ['◌', 'Mensajes', 'Conversa con tus clientes', '/mensajes'],
    ['◉', 'Gestión de cuentas', 'Suspender o eliminar cuenta', '/perfil/cuentas'],
    ['↪', 'Cerrar sesión', 'Salir de Tienda Bolsillo', '/login'],
  ]
  return <AdminShell eyebrow="CUENTA DEL NEGOCIO" title="Perfil del negocio" description="Administra la información y configuración de Pangust System."><div className="profile-summary"><div className="profile-avatar-large">PS</div><div><h2>Pangust System</h2><p>Perfil incompleto <span>•</span> Sin calificar</p></div></div><div className="admin-options">{options.map(([icon, label, text, path]) => <button key={label} onClick={() => path.startsWith('/') && navigate(path)}><span className="option-icon">{icon}</span><span><strong>{label}</strong><small>{text}</small></span>{path === 'toggle' ? <span className="fake-switch">○</span> : <b>→</b>}</button>)}</div></AdminShell>
}

export function VerificationPage() {
  const [files, setFiles] = useState<Record<string, string>>({})
  const updateFile = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setFiles({ ...files, [name]: file.name })
  }
  return <AdminShell eyebrow="PERFIL DEL NEGOCIO" title="Verificar identidad" description="Completa la información legal y documental de tu negocio."><div className="verification-card"><div className="verification-status"><span>!</span><div><strong>Los nuevos datos no se aplican de inmediato</strong><small>Un administrador revisará la solicitud y los documentos antes de aprobarla.</small></div></div><div className="verification-section"><p className="form-section-title">TIPO DE PERSONA</p><div className="form-grid"><label>Tipo de persona<select defaultValue=""><option value="">Selecciona una opción</option><option>Persona natural</option><option>Persona jurídica / sociedad</option></select></label></div><p className="form-section-title">DATOS DE IDENTIFICACIÓN</p><div className="form-grid"><FieldPage label="RUC" placeholder="Ej. 0102030405001" /><FieldPage label="Razón social" placeholder="Nombre legal registrado" /><FieldPage label="Fecha de inicio de actividad comercial" type="date" /><div className="document-row"><strong>RUC activo</strong><label className="document-button"><input type="file" accept=".pdf,image/*" onChange={(event) => updateFile('ruc', event)} />+ {files.ruc ?? 'Agregar documento'}</label></div></div></div><div className="verification-section"><p className="form-section-title">FOTOS DEL ESTABLECIMIENTO</p><p className="section-hint">JPG, PNG o WebP · Máximo 5 MB por archivo</p><div className="upload-grid">{['Fachada / entrada', 'Rótulo o letrero', 'Interior 1', 'Interior 2'].map((name) => <label className="upload-box" key={name}><input type="file" accept="image/*" onChange={(event) => updateFile(name, event)} /><span>{files[name] ? '✓' : '+'}</span><small>{files[name] ?? name}</small></label>)}</div></div><div className="verification-section"><p className="form-section-title">CUENTA BANCARIA DEL NEGOCIO</p><div className="form-grid"><label>Banco<select defaultValue=""><option value="">Selecciona un banco</option><option>Banco Pichincha</option><option>Banco Guayaquil</option><option>Produbanco</option></select></label><label>Tipo de cuenta<select defaultValue=""><option value="">Selecciona una opción</option><option>Ahorros</option><option>Corriente</option></select></label><FieldPage label="Número de cuenta" placeholder="Número de cuenta" /><FieldPage label="Nombre del titular" placeholder="Nombre completo" /><FieldPage label="Cédula del titular" placeholder="Número de cédula" /><FieldPage label="Email (opcional)" type="email" placeholder="correo@ejemplo.com" /></div></div><div className="verification-section"><p className="form-section-title">RESPALDO DOCUMENTAL</p><label className="selfie-upload"><input type="file" accept="image/*" onChange={(event) => updateFile('selfie', event)} /><strong>Selfie con tu documento de identificación *</strong><small>{files.selfie ?? 'Toca para agregar una imagen'}</small></label><label className="document-button"><input type="file" accept=".pdf,image/*" onChange={(event) => updateFile('certificate', event)} />+ {files.certificate ?? 'Agregar certificado bancario'}</label></div><button className="submit-green" disabled={Object.keys(files).length < 7}>✈ Enviar</button></div></AdminShell>
}

export function AddressesPage() {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  return <AdminShell title="Mis direcciones" description="Gestiona los locales asociados a tu negocio."><div className="admin-toolbar"><span>{added ? '2 locales registrados' : '1 local registrado'}</span><button className="primary-button" onClick={() => setOpen(true)}>+ Agregar dirección</button></div><div className="address-card"><div className="option-icon">⌖</div><div><span className="address-label">LOCAL PRINCIPAL</span><h3>Ricaurte, Cuenca</h3><p>Coordenadas: -2.89600, -79.00520</p></div><span className="main-badge">PRINCIPAL</span><button className="more-button">⋮</button></div>{added && <div className="address-card extra-address"><div className="option-icon">⌖</div><div><span className="address-label">NUEVO LOCAL</span><h3>Centro, Cuenca</h3><p>Dirección agregada localmente</p></div></div>}{open && <Modal title="Agregar dirección" onClose={() => setOpen(false)}><FieldPage label="Nombre del local" placeholder="Ej. Sucursal Centro" /><FieldPage label="Dirección" placeholder="Calle principal y secundaria" /><button className="primary-button wide-button" onClick={() => { setAdded(true); setOpen(false) }}>Guardar dirección</button></Modal>}</AdminShell>
}

export function BanksPage() {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  return <AdminShell title="Cuentas bancarias" description="Registra una cuenta para recibir los pagos de tus ventas."><div className="admin-toolbar"><span>{added ? '1 cuenta registrada' : 'No hay cuentas registradas'}</span><button className="primary-button" onClick={() => setOpen(true)}>+ Nueva cuenta</button></div>{added ? <div className="address-card"><div className="option-icon">▣</div><div><span className="address-label">CUENTA PRINCIPAL</span><h3>Banco Pichincha ·· 4589</h3><p>Cuenta de ahorros · Titular del negocio</p></div><span className="main-badge">ACTIVA</span></div> : <div className="module-empty compact-empty"><div className="large-empty-icon">▣</div><h2>Aún no tienes una cuenta bancaria</h2><p>Agrega una cuenta para poder recibir tus pagos.</p></div>}{open && <Modal title="Nueva cuenta bancaria" onClose={() => setOpen(false)}><label>Banco<select defaultValue=""><option value="">Selecciona un banco</option><option>Banco Pichincha</option><option>Banco Guayaquil</option><option>Produbanco</option></select></label><FieldPage label="Número de cuenta" placeholder="0000000000" /><FieldPage label="Nombre del titular" placeholder="Nombre completo" /><button className="primary-button wide-button" onClick={() => { setAdded(true); setOpen(false) }}>Guardar cuenta</button></Modal>}</AdminShell>
}

export function EditProfilePage() {
  return <AdminShell title="Editar perfil" description="Actualiza la información visible de tu negocio."><div className="edit-card"><FieldPage label="Nombre comercial" defaultValue="Pangust System
  " /><FieldPage label="Teléfono de contacto" defaultValue="0958867933" /><label>Descripción del negocio<textarea defaultValue="Productos y servicios para tu hogar." /></label><button className="primary-button wide-button">Guardar cambios</button></div></AdminShell>
}

export function TypographyPage() {
  const [font, setFont] = useState(() => window.localStorage.getItem(FONT_STORAGE_KEY) ?? 'Nunito Sans')
  const selectFont = (option: string) => {
    setFont(option)
    window.localStorage.setItem(FONT_STORAGE_KEY, option)
    applyStoredFont(option)
  }
  return <AdminShell title="Tipo de letra" description="Personaliza la tipografía de la interfaz."><div className="font-options">{['Nunito Sans', 'Montserrat', 'Arial'].map((option) => <button className={font === option ? 'selected' : ''} key={option} onClick={() => selectFont(option)}><span style={{ fontFamily: option }}>{option}</span><small style={{ fontFamily: option }}>Así se verá el texto de tu negocio</small>{font === option && <b>✓</b>}</button>)}</div><div className="account-status">Tipografía actual: <strong>{font}</strong></div></AdminShell>
}

export function SubscriptionsPage() {
  return <AdminShell title="Suscripciones" description="Consulta el plan activo de tu negocio."><div className="subscription-card"><p className="eyebrow">PLAN ACTUAL</p><h2>Plan Freemium <span className="active-badge">ACTIVO</span></h2><p>Vence el <strong>13 de enero de 2027</strong></p><small>Te quedan <strong>90 días</strong> de acceso.</small><div className="subscription-progress"><span /></div><a className="primary-button subscription-button" href="https://tiendabolsillo.com" target="_blank" rel="noreferrer">Ver planes y suscribirme →</a></div></AdminShell>
}

export function BusinessPage() {
  return <AdminShell title="Mi negocio" description="Consulta la información principal de tu establecimiento."><div className="business-info-card"><div className="profile-avatar-large">PS</div><div><h2>Pangust System</h2><p>Miembro desde: <strong>15 de octubre de 2026</strong></p><p>Construcción y Hogar · Tecnología y Electrónica</p></div></div><div className="business-details"><div><span>RAZÓN SOCIAL</span><strong>Pangust System</strong></div><div><span>ACTIVIDAD COMERCIAL</span><strong>Construcción y Hogar<br />Tecnología y Electrónica</strong></div><div><span>UBICACIÓN</span><strong>Ricaurte, Cuenca, Azuay</strong></div></div></AdminShell>
}

export function AccountManagementPage() {
  const [modal, setModal] = useState<'suspend' | 'delete' | null>(null)
  const [status, setStatus] = useState('')
  return <AdminShell title="Gestión de cuentas" description="Controla el estado de acceso de tu negocio."><div className="account-warning"><strong>Antes de continuar</strong><p>No podrás suspender ni eliminar tu cuenta si tienes cobros pendientes, entregas en curso u ofertas aceptadas en proceso de pago.</p></div><div className="account-actions"><article><div><h2>Suspender cuenta</h2><p>Pausa temporalmente tu negocio y deja de recibir pedidos. Puedes reactivarlo al iniciar sesión.</p></div><button className="suspend-button" onClick={() => setModal('suspend')}>Suspender cuenta</button></article><article><div><h2>Eliminar cuenta</h2><p>Esta acción es permanente y anonimiza tus datos. No podrás recuperar el acceso.</p></div><button className="delete-button" onClick={() => setModal('delete')}>Eliminar cuenta</button></article></div>{status && <div className="account-status">{status}</div>}{modal && <Modal title={modal === 'suspend' ? 'Suspender cuenta' : 'Eliminar cuenta'} onClose={() => setModal(null)}><p className="modal-warning">{modal === 'suspend' ? '¿Seguro que deseas suspender tu cuenta? Dejarás de recibir pedidos y notificaciones.' : 'Esta acción es permanente. Se anonimizarán tus datos y no podrás deshacerla.'}</p><button className={`wide-button ${modal === 'delete' ? 'delete-button' : 'suspend-button'}`} onClick={() => { setStatus(modal === 'suspend' ? 'Cuenta suspendida temporalmente.' : 'Solicitud de eliminación registrada.'); setModal(null) }}>{modal === 'suspend' ? 'Confirmar suspensión' : 'Confirmar eliminación'}</button></Modal>}</AdminShell>
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><h2>{title}</h2><button onClick={onClose}>×</button></div>{children}</div></div>
}

export function SimpleAdminPage({ title, description, icon }: { title: string; description: string; icon: string }) {
  return <AdminShell title={title} description={description}><div className="module-empty admin-empty"><div className="large-empty-icon">{icon}</div><h2>{title === 'Mensajes' ? 'Sin conversaciones' : 'Sin notificaciones'}</h2><p>{description}</p></div></AdminShell>
}
