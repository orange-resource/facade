const asyncHandler = function (fn) {
  return function (req, res, next) {
    return Promise.resolve(
      fn(req, res, next)
    ).catch((err) => {
      next(err)
    })
  }
}

module.exports = asyncHandler
