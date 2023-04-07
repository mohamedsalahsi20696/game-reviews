export class Details {
    constructor() {

        this.mode = document.getElementById('mode');
        this.mode.addEventListener('click', this.changeMode.bind(this));
        this.getMode();

        this.searchParams = location.search;
        this.params = new URLSearchParams(this.searchParams);
        this.gameId = this.params.get('id');
        this.name = this.params.get('userName');

        this.detailsData = document.getElementById('detailsData');

        this.loading = document.querySelector('.loading');

        this.getDetails();
    }

    getMode() {
        if (localStorage.getItem("theme") != null) {
            const theme = localStorage.getItem("theme");

            if (theme === "light") {
                this.mode.classList.replace("fa-sun", "fa-moon");
            } else {
                this.mode.classList.replace("fa-moon", "fa-sun");
            }

            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    changeMode() {

        // documentElement ==> كله html كده انا ماسك الاب الى هو ال 
        if (this.mode.classList.contains('fa-sun')) {
            document.documentElement.setAttribute('data-theme', 'light');
            this.mode.classList.replace('fa-sun', 'fa-moon')
            localStorage.setItem("theme", "light");
        }
        else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.mode.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem("theme", "dark");
        }
    }

    async getDetails() {
        this.loading.classList.remove('d-none');

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b7c6ff5720msh7cd532bc3074608p1edc64jsnb5276c40334e',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.gameId}`, options);

        const data = await api.json();
        this.displayDetails(data);
        this.loading.classList.add('d-none');
    }

    displayDetails(detailsData) {
        const cartona = `
        <div class="col-md-4">
               <figure>
                  <img src="${detailsData.thumbnail}" class="w-100" alt="details image" />
               </figure>
            </div>

            <div class="col-md-8">
               <div>
                  <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                        <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                        <li class="breadcrumb-item text-info" aria-current="page">${detailsData.title}</li>
                     </ol>
                  </nav>

                  <h1>Title: ${detailsData.title}</h1>
                  <p>Category: <span class="badge text-bg-info"> ${detailsData.genre}</span> </p>
                  <p>Platform: <span class="badge text-bg-info"> ${detailsData.platform}</span> </p>
                  <p>Status: <span class="badge text-bg-info"> ${detailsData.status} </p>
                  <p class="small">${detailsData.description}</p>
                  <a class="btn btn-outline-warning" target="_blank" href="${detailsData.game_url}">Show Game</a>

               </div>
            </div>`;

        this.detailsData.innerHTML = cartona;

        const backgroundImage = detailsData.thumbnail.replace('thumbnail', 'background');


        document.body.style.cssText = `
        background-image:url(${backgroundImage});
        background-position: center center;
        background-size: cover;`;
    }

}


let details = new Details();


