using System;

namespace BackendLibrary
{
    public class Course
    {
        public int Id { get; }
        public string Title { get; }
        public string Description { get; }
        public DateTime CreatedAt { get; }
        public int Hours { get; }

        public Course(int id, string title, string description, DateTime createdAt, int hours) {
            Id = id;
            Title = title;
            Description = description;
            CreatedAt = createdAt;
            Hours = hours;
        }
    }
}