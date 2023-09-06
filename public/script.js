document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display the user list
    function fetchUserList() {
        // Make an API request to /adduser or your endpoint URL
        fetch("/adduser")
            .then((response) => response.json())
            .then((data) => {
                // Get the userList ul element
                const userList = document.getElementById("userList");

                // Clear any existing list items
                userList.innerHTML = "";

                // Iterate through the user data and create list items
                data.forEach((user) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = user.name; // Assuming user data has a 'name' property

                    // Create a button to delete the user
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener("click", () => deleteUser(user._id)); // Use user._id
                    listItem.appendChild(deleteButton);

                    // Create a button to edit the user
                    const editButton = document.createElement("button");
                    editButton.textContent = "Edit";
                    editButton.addEventListener("click", () => editUser(user._id)); // Use user._id
                    listItem.appendChild(editButton);

                    userList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Error fetching user list:", error);
            });
    }

    // Function to edit a user by ID
    function editUser(userId) {
        // Make an API request to GET /updateuser/:userId to retrieve user data for editing
        fetch(`/updateuser/${userId}`)
            .then((response) => response.json())
            .then((user) => {
                // Assuming you have a form with fields for editing user data
                // Populate the form with the user data
                document.getElementById("nameInput").value = user.name;
                document.getElementById("emailInput").value = user.email;
                document.getElementById("phnumberInput").value = user.phnumber;
                document.getElementById("passwordInput").value = user.password;

                // Add a submit button with an event listener to update the user
                const submitButton = document.createElement("button");
                submitButton.textContent = "Update User";
                submitButton.addEventListener("click", () => updateUser(userId)); // Use user._id
                document.getElementById("updateForm").appendChild(submitButton);
            })
            .catch((error) => {
                console.error("Error fetching user data for editing:", error);
            });
    }

    // Function to update a user by ID
    function updateUser(userId) {
        // Extract updated user data from the form
        const updatedUser = {
            name: document.getElementById("nameInput").value,
            email: document.getElementById("emailInput").value,
            phnumber: document.getElementById("phnumberInput").value,
            password: document.getElementById("passwordInput").value,
        };

        // Make an API request to PUT /updateuser/:userId to update the user
        fetch(`/updateuser/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => {
                if (response.ok) {
                    // Reload the user list after successful update
                    fetchUserList();
                } else {
                    console.error("Error updating user:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    }

    // Function to delete a user by ID
    function deleteUser(userId) {
        // Make an API request to DELETE /adduser/:id
        fetch(`/adduser/${userId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    // Reload the user list after successful deletion
                    fetchUserList();
                } else {
                    console.error("Error deleting user:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }

    // Call the fetchUserList function to initially load the user list
    fetchUserList();
});
