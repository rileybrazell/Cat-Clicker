
$(function(){
    // Hold data for cats
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
            view_admin.init();
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

        getCatInfo: function() {
            var name = model.currentCat.name;
            var source = model.currentCat.imgSrc;
            var count = model.current.Cat.clickCount;

            return name, source, count;
        },

        // Accepts input from form elements, sets the current cat's
        // information to the information from form
        setCatInfo: function(name, source, count) {
            this.name = name;
            this.source = source;
            this.count = count;

            model.currentCat.name = name;
            model.currentCat.imgSrc = source;
            if (isNaN(count) != true){
                model.currentCat.clickCount = count;
            }
            else{
                console.log('Count is not a number!');
            }

            view_list.render();
            view_panel.render();
            view_admin.render();

            this.togglePanel();
        },

        togglePanel: function() {
            var infoForm = document.getElementById('info-form');
            var adminButton = document.getElementById('button-admin');

            if (infoForm.style.display == 'none'){
                adminButton.style.display = 'none';
                infoForm.style.display = 'inline-block';
            }
            else if (infoForm.style.display == 'inline-block'){
                adminButton.style.display = 'inline-block';
                infoForm.style.display = 'none';
            }
        }
    };


    var view_list = {
        init: function() {
            this.catListElem = document.getElementById('cat-list');

            this.render();
        },

        render: function() {
            var cats = octopus.getAllCats();

            this.catListElem.innerHTML = '';

            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var elem = document.createElement('li');
                elem.textContent = cat.name;
                elem.className += 'cat-list-item';

                elem.addEventListener( 'click', ( function(cat){
                    return function() {
                        octopus.setCurrentCat(cat);
                        view_panel.render();
                        view_admin.render();
                        octopus.togglePanel();
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

    var view_admin = {
        init: function() {
            var infoForm = document.getElementById('info-form');
            var adminButton = document.getElementById('button-admin');
            
            infoForm.style.display = 'none';
            adminButton.style.display = 'inline-block';

            adminButton.addEventListener('click', function(e){
                octopus.togglePanel();
            });

            var cancelButton = document.getElementById('button-cancel');
            var submitButton = document.getElementById('button-submit');

            cancelButton.addEventListener('click', function(e){
                octopus.togglePanel();
            });

            submitButton.addEventListener('click', function(e){
                var name = document.getElementById('input-name').value;
                var source = document.getElementById('input-image').value;
                var count = document.getElementById('input-count').value;

                octopus.setCatInfo(name, source, count);
            });

            this.render();
        },

        render: function() {
            var currentCat = octopus.getCurrentCat();

            var inputName = document.getElementById('input-name');
            var inputImage = document.getElementById('input-image');
            var inputCount = document.getElementById('input-count');

            inputName.value = currentCat.name;
            inputImage.value = currentCat.imgSrc;
            inputCount.value = currentCat.clickCount;
        }
    };

    octopus.init();
});