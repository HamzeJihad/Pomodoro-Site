export function getNextCycle(currentCycle: number): number {
  if (currentCycle < 8) {
    return currentCycle + 1;
  }
  return 1; // If the current cycle is the last one, reset to the first cycle
}
