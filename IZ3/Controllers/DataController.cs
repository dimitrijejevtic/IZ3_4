using IZ3.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace IZ3.Controllers
{
    public class DataController : ApiController
    {
        Models.DataSet ds = new Models.DataSet { Win = 1345, Loss = 1161, Abandon = 18, VHSWin = 461, VHSLoss = 384 };
        // GET: api/Data
        [ResponseType(typeof(DataDTO))]
        public IHttpActionResult GetData()
        {
            DataDTO data = new DataDTO { Win = ds.Win, Lost = ds.Loss };
            return Ok(data);
        }
        // GET: api/Data/vhs
        [ResponseType(typeof(Data2DTO))]
        public IHttpActionResult GetData(string param)
        {
            Random rand = new Random();
            if (param == "Lost")
            {
                var data = new Data2DTO { Value1 = ds.VHSLoss, Value2 = ds.Loss - ds.VHSLoss , Value3 = rand.NextDouble() * (360 - 0) + 0, Value4 = rand.NextDouble() * (360 - 0) - 0 };
                return Ok(data);
            }else if (param == "Wins")
            {
                var data = new Data2DTO { Value1 = ds.VHSWin, Value2 = ds.Win - ds.VHSWin, Value3 = rand.NextDouble()*(360-0)+0, Value4 = rand.NextDouble()*(360-0)-0 };
                return Ok(data);
            }
            return NotFound();
        }
    }
}
