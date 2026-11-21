import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type AppView =
  | 'beranda'
  | 'peta'
  | 'teori'
  | 'simulasi'
  | 'latihan'
  | 'hasil';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  answeredCount: number;
}

const NAV_LINKS: { id: AppView; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'peta', label: 'Peta Materi' },
  { id: 'teori', label: 'Teori Dasar' },
  { id: 'simulasi', label: 'Simulasi Fisika' },
  { id: 'hasil', label: 'Hasil Belajar' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  answeredCount,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <button
          type="button"
          onClick={() => handleNav('beranda')}
          className="text-base sm:text-lg font-display font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span className="inline-block w-3 h-3 rounded-sm bg-yellow-400 border border-zinc-900" aria-hidden="true" />
          <span>OSN Fisika · Soal 3</span>
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Navigasi utama" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  active
                    ? 'text-zinc-950 border-yellow-400 font-semibold'
                    : 'text-zinc-600 border-transparent hover:text-zinc-950 hover:border-zinc-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('latihan')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
              activeView === 'latihan'
                ? 'bg-zinc-950 text-yellow-300 border-zinc-950'
                : 'bg-yellow-400 text-zinc-950 border-zinc-900 hover:bg-yellow-300'
            }`}
          >
            <span className="sm:hidden">Latihan ({answeredCount}/15)</span>
            <span className="hidden sm:inline">Latihan 15 Soal ({answeredCount}/15)</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 rounded-xl border border-zinc-200 text-zinc-800 hover:bg-zinc-100 cursor-pointer shrink-0"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="lg:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                  active
                    ? 'bg-yellow-100 text-zinc-950 font-semibold'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
