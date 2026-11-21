export interface TheoryFormula {
  name: string;
  latex: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  physicalMeaning: string;
  validityCondition: string;
  workedExample: string;
}

export interface TheoryLevel {
  level: number;
  shortTitle: string;
  title: string;
  subtitle: string;
  diagramKind: 'fenomena-nyata' | 'superposisi-vektor' | 'penurunan-rumus' | 'alur-analisis' | 'strategi-relatif';
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  quantitiesTable?: {
    symbolLatex: string;
    name: string;
    unitSI: string;
    physicalMeaning: string;
  }[];
  formulas?: TheoryFormula[];
  commonMisconceptions?: {
    wrong: string;
    right: string;
  }[];
  narrationScript: string;
}

export interface ConceptNode {
  id: string;
  tier: 'Prasyarat' | 'Inti Soal 3' | 'Alat Matematis' | 'Variasi OSN';
  title: string;
  summary: string;
  formulaLatex?: string;
  linkedTheoryLevel: number;
  linkedProblems: number[];
}

export const CONCEPT_MAP_NODES: ConceptNode[] = [
  {
    id: 'glbb-glb',
    tier: 'Prasyarat',
    title: 'GLB & GLBB Satu Dimensi',
    summary:
      'Pemahaman gerak berkecepatan konstan ($a=0$) dan gerak dipercepat beraturan ($a=-g$) sebagai fondasi penguraian sumbu-$x$ dan sumbu-$y$.',
    formulaLatex: 'x = v_{0x}t, \\quad v_y = v_{0y} - gt',
    linkedTheoryLevel: 1,
    linkedProblems: [1, 2, 3],
  },
  {
    id: 'vektor-2d',
    tier: 'Prasyarat',
    title: 'Aljabar Vektor & Komponen',
    summary:
      'Menyatakan posisi dan kecepatan dalam vektor satuan $(\\hat{i}, \\hat{j})$ serta menghitung besar vektor melalui teorema Pythagoras.',
    formulaLatex: '\\vec{v} = v_x\\hat{i} + v_y\\hat{j}, \\quad |\\vec{v}| = \\sqrt{v_x^2 + v_y^2}',
    linkedTheoryLevel: 1,
    linkedProblems: [5, 6],
  },
  {
    id: 'superposisi',
    tier: 'Inti Soal 3',
    title: 'Independensi Gerak Proyektil',
    summary:
      'Dalam medan gravitasi homogen $\\vec{g}$, gerak horizontal dan vertikal berlangsung saling bebas. Kedua benda yang dilepas horizontal dari titik sama selalu sejajar secara vertikal.',
    formulaLatex: 'y_1(t) = y_2(t) = -\\frac{1}{2}gt^2',
    linkedTheoryLevel: 2,
    linkedProblems: [2, 4, 7, 14],
  },
  {
    id: 'dot-product',
    tier: 'Alat Matematis',
    title: 'Dot Product & Syarat Tegak Lurus',
    summary:
      'Dua vektor kecepatan membentuk sudut $90^\\circ$ tepat ketika hasil kali titiknya nol: $v_{1x}v_{2x} + v_{1y}v_{2y} = 0$, yang menghasilkan $t_{\\perp} = \\sqrt{v_1 v_2}/g$.',
    formulaLatex: '\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0 \\implies t = \\frac{\\sqrt{v_1 v_2}}{g}',
    linkedTheoryLevel: 3,
    linkedProblems: [1, 2, 3, 8],
  },
  {
    id: 'gerak-relatif',
    tier: 'Alat Matematis',
    title: 'Kinematika Relatif ($\\vec{a}_{\\text{rel}} = \\vec{0}$)',
    summary:
      'Karena kedua benda mengalami percepatan gravitasi $\\vec{g}$ yang identik, percepatan relatifnya nol! Jarak pisah tumbuh secara linear $d(t) = |\\vec{v}_{\\text{rel}}(0)|\\,t$.',
    formulaLatex: '\\vec{a}_{\\text{rel}} = \\vec{g} - \\vec{g} = \\vec{0} \\implies d = (v_1 + v_2)t',
    linkedTheoryLevel: 5,
    linkedProblems: [9, 10, 13],
  },
  {
    id: 'variasi-osn',
    tier: 'Variasi OSN',
    title: 'Ekstensi Olimpiade Tingkat Lanjut',
    summary:
      'Penerapan prinsip yang sama pada sudut $\\theta \\neq 90^\\circ$, pelepasan tak serentak ($\\Delta t$), rasio energi kinetik, medan angin tambahan $a_x$, luas segitiga $OAB$, dan pantulan elastis.',
    formulaLatex: '\\frac{E_{kB}}{E_{kA}} = \\frac{v_B}{v_A}, \\quad \\tau_{\\text{pantul}} = 2t_1',
    linkedTheoryLevel: 5,
    linkedProblems: [11, 12, 13, 14, 15],
  },
];

export const THEORY_LEVELS: TheoryLevel[] = [
  {
    level: 1,
    shortTitle: 'Level 1',
    title: 'Pengetahuan Awal: Mengenal Gerak Dua Benda dalam Gravitasi',
    subtitle: 'Bahasa sederhana, fenomena sehari-hari, dan pengenalan simbol besaran SI.',
    diagramKind: 'fenomena-nyata',
    sections: [
      {
        heading: 'Apa yang Sebenarnya Terjadi pada Soal Nomor 3?',
        paragraphs: [
          'Bayangkan kamu berdiri di atas jembatan penyeberangan dan melempar dua bola kelereng tepat bersamaan ke arah mendatar (horizontal) yang berlawanan: kelereng pertama ke kanan dengan laju $3{,}0\\text{ m/s}$, dan kelereng kedua ke kiri dengan laju $4{,}0\\text{ m/s}$.',
          'Begitu terlepas dari tanganmu, kedua kelereng sama-sama tertarik ke bawah oleh gravitasi Bumi. Awalnya arah gerak keduanya berlawanan persis ($180^\\circ$). Namun seiring jatuhnya kedua bola, tarikan gravitasi membuat arah gerak masing-masing makin menukik ke bawah. Pada satu momen singkat tertentu, arah gerak keduanya membentuk sudut siku-siku ($90^\\circ$) persis seperti sudut kertas!',
        ],
        bullets: [
          'Mengapa arah gerak bisa menukik? Karena kecepatan ke samping tetap, sementara kecepatan jatuh ke bawah terus bertambah tiap detik.',
          'Mengapa kedua bola selalu berada pada ketinggian yang sama? Karena gravitasi menarik keduanya ke bawah dengan percepatan yang persis sama!',
        ],
      },
      {
        heading: 'Mengapa Belajar Konsep Ini Penting untuk OSN?',
        paragraphs: [
          'Di Olimpiade Sains tingkat Kabupaten/Kota (OSN-K), soal kinematika sering menggabungkan dua benda yang bergerak bersamaan dalam medan gravitasi. Memahami cara mengurai arah gerak ke kanan-kiri (sumbu-$x$) dan atas-bawah (sumbu-$y$) adalah kunci utama agar soal terlihat sangat sederhana.',
        ],
      },
    ],
    quantitiesTable: [
      {
        symbolLatex: 'v_1, v_2',
        name: 'Kelajuan Awal Horizontal',
        unitSI: '$\\text{m/s}$',
        physicalMeaning: 'Laju mula-mula benda 1 (ke kanan) dan benda 2 (ke kiri) tepat saat dilepas.',
      },
      {
        symbolLatex: 'g',
        name: 'Percepatan Gravitasi',
        unitSI: '$\\text{m/s}^2$',
        physicalMeaning: 'Laju pertambahan kecepatan jatuh ke bawah setiap satu detik (di Bumi sekitar $9{,}8$ atau $10\\text{ m/s}^2$).',
      },
      {
        symbolLatex: 't',
        name: 'Selang Waktu',
        unitSI: '$\\text{s}$',
        physicalMeaning: 'Durasi sejak kedua benda mulai bergerak hingga kondisi tertentu tercapai.',
      },
      {
        symbolLatex: '\\vec{v}(t)',
        name: 'Vektor Kecepatan Sesaat',
        unitSI: '$\\text{m/s}$',
        physicalMeaning: 'Menunjukkan seberapa cepat sekaligus ke mana arah gerak benda pada waktu $t$.',
      },
      {
        symbolLatex: 'd',
        name: 'Jarak Pisah Antar Benda',
        unitSI: '$\\text{m}$',
        physicalMeaning: 'Panjang garis lurus yang menghubungkan posisi benda 1 dan benda 2 pada saat $t$.',
      },
    ],
    narrationScript:
      'Selamat datang di Level satu, Pengetahuan Awal! Bayangkan kamu berdiri di atas menara lalu melempar dua bola bersamaan secara mendatar ke kiri dan ke kanan. Awalnya arah gerak mereka bertolak belakang seratus delapan puluh derajat. Karena gravitasi terus menarik keduanya ke bawah, arah gerak masing-masing makin menukik. Nah, pada satu detik tertentu, arah gerak keduanya akan membentuk sudut tepat sembilan puluh derajat atau saling tegak lurus! Di level ini, pastikan kamu mengenal lima besaran pokoknya dalam satuan SI: kelajuan awal v satu dan v dua dalam meter per detik, percepatan gravitasi g dalam meter per detik kuadrat, waktu t dalam detik, vektor kecepatan v, dan jarak pisah d dalam meter.',
  },
  {
    level: 2,
    shortTitle: 'Level 2',
    title: 'Pemahaman Konsep: Prinsip Superposisi & Asumsi Idealisasi',
    subtitle: 'Hukum fisika yang mendasari, independensi sumbu gerak, dan batasan model.',
    diagramKind: 'superposisi-vektor',
    sections: [
      {
        heading: 'Prinsip Superposisi (Independensi Gerak Horizontal dan Vertikal)',
        paragraphs: [
          'Menurut Hukum II Newton ($\\sum \\vec{F} = m\\vec{a}$), gaya gravitasi $\\vec{W} = m\\vec{g}$ hanya menunjuk ke arah vertikal bawah ($-y$). Tidak ada gaya apa pun ke arah kanan atau kiri ($\\sum F_x = 0$).',
          'Akibatnya, gerak 2 dimensi ini sebenarnya merupakan gabungan dua gerak 1 dimensi yang tidak saling mengganggu:',
        ],
        bullets: [
          'Pada arah horizontal ($x$): Percepatan $a_x = 0$, sehingga benda mengalami Gerak Lurus Beraturan (GLB). Kecepatan horizontal $v_x$ tetap konstan sepanjang waktu.',
          'Pada arah vertikal ($y$): Percepatan $a_y = -g$, sehingga benda mengalami Gerak Lurus Berubah Beraturan (GLBB). Komponen vertikal $v_y(t) = -gt$ bertambah secara linear.',
        ],
      },
      {
        heading: 'Asumsi Idealisasi yang Wajib Dipahami',
        paragraphs: [
          'Persamaan elegan pada Soal Nomor 3 hanya berlaku akurat di bawah empat asumsi idealisasi berikut:',
        ],
        bullets: [
          'Medan gravitasi homogen: besar dan arah $\\vec{g}$ sama di seluruh lintasan benda.',
          'Hambatan udara diabaikan ($F_{\\text{drag}} = 0$): jika ada gesekan udara, laju horizontal akan melambat dan massa memengaruhi percepatan.',
          'Benda dipandang sebagai partikel titik sehingga tidak ada efek rotasi atau gaya angkat (Magnus).',
          'Ruang gerak cukup tinggi sehingga benda belum menyentuh tanah sebelum vektor kecepatannya tegak lurus.',
        ],
      },
    ],
    commonMisconceptions: [
      {
        wrong: 'Mengira ada "gaya lemparan ke depan" yang masih mendorong benda selama di udara.',
        right: 'Setelah benda terlepas, gaya dorong tangan sudah hilang! Satu-satunya gaya pada Free Body Diagram adalah gaya berat $\\vec{W} = m\\vec{g}$ ke bawah.',
      },
      {
        wrong: 'Mengira benda yang dilempar lebih cepat akan jatuh lebih lambat menyentuh tanah.',
        right: 'Gerak vertikal tidak bergantung pada $v_x$. Kedua benda selalu berada di kedalaman vertikal yang persis sama di setiap saat ($y_1(t) = y_2(t)$).',
      },
    ],
    narrationScript:
      'Sekarang kita masuk ke Level dua, Pemahaman Konsep. Kunci utama gerak parabola adalah prinsip independensi sumbu gerak. Karena gaya berat m kali g hanya menarik ke bawah, tidak ada gaya ke arah samping. Jadi gerak ke samping berlangsung dengan kecepatan tetap, sedangkan gerak ke bawah dipercepat beraturan sebesar g. Ingat empat asumsi idealisasinya: medan gravitasi seragam, tidak ada gesekan udara, benda berupa titik, dan ruang jatuhnya cukup tinggi. Hindari kesalahan konsep paling sering: jangan pernah menggambar gaya dorong ke samping pada diagram benda bebas saat benda sudah melayang di udara!',
  },
  {
    level: 3,
    shortTitle: 'Level 3',
    title: 'Persamaan Matematis: Penurunan Runtut dari Vektor ke Rumus Akhir',
    subtitle: 'Penurunan lengkap dot product, waktu kritis, jarak pisah, dan variasi sudut.',
    diagramKind: 'penurunan-rumus',
    sections: [
      {
        heading: 'Penurunan Langkah demi Langkah Soal Nomor 3',
        paragraphs: [
          'Tetapkan titik pelepasan sebagai pusat koordinat $O(0,0)$, sumbu $+x$ ke kanan, dan sumbu $+y$ ke atas. Pada $t = 0$, benda 1 memiliki kecepatan $(+v_1, 0)$ dan benda 2 memiliki kecepatan $(-v_2, 0)$.',
          'Dengan mengintegralkan percepatan $\\vec{a} = (0, -g)$ terhadap waktu, kita memperoleh vektor kecepatan dan posisi kedua benda secara eksak.',
        ],
      },
    ],
    formulas: [
      {
        name: '1. Vektor Kecepatan Sesaat',
        latex: '\\vec{v}_1(t) = v_1\\hat{i} - gt\\hat{j}, \\qquad \\vec{v}_2(t) = -v_2\\hat{i} - gt\\hat{j}',
        variables: [
          { symbol: '\\hat{i}, \\hat{j}', meaning: 'Vektor satuan arah $+x$ (kanan) dan $+y$ (atas)', unit: '-' },
          { symbol: 'v_1, v_2', meaning: 'Besar kelajuan awal horizontal', unit: '$\\text{m/s}$' },
        ],
        physicalMeaning: 'Komponen mendatar tetap, sedangkan komponen vertikal bertambah negatif secara serempak.',
        validityCondition: 'Berlaku saat $v_{1y0} = v_{2y0} = 0$ dan tidak ada percepatan horizontal.',
        workedExample: 'Untuk $v_1=3$, $v_2=4$, $g=10$ pada $t=0{,}5\\text{ s}$: $\\vec{v}_1 = 3\\hat{i} - 5\\hat{j}$ dan $\\vec{v}_2 = -4\\hat{i} - 5\\hat{j}$.',
      },
      {
        name: '2. Syarat Ketegaklurusan (Dot Product)',
        latex: '\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0 \\implies -v_1 v_2 + g^2 t^2 = 0 \\implies t_{\\perp} = \\frac{\\sqrt{v_1 v_2}}{g}',
        variables: [
          { symbol: 't_{\\perp}', meaning: 'Waktu saat kedua vektor kecepatan membentuk sudut $90^\\circ$', unit: '$\\text{s}$' },
        ],
        physicalMeaning: 'Waktu tegak lurus merupakan rata-rata geometrik dari kedua kelajuan awal dibagi gravitasi.',
        validityCondition: 'Berlaku selama kedua benda diluncurkan horizontal berlawanan arah secara bersamaan.',
        workedExample: 'Jika $v_1 = 4\\text{ m/s}$, $v_2 = 9\\text{ m/s}$, $g = 10\\text{ m/s}^2$, maka $t_{\\perp} = \\sqrt{36}/10 = 0{,}6\\text{ s}$.',
      },
      {
        name: '3. Jarak Pisah Antar Benda Saat Tegak Lurus',
        latex: 'd = |x_1(t_{\\perp}) - x_2(t_{\\perp})| = (v_1 + v_2)t_{\\perp} = \\frac{(v_1 + v_2)\\sqrt{v_1 v_2}}{g}',
        variables: [
          { symbol: 'd', meaning: 'Jarak lurus antara kedua benda', unit: '$\\text{m}$' },
        ],
        physicalMeaning: 'Karena $y_1(t) = y_2(t)$, jarak pisah murni bergantung pada penjumlahan kelajuan horizontal dikali waktu kritis.',
        validityCondition: 'Berlaku bila kedua benda mulai dari titik yang sama dengan ketinggian tetap sejajar.',
        workedExample: 'Untuk $v_1=3$, $v_2=4$, $g=9{,}8$: $d = 7\\sqrt{12}/9{,}8 \\approx 2{,}5\\text{ m}$.',
      },
    ],
    narrationScript:
      'Mari kita turunkan persamaannya secara runtut di Level tiga! Pertama, tulis vektor kecepatan masing-masing: v satu sama dengan v satu i topi dikurangi g t j topi, dan v dua sama dengan minus v dua i topi dikurangi g t j topi. Kedua, dua vektor saling tegak lurus bila hasil kali titiknya nol: minus v satu kali v dua ditambah g kuadrat t kuadrat sama dengan nol. Dari sini kita dapatkan waktu tegak lurus t sama dengan akar dari v satu kali v dua dibagi g. Ketiga, karena posisi vertikal kedua benda selalu sama, jarak antara keduanya hanyalah jumlah kecepatan awal v satu tambah v dua dikalikan waktu t tersebut!',
  },
  {
    level: 4,
    shortTitle: 'Level 4',
    title: 'Analisis Fisika: Kerangka Berpikir Sistematis & Uji Kewajaran',
    subtitle: 'Langkah sistematis membedah soal OSN dan memeriksa jebakan angka.',
    diagramKind: 'alur-analisis',
    sections: [
      {
        heading: 'Protokol 5 Langkah Membedah Soal Kinematika Proyektil',
        paragraphs: [
          'Siswa sering terjebak langsung memasukkan angka ke rumus hafalan. Ketika soal dimodifikasi sedikit—misalnya posisi awal terpisah, ada selang waktu tunda $\\Delta t$, atau sudut lemparan miring—rumus hafalan langsung gagal. Gunakan protokol 5 langkah berikut:',
        ],
        bullets: [
          'Langkah 1 (Identifikasi Koordinat & Waktu Nol): Tetapkan asal koordinat $(0,0)$ dan pastikan apakah kedua benda mulai pada saat yang sama ($t=0$) atau ada jeda $\\Delta t$.',
          'Langkah 2 (Cek Gaya & Percepatan): Gambar FBD! Jika hanya gravitasi bekerja, $\\vec{a} = (0, -g)$. Jika ada angin horizontal seragam, $\\vec{a} = (a_x, -g)$.',
          'Langkah 3 (Bangun Fungsi Vektor $\\vec{v}_1(t)$ dan $\\vec{v}_2(t)$): Tuliskan komponen $x$ dan $y$ secara eksplisit sebelum melakukan operasi apa pun.',
          'Langkah 4 (Terapkan Kondisi Geometris): Tegak lurus berarti $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$; sudut $\\theta$ berarti $\\vec{v}_1 \\cdot \\vec{v}_2 = |\\vec{v}_1||\\vec{v}_2|\\cos\\theta$. Cek selalu tanda $\\cos\\theta$!',
          'Langkah 5 (Uji Dimensi & Kewajaran): Pastikan satuan hasil akhir sesuai (misal $\\frac{[v]^2}{[g]} = \\frac{\\text{m}^2/\\text{s}^2}{\\text{m}/\\text{s}^2} = \\text{m}$) dan nilainya masuk akal.',
        ],
      },
    ],
    commonMisconceptions: [
      {
        wrong: 'Membulatkan $t$ menjadi satu angka di belakang koma di tengah perhitungan, lalu mengalikannya lagi.',
        right: 'Pertahankan minimal 4–5 angka signifikan selama perhitungan antara, dan lakukan pembulatan 1 angka di belakang koma HANYA di hasil akhir!',
      },
      {
        wrong: 'Menggunakan tanda titik (.) atau menulis lebih dari satu angka desimal pada isian singkat.',
        right: 'Sesuai standar jawaban aplikasi ini, gunakan tanda koma (,) dengan tepat satu angka di belakang koma (misal `2,5` atau `7,0`).',
      },
    ],
    narrationScript:
      'Di Level empat ini kita melatih cara berpikir seperti peserta OSN sungguhan. Jangan langsung menebak rumus hafalan! Selalu ikuti lima langkah: tetapkan koordinat dan waktu nol, periksa gaya pada Free Body Diagram, tuliskan vektor kecepatan kedua benda secara lengkap, terapkan syarat dot product sesuai sudut yang diminta, lalu uji dimensi dan kewajaran angkanya. Ingat juga aturan penting: jangan pernah membulatkan nilai waktu di tengah jalan! Simpan ketelitian penuh sampai langkah terakhir, barulah dibulatkan satu angka di belakang koma dengan tanda koma.',
  },
  {
    level: 5,
    shortTitle: 'Level 5',
    title: 'Strategi Olimpiade: Kerangka Gerak Relatif & Kasus Khusus',
    subtitle: 'Menyelesaikan soal HOTS multi-langkah dalam hitungan detik secara elegan.',
    diagramKind: 'strategi-relatif',
    sections: [
      {
        heading: 'Senjata Rahasia: Pindah ke Kerangka Acuan Benda Pertama!',
        paragraphs: [
          'Mengapa soal dengan sudut miring $37^\\circ$ (Soal 10) atau soal dengan angin konstan $a_x$ (Soal 13) tetap memiliki jarak pisah yang berbanding lurus dengan $t$?',
          'Jawabannya ada pada percepatan relatif: $\\vec{a}_{\\text{rel}} = \\vec{a}_1 - \\vec{a}_2$. Selama kedua benda mengalami medan gaya per satuan massa yang sama ($\\vec{a}_1 = \\vec{a}_2$), maka di mata benda pertama, benda kedua **sama sekali tidak mengalami percepatan**! Benda kedua tampak bergerak lurus beraturan sepanjang garis lurus dengan kecepatan relatif konstan $\\vec{v}_{\\text{rel}} = \\vec{v}_1(0) - \\vec{v}_2(0)$.',
        ],
        bullets: [
          'Kasus Simetris ($v_1 = v_2 = v_0$): sudut masing-masing ke vertikal tepat $45^\\circ$, sehingga $t_{\\perp} = v_0/g$ dan $d = 2v_0^2/g$.',
          'Penurunan Ketinggian Tanpa Cari $t$: $\\Delta y = \\frac{1}{2}gt_{\\perp}^2 = \\frac{v_1 v_2}{2g}$.',
          'Rasio Energi Kinetik ($m_1 = m_2$): saat vektor kecepatan tegak lurus, $\\frac{E_{k2}}{E_{k1}} = \\frac{v_2^2 + v_1 v_2}{v_1^2 + v_1 v_2} = \\frac{v_2}{v_1}$ (bebas dari $g$!).',
          'Sudut Umum $\\theta$: daripada mengkuadratkan dot product (yang memunculkan akar palsu $180^\\circ - \\theta$), pakai identitas tangen $\\tan(\\alpha_1 + \\alpha_2) = \\tan\\theta$!',
        ],
      },
    ],
    narrationScript:
      'Selamat tiba di Level lima, Strategi Olimpiade! Senjata terkuat untuk menaklukkan variasi soal nomor tiga adalah kerangka gerak relatif. Selama kedua benda dilepas bersamaan dari satu titik dan mengalami percepatan yang sama—entah karena gravitasi saja ataupun ditambah angin seragam—percepatan relatif antar keduanya selalu nol! Artinya jarak pisah selalu sama dengan besar selisih vektor kecepatan awal dikali waktu t. Selain itu, ingat trik aljabar cepat: penurunan tinggi adalah v satu kali v dua per dua g, dan rasio energi kinetik untuk massa sama saat tegak lurus ternyata tepat sama dengan rasio kelajuan awalnya v dua per v satu!',
  },
];
