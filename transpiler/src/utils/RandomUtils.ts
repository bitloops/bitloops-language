export class RandomUtils {
  static getRandomIntWithNumberOfDigits(digits: number): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min) + min);
  }
}
