document.addEventListener('DOMContentLoaded', function() {
    const id = getId();

    document.getElementById("homeLink").addEventListener('click', homeLink);
    document.getElementById("editContact").addEventListener('click', editContact);
    document.getElementById("submitForm").addEventListener('click', submitForm);
    document.getElementById("deleteContact").addEventListener('click', deleteContact);

    getContact();

    function getId() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function getContact() {
        fetch(rootPath + 'controller/get-contacts/?id=' + id)
            .then(response => response.json())
            .then(data => displayOutput(data));
    }

    function displayOutput(data) {
        const contact = data[0];
        document.getElementById("avatarImage").innerHTML =
            `<img src="${rootPath}controller/uploads/${contact.avatar}" width="200"/>`;
        document.getElementById("firstname").value = contact.firstname;
        document.getElementById("lastname").value = contact.lastname;
        document.getElementById("mobile").value = contact.mobile;
        document.getElementById("email").value = contact.email;
    }

    function homeLink() {
        window.open("index.html", "_self");
    }

    function editContact() {
        document.getElementById("firstname").readOnly = false;
        document.getElementById("lastname").readOnly = false;
        document.getElementById("mobile").readOnly = false;
        document.getElementById("email").readOnly = false;
        document.getElementById("avatar").hidden = false;
        document.getElementById("avatarLabel").hidden = false;
        document.getElementById("submitForm").hidden = false;
    }

    function submitForm(e) {
        e.preventDefault();
        const form = new FormData(document.getElementById("editForm"));
        form.append('apiKey', apiKey);
        form.append('id', id);

        fetch(rootPath + 'controller/edit-contact/', {
            method: 'POST',
            headers: { 'Accept': 'application/json, *.*' },
            body: form
        })
        .then(response => response.text())
        .then(data => {
            if (data == "1") {
                alert("Contact edited.");
                homeLink();
            } else {
                alert(data);
            }
        });
    }

    function deleteContact() {
        if (confirm("Delete contact. Are you sure?")) {
            fetch(rootPath + 'controller/delete-contact/?id=' + id)
                .then(response => response.text())
                .then(data => {
                    if (data == "1") {
                        homeLink();
                    } else {
                        alert(data);
                    }
                });
        }
    }
});