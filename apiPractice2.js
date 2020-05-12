let apiKey = "63ca82ee13794fbe8dc6f2c6b71c0a4d";
let search = document.getElementById("searchButton");
search.addEventListener("click", collectSearch);
let searchQueryValue;
let seatchQuery = document.getElementById("searchTerm");
let searchForm = document.getElementById("searchForm");
searchForm.style.opacity = 1;
let counter1 = 0;
let counter2 = 0;

function collectSearch()
{
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if(month < 10)
	{
		month = "0"+month;
	}

	

	searchQueryValue = document.getElementById("searchTerm").value;
	fetch("https://newsapi.org/v2/everything?language=en&q="+searchQueryValue+"&from="+year+"-"+month+"-"+day+"&sortBy=publishedAt&apiKey="+apiKey)
	.then(data => data.json())
	.then(response => 
{
	let articles = response.articles;

	let wrapper = document.getElementById("wrapper");
	wrapper.innerHTML = "";
	articles.forEach(article => 
	{
		
		let title = document.createElement("h2");
		title.innerHTML = article.title;
		wrapper.appendChild(title);

		let content = document.createElement("p");
		content.innerHTML = article.content;
		wrapper.appendChild(content);

		let image = document.createElement("img");
		image.src = article.urlToImage;
		image.classList.add("articleImage");
		content.appendChild(image);

		let line = document.createElement("hr");
		line.style.color = "#e28700";
		wrapper.appendChild(line);

	})

	if(counter2 == 0)
	{
	searchForm.style.position = "absolute";
	searchForm.style.animation = "moveRight 1s ease 1";
	setTimeout(function() 
		{
			searchForm.style.animation = "keepStill 1s ease infinite";
		}
		, 1000);
		counter2++;
	}
})
}