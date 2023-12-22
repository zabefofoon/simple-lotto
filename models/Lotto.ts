export class LottoClass {
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
    return new LottoClass(
      label,
      value,
      basicLength,
      specialLength,
      basicRange,
      specialRange
    )
  }
}

export const LottoList = [
  LottoClass.of('PowerBall', 'powerBall', 5, 1, 69, 26),
  LottoClass.of('Megamillion', 'megamillion', 5, 1, 70, 25),
  LottoClass.of('Eurojackpot', 'eurojackpot', 5, 2, 50, 12),
  LottoClass.of('EuroMillions', 'euroMillions', 5, 2, 50, 11),
  LottoClass.of('Superenalotto', 'superenalotto', 6, 2, 90, 90),
  LottoClass.of('La Primitiva', 'laPrimitiva', 6, 1, 49, 49),
  LottoClass.of('Lotto China', 'lottoChina', 6, 1, 50, 50),
  LottoClass.of('Lotto India', 'lottoIndia', 6, 1, 50, 50),
  LottoClass.of('Lotto Korea', 'lottoKoea', 6, 1, 45, 45),
]

export class LottoList2 {
  public readonly list = [
    LottoClass.of('PowerBall', 'powerBall', 5, 1, 69, 26),
    LottoClass.of('Megamillion', 'megamillion', 5, 1, 70, 25),
    LottoClass.of('Eurojackpot', 'eurojackpot', 5, 2, 50, 12),
    LottoClass.of('EuroMillions', 'euroMillions', 5, 2, 50, 11),
    LottoClass.of('Superenalotto', 'superenalotto', 6, 2, 90, 90),
    LottoClass.of('La Primitiva', 'laPrimitiva', 6, 1, 49, 49),
    LottoClass.of('Lotto China', 'lottoChina', 6, 1, 50, 50),
    LottoClass.of('Lotto India', 'lottoIndia', 6, 1, 50, 50),
    LottoClass.of('Lotto Korea', 'lottoKoea', 6, 1, 45, 45),
  ]

  public selectedLottoValue = this.list[0].value

  selectLottoValue(lottoValue: string) {
    this.selectedLottoValue = lottoValue
  }

  get selectedLotto() {
    return this.findLottoClass(this.selectedLottoValue)
  }

  findLottoClass(lottoValue: string) {
    return this.list.find((lotto) => lotto.value === lottoValue)!
  }

  checkSpecialBall(index: number) {
    return this.placeLength - this.selectedLotto.specialLength < index + 1
  }

  get placeLength() {
    const { basicLength, specialLength } = this.selectedLotto
    return basicLength + specialLength
  }

  static getRandomNumber(range: number) {
    return Math.floor(Math.random() * range) + 1
  }

  static of() {
    return new LottoList2()
  }
}
