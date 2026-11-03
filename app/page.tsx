'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
  X,
} from 'lucide-react'

type Status = 'Pendiente' | 'Contactado' | 'Resuelto'
type Priority = 'Alta' | 'Media' | 'Baja'

type Patient = {
  id: number
  name: string
  initials: string
  treatment: string
  days: number
  priority: Priority
  status: Status
  phone: string
  color: string
}

const initialPatients: Patient[] = [
  { id: 1, name: 'Laura Martínez', initials: 'LM', treatment: 'Implante dental', days: 18, priority: 'Alta', status: 'Pendiente', phone: '555 010 2401', color: 'coral' },
  { id: 2, name: 'Carlos Ramírez', initials: 'CR', treatment: 'Ortodoncia', days: 12, priority: 'Alta', status: 'Pendiente', phone: '555 010 2402', color: 'blue' },
  { id: 3, name: 'Sofía Torres', initials: 'ST', treatment: 'Endodoncia', days: 9, priority: 'Media', status: 'Contactado', phone: '555 010 2403', color: 'purple' },
  { id: 4, name: 'Diego Herrera', initials: 'DH', treatment: 'Limpieza profunda', days: 7, priority: 'Media', status: 'Pendiente', phone: '555 010 2404', color: 'green' },
  { id: 5, name: 'Ana López', initials: 'AL', treatment: 'Carillas dentales', days: 5, priority: 'Baja', status: 'Resuelto', phone: '555 010 2405', color: 'amber' },
  { id: 6, name: 'Miguel Santos', initials: 'MS', treatment: 'Corona dental', days: 4, priority: 'Media', status: 'Contactado', phone: '555 010 2406', color: 'slate' },
]

const statusOptions: Status[] = ['Pendiente', 'Contactado', 'Resuelto']

function Avatar({ patient }: { patient: Patient }) {
  return <div className={`avatar avatar-${patient.color}`} aria-hidden="true">{patient.initials}</div>
}

function StatusBadge({ status }: { status: Status }) {
  const icon = status === 'Resuelto' ? <CheckCircle2 size={13} /> : status === 'Contactado' ? <MessageCircle size={13} /> : <Clock3 size={13} />
  return <span className={`status-badge status-${status.toLowerCase()}`}>{icon}{status}</span>
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`priority-badge priority-${priority.toLowerCase()}`}><span className="priority-dot" />{priority}</span>
}

function MetricCard({ icon, label, value, helper, tone }: { icon: React.ReactNode; label: string; value: number; helper: string; tone: string }) {
  return <div className="metric-card">
    <div className={`metric-icon ${tone}`}>{icon}</div>
    <div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{helper}</small></div>
  </div>
}

export default function Page() {
  const [patients, setPatients] = useState(initialPatients)
  const [filter, setFilter] = useState<'Todos' | Status>('Todos')
  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  const metrics = useMemo(() => ({
    attention: patients.filter((patient) => patient.status !== 'Resuelto').length,
    high: patients.filter((patient) => patient.priority === 'Alta' && patient.status !== 'Resuelto').length,
    pending: patients.filter((patient) => patient.status === 'Pendiente').length,
    contacted: patients.filter((patient) => patient.status === 'Contactado').length,
  }), [patients])

  const visiblePatients = patients.filter((patient) => {
    const matchesFilter = filter === 'Todos' || patient.status === filter
    const query = search.toLowerCase()
    return matchesFilter && `${patient.name} ${patient.treatment}`.toLowerCase().includes(query)
  })

  function updateStatus(id: number, status: Status) {
    setPatients((current) => current.map((patient) => patient.id === id ? { ...patient, status } : patient))
  }

  function openWhatsApp(patient: Patient) {
    const message = `Hola ${patient.name.split(' ')[0]}, te escribimos de Sonrisa Clínica Dental para dar seguimiento a tu tratamiento de ${patient.treatment.toLowerCase()}. ¿Te gustaría agendar tu próxima cita?`
    window.open(`https://wa.me/155501024${patient.id}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    updateStatus(patient.id, 'Contactado')
  }

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Stethoscope size={21} strokeWidth={2.5} /></div><div><strong>Sonrisa</strong><span>Clínica Dental</span></div></div>
      <div className="clinic-switcher"><div className="clinic-avatar">SC</div><div><strong>Clínica Centro</strong><span>Panel de trabajo</span></div><ChevronDown size={15} /></div>
      <nav className="main-nav" aria-label="Navegación principal">
        <p className="nav-label">PRINCIPAL</p>
        <a className="nav-link active" href="#seguimiento"><LayoutDashboard size={18} />Seguimiento de hoy<span className="nav-count">{metrics.attention}</span></a>
        <a className="nav-link" href="#agenda"><CalendarDays size={18} />Agenda</a>
        <a className="nav-link" href="#pacientes"><Users size={18} />Pacientes</a>
        <p className="nav-label nav-label-space">GESTIÓN</p>
        <a className="nav-link" href="#reportes"><HeartPulse size={18} />Reportes</a>
        <a className="nav-link" href="#configuracion"><Settings size={18} />Configuración</a>
      </nav>
      <div className="sidebar-footer"><div className="help-card"><div className="help-icon"><ShieldCheck size={18} /></div><div><strong>Todo bajo control</strong><span>Tu seguimiento está al día</span></div></div><div className="profile"><div className="profile-avatar">MC</div><div><strong>Mariana Cruz</strong><span>Asistente dental</span></div><MoreHorizontal size={18} /></div></div>
    </aside>

    <section className="content-area">
      <header className="topbar"><div className="mobile-brand"><div className="brand-mark"><Stethoscope size={18} /></div><strong>Sonrisa</strong></div><div className="topbar-actions"><button className="icon-button notification-button" aria-label="Ver notificaciones" onClick={() => setShowNotifications(!showNotifications)}><Bell size={19} /><span className="notification-dot" /></button><div className="topbar-divider" /><div className="user-chip"><div className="profile-avatar small">MC</div><span>Mariana Cruz</span><ChevronDown size={15} /></div></div>{showNotifications && <div className="notification-popover"><strong>Notificaciones</strong><p>3 pacientes requieren atención hoy.</p><button onClick={() => setShowNotifications(false)}><X size={13} />Cerrar</button></div>}</header>
      <div className="page-content" id="seguimiento">
        <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" />Martes, 18 de junio de 2024 <span className="eyebrow-context">· Tu lista de trabajo</span></div><div className="title-row"><div><h1>Seguimiento de hoy</h1><p>Hola Mariana, aquí tienes lo que necesita tu atención.</p></div><span className="focus-pill"><HeartPulse size={14} />Enfoque del día</span></div></div><button className="date-button"><CalendarDays size={17} />Hoy <ChevronDown size={14} /></button></div>

        <section className="metrics-grid" aria-label="Resumen de seguimiento">
          <MetricCard icon={<Users size={18} />} label="Requieren atención" value={metrics.attention} helper="de 6 pacientes activos" tone="teal" />
          <MetricCard icon={<span className="alert-symbol">!</span>} label="Alta prioridad" value={metrics.high} helper="requieren acción inmediata" tone="red" />
          <MetricCard icon={<Clock3 size={18} />} label="Seguimientos pendientes" value={metrics.pending} helper="sin contacto registrado" tone="amber" />
          <MetricCard icon={<CheckCircle2 size={18} />} label="Pacientes contactados" value={metrics.contacted} helper="en seguimiento activo" tone="green" />
        </section>

        <section className="followup-section" aria-labelledby="followup-title">
          <div className="section-heading"><div><h2 id="followup-title">Pacientes que requieren seguimiento</h2><p>Prioriza las conversaciones según el tiempo desde su última sesión.</p></div><button className="filter-button"><Filter size={16} />Filtrar<ChevronDown size={14} /></button></div>
          <div className="toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar paciente o tratamiento..." aria-label="Buscar paciente o tratamiento" /></div><div className="filter-tabs" role="group" aria-label="Filtrar por estado">{(['Todos', ...statusOptions] as const).map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}{item !== 'Todos' && <span>{patients.filter((patient) => patient.status === item).length}</span>}</button>)}</div></div>
          <div className="patient-table-wrap"><table className="patient-table"><thead><tr><th>Paciente</th><th>Tratamiento</th><th>Última sesión</th><th>Prioridad</th><th>Estado</th><th className="action-heading">Acción</th></tr></thead><tbody>{visiblePatients.map((patient) => <tr key={patient.id} className={patient.priority === 'Alta' && patient.status !== 'Resuelto' ? 'priority-row' : ''}><td><div className="patient-cell"><Avatar patient={patient} /><div><strong>{patient.name}</strong><span>Paciente #{String(patient.id).padStart(4, '0')}</span></div></div></td><td><span className="treatment-name">{patient.treatment}</span><span className="treatment-sub">Plan en curso</span></td><td><strong className={patient.days >= 14 ? 'days-risk' : ''}>{patient.days} días</strong><span className="treatment-sub">desde su última visita</span></td><td><PriorityBadge priority={patient.priority} /></td><td><label className="status-select"><select aria-label={`Cambiar estado de ${patient.name}`} value={patient.status} onChange={(event) => updateStatus(patient.id, event.target.value as Status)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={13} /></label></td><td className="action-cell">{patient.status !== 'Resuelto' ? <button className="whatsapp-button" onClick={() => openWhatsApp(patient)}><MessageCircle size={16} />WhatsApp</button> : <span className="resolved-action"><Check size={15} />Completado</span>}</td></tr>)}</tbody></table>{visiblePatients.length === 0 && <div className="empty-state"><Search size={25} /><strong>No encontramos pacientes</strong><span>Prueba con otro nombre o estado.</span></div>}</div>
          <div className="table-footer"><span>Mostrando <strong>{visiblePatients.length}</strong> de <strong>{patients.length}</strong> pacientes</span><span className="footer-note"><CheckCircle2 size={14} /> Datos actualizados hace unos segundos</span></div>
        </section>
        <footer className="page-footer"><span>© 2024 Sonrisa Clínica Dental</span><span>Ayuda y soporte</span></footer>
      </div>
    </section>
  </main>
}
