using InformationManagment.Api.Extentions;
using InformationManagment.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InformationManagment.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator _mediatr => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        public CurrentSession CurrentUser
        {
            get { return Request.GetCurrentSession(); }
        }
    }
}
