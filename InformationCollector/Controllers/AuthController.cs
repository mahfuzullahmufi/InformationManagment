using InformationManagment.Core.Handler.AuthHandler;
using InformationManagment.Core.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InformationManagment.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("admin-sign-up")]
        public async Task<IActionResult> AdminSignUp([FromBody] SignUpRequestDto signUpRequestDto)
        {
            var result = await _authService.SignUp(signUpRequestDto, UserRoleType.Admin);
            return Ok(result);
        }

        [HttpPost("customer-sign-up")]
        public async Task<IActionResult> CustomerSignUp([FromBody] SignUpRequestDto signUpRequestDto)
        {
            var result = await _authService.SignUp(signUpRequestDto, UserRoleType.User);
            return Ok(result);
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn([FromBody] SignInRequestDto signInRequestDto)
        {
            var result = await _authService.SignIn(signInRequestDto);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var result = await _authService.ResetPassword(resetPasswordDto);
            return Ok(result);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var result = await _authService.ForgotPassword(forgotPasswordDto);
            return Ok(result);
        }

        [HttpPost("change-password-by-token")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var result = await _authService.ChangePassword(changePasswordDto);
            return Ok(result);
        }

        [Authorize]
        [HttpPut("update-user-details")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UserDto userDto)
        {
            userDto.Id = CurrentUser.UserId;
            var result = await _authService.UpdateUserDetails(userDto);
            return Ok(result);
        }

        [HttpGet("get-user-details")]
        public async Task<IActionResult> GetUserDetails()
        {
            var userId = CurrentUser.UserId;
            var result = await _authService.GetUserDetails(userId);
            return Ok(result);
        }

        [HttpGet("setup-2fa")]
        public async Task<IActionResult> SetupTwoFactorAuthentication(string userId)
        {
            var (key, qrCodeImage) = await _authService.SetupTwoFactorAuthenticationAsync(userId);

            return Ok(new { Key = key, QrCodeImage = qrCodeImage });
        }

        [HttpPost("verify-2fa")]
        public async Task<IActionResult> VerifyTwoFactorAuthentication(string userId, string code)
        {
            var result = await _authService.VerifyTwoFactorAuthenticationAsync(userId, code);
            if (!result)
            {
                return BadRequest(new { message = "Invalid 2FA code" });
            }

            return Ok(new { message = "2FA verification successful" });
        }

    }
}
