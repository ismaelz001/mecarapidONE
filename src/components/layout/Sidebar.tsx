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