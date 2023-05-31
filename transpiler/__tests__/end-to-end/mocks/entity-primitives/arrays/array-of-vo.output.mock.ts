import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { DocumentProps } from './document.props';
import {
  DocumentLocationVO,
  TDocumentLocationVOPrimitives,
} from './document-location.value-object';
import { StatusVO, TStatusVOPrimitives } from './status.value-object';
import { RowEntity, TRowEntityPrimitives } from './row.entity';
export type TDocumentEntityPrimitives = {
  id?: string;
  name: string;
  locations: TDocumentLocationVOPrimitives[];
  rows: TRowEntityPrimitives[];
  statuses: TStatusVOPrimitives[][];
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
  get locations(): DocumentLocationVO[] {
    return this.props.locations;
  }
  get rows(): RowEntity[] {
    return this.props.rows;
  }
  get statuses(): StatusVO[][] {
    return this.props.statuses;
  }
  public static fromPrimitives(data: TDocumentEntityPrimitives): DocumentEntity {
    const DocumentEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      name: data.name,
      locations: data.locations.map((x) => DocumentLocationVO.fromPrimitives(x)),
      rows: data.rows.map((x) => RowEntity.fromPrimitives(x)),
      statuses: data.statuses.map((x) => x.map((x) => StatusVO.fromPrimitives(x))),
    };
    return new DocumentEntity(DocumentEntityProps);
  }
  public toPrimitives(): TDocumentEntityPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      locations: this.locations.map((x) => x.toPrimitives()),
      rows: this.rows.map((x) => x.toPrimitives()),
      statuses: this.statuses.map((x) => x.map((x) => x.toPrimitives())),
    };
  }
}
