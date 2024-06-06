using System;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace BackendLibrary
{
    public class CoursesProvider
    {
        private const string CONN_STRING = "Server=db;Database=backend-db;User Id=sa;Password=validpassword123!@#;";
        private const string QUERY_INSERT = "INSERT INTO Courses (Title, Description, Hours, CreatedAt) VALUES (@Title, @Description, @Hours, @CreatedAt); SELECT SCOPE_IDENTITY();";
        private const string QUERY_GET = "SELECT * FROM Courses WHERE Id = @Id";
        private const string QUERY_LIST = "SELECT * FROM Courses";
        private const string QUERY_LIST_WITH_FILTER = "SELECT * FROM Courses WHERE Title LIKE @Filter";
        private const string QUERY_UPDATE = "UPDATE Courses SET Title = @Title, Description = @Description, Hours = @Hours WHERE Id = @Id";
        private const string QUERY_DELETE = "DELETE FROM Courses WHERE Id = @Id";

        public Course Insert(Course course)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                var id = connection.Execute(QUERY_INSERT, course);
                return Get(id);
            }
        }

        public Course Get(int id)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.QueryFirstOrDefault<Course>(QUERY_GET, new { Id = id });
            }
        }

        public Course[] List_With_Filter(string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return List();
            } else {
                filter = "%" + filter + "%";
                using (var connection = new SqlConnection(CONN_STRING))
                {
                    return connection.Query<Course>(QUERY_LIST_WITH_FILTER, new { Filter = filter }).ToArray();
                }
            }
        }
        
        public Course[] List()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Course>(QUERY_LIST).ToArray();
            }
        }

        public Course Update(Course course)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                connection.Execute(QUERY_UPDATE, course);
                return Get(course.Id);
            }
        }

        public void Delete(int id)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                connection.Execute(QUERY_DELETE, new { Id = id });
            }
        }
    }
}

