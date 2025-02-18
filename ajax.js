document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutItems = document.getElementById("checkout-items");
    let totalAmount = 0;

    // ... existing code ...

function displayItems() {
    checkoutItems.innerHTML = "";
    totalAmount = 0;

    cart.forEach((item, index) => {
        checkoutItems.innerHTML += `
            <div class="card product-card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${item.image || 'cofeehero.jpg'}" class="img-fluid rounded" alt="${item.name}">
                        </div>
                        <div class="col-md-7">
                            <h5>${item.name}</h5>
                            <p class="text-muted mb-0">Rp ${item.price.toLocaleString()}</p>
                        </div>
                        <div class="col-md-3 text-right">
                            <input type="checkbox" class="select-item" data-index="${index}">
                            <button class="btn btn-outline-danger delete-item" data-index="${index}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        totalAmount += item.price;
    });

    document.getElementById("total-items").textContent = cart.length;
    document.getElementById("total-amount").textContent = `Rp ${totalAmount.toLocaleString()}`;
}

// ... existing code ...

document.getElementById("btn-bayar").addEventListener("click", function () {
    const selectedItems = Array.from(document.querySelectorAll('.select-item:checked'));
    if (selectedItems.length === 0) {
        alert("Tidak ada item yang dipilih untuk dibayar.");
        return;
    }

    let selectedTotalAmount = 0;
    selectedItems.forEach(item => {
        const index = item.getAttribute("data-index");
        selectedTotalAmount += cart[index].price; // Menghitung total harga item yang dipilih
    });

    let selectedBank = document.getElementById("select-bank").value;
    let paymentCode = generateVirtualAccount();

    document.getElementById("bank-name").textContent = selectedBank;
    document.getElementById("total-price").textContent = selectedTotalAmount.toLocaleString();
    document.getElementById("code").textContent = paymentCode;
    document.getElementById("payment-info").style.display = "block";

    


// ... existing code ...

        let countdown = 3600;
        let timer = setInterval(() => {
            countdown--;
            document.getElementById("timer").textContent = `${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`;
            if (countdown <= 0) {
                clearInterval(timer);
                document.getElementById("payment-info").innerHTML += "<p class='text-danger'>Kode Pembayaran Kedaluwarsa!</p>";
            }
        }, 1000);
    });

    document.getElementById("btn-hapus").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Tidak ada item yang bisa dihapus.");
            return;
        }
        localStorage.removeItem("cart");
        cart = [];
        displayItems();
    });

    document.getElementById("btn-cancel-payment").addEventListener("click", function () {
        document.getElementById("payment-info").style.display = "none";
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-item")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayItems();
        }
    });

    displayItems();
});

// ... existing code ...

function fetchProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true); 
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            cart = data; // Mengupdate keranjang dengan data produk
            localStorage.setItem("cart", JSON.stringify(cart)); // Simpan ke localStorage
            displayItems(); // Tampilkan item di keranjang
        } else {
            console.error('Failed to load products:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send();
}

// Panggil fungsi fetchProducts saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    fetchProducts(); // Ambil produk saat halaman dimuat
    // ... existing code ...
});

// ... existing code ...

