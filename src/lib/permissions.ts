import { Role } from '@prisma/client';

// Route access by role
const routePermissions: Record<string, Role[]> = {
  '/dashboard': ['ADMIN', 'OWNER', 'OFFICE', 'MECHANIC'],
  '/work-orders': ['ADMIN', 'OWNER', 'OFFICE'],
  '/work-orders/new': ['ADMIN', 'OWNER', 'OFFICE'],
  '/work-orders/[id]': ['ADMIN', 'OWNER', 'OFFICE', 'MECHANIC'],
  '/my-orders': ['MECHANIC'],
  '/vehicles': ['ADMIN', 'OWNER', 'OFFICE'],
  '/owners': ['ADMIN', 'OWNER', 'OFFICE'],
  '/employees': ['ADMIN', 'OWNER'],
  '/settings': ['ADMIN', 'OWNER'],
  '/users': ['ADMIN'],
};

// Check if role can access route
export function canAccessRoute(route: string, role: Role): boolean {
  // Normalize route (remove dynamic segments for matching)
  const normalizedRoute = route.replace(/\/[a-zA-Z0-9_-]+$/, '/[id]');
  
  // Check exact match first
  if (routePermissions[route]) {
    return routePermissions[route].includes(role);
  }
  
  // Check normalized route
  if (routePermissions[normalizedRoute]) {
    return routePermissions[normalizedRoute].includes(role);
  }
  
  // Check parent route
  const parentRoute = route.split('/').slice(0, -1).join('/') || '/';
  if (routePermissions[parentRoute]) {
    return routePermissions[parentRoute].includes(role);
  }
  
  // Default: allow access (for unlisted routes)
  return true;
}

// Role checks
export function isAdmin(role: Role): boolean {
  return role === 'ADMIN';
}

export function isOwner(role: Role): boolean {
  return role === 'OWNER';
}

export function isOffice(role: Role): boolean {
  return role === 'OFFICE';
}

export function isMechanic(role: Role): boolean {
  return role === 'MECHANIC';
}

// Permission hierarchy: higher roles include lower permissions
export function hasMinimumRole(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Role[] = ['ADMIN', 'OWNER', 'OFFICE', 'MECHANIC'];
  const userLevel = hierarchy.indexOf(userRole);
  const requiredLevel = hierarchy.indexOf(requiredRole);
  return userLevel <= requiredLevel;
}

// Action-based permissions
export const permissions = {
  // User management
  canManageUsers: (role: Role) => isAdmin(role),
  
  // Settings
  canAccessSettings: (role: Role) => hasMinimumRole(role, 'OWNER'),
  
  // Employees
  canManageEmployees: (role: Role) => hasMinimumRole(role, 'OWNER'),
  
  // Work orders
  canCreateWorkOrder: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  canViewAllWorkOrders: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  canAssignMechanic: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  canUpdateAnyWorkOrder: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  canUpdateOwnWorkOrder: (role: Role) => true, // All roles can update their assigned orders
  
  // Vehicles & Owners
  canManageVehicles: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  canManageOwners: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  
  // Dashboard
  canViewFullDashboard: (role: Role) => hasMinimumRole(role, 'OFFICE'),
  canViewMechanicDashboard: (role: Role) => true,
};
