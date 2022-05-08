using Microsoft.EntityFrameworkCore;
using ReactPeopleTable9.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleTable9.Data
{
    public class PeopleRepository
    {
        private string _connString;

        public PeopleRepository(string connString)
        {
            _connString = connString;
        }

        public int AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connString);
            context.People.Add(person);
            context.SaveChanges();
            return person.Id;
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleDataContext(_connString);
            return context.People.ToList();
        }

        public void Delete(int id)
        {
            using var context = new PeopleDataContext(_connString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            context.SaveChanges();
        }

        public void Delete(List<int> ids)
        {
            using var context = new PeopleDataContext(_connString);
            foreach (int id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }
            context.SaveChanges();
        }

        public void Update(Person person)
        {
            using var context = new PeopleDataContext(_connString);
            context.Database.ExecuteSqlInterpolated(@$"UPDATE People 
                                                       SET FirstName = {person.FirstName}, LastName = {person.LastName}, Age = {person.Age}
                                                       WHERE Id = {person.Id}");
            context.SaveChanges();
        }
    }
}
