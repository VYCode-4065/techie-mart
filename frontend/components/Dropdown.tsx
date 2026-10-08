interface IDropdown {
  title: string;
  items: string[];
  isOpen?: boolean;
}

const Dropdown = ({ title, items, isOpen = false }: IDropdown) => {
  return (
    <div
      className={[
        'absolute left-0 top-full z-50 mt-2 min-w-44 origin-top overflow-hidden rounded-xl border border-teal-500/50 bg-slate-950/95 text-sm font-semibold text-slate-100 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-500 ease-out',
        isOpen
          ? 'pointer-events-auto translate-y-0 scale-y-100 opacity-100'
          : 'pointer-events-none -translate-y-2 scale-y-75 opacity-0'
      ].join(' ')}
      aria-label={`${title} filter options`}
    >
      <div className="border-b border-teal-500/35 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
        {title}
      </div>
      <ul className="divide-y divide-white/10 px-2 py-2">
        {items.map((item, idx) => (
          <li key={`${item}-${idx}`} className="group">
            <button
              type="button"
              className="flex w-full items-center justify-between px-2 py-2 text-left text-xs text-slate-300 transition-colors duration-300 hover:text-teal-300 group-hover:bg-teal-500/10 font-semibold"
            >
              <span>{item}</span>
              <span className="h-px w-5 origin-left scale-x-0 bg-teal-300 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown