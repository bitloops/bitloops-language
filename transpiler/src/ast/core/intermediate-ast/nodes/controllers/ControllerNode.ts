import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TControllerBusDependencies } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { StatementNode } from '../statements/Statement.js';
import { ControllerBusDependenciesNode } from './ControllerBusDependenciesNode.js';

export abstract class ControllerNode extends ClassTypeNode {
  getExtraDependencies(): string[] {
    const eventBusDependencies = this.getExtraDependenciesNode();
    if (!eventBusDependencies) return [];
    const nodeValue = eventBusDependencies.getValue() as TControllerBusDependencies;
    // loop through all keys of nodeValue, and if they are true add them to the array
    const extraDependencies = Object.keys(nodeValue.controllerBusDependencies).filter(
      (key) => nodeValue.controllerBusDependencies[key] === true,
    );
    return extraDependencies;
  }
  getExtraDependenciesNode(): ControllerBusDependenciesNode | null {
    const busDependencies = this.getChildNodeByType<ControllerBusDependenciesNode>(
      BitloopsTypesMapping.TControllerBusDependencies,
    );
    return busDependencies;
  }

  abstract getAllDependenciesIdentifiers(): string[];
  abstract getStatements(): StatementNode[];
}
