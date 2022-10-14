export const getNextTypesValue = (type: string, subtree: any): any => {
  for (let i = 0; i < subtree.numOfChildren; i++) {
    if (subtree.children[i].type === type) return subtree.children[i].value;
    else {
      const value = getNextTypesValue(type, subtree.children[i]);
      if (value) return value;
    }
  }
};

export const getNextTypesChildren = (type: string, subtree: any): any => {
  // console.log('getNextTypesChildren', type, subtree);
  if (subtree.type === type) return subtree.children;
  for (let i = 0; i < subtree.numOfChildren; i++) {
    // console.log('subtree', subtree.children[i]);
    if (subtree.children[i].type === type) return subtree.children[i].children;
    else {
      // console.log('else');
      const children = getNextTypesChildren(type, subtree.children[i]);
      if (children) return children;
    }
  }
};

export const getNextTypesSubtree = (type: string, subtree: any): any => {
  if (subtree.type === type) return subtree;
  for (let i = 0; i < subtree.numOfChildren; i++) {
    if (subtree.children[i].type === type) return subtree.children[i];
    else {
      const value = getNextTypesSubtree(type, subtree.children[i]);
      if (value) return value;
    }
  }
};

export const getAllNextTypesSubtree = (type: string, subtree: any): any => {
  const subtreeToReturn = [];
  for (let i = 0; i < subtree.numOfChildren; i++) {
    if (subtree.children[i].type === type) subtreeToReturn.push(subtree.children[i]);
    else {
      const value = getNextTypesSubtree(type, subtree.children[i]);
      if (value) return value;
    }
  }
  return subtreeToReturn;
};

export const concatChildren = (children: any[], delimiter: string): string => {
  let result = '';
  for (let i = 0; i < children.length; i++) {
    result += children[i].value + delimiter;
  }
  return result.slice(0, -delimiter.length);
};
