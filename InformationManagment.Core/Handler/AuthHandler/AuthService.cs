using InformationManagment.Core.Entities;
using InformationManagment.Core.Helpers;
using InformationManagment.Core.Models;
using InformationManagment.Core.Models.Auth;
using InformationManagment.Core.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InformationManagment.Core.Handler.AuthHandler
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISendGridEmailSender _emailSender;


        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ISendGridEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }


        public async Task<ResponseDto> SignUp(SignUpRequestDto signUpRequestDto, UserRoleType role)
        {
            try
            {
                var user = new ApplicationUser
                {
                    FirstName = signUpRequestDto.FirstName,
                    LastName = signUpRequestDto.LastName,
                    UserName = signUpRequestDto.Email,
                    Email = signUpRequestDto.Email,
                    PhoneNumber = signUpRequestDto.PhoneNumber,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, signUpRequestDto.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, role.ToString());
                    return new()
                    {
                        IsSuccess = true,
                        Message = "Your Information Has Been Saved."
                    };
                }

                return new()
                {
                    IsSuccess = false,
                    Message = result.Errors.First().Description,
                };
            }
            catch (Exception ex)
            {

                return new()
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<SignInResponseDto> SignIn(SignInRequestDto signInRequestDto)
        {
            var result = await _signInManager.PasswordSignInAsync(signInRequestDto.Email, signInRequestDto.Password, false, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(signInRequestDto.Email);
                if (user == null)
                {
                    return new()
                    {
                        IsSuccess = false,
                        Message = "User Not Found!"
                    };
                }

                var signinCredentials = GetSigningCredentials();
                var claims = await GetClaims(user);

                var tokenOptions = new JwtSecurityToken(
                    issuer: AppSettings.Settings.ApiUrl,
                    audience: AppSettings.Settings.AppUrl,
                    claims: claims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: signinCredentials);

                var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return new SignInResponseDto()
                {
                    IsSuccess = true,
                    Token = token,
                    UserData = new UserDto()
                    {
                        FirstName = user.FirstName,
                        Id = user.Id,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber
                    }
                };
            }
            else
            {
                return new SignInResponseDto
                {
                    IsSuccess = false,
                    Message = "Invalid Authentication"
                };
            }
        }

        private SigningCredentials GetSigningCredentials()
        {
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.Settings.SecretKey));

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims(ApplicationUser user)
        {
            var claims = new List<Claim>
                {
                    new(ClaimTypes.Name, user.LastName),
                    new(ClaimTypes.Email, user.Email),
                    new(ClaimTypes.NameIdentifier, user.Id)
                };

            var roles = await _userManager.GetRolesAsync(await _userManager.FindByEmailAsync(user.Email));
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        public async Task<ResponseDto> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
            {
                return new()
                {
                    IsSuccess = false,
                    Message = "User Not Found!"
                };
            }
            var changePassResult = await _userManager.ChangePasswordAsync(user, resetPasswordDto.CurrentPassword, resetPasswordDto.NewPassword);
            if (changePassResult.Succeeded)
            {
                return new()
                {
                    IsSuccess = true,
                    Message = "Password Has Been Changed."
                };
            }

            return new()
            {
                IsSuccess = false,
                Message = "Invalid Authentication"
            };
        }

        public async Task<ResponseDto> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
            {
                return new()
                {
                    IsSuccess = false,
                    Message = "User Not Found!"
                };
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var url = $"{AppSettings.Settings.AppUrl}/reset-password?token={token}&email={forgotPasswordDto.Email}";
            var htmlContent = ResetPassHtmlContent.GetContent(url);
            var result = await _emailSender.SendEmailAsync(forgotPasswordDto.Email, "Password Reset", htmlContent);
            if (result.IsSuccess)
                return result;

            return new()
            {
                IsSuccess = false,
                Message = "Something went wrong, Please try again!"
            };
        }

        public async Task<ResponseDto> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(changePasswordDto.Email);
            if (user == null)
            {
                return new()
                {
                    IsSuccess = false,
                    Message = "User Not Found!"
                };
            }
            var resetPassResult = await _userManager.ResetPasswordAsync(user, changePasswordDto.Token, changePasswordDto.NewPassword);
            if (resetPassResult.Succeeded)
            {
                return new()
                {
                    IsSuccess = true,
                    Message = "Password Has Been Changed."
                };
            }
            return new()
            {
                IsSuccess = false,
                Message = "Something went wrong, Please try again!"
            };
        }

        public async Task<ResponseDto> UpdateUserDetails(UserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(userDto.Id);

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return new() { IsSuccess = true, Message = "Successfully Updated Data." };
            else
                return new() { IsSuccess = false, Message = "Something went wrong, Please try again!" };
        }

        public async Task<UserDto> GetUserDetails(string userId)
        {
            var result = await _userManager.FindByIdAsync(userId);
            var getUserRoles = await _userManager.GetRolesAsync(result);

            List<UserRoleType> userRoles = ConvertToUserRoleTypes(getUserRoles);

            var user = new UserDto()
            {
                Id = result.Id,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email,
                PhoneNumber = result.PhoneNumber,
                UserRole = userRoles.FirstOrDefault(),
            };

            return user;
        }

        private List<UserRoleType> ConvertToUserRoleTypes(IList<string> roles)
        {
            List<UserRoleType> userRoles = new List<UserRoleType>();

            foreach (var role in roles)
            {
                if (Enum.TryParse<UserRoleType>(role, out var sellerRole))
                {
                    userRoles.Add(sellerRole);
                }
            }

            return userRoles;
        }
    }
}
