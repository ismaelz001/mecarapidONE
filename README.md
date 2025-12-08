# MecaRapidOne (MR1)

Sistema de gestión de taller mecánico con diseño industrial.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS (paleta industrial verde militar)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Deploy**: Vercel

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar base de datos
cp .env.example .env
# Editar .env con tu DATABASE_URL de Neon

# Sincronizar schema
npx prisma db push

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de conexión PostgreSQL (Neon) |

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/ai/           # Endpoint IA
│   ├── dashboard/        # Panel principal
│   ├── work-orders/      # Órdenes de trabajo
│   ├── vehicles/         # Vehículos
│   ├── owners/           # Propietarios
│   └── settings/         # Configuración
├── components/
│   ├── layout/           # Shell, Sidebar
│   └── workorders/       # Form, List
├── lib/
│   └── prisma.ts         # Cliente Prisma
└── server/
    └── workorders.ts     # Server Actions
```

## Deploy en Vercel

1. Push a GitHub
2. Conectar repo en Vercel
3. Agregar variable `DATABASE_URL` en Settings → Environment Variables
4. Deploy automático

## Licencia

Privado - Uso interno
