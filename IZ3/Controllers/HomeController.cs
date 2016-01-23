using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace IZ3.Controllers
{
    public class HomeController : Controller
    {
        private string steamResponse = "1";
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public async Task<string> GetLatestDataAsync()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new System.Uri("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.GetAsync("?matches_requested=1&key=6C27C769CB6D9DC710B55F70AEE401D5");
                if (response.IsSuccessStatusCode)
                {
                    var res = await response.Content.ReadAsStringAsync();
                  //  dynamic dynJson = JsonConvert.DeserializeObject(res);
                    steamResponse = res;
                    return res;
                }
                return response.StatusCode.ToString();
            }
        }      
    }
}
