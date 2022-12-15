// import { EncryptStorage } from "encrypt-storage";

export const companyProfile = {
  contacts: {
    displayName: 'Duta Tech Indonesia',
    phone: '+62 8123 4622 350',
    whatsApp: '+62 8123 4622 350',
    email: 'arielnovachristian01@gmail.com',
    address: {
      short: 'Gedung DT 21, Jalan Esok Akan Cerah, Jakarta, Indonesia',
      long: 'Gedung DT 21, Jalan Esok Akan Cerah No. 35, Rw7, Kec. Taman, Jakarta Selatan 61257',
      // long: 'Gedung Buncit 36, Jalan Warung Jati Barat No. 36, Ragunan, Jakarta Selatan, 12550',
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.7891101768932!2d112.64469765043054!3d-7.377517094650448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e2eb8170290f%3A0xbeceb047ad1a7265!2sJl.%20Citra%20Harmoni%20Blk.%20C1%20No.35%2C%20Rw7%2C%20Sidodadi%2C%20Kec.%20Taman%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061257!5e0!3m2!1sen!2sid!4v1637826072433!5m2!1sen!2sid",
    },
    copyright: "company.co.id &copy; 2021. All rights reserved.",
  },
  socialLinks: []
}

export const headerTopSubNavItems = [
  { label: "Tentang Kami", path: "/about-us" },
  { label: "Promo", path: "/promo" },
  { label: "Hubungi Kami", path: "/contact-us" },
]

export const headerBestSubCatItems = [
  { label: "Mouse", link: "/" },
  { label: "Keyboard", link: "/" },
  { label: "PC Gaming", link: "/" },
]

export const footerUniversalLinks = [
  { label: "Tentang Duta Tect", path: "/about-us" },
  { label: "Kebijakan & Privasi", path: "/privacy-policy" },
  { label: "Syarat & Ketentuan", path: "/terms-conditions" },
]

export const aboutUs = {
  mainBanner: {
    title: "Tentang Kami",
    content: "Duta Tech adalah Business-to-Consumers E-Commerce yang bertema toko online gadget. Duta Tech menjual berbagai teknologi terkini, seperti Iphone 14, Samsung S21, Smartwatch, dan masih banyak lagi.",
    // content: "Duta Tech merupakan Pioneer B2B marketplace dan direktori bisnis online di Indonesia, kami memilki lebih dari 3 juta member yang sudah menggunakan layanan dari Duta Tech, selain sebagai portal Marketplace kami pun menyediakan berbagai layanan periklanan, seperti pembuatan website, pembuatan Company Profile dan masih banyak sekali media promosi yang kami sediakan untuk kepentingan Digital Marketing lain nya.",
    bgImage: "/images/banners/about-us-banner.jpg",
    ctaImage: "/images/indo-map.png",
  },
  visi: {
    title: "Visi kami untuk terus berkembang",
    content: "Duta Tech mempunyai visi untuk menjadi B2B Marketplace dan penyedia jasa Digital Marketing terbesar di Indonesia, dan bisa memenuhi kebutuhan digital marketing di berbagai kalangan . Dalam memnggapai visinya Duta Tech melakukan berbagai cara agar bisa mencapai posisi seperti sekarang, dari mulai mengembangkan fitur – fitur yang ada, mengembangkan kategori, memperbaiki semua konten mengikuti perkembangan zaman, dan tidak lupa mengedepankan budaya kerja Duta Tech DIKA (Dedikasi, Intelektual, Konsisten, Ambisi)."
  },
  misi: {
    items: [
      { title: "Dedikasi", icon: "bi-box2-heart-fill", description: "Kami mendedikasikan sebagian besar waktu kami untuk kepuasan member dengan cara menjaga website kami tetap selalu stabil dengan trafik yang besar pada setiap website member." },
      { title: "Intelektual", icon: "bi-lightbulb-fill", description: "Kami selalu memberikan fitur fitur yang sangat membantu para member dan pencari barang, kami selalu menngedepankan fitur praktis dan tentunya fitur yang cerdas, semua di lakukan agar dapat, memudahkan setiap pengunjung website kami." },
      { title: "Konsisten", icon: "bi-star-fill", description: "Dari tahun 2001 sampai dengan 2020 Duta Tech berusaha konsisten dalam menjaga pelayanan kami agar tetap prima, dan tentunya konsistensi yang kami memberikan, telah mengantarkan kami untuk mencapai posisi saat ini." },
      { title: "Ambisi", icon: "bi-trophy-fill", description: "Kami memiliki ambisi untuk menjadi B2B marketplace terbesar di Indonesia, karna ambisi tersebut menjadikan motivasi yang besar bagi kami, agar terus berjuang di era yang semakin mengedapnkan Digital Marketing." },
    ]
  },
  branding: {
    title: "Mengapa memilih kami?",
    points: [
      { order: 1,content: "Yang pertama adalah karena kategori yang kami miliki sangat lengkap, kami menyediakan lebih dari 18 ribu kategori di dalam portal kami.", },
      { order: 2,content: "Brand kami sudah di kenal oleh banyak pencari barang, yang tentunya para pencari barang akan senantiasa mengutamakan mencara barang dari portal kami, ketimbang portal lain.", },
      { order: 3,content: "Kami memiliki layanan Best Deal yang tentunya layanan ini sangat memudahkan para pencari barang untuk mencari barang yang mereka ingin kan.", },
      { order: 4,content: "Transaksi di Duta Tech sangatlah mudah, tidak perlu banyak langkah, para vendor akan di hubungi langsung oleh para pencari barang.",  },
      { order: 5,content: "Duta Tech adalah perusahaan yang mementingkan kepuasan dari para member, dan sangat dekat dengan member nya, sehingga kami bisa memaksimalkan pelayanan kami.", },
    ],
    ctaImage: "/images/about-us-branding.png",
  }
}

export const privacyPolicy = {
  content: '<h4>A. Lingkup</h4><p>Platform ini dikelola dan dioperasikan oleh Duta Tech. Kebijakan Privasi ini menetapkan cara melindungi dan menggunakan informasi yang Anda berikan ketika menggunakan layanan situs ini. Adanya Kebijakan Privasi ini adalah komitmen nyata dari Duta Tech untuk menghargai dan melindungi setiap data atau informasi pribadi Pengguna situs Duta Tech beserta situs-situs turunannya, serta aplikasi gawai Duta Tech.</p><br /><p>Seluruh informasi pribadi yang Anda berikan kepada Duta Tech hanya akan digunakan dan dilindungi oleh Duta Tech. Setiap informasi yang Anda berikan terbatas untuk tujuan proses yang berkaitan dengan Duta Tech dan tanpa tujuan lainnya. Duta Tech dapat mengubah Kebijakan Privasi ini dari waktu ke waktu dengan melakukan pengurangan ataupun penambahan ketentuan pada halaman ini agar selalu relevan dan terkini dengan situasi serta kondisi yang berubah, peraturan yang berlaku dan kebutuhan pengguna Duta Tech. Anda sangat dianjurkan untuk membaca Kebijakan Privasi ini secara berkala agar mengetahui perubahan-perubahan terbaru. Selama Anda menggunakan layanan Duta Tech, Anda dianggap memberikan persetujuan secara eksplisit atas kebijakan privasi dan jika terjadi perubahan kemudian Anda tetap menggunakan layanan Duta Tech maka Anda dianggap juga setuju atas seluruh perubahan kebijakan privasi yang telah dilakukan. </p><br /><h4>B. Keamanan</h4><p>Duta Tech berkomitmen untuk memastikan bahwa informasi yang Anda berikan kepada Duta Tech dalam keadaan aman. Untuk mencegah akses tidak sah, Duta Tech melakukan tindakan pengamanan fisik, elektronik, dan prosedur manajerial yang diperlukan untuk melindungi informasi Anda yang Duta Tech kumpulkan secara daring.</p><br /><h4>C. Pembatasan Tanggung Jawab</h4><p>Duta Tech dalam pemanfaatan dan pengolahan informasi pribadi, termasuk transmisi data, sesuai dengan tujuan Kebijakan Privasi ini akan menerapkan keamanan sewajarnya termasuk memberikan enkripsi pada pemanfaatan dan pengolahan data tersebut. Pembatasan tanggung jawab Duta Tech sebagai berikut:</p><ul><li>1. Pengguna bertanggung jawab atas keamanan dan mitigasi pelanggaran atas akun sendiri, seperti tapi tidak terbatas pada pengamanan yang memadai, membatasi akses, membuat kata sandi yang kuat, dan menjaga kata sandi.</li><li>2. Duta Tech tidak bertanggung jawab atas pertukaran dan pemberian data dan informasi pribadi pengguna yang dilakukan oleh pengguna sendiri. Termasuk dalam ketentuan ini adalah setiap dan segala kesalahan pengguna yang mengakibatkan kebocoran informasi pribadi data pengguna.</li><li>3. Duta Tech tidak bertanggung jawab atas keaslian, kebenaran, keakuratan dan kelengkapan informasi data pribadi yang diberikan oleh Pengguna ke dalam sistem Duta Tech.</li><li>4. Setelah melakukan pemberian informasi data pribadi maka pengguna telah menyetujui bahwa pengguna melepaskan hak atas klaim, kerugian, tuntutan, dan gugatan yang mungkin terjadi atas perolehan, penyimpanan, penggunaan, pemanfaatan, dan/atau pengungkapan informasi data pribadi dalam sistem Duta Tech.</li><li>5. Apabila Pengguna adalah anak belum dewasa, Duta Tech tidak bertanggung jawab atas input data pribadi Pengguna anak dan menganjurkan agar orang tua/wali anak memantau penggunaan internet anak, sehingga pemberian data pribadi Pengguna anak diberikan dan/atau dalam pengawasan orang tua/wali sebagai pihak yang berwenang.</li><li>6. Duta Tech tidak bertanggung jawab atas kebocoran data yang terjadi yang dikarenakan dan/atau terjadi selama Keadaan Memaksa. Keadaan Memaksa dalam hal ini meliputi tapi tidak terbatas pada pemogokan, penutupan perusahaan; huru-hara, kerusuhan, serangan atau ancaman teroris, ancaman atau perang; kebakaran, ledakan, bencana alam atau bencana non alam, epidemi atau pandemi; tidak adanya atau terganggunya jaringan telekomunikasi, informatika, listrik; terjadinya kegagalan sistem yang diakibatkan pihak ketiga di luar kewenangan Duta Tech; terjadinya kegagalan atau tidak berfungsinya sistem dan/atau jaringan perbankan; ketentuan perundang-undangan, peraturan dari pemerintah, putusan pengadilan. Dalam hal terjadi Keadaan Memaksa, Duta Tech akan memberitahukan Pengguna paling lambat 14 (empat belas) hari kalender sejak kejadian keadaan memaksa dan berusaha dengan kemampuan terbaiknya memenuhi kewajiban berdasarkan Kebijakan Privasi ini.</li></ul>',
}

export const termsConditions = {
  content: '<p>Selamat datang dan terima kasih telah mengunjungi Platform Duta Tech (www.Duta Tech.com) melalui website, aplikasi mobile dan aplikasi lainnya.</p><br /><p>Berikut adalah Syarat dan Ketentuan yang memuat mengenai seluruh peraturan dan ketentuan yang mengikat Anda secara otomatis pada saat Anda melakukan kegiatan seperti, berkunjung, melakukan pendaftaran sebagai pengguna, melakukan transaksi, menggunakan aplikasi Duta Tech, menggunakan piranti lunak yang tersedia, maupun pada saat Anda menikmati seluruh fitur dan fasilitas yang disediakan oleh Duta Tech. Anda diharuskan untuk membaca, memahami, menerima dan menyetujui semua persyaratan dan ketentuan dalam perjanjian ini sebelum menggunakan aplikasi dan/atau menerima konten yang terdapat di dalamnya. Dengan mengakses atau menggunakan situs Duta Tech, pengguna dianggap telah memahami dan menyetujui seluruh isi dalam syarat dan ketentuan di bawah ini. Syarat dan ketentuan dapat diubah atau diperbaharui sewaktu-waktu tanpa ada pemberitahuan terlebih dahulu. Perubahan syarat dan ketentuan akan segera berlaku setelah dicantumkan di dalam situs Duta Tech. Jika pengguna merasa keberatan terhadap syarat dan ketentuan yang Duta Tech ajukan dalam Perjanjian ini, maka Duta Tech anjurkan untuk tidak menggunakan situs ini.</p><br /><p>Saat mengunjungi dan menggunakan situs Duta Tech, termasuk setiap fitur dan layanannya, Setiap pengguna wajib untuk mematuhi ketentuan pengguna situs berikut ini:</p><ol><li>Pengguna minimum berusia 18 tahun, sudah pernah menikah, atau yang telah memiliki persyaratan yang diakui secara hukum termasuk dalam kategori pengguna yang sudah dewasa / terlepas dari hukum perlindungan anak.</li><li>Akses situs ini hanya diperkenankan untuk keperluan dan kepentingan berbelanja dan informasi terkait dengan layanan situs ini.</li><li>Pengguna tidak diperkenankan untuk mereproduksi, mendistribusikan, memajang, menjual, menyewakan, mengirimkan, membuat karya turunan dari, menerjemahkan, memodifikasi, merekayasa balik, membongkar, mengurai atau mengeksploitasi situs Duta Tech.</li><li>Pengguna tidak diperkenankan untuk memuat dan menerbitkan konten yang:<ul>Melanggar hak cipta, paten, merek dagang, merek layanan, rahasia dagang, atau hak kepemilikan lainnya.</ul><ul>Mengancam, cabul, tidak senonoh, pornografi atau bisa menimbulkan segala kewajiban hukum perdata atau pidana Indonesia atau hukum internasional.</ul><ul>Mengandung bug, virus, worm, pintu perangkap, trojan horse atau kode dan properti berbahaya lainnya.</ul></li><li>Produk yang ditawarkan bukan merupakan produk buatan Duta Tech, tetapi dari vendor.</li><li>Duta Tech selalu berupaya untuk menjaga layanan tetap aman, nyaman, dan berfungsi dengan baik, tapi Duta Tech tidak dapat menjamin operasi terus-menerus atau akses ke Layanan Duta Tech dapat selalu sempurna. Informasi dan data dalam situs Duta Tech memiliki kemungkinan tidak terjadi secara real time.</li><li>Pengguna setuju bahwa selama  menggunakan layanan Duta Tech atas risiko pengguna sendiri dan layanan Duta Tech diberikan kepada pengguna dengan kondisi "sebagaimana adanya" dan "sebagaimana tersedia".</li><li>Duta Tech berhak untuk mengganti, mengubah, menangguhkan atau menghentikan semua atau bagian apapun dari Situs ini atau Layanan setiap saat atau setelah memberikan pemberitahuan sebagaimana dipersyaratkan oleh undang-undang dan peraturan yang berlaku. Duta Tech juga dapat meluncurkan Layanan tertentu atau fitur tertentu dalam versi beta, yang mungkin tidak berfungsi dengan baik atau sama seperti versi akhir, dan Duta Tech tidak bertanggung jawab dalam hal demikian. Duta Tech juga dapat membatasi fitur tertentu atau membatasi akses anda ke bagian atau seluruh Situs atau Layanan atas kebijakannya sendiri dan tanpa pemberitahuan atau kewajiban.</li></ol>',
}

// export const encryptStorage = new EncryptStorage(`${process.env.LOCAL_STORAGE_SECRET_KEY}`, {
//   storageType: 'sessionStorage',
// });
// console.log("one", process.env.LOCAL_STORAGE_SECRET_KEY)