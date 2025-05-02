export const apiPrefix = process.env.NEXT_PUBLIC_PREFIX;

const languageEndpoint = {
  GET_ALL: `${apiPrefix}/languages`,
  GET_BY_ID: `${apiPrefix}/languages/{code}`,
};

const translationEndpoint = {
  GET_ALL: `${apiPrefix}/languages/{code}/translations/{pattern}`,
};

export { languageEndpoint, translationEndpoint };
