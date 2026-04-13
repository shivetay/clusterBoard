export function formatSubscriptionLimit(
  used: number,
  max: number | null | undefined,
): string {
  if (max === null || max === undefined) {
    return `${used} / ∞`;
  }
  return `${used} / ${max}`;
}
