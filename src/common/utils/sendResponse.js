export const sendSuccessReponse = (
  res,
  data,
  status = 200,
  message = "Successfully fetched!",
) => {
  return res.status(status).json({
    success: true,
    data,
    message,
  });
};

export const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};
