import { CheckCircle, X, AlertCircle } from 'lucide-react'
import useToastStore from '../../store/useToastStore'

export default function Toast() {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex items-center gap-3 bg-chocolate text-cream px-5 py-3 rounded-xl shadow-2xl shadow-chocolate/30 min-w-[240px]"
        >
          {toast.type === 'success' ? (
            <CheckCircle size={18} className="text-green-400 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-berry-light shrink-0" />
          )}
          <span className="text-sm font-medium flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-cream/50 hover:text-cream transition-colors">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
