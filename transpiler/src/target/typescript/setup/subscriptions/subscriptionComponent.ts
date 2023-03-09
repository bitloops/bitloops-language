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
  TComponentSubscriptionDependency,
} from './subscriptionsHandler.js';

export abstract class ComponentSubscription<T> {
  abstract componentHandlerNodeType: TBitloopsTypesValues;
  abstract busIdentifier: string;
  abstract busGetterFunction: string;
  abstract componentClassType: TClassTypesValues;
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

  public generateSubscriptions(): ComponentSubscriptionsResult {
    const componentHandlers = this.moduleTree.getRootChildrenNodesValueByType<T>(
      this.componentHandlerNodeType,
    );
    const dependencies: TComponentSubscriptionDependencies = [];
    let result = `const ${this.busIdentifier} = ${this.busGetterFunction};`;
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
        this.busIdentifier,
        component.output,
        handlerInstance,
        componentHandler,
      );

      dependencies.push({
        type: 'di',
        identifier: handlerInstance,
      });
      dependencies.push(
        this.generateComponentDependency(
          this.componentClassType,
          component.output,
          componentHandler,
        ),
      );
    }
    if (dependencies.length === 0) {
      return { output: '', dependencies };
    }
    return { output: result, dependencies };
  }

  protected generateComponentDependency(
    classType: TClassTypesValues,
    identifier,
    _component: any,
  ): TComponentSubscriptionDependency {
    return {
      type: classType,
      identifier,
    };
  }
}
