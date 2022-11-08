

export default class IntermediateModel {
    
}

// Composite for nodes of the tree
abstract class ModelComponent {
    protected parent!: ModelComponent | null;

    public setParent(parent: ModelComponent | null) {
        this.parent = parent;
    }

    public getParent(): ModelComponent | null {
        return this.parent;
    }

    public isComposite(): boolean {
        return false;
    }

    public abstract createComponent(): string;
}

// e.g. break;
class LeafModelComponent extends ModelComponent {
    public createComponent(): string {
        return 'Leaf';
    }
}

class CompositeModelComponent extends ModelComponent {
    protected children: ModelComponent[] = [];
    
    public add(component: ModelComponent): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: ModelComponent): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }
    // here the recursion takes place
    public createComponent(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.createComponent());
        }

        return `Branch(${results.join('+')})`;
    }
}