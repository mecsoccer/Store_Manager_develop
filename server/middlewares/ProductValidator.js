class ProductValidator {
  /**
 * @description - Checks the request parameters for creating new product are of the right formart
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof ProductValidator
 */

  static addProductValidator(req, res, next) {
    req.check('productName', 'Product name is required').notEmpty();
    req.check('description', 'Description is required').notEmpty();
    req.check('description', 'Description should be more than 5 words')
      .isLength({ min: 15 });
    req.check('image', 'Only Jpeg, Png or Gif is accepted image format').isImage(req.body.image);
    req.check('prize', 'Unit Prize is required').notEmpty();
    req.check('quantity', 'Quantity is required').notEmpty();
    req.check('min', 'Minimum inventory is required').notEmpty();
    req.check('category', 'Category is required').notEmpty();

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors,
      });
    }
    const {
      productName, description, image, prize, quantity, min, category,
    } = req.body;
    let error = false;
    const fieldValues = [productName, description, image, prize, quantity, min, category];
    fieldValues.map((fieldValue) => {
      if (fieldValue.trim() === '') {
        error = true;
      }
    });
    if (error) {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true,
      });
    }
    return next();
  }
}

export default ProductValidator;