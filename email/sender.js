const ApiError = require("../error/ApiError");
const { Resend } = require("resend");

const resend = new Resend(process.env.EMAIL_API_KEY);

class EmailSender {

  async toMe(req, res, next) {
    const { emailData, emailHTML } = req.body
    // console.log(emailData, emailHTML)
    try {
      const data = await resend.emails.send({
        from: "info@syncsound.ru",
        to: emailData.to,
        subject: emailData.subject,
        html: emailHTML,
      });
      // console.log(data);
    } catch (error) {
      console.error(error);
      return next(ApiError.badRequest("Ошибка при отправке сообщения!"))
    }
  }

}



module.exports = new EmailSender()