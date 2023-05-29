import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { BlockReasonProps } from './block-reason.props';
export type TBlockReasonVOPrimitives = {
  reason: string;
};
export class BlockReasonVO extends Domain.ValueObject<BlockReasonProps> {
  private constructor(props: BlockReasonProps) {
    super(props);
  }
  public static create(props: BlockReasonProps): Either<BlockReasonVO, never> {
    return ok(new BlockReasonVO(props));
  }
  get reason(): string {
    return this.props.reason;
  }
  public static fromPrimitives(data: TBlockReasonVOPrimitives): BlockReasonVO {
    const BlockReasonVOProps = { reason: data.reason };
    return new BlockReasonVO(BlockReasonVOProps);
  }
  public toPrimitives(): TBlockReasonVOPrimitives {
    return {
      reason: this.reason,
    };
  }
}
