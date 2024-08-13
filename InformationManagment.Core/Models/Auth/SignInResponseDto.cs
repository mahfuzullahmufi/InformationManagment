namespace InformationManagment.Core.Models.Auth
{
    public class SignInResponseDto
    {
        public bool IsSuccess { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
        public UserDto UserData { get; set; }
    }
}
