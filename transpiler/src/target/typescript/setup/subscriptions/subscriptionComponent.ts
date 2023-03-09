import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import {
  BitloopsTypesMapping,
  TBitloopsTypesValues,
  TClassTypesValues,
} from '../../../../helpers/mappings.js';
import {
  TBitloopsPrimaryTypeValues,
  TDependencyInjection,
  bitloopsPrimaryTypeKey,
} from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { DependencyInjectionsGenerator } from '../dependency-injections/diHandler.js';
import {
  ComponentSubscriptionsResult,
  TComponentSubscriptionDependencies,
} from './subscriptionsHandler.js';

export abstract class ComponentSubscription<T> {
  constructor(
    protected readonly moduleTree: IntermediateASTTree,
    protected readonly dependencyInjections: TDependencyInjection[],
  ) {}

  abstract getDIForComponentHandler(component: T): TDependencyInjection | undefined;
  abstract getComponentFromComponentHandler(handler: T): TBitloopsPrimaryTypeValues;
  abstract subscriptionStatement(
    busIdentifier: string,
    componentClassName: string,
    componentHandlerIdentifier: string,
    componentHandler?: T,
  ): string;

  public generateSubscriptions(params: {
    componentHandlerNodeType: TBitloopsTypesValues;
    busIdentifier: string;
    busGetterFunction: string;
    componentClassType: TClassTypesValues;
  }): ComponentSubscriptionsResult {
    const {
      componentHandlerNodeType,
      busIdentifier,
      busGetterFunction,
      componentClassType: classType,
    } = params;
    const componentHandlers =
      this.moduleTree.getRootChildrenNodesValueByType<T>(componentHandlerNodeType);
    const dependencies: TComponentSubscriptionDependencies = [];
    let result = `const ${busIdentifier} = ${busGetterFunction};`;
    for (const componentHandler of componentHandlers) {
      const di = this.getDIForComponentHandler(componentHandler);
      if (!di) {
        // Throw error to inform for unregistered DI?
        continue;
      }
      const { type, identifier } = di.dependencyInjection;
      const handlerInstance = DependencyInjectionsGenerator.generateDIsInstanceName(
        type,
        identifier,
      );

      const componentParameterType = this.getComponentFromComponentHandler(componentHandler);
      const component = modelToTargetLanguage({
        value: { [bitloopsPrimaryTypeKey]: componentParameterType },
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
      });
      result += this.subscriptionStatement(
        busIdentifier,
        component.output,
        handlerInstance,
        componentHandler,
      );

      dependencies.push({
        type: 'di',
        identifier: handlerInstance,
      });
      dependencies.push({
        type: classType,
        identifier: component.output,
      });
    }
    if (dependencies.length === 0) {
      return { output: '', dependencies };
    }
    return { output: result, dependencies };
  }
}
