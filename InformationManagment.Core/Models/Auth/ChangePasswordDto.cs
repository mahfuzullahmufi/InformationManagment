namespace InformationManagment.Core.Models.Auth
{
    public class ChangePasswordDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
