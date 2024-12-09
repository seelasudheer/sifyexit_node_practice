const formatDuplicateError = (error) => {
  const field = Object.keys(error.keyValue)[0]; // Get the duplicate field
  const value = error.keyValue[field]; // Get the value that caused the error
  return {
    error: {
      code: error.code,
      message: `Duplicate key error: ${field} already exists.`,
      details: {
        collection: error.collection,
        index: error.index,
        duplicateKey: { [field]: value },
      },
    },
  };
};

module.exports = {
  formatDuplicateError,
};
