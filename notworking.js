var request = require("request");  
var cheerio = require("cheerio"); 
var fs = require("fs");
var officegen =  require("officegen");
var xlsx = officegen("xlsx");
var sheet=xlsx.makeNewSheet();
sheet.name="공채";
sheet.setCell("A1","마감일자");
sheet.setCell("B1","회사명");

var url = "http://www.saramin.co.kr/zf_user/jobs/public/list?sort=ud&quick_apply=&search_day=&keyword=&pr_exp_lv%5B%5D=1&up_cd%5B%5D=3#listTop";
var i=1;
request(url, function(error, response, body) {  
  //if (error) throw error;
  var $ = cheerio.load(body);
  var postElements = $("table.common_recruit_list tr");
  postElements.each(function() {
    
    sheet.data[i]=[];
    var endDate = $(this).find("td.support_info p.deadlines").text();
    var companyTitle = $(this).find("td.company_nm a").attr("title");
    sheet.data[i].push(endDate,companyTitle);
    i++;
    console.log("마감일자 : " + endDate+" 회사명 : "+companyTitle+"\n");
  });
    
});

var strm = fs.createWriteStream("test.xlsx");
xlsx.generate(strm);