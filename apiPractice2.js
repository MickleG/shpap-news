let apiKey = "63ca82ee13794fbe8dc6f2c6b71c0a4d";
let searchQuery = document.getElementById("searchTerm");
let searchQueryValue;
let searchForm = document.getElementById("searchForm");

let homeQuery = document.getElementById("homeButton");

let navButtonQuery = [...document.getElementsByClassName("navSearchQuery")];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();

if(month == 0)
{
	month = 12;
	year--;
}

if(month < 10)
{
	month = "0" + month;
}

// homeQuery.addEventListener("click", showHome());

navButtonQuery.forEach(category => 
{
	let navTopic = category.innerHTML;
	category.addEventListener("click", function()
		{
			searchNews(navTopic);
		});
})

searchQuery.addEventListener("keydown", function(keyId)
{
	if(keyId.code == "Enter")
	{
		searchQueryValue = document.getElementById("searchTerm").value;
		searchNews(searchQueryValue);
	}
});


function searchNews(topic)
{
	fetch("https://newsapi.org/v2/everything?language=en&q="+topic+"&from="+year+"-"+month+"-"+day+"&sortBy=publishedAt&apiKey="+apiKey)
		.then(data => data.json())
		.then(response => 
		{
			let articles = response.articles;
			console.log(response);
			let wrapper = document.getElementById("wrapper");
			wrapper.innerHTML = "";
			let zValue = 0;
			articles.forEach(article => 
			{
				if (article.length > 0) 
				{
  				article.first().css({ 'z-index' : zValue });
 				}
 				
				let articleArea = document.createElement("article");
				articleArea.classList.add("articleArea");

				let title = document.createElement("h2");
				title.classList.add("articleTitle");
				title.innerHTML = article.title;
				articleArea.appendChild(title);

				let content = document.createElement("p");
				content.classList.add("articleContent");
				content.innerHTML = article.content;
				articleArea.appendChild(content);

				if(article.urlToImage != null)
				{
				let image = document.createElement("img");
				image.src = article.urlToImage;
				image.classList.add("articleImage");
				articleArea.appendChild(image);
				}
				wrapper.appendChild(articleArea);
				zValue++;
			})

		})
}
