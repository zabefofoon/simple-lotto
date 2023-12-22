export class Lotto {
  constructor(
    public readonly label: string,
    public readonly value: string,
    public readonly basicLength: number,
    public readonly specialLength: number,
    public readonly basicRange: number,
    public readonly specialRange: number
  ) {}

  static of(
    label: string,
    value: string,
    basicLength: number,
    specialLength: number,
    basicRange: number,
    specialRange: number
  ) {
    return new Lotto(
      label,
      value,
      basicLength,
      specialLength,
      basicRange,
      specialRange
    )
  }
}

export class LottoManager {
  public readonly list = [
    Lotto.of('PowerBall', 'powerBall', 5, 1, 69, 26),
    Lotto.of('Megamillion', 'megamillion', 5, 1, 70, 25),
    Lotto.of('Eurojackpot', 'eurojackpot', 5, 2, 50, 12),
    Lotto.of('EuroMillions', 'euroMillions', 5, 2, 50, 11),
    Lotto.of('Superenalotto', 'superenalotto', 6, 2, 90, 90),
    Lotto.of('La Primitiva', 'laPrimitiva', 6, 1, 49, 49),
    Lotto.of('Lotto China', 'lottoChina', 6, 1, 50, 50),
    Lotto.of('Lotto India', 'lottoIndia', 6, 1, 50, 50),
    Lotto.of('Lotto Korea', 'lottoKoea', 6, 1, 45, 45),
  ]

  public selectedLottoValue = this.list[0].value

  get selectedLotto() {
    return this.findLottoClass(this.selectedLottoValue)
  }

  get placeLength() {
    const { basicLength, specialLength } = this.selectedLotto
    return basicLength + specialLength
  }

  selectLottoValue(lottoValue: string) {
    this.selectedLottoValue = lottoValue
  }

  findLottoClass(lottoValue: string) {
    return this.list.find((lotto) => lotto.value === lottoValue)!
  }

  checkSpecialBall(index: number) {
    return this.placeLength - this.selectedLotto.specialLength < index + 1
  }

  static getRandomNumber(range: number) {
    return Math.floor(Math.random() * range) + 1
  }

  static of() {
    return new LottoManager()
  }
}
