namespace InformationManagment.Core.Models.Auth
{
    public class SignInResponseDto
    {
        public bool IsSuccess { get; set; }
        public string Token { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Message { get; set; }
    }
}
