import { PhysicsScenarioConfig } from './simulationMath';

export type DifficultyTier =
  | 'Fundamental'
  | 'Menengah'
  | 'Menengah Lanjut'
  | 'Lanjut'
  | 'HOTS Olimpiade';

export interface FBDForce {
  label: string;
  symbolLatex: string;
  directionDeg: number; // 0 = right, 90 = up, 180 = left, 270 = down
  color: string;
  description: string;
}

export interface TextbookExplanation {
  memahamiSoal: {
    diketahui: string[];
    ditanyakan: string;
    kondisiFisika: string;
    asumsi: string[];
  };
  identifikasiKonsep: {
    prinsip: string;
    alasan: string;
    hukum: string;
  };
  visualisasiCatatan: string;
  pemilihanPersamaan: {
    rumusUtamaLatex: string;
    maknaRumus: string;
    alasanSesuai: string;
  };
  penyelesaianMatematis: string[];
  hasilAkhir: {
    nilaiEksak: string;
    dibulatkan: string;
    satuan: string;
  };
  interpretasiFisis: string;
  strategiCepat: {
    metode: string;
    kapanBerlaku: string;
    peringatanKesalahan: string;
  };
}

export interface MisterJoNarration {
  soalTextSpoken: string;
  stimulusSpoken: string;
  fbdSpoken: string;
  persamaanSpoken: string;
  penyelesaianSpoken: string;
  interpretasiSpoken: string;
  strategiSpoken: string;
}

export interface PhysicsProblem {
  id: number;
  title: string;
  difficulty: DifficultyTier;
  topicTag: string;
  questionText: string;
  unit: string;
  expectedValue: number;
  expectedFormatted: string;
  stimulusLabel: string;
  stimulusType: 'diagram' | 'vector' | 'graph-drop' | 'graph-angle' | 'triangle-area' | 'bounce';
  stimulusNote: string;
  fbdTitle: string;
  fbdNote: string;
  fbdForces: FBDForce[];
  hintOnWrong: string;
  physicsConfig: PhysicsScenarioConfig;
  explanation: TextbookExplanation;
  narration: MisterJoNarration;
}

export const PROBLEMS: PhysicsProblem[] = [
  // =========================================================================
  // SOAL 1 — FUNDAMENTAL
  // =========================================================================
  {
    id: 1,
    title: 'Waktu Saat Vektor Kecepatan Saling Tegak Lurus',
    difficulty: 'Fundamental',
    topicTag: 'Dot Product & Kecepatan Proyektil',
    questionText:
      'Dua buah bola kecil dilemparkan secara bersamaan dari satu titik yang sama di udara dengan kecepatan awal horizontal berlawanan arah, masing-masing $v_1 = 4{,}0\\text{ m/s}$ ke kanan dan $v_2 = 9{,}0\\text{ m/s}$ ke kiri. Medan gravitasi homogen memiliki percepatan $g = 10{,}0\\text{ m/s}^2$ dan hambatan udara diabaikan. Tentukan waktu yang dibutuhkan sejak awal pelemparan hingga vektor kecepatan kedua bola menjadi saling tegak lurus!',
    unit: 's',
    expectedValue: 0.6,
    expectedFormatted: '0,6',
    stimulusLabel: 'Skema Peluncuran Horizontal Berlawanan dari Satu Titik',
    stimulusType: 'diagram',
    stimulusNote:
      'Kedua bola dilepas serentak dari titik asal O dengan kelajuan horizontal murni yang berlawanan arah.',
    fbdTitle: 'Free Body Diagram (FBD) Bola Selama Melayang',
    fbdNote:
      'Setelah terlepas dari tangan pelempar dan hambatan udara diabaikan, hanya gaya gravitasi yang bekerja pada masing-masing bola.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Satu-satunya gaya nyata yang bekerja ke arah vertikal bawah (-y).',
      },
    ],
    hintOnWrong:
      'Tuliskan vektor kecepatan $\\vec{v}_1(t) = v_1\\hat{i} - gt\\hat{j}$ dan $\\vec{v}_2(t) = -v_2\\hat{i} - gt\\hat{j}$, lalu terapkan syarat tegak lurus $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
    physicsConfig: {
      v1: 4.0,
      v2: 9.0,
      g: 10.0,
      tMax: 1.0,
      tStar: 0.6,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal benda 1: $\\vec{v}_{1}(0) = +4{,}0\\hat{i}\\text{ m/s}$',
          'Kecepatan awal benda 2: $\\vec{v}_{2}(0) = -9{,}0\\hat{i}\\text{ m/s}$',
          'Percepatan gravitasi homogen: $g = 10{,}0\\text{ m/s}^2$ ke bawah ($-\\hat{j}$)',
        ],
        ditanyakan: 'Waktu $t$ saat $\\vec{v}_1(t) \\perp \\vec{v}_2(t)$ (dalam satuan detik).',
        kondisiFisika:
          'Kedua benda mengalami gerak parabola horizontal (GLB pada sumbu-$x$ dan jatuh bebas GLBB pada sumbu-$y$) dari titik awal yang sama.',
        asumsi: [
          'Medan gravitasi homogen dan konstan.',
          'Hambatan udara diabaikan.',
          'Kedua benda dianggap partikel titik.',
        ],
      },
      identifikasiKonsep: {
        prinsip: 'Superposisi Gerak 2D dan Syarat Ketegaklurusan Vektor (Dot Product).',
        alasan:
          'Ketegaklurusan dua vektor kecepatan di ruang 2D paling ringkas dan eksak dinyatakan melalui hasil kali titik bernilai nol.',
        hukum: 'Hukum II Newton pada gerak parabola ($a_x = 0, a_y = -g$) serta $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
      },
      visualisasiCatatan:
        'Perhatikan pada animasi bahwa komponen vertikal $v_y(t) = -gt$ tumbuh secara identik pada kedua benda. Sudut antara $\\vec{v}_1$ dan $\\vec{v}_2$ mula-mula $180^\\circ$, lalu menyempit hingga tepat $90^\\circ$ pada $t = 0{,}6\\text{ s}$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: '\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = v_{1x}v_{2x} + v_{1y}v_{2y} = 0',
        maknaRumus:
          'Dua vektor tak nol saling tegak lurus jika dan hanya jika hasil kali skalar (dot product) kedua vektor tersebut sama dengan nol.',
        alasanSesuai:
          'Komponen horizontal kedua benda konstan, sedangkan komponen vertikalnya sama-sama $-gt$, sehingga langsung menghasilkan persamaan kuadrat sederhana untuk $t$.',
      },
      penyelesaianMatematis: [
        'Nyatakan vektor kecepatan masing-masing benda pada waktu $t$: $$\\vec{v}_1(t) = 4{,}0\\hat{i} - 10{,}0t\\hat{j}, \\qquad \\vec{v}_2(t) = -9{,}0\\hat{i} - 10{,}0t\\hat{j}$$',
        'Terapkan syarat saling tegak lurus $\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0$: $$(4{,}0)(-9{,}0) + (-10{,}0t)(-10{,}0t) = 0$$',
        'Sederhanakan operasi aljabar: $$-36{,}0 + 100{,}0t^2 = 0 \\implies 100{,}0t^2 = 36{,}0$$',
        'Selesaikan untuk $t > 0$: $$t^2 = \\frac{36{,}0}{100{,}0} = 0{,}36 \\implies t = \\sqrt{0{,}36} = 0{,}6\\text{ s}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '0,6',
        dibulatkan: '0,6',
        satuan: 's',
      },
      interpretasiFisis:
        'Pada $t = 0{,}6\\text{ s}$, kedua benda telah memperoleh kecepatan vertikal $v_y = -6{,}0\\text{ m/s}$. Gradien arah gerak bola 1 adalah $-6/4 = -3/2$, sedangkan bola 2 adalah $-6/(-9) = +2/3$. Perkalian kedua gradien sama dengan $-1$, membuktikan keduanya benar-benar tegak lurus!',
      strategiCepat: {
        metode:
          'Hafal & pahami bentuk ringkas untuk dua peluncuran horizontal berlawanan: $t_{\\perp} = \\frac{\\sqrt{v_1 v_2}}{g}$ (rata-rata geometrik kelajuan awal dibagi $g$).',
        kapanBerlaku:
          'Berlaku khusus jika kedua kecepatan awal murni horizontal berlawanan arah dan percepatan vertikal keduanya sama besar sebesar $g$.',
        peringatanKesalahan:
          'Jangan menjumlahkan atau mengurangkan kecepatan secara skalar untuk mencari waktu tegak lurus; selalu periksa tanda negatif pada komponen $v_x$ yang berlawanan.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor satu, tingkat fundamental. Dua buah bola kecil dilemparkan secara bersamaan dari satu titik yang sama di udara dengan kecepatan awal horizontal berlawanan arah, masing-masing v satu sama dengan empat koma nol meter per detik ke kanan, dan v dua sama dengan sembilan koma nol meter per detik ke kiri. Medan gravitasi homogen memiliki percepatan g sama dengan sepuluh koma nol meter per detik kuadrat. Tentukan waktu saat vektor kecepatan kedua bola menjadi saling tegak lurus.',
      stimulusSpoken:
        'Perhatikan diagram awal. Kedua bola berada di titik asal yang sama. Bola satu bergerak ke kanan, bola dua ke kiri. Keduanya belum memiliki komponen kecepatan vertikal pada t sama dengan nol.',
      fbdSpoken:
        'Pada Free Body Diagram, ketika bola melayang di udara tanpa gesekan, satu-satunya gaya yang bekerja hanyalah gaya berat W sama dengan m kali g yang arahnya tegak lurus ke bawah. Tidak ada gaya dorong ke samping.',
      persamaanSpoken:
        'Karena hanya gaya gravitasi yang bekerja ke bawah, kecepatan horizontal tetap, sedangkan kecepatan vertikal kedua bola sama-sama minus g kali t. Syarat tegak lurus adalah dot product vektor v satu dan vektor v dua sama dengan nol.',
      penyelesaianSpoken:
        'Kita kalikan komponen sejajarnya: empat kali minus sembilan ditambah minus sepuluh t kali minus sepuluh t sama dengan nol. Kita peroleh seratus t kuadrat sama dengan tiga puluh enam, sehingga t kuadrat sama dengan nol koma tiga enam, dan t sama dengan nol koma enam detik.',
      interpretasiSpoken:
        'Pada nol koma enam detik, kecepatan vertikal mencapai minus enam meter per detik. Hasil perkalian kemiringan arah gerak kedua vektor menjadi minus satu, membuktikan sudutnya tepat sembilan puluh derajat.',
      strategiSpoken:
        'Trik cepat olimpiade: untuk peluncuran horizontal berlawanan arah, waktu tegak lurus selalu sama dengan akar dari v satu kali v dua, lalu dibagi g.',
    },
  },

  // =========================================================================
  // SOAL 2 — FUNDAMENTAL (IDENTIK DENGAN SOAL SUMBER NO. 3 OSK 2026)
  // =========================================================================
  {
    id: 2,
    title: 'Jarak Pisah Saat Kecepatan Saling Tegak Lurus (Soal Sumber No. 3)',
    difficulty: 'Fundamental',
    topicTag: 'Kinematika Relatif & Soal Sumber OSK',
    questionText:
      'Dua buah benda bergerak dalam medan gravitasi homogen dengan percepatan $g = 9{,}8\\text{ m/s}^2$. Pada saat awal, benda-benda tersebut terletak di satu titik dan bergerak dengan kecepatan $v_1 = 3{,}0\\text{ m/s}$ dan $v_2 = 4{,}0\\text{ m/s}$ secara horizontal dalam arah yang berlawanan. Jarak antara kedua benda pada saat vektor kecepatan mereka menjadi saling tegak lurus adalah ...',
    unit: 'm',
    expectedValue: 2.5,
    expectedFormatted: '2,5',
    stimulusLabel: 'Representasi Langsung Soal Nomor 3 Dokumen OSK Fisika 2026',
    stimulusType: 'vector',
    stimulusNote:
      'Konfigurasi identik dengan Soal Nomor 3 OSK Fisika SMA 2026 (dengan g = 9,8 m/s²). Perhatikan kesamaan posisi vertikal kedua benda setiap saat.',
    fbdTitle: 'Free Body Diagram (FBD) Masing-Masing Benda',
    fbdNote:
      'Kedua benda berada dalam medan gravitasi homogen yang sama, sehingga percepatan vertikal keduanya identik.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya gravitasi konstan ke arah bawah pada setiap benda.',
      },
    ],
    hintOnWrong:
      'Cari terlebih dahulu waktu $t$ ketika $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$. Ingat bahwa kedua benda jatuh dengan ketinggian yang selalu sama, sehingga jarak pisahnya murni horizontal: $d = (v_1 + v_2)t$.',
    physicsConfig: {
      v1: 3.0,
      v2: 4.0,
      g: 9.8,
      tMax: 0.7,
      tStar: Math.sqrt(12) / 9.8,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal horizontal benda 1: $v_1 = 3{,}0\\text{ m/s}$ (arah $+x$)',
          'Kecepatan awal horizontal benda 2: $v_2 = 4{,}0\\text{ m/s}$ (arah $-x$)',
          'Percepatan gravitasi homogen: $g = 9{,}8\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak antara kedua benda $d$ tepat saat $\\vec{v}_1 \\perp \\vec{v}_2$ (dalam meter).',
        kondisiFisika:
          'Kedua benda berangkat dari koordinat awal yang sama $(0,0)$, jatuh bersamaan pada kedalaman yang selalu sama $y_1(t) = y_2(t) = -\\frac{1}{2}gt^2$.',
        asumsi: [
          'Medan gravitasi seragam $g = 9{,}8\\text{ m/s}^2$.',
          'Tidak ada gaya gesek udara.',
        ],
      },
      identifikasiKonsep: {
        prinsip: 'Kinematika Relatif dalam Medan Gravitasi Homogen & Dot Product.',
        alasan:
          'Dalam kerangka acuan benda pertama, benda kedua tidak mengalami percepatan relatif ($\\vec{a}_{\\text{rel}} = \\vec{g} - \\vec{g} = \\vec{0}$), sehingga bergerak lurus beraturan horizontal dengan kelajuan relatif $v_1 + v_2$.',
        hukum: 'Superposisi GLB-GLBB dan $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
      },
      visualisasiCatatan:
        'Pada animasi, garis putus-putus penghubung antara benda 1 dan benda 2 selalu datar (horizontal) karena $y_1(t) = y_2(t)$. Panjang garis datar itulah jarak pisah $d$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 't = \\frac{\\sqrt{v_1 v_2}}{g}, \\qquad d = (v_1 + v_2)t = \\frac{(v_1 + v_2)\\sqrt{v_1 v_2}}{g}',
        maknaRumus:
          'Waktu tegak lurus ditentukan oleh dot product komponen kecepatan, sedangkan jarak pisah hanyalah kecepatan relatif horizontal dikalikan waktu tersebut.',
        alasanSesuai:
          'Karena tidak ada perbedaan posisi vertikal, perhitungan jarak 2D tereduksi sempurna menjadi jarak horizontal 1D.',
      },
      penyelesaianMatematis: [
        'Tulis vektor kecepatan pada saat $t$: $$\\vec{v}_1(t) = 3{,}0\\hat{i} - gt\\hat{j}, \\qquad \\vec{v}_2(t) = -4{,}0\\hat{i} - gt\\hat{j}$$',
        'Terapkan syarat tegak lurus $\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0$: $$(3{,}0)(-4{,}0) + (-gt)(-gt) = 0 \\implies g^2 t^2 = 12{,}0$$',
        'Hitung waktu $t$ dengan $g = 9{,}8\\text{ m/s}^2$: $$t = \\frac{\\sqrt{12{,}0}}{9{,}8} = \\frac{3{,}46410}{9{,}8} \\approx 0{,}35348\\text{ s}$$',
        'Hitung jarak pisah antara kedua benda: $$d = (v_1 + v_2)t = (3{,}0 + 4{,}0) \\times 0{,}35348\\text{ m} = 7{,}0 \\times 0{,}35348\\text{ m} \\approx 2{,}4744\\text{ m}$$',
        'Bulatkan menjadi satu angka di belakang koma: $$d = 2{,}5\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '2,4744...',
        dibulatkan: '2,5',
        satuan: 'm',
      },
      interpretasiFisis:
        'Dalam waktu sekitar $0{,}35\\text{ s}$, kedua benda hanya sempat terpisah sejauh $2{,}5\\text{ m}$ secara horizontal ketika arah gerak keduanya sudah membentuk sudut siku-siku. Nilai ini sangat wajar untuk lemparan berkecepatan sedang di dekat permukaan Bumi.',
      strategiCepat: {
        metode:
          'Langsung gunakan rumus tertutup: $d = \\frac{(v_1 + v_2)\\sqrt{v_1 v_2}}{g}$. Jangan membulatkan nilai $t$ terlalu dini di tengah hitungan!',
        kapanBerlaku:
          'Berlaku jika kedua benda mulai dari titik yang sama dengan kecepatan awal horizontal berlawanan arah.',
        peringatanKesalahan:
          'Kesalahan umum: membulatkan $\\sqrt{12} \\approx 3{,}5$ dan $t \\approx 0{,}35$ lalu mengalikan $7 \\times 0{,}35 = 2{,}45 \\to 2{,}5$ (kebetulan sama, tetapi di soal lain pembulatan dini bisa menggeser hasil akhir!). Simpan ketelitian penuh hingga langkah terakhir.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor dua, ini adalah versi langsung dari soal sumber nomor tiga OSK Fisika dua ribu dua puluh enam. Dua buah benda bergerak dalam medan gravitasi homogen dengan percepatan g sama dengan sembilan koma delapan meter per detik kuadrat. Pada saat awal, benda-benda terletak di satu titik dan bergerak dengan kecepatan v satu sama dengan tiga koma nol meter per detik dan v dua sama dengan empat koma nol meter per detik secara horizontal dalam arah berlawanan. Berapakah jarak antara kedua benda pada saat vektor kecepatan mereka saling tegak lurus?',
      stimulusSpoken:
        'Lihat ilustrasi vektor. Benda pertama ke kanan tiga meter per detik, benda kedua ke kiri empat meter per detik. Keduanya jatuh bersama sehingga garis hubung antar keduanya selalu datar.',
      fbdSpoken:
        'Free Body Diagram untuk masing-masing benda hanya memiliki satu gaya, yaitu gaya berat W sama dengan m kali g mengarah ke bawah. Oleh karena itu percepatan relatif antara kedua benda adalah nol.',
      persamaanSpoken:
        'Dari dot product v satu dot v dua sama dengan nol, kita dapatkan g kuadrat kali t kuadrat sama dengan tiga kali empat, yaitu dua belas. Sedangkan jaraknya adalah jumlah kelajuan awal v satu tambah v dua dikali waktu t.',
      penyelesaianSpoken:
        'Waktu t sama dengan akar dua belas dibagi sembilan koma delapan, hasilnya sekitar nol koma tiga lima tiga lima detik. Kemudian jarak pisahnya sama dengan tujuh dikali nol koma tiga lima tiga lima, menghasilkan dua koma empat tujuh empat meter. Dibulatkan satu angka di belakang koma menjadi dua koma lima meter.',
      interpretasiSpoken:
        'Secara fisis, tidak adanya percepatan relatif membuat jarak pisah tumbuh linear terhadap waktu, sehingga begitu arah gerak saling tegak lurus di nol koma tiga lima detik, kedua benda terpisah dua koma lima meter.',
      strategiSpoken:
        'Tips Mister Jo: jangan membulatkan nilai waktu di tengah perhitungan. Gunakan rumus gabungan tujuh kali akar dua belas dibagi sembilan koma delapan baru dibulatkan di akhir.',
    },
  },

  // =========================================================================
  // SOAL 3 — FUNDAMENTAL
  // =========================================================================
  {
    id: 3,
    title: 'Kasus Simetris: Kecepatan Awal Sama Besar',
    difficulty: 'Fundamental',
    topicTag: 'Simetri Gerak Parabola',
    questionText:
      'Dua partikel kecil dilepaskan secara bersamaan dari satu titik yang sama dengan kecepatan awal horizontal berlawanan arah yang sama besar, yaitu $v_1 = v_2 = 6{,}0\\text{ m/s}$, dalam medan gravitasi homogen $g = 9{,}8\\text{ m/s}^2$. Tentukan jarak pisah antara kedua partikel tepat pada saat vektor kecepatan mereka membentuk sudut $90^\\circ$!',
    unit: 'm',
    expectedValue: 7.3,
    expectedFormatted: '7,3',
    stimulusLabel: 'Simetri Lintasan Parabola ($v_1 = v_2 = 6,0\\text{ m/s}$)',
    stimulusType: 'diagram',
    stimulusNote:
      'Karena kelajuan awal simetris, sudut yang dibentuk masing-masing vektor kecepatan terhadap sumbu vertikal pada saat tegak lurus adalah tepat $45^\\circ$.',
    fbdTitle: 'Free Body Diagram (FBD) Simetris',
    fbdNote: 'Hanya gaya gravitasi konstan ke bawah yang bekerja pada kedua partikel.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya berat vertikal ke bawah pada tiap partikel.',
      },
    ],
    hintOnWrong:
      'Pada kasus simetris $v_1 = v_2 = v_0$, vektor kecepatan saling tegak lurus saat masing-masing membentuk sudut $45^\\circ$ terhadap vertikal, yakni ketika $|v_y| = v_0$.',
    physicsConfig: {
      v1: 6.0,
      v2: 6.0,
      g: 9.8,
      tMax: 1.0,
      tStar: 6.0 / 9.8,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal horizontal simetris: $v_1 = 6{,}0\\text{ m/s}$ dan $v_2 = 6{,}0\\text{ m/s}$ berlawanan arah',
          'Percepatan gravitasi homogen: $g = 9{,}8\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak pisah kedua partikel $d$ ketika sudut antar vektor kecepatannya $90^\\circ$.',
        kondisiFisika:
          'Kedua lintasan parabola simetris terhadap sumbu vertikal melalui titik asal.',
        asumsi: ['Tanpa hambatan udara, medan gravitasi homogen.'],
      },
      identifikasiKonsep: {
        prinsip: 'Simetri Vektor Kecepatan 2D dan Kinematika Relatif.',
        alasan:
          'Jika dua vektor yang simetris terhadap garis vertikal saling tegak lurus, masing-masing vektor harus membentuk sudut $45^\\circ$ dengan sumbu vertikal.',
        hukum: 'Persamaan kecepatan GLBB vertikal $v_y = -gt$ dan GLB horizontal.',
      },
      visualisasiCatatan:
        'Amati pada animasi bahwa ketika garis vektor $\\vec{v}_1$ dan $\\vec{v}_2$ membentuk sudut siku-siku di bawah partikel, besar komponen $v_y$ tepat sama dengan $v_x = 6{,}0\\text{ m/s}$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 'v_y = gt = v_0 \\implies t = \\frac{v_0}{g}, \\qquad d = 2 v_0 t = \\frac{2 v_0^2}{g}',
        maknaRumus:
          'Syarat kemiringan $45^\\circ$ ($\\tan 45^\\circ = |v_y|/v_0 = 1$) langsung memberikan waktu tegak lurus tanpa perhitungan akar.',
        alasanSesuai:
          'Merupakan bentuk khusus dari $t = \\sqrt{v_1 v_2}/g$ ketika $v_1 = v_2 = v_0$.',
      },
      penyelesaianMatematis: [
        'Dari syarat tegak lurus: $$\\vec{v}_1 \\cdot \\vec{v}_2 = -(6{,}0)(6{,}0) + (9{,}8t)^2 = 0$$',
        'Selesaikan untuk $t$: $$9{,}8t = 6{,}0 \\implies t = \\frac{6{,}0}{9{,}8}\\text{ s} \\approx 0{,}612245\\text{ s}$$',
        'Hitung jarak pisah kedua partikel: $$d = (6{,}0 + 6{,}0) \\times \\frac{6{,}0}{9{,}8} = \\frac{72{,}0}{9{,}8}\\text{ m} \\approx 7{,}3469\\text{ m}$$',
        'Pembulatan satu angka di belakang koma: $$d = 7{,}3\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '7,3469...',
        dibulatkan: '7,3',
        satuan: 'm',
      },
      interpretasiFisis:
        'Jika kecepatan awal diperbesar menjadi $6{,}0\\text{ m/s}$, jarak pisah meningkat secara kuadratik terhadap $v_0$ ($d \\propto v_0^2$), sehingga jauh lebih besar daripada soal nomor 2.',
      strategiCepat: {
        metode:
          'Untuk kasus simetris $v_1 = v_2 = v_0$, langsung pakai $d = \\frac{2v_0^2}{g}$. Di sini $2 \\times 36 / 9{,}8 = 72/9{,}8 = 7{,}35 \\to 7{,}3\\text{ m}$ (cek eksak: $7{,}3469$).',
        kapanBerlaku: 'Khusus saat kedua kecepatan awal horizontal sama besar dan berlawanan arah.',
        peringatanKesalahan:
          'Waspada pembulatan: $72 / 9{,}8 = 7{,}3469...$, angka desimal kedua adalah $4$, sehingga dibulatkan ke bawah menjadi $7{,}3$, bukan $7{,}4$.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor tiga. Dua partikel kecil dilepaskan bersamaan dari satu titik dengan kecepatan awal horizontal berlawanan arah yang sama besar, yaitu v satu sama dengan v dua sama dengan enam koma nol meter per detik, dalam medan gravitasi sembilan koma delapan meter per detik kuadrat. Berapa jarak pisah kedua partikel tepat saat vektor kecepatan mereka membentuk sudut sembilan puluh derajat?',
      stimulusSpoken:
        'Karena kedua kecepatan awal sama besar, lintasan kedua partikel simetris kiri dan kanan terhadap garis vertikal.',
      fbdSpoken:
        'Gaya yang bekerja tetap hanya gaya berat W sama dengan m kali g ke bawah pada masing-masing partikel.',
      persamaanSpoken:
        'Secara geometris, dua vektor simetris yang saling tegak lurus pasti membentuk sudut empat puluh lima derajat terhadap sumbu vertikal. Artinya besar komponen kecepatan vertikal g kali t tepat sama dengan kecepatan horizontalnya, yaitu enam meter per detik.',
      penyelesaianSpoken:
        'Waktu tegak lurus adalah enam dibagi sembilan koma delapan detik. Jarak pisahnya sama dengan dua kali enam dikalikan waktu tersebut, yaitu tujuh puluh dua dibagi sembilan koma delapan, menghasilkan tujuh koma tiga empat enam sembilan meter. Dibulatkan menjadi tujuh koma tiga meter.',
      interpretasiSpoken:
        'Perhatikan bahwa jarak pisah sebanding dengan kuadrat kelajuan awal. Ketika kelajuan naik, butuh waktu lebih lama bagi gravitasi untuk menekuk arah gerak hingga empat puluh lima derajat.',
      strategiSpoken:
        'Untuk kasus simetris v satu sama dengan v dua sama dengan v nol, ingat rumus cepat dua v nol kuadrat dibagi g.',
    },
  },

  // =========================================================================
  // SOAL 4 — MENENGAH
  // =========================================================================
  {
    id: 4,
    title: 'Penurunan Ketinggian Vertikal Saat Vektor Saling Tegak Lurus',
    difficulty: 'Menengah',
    topicTag: 'Hubungan Jarak Jatuh & Syarat Tegak Lurus',
    questionText:
      'Dua buah kelereng diluncurkan bersamaan dari tepi sebuah tebing tinggi dari satu titik yang sama secara horizontal berlawanan arah dengan kelajuan $v_1 = 4{,}0\\text{ m/s}$ dan $v_2 = 9{,}0\\text{ m/s}$ dalam medan gravitasi homogen $g = 9{,}8\\text{ m/s}^2$. Tentukan besar **penurunan ketinggian vertikal** ($\\Delta y$) yang telah ditempuh kedua kelereng tepat pada saat vektor kecepatan mereka menjadi saling tegak lurus!',
    unit: 'm',
    expectedValue: 1.8,
    expectedFormatted: '1,8',
    stimulusLabel: 'Kurva Penurunan Ketinggian Vertikal $\\Delta y(t)$ Terhadap Waktu',
    stimulusType: 'graph-drop',
    stimulusNote:
      'Grafik menunjukkan jarak jatuh vertikal $\\Delta y = \\frac{1}{2}gt^2$ yang identik untuk kedua kelereng selama melayang.',
    fbdTitle: 'Free Body Diagram (FBD) Kelereng',
    fbdNote: 'Gerak vertikal murni merupakan jatuh bebas di bawah gaya berat konstan.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Menyebabkan percepatan jatuh bebas $a_y = -g$.',
      },
    ],
    hintOnWrong:
      'Setelah memperoleh $g^2 t^2 = v_1 v_2$ dari syarat $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$, substitusikan ke persamaan jatuh bebas $\\Delta y = \\frac{1}{2}gt^2$.',
    physicsConfig: {
      v1: 4.0,
      v2: 9.0,
      g: 9.8,
      tMax: 1.0,
      tStar: 6.0 / 9.8,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan horizontal awal: $v_1 = 4{,}0\\text{ m/s}$, $v_2 = 9{,}0\\text{ m/s}$ (berlawanan arah)',
          'Percepatan gravitasi: $g = 9{,}8\\text{ m/s}^2$',
        ],
        ditanyakan: 'Penurunan ketinggian vertikal $\\Delta y$ (dalam meter) saat $\\vec{v}_1 \\perp \\vec{v}_2$.',
        kondisiFisika: 'Gerak vertikal kedua benda dimulai dengan $v_{0y} = 0$, sehingga jatuh bebas identik.',
        asumsi: ['Tebing cukup tinggi sehingga kelereng belum menyentuh tanah saat $\\vec{v}_1 \\perp \\vec{v}_2$.'],
      },
      identifikasiKonsep: {
        prinsip: 'Hubungan Energi/Kinematika Jatuh Bebas dengan Syarat Ortogonalitas Vektor.',
        alasan:
          'Waktu tegak lurus menentukan kedalaman jatuh melalui persamaan posisi vertikal GLBB.',
        hukum: '$\\Delta y = \\frac{1}{2}gt^2$ dan $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
      },
      visualisasiCatatan:
        'Lihat kurva parabolik $\\Delta y(t)$ terhadap $t$ serta pergerakan vertikal kedua kelereng pada animasi: meski bergerak ke kiri dan kanan dengan laju berbeda, ketinggiannya selalu sejajar.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 'g^2 t^2 = v_1 v_2 \\implies \\Delta y = \\frac{1}{2}gt^2 = \\frac{v_1 v_2}{2g}',
        maknaRumus:
          'Penurunan ketinggian tidak bergantung pada jumlah $v_1 + v_2$, melainkan hanya pada hasil kali $v_1 v_2$ dibagi $2g$.',
        alasanSesuai:
          'Kita bahkan dapat mengeleminasi $t$ secara aljabar melalui $gt^2 = \\frac{v_1 v_2}{g}$.',
      },
      penyelesaianMatematis: [
        'Dari syarat tegak lurus: $$\\vec{v}_1 \\cdot \\vec{v}_2 = -v_1 v_2 + g^2 t^2 = 0 \\implies g^2 t^2 = (4{,}0)(9{,}0) = 36{,}0\\text{ m}^2/\\text{s}^2$$',
        'Bagi kedua ruas dengan $2g$: $$\\Delta y = \\frac{1}{2}gt^2 = \\frac{g^2 t^2}{2g} = \\frac{36{,}0}{2 \\times 9{,}8}$$',
        'Hitung nilai numeriknya: $$\\Delta y = \\frac{36{,}0}{19{,}6} \\approx 1{,}8367\\text{ m}$$',
        'Bulatkan satu angka di belakang koma: $$\\Delta y = 1{,}8\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '1,8367...',
        dibulatkan: '1,8',
        satuan: 'm',
      },
      interpretasiFisis:
        'Sebelum meluncur sejauh $1{,}8\\text{ m}$ ke bawah, kedua kelereng sudah memiliki vektor kecepatan yang saling tegak lurus. Artinya eksperimen ini dapat diamati bahkan dari meja laboratorium setinggi $2\\text{ m}$!',
      strategiCepat: {
        metode:
          'Langsung substitusi ke $\\Delta y = \\frac{v_1 v_2}{2g}$ tanpa perlu menghitung akar kuadrat $\\sqrt{v_1 v_2}$ terlebih dahulu.',
        kapanBerlaku: 'Saat kedua kecepatan awal murni horizontal berlawanan arah.',
        peringatanKesalahan:
          'Jangan lupa faktor $\\frac{1}{2}$ pada $\\frac{1}{2}gt^2$. Banyak siswa keliru menulis $gt^2 = 3{,}7\\text{ m}$.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor empat, tingkat menengah. Dua buah kelereng diluncurkan bersamaan dari tepi tebing tinggi dari satu titik secara horizontal berlawanan arah dengan kelajuan v satu sama dengan empat koma nol meter per detik dan v dua sama dengan sembilan koma nol meter per detik. Percepatan gravitasi g sama dengan sembilan koma delapan meter per detik kuadrat. Tentukan besar penurunan ketinggian vertikal delta y tepat saat vektor kecepatan keduanya saling tegak lurus.',
      stimulusSpoken:
        'Perhatikan grafik penurunan ketinggian terhadap waktu. Karena tidak ada kecepatan awal vertikal, kurva delta y berbentuk parabola setengah g t kuadrat yang identik untuk kedua kelereng.',
      fbdSpoken:
        'Pada diagram benda bebas, gaya berat W sama dengan m kali g mengarah vertikal ke bawah sehingga menghasilkan percepatan jatuh bebas g.',
      persamaanSpoken:
        'Dari syarat tegak lurus kita dapatkan g kuadrat kali t kuadrat sama dengan v satu kali v dua. Jika kedua ruas dibagi dua g, kita langsung memperoleh rumus penurunan ketinggian delta y sama dengan v satu kali v dua dibagi dua g.',
      penyelesaianSpoken:
        'Substitusikan angkanya: empat dikali sembilan sama dengan tiga puluh enam, dibagi dua kali sembilan koma delapan yaitu sembilan belas koma enam. Tiga puluh enam dibagi sembilan belas koma enam sama dengan satu koma delapan tiga enam tujuh meter, dibulatkan menjadi satu koma delapan meter.',
      interpretasiSpoken:
        'Ternyata kelereng baru turun satu koma delapan meter saat kecepatannya saling tegak lurus, sehingga percobaan ini cukup dilakukan di meja atau tangga setinggi dua meter.',
      strategiSpoken:
        'Trik cepat: jangan repot mencari t dulu! Gunakan langsung delta y sama dengan v satu kali v dua per dua g.',
    },
  },

  // =========================================================================
  // SOAL 5 — MENENGAH
  // =========================================================================
  {
    id: 5,
    title: 'Kelajuan Sesaat Benda Pertama Saat Vektor Saling Tegak Lurus',
    difficulty: 'Menengah',
    topicTag: 'Besar Vektor Kecepatan & Teorema Pythagoras',
    questionText:
      'Dua peluru kecil ditembakkan serentak dari satu titik secara horizontal berlawanan arah dengan kelajuan awal $v_1 = 5{,}0\\text{ m/s}$ dan $v_2 = 7{,}2\\text{ m/s}$ dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$. Berapakah **kelajuan** ($|\\vec{v}_1|$) peluru pertama tepat pada saat vektor kecepatan kedua peluru menjadi saling tegak lurus?',
    unit: 'm/s',
    expectedValue: 7.8,
    expectedFormatted: '7,8',
    stimulusLabel: 'Komponen Vektor Kecepatan $\\vec{v}_1 = (v_1, -gt)$ Saat Tegak Lurus',
    stimulusType: 'vector',
    stimulusNote:
      'Komponen horizontal peluru pertama tetap $5,0\\text{ m/s}$, sedangkan komponen vertikalnya bertambah secara linear $-gt$.',
    fbdTitle: 'Free Body Diagram (FBD) Peluru Pertama',
    fbdNote: 'Gaya berat bekerja tegak lurus terhadap komponen kecepatan awal horizontal.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya gravitasi yang hanya mengubah komponen kecepatan vertikal $v_{1y}$.',
      },
    ],
    hintOnWrong:
      'Hitung besar komponen vertikal $gt = \\sqrt{v_1 v_2}$, lalu gunakan teorema Pythagoras untuk mencari kelajuan $|\\vec{v}_1| = \\sqrt{v_1^2 + (gt)^2}$.',
    physicsConfig: {
      v1: 5.0,
      v2: 7.2,
      g: 10.0,
      tMax: 1.0,
      tStar: 0.6,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kelajuan awal horizontal peluru 1: $v_1 = 5{,}0\\text{ m/s}$',
          'Kelajuan awal horizontal peluru 2: $v_2 = 7{,}2\\text{ m/s}$',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
        ],
        ditanyakan: 'Kelajuan peluru pertama $|\\vec{v}_1|$ (dalam m/s) saat $\\vec{v}_1 \\perp \\vec{v}_2$.',
        kondisiFisika: 'Kecepatan total merupakan resultan vektor dari komponen $v_{1x}$ dan $v_{1y}$.',
        asumsi: ['Tidak ada gesekan udara, percepatan gravitasi seragam.'],
      },
      identifikasiKonsep: {
        prinsip: 'Besar Vektor 2D dan Kekekalan Energi / Kinematika.',
        alasan:
          'Kelajuan adalah magnitudo dari vektor kecepatan $\\vec{v}_1 = v_1\\hat{i} - gt\\hat{j}$.',
        hukum: '$|\\vec{v}_1| = \\sqrt{v_{1x}^2 + v_{1y}^2}$ serta syarat $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
      },
      visualisasiCatatan:
        'Amati segitiga siku-siku vektor kecepatan peluru 1 pada stimulus: sisi mendatar $v_1 = 5{,}0\\text{ m/s}$, sisi tegak $|v_y| = 6{,}0\\text{ m/s}$, dan sisi miringnya adalah kelajuan $|\\vec{v}_1|$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: '|\\vec{v}_1| = \\sqrt{v_1^2 + (gt)^2} = \\sqrt{v_1^2 + v_1 v_2} = \\sqrt{v_1(v_1 + v_2)}',
        maknaRumus:
          'Menariknya, nilai $g$ tidak memengaruhi kelajuan akhir pada saat kedua vektor saling tegak lurus!',
        alasanSesuai:
          'Karena $(gt)^2 = v_1 v_2$, kita bisa langsung mensubstitusikan hasil kali $v_1 v_2$ tanpa perlu menghitung $t$ secara terpisah.',
      },
      penyelesaianMatematis: [
        'Dari syarat tegak lurus $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$: $$(gt)^2 = v_1 v_2 = 5{,}0 \\times 7{,}2 = 36{,}0\\text{ m}^2/\\text{s}^2$$',
        'Artinya komponen vertikal pada saat itu adalah $|v_{1y}| = gt = 6{,}0\\text{ m/s}$ (pada $t = 0{,}6\\text{ s}$).',
        'Hitung kelajuan peluru pertama: $$|\\vec{v}_1| = \\sqrt{v_1^2 + (gt)^2} = \\sqrt{5{,}0^2 + 6{,}0^2} = \\sqrt{25{,}0 + 36{,}0} = \\sqrt{61{,}0}\\text{ m/s}$$',
        'Evaluasi nilai akar: $$\\sqrt{61{,}0} \\approx 7{,}8102\\text{ m/s} \\approx 7{,}8\\text{ m/s}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '7,8102...',
        dibulatkan: '7,8',
        satuan: 'm/s',
      },
      interpretasiFisis:
        'Kelajuan benda pertama meningkat dari $5{,}0\\text{ m/s}$ menjadi $7{,}8\\text{ m/s}$ akibat kerja gaya gravitasi selama jatuh sejauh $\\Delta y = 1{,}8\\text{ m}$. Menariknya, seandainya percobaan dilakukan di Bulan dengan $g$ lebih kecil, waktu $t$ lebih lama, tetapi kelajuan saat vektor tegak lurus tetap $7{,}8\\text{ m/s}$!',
      strategiCepat: {
        metode:
          'Gunakan rumus bebas-$g$: $|\\vec{v}_1| = \\sqrt{v_1(v_1 + v_2)}$. Cek: $\\sqrt{5(5 + 7{,}2)} = \\sqrt{5 \\times 12{,}2} = \\sqrt{61} \\approx 7{,}8\\text{ m/s}$.',
        kapanBerlaku: 'Setiap kali dua benda diluncurkan horizontal berlawanan arah dalam medan gravitasi homogen.',
        peringatanKesalahan:
          'Jangan menjawab $6{,}0\\text{ m/s}$ (itu hanya komponen vertikal $v_y$) atau menjumlahkan $5 + 6 = 11\\text{ m/s}$ secara skalar.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor lima. Dua peluru kecil ditembakkan serentak dari satu titik secara horizontal berlawanan arah dengan kelajuan awal v satu sama dengan lima koma nol meter per detik dan v dua sama dengan tujuh koma dua meter per detik dalam medan gravitasi sepuluh koma nol meter per detik kuadrat. Berapakah kelajuan peluru pertama tepat saat vektor kecepatan kedua peluru saling tegak lurus?',
      stimulusSpoken:
        'Perhatikan diagram komponen vektor pada benda satu. Sisi mendatar adalah v satu yang konstan lima meter per detik, dan sisi tegaknya adalah komponen vertikal minus g t.',
      fbdSpoken:
        'Pada Free Body Diagram, hanya ada gaya berat W ke bawah sehingga percepatan hanya memengaruhi komponen kecepatan vertikal.',
      persamaanSpoken:
        'Dari dot product kita peroleh g t kuadrat sama dengan lima dikali tujuh koma dua, yaitu tiga puluh enam. Kelajuan peluru pertama dihitung dengan teorema Pythagoras: akar dari v satu kuadrat ditambah g t kuadrat.',
      penyelesaianSpoken:
        'Kita masukkan angka: akar dari lima kuadrat ditambah tiga puluh enam, yaitu akar dari dua puluh lima tambah tiga puluh enam sama dengan akar enam puluh satu. Nilai akar enam puluh satu adalah tujuh koma delapan satu nol meter per detik, dibulatkan menjadi tujuh koma delapan meter per detik.',
      interpretasiSpoken:
        'Fakta menarik: nilai percepatan gravitasi g ternyata saling meniadakan saat mencari kelajuan di titik tegak lurus, sehingga hasilnya sama baik di Bumi maupun di Bulan.',
      strategiSpoken:
        'Gunakan rumus kilat: kelajuan benda satu saat tegak lurus adalah akar dari v satu dikali kurung buka v satu tambah v dua kurung tutup.',
    },
  },

  // =========================================================================
  // SOAL 6 — MENENGAH
  // =========================================================================
  {
    id: 6,
    title: 'Jarak Benda Kedua dari Titik Pelepasan Awal',
    difficulty: 'Menengah',
    topicTag: 'Vektor Posisi 2D Terhadap Titik Asal',
    questionText:
      'Dua buah benda bergerak dari satu titik awal $O(0,0)$ secara horizontal berlawanan arah dalam medan gravitasi homogen $g = 9{,}8\\text{ m/s}^2$, dengan kelajuan awal $v_1 = 4{,}5\\text{ m/s}$ (ke kanan) dan $v_2 = 8{,}0\\text{ m/s}$ (ke kiri). Tentukan **jarak benda kedua dari titik pelepasan awal $O$** tepat pada saat vektor kecepatan kedua benda saling tegak lurus!',
    unit: 'm',
    expectedValue: 5.2,
    expectedFormatted: '5,2',
    stimulusLabel: 'Vektor Posisi $\\vec{r}_2(t)$ dari Titik Pelepasan $O$',
    stimulusType: 'diagram',
    stimulusNote:
      'Perhatikan perbedaan antara jarak antar benda ($x_1 - x_2$) dengan jarak benda kedua dari titik awal $O$: $r_2 = \\sqrt{x_2^2 + y_2^2}$.',
    fbdTitle: 'Free Body Diagram (FBD) Benda Kedua',
    fbdNote: 'Hanya gaya berat yang bekerja pada benda kedua selama bergerak di udara.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya gravitasi ke bawah pada benda kedua.',
      },
    ],
    hintOnWrong:
      'Yang ditanyakan bukan jarak antar dua benda, melainkan jarak benda kedua terhadap titik asal $O(0,0)$, yaitu $r_2 = \\sqrt{(v_2 t)^2 + (\\frac{1}{2}gt^2)^2}$.',
    physicsConfig: {
      v1: 4.5,
      v2: 8.0,
      g: 9.8,
      tMax: 1.0,
      tStar: 6.0 / 9.8,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal horizontal: $v_1 = 4{,}5\\text{ m/s}$, $v_2 = 8{,}0\\text{ m/s}$',
          'Percepatan gravitasi: $g = 9{,}8\\text{ m/s}^2$',
          'Titik awal: $O(0,0)$',
        ],
        ditanyakan: 'Jarak benda kedua dari titik asal $O$, yaitu $|\\vec{r}_2(t)|$, saat $\\vec{v}_1 \\perp \\vec{v}_2$.',
        kondisiFisika: 'Posisi benda kedua memiliki koordinat mendatar $x_2 = -v_2 t$ dan vertikal $y_2 = -\\frac{1}{2}gt^2$.',
        asumsi: ['Medan gravitasi homogen, tanpa hambatan udara.'],
      },
      identifikasiKonsep: {
        prinsip: 'Vektor Posisi 2D pada Gerak Parabola & Dot Product Kecepatan.',
        alasan:
          'Untuk mengetahui jarak sebuah benda dari titik asal $O$, kita harus menggabungkan perpindahan horizontal dan vertikal melalui norma vektor posisi.',
        hukum: '$r_2 = \\sqrt{x_2^2 + y_2^2}$ dan $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
      },
      visualisasiCatatan:
        'Pada animasi, perhatikan garis putus-putus miring dari titik $O$ menuju posisi benda kedua. Panjang garis miring itulah $|\\vec{r}_2|$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 't = \\frac{\\sqrt{v_1 v_2}}{g}, \\qquad r_2 = \\sqrt{(v_2 t)^2 + \\left(\\frac{1}{2}gt^2\\right)^2}',
        maknaRumus:
          'Menunjukkan hubungan antara perpindahan horizontal $x_2$ dan perpindahan vertikal $y_2$ benda kedua terhadap titik awal.',
        alasanSesuai: 'Langsung menghitung panjang vektor posisi benda kedua dari koordinat awal.',
      },
      penyelesaianMatematis: [
        'Hitung waktu saat vektor kecepatan tegak lurus: $$t = \\frac{\\sqrt{4{,}5 \\times 8{,}0}}{9{,}8} = \\frac{\\sqrt{36{,}0}}{9{,}8} = \\frac{6{,}0}{9{,}8}\\text{ s} \\approx 0{,}612245\\text{ s}$$',
        'Hitung koordinat posisi benda kedua saat $t$: $$|x_2| = v_2 t = 8{,}0 \\times \\frac{6{,}0}{9{,}8} = \\frac{48{,}0}{9{,}8}\\text{ m} \\approx 4{,}8980\\text{ m}$$ $$|y_2| = \\frac{1}{2}gt^2 = \\frac{1}{2}(9{,}8)\\left(\\frac{6{,}0}{9{,}8}\\right)^2 = \\frac{18{,}0}{9{,}8}\\text{ m} \\approx 1{,}8367\\text{ m}$$',
        'Hitung jarak dari titik asal $O$: $$r_2 = \\sqrt{\\left(\\frac{48{,}0}{9{,}8}\\right)^2 + \\left(\\frac{18{,}0}{9{,}8}\\right)^2} = \\frac{6{,}0}{9{,}8}\\sqrt{8^2 + 3^2} = \\frac{6{,}0\\sqrt{73}}{9{,}8}$$',
        'Hitung secara numerik: $$r_2 = \\frac{6{,}0 \\times 8{,}54400}{9{,}8} = \\frac{51{,}2640}{9{,}8} \\approx 5{,}2310\\text{ m} \\approx 5{,}2\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '5,2310...',
        dibulatkan: '5,2',
        satuan: 'm',
      },
      interpretasiFisis:
        'Benda kedua telah berpindah $4{,}9\\text{ m}$ ke kiri dan $1{,}8\\text{ m}$ ke bawah, sehingga jarak lurusnya dari titik pelepasan awal adalah $5{,}2\\text{ m}$.',
      strategiCepat: {
        metode:
          'Faktorkan $t$: $r_2 = t\\sqrt{v_2^2 + \\frac{1}{4}(gt)^2} = \\frac{\\sqrt{v_1 v_2}}{g}\\sqrt{v_2^2 + \\frac{v_1 v_2}{4}}$. Dengan memfaktorkan $\\frac{6}{9{,}8}$, di dalam akar tinggal bilangan bulat $8^2 + 3^2 = 73$!',
        kapanBerlaku: 'Untuk mencari jarak salah satu partikel dari titik asal pada saat tegak lurus.',
        peringatanKesalahan:
          'Baca soal dengan teliti! Jangan langsung menghitung jarak antar kedua benda $(v_1 + v_2)t = 7{,}7\\text{ m}$ padahal yang ditanya adalah jarak ke titik asal $O$.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor enam. Dua buah benda bergerak dari satu titik awal O secara horizontal berlawanan arah dalam medan gravitasi sembilan koma delapan meter per detik kuadrat, dengan kelajuan awal v satu sama dengan empat koma lima meter per detik ke kanan dan v dua sama dengan delapan koma nol meter per detik ke kiri. Tentukan jarak benda kedua dari titik pelepasan awal O tepat pada saat vektor kecepatan kedua benda saling tegak lurus.',
      stimulusSpoken:
        'Hati-hati membaca pertanyaan! Pada gambar, jarak yang ditanyakan adalah panjang garis lurus dari titik pelepasan awal O menuju posisi benda kedua, bukan jarak antara benda satu dan benda dua.',
      fbdSpoken:
        'Pada diagram benda bebas, tetap hanya ada gaya berat ke bawah pada benda kedua.',
      persamaanSpoken:
        'Pertama kita tentukan waktu tegak lurus, yaitu akar empat koma lima kali delapan dibagi sembilan koma delapan, hasilnya enam per sembilan koma delapan detik. Setelah itu kita hitung posisi mendatar x dua dan posisi vertikal y dua, lalu cari panjang vektor r dua dengan teorema Pythagoras.',
      penyelesaianSpoken:
        'Dengan t sama dengan enam per sembilan koma delapan detik, perpindahan mendatar x dua adalah delapan kali t sama dengan empat puluh delapan per sembilan koma delapan meter. Penurunan vertikalnya delapan belas per sembilan koma delapan meter. Dengan memfaktorkan enam per sembilan koma delapan, jarak r dua sama dengan enam per sembilan koma delapan dikali akar dari delapan kuadrat tambah tiga kuadrat, yaitu akar tujuh puluh tiga. Hasilnya lima koma dua tiga satu meter, dibulatkan menjadi lima koma dua meter.',
      interpretasiSpoken:
        'Jarak lima koma dua meter sedikit lebih besar daripada pergeseran mendatarnya empat koma sembilan meter karena benda juga telah turun satu koma delapan meter ke bawah.',
      strategiSpoken:
        'Selalu faktorkan pecahan sebelum mengkuadratkan agar perhitungan akar jauh lebih rapi dan bebas kesalahan pembulatan.',
    },
  },

  // =========================================================================
  // SOAL 7 — MENENGAH LANJUT
  // =========================================================================
  {
    id: 7,
    title: 'Variasi Medan Gravitasi: Eksperimen di Permukaan Bulan',
    difficulty: 'Menengah Lanjut',
    topicTag: 'Skalabilitas Parameter Gravitasi $g$',
    questionText:
      'Eksperimen pada Soal Nomor 3 diulangi di permukaan Bulan yang memiliki medan gravitasi homogen $g_{\\text{Bulan}} = 1{,}6\\text{ m/s}^2$ (tanpa atmosfer). Dua buah wahana mikro dilepaskan dari satu titik yang sama dengan kecepatan horizontal berlawanan arah $v_1 = 2{,}0\\text{ m/s}$ dan $v_2 = 3{,}2\\text{ m/s}$. Berapakah jarak antara kedua wahana tersebut ketika vektor kecepatan mereka saling tegak lurus?',
    unit: 'm',
    expectedValue: 8.2,
    expectedFormatted: '8,2',
    stimulusLabel: 'Perbandingan Skala Lintasan pada Gravitasi Bulan ($g = 1,6\\text{ m/s}^2$)',
    stimulusType: 'diagram',
    stimulusNote:
      'Karena percepatan gravitasi Bulan sekitar seperenam Bumi, kelengkungan parabola jauh lebih landai sehingga waktu dan jarak pisah menjadi jauh lebih besar.',
    fbdTitle: 'Free Body Diagram (FBD) Wahana di Bulan',
    fbdNote: 'Tanpa atmosfer di Bulan, asumsi tanpa hambatan udara berlaku hampir sempurna.',
    fbdForces: [
      {
        label: 'Gaya Gravitasi Bulan (W = m g_Bulan)',
        symbolLatex: '\\vec{W}_B = m\\vec{g}_{\\text{Bulan}}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Satu-satunya gaya yang bekerja ke bawah dengan $g_{\\text{Bulan}} = 1{,}6\\text{ m/s}^2$.',
      },
    ],
    hintOnWrong:
      'Prinsip dot product dan gerak relatif tetap sama persis, cukup ganti nilai $g$ dengan $g_{\\text{Bulan}} = 1{,}6\\text{ m/s}^2$.',
    physicsConfig: {
      v1: 2.0,
      v2: 3.2,
      g: 1.6,
      tMax: 2.4,
      tStar: Math.sqrt(6.4) / 1.6,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal horizontal: $v_1 = 2{,}0\\text{ m/s}$, $v_2 = 3{,}2\\text{ m/s}$',
          'Percepatan gravitasi Bulan: $g_{\\text{Bulan}} = 1{,}6\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak pisah antar kedua wahana $d$ saat $\\vec{v}_1 \\perp \\vec{v}_2$ (dalam meter).',
        kondisiFisika: 'Gerak proyektil dalam medan gravitasi lemah dan vakum sempurna.',
        asumsi: ['Ketinggian titik pelepasan cukup tinggi di atas permukaan Bulan.'],
      },
      identifikasiKonsep: {
        prinsip: 'Analisis Parameter Medan Gravitasi pada Kinematika Relatif.',
        alasan:
          'Waktu tegak lurus berbanding terbalik dengan $g$ ($t \\propto 1/g$), sehingga pengurangan $g$ memperbesar waktu dan jarak pisah secara proporsional.',
        hukum: '$t = \\frac{\\sqrt{v_1 v_2}}{g_{\\text{Bulan}}}$ dan $d = (v_1 + v_2)t$.',
      },
      visualisasiCatatan:
        'Amati pada animasi betapa lambatnya kecepatan vertikal tumbuh dibanding saat di Bumi, sehingga kedua wahana meluncur mendatar lebih jauh sebelum arah geraknya membentuk sudut $90^\\circ$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 'd = \\frac{(v_1 + v_2)\\sqrt{v_1 v_2}}{g_{\\text{Bulan}}}',
        maknaRumus:
          'Menunjukkan kebergantungan berbanding terbalik antara jarak pisah kritis $d$ terhadap kekuatan medan gravitasi $g$.',
        alasanSesuai: 'Kedua wahana tetap memiliki $y_1(t) = y_2(t)$ di setiap saat.',
      },
      penyelesaianMatematis: [
        'Hitung waktu saat vektor kecepatan saling tegak lurus: $$t = \\frac{\\sqrt{2{,}0 \\times 3{,}2}}{1{,}6} = \\frac{\\sqrt{6{,}4}}{1{,}6} = \\frac{2{,}52982}{1{,}6} \\approx 1{,}58114\\text{ s}$$',
        'Hitung jarak antara kedua wahana: $$d = (2{,}0 + 3{,}2) \\times 1{,}58114\\text{ m} = 5{,}2 \\times 1{,}58114\\text{ m} \\approx 8{,}2219\\text{ m}$$',
        'Perhatikan bentuk eksak aljabarnya: $$d = \\frac{5{,}2\\sqrt{6{,}4}}{1{,}6} = 3{,}25\\sqrt{6{,}4} = 8{,}2219...\\text{ m}$$',
        'Bulatkan menjadi satu angka di belakang koma: $$d = 8{,}2\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '8,2219...',
        dibulatkan: '8,2',
        satuan: 'm',
      },
      interpretasiFisis:
        'Meski kelajuan awal di sini lebih kecil daripada soal nomor 2, jarak pisahnya mencapai $8{,}2\\text{ m}$ (lebih dari tiga kali lipat!) karena gravitasi Bulan jauh lebih lemah untuk membelokkan arah vektor kecepatan.',
      strategiCepat: {
        metode:
          'Sederhanakan $\\frac{v_1 + v_2}{g} = \\frac{5{,}2}{1{,}6} = \\frac{13}{4} = 3{,}25$, lalu kalikan dengan $\\sqrt{6{,}4} \\approx 2{,}5298$.',
        kapanBerlaku: 'Pada planet atau benda langit mana pun dengan medan gravitasi lokal konstan.',
        peringatanKesalahan:
          'Jangan menggunakan nilai default $g = 9{,}8\\text{ m/s}^2$ atau $10\\text{ m/s}^2$ jika soal secara eksplisit menyatakan lokasi eksperimen dengan nilai $g$ berbeda.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor tujuh, tingkat menengah lanjut. Eksperimen soal nomor tiga diulangi di permukaan Bulan dengan percepatan gravitasi satu koma enam meter per detik kuadrat tanpa atmosfer. Dua wahana mikro dilepaskan dari satu titik dengan kecepatan horizontal berlawanan arah dua koma nol dan tiga koma dua meter per detik. Berapakah jarak keduanya saat vektor kecepatan mereka saling tegak lurus?',
      stimulusSpoken:
        'Karena gravitasi di Bulan jauh lebih lemah daripada di Bumi, komponen kecepatan vertikal bertambah sangat pelan, sehingga lintasan parabola tampak jauh lebih landai.',
      fbdSpoken:
        'Free Body Diagram di Bulan hanya berisi satu gaya berat mengarah ke bawah sebesar massa dikali percepatan gravitasi Bulan.',
      persamaanSpoken:
        'Rumus dasar yang kita pakai sama persis, yaitu d sama dengan jumlah kecepatan awal v satu tambah v dua dikali akar v satu kali v dua dibagi g Bulan.',
      penyelesaianSpoken:
        'Pertama kita hitung akar dua kali tiga koma dua, yaitu akar enam koma empat, kira-kira dua koma lima dua sembilan delapan. Dibagi satu koma enam menghasilkan waktu satu koma lima delapan satu satu detik. Dikalikan jumlah kelajuan lima koma dua meter per detik, kita dapatkan jarak delapan koma dua dua dua meter, dibulatkan menjadi delapan koma dua meter.',
      interpretasiSpoken:
        'Hasil delapan koma dua meter membuktikan hubungan berbanding terbalik terhadap percepatan gravitasi: semakin lemah gravitasi, semakin jauh kedua benda terpisah sebelum kecepatannya tegak lurus.',
      strategiSpoken:
        'Biasakan menyederhanakan pecahan lima koma dua per satu koma enam menjadi tiga koma dua lima terlebih dahulu untuk meminimalkan kesalahan hitung.',
    },
  },

  // =========================================================================
  // SOAL 8 — MENENGAH LANJUT
  // =========================================================================
  {
    id: 8,
    title: 'Sudut Umum Antar Vektor Kecepatan ($\\theta = 60^\\circ$)',
    difficulty: 'Menengah Lanjut',
    topicTag: 'Sudut Vektor Umum & Analisis Tanda Cosinus',
    questionText:
      'Dua buah benda bergerak dari satu titik yang sama dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$ dengan kecepatan awal horizontal berlawanan arah $v_1 = 4{,}0\\text{ m/s}$ dan $v_2 = 6{,}0\\text{ m/s}$. Tentukan jarak antara kedua benda tepat pada saat sudut antara kedua vektor kecepatan mereka bernilai **$60^\\circ$**!',
    unit: 'm',
    expectedValue: 8.6,
    expectedFormatted: '8,6',
    stimulusLabel: 'Evolusi Sudut $\\theta(t)$ Antara $\\vec{v}_1(t)$ dan $\\vec{v}_2(t)$',
    stimulusType: 'graph-angle',
    stimulusNote:
      'Grafik menunjukkan sudut $\\theta(t)$ menurun monoton dari $180^\\circ$ (saat $t=0$), melewati $120^\\circ$ dan $90^\\circ$, hingga mencapai $60^\\circ$ dan mendekati $0^\\circ$.',
    fbdTitle: 'Free Body Diagram (FBD) Kedua Benda',
    fbdNote: 'Gaya berat konstan memutar kedua vektor kecepatan secara kontinu menuju arah vertikal bawah.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya gravitasi yang membuat sudut antar vektor kecepatan mengecil terhadap waktu.',
      },
    ],
    hintOnWrong:
      'Gunakan definisi umum dot product: $\\vec{v}_1 \\cdot \\vec{v}_2 = |\\vec{v}_1||\\vec{v}_2|\\cos 60^\\circ$. Karena $\\cos 60^\\circ = +0{,}5 > 0$, pastikan memilih akar persamaan kuadrat yang memenuhi $(gt)^2 > v_1 v_2$ (bukan akar untuk $120^\\circ$)!',
    physicsConfig: {
      v1: 4.0,
      v2: 6.0,
      g: 10.0,
      targetAngleDeg: 60,
      tMax: 1.2,
      tStar: Math.sqrt((244 + Math.sqrt(38800)) / 6) / 10.0,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal horizontal: $v_1 = 4{,}0\\text{ m/s}$ dan $v_2 = 6{,}0\\text{ m/s}$ (berlawanan arah)',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
          'Sudut target antar vektor kecepatan: $\\theta = 60^\\circ$',
        ],
        ditanyakan: 'Jarak kedua benda $d$ saat sudut antara $\\vec{v}_1$ dan $\\vec{v}_2$ adalah $60^\\circ$.',
        kondisiFisika:
          'Sudut dimulai dari $180^\\circ$ saat $t=0$, melewati $90^\\circ$ saat $(gt)^2 = 24$, lalu mengecil ke $60^\\circ$ saat $(gt)^2 > 24$.',
        asumsi: ['Tanpa hambatan udara, medan gravitasi homogen.'],
      },
      identifikasiKonsep: {
        prinsip: 'Definisi Geometris Dot Product Umum dan Verifikasi Tanda Akar Kuadrat.',
        alasan:
          'Mengkuadratkan persamaan dot product memunculkan dua akar: satu untuk $\\cos 60^\\circ = +1/2$ dan akar palsu untuk $\\cos 120^\\circ = -1/2$.',
        hukum: '$\\vec{v}_1 \\cdot \\vec{v}_2 = |\\vec{v}_1||\\vec{v}_2|\\cos\\theta$.',
      },
      visualisasiCatatan:
        'Pada grafik $\\theta(t)$ dan animasi, perhatikan bahwa $t = 0{,}28\\text{ s}$ bersesuaian dengan $\\theta = 120^\\circ$, $t = 0{,}49\\text{ s}$ adalah $90^\\circ$, dan baru pada $t \\approx 0{,}86\\text{ s}$ sudut menjadi lancip $60^\\circ$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: '-v_1 v_2 + g^2 t^2 = \\sqrt{(v_1^2 + g^2 t^2)(v_2^2 + g^2 t^2)}\\cos 60^\\circ',
        maknaRumus:
          'Ruas kiri harus bernilai positif karena $\\cos 60^\\circ = +0{,}5 > 0$, yang menuntut syarat fisis $g^2 t^2 > v_1 v_2$.',
        alasanSesuai: 'Menggeneralisasi syarat $90^\\circ$ menjadi sudut sembarang $\\theta$.',
      },
      penyelesaianMatematis: [
        'Misalkan $u = (gt)^2 = 100t^2$. Maka $\\vec{v}_1 \\cdot \\vec{v}_2 = u - 24$, dengan syarat $u > 24$ agar $\\cos 60^\\circ > 0$.',
        'Substitusi ke rumus sudut dot product ($\\cos 60^\\circ = \\frac{1}{2}$): $$u - 24 = \\frac{1}{2}\\sqrt{(u + 16)(u + 36)}$$',
        'Kuadratkan kedua ruas dan kalikan 4: $$4(u^2 - 48u + 576) = u^2 + 52u + 576$$ $$4u^2 - 192u + 2304 = u^2 + 52u + 576$$',
        'Rapikan menjadi persamaan kuadrat: $$3u^2 - 244u + 1728 = 0$$',
        'Gunakan rumus ABC: $$u = \\frac{244 \\pm \\sqrt{244^2 - 4(3)(1728)}}{6} = \\frac{244 \\pm \\sqrt{59536 - 20736}}{6} = \\frac{244 \\pm \\sqrt{38800}}{6}$$',
        'Evaluasi kedua akar: $\\sqrt{38800} \\approx 196{,}9772$. Akar pertama $u_1 = \\frac{244 - 196{,}9772}{6} \\approx 7{,}84 < 24$ (tidak memenuhi, ini adalah sudut $120^\\circ$!). Akar yang sah adalah: $$u_2 = \\frac{244 + 196{,}9772}{6} \\approx 73{,}4962$$',
        'Hitung waktu $t$: $$10t = \\sqrt{73{,}4962} \\approx 8{,}5730 \\implies t \\approx 0{,}85730\\text{ s}$$',
        'Hitung jarak pisah kedua benda: $$d = (4{,}0 + 6{,}0)t = 10{,}0 \\times 0{,}85730 = 8{,}5730\\text{ m} \\approx 8{,}6\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '8,5730...',
        dibulatkan: '8,6',
        satuan: 'm',
      },
      interpretasiFisis:
        'Karena $60^\\circ$ lebih kecil dari $90^\\circ$, gravitasi harus bekerja lebih lama untuk membengkokkan kedua vektor kecepatan mendekati arah vertikal yang sama, sehingga jarak pisah mencapai $8{,}6\\text{ m}$.',
      strategiCepat: {
        metode:
          'Atau gunakan sudut masing-masing terhadap vertikal: $\\tan\\alpha_1 = \\frac{v_1}{gt}$ dan $\\tan\\alpha_2 = \\frac{v_2}{gt}$, dengan $\\alpha_1 + \\alpha_2 = 60^\\circ$. Gunakan identitas $\\tan(\\alpha_1 + \\alpha_2) = \\frac{\\tan\\alpha_1 + \\tan\\alpha_2}{1 - \\tan\\alpha_1\\tan\\alpha_2} = \\sqrt{3}$, yang langsung memberi $\\frac{10gt}{(gt)^2 - 24} = \\sqrt{3}$ tanpa mengkuadratkan!',
        kapanBerlaku: 'Cara tangen sudut vertikal jauh lebih cepat dan bebas akar palsu untuk sudut lancip maupun tumpul!',
        peringatanKesalahan:
          'Jebakan klasik OSN: saat mengkuadratkan persamaan dot product, siswa sering mengambil akar yang lebih kecil ($u_1 \\approx 7{,}84$), padahal itu menghasilkan $\\theta = 120^\\circ$, bukan $60^\\circ$!',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor delapan. Dua buah benda bergerak dari satu titik dalam medan gravitasi sepuluh meter per detik kuadrat dengan kecepatan awal horizontal berlawanan arah empat dan enam meter per detik. Tentukan jarak kedua benda tepat saat sudut antara kedua vektor kecepatan mereka bernilai enam puluh derajat.',
      stimulusSpoken:
        'Lihat grafik evolusi sudut terhadap waktu. Di awal sudutnya seratus delapan puluh derajat, lalu mengecil melewati sembilan puluh derajat sebelum akhirnya mencapai enam puluh derajat.',
      fbdSpoken:
        'Gaya yang bekerja tetap hanya gaya berat ke bawah, yang perlahan menyejajarkan kedua vektor kecepatan menuju vertikal bawah.',
      persamaanSpoken:
        'Kita gunakan rumus dot product umum: v satu dot v dua sama dengan panjang v satu kali panjang v dua kali cosinus enam puluh derajat. Karena cosinus enam puluh bernilai positif setengah, nilai dot product wajib bernilai positif.',
      penyelesaianSpoken:
        'Dengan memisalkan u sama dengan g t kuadrat, persamaan kuadratnya menjadi tiga u kuadrat dikurangi dua ratus empat puluh empat u ditambah seribu tujuh ratus dua puluh delapan sama dengan nol. Kita dapatkan dua akar, tetapi akar yang lebih kecil dari dua puluh empat sebenarnya untuk sudut seratus dua puluh derajat. Maka kita pilih akar yang lebih besar, u sama dengan tujuh puluh tiga koma empat sembilan enam. Dari situ waktu t sama dengan nol koma delapan lima tujuh tiga detik, dan jarak pisahnya sepuluh dikali t sama dengan delapan koma enam meter.',
      interpretasiSpoken:
        'Karena sudut enam puluh derajat lebih lancip dari sembilan puluh derajat, kedua benda harus jatuh lebih lama sehingga jarak pisahnya lebih jauh.',
      strategiSpoken:
        'Trik super cepat OSN: pakai identitas tangen jumlah sudut! Tangen enam puluh sama dengan jumlah kecepatan awal dikali g t dibagi g t kuadrat minus v satu kali v dua. Cara ini menghindari akar palsu sama sekali!',
    },
  },

  // =========================================================================
  // SOAL 9 — MENENGAH LANJUT
  // =========================================================================
  {
    id: 9,
    title: 'Dua Benda Terpisah Awal Horizontal Saling Mendekat',
    difficulty: 'Menengah Lanjut',
    topicTag: 'Posisi Awal Terpisah & Gerak Relatif Mendekat',
    questionText:
      'Dua buah partikel dilepaskan bersamaan dari dua titik pada ketinggian yang sama dengan jarak pisah awal horizontal $x_0 = 5{,}0\\text{ m}$. Partikel pertama ditembakkan horizontal ke kanan ($v_1 = 3{,}0\\text{ m/s}$) dan partikel kedua horizontal ke kiri ($v_2 = 3{,}0\\text{ m/s}$), **saling mendekat**, dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$. Tentukan jarak antara kedua partikel tepat pada saat vektor kecepatan mereka saling tegak lurus!',
    unit: 'm',
    expectedValue: 3.2,
    expectedFormatted: '3,2',
    stimulusLabel: 'Dua Proyektil Terpisah $x_0 = 5,0\\text{ m}$ Bergerak Saling Mendekat',
    stimulusType: 'diagram',
    stimulusNote:
      'Berbeda dengan Soal Nomor 3 yang dimulai dari satu titik, di sini kedua benda terpisah $5,0\\text{ m}$ di awal dan bergerak saling mendekat.',
    fbdTitle: 'Free Body Diagram (FBD) Kedua Partikel',
    fbdNote: 'Kedua partikel mengalami gaya gravitasi yang sama ke bawah.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya berat vertikal ke bawah pada tiap partikel.',
      },
    ],
    hintOnWrong:
      'Apakah jarak pisah awal $x_0$ memengaruhi waktu saat vektor kecepatan saling tegak lurus? Tidak! Kecepatan hanya bergantung pada $v_1, v_2, g$. Setelah menemukan $t$, hitung sisa jarak pisahnya $|x_0 - (v_1 + v_2)t|$.',
    physicsConfig: {
      v1: 3.0,
      v2: 3.0,
      g: 10.0,
      initialX2: 5.0,
      tMax: 0.9,
      tStar: 0.3,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Jarak pisah awal horizontal: $x_0 = 5{,}0\\text{ m}$ ($x_1(0)=0$, $x_2(0)=5{,}0\\text{ m}$)',
          'Partikel 1 ke kanan: $v_1 = +3{,}0\\text{ m/s}$; Partikel 2 ke kiri: $v_2 = 3{,}0\\text{ m/s}$ (arah $-x$)',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak antara kedua partikel $d$ tepat saat $\\vec{v}_1 \\perp \\vec{v}_2$.',
        kondisiFisika: 'Kedua partikel saling mendekat secara horizontal sambil jatuh bersamaan.',
        asumsi: ['Partikel tidak saling bertumbukan sebelum vektor kecepatannya tegak lurus.'],
      },
      identifikasiKonsep: {
        prinsip: 'Invariansi Syarat Kecepatan Terhadap Posisi Awal & Gerak Relatif Mendekat.',
        alasan:
          'Vektor kecepatan tidak bergantung pada koordinat posisi awal, sehingga waktu tegak lurus tetap $t = \\sqrt{v_1 v_2}/g$.',
        hukum: 'Persamaan posisi GLB horizontal dan dot product vektor kecepatan.',
      },
      visualisasiCatatan:
        'Amati pada animasi bahwa sebelum sempat berpapasan (tumbukan terjadi pada $t = 5/6 \\approx 0{,}83\\text{ s}$), vektor kecepatan keduanya sudah saling tegak lurus lebih dulu di $t = 0{,}30\\text{ s}$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 't = \\frac{\\sqrt{v_1 v_2}}{g}, \\qquad d(t) = |x_0 - (v_1 + v_2)t|',
        maknaRumus:
          'Jarak pisah adalah selisih mutlak antara jarak mula-mula dan jarak yang telah ditempuh saling mendekat.',
        alasanSesuai:
          'Karena kedua benda mulai dari ketinggian sama dan jatuh bersamaan, komponen vertikal selisih posisinya tetap nol.',
      },
      penyelesaianMatematis: [
        'Tentukan waktu saat vektor kecepatan saling tegak lurus: $$t = \\frac{\\sqrt{3{,}0 \\times 3{,}0}}{10{,}0} = \\frac{3{,}0}{10{,}0} = 0{,}3\\text{ s}$$',
        'Hitung posisi masing-masing pada $t = 0{,}3\\text{ s}$: $$x_1 = 0 + 3{,}0(0{,}3) = 0{,}9\\text{ m}$$ $$x_2 = 5{,}0 - 3{,}0(0{,}3) = 4{,}1\\text{ m}$$',
        'Karena $y_1 = y_2$, jarak antara kedua partikel adalah: $$d = |x_2 - x_1| = |4{,}1 - 0{,}9| = 3{,}2\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '3,2',
        dibulatkan: '3,2',
        satuan: 'm',
      },
      interpretasiFisis:
        'Selama $0{,}3\\text{ s}$, kedua benda mendekat sejauh $1{,}8\\text{ m}$ sehingga jaraknya menyusut dari $5{,}0\\text{ m}$ menjadi $3{,}2\\text{ m}$. Nilai positif menunjukkan keduanya memang belum berpapasan.',
      strategiCepat: {
        metode:
          'Langsung cek waktu papasan $t_{\\text{papas}} = x_0/(v_1+v_2) = 5/6 = 0{,}83\\text{ s}$. Karena $t_{\\perp} = 0{,}3\\text{ s} < t_{\\text{papas}}$, jarak sisa cukup $x_0 - (v_1+v_2)t_{\\perp} = 5{,}0 - 1{,}8 = 3{,}2\\text{ m}$.',
        kapanBerlaku: 'Untuk dua proyektil di ketinggian sama yang bergerak saling mendekat atau menjauh dari posisi awal berbeda.',
        peringatanKesalahan:
          'Jangan lupa memeriksa apakah keduanya sudah melewati satu sama lain! Jika $(v_1+v_2)t > x_0$, jaraknya adalah $(v_1+v_2)t - x_0$ (mengambil nilai mutlak).',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor sembilan. Dua buah partikel dilepaskan bersamaan dari dua titik pada ketinggian yang sama dengan jarak pisah awal lima koma nol meter. Partikel pertama ditembakkan horizontal ke kanan tiga koma nol meter per detik, dan partikel kedua horizontal ke kiri tiga koma nol meter per detik, saling mendekat, dalam medan gravitasi sepuluh meter per detik kuadrat. Tentukan jarak antara kedua partikel saat vektor kecepatan mereka saling tegak lurus.',
      stimulusSpoken:
        'Perhatikan bahwa titik awalnya terpisah lima meter dan arahnya saling mendekat, bukan saling menjauh dari satu titik.',
      fbdSpoken:
        'Diagram benda bebas tetap identik, hanya ada gaya berat ke bawah pada setiap partikel.',
      persamaanSpoken:
        'Kunci pentingnya: syarat kecepatan saling tegak lurus tidak dipengaruhi oleh posisi awal! Jadi waktu t tetap akar dari tiga kali tiga dibagi sepuluh, yaitu nol koma tiga detik.',
      penyelesaianSpoken:
        'Selama nol koma tiga detik, partikel satu bergerak ke kanan sejauh nol koma sembilan meter dan partikel dua ke kiri sejauh nol koma sembilan meter. Jarak saling mendekat yang ditempuh adalah satu koma delapan meter. Maka sisa jarak pisah antara keduanya adalah lima koma nol dikurangi satu koma delapan, yaitu tiga koma dua meter.',
      interpretasiSpoken:
        'Karena waktu papasan baru terjadi di nol koma delapan tiga detik, pada nol koma tiga detik kedua partikel masih terpisah tiga koma dua meter di udara.',
      strategiSpoken:
        'Jika benda bergerak saling mendekat, selalu periksa apakah waktunya sudah melewati titik papasan dengan mengambil nilai mutlak selisih jarak.',
    },
  },

  // =========================================================================
  // SOAL 10 — LANJUT
  // =========================================================================
  {
    id: 10,
    title: 'Salah Satu Benda Diluncurkan Miring ke Atas ($37^\\circ$)',
    difficulty: 'Lanjut',
    topicTag: 'Kecepatan Awal Miring & Gerak Relatif 2D',
    questionText:
      'Dua buah benda dilemparkan bersamaan dari satu titik yang sama dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$ dengan kelajuan awal sama $v_0 = 6{,}0\\text{ m/s}$. Benda pertama dilemparkan **horizontal ke kanan** ($0^\\circ$), sedangkan benda kedua dilemparkan **miring ke atas membentuk sudut $37^\\circ$ terhadap horizontal ke arah kiri** ($\\cos 37^\\circ = 0{,}8$; $\\sin 37^\\circ = 0{,}6$). Berapakah jarak antara kedua benda pada saat vektor kecepatan mereka saling tegak lurus?',
    unit: 'm',
    expectedValue: 8.5,
    expectedFormatted: '8,5',
    stimulusLabel: 'Peluncuran Horizontal vs Peluncuran Miring $37^\\circ$',
    stimulusType: 'diagram',
    stimulusNote:
      'Karena benda kedua memiliki komponen kecepatan awal vertikal ke atas ($v_{2y0} = +3,6\\text{ m/s}$), kedua benda kini TIDAK berada pada ketinggian yang sama!',
    fbdTitle: 'Free Body Diagram (FBD) Kedua Benda',
    fbdNote:
      'Meski arah kecepatan awalnya miring, gaya yang bekerja setelah dilepas tetap hanya gaya berat vertikal ke bawah.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya berat identik pada kedua benda sehingga $\\vec{a}_{\\text{rel}} = \\vec{0}$.',
      },
    ],
    hintOnWrong:
      'Hati-hati! Kini $y_1(t) \\neq y_2(t)$, tetapi percepatan relatif tetap nol ($\\vec{a}_{\\text{rel}} = \\vec{0}$). Oleh karena itu jarak pisah memenuhi $d = |\\vec{v}_1(0) - \\vec{v}_2(0)| \\cdot t$!',
    physicsConfig: {
      v1: 6.0,
      v2: 6.0,
      g: 10.0,
      launchAngle2Deg: 37,
      tMax: 1.0,
      tStar: (36 + Math.sqrt(12816)) / 200,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal benda 1: $\\vec{v}_1(0) = 6{,}0\\hat{i}\\text{ m/s}$',
          'Kecepatan awal benda 2: $\\vec{v}_2(0) = -6{,}0\\cos 37^\\circ\\hat{i} + 6{,}0\\sin 37^\\circ\\hat{j} = -4{,}8\\hat{i} + 3{,}6\\hat{j}\\text{ m/s}$',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak pisah kedua benda $d$ saat $\\vec{v}_1(t) \\perp \\vec{v}_2(t)$.',
        kondisiFisika:
          'Benda kedua naik lebih dulu sebelum turun, sehingga posisi vertikalnya tidak sama dengan benda pertama.',
        asumsi: ['$\\cos 37^\\circ = 0{,}8$, $\\sin 37^\\circ = 0{,}6$, tanpa gesekan udara.'],
      },
      identifikasiKonsep: {
        prinsip: 'Kekekalan Kecepatan Relatif 2D dalam Medan Gravitasi Homogen.',
        alasan:
          'Karena kedua benda berasal dari satu titik dan mengalami percepatan gravitasi $\\vec{g}$ yang sama, posisi relatifnya selalu $\\vec{r}_{\\text{rel}}(t) = (\\vec{v}_1(0) - \\vec{v}_2(0))t$!',
        hukum: 'Kinematika vektor relatif 2D & dot product $\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0$.',
      },
      visualisasiCatatan:
        'Pada animasi, garis hubung antara benda 1 dan benda 2 kini miring (tidak horizontal), tetapi arah dan laju pemanjangannya konstan sebesar $|\\vec{v}_{\\text{rel}}|$!',
      pemilihanPersamaan: {
        rumusUtamaLatex: '\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0, \\qquad d(t) = |\\vec{v}_1(0) - \\vec{v}_2(0)| \\cdot t',
        maknaRumus:
          'Meskipun lintasan kedua benda berbeda ketinggian, jarak antar keduanya tetap berbanding lurus dengan $t$.',
        alasanSesuai:
          'Menghemat perhitungan posisi $x_1, y_1, x_2, y_2$ satu per satu karena vektor relatifnya bergerak lurus beraturan.',
      },
      penyelesaianMatematis: [
        'Tulis vektor kecepatan pada waktu $t$: $$\\vec{v}_1(t) = 6{,}0\\hat{i} - 10t\\hat{j}, \\qquad \\vec{v}_2(t) = -4{,}8\\hat{i} + (3{,}6 - 10t)\\hat{j}$$',
        'Terapkan $\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0$: $$(6{,}0)(-4{,}8) + (-10t)(3{,}6 - 10t) = 0$$ $$-28{,}8 - 36t + 100t^2 = 0$$',
        'Selesaikan persamaan kuadrat untuk $t > 0$: $$t = \\frac{36 + \\sqrt{36^2 - 4(100)(-28{,}8)}}{200} = \\frac{36 + \\sqrt{1296 + 11520}}{200} = \\frac{36 + \\sqrt{12816}}{200}$$ $$t = \\frac{36 + 113{,}2078}{200} \\approx 0{,}74604\\text{ s}$$',
        'Hitung kecepatan relatif konstan: $$\\vec{v}_{\\text{rel}} = \\vec{v}_1(0) - \\vec{v}_2(0) = (6{,}0 - (-4{,}8))\\hat{i} + (0 - 3{,}6)\\hat{j} = 10{,}8\\hat{i} - 3{,}6\\hat{j}\\text{ m/s}$$ $$|\\vec{v}_{\\text{rel}}| = \\sqrt{10{,}8^2 + (-3{,}6)^2} = \\sqrt{116{,}64 + 12{,}96} = \\sqrt{129{,}6} \\approx 11{,}3842\\text{ m/s}$$',
        'Hitung jarak pisah kedua benda: $$d = |\\vec{v}_{\\text{rel}}| \\cdot t = 11{,}3842 \\times 0{,}74604 \\approx 8{,}4930\\text{ m} \\approx 8{,}5\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '8,4930...',
        dibulatkan: '8,5',
        satuan: 'm',
      },
      interpretasiFisis:
        'Benda kedua diluncurkan ke atas sehingga butuh waktu lebih lama ($0{,}75\\text{ s}$) agar kecepatan vertikalnya turun dan membalik cukup negatif untuk membuat sudut $90^\\circ$ dengan kecepatan benda pertama.',
      strategiCepat: {
        metode:
          'Selalu gunakan $d(t) = |\\vec{v}_1(0) - \\vec{v}_2(0)|t$ selama kedua benda dilepas bersamaan dari satu titik dalam medan gravitasi yang sama—bahkan untuk sudut peluncuran berapa pun!',
        kapanBerlaku:
          'Berlaku untuk sudut elevasi sembarang selama kedua benda berangkat serentak dari titik yang sama.',
        peringatanKesalahan:
          'Jangan menganggap jarak pisah hanya $v_{1x} - v_{2x}$ dikali $t$; ingat ada selisih posisi vertikal $(3{,}6t)$ yang juga ikut menyumbang jarak!',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor sepuluh, tingkat lanjut. Dua buah benda dilemparkan bersamaan dari satu titik dalam medan gravitasi sepuluh meter per detik kuadrat dengan kelajuan awal sama enam koma nol meter per detik. Benda pertama dilemparkan horizontal ke kanan, sedangkan benda kedua miring ke atas tiga puluh tujuh derajat terhadap horizontal ke arah kiri. Berapakah jarak kedua benda saat vektor kecepatan mereka saling tegak lurus?',
      stimulusSpoken:
        'Perhatikan lintasan pada diagram: benda kedua sempat melambung naik terlebih dahulu sebelum jatuh, sehingga ketinggian kedua benda tidak lagi sama.',
      fbdSpoken:
        'Meskipun sudut lemparannya miring, setelah lepas dari tangan, gaya yang bekerja tetap hanya gaya berat ke bawah, sehingga percepatan relatif antar keduanya tetap nol.',
      persamaanSpoken:
        'Vektor kecepatan benda dua kini memiliki komponen vertikal awal plus tiga koma enam dikurangi sepuluh t. Dari dot product nol kita peroleh persamaan kuadrat seratus t kuadrat dikurangi tiga puluh enam t dikurangi dua puluh delapan koma delapan sama dengan nol.',
      penyelesaianSpoken:
        'Akar positifnya memberikan waktu t sekitar nol koma tujuh empat enam nol detik. Karena percepatan relatif nol, kecepatan relatif konstan sebesar sepuluh koma delapan ke kanan dan minus tiga koma enam ke bawah, yang besarnya akar seratus dua puluh sembilan koma enam atau sebelas koma tiga delapan empat meter per detik. Dikalikan waktu t, kita peroleh jarak delapan koma empat sembilan tiga meter, dibulatkan menjadi delapan koma lima meter.',
      interpretasiSpoken:
        'Walaupun ketinggian kedua benda kini berbeda, garis hubung miring di antara keduanya memanjang dengan laju konstan.',
      strategiSpoken:
        'Prinsip emas kinematika relatif: dua proyektil yang dilepas serentak dari titik yang sama selalu berpisah dengan kecepatan konstan sebesar selisih vektor kecepatan awalnya!',
    },
  },

  // =========================================================================
  // SOAL 11 — LANJUT
  // =========================================================================
  {
    id: 11,
    title: 'Pelepasan Tidak Serentak (Selang Waktu Tunda $\\Delta t$)',
    difficulty: 'Lanjut',
    topicTag: 'Perbedaan Waktu Pelepasan & Jarak 2D',
    questionText:
      'Partikel $A$ dan $B$ dilepaskan dari satu titik asal yang sama secara horizontal berlawanan arah dengan kelajuan $v_A = 4{,}0\\text{ m/s}$ (ke kanan) dan $v_B = 9{,}0\\text{ m/s}$ (ke kiri) dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$. Namun, partikel $B$ dilepaskan **$\Delta t = 0{,}5\\text{ s}$ lebih lambat** daripada partikel $A$. Tentukan **jarak pisah** antara partikel $A$ dan $B$ tepat pada saat vektor kecepatan keduanya saling tegak lurus!',
    unit: 'm',
    expectedValue: 7.9,
    expectedFormatted: '7,9',
    stimulusLabel: 'Partikel $B$ Dilepas $\\Delta t = 0,5\\text{ s}$ Setelah Partikel $A$',
    stimulusType: 'diagram',
    stimulusNote:
      'Karena partikel A sudah lebih dulu jatuh selama $0,5\\text{ s}$, posisi vertikal keduanya berbeda dan kecepatan relatifnya tidak lagi murni horizontal.',
    fbdTitle: 'Free Body Diagram (FBD) Saat Kedua Partikel di Udara',
    fbdNote: 'Ketika keduanya sudah dilepas, masing-masing mengalami percepatan jatuh bebas $g$.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Menghasilkan selisih kecepatan vertikal tetap $g\\Delta t = 5{,}0\\text{ m/s}$ setelah B lepas.',
      },
    ],
    hintOnWrong:
      'Misalkan $t$ adalah waktu sejak partikel $B$ dilepaskan. Maka partikel $A$ sudah bergerak selama $t + 0{,}5\\text{ s}$! Cari $t$ dari syarat $\\vec{v}_A \\cdot \\vec{v}_B = 0$, lalu hitung $\\Delta x$ dan $\\Delta y$.',
    physicsConfig: {
      v1: 4.0,
      v2: 9.0,
      g: 10.0,
      delay2: 0.5,
      tMax: 1.2,
      tStar: 0.9, // t measured from A's release = 0.5 + 0.4
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Partikel $A$: $v_A = +4{,}0\\hat{i}\\text{ m/s}$, mulai pada $t_{\\text{global}} = 0$',
          'Partikel $B$: $v_B = -9{,}0\\hat{i}\\text{ m/s}$, mulai pada $t_{\\text{global}} = 0{,}5\\text{ s}$',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak pisah 2D antara $A$ dan $B$ ketika $\\vec{v}_A \\perp \\vec{v}_B$.',
        kondisiFisika:
          'Pada saat $B$ telah bergerak selama $t$, partikel $A$ sudah bergerak selama $t + 0{,}5\\text{ s}$, sehingga $A$ berada lebih rendah dari $B$.',
        asumsi: ['Tanpa gesekan udara; kedua partikel sudah sama-sama berada di udara saat tegak lurus.'],
      },
      identifikasiKonsep: {
        prinsip: 'Kinematika Proyektil dengan Fase Waktu Berbeda.',
        alasan:
          'Karena waktu tempuh berbeda sebesar $\\Delta t$, $y_A \\neq y_B$, sehingga jarak pisah wajib dihitung secara 2D: $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$.',
        hukum: 'Persamaan posisi & kecepatan GLB-GLBB serta dot product.',
      },
      visualisasiCatatan:
        'Perhatikan pada animasi: partikel A (kuning/oranye) melesat lebih dulu ke kanan bawah; pada $t = 0{,}5\\text{ s}$ barulah partikel B diluncurkan ke kiri. Saat $t_B = 0{,}4\\text{ s}$ ($t_{\\text{total}} = 0{,}9\\text{ s}$), vektor kecepatan keduanya tepat tegak lurus!',
      pemilihanPersamaan: {
        rumusUtamaLatex: '\\vec{v}_A(t) = (4{,}0,\\ -10(t+0{,}5)), \\quad \\vec{v}_B(t) = (-9{,}0,\\ -10t)',
        maknaRumus:
          'Menyelaraskan jam ukur waktu $t$ sejak $B$ dilepaskan agar syarat dot product mudah diselesaikan.',
        alasanSesuai: 'Langsung menghasilkan persamaan kuadrat dengan akar rasional eksak!',
      },
      penyelesaianMatematis: [
        'Misalkan $t$ adalah waktu dihitung sejak partikel $B$ dilepaskan ($t \\ge 0$). Maka partikel $A$ telah bergerak selama $t + 0{,}5\\text{ s}$.',
        'Terapkan syarat tegak lurus $\\vec{v}_A \\cdot \\vec{v}_B = 0$: $$(4{,}0)(-9{,}0) + [-10(t+0{,}5)][-10t] = 0$$ $$-36 + 100t^2 + 50t = 0 \\implies 100t^2 + 50t - 36 = 0$$',
        'Faktorkan atau gunakan rumus ABC: $$t = \\frac{-50 + \\sqrt{2500 + 14400}}{200} = \\frac{-50 + \\sqrt{16900}}{200} = \\frac{-50 + 130}{200} = 0{,}4\\text{ s}$$',
        'Artinya pada saat itu, $A$ sudah bergerak selama $t_A = 0{,}4 + 0{,}5 = 0{,}9\\text{ s}$, sedangkan $B$ bergerak selama $t_B = 0{,}4\\text{ s}$.',
        'Hitung koordinat masing-masing posisi: $$x_A = 4{,}0(0{,}9) = 3{,}6\\text{ m}, \\qquad y_A = -5(0{,}9)^2 = -4{,}05\\text{ m}$$ $$x_B = -9{,}0(0{,}4) = -3{,}6\\text{ m}, \\qquad y_B = -5(0{,}4)^2 = -0{,}80\\text{ m}$$',
        'Hitung jarak pisah 2D: $$\\Delta x = 3{,}6 - (-3{,}6) = 7{,}2\\text{ m}, \\qquad \\Delta y = -0{,}80 - (-4{,}05) = 3{,}25\\text{ m}$$ $$d = \\sqrt{7{,}2^2 + 3{,}25^2} = \\sqrt{51{,}84 + 10{,}5625} = \\sqrt{62{,}4025} \\approx 7{,}8995\\text{ m} \\approx 7{,}9\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '7,8995...',
        dibulatkan: '7,9',
        satuan: 'm',
      },
      interpretasiFisis:
        'Walaupun $A$ lebih lambat secara horizontal ($4{,}0\\text{ m/s}$ vs $9{,}0\\text{ m/s}$), karena $A$ diberi keunggulan waktu $0{,}5\\text{ s}$, pada saat tegak lurus perpindahan horizontal keduanya kebetulan persis sama besar ($\\pm 3{,}6\\text{ m}$), sementara $A$ berada $3{,}25\\text{ m}$ lebih rendah daripada $B$.',
      strategiCepat: {
        metode:
          'Anggap $B$ baru mulai ketika $A$ sudah punya kecepatan awal $(4, -5)$ dan posisi awal $(2{,}0;\ -1{,}25)$! Dari situ kecepatan relatif $B$ terhadap $A$ setelah $t=0$ konstan sebesar $(-13{,}0;\ +5{,}0)\\text{ m/s}$.',
        kapanBerlaku: 'Setiap kali dua benda dilepas dengan selang waktu tunda $\\Delta t$.',
        peringatanKesalahan:
          'Jangan menganggap $y_A = y_B$ ketika ada jeda pelepasan $\\Delta t$! Selisih tinggi $\\Delta y$ wajib dimasukkan ke Pythagoras.',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor sebelas. Partikel A dan B dilepaskan dari satu titik asal secara horizontal berlawanan arah dengan kelajuan empat koma nol meter per detik ke kanan dan sembilan koma nol meter per detik ke kiri dalam medan gravitasi sepuluh meter per detik kuadrat. Namun, partikel B dilepaskan nol koma lima detik lebih lambat daripada partikel A. Tentukan jarak pisah antara A dan B tepat saat vektor kecepatan keduanya saling tegak lurus.',
      stimulusSpoken:
        'Amati perbedaan waktu pelepasan pada diagram. Karena A meluncur lebih dulu setengah detik, partikel A selalu berada lebih rendah dibanding partikel B.',
      fbdSpoken:
        'Setelah kedua partikel melayang, gaya berat bekerja sama besar pada keduanya sehingga beda kecepatan vertikal mereka tetap sebesar g kali nol koma lima, yaitu lima meter per detik.',
      persamaanSpoken:
        'Misalkan t adalah waktu sejak B dilepaskan. Maka A telah bergerak selama t ditambah nol koma lima. Dari syarat dot product nol kita dapatkan seratus t kuadrat ditambah lima puluh t dikurangi tiga puluh enam sama dengan nol.',
      penyelesaianSpoken:
        'Persamaan kuadrat ini berakar sangat rapi: t sama dengan nol koma empat detik! Artinya A sudah bergerak nol koma sembilan detik dan B baru nol koma empat detik. Jarak mendatar keduanya menjadi tiga koma enam dikurangi minus tiga koma enam, yaitu tujuh koma dua meter. Sedangkan selisih ketinggiannya adalah empat koma nol lima dikurangi nol koma delapan nol, sama dengan tiga koma dua lima meter. Dengan Pythagoras, jarak totalnya akar dari enam puluh dua koma empat nol dua lima, hasilnya tujuh koma delapan sembilan sembilan lima, dibulatkan menjadi tujuh koma sembilan meter.',
      interpretasiSpoken:
        'Perhatikan betapa cantiknya hasil ini: keunggulan waktu nol koma lima detik membuat perpindahan mendatar A sama persis besarnya dengan B, yaitu tiga koma enam meter ke masing-masing arah.',
      strategiSpoken:
        'Waspada! Saat ada jeda waktu pelepasan, jarak pisah bukan lagi murni mendatar melainkan garis miring dua dimensi.',
    },
  },

  // =========================================================================
  // SOAL 12 — LANJUT
  // =========================================================================
  {
    id: 12,
    title: 'Perbandingan Energi Kinetik Saat Vektor Kecepatan Tegak Lurus',
    difficulty: 'Lanjut',
    topicTag: 'Dinamika Energi Kinetik & Trik Aljabar OSN',
    questionText:
      'Dua buah benda bermassa sama ($m_A = m_B$) dilemparkan serentak dari satu titik yang sama secara horizontal berlawanan arah dengan kelajuan awal $v_A = 3{,}0\\text{ m/s}$ dan $v_B = 5{,}0\\text{ m/s}$ dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$. Tentukan **perbandingan energi kinetik** $E_{kB} / E_{kA}$ (dalam bentuk bilangan desimal) tepat pada saat vektor kecepatan kedua benda saling tegak lurus!',
    unit: 'rasio',
    expectedValue: 1.7,
    expectedFormatted: '1,7',
    stimulusLabel: 'Perbandingan Energi Kinetik $E_{kB}$ Terhadap $E_{kA}$',
    stimulusType: 'vector',
    stimulusNote:
      'Kedua benda menerima tambahan energi potensial gravitasi menjadi energi kinetik yang persis sama besar karena $m_A = m_B$ dan $\\Delta y_A = \\Delta y_B$!',
    fbdTitle: 'Free Body Diagram (FBD) & Usaha Gravitasi',
    fbdNote: 'Usaha gaya berat $W_g = mg\\Delta y$ menambah energi kinetik kedua benda secara identik.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Melakukan usaha positif yang sama besar pada kedua benda saat jatuh.',
      },
    ],
    hintOnWrong:
      'Gunakan $E_k = \\frac{1}{2}m(v_x^2 + v_y^2)$ dengan $v_y^2 = (gt)^2 = v_A v_B$. Coba faktorkan pembilang dan penyebut pada $\\frac{v_B^2 + v_A v_B}{v_A^2 + v_A v_B}$!',
    physicsConfig: {
      v1: 3.0,
      v2: 5.0,
      g: 10.0,
      m1: 1.0,
      m2: 1.0,
      tMax: 0.7,
      tStar: Math.sqrt(15) / 10.0,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Massa sama: $m_A = m_B = m$',
          'Kelajuan awal horizontal: $v_A = 3{,}0\\text{ m/s}$, $v_B = 5{,}0\\text{ m/s}$ (berlawanan arah)',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
        ],
        ditanyakan: 'Rasio energi kinetik $E_{kB}/E_{kA}$ tepat saat $\\vec{v}_A \\perp \\vec{v}_B$.',
        kondisiFisika: 'Energi kinetik sebanding dengan kuadrat kelajuan total masing-masing benda.',
        asumsi: ['Tanpa gesekan udara; energi mekanik kekal.'],
      },
      identifikasiKonsep: {
        prinsip: 'Hubungan Energi Kinetik 2D dan Faktorisasi Aljabar Ortogonal.',
        alasan:
          'Pada saat tegak lurus, $(gt)^2 = v_A v_B$ menjadikan kuadrat kelajuan masing-masing benda terfaktorisasi sangat sederhana.',
        hukum: '$E_k = \\frac{1}{2}m|\\vec{v}|^2$ dan $\\vec{v}_A \\cdot \\vec{v}_B = 0$.',
      },
      visualisasiCatatan:
        'Amati perubahan diagram energi pada animasi: pertambahan $\\Delta E_k$ kedua benda sama besar, sehingga selisih energi kinetiknya tetap konstan, sementara rasionya berubah hingga mencapai $v_B / v_A$ saat tegak lurus.',
      pemilihanPersamaan: {
        rumusUtamaLatex: '\\frac{E_{kB}}{E_{kA}} = \\frac{v_B^2 + (gt)^2}{v_A^2 + (gt)^2} = \\frac{v_B^2 + v_A v_B}{v_A^2 + v_A v_B} = \\frac{v_B(v_B + v_A)}{v_A(v_A + v_B)} = \\frac{v_B}{v_A}',
        maknaRumus:
          'Sebuah teorema indah: pada saat vektor kecepatan saling tegak lurus, rasio kuadrat kelajuan kedua benda tepat sama dengan rasio kelajuan awalnya!',
        alasanSesuai: 'Menghilangkan kebutuhan menghitung akar kuadrat $\\sqrt{15}$ sama sekali.',
      },
      penyelesaianMatematis: [
        'Dari syarat tegak lurus: $$(gt)^2 = v_A v_B = 3{,}0 \\times 5{,}0 = 15{,}0\\text{ m}^2/\\text{s}^2$$',
        'Hitung kuadrat kelajuan masing-masing pada saat itu: $$|\\vec{v}_A|^2 = v_A^2 + (gt)^2 = 3{,}0^2 + 15{,}0 = 24{,}0\\text{ m}^2/\\text{s}^2$$ $$|\\vec{v}_B|^2 = v_B^2 + (gt)^2 = 5{,}0^2 + 15{,}0 = 40{,}0\\text{ m}^2/\\text{s}^2$$',
        'Karena $m_A = m_B$, maka perbandingan energi kinetiknya adalah: $$\\frac{E_{kB}}{E_{kA}} = \\frac{\\frac{1}{2}m|\\vec{v}_B|^2}{\\frac{1}{2}m|\\vec{v}_A|^2} = \\frac{40{,}0}{24{,}0} = \\frac{5}{3} \\approx 1{,}6667$$',
        'Bulatkan satu angka di belakang koma: $$\\frac{E_{kB}}{E_{kA}} = 1{,}7$$',
      ],
      hasilAkhir: {
        nilaiEksak: '5/3 = 1,6667...',
        dibulatkan: '1,7',
        satuan: 'rasio',
      },
      interpretasiFisis:
        'Pada awal gerak ($t=0$), rasio energi kinetiknya adalah $(5/3)^2 = 25/9 \\approx 2{,}8$. Setelah gravitasi memberi tambahan energi kinetik yang sama besar pada kedua benda, rasionya turun menjadi tepat $5/3 \\approx 1{,}7$ pada saat vektor kecepatannya tegak lurus.',
      strategiCepat: {
        metode:
          'Untuk massa sama, rasio $E_{kB}/E_{kA}$ saat vektor kecepatan tegak lurus selalu sama dengan $v_B / v_A$ (tidak bergantung pada $g$!).',
        kapanBerlaku: 'Berlaku saat $m_A = m_B$ dan kedua benda diluncurkan horizontal berlawanan dari titik sama.',
        peringatanKesalahan:
          'Jangan menjawab $(5/3)^2 = 2{,}8$ (itu rasio di $t=0$), dan jangan menjawab terbalik $3/5 = 0{,}6$ (perhatikan yang diminta adalah $E_{kB} / E_{kA}$).',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor dua belas. Dua buah benda bermassa sama dilemparkan serentak dari satu titik secara horizontal berlawanan arah dengan kelajuan awal tiga koma nol dan lima koma nol meter per detik dalam medan gravitasi sepuluh meter per detik kuadrat. Tentukan perbandingan energi kinetik B dibanding A dalam bentuk desimal tepat saat vektor kecepatan kedua benda saling tegak lurus.',
      stimulusSpoken:
        'Perhatikan diagram kecepatan kedua benda. Karena massanya sama dan penurunannya sama, usaha gaya berat menambah energi kinetik keduanya dengan porsi yang identik.',
      fbdSpoken:
        'Gaya berat W sama dengan m kali g melakukan usaha yang sama pada benda A dan benda B.',
      persamaanSpoken:
        'Energi kinetik sebanding dengan v kuadrat. Saat tegak lurus, g t kuadrat sama dengan v A kali v B, yaitu lima belas. Sehingga v A kuadrat total menjadi sembilan tambah lima belas sama dengan dua puluh empat, dan v B kuadrat total menjadi dua puluh lima tambah lima belas sama dengan empat puluh.',
      penyelesaianSpoken:
        'Rasio energi kinetik B dibanding A adalah empat puluh dibagi dua puluh empat, yang disederhanakan menjadi lima per tiga atau satu koma enam enam enam tujuh. Dibulatkan satu angka di belakang koma menjadi satu koma tujuh.',
      interpretasiSpoken:
        'Secara aljabar, pembilang dan penyebut sama-sama memuat faktor v A tambah v B yang saling meniadakan, menyisakan rasio tepat v B per v A.',
      strategiSpoken:
        'Trik cepat olimpiade: saat dua benda bermassa sama memiliki vektor kecepatan saling tegak lurus setelah dilepas horizontal berlawanan, perbandingan energi kinetiknya selalu sama dengan perbandingan kelajuan awalnya!',
    },
  },

  // =========================================================================
  // SOAL 13 — HOTS OLIMPIADE
  // =========================================================================
  {
    id: 13,
    title: 'Medan Gabungan: Gravitasi + Angin Horizontal Konstan',
    difficulty: 'HOTS Olimpiade',
    topicTag: 'Superposisi Percepatan 2D & Gerak Relatif',
    questionText:
      'Dua buah benda $A$ dan $B$ dilepaskan secara bersamaan dari satu titik yang sama dengan kecepatan awal horizontal berlawanan arah $v_1 = 2{,}0\\text{ m/s}$ (ke kanan, $+x$) dan $v_2 = 8{,}0\\text{ m/s}$ (ke kiri, $-x$) dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$. Selain gravitasi, bertiup **angin horizontal seragam** yang memberikan percepatan horizontal konstan yang sama $a_x = +3{,}0\\text{ m/s}^2$ (ke arah $+x$) pada kedua benda. Tentukan jarak antara kedua benda tepat pada saat vektor kecepatan mereka saling tegak lurus!',
    unit: 'm',
    expectedValue: 4.7,
    expectedFormatted: '4,7',
    stimulusLabel: 'Gerak dalam Medan Percepatan Konstan Miring ($a_x = +3,0\\text{ m/s}^2$, $g = 10,0\\text{ m/s}^2$)',
    stimulusType: 'diagram',
    stimulusNote:
      'Angin konstan menambah komponen percepatan $+a_x$ secara identik pada kedua benda, sehingga benda kedua bahkan dapat berbalik arah jika cukup lama!',
    fbdTitle: 'Free Body Diagram (FBD) dalam Angin Horizontal Konstan',
    fbdNote:
      'Di sini terdapat DUA gaya nyata yang bekerja pada masing-masing benda: gaya berat ke bawah dan gaya dorong angin horizontal ke kanan.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Gaya gravitasi vertikal ke bawah.',
      },
      {
        label: 'Gaya Angin (F_angin = m a_x)',
        symbolLatex: '\\vec{F}_{\\text{angin}} = m\\vec{a}_x',
        directionDeg: 0,
        color: '#0284C7',
        description: 'Gaya angin seragam horizontal ke kanan (+x) yang memberi percepatan $a_x = 3{,}0\\text{ m/s}^2$.',
      },
    ],
    hintOnWrong:
      'Apakah $\\vec{a}_{\\text{rel}}$ masih nol? Ya! Karena percepatan total $\\vec{a} = (3{,}0\\hat{i} - 10{,}0\\hat{j})$ identik untuk kedua benda, jarak pisah tetap $(v_1 + v_2)t$. Hanya syarat dot product yang berubah karena $v_x(t) = v_{x0} + a_x t$.',
    physicsConfig: {
      v1: 2.0,
      v2: 8.0,
      g: 10.0,
      ax: 3.0,
      tMax: 0.9,
      tStar: (18 + Math.sqrt(7300)) / 218,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal: $\\vec{v}_1(0) = +2{,}0\\hat{i}\\text{ m/s}$, $\\vec{v}_2(0) = -8{,}0\\hat{i}\\text{ m/s}$',
          'Percepatan total konstan untuk kedua benda: $\\vec{a} = 3{,}0\\hat{i} - 10{,}0\\hat{j}\\text{ m/s}^2$',
        ],
        ditanyakan: 'Jarak pisah kedua benda $d$ saat $\\vec{v}_1(t) \\perp \\vec{v}_2(t)$.',
        kondisiFisika:
          'Kedua benda bergerak dalam medan gaya efektif miring yang identik.',
        asumsi: ['Gaya angin konstan dan identik per satuan massa pada kedua benda.'],
      },
      identifikasiKonsep: {
        prinsip: 'Prinsip Relativitas / Medan Percepatan Efektif Homogen.',
        alasan:
          'Karena percepatan total $\\vec{a}$ identik bagi benda 1 dan 2, percepatan relatif keduanya tetap $\\vec{a}_{\\text{rel}} = \\vec{0}$! Namun, komponen $v_x(t)$ tiap benda ikut bergeser sebesar $+a_x t$.',
        hukum: 'Kinematika GLBB 2D dengan $\\vec{a} = a_x\\hat{i} - g\\hat{j}$ dan $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$.',
      },
      visualisasiCatatan:
        'Amati pada animasi: kedua lintasan bergeser miring ke kanan terbawa angin, namun garis hubung antar keduanya tetap horizontal dan panjangnya bertambah tepat $10{,}0\\text{ m}$ per detik!',
      pemilihanPersamaan: {
        rumusUtamaLatex: '\\vec{v}_1(t) = (2 + 3t)\\hat{i} - 10t\\hat{j}, \\quad \\vec{v}_2(t) = (-8 + 3t)\\hat{i} - 10t\\hat{j}',
        maknaRumus:
          'Mengubah kecepatan awal horizontal menjadi fungsi waktu linear $v_{x0} + a_x t$.',
        alasanSesuai: 'Langsung memasukkan efek angin ke dalam persamaan dot product.',
      },
      penyelesaianMatematis: [
        'Terapkan syarat ketegaklurusan $\\vec{v}_1(t) \\cdot \\vec{v}_2(t) = 0$: $$(2{,}0 + 3{,}0t)(-8{,}0 + 3{,}0t) + (-10{,}0t)(-10{,}0t) = 0$$',
        'Jabarkan perkalian suku: $$-16 + 6t - 24t + 9t^2 + 100t^2 = 0$$ $$109t^2 - 18t - 16 = 0$$',
        'Selesaikan persamaan kuadrat untuk $t > 0$: $$t = \\frac{18 + \\sqrt{(-18)^2 - 4(109)(-16)}}{2(109)} = \\frac{18 + \\sqrt{324 + 6976}}{218} = \\frac{18 + \\sqrt{7300}}{218}$$',
        'Hitung nilai numerik $t$: $$t = \\frac{18 + 85{,}44004}{218} = \\frac{103{,}44004}{218} \\approx 0{,}47450\\text{ s}$$',
        'Karena $\\vec{a}_{\\text{rel}} = \\vec{0}$, kecepatan relatif tetap $(2{,}0 - (-8{,}0)) = 10{,}0\\text{ m/s}$ horizontal. Maka jarak pisahnya: $$d = 10{,}0 \\times 0{,}47450 \\approx 4{,}7450\\text{ m} \\approx 4{,}7\\text{ m}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '4,7450...',
        dibulatkan: '4,7',
        satuan: 'm',
      },
      interpretasiFisis:
        'Tanpa angin, waktu tegak lurusnya adalah $\\sqrt{16}/10 = 0{,}40\\text{ s}$ ($d = 4{,}0\\text{ m}$). Adanya angin ke kanan membuat benda 2 lebih cepat melambat ke kiri lalu menoleh ke kanan, sehingga butuh waktu sedikit lebih lama ($0{,}474\\text{ s}$) agar keduanya saling tegak lurus.',
      strategiCepat: {
        metode:
          'Jangan menghitung $x_1(t)$ dan $x_2(t)$ satu per satu! Suku $\\frac{1}{2}a_x t^2$ pasti saling menghilangkan dalam $x_1 - x_2$, sehingga jaraknya langsung $(v_1 + v_2)t$.',
        kapanBerlaku: 'Setiap kali percepatan tambahan bekerja identik pada kedua benda.',
        peringatanKesalahan:
          'Waspadai tanda minus pada $v_2 = -8{,}0\\text{ m/s}$: ketika ditambah $+3t$, kecepatan benda 2 menjadi $(-8 + 3t)$, bukan $-(8 + 3t)$!',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor tiga belas, tingkat HOTS Olimpiade. Dua buah benda dilepaskan bersamaan dari satu titik dengan kecepatan awal horizontal berlawanan arah dua koma nol meter per detik ke kanan dan delapan koma nol meter per detik ke kiri, dalam medan gravitasi sepuluh meter per detik kuadrat. Selain gravitasi, angin horizontal seragam memberikan percepatan horizontal yang sama sebesar plus tiga koma nol meter per detik kuadrat ke kanan pada kedua benda. Tentukan jarak antara kedua benda saat vektor kecepatan mereka saling tegak lurus.',
      stimulusSpoken:
        'Perhatikan arah angin pada diagram. Angin mendorong kedua benda ke kanan, sehingga lintasan kedua benda ikut terseret ke kanan.',
      fbdSpoken:
        'Di sini Free Body Diagram memiliki dua gaya nyata: gaya berat W ke bawah dan gaya dorong angin F angin ke arah kanan.',
      persamaanSpoken:
        'Karena percepatan total sama untuk kedua benda, kecepatan relatif tetap sepuluh meter per detik ke kanan. Yang berubah hanyalah syarat tegak lurus: v satu x menjadi dua tambah tiga t, dan v dua x menjadi minus delapan tambah tiga t.',
      penyelesaianSpoken:
        'Dari dot product nol, kita peroleh persamaan kuadrat seratus sembilan t kuadrat dikurangi delapan belas t dikurangi enam belas sama dengan nol. Akar positifnya memberikan waktu t nol koma empat tujuh empat lima detik. Kalikan dengan kecepatan relatif sepuluh meter per detik, hasilnya empat koma tujuh empat lima meter, dibulatkan menjadi empat koma tujuh meter.',
      interpretasiSpoken:
        'Adanya angin searah dengan benda pertama menggeser kedua vektor kecepatan sehingga titik tegak lurus tercapai sedikit lebih lambat dibanding tanpa angin.',
      strategiSpoken:
        'Rahasia kecepatan di soal HOTS ini: abaikan suku setengah a x t kuadrat saat mencari jarak pisah karena kedua benda mengalami percepatan yang identik!',
    },
  },

  // =========================================================================
  // SOAL 14 — HOTS OLIMPIADE
  // =========================================================================
  {
    id: 14,
    title: 'Luas Segitiga Posisi Awal dan Kedua Benda Saat Tegak Lurus',
    difficulty: 'HOTS Olimpiade',
    topicTag: 'Geometri Lintasan & Luas Segitiga Kinematika',
    questionText:
      'Dua partikel $A$ dan $B$ dilemparkan secara bersamaan dari satu titik asal $O(0,0)$ dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$ dengan kecepatan awal horizontal berlawanan arah $v_1 = 4{,}0\\text{ m/s}$ dan $v_2 = 9{,}0\\text{ m/s}$. Tentukan **luas segitiga** $OAB$ yang titik-titik sudutnya adalah titik pelepasan awal $O$, posisi partikel $A$, dan posisi partikel $B$ tepat pada saat vektor kecepatan keduanya saling tegak lurus!',
    unit: 'm²',
    expectedValue: 7.0,
    expectedFormatted: '7,0',
    stimulusLabel: 'Segitiga Geometri $OAB$ Dibentuk oleh Titik Asal & Posisi Sesaat',
    stimulusType: 'triangle-area',
    stimulusNote:
      'Karena partikel A dan B selalu berada pada ketinggian yang sama ($y_A = y_B$), segmen AB adalah alas horizontal segitiga dan penurunan vertikal $h$ adalah tingginya!',
    fbdTitle: 'Free Body Diagram (FBD) Partikel',
    fbdNote: 'Hanya gaya gravitasi konstan ke bawah yang bekerja pada kedua partikel.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Membuat kedalaman jatuh kedua partikel sama sehingga alas segitiga AB horizontal.',
      },
    ],
    hintOnWrong:
      'Segitiga $OAB$ memiliki alas mendatar sepanjang jarak pisah $d = (v_1 + v_2)t$ dan tinggi segitiga sama dengan kedalaman jatuh $h = \\frac{1}{2}gt^2$. Luas segitiga $= \\frac{1}{2} \\times d \\times h$.',
    physicsConfig: {
      v1: 4.0,
      v2: 9.0,
      g: 10.0,
      tMax: 0.9,
      tStar: 0.6,
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Titik awal pelepasan: $O(0,0)$',
          'Kecepatan awal horizontal: $v_1 = 4{,}0\\text{ m/s}$, $v_2 = 9{,}0\\text{ m/s}$ (berlawanan)',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
        ],
        ditanyakan: 'Luas segitiga $OAB$ (dalam $\\text{m}^2$) pada saat $\\vec{v}_A \\perp \\vec{v}_B$.',
        kondisiFisika:
          'Posisi $A(x_1, -h)$ dan $B(-x_2, -h)$ membentuk alas datar dengan jarak vertikal $h$ di bawah titik asal $O$.',
        asumsi: ['Tanpa gesekan udara, medan gravitasi homogen.'],
      },
      identifikasiKonsep: {
        prinsip: 'Integrasi Geometri Segitiga dengan Kinematika Proyektil.',
        alasan:
          'Karena kedua benda jatuh secara sinkron ($y_A = y_B = -h$), alas segitiga $AB$ sejajar sumbu-$x$, sehingga luasnya langsung $\\frac{1}{2} \\cdot d \\cdot h$.',
        hukum: 'Dot product kecepatan + rumus luas segitiga $\\frac{1}{2} \\times \\text{alas} \\times \\text{tinggi}$.',
      },
      visualisasiCatatan:
        'Amati daerah segitiga kuning terarsir $OAB$ pada animasi yang membesar seiring waktu $t^3$ hingga tepat mencapai luas $7{,}0\\text{ m}^2$ pada $t = 0{,}6\\text{ s}$.',
      pemilihanPersamaan: {
        rumusUtamaLatex: 'L_{\\triangle OAB} = \\frac{1}{2} d \\cdot h = \\frac{1}{2}[(v_1+v_2)t]\\left[\\frac{1}{2}gt^2\\right] = \\frac{(v_1+v_2)(v_1 v_2)^{3/2}}{4g^2}',
        maknaRumus:
          'Menunjukkan bahwa luas segitiga tumbuh sangat sensitif terhadap kecepatan awal dan berbanding terbalik dengan $g^2$.',
        alasanSesuai: 'Menggabungkan jarak pisah horizontal (Soal 2) dan penurunan ketinggian (Soal 4).',
      },
      penyelesaianMatematis: [
        'Hitung waktu saat vektor kecepatan tegak lurus: $$t = \\frac{\\sqrt{v_1 v_2}}{g} = \\frac{\\sqrt{4{,}0 \\times 9{,}0}}{10{,}0} = 0{,}6\\text{ s}$$',
        'Hitung alas segitiga (jarak pisah $AB$): $$d = (4{,}0 + 9{,}0) \\times 0{,}6 = 13{,}0 \\times 0{,}6 = 7{,}8\\text{ m}$$',
        'Hitung tinggi segitiga (penurunan vertikal $h$): $$h = \\frac{1}{2}gt^2 = \\frac{1}{2}(10{,}0)(0{,}6)^2 = 1{,}8\\text{ m}$$',
        'Hitung luas segitiga $OAB$: $$L = \\frac{1}{2} \\times d \\times h = \\frac{1}{2} \\times 7{,}8 \\times 1{,}8 = 7{,}02\\text{ m}^2$$',
        'Bulatkan menjadi satu angka di belakang koma: $$L = 7{,}0\\text{ m}^2$$',
      ],
      hasilAkhir: {
        nilaiEksak: '7,02',
        dibulatkan: '7,0',
        satuan: 'm²',
      },
      interpretasiFisis:
        'Luas daerah segitiga yang disapu oleh posisi awal dan kedua partikel terus meningkat sebagai fungsi $t^3$. Pada momen krusial $t = 0{,}6\\text{ s}$, luasnya adalah $7{,}0\\text{ m}^2$.',
      strategiCepat: {
        metode:
          'Untuk soal geometri posisi dua proyektil, ingat $L = \\frac{1}{2}|\\vec{r}_A \\times \\vec{r}_B|$ atau cukup $\\frac{1}{2} d \\cdot h$ karena $AB$ selalu horizontal!',
        kapanBerlaku: 'Ketika kedua proyektil mulai dari satu titik $O$ dan tidak ada sudut elevasi vertikal berbeda.',
        peringatanKesalahan:
          'Jangan lupa menuliskan format satu desimal `7,0` (bukan `7`) sesuai standar jawaban numerik!',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor empat belas. Dua partikel A dan B dilemparkan bersamaan dari satu titik asal O dalam medan gravitasi sepuluh meter per detik kuadrat dengan kecepatan awal horizontal berlawanan arah empat koma nol dan sembilan koma nol meter per detik. Tentukan luas segitiga O A B yang titik sudutnya adalah titik awal O, posisi A, dan posisi B tepat saat vektor kecepatan keduanya saling tegak lurus.',
      stimulusSpoken:
        'Lihat daerah segitiga yang diarsir pada diagram! Alasnya adalah ruas garis mendatar antara partikel A dan B, sedangkan tingginya adalah kedalaman jatuh partikel dari titik O.',
      fbdSpoken:
        'Karena hanya gaya berat ke bawah yang bekerja secara identik pada kedua partikel, ruas garis A B selalu horizontal.',
      persamaanSpoken:
        'Kita cukup mencari tiga langkah: waktu tegak lurus t, lalu alas segitiga d, dan tinggi segitiga h. Luasnya adalah setengah dikali d dikali h.',
      penyelesaianSpoken:
        'Waktu tegak lurus adalah akar empat kali sembilan dibagi sepuluh, sama dengan nol koma enam detik. Alas segitiga d sama dengan empat tambah sembilan dikali nol koma enam, yaitu tujuh koma delapan meter. Tingginya adalah setengah kali sepuluh kali nol koma enam kuadrat, sama dengan satu koma delapan meter. Maka luas segitiganya setengah dikali tujuh koma delapan dikali satu koma delapan, hasilnya tujuh koma nol dua meter persegi, dibulatkan menjadi tujuh koma nol meter persegi.',
      interpretasiSpoken:
        'Menggabungkan analisis vektor kecepatan dengan geometri lintasan membuat soal ini menjadi latihan tingkat olimpiade yang sangat utuh.',
      strategiSpoken:
        'Ingat selalu aturan format jawaban: walaupun hasilnya tujuh bulat, wajib ditulis tujuh koma nol!',
    },
  },

  // =========================================================================
  // SOAL 15 — HOTS OLIMPIADE
  // =========================================================================
  {
    id: 15,
    title: 'Pantulan Elastis di Lantai & Tegak Lurus Kedua Kalinya',
    difficulty: 'HOTS Olimpiade',
    topicTag: 'Tumbukan Elastis Lantai & Kondisi Tegak Lurus Berulang',
    questionText:
      'Dua partikel kecil bergerak dari satu titik awal yang sama dalam medan gravitasi homogen $g = 10{,}0\\text{ m/s}^2$ dengan kecepatan awal horizontal berlawanan arah $v_1 = 3{,}0\\text{ m/s}$ dan $v_2 = 12{,}0\\text{ m/s}$. Tepat pada saat vektor kecepatan kedua partikel menjadi saling tegak lurus **untuk pertama kalinya**, kedua partikel menumbuk sebuah lantai horizontal licin secara **elastis sempurna** (sehingga kecepatan horizontal masing-masing tetap, sedangkan kecepatan vertikalnya berbalik arah dengan besar yang sama). Berapakah **selang waktu tambahan** (dihitung setelah tumbukan dengan lantai) hingga vektor kecepatan kedua partikel kembali menjadi saling tegak lurus untuk kedua kalinya?',
    unit: 's',
    expectedValue: 1.2,
    expectedFormatted: '1,2',
    stimulusLabel: 'Pantulan Elastis Sempurna di Lantai Horizontal Saat $t = t_1$',
    stimulusType: 'bounce',
    stimulusNote:
      'Pada $t_1 = 0,6\\text{ s}$, kedua partikel menyentuh lantai secara serentak pada $y = -1,8\\text{ m}$ dan memantul ke atas dengan $v_{y0}^{\\prime} = +6,0\\text{ m/s}$.',
    fbdTitle: 'FBD Selama Melayang vs Saat Tumbukan Lantai',
    fbdNote:
      'Selama melayang hanya ada gaya berat $\\vec{W}$. Sesaat saat tumbukan lantai licin muncul gaya normal impulsif vertikal ke atas $\\vec{N}$ yang membalikkan $v_y$.',
    fbdForces: [
      {
        label: 'Gaya Berat (W = mg)',
        symbolLatex: '\\vec{W} = m\\vec{g}',
        directionDeg: 270,
        color: '#DC2626',
        description: 'Bekerja terus-menerus selama partikel melayang sebelum dan sesudah pantulan.',
      },
      {
        label: 'Gaya Normal Impulsif (saat pantulan)',
        symbolLatex: '\\vec{N}_{\\text{impuls}}',
        directionDeg: 90,
        color: '#059669',
        description: 'Gaya vertikal ke atas sesaat di lantai licin yang membalik $v_y$ dari $-6$ menjadi $+6\\text{ m/s}$.',
      },
    ],
    hintOnWrong:
      'Setelah memantul dari lantai licin elastis sempurna, $v_{1x}$ dan $v_{2x}$ tetap, sementara $v_y(\\tau) = +v_{y1} - g\\tau$. Kapankah $v_y(\\tau)^2$ kembali sama dengan $v_1 v_2$?',
    physicsConfig: {
      v1: 3.0,
      v2: 12.0,
      g: 10.0,
      bounceAtFirstPerp: true,
      tBounce: 0.6,
      tMax: 2.0,
      tStar: 1.8, // 0.6 + 1.2
    },
    explanation: {
      memahamiSoal: {
        diketahui: [
          'Kecepatan awal horizontal: $v_1 = 3{,}0\\text{ m/s}$, $v_2 = 12{,}0\\text{ m/s}$ (berlawanan arah)',
          'Percepatan gravitasi: $g = 10{,}0\\text{ m/s}^2$',
          'Tumbukan elastis sempurna dengan lantai horizontal licin terjadi tepat saat $\\vec{v}_1 \\perp \\vec{v}_2$ pertama kali.',
        ],
        ditanyakan: 'Selang waktu tambahan $\\tau$ setelah tumbukan lantai hingga $\\vec{v}_1 \\perp \\vec{v}_2$ lagi.',
        kondisiFisika:
          'Lantai licin tidak mengubah kecepatan horizontal; elastisitas sempurna membalikkan $v_y \\to -v_y$ tepat ketika kedua partikel menyentuh lantai bersamaan.',
        asumsi: ['Lantai datar sempurna, licin tanpa gesekan, koefisien restitusi $e = 1$.'],
      },
      identifikasiKonsep: {
        prinsip: 'Pembalikan Komponen Vertikal pada Tumbukan Elastis & Simetri Parabolik.',
        alasan:
          'Agar $\\vec{v}_1 \\cdot \\vec{v}_2 = -v_1 v_2 + v_y^2 = 0$, syarat $|v_y| = \\sqrt{v_1 v_2}$ dapat dipenuhi oleh dua tanda: $v_y = +\\sqrt{v_1 v_2}$ (tepat sesaat sesudah pantul) dan $v_y = -\\sqrt{v_1 v_2}$ (ketika kembali turun!).',
        hukum: 'Dot product kecepatan, impuls lantai licin ($e = 1$), dan simetri gerak vertikal.',
      },
      visualisasiCatatan:
        'Saksikan pada animasi: pada $t = 0{,}6\\text{ s}$ simbol siku-siku menyala saat menyentuh lantai, lalu keduanya memantul naik (sudut kecepatan menjadi tumpul > $90^\\circ$ di puncak pantulan!), kemudian turun kembali hingga simbol siku-siku menyala kedua kalinya tepat saat menyentuh lantai lagi di $\\tau = 1{,}2\\text{ s}$ ($t_{\\text{total}} = 1{,}8\\text{ s}$)!',
      pemilihanPersamaan: {
        rumusUtamaLatex: 'v_{y0}^{\\prime} = +gt_1 = \\sqrt{v_1 v_2}, \\qquad v_y(\\tau) = v_{y0}^{\\prime} - g\\tau = -\\sqrt{v_1 v_2}',
        maknaRumus:
          'Waktu tambahan yang dibutuhkan sama persis dengan waktu terbang penuh satu lengkungan pantulan dari lantai kembali ke lantai.',
        alasanSesuai: 'Langsung menghubungkan kecepatan pantul dengan syarat tegak lurus kedua kalinya.',
      },
      penyelesaianMatematis: [
        'Hitung waktu saat tegak lurus pertama kali ($t_1$): $$t_1 = \\frac{\\sqrt{3{,}0 \\times 12{,}0}}{10{,}0} = \\frac{\\sqrt{36{,}0}}{10{,}0} = 0{,}6\\text{ s}$$',
        'Tepat sebelum menyentuh lantai pada $t_1 = 0{,}6\\text{ s}$, komponen vertikalnya adalah $v_{y,\\text{sebelum}} = -10{,}0(0{,}6) = -6{,}0\\text{ m/s}$.',
        'Akibat tumbukan elastis sempurna di lantai horizontal licin, komponen horizontal tetap ($3{,}0$ dan $-12{,}0\\text{ m/s}$), sedangkan komponen vertikal berbalik arah menjadi: $$v_{y0}^{\\prime} = +6{,}0\\text{ m/s}$$',
        'Misalkan $\\tau > 0$ adalah selang waktu setelah pantulan. Kecepatan keduanya menjadi: $$\\vec{v}_1(\\tau) = 3{,}0\\hat{i} + (6{,}0 - 10{,}0\\tau)\\hat{j}, \\qquad \\vec{v}_2(\\tau) = -12{,}0\\hat{i} + (6{,}0 - 10{,}0\\tau)\\hat{j}$$',
        'Terapkan syarat tegak lurus kembali ($\\vec{v}_1 \\cdot \\vec{v}_2 = 0$): $$-36{,}0 + (6{,}0 - 10{,}0\\tau)^2 = 0 \\implies |6{,}0 - 10{,}0\\tau| = 6{,}0$$',
        'Akar $\\tau = 0$ adalah momen sesaat tepat setelah pantulan. Untuk $\\tau > 0$, kita ambil cabang negatif: $$6{,}0 - 10{,}0\\tau = -6{,}0 \\implies 10{,}0\\tau = 12{,}0 \\implies \\tau = 1{,}2\\text{ s}$$',
      ],
      hasilAkhir: {
        nilaiEksak: '1,2',
        dibulatkan: '1,2',
        satuan: 's',
      },
      interpretasiFisis:
        'Selama partikel melambung naik ($0 < \\tau < 0{,}6\\text{ s}$) dan baru mulai turun ($0{,}6 < \\tau < 1{,}2\\text{ s}$), nilai $|v_y| < 6{,}0\\text{ m/s}$, sehingga vektor kecepatannya bersudut tumpul ($> 90^\\circ$). Barulah ketika kembali menyentuh ketinggian lantai dengan $v_y = -6{,}0\\text{ m/s}$ pada $\\tau = 1{,}2\\text{ s}$, kedua vektor kecepatan kembali tegak lurus!',
      strategiCepat: {
        metode:
          'Dari simetri gerak vertikal pantulan elastis, waktu untuk kembali memiliki laju vertikal yang sama dengan laju pantul adalah $\\tau = 2t_1 = \\frac{2\\sqrt{v_1 v_2}}{g}$.',
        kapanBerlaku: 'Saat pantulan elastis sempurna dengan lantai datar terjadi tepat di $t = t_1$.',
        peringatanKesalahan:
          'Jangan menjawab $\\tau = 0{,}6\\text{ s}$ (itu waktu ke puncak pantulan di mana $v_y = 0$ dan sudut antar vektor justru $180^\\circ$, bukan $90^\\circ$!), dan jangan menjawab $1{,}8\\text{ s}$ (itu waktu total dari awal, bukan selang waktu tambahan setelah pantulan).',
      },
    },
    narration: {
      soalTextSpoken:
        'Soal nomor lima belas, soal puncak HOTS Olimpiade. Dua partikel kecil bergerak dari satu titik dalam medan gravitasi sepuluh meter per detik kuadrat dengan kecepatan awal horizontal berlawanan arah tiga koma nol dan dua belas koma nol meter per detik. Tepat saat vektor kecepatan mereka saling tegak lurus untuk pertama kalinya, keduanya menumbuk lantai horizontal licin secara elastis sempurna. Berapakah selang waktu tambahan setelah tumbukan hingga vektor kecepatan mereka kembali saling tegak lurus untuk kedua kalinya?',
      stimulusSpoken:
        'Perhatikan lintasan ganda pada diagram: partikel jatuh ke lantai di nol koma enam detik, memantul membentuk parabola kedua, lalu jatuh lagi ke lantai.',
      fbdSpoken:
        'Selama melayang bekerja gaya berat ke bawah. Sesaat di lantai licin, muncul gaya normal impulsif ke atas yang membalikkan komponen kecepatan vertikal tanpa mengubah kecepatan horizontal.',
      persamaanSpoken:
        'Pada saat pertama kali tegak lurus, kecepatan vertikalnya minus enam meter per detik. Begitu memantul elastis, kecepatan vertikal menjadi plus enam meter per detik. Agar dot product kembali nol, kuadrat kecepatan vertikal harus kembali tiga puluh enam.',
      penyelesaianSpoken:
        'Kita dapatkan persamaan nilai mutlak enam dikurangi sepuluh tau sama dengan enam. Untuk tau lebih dari nol, solusinya adalah enam dikurangi sepuluh tau sama dengan minus enam, yang memberikan selang waktu tambahan tau sama dengan satu koma dua detik.',
      interpretasiSpoken:
        'Selama berada di udara pasca pantulan, besar kecepatan vertikal kurang dari enam meter per detik sehingga sudutnya tumpul. Barulah saat menyentuh ketinggian lantai lagi di satu koma dua detik setelah pantul, kecepatannya kembali tegak lurus.',
      strategiSpoken:
        'Waspada jebakan waktu total satu koma delapan detik dan waktu ke puncak nol koma enam detik! Selang waktu tambahannya adalah dua kali t satu, yaitu satu koma dua detik.',
    },
  },
];
