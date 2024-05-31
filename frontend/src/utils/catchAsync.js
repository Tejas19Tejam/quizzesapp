const catchAsync = (asyncFn) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const { response } = error || {};
      const message = response ? response?.data.message : error.message;

      throw new Error(message);
    }
  };
};

export default catchAsync;
