// import { TArgumentDependencies, TArgumentDependency, TClassInstantiation } from '../types.js';
// import { Builder } from './Builder.js';
// /* eslint-disable */
// export default class IntermediateModel {}

// // Composite for nodes of the tree
// abstract class ModelComponent {
//   protected parent!: ModelComponent | null;

//   public setParent(parent: ModelComponent | null) {
//     this.parent = parent;
//   }

//   public getParent(): ModelComponent | null {
//     return this.parent;
//   }

//   public isComposite(): boolean {
//     return false;
//   }

//   public abstract create(dependencies?: any): object | string;
// }

// // e.g. break;
// class LeafModelComponent extends ModelComponent {
//   public create(): string {
//     return 'Leaf';
//   }
// }

// Builder<TArgumentDependency>().type('double').value('dsfsdf');
// class ArgumentDependencyComponent extends ModelComponent {
//   public create(): TArgumentDependency {
//     return {
//       value: 'x',
//       type: 'variable',
//     };
//   }
// }

// class CompositeModelComponent extends ModelComponent {
//   protected children: ModelComponent[] = [];

//   public add(component: ModelComponent): void {
//     this.children.push(component);
//     component.setParent(this);
//   }

//   public remove(component: ModelComponent): void {
//     const componentIndex = this.children.indexOf(component);
//     this.children.splice(componentIndex, 1);

//     component.setParent(null);
//   }

//   public isComposite(): boolean {
//     return true;
//   }
//   // here the recursion takes place
//   public create(): string {
//     const results = [];
//     for (const child of this.children) {
//       results.push(child.create());
//     }

//     return `Branch(${results.join('+')})`;
//   }
// }

// type TClassInstantiationComponentCreateDeps = {
//   className: string;
//   argumentDependencies?: TArgumentDependencies;
// };

// // maybe private constructor to do the validation of the specific component
// // maybe not correct candidate for composite pattern since no recursion is needed here
// class ClassInstantiationComponent extends ModelComponent {
//   //   protected children: Record<string, ModelComponent> = {};
//   protected children: ModelComponent[] = [];

//   public add(component: ModelComponent): void {
//     this.children.push(component);
//     // this.children.classInstantiation;
//     component.setParent(this);
//   }

//   public remove(component: ModelComponent): void {
//     const componentIndex = this.children.indexOf(component);
//     this.children.splice(componentIndex, 1);

//     component.setParent(null);
//   }

//   public isComposite(): boolean {
//     return true;
//   }
//   // here the recursion takes place
//   public create(
//     classInstantiationDeps: TClassInstantiationComponentCreateDeps,
//   ): TClassInstantiation {
//     const { className, argumentDependencies } = classInstantiationDeps;
//     const res: TClassInstantiation = {
//       classInstantiation: {
//         className,
//       },
//     };

//     if (argumentDependencies) res.classInstantiation.argumentDependencies = argumentDependencies;

//     console.log('res', res);
//     return res;
//   }
// }

// const clientCode = (component: ModelComponent) => {
//   console.log(component.create());
// };

// const simple = new LeafModelComponent();
// console.log("Client: I've got a simple component:");
// clientCode(simple);

// const tree = new CompositeModelComponent();

// const branch1 = new CompositeModelComponent();
// branch1.add(new LeafModelComponent());
// branch1.add(new LeafModelComponent());
// const branch2 = new CompositeModelComponent();
// branch2.add(new LeafModelComponent());
// tree.add(branch1);
// tree.add(branch2);

// console.log("Client: Now I've got a composite tree:");
// clientCode(tree);

// tree.remove(branch1);
// console.log("Client: Now I've got a composite tree 2:");
// clientCode(tree);

// const argumentDependencyComponent = new ArgumentDependencyComponent();
// const argDep = argumentDependencyComponent.create();
// const classInstantiationComponent = new ClassInstantiationComponent();

// classInstantiationComponent.add(argumentDependencyComponent);

// const classInst = classInstantiationComponent.create({
//   className: 'papas',
//   argumentDependencies: [argDep],
// });
// console.log('classInst', JSON.stringify(classInst));
// // clientCode(classInstantiationComponent);
