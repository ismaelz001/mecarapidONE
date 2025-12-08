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