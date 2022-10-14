enum REST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

const REST_METHODS_BL_TO_MODEL_MAPPER = {
  'REST.Methods.GET': REST_METHODS.GET,
  'REST.Methods.POST': REST_METHODS.POST,
  'REST.Methods.PUT': REST_METHODS.PUT,
  'REST.Methods.PATCH': REST_METHODS.PATCH,
  'REST.Methods.DELETE': REST_METHODS.DELETE,
  'REST.Methods.OPTIONS': REST_METHODS.OPTIONS,
};

export const restControllerMethodDeclaration = (children: any) => {
  return {
    method: REST_METHODS_BL_TO_MODEL_MAPPER[children[2].value],
  };
};
