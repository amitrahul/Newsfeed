
function FetchAccordianitems(title,i) {
 return ` <div class="accordion-item">
  <h2 class="accordion-header" id="panelsStayOpen-heading-${i+1}">
    <button class="accordion-button ${ i===0 ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse-${i+1}" aria-expanded="true" aria-controls="panelsStayOpen-collapse-${i+1}">
    ${title}
    </button>
  </h2>
  <div id="panelsStayOpen-collapse-${i+1}" class="accordion-collapse collapse ${ i === 0 ? "show" : ""}" aria-labelledby="panelsStayOpen-heading-${i+1}">
    <div class="accordion-body" id="slideshow-${i+1}">
    </div>
  </div>
</div>
  `
}

function GenerateCraousel(i) {
  return ` <div id="carouselControls-${i+1}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="slide-${i+1}">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls-${i+1}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls-${i+1}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
}


  async function newsDataFetch() {
    try {
      for (let i = 0; i < magazines.length; i++) {
        const newsurl = magazines[i];
        
        let res =  await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${newsurl}`);
         let resdata = await res.json();
          console.log(resdata);
          console.log(resdata.items);

          document.getElementById("accordionPanelsStayOpenExample").innerHTML += FetchAccordianitems(resdata.feed.title,i);
          
          document.getElementById(`slideshow-${i+1}`).innerHTML = GenerateCraousel(i);
          resdata.items.forEach((element,j) => {
              let {title,author,description,pubDate,enclosure,link} = element;
              
              document.getElementById(`slide-${i+1}`).innerHTML += `
              <div class="carousel-item ${j === 0 ? 'active' : ""}">
              <a href="${link}" target="_blank" class="card">
              <div class="card-body">
              <img src="${enclosure.link}" class="carousel-image card-img-top" alt="...">
                <div>
                    <h5 class="card-title">${title} </h5>
                    <div class="card-text">
                    <p>
                      ${author} <span id="seprator"></span> ${new Date(pubDate).toLocaleDateString()}
                    </p>
                    <p>
                      ${description}
                    </p>
                    </div>
                </div>
              </div>
              </a>
            </div>
              `;
          });
        
        }
      } catch (error) {
          return null;
      }
  }

  newsDataFetch()


  
