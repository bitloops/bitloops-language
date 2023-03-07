import { Title } from '../structs/Title';
export type TClassReadModelSnapshot = {
  name: string;
  numOfTeachers?: number;
  title: Title;
};
export class ClassReadModel {
  constructor(public props: TClassReadModelSnapshot) {}
  static fromPrimitives(snapshot: TClassReadModelSnapshot): ClassReadModel {
    return new ClassReadModel(snapshot);
  }
}
