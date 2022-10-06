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
                    <div className="text-center pb-10 text-3xl"><b>Kebijakan Privasi</b></div>
                    <h1 className="mb-2"><b>A. Lingkup</b></h1>
                    <p>Platform ini dikelola dan dioperasikan oleh Duta Tech. Kebijakan Privasi ini menetapkan cara melindungi dan menggunakan informasi yang Anda berikan ketika menggunakan layanan situs ini. Adanya Kebijakan Privasi ini adalah komitmen nyata dari Duta Tech untuk menghargai dan melindungi setiap data atau informasi pribadi Pengguna situs Duta Tech beserta situs-situs turunannya, serta aplikasi gawai Duta Tech.</p>
                    <br />
                    <p>Seluruh informasi pribadi yang Anda berikan kepada Duta Tech hanya akan digunakan dan dilindungi oleh Duta Tech. Setiap informasi yang Anda berikan terbatas untuk tujuan proses yang berkaitan dengan Duta Tech dan tanpa tujuan lainnya. Duta Tech dapat mengubah Kebijakan Privasi ini dari waktu ke waktu dengan melakukan pengurangan ataupun penambahan ketentuan pada halaman ini agar selalu relevan dan terkini dengan situasi serta kondisi yang berubah, peraturan yang berlaku dan kebutuhan pengguna Duta Tech. Anda sangat dianjurkan untuk membaca Kebijakan Privasi ini secara berkala agar mengetahui perubahan-perubahan terbaru. Selama Anda menggunakan layanan Duta Tech, Anda dianggap memberikan persetujuan secara eksplisit atas kebijakan privasi dan jika terjadi perubahan kemudian Anda tetap menggunakan layanan Duta Tech maka Anda dianggap juga setuju atas seluruh perubahan kebijakan privasi yang telah dilakukan. </p>
                    <br />
                    <h1 className="mb-2"><b>B. Keamanan</b></h1>
                    <p>Duta Tech berkomitmen untuk memastikan bahwa informasi yang Anda berikan kepada Duta Tech dalam keadaan aman. Untuk mencegah akses tidak sah, Duta Tech melakukan tindakan pengamanan fisik, elektronik, dan prosedur manajerial yang diperlukan untuk melindungi informasi Anda yang Duta Tech kumpulkan secara daring.</p>
                    <br />
                    <h1 className="mb-2"><b>C. Pembatasan Tanggung Jawab</b></h1>
                    <p>Duta Tech dalam pemanfaatan dan pengolahan informasi pribadi, termasuk transmisi data, sesuai dengan tujuan Kebijakan Privasi ini akan menerapkan keamanan sewajarnya termasuk memberikan enkripsi pada pemanfaatan dan pengolahan data tersebut. Pembatasan tanggung jawab Duta Tech sebagai berikut:</p>
                    <ul>
                        <li>1. Pengguna bertanggung jawab atas keamanan dan mitigasi pelanggaran atas akun sendiri, seperti tapi tidak terbatas pada pengamanan yang memadai, membatasi akses, membuat kata sandi yang kuat, dan menjaga kata sandi.</li>
                        <li>2. Duta Tech tidak bertanggung jawab atas pertukaran dan pemberian data dan informasi pribadi pengguna yang dilakukan oleh pengguna sendiri. Termasuk dalam ketentuan ini adalah setiap dan segala kesalahan pengguna yang mengakibatkan kebocoran informasi pribadi data pengguna.</li>
                        <li>3. Duta Tech tidak bertanggung jawab atas keaslian, kebenaran, keakuratan dan kelengkapan informasi data pribadi yang diberikan oleh Pengguna ke dalam sistem Duta Tech.</li>
                        <li>4. Setelah melakukan pemberian informasi data pribadi maka pengguna telah menyetujui bahwa pengguna melepaskan hak atas klaim, kerugian, tuntutan, dan gugatan yang mungkin terjadi atas perolehan, penyimpanan, penggunaan, pemanfaatan, dan/atau pengungkapan informasi data pribadi dalam sistem Duta Tech.</li>
                        <li>5. Apabila Pengguna adalah anak belum dewasa, Duta Tech tidak bertanggung jawab atas input data pribadi Pengguna anak dan menganjurkan agar orang tua/wali anak memantau penggunaan internet anak, sehingga pemberian data pribadi Pengguna anak diberikan dan/atau dalam pengawasan orang tua/wali sebagai pihak yang berwenang.</li>
                        <li>6. Duta Tech tidak bertanggung jawab atas kebocoran data yang terjadi yang dikarenakan dan/atau terjadi selama Keadaan Memaksa. Keadaan Memaksa dalam hal ini meliputi tapi tidak terbatas pada pemogokan, penutupan perusahaan; huru-hara, kerusuhan, serangan atau ancaman teroris, ancaman atau perang; kebakaran, ledakan, bencana alam atau bencana non alam, epidemi atau pandemi; tidak adanya atau terganggunya jaringan telekomunikasi, informatika, listrik; terjadinya kegagalan sistem yang diakibatkan pihak ketiga di luar kewenangan Duta Tech; terjadinya kegagalan atau tidak berfungsinya sistem dan/atau jaringan perbankan; ketentuan perundang-undangan, peraturan dari pemerintah, putusan pengadilan. Dalam hal terjadi Keadaan Memaksa, Duta Tech akan memberitahukan Pengguna paling lambat 14 (empat belas) hari kalender sejak kejadian keadaan memaksa dan berusaha dengan kemampuan terbaiknya memenuhi kewajiban berdasarkan Kebijakan Privasi ini.</li>                    
                    </ul>
                </div>   
            </div>         
            <MainLayout></MainLayout>        
        </div>        
    )
}


