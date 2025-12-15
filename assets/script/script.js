function openModal(id){ document.getElementById(id).classList.add("active"); }
    function closeModal(id){ document.getElementById(id).classList.remove("active"); }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [
      {
        id: 1,
        fullname: "Maulidia Nur Sahilah",
        phone: "085890384386",
        email: "maulidia.nur.sahilah0410@gmail.com",
        location: "Jakarta",
        notes: "me🌸",
      },
      {
        id: 2,
        fullname: "Reza Pradana",
        phone: "085894578640",
        email: "rezapradana07@gmail.com",
        location: "Jakarta",
        notes: "family✨",
      }
    ];

    let editId = null;
    let deleteId = null;

    function saveLocal() {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function renderTable() {
      const tbody = document.getElementById("contactTable");
      tbody.innerHTML = "";

      if (contacts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center p-6 text-pink-400 italic">No contacts yet 💕</td></tr>`;
        return;
      }

      contacts.forEach(c => {
        tbody.innerHTML += `
          <tr class="text-center border-b">
            <td>${c.id}</td>
            <td>${c.fullname}</td>
            <td>${c.phone}</td>
            <td>${c.email}</td>
            <td>${c.location}</td>
            <td>${c.notes || "-"}</td>
          </tr>
        `;
      });
    }

    function renderCards() {
      const card = document.getElementById("cardGrid");
      card.innerHTML = "";

      contacts.forEach(c => {
        card.innerHTML += `
        <div class="bg-pink-50 border-2 border-pink-200 rounded-3xl p-6 shadow text-center">
          <div class="w-20 h-20 bg-pink-200 rounded-full mx-auto mb-3"></div>
          <h3 class="font-bold text-lg text-pink-600">🌸 ${c.fullname}</h3>
          <p class="text-sm text-gray-600">📞 ${c.phone}</p>
          <p class="text-sm text-gray-600">✉ ${c.email}</p>
          <p class="text-sm text-gray-600">📍 ${c.location}</p>
        </div>`;
      });
    }

    function saveContact() {
      let newId = contacts.length > 0
      ? contacts[contacts.length - 1].id + 1
      : 1;

      let c = {
        id: newId,
        fullname: addName.value,
        phone: addPhone.value,
        email: addEmail.value,
        location: addLocation.value,
        notes: addNotes.value
      };

      contacts.push(c);
      saveLocal();

      renderTable();
      renderCards();

      closeModal('addModal');
      addName.value = addPhone.value = addEmail.value = addLocation.value = addNotes.value = "";
    }

    function loadEdit() {
      editId = parseInt(document.getElementById("editSelect").value);
      let c = contacts.find(x => x.id === editId);

      editName.value = c.fullname;
      editPhone.value = c.phone;
      editEmail.value = c.email;
      editLocation.value = c.location;
      editNotes.value = c.notes;

      closeModal("editChoiceModal");
      openModal("editModal");
    }

    function updateContact() {
      let c = contacts.find(x => x.id === editId);

      c.fullname = editName.value;
      c.phone = editPhone.value;
      c.email = editEmail.value;
      c.location = editLocation.value;
      c.notes = editNotes.value;

      saveLocal();

      renderTable();
      renderCards();
      closeModal("editModal");
    }

    function confirmDelete() {
      deleteId = parseInt(document.getElementById("deleteSelect").value);
      closeModal("deleteChoiceModal");
      openModal("deleteModal");
    }

    function deleteContact() {
      contacts = contacts.filter(c => c.id !== deleteId);
      saveLocal();
      renderTable();
      renderCards();
      closeModal("deleteModal");
    }

    function searchContact() {
      const q = searchInput.value.toLowerCase();

      const tbody = document.getElementById("contactTable");
      tbody.innerHTML = "";

      contacts
        .filter(c => c.fullname.toLowerCase().includes(q))
        .forEach(c => {
          tbody.innerHTML += `
           <tr class="text-center border-b">
              <td>${c.id}</td>
              <td>${c.fullname}</td>
              <td>${c.phone}</td>
              <td>${c.email}</td>
              <td>${c.location}</td>
              <td>${c.notes}</td>
            </tr>`;
        });

      if (tbody.innerHTML === "") {
        tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-pink-400">No match 🌸</td></tr>`;
      }
    }

    function initDropdowns() {
      let e = document.getElementById("editSelect");
      let d = document.getElementById("deleteSelect");

      e.innerHTML = "";
      d.innerHTML = "";

      contacts.forEach(c => {
        e.innerHTML += `<option value="${c.id}">${c.fullname}</option>`;
        d.innerHTML += `<option value="${c.id}">${c.fullname}</option>`;
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      renderTable();
      renderCards();
      initDropdowns();
    });