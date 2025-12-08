'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { permissions } from '@/lib/permissions';
import { Role } from '@prisma/client';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: Role[];
}

const allNavItems: NavItem[] = [
  { 
    href: '/dashboard', 
    label: 'Panel de Control',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
    roles: ['ADMIN', 'OWNER', 'OFFICE'],
  },
  { 
    href: '/my-orders', 
    label: 'Mis Órdenes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    roles: ['MECHANIC'],
  },
  { 
    href: '/work-orders', 
    label: 'Órdenes de Trabajo',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    roles: ['ADMIN', 'OWNER', 'OFFICE'],
  },
  { 
    href: '/vehicles', 
    label: 'Vehículos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M8 17h.01M16 17h.01M3 11l2-6h14l2 6M5 17h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
      </svg>
    ),
    roles: ['ADMIN', 'OWNER', 'OFFICE'],
  },
  { 
    href: '/owners', 
    label: 'Propietarios',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    roles: ['ADMIN', 'OWNER', 'OFFICE'],
  },
  { 
    href: '/employees', 
    label: 'Empleados',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    roles: ['ADMIN', 'OWNER'],
  },
  { 
    href: '/settings', 
    label: 'Configuración',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    roles: ['ADMIN', 'OWNER'],
  },
  { 
    href: '/users', 
    label: 'Usuarios',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    roles: ['ADMIN'],
  },
];

const roleLabels: Record<Role, string> = {
  ADMIN: 'Administrador',
  OWNER: 'Propietario',
  OFFICE: 'Oficina',
  MECHANIC: 'Mecánico',
};

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role as Role | undefined;

  // Filter nav items based on user role
  const navItems = allNavItems.filter(item => {
    if (!item.roles) return true;
    if (!userRole) return false;
    return item.roles.includes(userRole);
  });

  return (
    <aside className="w-64 min-h-screen bg-mr-bg border-r border-mr-border flex flex-col">
      {/* Logo Header */}
      <div className="h-16 flex items-center px-6 border-b border-mr-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-mr-accent flex items-center justify-center">
            <span className="text-mr-bg font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-mr-accent tracking-wider">MR1</h1>
            <p className="text-xs text-mr-text/60 uppercase tracking-widest">MecaRapid</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-150
                    ${isActive 
                      ? 'bg-mr-primary text-mr-accent border-l-4 border-mr-accent' 
                      : 'text-mr-text/80 hover:bg-mr-border/50 hover:text-mr-text border-l-4 border-transparent'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-mr-border">
        {session?.user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-mr-secondary flex items-center justify-center">
                <span className="text-mr-text font-semibold text-sm">
                  {session.user.name?.charAt(0) || session.user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-mr-text truncate">
                  {session.user.name || session.user.email}
                </p>
                <p className="text-xs text-mr-accent uppercase">
                  {userRole ? roleLabels[userRole] : 'Usuario'}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full text-left px-4 py-2 text-sm text-mr-text/60 hover:text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-wide"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="block text-center py-2 text-sm text-mr-accent hover:text-mr-secondary transition-colors uppercase tracking-wide"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </aside>
  );
}