using InformationManagment.Core.Models;
using InformationManagment.Core.Models.Auth;

namespace InformationManagment.Core.Handler.AuthHandler
{
    public interface IAuthService
    {
        Task<ResponseDto> SignUp(SignUpRequestDto signUpRequestDto, UserRoleType role);
        Task<SignInResponseDto> SignIn(SignInRequestDto signInRequestDto);
        Task<ResponseDto> ResetPassword(ResetPasswordDto resetPasswordDto);
        Task<ResponseDto> ForgotPassword(ForgotPasswordDto forgotPasswordDto);
        Task<ResponseDto> ChangePassword(ChangePasswordDto changePasswordDto);
        Task<ResponseDto> UpdateUserDetails(UserDto userDto);
        Task<UserDto> GetUserDetails(string userId);

        Task<(string Key, string QrCodeImage)> SetupTwoFactorAuthenticationAsync(string userId);
        Task<bool> VerifyTwoFactorAuthenticationAsync(string userId, string code);
    }
}
