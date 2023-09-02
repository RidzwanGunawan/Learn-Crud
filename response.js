const response = (statusCode, data, message, res) => {
  res.json(statusCode, [
    {
      playload: data,
      message,
      metadata: {
        prev: "",
        next: "",
        current: "",
      },
    },
  ]);
};

module.exports = response;
