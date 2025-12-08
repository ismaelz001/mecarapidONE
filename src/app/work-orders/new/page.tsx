import Shell from '@/components/layout/Shell';
import WorkOrderForm from '@/components/workorders/WorkOrderForm';

export default function NewWorkOrderPage() {
  return (
    <Shell>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
          Nueva Orden de Trabajo
        </h1>
        <p className="text-mr-text/60 mt-1">
          Hoja de entrada — Registra un nuevo vehículo y trabajo
        </p>
      </div>

      {/* Form */}
      <WorkOrderForm />
    </Shell>
  );
}
