// Map of icon names used in content files → Lucide icons. Add more here as needed.
import {
  Store, Users, ShoppingBag, Crosshair, Scale, Cpu, Briefcase, GraduationCap, Building2,
  Search, Wrench, Gauge, Target, Database, Handshake, Filter, Layers, Eye,
} from 'lucide-react'

export const icons = {
  store: Store,
  users: Users,
  'shopping-bag': ShoppingBag,
  crosshair: Crosshair,
  scale: Scale,
  cpu: Cpu,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  building: Building2,
  search: Search,
  wrench: Wrench,
  gauge: Gauge,
  target: Target,
  database: Database,
  handshake: Handshake,
  filter: Filter,
  layers: Layers,
  eye: Eye,
}

export function Icon({ name, ...props }) {
  const C = icons[name]
  return C ? <C aria-hidden="true" {...props} /> : null
}
