using InformationManagment.Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace InformationManagment.Api.Extentions
{
    public static class SessionExtention
    {
        public static CurrentSession GetCurrentSession(this HttpRequest request)
        {
            var session = new CurrentSession()
            {
                UserId = string.Empty
            };

            try
            {
                var token = GetToken(request.Headers);

                if (token != null)
                {
                    session.UserId = ValueFromClaim(token, ClaimTypes.NameIdentifier);
                }
            }
            catch { }

            return session;
        }

        private static JwtSecurityToken? GetToken(IHeaderDictionary header)
        {
            string? authHeader = header?.Authorization;
            if (!string.IsNullOrEmpty(authHeader))
            {
                string[] values = authHeader.Split(' ');
                if (values.Length == 2)
                {
                    string accessToken = values[1];
                    return new JwtSecurityToken(accessToken);
                }
            }
            return null;
        }

        private static string ValueFromClaim(JwtSecurityToken token, string claimName)
        {
            var claimValue = token.Claims.FirstOrDefault(x => x.Type.Equals(claimName, StringComparison.OrdinalIgnoreCase));
            return claimValue?.Value ?? string.Empty;
        }
    }
}
