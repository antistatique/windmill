export default interface Summary {
  name: string;
  email: string;
  workingPercent: number;

  formation: number;
  formationExpenses: string;

  justifiedAbsence: number;

  overtimeRecovery: number;
  overtimeRemaining: number;

  vacation: number;
  vacationBalance: number;
  previousYearVacationRemaining: number;

  remainingDaysToTake: number;
}
