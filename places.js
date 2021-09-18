window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [

       {
           name: 'Welcome to our app',
           logo: 's.png',
           location: {
               lat: 44.83718,
               lng: 20.38938,
           }
        
       },
       {
        name: 'Welcome to our app',
        logo: 's.png',
        location: {
            lat: 44.83692,
            lng: 20.38892,
        }
     
    },
       {
        name: 'Welcome to our app',
        logo: 's2.png',
        location: {
            lat: 44.83594,
            lng: 20.38905,
        }
     
    },
    {
        name: 'Welcome to our app',
        logo: 's2.png',
        location: {
            lat: 44.83683,
            lng: 20.38889,
        }
     
    },
       {
        name: 'Welcome to our app',
        logo: 's.png',
        location: {
            lat: 44.054821,
            lng: 20.487535,
        }
    },
    {
        name: 'Welcome to our app',
        logo: 's.png',
        location: {
            lat: 44.05456,
            lng: 20.48728,
        }
     
    },
    {
        name: 'Welcome to our app',
        logo: 's2.png',
        location: {
            lat: 44.05500,
            lng: 44.05500,
        }
     
    },
   
    
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let name2 = place.name;
       let logo = place.logo;
       

       const model = document.createElement('a-image');
                   model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                   model.setAttribute('name', name2);
                   model.setAttribute('src', logo);
                   model.setAttribute('width', '1'); 
                   model.setAttribute('height', '1'); 
                   model.setAttribute('look-at', '[gps-camera]');





                   // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                   model.setAttribute('scale', '20, 20');

                   

    

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });
       
       const clickListener = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        const name = ev.target.getAttribute('name');
        
        const el = ev.detail.intersection && ev.detail.intersection.object.el;

        //const distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');


        if (el && el === ev.target) {

    
            const label = document.createElement('span');
            const msg = document.createElement('p');
            const container = document.createElement('div');
            const btn = document.createElement('button');
           // const btn1 = document.createElement('button');
            container.setAttribute('id', 'place-label');
            label.innerText = name;
           // msg.innerText = distanceMsg;
            btn.innerText = 'Close';
           // btn1.innerText = 'Play';
            container.appendChild(label);
            container.appendChild(msg);
            container.appendChild(btn);
            //container.appendChild(btn1);
            document.body.appendChild(container);

           // btn1.addEventListener("click", function() {
             //   let play = new SpeechSynthesisUtterance();
              // play.text = name;
              // window.speechSynthesis.speak(play);
              //});

            btn.addEventListener("click", function() {
                container.parentElement.removeChild(container);
              });

           // setTimeout(() => {
             //   container.parentElement.removeChild(container);
            //}, 1500);
        }
    };

    model.addEventListener('click', clickListener);
       scene.appendChild(model);
   });
}