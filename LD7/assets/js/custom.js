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

    let form = button.parentElement.parentElement;
	let output = document.createElement("div")
	let sum = 0;
	Object.keys(duomenys).forEach((key) => {
		if (key.startsWith("val")) {
			sum += +duomenys[key]
			if(key == "val3") {
				let p = document.createElement("p");
				p.textContent = "vidurkis" + " : " + sum/3;
				form.appendChild(p);
				
			}
		} else {
			let p = document.createElement("p");
			p.textContent = key + " : " + duomenys[key];
			form.appendChild(p);
		}
	});
	form.appendChild(output)
	console.log()

  });
