/* Shared helpers used by every module. */
const $=id=>document.getElementById(id);
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches; // visitor prefers reduced motion
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));  // escape text for HTML

/** Tiny event bus so modules can talk without knowing each other: Bus.on('answer', fn); Bus.emit('answer', data). */
const Bus = {
  _h: {},
  on(e, f) { (this._h[e] = this._h[e] || []).push(f); },
  emit(e, d) { (this._h[e] || []).forEach((f) => f(d)); },
};
