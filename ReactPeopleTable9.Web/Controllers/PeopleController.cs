using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleTable9.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleTable9.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connString;

        public PeopleController(IConfiguration configuration)
        {
            _connString = configuration.GetConnectionString("ConStr");
        }

        [Route("add")]
        [HttpPost]
        public int AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connString);
            int personId = repo.AddPerson(person);
            return personId;
        } 

        [Route("get")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connString);
            return repo.GetPeople();
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(PersonToDelete person)
        {
            var repo = new PeopleRepository(_connString);
            repo.Delete(person.Id);
        }

        [Route("update")]
        [HttpPost]
        public void Update(Person person)
        {
            var repo = new PeopleRepository(_connString);
            repo.Update(person);
        }

        [Route("deleteall")]
        [HttpPost]
        public void DeleteAll(PeopleToDelete people)
        {
            var repo = new PeopleRepository(_connString);
            repo.Delete(people.Ids);
        }
    }
}
