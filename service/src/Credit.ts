export class Credit {
  constructor(
    private amount: number,
    private roundToReturn: number,
    private percent: number,
  ) {
  }

  static empty() {
    return new Credit(0, 0, 0);
  }

  isMustReturned(currentRound: number): boolean {
    return this.roundToReturn >= currentRound;
  }

  calculateInterestRate(): number {
    return Math.round(this.amount * (this.percent / 100));
  }
}
