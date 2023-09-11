// panggil fungsi readline
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');

// buat object kosong untuk menampung inputan
let objectKontak = {
    nama: '',
    nomorHp: '',
};

function viewMenu() {
    //fungsi untuk menampilkan halaman menu
    console.log('Selamat Datang Di Aplikasi Kontak !');
    console.log('====================================\n');
    console.log('Main Menu :\n');
    console.log('1.Tambah Data \n');
    console.log('2.Lihat Data \n');
    console.log('3.Hapus Data \n');
    console.log('4.Cari Data \n');
    console.log('5.Reset Data \n');
    console.log('99.Keluar \n');
    readline.question(`Silahkan Masukan Pilihan Anda  :`, (input) => {
        mainMenu(Number(input));
    });
}

function mainMenu(pilihan) {
    // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan();
            break;
        case 2:
            lihatData();
            break;
        // lanjutkan menu pilihanya disini secara urut
        case 3:
            resetData();
            break;
        case 4:
            pencarianData();
            break;
        case 5:
            hapusData();
            break;
        case 99:
            console.log('Terima Kasih !');
            readline.close();
            break;
        default:
            console.log('Pilihan Tidak Valid !');
            readline.close();
            break;
    }
}

function simpan() {
    // fungsi untuk menyimpan data
    console.log('Silahkan Masukan Data ! : ');
    readline.question('Nama :', (nama) => {
        // validasi nama tidak boleh kosong
        if (nama === '') {
            console.log('Nama Tidak Boleh Kosong !');
            simpan();
            return;
        }

        // validasi nama tidak boleh angka
        if (/^[0-9]+$/.test(nama)) {
            console.log('Nama Tidak Boleh Angka !');
            simpan();
            return;
        }

        objectKontak.nama = nama;
        console.log(`Input data berhasil ! :${nama}`);
        ambilInputanNomor();
    });
}
const ambilInputanNomor = () => {
    // fungsi untuk mengambil inputan nomor
    readline.question('Nomor :', (nomor) => {
        // validasi nomor tidak boleh kosong
        if (nomor === '') {
            console.log('Nomor Tidak Boleh Kosong !');
            ambilInputanNomor();
            return;
        }

        // validasi nomor harus angka
        if (!/^[0-9]+$/.test(nomor)) {
            console.log('Nomor Harus Angka !');
            ambilInputanNomor();
            return;
        }

        const isExist = databaseKontak.find((item) => item.nomorHp === nomor);

        if (isExist) {
            console.log(`Nomor ${nomor} Sudah Terdaftar !`);
            ambilInputanNomor();
            return;
        }

        objectKontak.nomorHp = nomor;
        databaseKontak.push(Object.assign({}, objectKontak)); // insert data kedalam array databseKOntak
        kembali();
    });
};
const kembali = () => {
    // fungsi untuk navigasi kembali
    readline.question('Apakah Anda Ingin Kembali ? (y/n) :', (pilihan) => {
        if (pilihan === 'y') {
            viewMenu();
        } else {
            readline.close();
        }
    });
};

function lihatData() {
    // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali();
}

function resetData() {
    // tambahkan fungsi reset  data disini
    readline.question('Apakah Anda Ingin Reset Data ? (y/n) :', (pilihan) => {
        if (pilihan === 'y') {
            databaseKontak.splice(0, databaseKontak.length);
            console.log('Data Berhasil Direset !');
            kembali();
        } else {
            readline.close();
        }
    });
}

function pencarianData() {
    // tambahkan fungsi pencarian data disini
    readline.question('Masukan Nama Yang Ingin Dicari :', (nama) => {
        // buat pencarian sedinamis mungkin, contoh jika menuliskan huruf "i" maka nama yang mengandung "i" akan ditemukan
        const data = databaseKontak.filter((item) =>
            item.nama.toLowerCase().includes(nama.toLowerCase())
        );

        if (data.length === 0) {
            console.log(`Data ${nama} Tidak Ditemukan !`);
            kembali();
            return;
        }

        console.table(data);
        kembali();
    });
}
function hapusData() {
    // tambahkan fungsi hapus data data disini
    readline.question('Masukan Nama Yang Ingin Dihapus :', (nama) => {
        const data = databaseKontak.filter((item) => item.nama === nama);

        if (data.length === 0) {
            console.log(`Data ${nama} Tidak Ditemukan !`);
            kembali();
            return;
        }

        const index = databaseKontak.indexOf(data[0]);
        databaseKontak.splice(index, 1);
        console.log(`Data ${nama} Berhasil Dihapus !`);
        kembali();
    });
}

viewMenu(); // panggil fungsi view menu untuk pertama kali
