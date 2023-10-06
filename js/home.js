export class Games {
    constructor() {

        this.mode = document.getElementById('mode');
        this.mode.addEventListener('click', this.changeMode.bind(this));
        this.getMode();

        this.searchParams = location.search;
        this.params = new URLSearchParams(this.searchParams);
        this.name = this.params.get('userName');

        this.userName = document.getElementById('userName');
        this.nameOfUser();

        this.links = document.querySelectorAll('.menu a');
        const that = this;
        this.links.forEach(function (link) {
            link.addEventListener('click', that.activeLink.bind(that, link));
        });

        this.logoutBtn = document.querySelector('.logout-btn');
        this.logoutBtn.addEventListener('click', this.goToIndex.bind(this));
        this.loading = document.querySelector('.loading');



        this.getGames('mmorpg');
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

    nameOfUser() {
        this.userName.innerHTML += this.name;
    }

    activeLink(temp) {
        this.links.forEach(function () {
            document.querySelector('.menu .active').classList.remove('active')
            temp.classList.add('active');
        });

        const category = temp.getAttribute('data-category');
        this.getGames(category)
    }

    async getGames(category) {
        this.loading.classList.remove('d-none');

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b7c6ff5720msh7cd532bc3074608p1edc64jsnb5276c40334e',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);

        const data = await api.json();
        // console.log(data);
        this.displayGames(data);
        this.loading.classList.add('d-none');

    }

    displayGames(gamesData) {

        let cartona = '';
        for (let i = 0; i < gamesData.length; i++) {
            // let videPath = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
            let videPath = gamesData[i].thumbnail.slice(0, gamesData[i].thumbnail.lastIndexOf("/")) + "/videoplayback.webm";

            cartona += `
            <div class="col-md-3">
               <div class="card h-100 bg-transparent" role="button" game-id=${gamesData[i].id}>
                  <div class="card-body">
                     <figure class="position-relative">
                        <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />
                        <video muted="true" preload="none" loop
                           class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                           <source src="${videPath}">
                        </video>
                     </figure>

                     <figcaption>

                        <div class="hstack justify-content-between">
                           <h3 class="h6 small">${gamesData[i].title}</h3>
                           <span class="badge text-bg-primary p-2">Free</span>
                        </div>

                        <p class="card-text small text-center opacity-50">
                           ${gamesData[i].short_description}
                        </p>

                     </figcaption>
                  </div>

                  <footer class="card-footer small hstack justify-content-between">

                     <span class="badge badge-color">${gamesData[i].genre}</span>
                     <span class="badge badge-color">${gamesData[i].platform}</span>

                  </footer>
               </div>
            </div>
                 `
        }

        document.getElementById('gameData').innerHTML = cartona;

        this.cards = document.querySelectorAll('.card');
        const that = this;

        this.cards.forEach(function (card) {
            card.addEventListener('click', that.showDetails.bind(that, card, that.name));
        });

        this.cards.forEach(function (card) {
            card.addEventListener('mouseenter', that.startVideo.bind(that, card));
        });

        this.cards.forEach(function (card) {
            card.addEventListener('mouseleave', that.endVideo.bind(that, card));
        });
    }

    showDetails(temp, name) {
        location.href = `./details.html?id=${temp.getAttribute('game-id')}&userName=${name}`;
    }

    startVideo(temp) {
        const videoElement = temp.querySelector('video');
        videoElement.classList.remove('d-none');
        videoElement.muted = true;
        videoElement.play();
    }

    endVideo(temp) {
        const videoElement = temp.querySelector('video');
        videoElement.classList.add('d-none');
        videoElement.muted = true;
        videoElement.pause();
    }

    goToIndex() {
        localStorage.removeItem('uToken');
        location.href = './index.html';
    }
}


let gemes = new Games();

