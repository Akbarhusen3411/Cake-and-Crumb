/**
 * Unified section header used across the site.
 * Eyebrow text — Section title (with optional script accent) — Gold separator.
 */
export default function SectionHeader({ eyebrow, title, scriptAccent, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const dividerClass = align === 'left' ? 'mt-5' : 'mx-auto mt-5'

  return (
    <div className={`mb-12 sm:mb-16 ${alignClass}`}>
      {eyebrow && (
        <div className={`fade-up flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} mb-4`}>
          <span className="w-8 h-px bg-gold/60" />
          <span className="text-[10px] sm:text-xs font-semibold text-berry tracking-[0.3em] uppercase">
            {eyebrow}
          </span>
          <span className="w-8 h-px bg-gold/60" />
        </div>
      )}

      {title && (
        <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate leading-tight">
          {title}{' '}
          {scriptAccent && (
            <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-chocolate">
              {scriptAccent}
            </span>
          )}
        </h2>
      )}

      <div className={`fade-up w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent ${dividerClass}`} />

      {description && (
        <p className="fade-up text-chocolate-light/60 max-w-xl mx-auto leading-relaxed mt-5 text-sm sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
