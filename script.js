function maskPassword(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
        showCustomAlert("Copied to clipboard!")
    },
    () => {
      /* clipboard write failed */
      showCustomAlert("Clipboard copying failed");
    }
  );
}

const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showCustomAlert(`Successfully deleted ${website}'s password`);
  showPasswords();
};

// Logic to fill the table
const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No Data To Show";
  } else {
    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr> `;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
    <td>${element.website} <img onclick="copyText('${
        element.website
      }')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${element.username} <img onclick="copyText('${
        element.username
      }')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${
        element.password
      }')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td><button class="btn-sm" onclick="deletePassword('${
      element.website
    }')">Delete</button></td>
        </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

console.log("Working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  if (website.value == "" || username.value == "" || password.value == "") {
    showCustomAlert("Fill all the datails");
  } else {
    e.preventDefault();
    console.log("Clicked....");
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);
    if (passwords == null) {
      let json = [];
      json.push({
        website: website.value,
        username: username.value,
        password: password.value,
      });
      showCustomAlert("Password Saved");
      localStorage.setItem("passwords", JSON.stringify(json));
    } else {
      let json = JSON.parse(localStorage.getItem("passwords"));
      json.push({
        website: website.value,
        username: username.value,
        password: password.value,
      });
      showCustomAlert("Password Saved");
      localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPasswords();
  }
});

function showCustomAlert(message) {
  const customAlert = document.getElementById("customAlert");
  customAlert.textContent = message;
  customAlert.style.display = "block";

  // Automatically hide after a few seconds (adjust the delay as needed)
  setTimeout(() => {
    customAlert.style.display = "none";
  }, 3000); // 3 seconds
}
