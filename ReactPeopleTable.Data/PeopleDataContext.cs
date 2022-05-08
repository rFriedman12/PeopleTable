using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleTable9.Data
{
    public class PeopleDataContext : DbContext
    {
        private readonly string _connString;

        public PeopleDataContext(string connString)
        {
            _connString = connString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connString);
        }

        public DbSet<Person> People { get; set; }
    }
}
