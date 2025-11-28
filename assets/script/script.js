let contacts = JSON.parse(localStorage.getItem("contacts")) || [
  {
    id: 1,
    fullname: "Maulidia Nur Sahilah",
    phone: "6285890384386",
    email: "maulidia.nur.sahilah0410@gmail.com",
    location: "Jakarta",
    notes: "My Self 💗"
  },
  {
    id: 2,
    fullname: "Reza Pradana",
    phone: "62",
    email: "rezapradana@gmail.com",
    location: "Jakarta",
    notes: "family ✨"
  },
];

function saveToLocal() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  
  const tableBody = $("contactTable");  
  const cardGrid = $("cardGrid");      

  let editId = null;
  let deleteId = null;

  function renderContacts() {
    tableBody.innerHTML = "";
    cardGrid.innerHTML = "";

    if (contacts.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-6 text-center italic text-pink-400">
            No contacts yet — add something cute! 💕
          </td>
        </tr>
      `;
    }

    contacts.forEach((c) => {
      tableBody.innerHTML += `
        <tr class="fade">
          <td class="p-3 text-center"><input type="checkbox"></td>
          <td class="p-3">${c.fullname}</td>
          <td class="p-3">${c.phone}</td>
          <td class="p-3">${c.email}</td>
          <td class="p-3">${c.location}</td>
          <td class="p-3">${c.notes || "-"}</td>
        </tr>
      `;

      cardGrid.innerHTML += `
        <div class="bg-pink-50 border-2 border-pink-200 rounded-3xl p-6 shadow text-center fade soft-pop relative">
          <h3 class="font-bold text-lg text-pink-600">${c.fullname}</h3>
          <p class="text-sm text-gray-600">${c.phone}</p>
          <p class="text-sm text-gray-600">${c.email}</p>
          <p class="text-sm text-gray-600">${c.location}</p>
          <p class="text-xs text-gray-500 italic">${c.notes || ""}</p>

          <div class="flex justify-center space-x-3 mt-4">
            <button class="px-4 py-1 bg-yellow-300 rounded-xl btnEdit" data-id="${c.id}">✏️</button>
            <button class="px-4 py-1 bg-red-300 text-white rounded-xl btnDelete" data-id="${c.id}">🗑️</button>
          </div>
        </div>
      `;
    });

    attachEvents();
  }

  renderContacts();

  function openModal(id) {
    $(id).classList.add("active");
  }

  function closeModal(id) {
    $(id).classList.remove("active");
  }

  $("btnAdd").onclick = () => openModal("addModal");

  $("saveAdd").onclick = () => {
    const name = $("addName").value.trim();
    const phone = $("addPhone").value.trim();
    const email = $("addEmail").value.trim();
    const location = $("addLocation").value.trim();
    const notes = $("addNotes").value.trim();

    if (!name) return alert("Name cannot be empty!");

    contacts.push({
      id: Date.now(),
      fullname: name,
      phone,
      email,
      location,
      notes,
    });

    saveToLocal();
    renderContacts();
    closeModal("addModal");

    $("addName").value =
      $("addPhone").value =
      $("addEmail").value =
      $("addLocation").value =
      $("addNotes").value =
        "";
  };

  function attachEvents() {
    document.querySelectorAll(".btnEdit").forEach((btn) => {
      btn.onclick = (e) => {
        editId = Number(btn.dataset.id);

        const c = contacts.find((x) => x.id === editId);

        $("editName").value = c.fullname;
        $("editPhone").value = c.phone;
        $("editEmail").value = c.email;
        $("editLocation").value = c.location;
        $("editNotes").value = c.notes;

        openModal("editModal");
      };
    });

    document.querySelectorAll(".btnDelete").forEach((btn) => {
      btn.onclick = (e) => {
        deleteId = Number(btn.dataset.id);
        openModal("deleteModal");
      };
    });
  }

  $("saveEdit").onclick = () => {
    const c = contacts.find((x) => x.id === editId);

    c.fullname = $("editName").value;
    c.phone = $("editPhone").value;
    c.email = $("editEmail").value;
    c.location = $("editLocation").value;
    c.notes = $("editNotes").value;

    saveToLocal();
    renderContacts();
    closeModal("editModal");
  };

  $("confirmDelete").onclick = () => {
    contacts = contacts.filter((c) => c.id !== deleteId);
    saveToLocal();
    renderContacts();
    closeModal("deleteModal");
  };

  $("searchInput").addEventListener("input", () => {
    const keyword = $("searchInput").value.toLowerCase();

    document.querySelectorAll("#cardGrid > div").forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(keyword) ? "block" : "none";
    });
  });

});  