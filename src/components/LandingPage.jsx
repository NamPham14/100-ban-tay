import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0E16] text-[#E8EDF5] font-sans min-h-screen selection:bg-[#6E2BDB] selection:text-white overflow-x-hidden">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0E16]/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-5 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 z-50">
            <a href="/" className="block shrink-0">
              <img src="/logo.png" alt="Logo" className="h-9 md:h-11 w-auto object-contain" />
            </a>
            <div className="block">
              <a href="/" className="font-heading text-sm md:text-lg font-bold tracking-tight uppercase block leading-none">
                DỰNG XÂY VIỆT NAM
              </a>
              <div className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-[#179FE8] font-semibold">100 Bàn Tay Dựng Xây</div>
            </div>
          </div>
          
          <a href="/trien-lam" className="btn-gradient px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Vào Triển Lãm
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center pt-32 pb-10 px-6 md:px-12 overflow-hidden">
        {/* Aurora glows */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#179FE8]/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -bottom-48 -right-32 w-[600px] h-[600px] bg-[#6E2BDB]/25 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#D4622B]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none"></div>

        {/* Hand image accent */}
        <div className="absolute right-[-10%] bottom-0 w-[45%] max-w-xl opacity-25 pointer-events-none hidden lg:block mix-blend-luminosity">
          <img src="/images/hands/1.JPG" alt="" className="w-full h-auto object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#D4622B]/40 bg-[#D4622B]/10 text-[#E8EDF5] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4622B] animate-pulse"></span>
            Triển lãm tư liệu lao động 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-heading text-[15vw] sm:text-7xl md:text-8xl lg:text-[120px] font-bold uppercase tracking-tighter leading-[0.92] mb-6"
          >
            100 Bàn Tay
            <br />
            <span className="text-gradient">1 Hình Hài</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-xl font-light text-[#8FA3BC] max-w-xl mb-4 leading-relaxed"
          >
            Mỗi bàn tay chai sần là một câu chuyện. 
            100 con người thầm lặng dựng nên đất nước bằng mồ hôi.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="font-serif italic text-lg md:text-2xl text-[#179FE8] mb-12"
          >
            "Thấy công trình, thấu con người."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.a 
              href="/trien-lam"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="group relative flex items-center justify-center gap-4 bg-white text-[#111] px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-[#179FE8] hover:text-white transition-all duration-300 shadow-xl overflow-hidden"
            >
              <span className="font-heading text-xs md:text-sm uppercase tracking-[0.2em] font-bold relative z-10">Bước vào Triển Lãm</span>
              <span className="text-lg md:text-xl relative z-10 group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>

            <motion.a 
              href="#about"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="group flex items-center justify-center gap-3 bg-transparent border border-white/30 text-white px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <span className="font-heading text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Về Chiến Dịch</span>
              <span className="text-lg md:text-xl group-hover:translate-y-1 transition-transform">↓</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-16 md:mt-20 flex items-center justify-center gap-8 md:gap-14"
          >
            {[
              { value: '100', label: 'Bàn Tay' },
              { value: '63', label: 'Tỉnh Thành' },
              { value: '1', label: 'Hình Hài VN' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-14">
                {i > 0 && <div className="w-px h-10 bg-white/10 hidden sm:block"></div>}
                <div className="text-center">
                  <div className="font-heading text-4xl md:text-5xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#8FA3BC] font-semibold mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#8FA3BC]/60 animate-bounce pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </section>

      {/* MISSION */}
      <section id="about" className="relative py-24 md:py-32 px-6 md:px-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#179FE8]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-heading text-[11px] font-bold text-[#179FE8]">01</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#179FE8]/60 to-transparent"></div>
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.95] mb-8">
                Đằng sau khối bê tông<br />
                <span className="text-gradient">vô tri...</span>
              </h2>
              <p className="text-lg text-[#8FA3BC] leading-relaxed mb-6">
                Khi một tòa nhà vươn cao, người ta nhớ tên kiến trúc sư — nhưng những đôi bàn tay trực tiếp nhào nặn gạch đá, chịu rát bỏng trưa hè và giá lạnh đêm đông, lại thường chìm vào quên lãng.
              </p>
              <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <svg className="absolute top-5 right-5 w-8 h-8 text-[#179FE8]/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-serif italic text-lg text-[#E8EDF5] leading-snug">
                  "Tôi ngưỡng mộ những công trình làm thay đổi diện mạo đất nước, nhưng lại ít khi nhớ đến những con người đứng sau chúng."
                </p>
                <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#179FE8]">— Insight Chiến Dịch</div>
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  num: '02',
                  title: 'Sứ Mệnh',
                  text: 'Kể lại những câu chuyện thật về con người trong ngành xây dựng thông qua trải nghiệm truyền thông trực quan và cảm xúc, giúp người trẻ hiểu hơn, đồng cảm hơn và trân trọng hơn những giá trị mà họ mang lại cho cuộc sống.',
                },
                {
                  num: '03',
                  title: 'Tầm Nhìn',
                  text: 'Trở thành chiến dịch truyền thông đưa hình ảnh ngành xây dựng đến gần người trẻ theo hướng hiện đại, gần gũi và nhân văn; giúp công chúng nhìn rõ vai trò của con người trong ngành.',
                },
                {
                  num: '04',
                  title: 'Lưu Trữ Cảm Xúc',
                  text: '100 bức ảnh bàn tay được lưu trữ hoàn toàn nguyên bản, không qua chỉnh sửa hào nhoáng — vết chai sạn của thợ nề 30 năm, đôi tay thợ lặn thi công kè biển Trường Sa, bàn tay thợ sắt trẻ tại TPHCM.',
                },
              ].map((item) => (
                <div key={item.num} className="group border border-white/10 hover:border-[#6E2BDB]/60 rounded-2xl p-7 md:p-8 bg-[#0D1322] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(110,43,219,0.5)]">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-heading text-sm font-bold text-[#179FE8] bg-[#179FE8]/10 border border-[#179FE8]/30 w-10 h-10 flex items-center justify-center rounded-full">{item.num}</span>
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide">{item.title}</h3>
                  </div>
                  <p className="text-[#8FA3BC] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERIES */}
      <section id="series" className="relative py-24 md:py-32 overflow-hidden bg-[#0D1322]">
        <div className="absolute inset-0 z-0">
          <img src="/images/hands/7.JPG" alt="" className="w-full h-full object-cover opacity-25 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1322] via-[#0D1322]/85 to-[#0A0E16]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-heading text-[11px] font-bold text-[#D4622B]">SERIES</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#D4622B]/60 to-transparent"></div>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.95] mb-8">
              Giải Mã<br />
              <span className="text-gradient-warm">Ngành Xây Dựng</span>
            </h2>
            <p className="text-[#8FA3BC] text-lg leading-relaxed mb-10">
              Chuỗi nội dung truyền thông tư liệu mang đến cái nhìn toàn diện, trung thực về thực tế ngành xây dựng hiện đại: từ bản vẽ thiết kế, giải pháp vật liệu, công nghệ giám sát cho đến nhịp sống thực tế trên công trường.
            </p>
            <ul className="space-y-4 mb-12">
              {[
                'Giải mã các kỹ thuật và tiêu chuẩn hiện đại trực quan.',
                'Tôn vinh lực lượng kỹ sư, công nhân và góc khuất lao động.',
                'Cập nhật xu hướng công nghệ (BIM, vật liệu xanh, giám sát tự động).',
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 text-[#E8EDF5]">
                  <span className="w-5 h-5 rounded-full bg-[#179FE8]/20 border border-[#179FE8]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#179FE8" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/trien-lam" className="inline-flex items-center gap-3 border border-[#D4622B]/60 text-[#E8EDF5] hover:bg-[#D4622B] hover:text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all">
              ▶ Xem Tập Mới Nhất
            </a>
          </div>
        </div>
      </section>

      {/* PHOTO CONTEST */}
      <section id="contest" className="py-24 md:py-32 px-6 md:px-12 bg-[#0A0E16]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="font-heading text-[11px] font-bold text-[#6E2BDB]">CUỘC THI</span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#6E2BDB]"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#6E2BDB]"></div>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
              Những Bàn Tay<br />
              <span className="text-gradient">Dựng Xây</span>
            </h2>
            <p className="text-[#8FA3BC] text-lg mb-8 font-serif italic">
              "Ghi lại những khoảnh khắc thầm lặng đằng sau những công trình vươn cao."
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#D4622B]/40 bg-[#D4622B]/10 text-sm font-bold text-[#E8EDF5]">
              <span className="text-[#D4622B]">◆</span> 110+ Bài dự thi toàn quốc · Hàng ngàn câu chuyện được lan tỏa
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-[#0D1322] border border-white/10 aspect-[3/4]">
                <img src={`/images/hands/${i * 10}.JPG`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="text-[#D4622B] text-[10px] font-bold uppercase tracking-widest mb-1">CÔNG TRÌNH / TỈNH THÀNH</div>
                  <h3 className="text-white font-bold text-xl mb-2">Tên Tác Phẩm Nổi Bật {i}</h3>
                  <p className="text-zinc-300 text-xs font-serif italic line-clamp-3 mb-4">Một đoạn ngắn 2-3 câu chia sẻ hoàn cảnh ra đời của bức ảnh. Chụp lại lúc hừng đông tại công trường...</p>
                  <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider border-t border-white/20 pt-3">Bởi: Tác giả / Đơn vị {i}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="font-serif italic text-xl md:text-2xl text-[#8FA3BC] max-w-3xl mx-auto">
              "Mỗi công trình vững chãi theo thời gian đều được xây đắp từ hàng ngàn khoảnh khắc vô hình của người lao động. Bức ảnh của bạn chính là tư liệu lưu giữ những giá trị đó."
            </p>
          </div>
        </div>
      </section>

      {/* CSR */}
      <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hands/44.JPG" alt="CSR" className="w-full h-full object-cover grayscale opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#6E2BDB]/60 via-[#179FE8]/40 to-[#D4622B]/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E16] via-transparent to-[#0A0E16]/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="font-heading text-[11px] font-bold text-[#E8EDF5]/80 uppercase tracking-[0.3em] mb-6">Tuyên ngôn & Triết lý CSR</div>
          <h2 className="font-heading text-4xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tighter">
            Trách Nhiệm Xã Hội<br />& Sự Bền Vững
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-serif italic leading-relaxed">
            "Mỗi công trình mọc lên không chỉ đo bằng chiều cao hay diện tích, mà bằng những giá trị tích cực để lại cho cộng đồng và hệ sinh thái xung quanh."
          </p>
        </div>
      </section>

      {/* GUESTBOOK */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0D1322]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-heading text-[11px] font-bold text-[#179FE8]">LƯU BÚT</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#179FE8]"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#179FE8]"></div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tighter">
            Những điều bạn muốn nói...
          </h2>
          <p className="text-[#8FA3BC] mb-12 max-w-2xl mx-auto leading-relaxed">
            Chiến dịch 100 Bàn Tay Dựng Xây ra đời không phải để phô diễn kỹ thuật, mà để trả lại vị trí xứng đáng và tôn vinh nhân phẩm lao động của những người hùng thầm lặng ấy. Hãy để lại lời tri ân của bạn tại đây.
          </p>
          
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto text-left shadow-[0_30px_80px_-30px_rgba(110,43,219,0.5)]">
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#8FA3BC] mb-2">Tên của bạn</label>
              <input type="text" className="w-full bg-[#0A0E16]/70 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#179FE8] transition-colors" placeholder="Nhập tên..." />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#8FA3BC] mb-2">Lời nhắn / Tri ân</label>
              <textarea rows="4" className="w-full bg-[#0A0E16]/70 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#179FE8] transition-colors resize-none" placeholder="Viết những điều bạn muốn nói..."></textarea>
            </div>
            <button className="w-full btn-gradient text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl">
              Gửi Lời Tri Ân
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080B12] text-[#8FA3BC] py-12 md:py-16 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-heading font-bold text-lg uppercase text-[#E8EDF5]">DỰNG XÂY VIỆT NAM</div>
                <div className="text-sm text-[#179FE8]">100 Bàn Tay Dựng Xây</div>
              </div>
            </div>
            <div className="text-sm">Đơn vị khởi xướng & đồng hành cùng lao động Việt</div>
          </div>
          <div className="text-left md:text-right">
            <a href="/trien-lam" className="btn-gradient inline-flex items-center gap-3 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Vào Triển Lãm <span>→</span>
            </a>
            <div className="text-xs uppercase tracking-widest">
              © 2026 Lưu trữ văn hóa & tư liệu nghệ thuật lao động
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
