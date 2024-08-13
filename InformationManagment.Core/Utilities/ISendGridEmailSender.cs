
using InformationManagment.Core.Models;

namespace InformationManagment.Core.Utilities
{
    public interface ISendGridEmailSender
    {
        Task<ResponseDto> SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
