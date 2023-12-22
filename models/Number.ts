import { LottoManager } from './Lotto'

export class NumberManager {
  public numbers: number[] = []

  constructor(private readonly lottoManager: LottoManager) {}

  emptyNumbers() {
    this.numbers = []
  }

  generateNumbers() {
    this.emptyNumbers()
    Array(this.lottoManager.placeLength)
      .fill(0)
      .map((_, index) => this.geenerateNumber(index))
    this.sortNumbers()
  }

  private sortNumbers() {
    const cloned = this.numbers.slice()
    const spliced = cloned
      .splice(0, this.lottoManager.selectedLotto.basicLength)
      .sort((a, b) => a - b)
    this.numbers = [...spliced, ...cloned]
  }

  private geenerateNumber(index: number) {
    const randomNumber = this.lottoManager.checkSpecialBall(index)
      ? LottoManager.getRandomNumber(this.lottoManager.selectedLotto.specialRange)
      : LottoManager.getRandomNumber(this.lottoManager.selectedLotto.basicRange)

    const pushable =
      !this.numbers.includes(randomNumber) &&
      this.lottoManager.placeLength > this.numbers.length

    if (pushable) {
      this.numbers.push(randomNumber)
      return
    }
    this.geenerateNumber(index)
  }

  static of(lottoManager: LottoManager) {
    return new NumberManager(lottoManager)
  }
}
