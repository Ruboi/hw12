// Fetch data
fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        // Render actor cards
        const actorCardsContainer = document.getElementById('actorCardsContainer');
        const cardUl = document.createElement('ul');
        cardUl.classList.add('actor-lists');
        actorCardsContainer.append(cardUl);
        data.forEach(actor => {
            cardUl.appendChild(createActorCard(actor));
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to create actor card element
function createActorCard(actor) {
    const card = document.createElement('li');
    card.classList.add('actor-card');

    const name = document.createElement('p');
    name.textContent = `${actor.firstName} ${actor.lastName}`;
    card.appendChild(name);

    if (actor.profilePicture) {
        const profilePic = document.createElement('img');
        profilePic.src = actor.profilePicture;
        profilePic.alt = `${actor.firstName} ${actor.lastName}`;
        profilePic.classList.add('actor-profile-pic');
        profilePic.addEventListener('error', () => {
            const initialsCircle = document.createElement('div');
            initialsCircle.classList.add('initials-circle');
            card.insertBefore(initialsCircle, name);
            initialsCircle.textContent = `${actor.firstName[0]}${actor.lastName[0]}`;

            profilePic.remove();
        });
        card.insertBefore(profilePic, name);
    } else {
        const initialsCircle = document.createElement('div');
        initialsCircle.classList.add('initials-circle');
        card.insertBefore(initialsCircle, name);
        initialsCircle.textContent = `${actor.firstName[0]}${actor.lastName[0]}`;
    }

    const contacts = actor.contacts;
    if (contacts) {
        const socialList = document.createElement('ul');
        socialList.classList.add('social-profiles');
        contacts.forEach(contact => {
            const listItem = document.createElement('li');
            const linkElement = document.createElement('a');
            linkElement.href = contact;
            linkElement.title = contact;
            const platform = contact.split('.')[1];
            linkElement.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
            listItem.appendChild(linkElement);
            socialList.appendChild(listItem);
        });
        card.appendChild(socialList);
    }

    card.addEventListener('click', () => {
        addSelectedActor(`${actor.firstName} ${actor.lastName}`);
    });

    return card;
}

function addSelectedActor(actorName) {
    const selectedList = document.getElementById('selectedActors');
    const selectedActors = selectedList.querySelectorAll('li');

    let actorAlreadySelected = false;
    selectedActors.forEach(selectedActor => {
        if (selectedActor.textContent === actorName) {
            actorAlreadySelected = true;
            selectedActor.remove();
        }
    });

    if (!actorAlreadySelected) {
        const listItem = document.createElement('li');
        listItem.textContent = actorName;
        selectedList.appendChild(listItem);
    }
}
