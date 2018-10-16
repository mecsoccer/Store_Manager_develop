class verifyAttendant {
  /**
 * @description - Checks if the authenticated user is attendant
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 * @memberof verifyAttendant
 */

  static isAttendant(req, res, next) {
    const { role } = req.authData;

    if (role !== 'attendant') {
      return (
        res.status(401).json({
          message: 'You are not an Attendant',
          error: true,
        })
      );
    }
    return next();
  }
}

export default verifyAttendant;
