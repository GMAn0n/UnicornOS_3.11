export type VNode = {
  type: string;
  props: { [key: string]: any };
  children: (VNode | string)[];
};

export function createElement(type: string, props: { [key: string]: any } = {}, ...children: (VNode | string)[]): VNode {
  return { type, props, children };
}

export function render(vnode: VNode): HTMLElement {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode) as unknown as HTMLElement;
  }

  const element = document.createElement(vnode.type);

  Object.entries(vnode.props).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      element.setAttribute(name, value.toString());
    }
  });

  vnode.children.forEach(child => {
    element.appendChild(render(child as VNode));
  });

  return element;
}

export function updateElement(parent: HTMLElement, newNode: VNode, oldNode: VNode, index = 0) {
  if (!oldNode) {
    parent.appendChild(render(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(render(newNode), parent.childNodes[index]);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index] as HTMLElement,
        newNode.children[i] as VNode,
        oldNode.children[i] as VNode,
        i
      );
    }
  }
}

function changed(node1: VNode, node2: VNode): boolean {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type;
}