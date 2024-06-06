using System;

namespace BackendLibrary
{
    public class Course
    {
        public int Id { get; set;}
        public string Title { get; set;}
        public string Description { get; set;}
        public DateTime CreatedAt { get; set;}
        public int Hours { get; set;}

        public Course(int id, string title, string description, DateTime createdAt, int hours) {
            Id = id;
            Title = title;
            Description = description;
            CreatedAt = createdAt;
            Hours = hours;
        }
    }
}