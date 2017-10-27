
$(function(){
    // Hold data for cats to be fetched by octopus
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

        // view_panel.render will refresh the pane with image to
        // show the incremented counter
        incrementCounter: function() {
            model.currentCat.clickCount++;
            view_panel.render();
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

            // Refreshes panes to show changes
            view_list.render();
            view_panel.render();
            view_admin.render();

            this.togglePanel();
        },

        // Will check the state of the admin panel, sets it to opposite
        // state (hidden/visible)
        togglePanel: function() {
            var infoForm = document.getElementById('info-form');
            var adminButton = document.getElementById('button-admin');

            // Checks state of admin button and data form
            // Toggles between shown and hidden when called 
            // ((not perfect, isn't really state aware but it works in  ))
            // ((this app bc it's only called by cancel button and after))
            // ((form submission                                        ))
            if (adminButton) {
                var display = adminButton.style.display;

                if (display == 'none') {
                    adminButton.style.display = 'inline-block';
                }
                else {
                    adminButton.style.display = 'none';
                }
            }

            if (infoForm) {
                var display = infoForm.style.display;

                if (display == 'none') {
                    infoForm.style.display = 'inline-block';
                }
                else {
                    infoForm.style.display = 'none';
                }
            }
        }
    };


    // Function for the pane containing list of cats
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

                // Clicking a cat's name from the list will grab that cat
                // from the model function, refresh the picture, name, and 
                // count, pre-fill the admin panel with that info, and toggle
                // the admin panel
                elem.addEventListener( 'click', ( function(cat){
                    return function() {
                        octopus.setCurrentCat(cat);
                        view_panel.render();
                        view_admin.render();
                    };
                })(cat));

                this.catListElem.appendChild(elem);
            }
        }
    };


    // Function for the pane with name, picture, and click count
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

        // Get current data from cat object
        render: function() {
            var currentCat = octopus.getCurrentCat();
            this.catName.textContent = currentCat.name;
            this.catImage.src = currentCat.imgSrc;
            this.catCount.textContent = currentCat.clickCount;
        }
    };


    // Function for the pane with admin access to change cat information
    var view_admin = {
        init: function() {
            var infoForm = document.getElementById('info-form');
            var adminButton = document.getElementById('button-admin');
            var cancelButton = document.getElementById('button-cancel');
            var submitButton = document.getElementById('button-submit');

            // Set the initial styling of the admin panel
            // (form hidden, button visible)
            // ((as far as i can tell this is necessary to change them))
            // ((with octopus functions                               ))
            infoForm.style.display = 'none';
            adminButton.style.display = 'inline-block';

            // Clicking admin button will show the form
            adminButton.addEventListener('click', function(e){
                octopus.togglePanel();
            });

            // clicking cancel button on form will hide form and show
            // admin button
            cancelButton.addEventListener('click', function(e){
                octopus.togglePanel();
            });

            // submit button will grab the current form content and pass
            // it up to octopus to change the 
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

            // pre-fill admin forms with current cat's data
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