/** Eased (easeOutCubic) integer count for progress in [0,1]. */
export function countAt(to: number, progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  const eased = 1 - Math.pow(1 - p, 3);
  return Math.round(to * eased);
}
