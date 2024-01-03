document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => {
            Dropdown(data.users);
        })
        .catch(error => {
            console.error('Error fetchingp data: ', error);
        });
});

function Dropdown(users) {
    const dropdown = document.getElementById('user-dropdown');

    users.forEach(user => {
        
        let option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.firstName;
        dropdown.appendChild(option);
    });
    dropdown.addEventListener('change', function() {
        const selectedId = this.value;
        DisplayUser(selectedId);
    });
}

function DisplayUser(selectedId) {
    fetch(`https://dummyjson.com/users/${selectedId}`)
        .then(res=> res.json())
        .then(data => {
            populateTable([data]); 
        })
        .catch(error => {
            console.error('Error fetching user data: ', error);
        });
}

function populateTable(users) {
    const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 

    users.forEach(user => {
        let row = tableBody.insertRow();
        
        let Id = row.insertCell(0);
        Id.textContent = user.id;

        let FirstName = row.insertCell(1);
        FirstName.textContent = user.firstName;

        let LastName = row.insertCell(2);
        LastName.textContent = user.lastName;

        let BirthDate = row.insertCell(3);
        BirthDate.textContent = user.birthDate;

        let Email = row.insertCell(4);
        Email.textContent = user.email;

        let PostalCode = row.insertCell(5);
        PostalCode.textContent = user.address ? user.address.postalCode : 'N/A';

        let Address = row.insertCell(6);
        if (user.address) {
            Address.textContent =`${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`;
        } else {
            Address.textContent = 'N/A';
        }
    });
}