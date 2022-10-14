export const restControllerParameters = (children: any) => {
  return {
    dependencies: [children[0].value, children[2].value],
  };
};
