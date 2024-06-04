using System;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace BackendLibrary
{
    public class CoursesProvider
    {
        private const string CONN_STRING = "Server=db;Database=backend-db;User Id=sa;Password=validpassword123!@#;";
        private const string QUERY_GET_ALL = "SELECT * FROM Courses";
        private const string QUERY_GET_ALL_WITH_FILTER = "SELECT * FROM Courses WHERE Title LIKE @filter";

        public Course[] Get_All_With_Filter(string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return Get_All();
            } else {
                filter = "%" + filter + "%";
                using (var connection = new SqlConnection(CONN_STRING))
                {
                    return connection.Query<Course>(QUERY_GET_ALL_WITH_FILTER, new { filter }).ToArray();
                }
            }
        }
        
        public Course[] Get_All()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Course>(QUERY_GET_ALL).ToArray();
            }
        }
    }
}

