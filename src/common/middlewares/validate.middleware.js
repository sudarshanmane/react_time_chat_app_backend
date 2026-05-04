export const validate = (schema) => (req, res, next) => {
  const finalSchema = typeof schema === "function" ? schema(req) : schema;
  const payload = req.body ?? {};

  const result = finalSchema.safeParse(payload);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    });
  }

  req.body = result.data;
  next();
};
