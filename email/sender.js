const Resend = require('resend')

const resend = new Resend('re_ZX2YDkKq_4RsqotvU4hkoaBuhfBsx3Fap');

async function send () {
  try {
    const data = await resend.emails.send({
      from: 'info@syncsound.ru',
      to: ['maksim2003003@gmail.com'],
      subject: 'Hello World',
      html: '<strong>It works!</strong>',
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  send
}