// ===== Elementai =====
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("formSubmitBtn");
const clearBtn = document.getElementById("formClearBtn");
const resultBox = document.getElementById("formResult");

// ===== Validacija =====
const lettersRe = /^\p{L}+$/u;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^\+370 6\d{2} \d{5}$/;

const ratingValidator = (v) => {
  if (!v) return "Vertinimas yra privalomas";
  if (!/^\d+$/.test(v) || +v < 1 || +v > 10) {
    return "Vertinimas turi būti sveikas skaičius nuo 1 iki 10";
  }
  return "";
};

// Kiekvienas validatorius grąžina klaidos tekstą arba "" jei viskas gerai
const validators = {
  formName: (v) =>
    !v ? "Vardas yra privalomas" : !lettersRe.test(v) ? "Vardą gali sudaryti tik raidės" : "",
  formSurname: (v) =>
    !v ? "Pavardė yra privaloma" : !lettersRe.test(v) ? "Pavardę gali sudaryti tik raidės" : "",
  formEmail: (v) =>
    !v ? "El. paštas yra privalomas" : !emailRe.test(v) ? "Neteisingas el. pašto formatas" : "",
  formPhone: (v) =>
    !v ? "Telefono numeris yra privalomas" : !phoneRe.test(v) ? "Numeris turi atitikti formatą +370 6xx xxxxx" : "",
  formAdress: (v) => (!v ? "Adresas yra privalomas" : ""),
  vertinimas1: ratingValidator,
  vertinimas2: ratingValidator,
  vertinimas3: ratingValidator,
};

const fields = Object.keys(validators).map((id) => document.getElementById(id));

// Patikrina lauką ir parodo / paslepia klaidą
function validateField(input) {
  const error = validators[input.id](input.value.trim());
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  input.classList.toggle("is-invalid", error !== "");
  if (feedback) feedback.textContent = error;
  return error === "";
}

// Mygtukas aktyvus tik kai visi laukai užpildyti ir be klaidų (be klaidų rodymo)
function updateSubmitState() {
  const allValid = fields.every((f) => validators[f.id](f.value.trim()) === "");
  submitBtn.disabled = !allValid;
}

// ===== Telefono formatavimas: +370 6xx xxxxx =====
function formatPhone(raw) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("370")) digits = digits.slice(3); // +370 prefiksas pridedamas automatiškai
  digits = digits.slice(0, 8); // 6xx xxxxx = 8 skaitmenys
  if (digits === "") return "";
  let out = "+370 " + digits.slice(0, 3);
  if (digits.length > 3) out += " " + digits.slice(3);
  return out;
}

const phoneInput = document.getElementById("formPhone");
phoneInput.addEventListener("input", () => {
  phoneInput.value = formatPhone(phoneInput.value);
});

// ===== Realaus laiko validacija =====
fields.forEach((input) => {
  input.addEventListener("input", () => {
    validateField(input);
    updateSubmitState();
  });
  input.addEventListener("blur", () => {
    validateField(input);
    updateSubmitState();
  });
});

// ===== Siuntimas =====
let duomenys = {};

form.addEventListener("submit", function (event) {
  event.preventDefault(); // puslapis neperkraunamas

  // Papildoma apsauga, jei mygtukas kažkaip būtų paspaustas su klaidomis
  const allValid = fields.map(validateField).every(Boolean);
  if (!allValid) {
    updateSubmitState();
    return;
  }

  duomenys = {
    vardas: document.getElementById("formName").value.trim(),
    pavarde: document.getElementById("formSurname").value.trim(),
    email: document.getElementById("formEmail").value.trim(),
    telefonas: document.getElementById("formPhone").value.trim(),
    adresas: document.getElementById("formAdress").value.trim(),
    vertinimas1: Number(document.getElementById("vertinimas1").value),
    vertinimas2: Number(document.getElementById("vertinimas2").value),
    vertinimas3: Number(document.getElementById("vertinimas3").value),
  };

  console.log(duomenys);

  const vidurkis =
    (duomenys.vertinimas1 + duomenys.vertinimas2 + duomenys.vertinimas3) / 3;

  const eilutes = [
    "Vardas: " + duomenys.vardas,
    "Pavardė: " + duomenys.pavarde,
    "El. paštas: " + duomenys.email,
    "Tel. Numeris: " + duomenys.telefonas,
    "Adresas: " + duomenys.adresas,
    "Vertinimas 1: " + duomenys.vertinimas1,
    "Vertinimas 2: " + duomenys.vertinimas2,
    "Vertinimas 3: " + duomenys.vertinimas3,
    duomenys.vardas + " " + duomenys.pavarde + ": " + Number(vidurkis.toFixed(2)),
  ];

  resultBox.innerHTML = ""; // išvalome ankstesnį rezultatą
  eilutes.forEach((tekstas) => {
    const p = document.createElement("p");
    p.textContent = tekstas; // textContent – saugu nuo HTML injekcijos
    resultBox.appendChild(p);
  });
});

// ===== Išvalymas =====
clearBtn.addEventListener("click", function () {
  form.reset();
  duomenys = {};
  resultBox.innerHTML = "";
  fields.forEach((input) => {
    input.classList.remove("is-invalid");
    const feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = "";
  });
  updateSubmitState();
});

// Pradinė būsena
updateSubmitState();
