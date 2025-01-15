import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "joi";

interface ValidationErrorDetail {
  message: string;
  path: (string | number)[];
  part: string;
}

interface ValidationSchemas {
  params?: Schema;
  body?: Schema;
  query?: Schema;
}

const validateSchema = (schemas: ValidationSchemas): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    let errors: ValidationErrorDetail[] = [];

    // Loop qua từng phần của object schemas
    Object.entries(schemas).forEach(([part, schema]) => {
      if (schema) {
        // Đảm bảo part value không null hoặc undefined
        const { error } = schema.validate((req as any)[part], {
          abortEarly: false,
        }); // Function của Joi, abortEarly để không exit giữa chừng
        if (error) {
          errors = errors.concat(
            // Kết hợp với các lỗi trước đó (nếu có) thành một array errors
            error.details.map((detail: any) => ({
              // Trả về một object error lỗi có 3 thành phần message, path và part
              message: detail.message.replace(/"/g, ""), // Loại bỏ double-quote
              path: detail.path,
              part,
            }))
          );
        }
      }
    });

    // Return lỗi nếu có
    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
      return;
    }

    next();
  };
};

export default validateSchema;
