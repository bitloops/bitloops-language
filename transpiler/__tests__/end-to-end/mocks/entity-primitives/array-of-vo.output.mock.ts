import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { DocumentProps } from './document.props';
import { StatusVO } from './status.value-object';
import { DocumentLocationVO } from './document-location.value-object';
type TDocumentEntityPrimitives = {
  id: string;
  name: string;
  status: {
    status: string;
  };
  locations: {
    path: string;
  }[];
};
export class DocumentEntity extends Domain.Aggregate<DocumentProps> {
  private constructor(props: DocumentProps) {
    super(props, props.id);
  }
  public static create(props: DocumentProps): Either<DocumentEntity, never> {
    return ok(new DocumentEntity(props));
  }
  get id() {
    return this._id;
  }
  get name(): string {
    return this.props.name;
  }
  get status(): StatusVO {
    return this.props.status;
  }
  get locations(): DocumentLocationVO[] {
    return this.props.locations;
  }
  public static fromPrimitives(data: TDocumentEntityPrimitives): DocumentEntity {
    const DocumentEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      name: data.name,
      status: StatusVO.create({
        status: data.status.status,
      }).value as StatusVO,
      locations: data.locations.map(
        (x) =>
          DocumentLocationVO.create({
            path: x.path,
          }).value as DocumentLocationVO,
      ),
    };
    return new DocumentEntity(DocumentEntityProps);
  }
  public toPrimitives(): TDocumentEntityPrimitives {
    return {
      id: this.id.toString(),
      name: this.props.name,
      status: {
        status: this.props.status.status,
      },
      locations: this.props.locations.map((x) => ({
        path: x.path,
      })),
    };
  }
}
