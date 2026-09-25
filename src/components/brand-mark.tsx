export function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <span aria-hidden="true" className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border ${dark ? 'border-black/20' : 'border-white/35'}`}>
      <span className={`absolute h-7 w-px rotate-[28deg] ${dark ? 'bg-[#7e2133]' : 'bg-[#d7b567]'}`} />
      <span className={`absolute h-px w-7 -rotate-[28deg] ${dark ? 'bg-[#7e2133]' : 'bg-[#d7b567]'}`} />
      <span className={`h-2 w-2 rounded-full ${dark ? 'bg-[#7e2133]' : 'bg-[#d7b567]'}`} />
    </span>
  );
}
