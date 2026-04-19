//HTML variables
let page1 = document.getElementById("page1");
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
let mainpage = document.getElementById("mainpage");
let output = document.getElementById("output");

mainpage.style.display = "none";
page2.style.display = "none";
page3.style.display = "none";
//Button Event Listener
document.getElementById("existing_user").onclick = existing_user;
document.getElementById("new_user").onclick = new_user;
document.getElementById("new_pass_button").onclick = add_new_pass;
document.getElementById("remove_pass_button").onclick = remove_pass;
document.getElementById("remove_lastpass_button").onclick = remove_lastpass;
document.getElementById("pass_search_button").onclick = search_pass;
document.getElementById("empty_list_button").onclick = empty_list;

function existing_user() {
  page1.style.display = "none";
  page2.style.display = "block";

  document.getElementById("log_in").onclick = login;

  function login() {
    page1.style.display = "none";
    page2.style.display = "block";
    let userIn = document.getElementById("existing_username").value;
    let passIn = document.getElementById("existing_pass").value;

    // 1. Fetch the list from localStorage
    let allUsers =
      JSON.parse(localStorage.getItem("all_registered_users")) || [];

    // 2. Use find() to look for a user object with a matching username
    let founduser = allUsers.find((u) => u.user_name === userIn);

    //3.Logical if statements
    if (!founduser) {
      alert("Username not found. Please sign up!");
    } else if (founduser.pass !== passIn) {
      alert("Incorrect Password!");
    } else {
      alert("Login Successful!");
      localStorage.setItem("currentUser", founduser.user_name);
      page2.style.display = "none";
      mainpage.style.display = "block";
      showall();
    }
  }
}

function new_user() {
  page3.style.display = "block";
  page1.style.display = "none";
  let input = document.getElementById("new_pass");
  input.addEventListener("input", function () {
    let password = input.value;
    console.log(password.length);
    pass_strength(password.length);
  });

  document.getElementById("sign_up").addEventListener("click", data_storing);
  function data_storing() {
    let user = document.getElementById("new_username").value;
    let password = document.getElementById("new_pass").value;
    let confirm_pass = document.getElementById("conf_pass").value;
    if (password != confirm_pass) {
      alert(`Password and confirm password does not match!`);
    } else if (user == "" || password == "" || confirm_pass == "") {
      alert("Fill out all fields");
    } else {
      alert("Sign Up succesful");

      page3.style.display = "none";
      mainpage.style.display = "block";

      // 1. GET the existing list of all users
      let allUsers =
        JSON.parse(localStorage.getItem("all_registered_users")) || [];

      // 2. Create the new user object
      let user_details = {
        user_name: user,
        pass: password,
        data: [],
      };
      // 3. ADD the new user to the list
      allUsers.push(user_details);

      // 4. SAVE the whole list back to storage
      localStorage.setItem("all_registered_users", JSON.stringify(allUsers));

      // Keep track of who is currently logged in so the "Add Password" function knows where to save
      localStorage.setItem("currentUser", user);
      showall();
    }
  }
}

function pass_strength(pass_length) {
  if (pass_length >= 13) {
    document.getElementById("pass_strength_password").innerHTML = "Very stong";
    document.getElementById("pass_strength_password").style.color =
      "ForestGreen";
    document.getElementById("new_pass").style.borderColor = "gDFHGHHHHHJHreen";
  } else if (pass_length >= 9 && pass_length <= 12) {
    document.getElementById("pass_strength_password").innerHTML = "Strong";
    document.getElementById("pass_strength_password").style.color =
      "DarkOliveGreen";
    document.getElementById("new_pass").style.borderColor = "lime";
  } else if (pass_length >= 5 && pass_length <= 8) {
    document.getElementById("pass_strength_password").innerHTML = "Okay";
    document.getElementById("pass_strength_password").style.color =
      "DarkOrange";
    document.getElementById("new_pass").style.borderColor = "orange";
  } else if (pass_length < 5) {
    document.getElementById("pass_strength_password").innerHTML = "Weak";
    document.getElementById("pass_strength_password").style.color = "red";
    document.getElementById("new_pass").style.borderColor = "red";
  }
}

function showall() {
  output.innerHTML = "";
  // 2. Get the current user's name and the whole list
  let currentUserName = localStorage.getItem("currentUser");
  let allUsers = JSON.parse(localStorage.getItem("all_registered_users")) || [];

  // 3. Find this specific user in the list
  let foundUser = allUsers.find((u) => u.user_name === currentUserName);

  // 4. Use your loop logic (using foundUser.data)
  if (foundUser && foundUser.data) {
    console.log(foundUser.data);
    let data = foundUser.data; // This is the array to loop through
    for (let i = 0; i < data.length; i++) {
      output.innerHTML += `<p>${i + 1}) ${data[i]}</p>`;
    }
  }
}

function add_new_pass() {
  let name = prompt("Enter the name for password:");
  let pass = prompt("Enter password:");
  let set = `${name}-${pass}`;

  let currentUserName = localStorage.getItem("currentUser");

  // Fetch all users
  let users = JSON.parse(localStorage.getItem("all_registered_users"));

  // Find the specific user we just created/logged in as
  let userIndex = users.findIndex((u) => u.user_name === currentUserName);

  if (userIndex !== -1) {
    // Add the password to THAT user's data array
    users[userIndex].data.push(set);

    // Save the updated master list back to localStorage
    localStorage.setItem("all_registered_users", JSON.stringify(users));
    console.log("Password saved for " + currentUserName);
    showall();
  }
}

function remove_pass() {
  let position = prompt("Enter the position you want to remove password from:");
  let index = position - 1;
  let currentUserName = localStorage.getItem("currentUser");

  // Fetch all users
  let users = JSON.parse(localStorage.getItem("all_registered_users"));

  // Find the specific user we just created/logged in as
  let userIndex = users.findIndex((u) => u.user_name === currentUserName);

  if (userIndex !== -1) {
    // Add the password to THAT user's data array
    users[userIndex].data.splice(index, 1);

    // Save the updated master list back to localStorage
    localStorage.setItem("all_registered_users", JSON.stringify(users));
    console.log(
      `Password at position:${index} is removed from ` + currentUserName
    );
    showall();
  }
}

function remove_lastpass() {
  let currentUserName = localStorage.getItem("currentUser");
  // Fetch all users
  let users = JSON.parse(localStorage.getItem("all_registered_users"));

  // Find the specific user we just created/logged in as
  let userIndex = users.findIndex((u) => u.user_name === currentUserName);

  if (userIndex !== -1) {
    // Add the password to THAT user's data array
    users[userIndex].data.pop();

    // Save the updated master list back to localStorage
    localStorage.setItem("all_registered_users", JSON.stringify(users));
    console.log(`Last Password is removed from ` + currentUserName);
    showall();
  }
}

function search_pass() {
  let input = document.getElementById("search_bar").value.toLowerCase();
  let currentUserName = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("all_registered_users"));

  // 1. Safety Check: Ensure users and currentUserName actually exist
  if (!users || !currentUserName) {
    console.error("No user data found in storage.");
    return;
  }

  // 2. Find the user
  let user = users.find((u) => u.user_name === currentUserName);

  //if (user && user.data) {
  // 3. Filter using includes() for partial matching and lowercase for consistency
  let filtered_data = user.data.filter((item) =>
    item.name?.toLowerCase().includes(input)
  );

  console.log("Search Results:", filtered_data);

  // Logic to update your UI with filtered_data would go here
  //} else {
  // console.warn("User or user data not found.");
  //}
}

function empty_list() {
  let permission = prompt(
    `WARNING: data will be deleted permently. Do you still want to empty list? (yes/no)`
  );

  if (permission == "yes") {
    let currentUserName = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("all_registered_users"));
    let userIndex = users.findIndex((u) => u.user_name === currentUserName);
    //let data = users[userIndex].data;
    // user.data = [];
    for (i = 0; i <= users[userIndex].data.length; i++) {
      users[userIndex].data.pop(i);
    }
    //let current_data = user.data;
    //current_data = [];
    //output.innerHTML = "";
    //console.log(current_data);
    console.log(users[userIndex].data);
    showall();
  }
}
