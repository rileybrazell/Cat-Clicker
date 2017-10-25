
$(function(){
    var model = {
        currentCat: null,
        cats: [
            {
                clickCount: 0,
                name: 'Riley',
                imgSrc: 'img/riley.jpg'
            },
            {
                clickCount: 0,
                name: 'Georgie',
                imgSrc: 'img/georgie.jpg'
            },
            {
                clickCount: 0,
                name: 'Doug',
                imgSrc: 'img/doug.jpg'
            },
            {
                clickCount: 0,
                name: 'Cowboy Dave',
                imgSrc: 'img/cowboyDave.jpg'
            },
            {
                clickCount: 0,
                name: 'Ash',
                imgSrc: 'img/ash.jpg'
            }
        ]
    };


    var octopus = {
        init: function() {
            model.currentCat = model.cats[0];

            view_list.init();
            view_panel.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getAllCats: function() {
            return model.cats;
        },

        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        incrementCounter: function() {
            model.currentCat.clickCount++;
            view_panel.render();
        },
    };


    var view_list = {
        init: function() {
            this.catListElem = document.getElementById('cat-list');
            this.catInfoElem = document.getElementById('cat-info');

            this.render();
        },

        render: function() {
            var cats = octopus.getAllCats();

            this.catListElem.innerHTML = '';

            this.catInfoElem.innerHTML = '';

            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var elem = document.createElement('li');
                elem.textContent = cat.name;

                elem.addEventListener( 'click', ( function(cat){
                    return function() {
                        octopus.setCurrentCat(cat);
                        view_panel.render();
                    };
                })(cat));

                this.catListElem.appendChild(elem);
            }
        }
    };


    var view_panel = {
        init: function() {
            this.catPanel = document.getElementById('catPanel');
            this.catName = document.getElementById('cat-name');
            this.catImage = document.getElementById('cat-image');
            this.catCount = document.getElementById('cat-count');

            this.catImage.addEventListener('click', function(e){
                octopus.incrementCounter();
            });

            this.render();
        },

        render: function() {
            var currentCat = octopus.getCurrentCat();
            this.catName.textContent = currentCat.name;
            this.catImage.src = currentCat.imgSrc;
            this.catCount.textContent = currentCat.clickCount;
        }
    };

    octopus.init();
});