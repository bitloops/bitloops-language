import { Title } from '../structs/Title';
export type TClassReadModelSnapshot = {
  name: string;
  numOfTeachers?: number;
  title: Title;
};
export class ClassReadModel {
  public name: string;
  public numOfTeachers?: number;
  public title: Title;
  constructor(props: TClassReadModelSnapshot) {
    this.name = props.name;
    this.numOfTeachers = props.numOfTeachers;
    this.title = props.title;
  }
  static fromPrimitives(snapshot: TClassReadModelSnapshot): ClassReadModel {
    return new ClassReadModel(snapshot);
  }
}
