function increaseStock(obat) {
  const stockSpan = document.getElementById(`${obat}-stock`);
  const currentStock = parseInt(stockSpan.textContent);
  stockSpan.textContent = currentStock + 1;
}

function decreaseStock(obat) {
  const stockSpan = document.getElementById(`${obat}-stock`);
  const currentStock = parseInt(stockSpan.textContent);
  if (currentStock > 0) {
    stockSpan.textContent = currentStock - 1;
  } else {
    window.alert("Stock gak bisa negatif! Hapus aja boss!");
  }
}

// Create a table element

let medicines = [
  {
    name: "Paracetamol",
    category: "Analgesik",
    harga: "Rp. 3000",
    stock: 100,
  },
  {
    name: "Amoxicillin",
    category: "Sakit Kepala",
    harga: "Rp. 2500",
    stock: 50,
  },
  {
    name: "Kaptopril",
    category: "Antihipertensi",
    harga: "Rp. 2500",
    stock: 50,
  },
];
// Loop to create rows

function loadTableMedicines() {
  for (let i = 0; i < medicines.length; i++) {
    let row = document.createElement("tr");
    row.setAttribute("id", `${medicines[i].name}`);

    row.innerHTML = `
      <td>${medicines[i].name}</td>
      <td class="kategori-obat">${medicines[i].category}</td>
      <td><span id="${medicines[i].name.toLowerCase()}-stock">${medicines[i].stock}</span></td>
      <td class="harga obat">${medicines[i].harga}</td>
      <td class="buttonPlusMinus">
        <button onclick="decreaseStock('${medicines[i].name.toLowerCase()}')">-</button>
        <button onclick="increaseStock('${medicines[i].name.toLowerCase()}')">+</button>
      </td>
      <td id="${medicines[i].name}-delete">
        <button  class="delete-button" onClick="deleteItem('${medicines[i].name}')"><p>Hapus</p></button>
      </td>
    `;
    // Append row to table
    document.getElementById("tableContainer").appendChild(row);
  }
}
loadTableMedicines();

function tambahItem() {
  const newMedicine = {
    name: document.getElementById("item-name").value,
    category: document.getElementById("category").value,
    harga: `Rp. ${document.getElementById("price").value}`,
    stock: document.getElementById("item-stock").value,
  };

  if (!document.getElementById("item-name").value || document.getElementById("item-name").value.trim().length === 0) {
    window.alert("Nama obatnya masih kosong bos :)");
    return;
  }

  if (!document.getElementById("category").value || document.getElementById("category").value.trim().length === 0) {
    window.alert("Kategorinya lupa kah manis?");
    return;
  }

  if (
    !document.getElementById("price").value ||
    document.getElementById("price").value.trim().length === 0 ||
    document.getElementById("price").value < 1
  ) {
    playSound();
    return;
  }

  if (!document.getElementById("item-stock").value || document.getElementById("item-stock").value.trim().length === 0) {
    window.alert("Stocknya ga bisa kosong ya kak");
    return;
  }

  if (!itemValidation(newMedicine)) {
    return;
  }
  medicines.push(newMedicine);

  let row = document.createElement("tr");
  row.setAttribute("id", `${newMedicine.name}`);

  row.innerHTML = `
      <td>${newMedicine.name}</td>
      <td class="kategori-obat">${newMedicine.category}</td>
      <td><span id="${newMedicine.name.toLowerCase()}-stock">${newMedicine.stock}</span></td>
      <td class="harga obat">${newMedicine.harga}</td>
      <td class="buttonPlusMinus">
        <button onclick="decreaseStock('${newMedicine.name.toLowerCase()}')">-</button>
        <button onclick="increaseStock('${newMedicine.name.toLowerCase()}')">+</button>
      </td>
      <td id="${newMedicine.name}-delete">
        <button class="delete-button" onClick="deleteItem('${newMedicine.name}')"><p>Hapus</p></button>
      </td>
    `;
  document.getElementById("tableContainer").appendChild(row);
}

function itemValidation(newMedicine) {
  console.log(medicines);
  for (let i = 0; i < medicines.length; i++) {
    if (medicines[i] && newMedicine.name.toLowerCase() === medicines[i].name.toLocaleLowerCase()) {
      window.alert("Obat sudah ada di dalam daftar stock!");
      return false;
    }
  }
  return true;
}

function deleteItem(medicine) {
  const tableContainer = document.getElementById("tableContainer");
  const tableChild = document.getElementById(`${medicine}`);
  tableContainer.removeChild(tableChild);
  medicines = medicines.map((el) => {
    if (el && el.name !== medicine) {
      return el;
    }
  });
  console.log(medicine);
}

var audio = document.getElementById("myAudio");

function playSound() {
  audio.play();
  setTimeout(function () {
    window.alert("Gak ada harga? Rugi dongg!!!");
  }, 500);
}
