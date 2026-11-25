 const button = document.getElementById("formSubmitBtn");

 let duomenys = {};

  button.addEventListener("click", function () {
    duomenys.name = document.getElementById("formName").value;
    duomenys.surname = document.getElementById("formSurname").value;
    duomenys.email = document.getElementById("formEmail").value;
    duomenys.phone = document.getElementById("formPhone").value;
    duomenys.address = document.getElementById("formAdress").value;
    duomenys.val1 = document.getElementById("vertinimas1").value;
    duomenys.val2 = document.getElementById("vertinimas2").value;
    duomenys.val3 = document.getElementById("vertinimas3").value;

    console.log(duomenys)

    form = button.parentElement.parentElement;
    for (let key of Object.keys(element)){
        console.log(key)
    }
    form.appendChild(result);
  });