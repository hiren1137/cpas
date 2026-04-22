import { writeFileSync, mkdirSync } from 'fs';

const states = [
  { name:"Alabama", code:"AL", slug:"alabama", cities:["Birmingham","Montgomery","Mobile","Huntsville","Tuscaloosa","Hoover","Dothan","Auburn","Decatur","Madison"] },
  { name:"Alaska", code:"AK", slug:"alaska", cities:["Anchorage","Fairbanks","Juneau","Sitka","Ketchikan","Wasilla","Kenai","Kodiak","Bethel","Palmer"] },
  { name:"Arizona", code:"AZ", slug:"arizona", cities:["Phoenix","Tucson","Mesa","Chandler","Scottsdale","Glendale","Gilbert","Tempe","Peoria","Surprise"] },
  { name:"Arkansas", code:"AR", slug:"arkansas", cities:["Little Rock","Fort Smith","Fayetteville","Springdale","Jonesboro","North Little Rock","Conway","Rogers","Pine Bluff","Bentonville"] },
  { name:"California", code:"CA", slug:"california", cities:["Los Angeles","San Francisco","San Diego","San Jose","Sacramento","Fresno","Long Beach","Oakland","Bakersfield","Anaheim"] },
  { name:"Colorado", code:"CO", slug:"colorado", cities:["Denver","Colorado Springs","Aurora","Fort Collins","Lakewood","Thornton","Arvada","Westminster","Pueblo","Boulder"] },
  { name:"Connecticut", code:"CT", slug:"connecticut", cities:["Hartford","New Haven","Stamford","Bridgeport","Waterbury","Norwalk","Danbury","New Britain","Greenwich","Bristol"] },
  { name:"Delaware", code:"DE", slug:"delaware", cities:["Wilmington","Dover","Newark","Middletown","Bear","Glasgow","Hockessin","Brookside","Smyrna","Milford"] },
  { name:"Florida", code:"FL", slug:"florida", cities:["Miami","Orlando","Tampa","Jacksonville","St. Petersburg","Hialeah","Fort Lauderdale","Tallahassee","Cape Coral","Pembroke Pines"] },
  { name:"Georgia", code:"GA", slug:"georgia", cities:["Atlanta","Savannah","Augusta","Columbus","Macon","Athens","Sandy Springs","Roswell","Johns Creek","Albany"] },
  { name:"Hawaii", code:"HI", slug:"hawaii", cities:["Honolulu","Hilo","Kailua","Kapolei","Kaneohe","Pearl City","Waipahu","Mililani","Ewa Beach","Aiea"] },
  { name:"Idaho", code:"ID", slug:"idaho", cities:["Boise","Meridian","Nampa","Idaho Falls","Caldwell","Pocatello","Coeur d'Alene","Twin Falls","Post Falls","Lewiston"] },
  { name:"Illinois", code:"IL", slug:"illinois", cities:["Chicago","Aurora","Naperville","Rockford","Joliet","Springfield","Peoria","Elgin","Champaign","Waukegan"] },
  { name:"Indiana", code:"IN", slug:"indiana", cities:["Indianapolis","Fort Wayne","Evansville","South Bend","Carmel","Fishers","Bloomington","Hammond","Gary","Lafayette"] },
  { name:"Iowa", code:"IA", slug:"iowa", cities:["Des Moines","Cedar Rapids","Davenport","Sioux City","Iowa City","Waterloo","Ames","West Des Moines","Council Bluffs","Ankeny"] },
  { name:"Kansas", code:"KS", slug:"kansas", cities:["Wichita","Overland Park","Kansas City","Olathe","Topeka","Lawrence","Shawnee","Manhattan","Lenexa","Salina"] },
  { name:"Kentucky", code:"KY", slug:"kentucky", cities:["Louisville","Lexington","Bowling Green","Owensboro","Covington","Richmond","Georgetown","Florence","Hopkinsville","Nicholasville"] },
  { name:"Louisiana", code:"LA", slug:"louisiana", cities:["New Orleans","Baton Rouge","Shreveport","Lafayette","Lake Charles","Kenner","Bossier City","Monroe","Alexandria","Houma"] },
  { name:"Maine", code:"ME", slug:"maine", cities:["Portland","Lewiston","Bangor","South Portland","Auburn","Biddeford","Sanford","Saco","Westbrook","Augusta"] },
  { name:"Maryland", code:"MD", slug:"maryland", cities:["Baltimore","Frederick","Rockville","Gaithersburg","Bowie","Hagerstown","Annapolis","College Park","Salisbury","Laurel"] },
  { name:"Massachusetts", code:"MA", slug:"massachusetts", cities:["Boston","Worcester","Springfield","Cambridge","Lowell","Brockton","New Bedford","Quincy","Lynn","Fall River"] },
  { name:"Michigan", code:"MI", slug:"michigan", cities:["Detroit","Grand Rapids","Ann Arbor","Warren","Sterling Heights","Lansing","Kalamazoo","Flint","Dearborn","Livonia"] },
  { name:"Minnesota", code:"MN", slug:"minnesota", cities:["Minneapolis","Saint Paul","Rochester","Duluth","Bloomington","Brooklyn Park","Plymouth","Maple Grove","Woodbury","St. Cloud"] },
  { name:"Mississippi", code:"MS", slug:"mississippi", cities:["Jackson","Gulfport","Biloxi","Hattiesburg","Southaven","Olive Branch","Tupelo","Meridian","Greenville","Horn Lake"] },
  { name:"Missouri", code:"MO", slug:"missouri", cities:["Kansas City","St. Louis","Springfield","Columbia","Independence","Lee's Summit","O'Fallon","St. Joseph","St. Charles","Blue Springs"] },
  { name:"Montana", code:"MT", slug:"montana", cities:["Billings","Missoula","Great Falls","Bozeman","Butte","Helena","Kalispell","Havre","Anaconda","Miles City"] },
  { name:"Nebraska", code:"NE", slug:"nebraska", cities:["Omaha","Lincoln","Bellevue","Grand Island","Kearney","Fremont","Hastings","Norfolk","North Platte","Columbus"] },
  { name:"Nevada", code:"NV", slug:"nevada", cities:["Las Vegas","Henderson","Reno","North Las Vegas","Sparks","Carson City","Fernley","Elko","Mesquite","Boulder City"] },
  { name:"New Hampshire", code:"NH", slug:"new-hampshire", cities:["Manchester","Nashua","Concord","Derry","Dover","Rochester","Salem","Merrimack","Londonderry","Hudson"] },
  { name:"New Jersey", code:"NJ", slug:"new-jersey", cities:["Newark","Jersey City","Paterson","Elizabeth","Lakewood","Edison","Woodbridge","Toms River","Hamilton","Trenton"] },
  { name:"New Mexico", code:"NM", slug:"new-mexico", cities:["Albuquerque","Las Cruces","Santa Fe","Rio Rancho","Roswell","Farmington","Hobbs","Clovis","Alamogordo","Carlsbad"] },
  { name:"New York", code:"NY", slug:"new-york", cities:["New York City","Buffalo","Rochester","Yonkers","Syracuse","Albany","New Rochelle","Mount Vernon","Schenectady","Utica"] },
  { name:"North Carolina", code:"NC", slug:"north-carolina", cities:["Charlotte","Raleigh","Greensboro","Durham","Winston-Salem","Fayetteville","Cary","Wilmington","High Point","Asheville"] },
  { name:"North Dakota", code:"ND", slug:"north-dakota", cities:["Fargo","Bismarck","Grand Forks","Minot","West Fargo","Williston","Dickinson","Mandan","Jamestown","Wahpeton"] },
  { name:"Ohio", code:"OH", slug:"ohio", cities:["Columbus","Cleveland","Cincinnati","Toledo","Akron","Dayton","Parma","Canton","Youngstown","Lorain"] },
  { name:"Oklahoma", code:"OK", slug:"oklahoma", cities:["Oklahoma City","Tulsa","Norman","Broken Arrow","Edmond","Lawton","Moore","Midwest City","Enid","Stillwater"] },
  { name:"Oregon", code:"OR", slug:"oregon", cities:["Portland","Salem","Eugene","Gresham","Hillsboro","Beaverton","Bend","Medford","Springfield","Corvallis"] },
  { name:"Pennsylvania", code:"PA", slug:"pennsylvania", cities:["Philadelphia","Pittsburgh","Allentown","Reading","Erie","Scranton","Bethlehem","Lancaster","Harrisburg","York"] },
  { name:"Rhode Island", code:"RI", slug:"rhode-island", cities:["Providence","Warwick","Cranston","Pawtucket","East Providence","Woonsocket","Newport","Central Falls","Westerly","North Providence"] },
  { name:"South Carolina", code:"SC", slug:"south-carolina", cities:["Charleston","Columbia","Greenville","North Charleston","Mount Pleasant","Rock Hill","Spartanburg","Summerville","Goose Creek","Hilton Head Island"] },
  { name:"South Dakota", code:"SD", slug:"south-dakota", cities:["Sioux Falls","Rapid City","Aberdeen","Brookings","Watertown","Mitchell","Yankton","Huron","Pierre","Vermillion"] },
  { name:"Tennessee", code:"TN", slug:"tennessee", cities:["Nashville","Memphis","Knoxville","Chattanooga","Clarksville","Murfreesboro","Franklin","Jackson","Johnson City","Bartlett"] },
  { name:"Texas", code:"TX", slug:"texas", cities:["Houston","Dallas","San Antonio","Austin","Fort Worth","El Paso","Arlington","Corpus Christi","Plano","Lubbock"] },
  { name:"Utah", code:"UT", slug:"utah", cities:["Salt Lake City","Provo","West Valley City","West Jordan","Orem","Sandy","Ogden","St. George","Layton","Lehi"] },
  { name:"Vermont", code:"VT", slug:"vermont", cities:["Burlington","Essex","Rutland","South Burlington","Bennington","Brattleboro","Milton","Hartford","Barre","Montpelier"] },
  { name:"Virginia", code:"VA", slug:"virginia", cities:["Virginia Beach","Norfolk","Richmond","Chesapeake","Newport News","Alexandria","Hampton","Roanoke","Portsmouth","Lynchburg"] },
  { name:"Washington", code:"WA", slug:"washington", cities:["Seattle","Spokane","Tacoma","Vancouver","Bellevue","Kent","Everett","Renton","Federal Way","Yakima"] },
  { name:"West Virginia", code:"WV", slug:"west-virginia", cities:["Charleston","Huntington","Morgantown","Parkersburg","Wheeling","Weirton","Fairmont","Martinsburg","Beckley","Clarksburg"] },
  { name:"Wisconsin", code:"WI", slug:"wisconsin", cities:["Milwaukee","Madison","Green Bay","Kenosha","Racine","Appleton","Waukesha","Oshkosh","Eau Claire","Janesville"] },
  { name:"Wyoming", code:"WY", slug:"wyoming", cities:["Cheyenne","Casper","Laramie","Gillette","Rock Springs","Sheridan","Green River","Evanston","Riverton","Jackson"] }
];

function slugify(name) {
  return name.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
}

const pops = [500000,400000,350000,300000,250000,200000,180000,160000,140000,120000];

const seedData = {
  states: states.map(s => ({
    name: s.name,
    code: s.code,
    slug: s.slug,
    cities: s.cities.map((c, i) => ({
      name: c,
      slug: slugify(c),
      population: pops[i] || 100000
    }))
  }))
};

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/cities-seed.json', JSON.stringify(seedData, null, 2));

// Create empty firm files for each city
for (const state of seedData.states) {
  const dir = `src/data/firms-by-city/${state.slug}`;
  mkdirSync(dir, { recursive: true });
  for (const city of state.cities) {
    const firmData = {
      city: city.name,
      state: state.name,
      state_code: state.code,
      city_slug: city.slug,
      state_slug: state.slug,
      firm_count: 0,
      firms: []
    };
    writeFileSync(`${dir}/${city.slug}.json`, JSON.stringify(firmData, null, 2));
  }
}

console.log('Generated cities-seed.json and empty firm files for all 500 cities.');
