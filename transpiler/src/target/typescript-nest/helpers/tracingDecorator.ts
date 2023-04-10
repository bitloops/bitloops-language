export const getTraceableDecorator = (name: string, type: string): string => {
  return `
    @Traceable({
      operation: '${name}',
      metrics: {
        name: '${name}',
        category: '${type}',
      },
    })
    `;
};
