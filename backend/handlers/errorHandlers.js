/* Catch Errors Handler */

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    const resp = fn(req, res, next);
    if (resp instanceof Promise) {
      return resp.catch(next);
    }
    return resp;
  };
};

// exports.catchErrors = (fn) => {

//   return async function (req, res, next) {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };


/* Not Found Error Handler */
exports.notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Api url doesn't exist ",
  });
};

/* Development Error Handler */
exports.developmentErrors = (error, req, res, next) => {
  error.stack = error.stack || '';
  const errorDetails = {
    message: error.message,
    status: error.status,
    stackHighlighted: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };

  res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  });
};

/* Production Error Handler */
exports.productionErrors = (error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  });
};
