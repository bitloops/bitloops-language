export class Person {
  private props;
  constructor(props: any) {
    this.props = props;
  }

  public static create(props: any): any {
    const res = 5;
    if (res < 5) {
      const result = false;
      return result;
    } else {
      const result = true;
      return result;
    }
    return res;
  }

  public getCounter(counter: number): number {
    const myName = 'Hello';
    return myName.length;
  }
}
