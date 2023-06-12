export type TTodoReadModelSnapshot = {
  id: string;
  title: string;
  completed: boolean;
};
export class TodoReadModel {
  public id: string;
  public title: string;
  public completed: boolean;
  constructor(props: TTodoReadModelSnapshot) {
    this.id = props.id;
    this.title = props.title;
    this.completed = props.completed;
  }
  static fromPrimitives(snapshot: TTodoReadModelSnapshot): TodoReadModel {
    return new TodoReadModel(snapshot);
  }
}
