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

        [HttpPost()]
        public ActionResult<Course> InsertCourse([FromBody] Course course)
        {
            if (course.Title == null || course.Description == null || course.Hours == 0)
            {
                return BadRequest("Please fill all the necessary fields");
            }
            try
            {
                course.CreatedAt = DateTime.Now;
                return _provider.Insert(course);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Course> GetCourse(int id)
        {
            try
            {
                var course = _provider.Get(id);

                if (course == null) {
                    return NotFound("Course not found");
                }
                
                return course;
            }
            catch (Exception e)
            {
                throw new Exception("Course not found", e);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Course>> GetCourses([FromQuery] string filter)
        {
            try
            {
                return _provider.List_With_Filter(filter);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPut]
        public ActionResult<Course> UpdateCourse([FromBody] Course course)
        {
            var toUpdate =_provider.Get(course.Id);

            if (toUpdate == null) {
                return NotFound("Course not found");
            }

            course.Title = string.IsNullOrEmpty(course.Title) ? toUpdate.Title : course.Title;
            course.Description = string.IsNullOrEmpty(course.Description) ? toUpdate.Description : course.Description;
            course.Hours = course.Hours == 0 ? toUpdate.Hours : course.Hours;

            try
            {
                return _provider.Update(course);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCourse(int id)
        {
            if (_provider.Get(id) == null) {
                return NotFound("Course not found");
            }

            try
            {
                _provider.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }
    }
}