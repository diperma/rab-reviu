import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import {
  LayoutDashboard,
  HardHat,
  Hammer,
  Droplets,
  Zap,
  Truck,
  ClipboardCheck,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  PieChart,
  FileText,
  Info,
  HelpCircle,
  FileSignature,
  Eye
} from 'lucide-react';

import rabPdf from './assets/RAB Pem KDKMP.pdf';

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = React.useRef(null);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const [xOffset, setXOffset] = React.useState(0); // Offset to keep tooltip on screen

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 256; // w-64 = 16rem = 256px
      const screenPadding = 16; // Padding from screen edge
      const centerX = rect.left + rect.width / 2;

      // Calculate projected edges
      const leftEdge = centerX - tooltipWidth / 2;
      const rightEdge = centerX + tooltipWidth / 2;

      let offset = 0;

      // Check for left overflow
      if (leftEdge < screenPadding) {
        offset = screenPadding - leftEdge;
      }
      // Check for right overflow
      else if (rightEdge > window.innerWidth - screenPadding) {
        offset = (window.innerWidth - screenPadding) - rightEdge;
      }

      setCoords({
        top: rect.top - 10, // Offset above the element
        left: centerX
      });
      setXOffset(offset);
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    updatePosition();
    setIsVisible(!isVisible);
  };

  // Close on scroll or resize to prevent floating tooltip
  React.useEffect(() => {
    const handleScroll = () => {
      if (isVisible) setIsVisible(false);
    };
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        className="relative flex items-center inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        onClick={handleClick}
      >
        {children}
      </div>
      {isVisible && ReactDOM.createPortal(
        <div
          className="fixed z-[9999] pointer-events-none transition-opacity duration-200"
          style={{
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -100%)' // Center horizontally and move above
          }}
        >
          <div className="mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl animate-in fade-in zoom-in duration-200" style={{ transform: `translateX(${xOffset}px)` }}>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45" style={{ transform: `translateX(${-xOffset}px) rotate(45deg)` }}></div>

            <div className="relative z-10 font-medium leading-relaxed">
              <div className="flex items-center gap-2 mb-1 text-blue-300 font-bold uppercase tracking-wider text-[10px]">
                <Zap className="w-3 h-3" />
                AI Explanation
              </div>
              {content}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

// Data RAB Terintegrasi dari Dokumen dengan Penjelasan AI
const RAB_DATA = [
  {
    id: 'I',
    title: 'Pekerjaan Persiapan',
    amount: 13106470.65,
    icon: <ClipboardCheck className="w-5 h-5" />,
    items: [
      {
        name: 'Pengukuran dan pasang bouwplank',
        vol: '60.30',
        unit: "m'",
        price: 37715,
        total: 2274216.55,
        explanation: "Pemasangan papan kayu sementara untuk menentukan titik as kolom dan elevasi lantai bangunan agar siku dan rata."
      },
      {
        name: 'Pembersihan lahan awal sampai akhir pekerjaan',
        vol: '908.30',
        unit: 'm2',
        price: 11925.86,
        total: 10832254.10,
        explanation: "Pembersihan area proyek dari semak, sampah, dan puing sebelum konstruksi dimulai hingga selesai agar siap digunakan."
      }
    ]
  },
  {
    id: 'II',
    title: 'Pekerjaan Struktur',
    amount: 883295924.61,
    icon: <HardHat className="w-5 h-5" />,
    items: [
      /* --------------------------- II.1 Struktur Bawah -------------------------- */
      { name: 'Pekerjaan Struktur Bawah', total: 283238055.35, isHeader: true },
      {
        name: 'Galian tanah pondasi footplat',
        vol: '55.78', unit: 'm3', price: 40217.63, total: 2243419.85,
        explanation: "Penggalian tanah untuk lubang pondasi tapak (footplat) sesuai kedalaman dan dimensi gambar kerja."
      },
      {
        name: 'Urugan tanah kembali pondasi footplat',
        vol: '18.59', unit: 'm3', price: 37258.65, total: 692787.30,
        explanation: "Pengurugan kembali tanah sisa galian di sekeliling pondasi yang sudah terpasang untuk memadatkan area."
      },
      {
        name: 'Lantai kerja bawah pondasi footplat',
        vol: '2.32', unit: 'm3', price: 1286099.70, total: 2989217.23,
        explanation: "Lapisan beton tipis (lean concrete) di bawah pondasi untuk meratakan permukaan tanah dan mencegah kebocoran air semen."
      },
      {
        name: 'Pondasi batu belah',
        vol: '27.90', unit: 'm3', price: 1418769.49, total: 39583668.79,
        explanation: "Pondasi menerus menggunakan pasangan batu kali yang kuat untuk menopang beban dinding di atasnya."
      },
      {
        name: 'Urugan tanah peninggian lantai (+ pemadatan)',
        vol: '180.00', unit: 'm3', price: 183250.00, total: 32985000.00,
        explanation: "Penimbunan tanah terpilih untuk menaikkan level lantai bangunan sesuai rencana elevasi, termasuk pemadatan."
      },
      {
        name: 'Pondasi footplat tipe F1a (Beton, Bekisting, Besi)',
        vol: '2.76', unit: 'm3', price: 1600766.49, total: 10508274.27, // Agregrated total
        explanation: "Pondasi tapak beton bertulang tipe F1a untuk menopang kolom utama struktur."
      },
      {
        name: 'Pondasi footplat tipe F1b (Beton, Bekisting, Besi)',
        vol: '3.55', unit: 'm3', price: 1600766.49, total: 13511132.57,
        explanation: "Pondasi tapak beton bertulang tipe F1b dengan dimensi dan pembesian yang berbeda untuk beban tertentu."
      },
      {
        name: 'Sloof 15 x 25 cm (Beton, Bekisting, Besi)',
        vol: '5.81', unit: 'm3', price: 1600766.49, total: 40651178.43, // Aggregated
        explanation: "Balok beton mendatar yang menghubungkan antar pondasi untuk meratakan beban dinding dan mengikat struktur bawah."
      },
      {
        name: 'Pekerjaan Wiremesh 1 layer',
        vol: '457.26', unit: 'm2', price: 35273.37, total: 16129065.26,
        explanation: "Pemasangan anyaman besi (wiremesh) sebagai tulangan pelat lantai beton."
      },
      {
        name: 'Plat lantai dasar beton K-175 tebal 10 cm',
        vol: '45.73', unit: 'm3', price: 1489272.40, total: 68098320.67,
        explanation: "Pengecoran lantai dasar menggunakan beton mutu K-175 dengan ketebalan 10 cm."
      },

      /* --------------------------- II.2 Struktur Atas --------------------------- */
      { name: 'Pekerjaan Struktur Atas Bangunan', total: 192073253.98, isHeader: true },
      {
        name: 'Kolom Beton (K1a, K1b, K2, Kp)',
        total: 105869273.66,
        unit: 'ls',
        explanation: "Pekerjaan kolom beton bertulang vertikal sebagai penyangga utama beban bangunan ke pondasi."
      },
      {
        name: 'Balok Beton (RB 12x20, 12x30, 12x40)',
        total: 39527636.56,
        unit: 'ls',
        explanation: "Pekerjaan balok beton mendatar ('Ring Balk') untuk mengikat kolom bagian atas dan menopang atap."
      },
      {
        name: 'Plat beton lantai rooftank, t=10 cm',
        total: 3291390.00,
        unit: 'ls',
        explanation: "Dak beton bertulang khusus untuk dudukan tangki air (rooftank) di atas bangunan."
      },
      {
        name: 'Struktur Baja (Kolom WF / Double C)',
        total: 46676343.76,
        unit: 'ls',
        explanation: "Struktur rangka baja utama menggunakan profil baja ganda (Double C) untuk kekuatan bentang lebar."
      },

      /* ------------------------ II.2.2 Struktur Rangka Atap ----------------------- */
      { name: 'Pekerjaan Struktur Rangka Atap', total: 407984615.28, isHeader: true },
      {
        name: 'Kuda-kuda Baja Ringan / Hollow (KK-1, KK-2, BRC)',
        total: 260341772.33,
        unit: 'ls',
        explanation: "Rangka atap utama berbentuk segitiga dari besi hollow/baja ringan untuk menopang penutup atap."
      },
      {
        name: 'Gording Canal C & Besi Siku',
        total: 167642730.95,
        unit: 'ls',
        explanation: "Balok melintang di atas kuda-kuda sebagai dudukan langsung untuk atap spandek."
      },
      {
        name: 'Rangka Kanopi',
        total: 19163618.36,
        unit: 'ls',
        explanation: "Struktur rangka tambahan untuk atap pelindung di area teras atau parkir."
      }
    ]
  },
  {
    id: 'III',
    title: 'Pekerjaan Arsitektur',
    amount: 678635906.72,
    icon: <Hammer className="w-5 h-5" />,
    items: [
      { name: 'Pekerjaan Arsitektur Bangunan', total: 429482390.29, isHeader: true },
      /* -------------------------------- Pasangan -------------------------------- */
      {
        name: 'Pasangan dinding bata merah',
        vol: '318.36', unit: 'm2', price: 192627.95, total: 61325651.77,
        explanation: "Pemasangan dinding pemisah ruang menggunakan batu bata merah yang diplester."
      },
      {
        name: 'Plesteran & Acian Dinding',
        total: 74227562.30,
        unit: 'ls',
        explanation: "Pelapisan dinding bata dengan semen pasir (plester) dan semen halus (aci) agar rata dan halus."
      },
      {
        name: 'Dinding Partisi',
        vol: '11.48', unit: 'm2', price: 241438.00, total: 2771305.60,
        explanation: "Penyekat ruangan non-struktural, biasanya menggunakan gypsum atau kalsiboard."
      },

      /* ---------------------------- Lantai & Dinding ---------------------------- */
      {
        name: 'Keramik Lantai 30x30 cm Polished',
        vol: '130.04', unit: 'm2', price: 192365.07, total: 25015154.05,
        explanation: "Pemasangan ubin keramik lantai ukuran 30x30 cm dengan permukaan mengkilap (polished)."
      },
      {
        name: 'Floor Hardener (Gudang)',
        vol: '457.26', unit: 'm2', price: 30000.00, total: 13717794.60,
        explanation: "Pengerasan permukaan lantai beton gudang agar tahan gesekan dan benturan berat."
      },

      /* --------------------------------- Plafon --------------------------------- */
      {
        name: 'Plafond Gypsumboard 9mm + Rangka',
        vol: '172.94', unit: 'm2', price: 131281.43, total: 22103249.68,
        explanation: "Penutup langit-langit ruangan menggunakan papan gypsum dengan rangka besi hollow."
      },

      /* ----------------------------------- Cat ---------------------------------- */
      {
        name: 'Cat Dinding Interior & Eksterior',
        total: 38638213.38,
        unit: 'ls',
        explanation: "Pengecatan seluruh dinding bangunan bagian dalam dan luar dengan cat tembok berkualitas."
      },

      /* ---------------------------------- Kusen --------------------------------- */
      {
        name: 'Pintu Folding Gate (6 unit)',
        vol: '6.00', unit: 'unit', price: 9000000.00, total: 54000000.00,
        explanation: "Pintu besi lipat geser yang kuat untuk keamanan area ruko atau gudang."
      },
      {
        name: 'Dinding Partisi Kaca (4 unit)',
        vol: '4.00', unit: 'unit', price: 11250000.00, total: 45000000.00,
        explanation: "Dinding kaca transparan dengan rangka aluminium untuk tampilan estetis dan pencahayaan."
      },
      {
        name: 'Pintu Kaca Frameless (2 unit)',
        vol: '2.00', unit: 'unit', price: 17000000.00, total: 34000000.00,
        explanation: "Pintu kaca tebal tanpa bingkai (frameless) untuk pintu masuk utama yang elegan."
      },

      /* --------------------------------- Sanitair -------------------------------- */
      {
        name: 'Closet Duduk & Jet Washer',
        vol: '1.00', unit: 'unit', price: 2500000.00, total: 2500000.00,
        explanation: "Pemasangan toilet duduk lengkap dengan semprotan pembersih."
      },

      /* ---------------------------------- Atap ---------------------------------- */
      { name: 'Pekerjaan Penutup Atap', total: 171159856.00, isHeader: true },
      {
        name: 'Atap Spandek t: 0.35 mm',
        vol: '733.44', unit: 'm2', price: 185000.00, total: 135686400.00,
        explanation: "Lembaran penutup atap dari bahan zincalume profil gelombang, tahan korosi dan ringan."
      },
      {
        name: 'Talang Galvalum',
        vol: '110.88', unit: 'm', price: 100000.00, total: 11088000.00,
        explanation: "Saluran air hujan di tepi atap untuk mengalirkan air ke pipa pembuangan."
      },

      /* --------------------------------- Facade --------------------------------- */
      { name: 'Pekerjaan Facade & Signage', total: 62387690.00, isHeader: true },
      {
        name: 'Dinding Cladding Spandek',
        vol: '264.98', unit: 'm2', price: 185000.00, total: 49022040.00,
        explanation: "Pelapis dinding luar bangunan menggunakan spandek untuk estetika industrial dan perlindungan cuaca."
      },
      {
        name: 'Signage "KOPERASI DESA MERAH PUTIH"',
        vol: '1.00', unit: 'set', price: 12100000.00, total: 12100000.00,
        explanation: "Huruf timbul atau papan nama identitas koperasi yang dipasang di fasad bangunan."
      },

      /* ------------------------------ Infrastruktur ----------------------------- */
      { name: 'Pekerjaan Infrastruktur Lingkungan', total: 15105970.44, isHeader: true },
      {
        name: 'Saluran Keliling (Drainase)',
        vol: '88.00', unit: 'm', price: 125000.00, total: 11000000.00,
        explanation: "Pembuatan parit/selokan di sekeliling bangunan untuk mengalirkan air hujan."
      }
    ]
  },
  {
    id: 'IV',
    title: 'Pekerjaan Mekanikal',
    amount: 25846633.50,
    icon: <Droplets className="w-5 h-5" />,
    items: [
      {
        name: 'Instalasi Air Bersih (Pipa PVC, Valve)',
        total: 2963938.50,
        unit: 'ls',
        explanation: "Sistem perpipaan untuk mendistribusikan air bersih ke titik-titik kran dan toilet."
      },
      {
        name: 'Rooftank Penguin Kapasitas 1 m3',
        vol: '1.00', unit: 'unit', price: 1500000.00, total: 1500000.00,
        explanation: "Tangki penampungan air bersih kapasitas 1000 liter yang diletakkan di atap."
      },
      {
        name: 'Septictank Kapasitas 2 m3',
        vol: '1.00', unit: 'unit', price: 3500000.00, total: 3500000.00,
        explanation: "Bak penampungan dan pengolahan limbah kotoran (bio-septic tank) ramah lingkungan."
      },
      {
        name: 'Instalasi Pipa Air Hujan (PVC 4")',
        vol: '78.00', unit: 'm', price: 144423.00, total: 11264994.00,
        explanation: "Pipa tegak untuk menyalurkan air hujan dari talang atap ke saluran drainase bawah."
      }
    ]
  },
  {
    id: 'V',
    title: 'Pekerjaan Elektrikal',
    amount: 49821245.00,
    icon: <Zap className="w-5 h-5" />,
    items: [
      {
        name: 'Sambung Daya PLN 16.500 VA',
        vol: '1.00', unit: 'ls', price: 16277250.00, total: 16277250.00,
        explanation: "Biaya penyambungan baru listrik PLN daya besar 3 phase untuk operasional gedung."
      },
      {
        name: 'Panel Daya & Kabel Feeder',
        total: 1423500.00,
        unit: 'ls',
        explanation: "Box panel pembagi listrik (MCB) dan kabel utama dari meteran PLN ke panel."
      },
      {
        name: 'Instalasi Titik Lampu & Stop Kontak',
        total: 24170495.00,
        unit: 'ls',
        explanation: "Pemasangan kabel, saklar, dan stop kontak untuk penerangan dan kebutuhan listrik alat."
      },
      {
        name: 'Proteksi Petir (Splitzen & Grounding)',
        vol: '1.00', unit: 'ls', price: 7950000.00, total: 7950000.00,
        explanation: "Sistem penangkal petir konvensional untuk melindungi bangunan dari sambaran petir."
      }
    ]
  },
  {
    id: 'VI',
    title: 'Pekerjaan Sarpras',
    amount: 1246797848.00,
    icon: <Truck className="w-5 h-5" />,
    items: [
      { name: 'Peralatan Kasir & Keamanan', total: 32405800.00, isHeader: true },
      {
        name: 'Komputer Kasir Full Set',
        vol: '2.00', unit: 'unit', price: 3478900.00, total: 6957800.00,
        explanation: "Perangkat komputer lengkap (PC, Monitor, Keyboard) untuk transaksi penjualan di kasir."
      },
      {
        name: 'CCTV (STB, 8 unit)',
        vol: '1.00', unit: 'unit', price: 1469000.00, total: 1469000.00,
        explanation: "Sistem kamera pengawas 8 channel untuk memantau keamanan area toko dan gudang."
      },
      {
        name: 'Peralatan Pendingin', total: 36600000.00, isHeader: true
      },
      {
        name: 'Chiller 2 Pintu',
        vol: '2.00', unit: 'unit', price: 10800000.00, total: 21600000.00,
        explanation: "Lemari pendingin kaca vertikal untuk memajang minuman dingin."
      },
      {
        name: 'Chest Freezer 680L',
        vol: '2.00', unit: 'unit', price: 7500000.00, total: 15000000.00,
        explanation: "Lemari pembeku kotak kapasitas besar untuk menyimpan daging atau makanan beku."
      },
      { name: 'Peralatan Toko (Rak & Furniture)', total: 127924048.00, isHeader: true },
      {
        name: 'Rak Display Gondola (Single/Double/End)',
        total: 81154048.00,
        unit: 'ls',
        explanation: "Sistem rak besi shelving untuk memajang produk jualan di area toko."
      },
      { name: 'Unit Kendaraan Operasional', total: 1001000000.00, isHeader: true },
      {
        name: 'Truk 6 Ban Bak Kayu',
        vol: '1.00', unit: 'unit', price: 540000000.00, total: 540000000.00,
        explanation: "Kendaraan truk medium duty untuk angkutan logistik barang dalam jumlah besar."
      },
      {
        name: 'Pick-up 4WD (4x4)',
        vol: '1.00', unit: 'unit', price: 393000000.00, total: 393000000.00,
        explanation: "Mobil bak terbuka penggerak 4 roda untuk operasional di medan sulit."
      },
      {
        name: 'Motor Bak Roda Tiga',
        vol: '2.00', unit: 'unit', price: 34000000.00, total: 68000000.00,
        explanation: "Kendaraan roda tiga dengan bak terbuka untuk angkutan barang jarak dekat."
      },
      { name: 'Perlengkapan Klinik dan Apotik', total: 12908000.00, isHeader: true },
      {
        name: 'Kasur Medis (UK 200 x100)',
        vol: '1.00', unit: 'unit', price: 1298000.00, total: 1298000.00,
        explanation: "Tempat tidur pasien standar rumah sakit dengan ukuran 200x100 cm."
      },
      {
        name: 'Meja Dokter',
        vol: '1.00', unit: 'unit', price: 2230000.00, total: 2230000.00,
        explanation: "Meja kerja khusus untuk dokter dengan laci penyimpanan."
      },
      {
        name: 'Kursi Pasien',
        vol: '3.00', unit: 'unit', price: 600000.00, total: 1800000.00,
        explanation: "Kursi tunggu atau kursi periksa untuk pasien."
      },
      {
        name: 'Kursi Tunggu',
        vol: '2.00', unit: 'unit', price: 1290000.00, total: 2580000.00,
        explanation: "Kursi panjang (bench) untuk ruang tunggu pasien."
      },
      {
        name: 'Meja Administrasi Klinik',
        vol: '1.00', unit: 'unit', price: 5000000.00, total: 5000000.00,
        explanation: "Meja resepsionis atau administrasi utama klinik."
      },
      { name: 'Perlengkapan Lain', total: 35960000.00, isHeader: true },
      {
        name: 'Lisplang Neon Box',
        vol: '1.00', unit: 'unit', price: 7500000.00, total: 7500000.00,
        explanation: "Papan nama neon box dengan lisplang untuk identitas bangunan."
      },
      {
        name: 'APAR 3,5 kg',
        vol: '2.00', unit: 'unit', price: 350000.00, total: 700000.00,
        explanation: "Alat Pemadam Api Ringan ukuran 3.5 kg untuk keamanan kebakaran."
      },
      {
        name: 'APAR 10 kg',
        vol: '2.00', unit: 'unit', price: 950000.00, total: 1900000.00,
        explanation: "Alat Pemadam Api Ringan ukuran besar 10 kg untuk area gudang."
      },
      {
        name: 'Air Conditioner 2 PK',
        vol: '3.00', unit: 'unit', price: 5800000.00, total: 17400000.00,
        explanation: "Pendingin ruangan kapasitas 2 PK untuk area luas."
      },
      {
        name: 'Air Conditioner 1 PK',
        vol: '2.00', unit: 'unit', price: 2850000.00, total: 5700000.00,
        explanation: "Pendingin ruangan kapasitas 1 PK untuk ruang kantor atau klinik."
      },
      {
        name: 'Kipas Ceiling',
        vol: '2.00', unit: 'unit', price: 930000.00, total: 1860000.00,
        explanation: "Kipas angin langit-langit untuk sirkulasi udara area terbuka."
      },
      {
        name: 'Exhaus Fan',
        vol: '2.00', unit: 'unit', price: 450000.00, total: 900000.00,
        explanation: "Kipas pembuangan udara untuk menjaga sirkulasi dan kelembaban udara."
      }
    ]
  },
  {
    id: 'VII',
    title: 'Pekerjaan Perencanaan',
    amount: 46360064.46,
    icon: <FileSignature className="w-5 h-5" />,
    items: [
      {
        name: 'Biaya Perencanaan Teknis & Desain',
        total: 46360064.46,
        unit: 'ls',
        explanation: "Biaya jasa konsultan perencana untuk pembuatan gambar desain, struktur, dan arsitektur bangunan."
      }
    ]
  },
  {
    id: 'VIII',
    title: 'Pekerjaan Pengawasan',
    amount: 52155072.51,
    icon: <Eye className="w-5 h-5" />,
    items: [
      {
        name: 'Biaya Pengawasan Berkala & Supervisi',
        total: 52155072.51,
        unit: 'ls',
        explanation: "Biaya jasa pengawasan di lapangan untuk memastikan pelaksanaan konstruksi sesuai dengan spesifikasi dan gambar rencana."
      }
    ]
  }
];

const TOTAL_BUDGET = RAB_DATA.reduce((acc, curr) => acc + curr.amount, 0);

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const App = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Default to overview
  const [expandedSection, setExpandedSection] = useState(null);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const constructionTotal = useMemo(() => {
    return RAB_DATA.filter(d => d.id !== 'VI').reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const sarprasTotal = useMemo(() => {
    return RAB_DATA.find(d => d.id === 'VI').amount;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm/50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-blue-100">
              D
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-blue-900 tracking-tight uppercase leading-none">
                Direktorat Pemberdayaan Ekonomi Masyarakat
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Rincian Biaya Pembangunan Gerai KDKMP v1.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold bg-blue-50/50 p-2 pr-4 rounded-full border border-blue-100 text-blue-800">
            <div className="flex items-center gap-2 pl-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Seluruh Indonesia</span>
            </div>
            <div className="w-px h-4 bg-blue-200"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>TA 2025</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-slate-100/50 p-1.5 rounded-xl border border-slate-200 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'overview' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Ringkasan Proyek
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'details' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Rincian Biaya (RAB)
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'pdf' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Dokumen RAB
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Ringkasan RAB Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-110" />
                <h3 className="text-slate-400 text-[10px] font-black mb-2 uppercase tracking-widest">Total Anggaran Proyek</h3>
                <p className="text-3xl font-black text-blue-900 tracking-tight">{formatCurrency(TOTAL_BUDGET)}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <p className="text-[10px] text-blue-600 font-bold uppercase">Anggaran Disetujui</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-110" />
                <h3 className="text-slate-400 text-[10px] font-black mb-2 uppercase tracking-widest">Alokasi Konstruksi</h3>
                <p className="text-3xl font-black text-slate-800 tracking-tight">{formatCurrency(constructionTotal)}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Fisik Bangunan</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-110" />
                <h3 className="text-slate-400 text-[10px] font-black mb-2 uppercase tracking-widest">Alokasi Sarpras</h3>
                <p className="text-3xl font-black text-blue-600 tracking-tight">{formatCurrency(sarprasTotal)}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tighter">Peralatan & Kendaraan</p>
                </div>
              </div>
            </div>

            {/* Rekapitulasi Alokasi Biaya */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <PieChart className="w-4 h-4 text-blue-700" />
                <h2 className="text-xs font-black text-blue-900 uppercase tracking-widest">Rekapitulasi Alokasi Anggaran per Kategori</h2>
              </div>
              <div className="p-4 md:p-8">
                <div className="space-y-6">
                  {RAB_DATA.map((section) => {
                    const percentage = (section.amount / TOTAL_BUDGET * 100).toFixed(1);
                    return (
                      <div key={section.id} className="group">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                          <div className="flex items-center gap-3 w-full md:w-auto">
                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 w-8 text-center shrink-0">{section.id}</span>
                            <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors uppercase tracking-tight truncate">{section.title}</span>
                          </div>
                          <div className="flex items-center justify-between w-full md:w-auto gap-6 text-sm pl-11 md:pl-0">
                            <span className="font-bold text-slate-800 font-mono">{formatCurrency(section.amount)}</span>
                            <span className="w-12 text-right font-black text-blue-500 text-xs">{percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all duration-1000 group-hover:bg-blue-500 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Inpres Document Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-3xl shadow-xl shadow-blue-900/10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 -ml-20 -mt-20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 -mr-16 -mb-16 rounded-full blur-2xl" />

              <div className="relative z-10 text-center md:text-left flex-1">
                <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                  <span className="bg-blue-800/50 border border-blue-700/50 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-blue-300 uppercase flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Dasar Kebijakan
                  </span>
                </div>
                <h2 className="text-2xl font-black mb-3 tracking-tight uppercase leading-tight">Instruksi Presiden R.I<br /><span className="text-blue-300">Nomor 17 Tahun 2025</span></h2>
                <p className="text-blue-100/80 text-sm max-w-xl font-medium leading-relaxed">
                  Tentang Percepatan Pembangunan Fisik Gerai, Pergudangan, dan Kelengkapan Koperasi Desa Kelurahan Merah Putih.
                </p>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md min-w-[200px] shadow-2xl">
                  <p className="text-[10px] uppercase font-black text-blue-300 mb-2 tracking-widest">Status Dokumen</p>
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <ClipboardCheck className="w-5 h-5" />
                    <p className="font-bold text-base">FINAL & DISYAHKAN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
              <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 rounded-t-2xl">
                <div>
                  <h2 className="font-black text-slate-800 uppercase tracking-tight text-lg">Detail Anggaran Biaya (RAB)</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">Rincian per item pekerjaan dengan penjelasan teknis AI.</p>
                </div>
                <div className="text-sm font-black text-blue-900 bg-blue-100/50 px-5 py-3 rounded-xl border border-blue-200 text-right">
                  <span className="text-[10px] text-blue-600 uppercase tracking-widest block mb-1">Grand Total Anggaran</span>
                  {formatCurrency(TOTAL_BUDGET)}
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {RAB_DATA.map((section) => (
                  <div key={section.id} className="group bg-white">
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black transition-all ${expandedSection === section.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                          {section.id}
                        </span>
                        <div className="text-left">
                          <p className={`font-black uppercase text-sm tracking-wide transition-colors ${expandedSection === section.id ? 'text-blue-800' : 'text-slate-700'}`}>{section.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs font-bold text-slate-500">{formatCurrency(section.amount)}</p>
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-400 font-bold">{section.items.length} items</span>
                          </div>
                        </div>
                      </div>
                      <div className={`transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                        <ChevronDown className={`w-5 h-5 ${expandedSection === section.id ? 'text-blue-500' : 'text-slate-300'}`} />
                      </div>
                    </button>

                    {expandedSection === section.id && (
                      <div className="bg-slate-50/50 px-2 md:px-6 pb-4 md:pb-8 pt-2 animate-in slide-in-from-top-2 duration-300">
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
                          <table className="w-full text-left text-sm min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-4 w-12 text-center rounded-tl-xl">Info</th>
                                <th className="px-6 py-4">Uraian Pekerjaan</th>
                                <th className="px-6 py-4 text-right">Vol</th>
                                <th className="px-6 py-4 text-center">Sat</th>
                                <th className="px-6 py-4 text-right rounded-tr-xl">Harga Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {section.items.map((item, idx) => (
                                <tr key={idx} className={`${item.isHeader ? 'bg-blue-50/50' : 'hover:bg-slate-50/80 transition-colors'}`}>
                                  <td className="px-6 py-4 text-center">
                                    {!item.isHeader && item.explanation && (
                                      <Tooltip content={item.explanation}>
                                        <button className="text-blue-400 hover:text-blue-600 transition-colors cursor-help">
                                          <HelpCircle className="w-4 h-4" />
                                        </button>
                                      </Tooltip>
                                    )}
                                  </td>
                                  <td className={`px-6 py-4 ${item.isHeader ? 'font-black text-blue-900 italic pl-6' : 'text-slate-700 font-medium'}`}>
                                    {item.name}
                                  </td>
                                  <td className="px-6 py-4 text-right text-slate-500 font-mono text-xs">{item.vol || ''}</td>
                                  <td className="px-6 py-4 text-center text-slate-400 uppercase font-black text-[10px]">{item.unit || ''}</td>
                                  <td className={`px-6 py-4 text-right font-bold ${item.isHeader ? 'text-blue-800' : 'text-slate-800'}`}>
                                    {formatCurrency(item.total)}
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-slate-50 border-t-2 border-slate-100">
                                <td colSpan="4" className="px-6 py-4 text-right font-black text-slate-600 text-xs uppercase tracking-widest">Sub Total {section.id}</td>
                                <td className="px-6 py-4 text-right font-black text-blue-700 text-base">{formatCurrency(section.amount)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pdf' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[80vh]">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <h2 className="text-xs font-black text-blue-900 uppercase tracking-widest">Dokumen Asli RAB</h2>
                </div>
                <a
                  href={rabPdf}
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download PDF
                </a>
              </div>
              <iframe
                src={rabPdf}
                className="w-full h-full"
                title="RAB Document"
              />
            </div>
          </div>
        )}
        <div className="bg-blue-900 p-10 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 -mr-16 -mt-16 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 -ml-10 -mb-10 rounded-full blur-2xl opacity-50" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-xl">
              <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-blue-300"></span> Terbilang
              </p>
              <p className="text-2xl font-serif italic text-blue-50 leading-relaxed tracking-wide">
                "Dua Milyar Sembilan Ratus Sembilan Puluh Enam Juta Sembilan Belas Ribu Rupiah"
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-300 text-[10px] font-black uppercase mb-2 tracking-widest">Total Anggaran Pembangunan</p>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{formatCurrency(TOTAL_BUDGET)}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Stakeholders */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-0.5 w-12 bg-blue-600"></div>
            <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em]">Otoritas Direktorat & Penandatangan</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: 'Direktur Engineering', name: 'Rury Chandra Baskoro' },
              { role: 'Direktur Pengadaan', name: 'Elphis Rudy' },
              { role: 'Direktur Utama', name: 'Joao Angelo De Sousa Mota' }
            ].map((person, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                <p className="text-[10px] font-black text-blue-600 mb-3 uppercase tracking-widest">{person.role}</p>
                <p className="font-extrabold text-slate-800 text-lg group-hover:text-blue-900 transition-colors">{person.name}</p>
                <div className="mt-6 pt-4 border-t border-slate-200 group-hover:border-blue-100 flex items-center justify-between">
                  <span className="text-[9px] text-green-700 font-bold uppercase tracking-widest bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                    <ClipboardCheck className="w-3 h-3" /> Tervalidasi
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">23/10/2025</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest gap-4">
            <p>© 2025 Direktorat Pemberdayaan Ekonomi Masyarakat</p>
            <p className="text-blue-400 font-black">Rincian Biaya Pembangunan Gerai KDKMP v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
