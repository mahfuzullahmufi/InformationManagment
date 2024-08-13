using InformationManagment.Core.Models;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace InformationManagment.Core.Utilities
{
    public class SendGridEmailSender : ISendGridEmailSender
    {
        public string SendGridSecret { get; set; }

        public SendGridEmailSender(IConfiguration _config)
        {
            SendGridSecret = _config.GetValue<string>("SendGrid:SecretKey");
        }

        public async Task<ResponseDto> SendEmailAsync(string email, string subject, string htmlMessage)
        {
            try
            {
                var client = new SendGridClient(SendGridSecret);
                var from = new EmailAddress("mahfuzullah1999@gmail.com", "Information-Management");
                var to = new EmailAddress(email);
                var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlMessage);
                var result = await client.SendEmailAsync(msg);
                if(result.IsSuccessStatusCode)
                {
                    return new()
                    {
                        IsSuccess = true,
                        Message = "Email has been send successfully!"
                    };
                }
                return new()
                {
                    IsSuccess = false,
                    Message = "Something went wrong, Please try again!"
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
