document.addEventListener('DOMContentLoaded', function() {
    fetchContacts();
    document.getElementById("refresh").addEventListener('click', fetchContacts);
    document.getElementById("addContact").addEventListener('click', addContact);

    function fetchContacts() {
        fetch(rootPath + "controller/get-contacts/")
            .then(response => response.json())
            .then(data => displayOutput(data));
    }

    function displayOutput(data) {
        let output = "<table>";
        for (let a in data) {
            output += `
<tr onclick="window.open('edit-contact.html?id=${data[a].id}', '_self')">
<td><img src="${rootPath}controller/uploads/${data[a].avatar}" width="40"/></td>
<td><h5>${data[a].firstname}</h5></td>
<td><h5>${data[a].lastname}</h5></td>
</tr>
`;
        }
        output += "</table>";
        document.getElementById("table").innerHTML = output;
    }

    function addContact() {
        window.open("add-contact.html", "_self");
    }
});