import { formatRFC3339 } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "../layouts/main/MainFooter";

export default function terms() {
    return (     
        <div>             
            <div className="box-content bg-white">        
            <nav id="header-nav-main" className="my-container py-5">
                <div className="grid grid-cols-3 gap-2">
                    {/* COL 1: BRAND LOGO */}
                    <div className="col-span-12 md:col-span-2">
                        <h1><Link href="/"><a className="brand-logo">Duta Tech</a></Link></h1>
                    </div>
                    {/* ENC COL 1 */}
                    <div className="w-full flex flex-row flex-wrap justify-end pt-1 gap-1">
                        <Link href="/auth/login">
                        <a className="btn btn-primary py-2 px-2">Login</a>
                        </Link>
                    </div>                    
                </div>                
            </nav>
                <div className="pb-20 pl-48 pr-48 pt-20 bg-orange-50">
                    <div className="text-center pb-10 text-3xl"><b>Syarat dan Ketentuan</b></div>
                    <p>Selamat datang dan terima kasih telah mengunjungi Platform Duta Tech (www.Duta Tech.com) melalui website, aplikasi mobile dan aplikasi lainnya.</p>
                    <br />
                    <p>Berikut adalah Syarat dan Ketentuan yang memuat mengenai seluruh peraturan dan ketentuan yang mengikat Anda secara otomatis pada saat Anda melakukan kegiatan seperti, berkunjung, melakukan pendaftaran sebagai pengguna, melakukan transaksi, menggunakan aplikasi Duta Tech, menggunakan piranti lunak yang tersedia, maupun pada saat Anda menikmati seluruh fitur dan fasilitas yang disediakan oleh Duta Tech. Anda diharuskan untuk membaca, memahami, menerima dan menyetujui semua persyaratan dan ketentuan dalam perjanjian ini sebelum menggunakan aplikasi dan/atau menerima konten yang terdapat di dalamnya. Dengan mengakses atau menggunakan situs Duta Tech, pengguna dianggap telah memahami dan menyetujui seluruh isi dalam syarat dan ketentuan di bawah ini. Syarat dan ketentuan dapat diubah atau diperbaharui sewaktu-waktu tanpa ada pemberitahuan terlebih dahulu. Perubahan syarat dan ketentuan akan segera berlaku setelah dicantumkan di dalam situs Duta Tech. Jika pengguna merasa keberatan terhadap syarat dan ketentuan yang Duta Tech ajukan dalam Perjanjian ini, maka Duta Tech anjurkan untuk tidak menggunakan situs ini.</p> <br />
                    <p>Saat mengunjungi dan menggunakan situs Duta Tech, termasuk setiap fitur dan layanannya, Setiap pengguna wajib untuk mematuhi ketentuan pengguna situs berikut ini:</p>
                    <ol className="m-7">
                        <li>1. Pengguna minimum berusia 18 tahun, sudah pernah menikah, atau yang telah memiliki persyaratan yang diakui secara hukum termasuk dalam kategori pengguna yang sudah dewasa / terlepas dari hukum perlindungan anak.</li>
                        <li>2. Akses situs ini hanya diperkenankan untuk keperluan dan kepentingan berbelanja dan informasi terkait dengan layanan situs ini.</li>
                        <li>3. Pengguna tidak diperkenankan untuk mereproduksi, mendistribusikan, memajang, menjual, menyewakan, mengirimkan, membuat karya turunan dari, menerjemahkan, memodifikasi, merekayasa balik, membongkar, mengurai atau mengeksploitasi situs Duta Tech.</li>
                        <li>4. engguna tidak diperkenankan untuk memuat dan menerbitkan konten yang:
                            <ul>Melanggar hak cipta, paten, merek dagang, merek layanan, rahasia dagang, atau hak kepemilikan lainnya.</ul>
                            <ul>Mengancam, cabul, tidak senonoh, pornografi atau bisa menimbulkan segala kewajiban hukum perdata atau pidana Indonesia atau hukum internasional.</ul>
                            <ul>Mengandung bug, virus, worm, pintu perangkap, trojan horse atau kode dan properti berbahaya lainnya.</ul>                            
                        </li>
                        <li>5. Produk yang ditawarkan bukan merupakan produk buatan Duta Tech, tetapi dari vendor.</li>
                        <li>6. Duta Tech selalu berupaya untuk menjaga layanan tetap aman, nyaman, dan berfungsi dengan baik, tapi Duta Tech tidak dapat menjamin operasi terus-menerus atau akses ke Layanan Duta Tech dapat selalu sempurna. Informasi dan data dalam situs Duta Tech memiliki kemungkinan tidak terjadi secara real time.</li>
                        <li>7. Pengguna setuju bahwa selama  menggunakan layanan Duta Tech atas risiko pengguna sendiri dan layanan Duta Tech diberikan kepada pengguna dengan kondisi "sebagaimana adanya" dan "sebagaimana tersedia".</li>
                        <li>8. Duta Tech berhak untuk mengganti, mengubah, menangguhkan atau menghentikan semua atau bagian apapun dari Situs ini atau Layanan setiap saat atau setelah memberikan pemberitahuan sebagaimana dipersyaratkan oleh undang-undang dan peraturan yang berlaku. Duta Tech juga dapat meluncurkan Layanan tertentu atau fitur tertentu dalam versi beta, yang mungkin tidak berfungsi dengan baik atau sama seperti versi akhir, dan Duta Tech tidak bertanggung jawab dalam hal demikian. Duta Tech juga dapat membatasi fitur tertentu atau membatasi akses anda ke bagian atau seluruh Situs atau Layanan atas kebijakannya sendiri dan tanpa pemberitahuan atau kewajiban.</li>
                    </ol>
                </div>   
            </div>         
            <MainLayout></MainLayout>        
        </div>        
    )
}


