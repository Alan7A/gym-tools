export const maxRepCalculatorState = $state({
  weight: 0,
  reps: 0,
  formulas: [
    {
      formula: 'Brzycki',
      result: 0
    },
    {
      formula: 'Epley',
      result: 0
    },
    {
      formula: 'McGlothin',
      result: 0
    },
    {
      formula: 'Lombardi',
      result: 0
    }
  ] as Array<{ formula: string; result: number }>,
  averageResult: 0
});
