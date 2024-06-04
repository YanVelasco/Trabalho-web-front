using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using BackendLibrary;

namespace aspnetcoreapp.Controllers
{
    [Route("courses")]
    public class CoursesController : ControllerBase
    {
        private readonly CoursesProvider _provider = new CoursesProvider();

        [HttpGet("list")]
        public ActionResult<IEnumerable<Course>> GetCourses([FromQuery] string filter)
        {
            try
            {
                return _provider.Get_All_With_Filter(filter);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }
    }
}