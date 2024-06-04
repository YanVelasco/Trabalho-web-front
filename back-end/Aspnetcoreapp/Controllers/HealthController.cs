using Microsoft.AspNetCore.Mvc;

namespace aspnetcoreapp.Controllers
{
    [Route("health")]
    public class HealthController : ControllerBase
    {

        [HttpGet("")]
        public ActionResult Healthcheck()
        {
            return Ok();
        }
    }
}