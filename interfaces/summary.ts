export default interface Summary {
  name: string;
  email: string;
  workingPercent: number;

  formation: number;
  formationExpenses: string;

  justifiedAbsence: number;

  overtime: number;
  overtimeRecovery: number;
  overtimePaid: number;
  overtimeRemaining: number;

  vacation: number;
  vacationBalance: number;
  vacationPreviousYearRemaining: number;
  vacationCurrentYear: number;

  remainingDaysToTake: number;
}
