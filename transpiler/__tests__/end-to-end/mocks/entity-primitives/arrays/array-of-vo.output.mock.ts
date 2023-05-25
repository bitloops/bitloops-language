import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { DocumentProps } from './document.props';
import { StatusVO, TStatusVOPrimitives } from './status.value-object';
import {
  DocumentLocationVO,
  TDocumentLocationVOPrimitives,
} from './document-location.value-object';
export type TDocumentEntityPrimitives = {
  id: string;
  name: string;
  status: TStatusVOPrimitives;
  locations: TDocumentLocationVOPrimitives[];
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
      status: StatusVO.fromPrimitives(data.status),
      locations: data.locations.map((x) => DocumentLocationVO.fromPrimitives(x)),
    };
    return new DocumentEntity(DocumentEntityProps);
  }
  public toPrimitives(): TDocumentEntityPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      status: this.status.toPrimitives(),
      locations: this.locations.map((x) => x.toPrimitives()),
    };
  }
}
