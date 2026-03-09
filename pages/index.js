// pages/index.tsx
import Head from 'next/head';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Home() {
  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Galaxy Canvas Animation
    const canvas = document.getElementById('galaxy-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let stars: Star[] = [];
    const starCount = 200;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.size = 0;
        this.speed = 0;
        this.opacity = 0;
        this.fadeSpeed = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y -= this.speed;
        this.opacity += this.fadeSpeed;

        if (this.opacity > 1 || this.opacity < 0) {
          this.fadeSpeed = -this.fadeSpeed;
        }

        if (this.y < 0) {
          this.reset();
          this.y = height;
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.opacity) * 0.8})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    }

    let animationId: number;

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      const gradient = ctx!.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0B0D17');
      gradient.addColorStop(1, '#1a1d2e');
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resize();
      initStars();
    });

    resize();
    initStars();
    animate();

    // GSAP Animations
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((element, i) => {
      gsap.set(element, { opacity: 0, y: 30 });
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Counter animation
    gsap.utils.toArray<HTMLElement>('.counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          counter.innerHTML = Math.floor(obj.val).toString();
        }
      });
    });

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('shadow-lg');
        } else {
          navbar.classList.remove('shadow-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly.');
  };

  return (
    <>
      <Head>
        <title>SearchHawk SEO | Dominate Search Rankings</title>
        <meta name="description" content="Precision-targeted SEO services designed to capture high-value traffic and dominate your niche." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --deep-space: #0B0D17;
          --nebula-purple: #6366f1;
          --cosmic-blue: #3b82f6;
          --star-white: #f8fafc;
          --nebula-glow: rgba(99, 102, 241, 0.15);
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--deep-space);
          color: var(--star-white);
          overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        #galaxy-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 20s infinite ease-in-out;
        }
        
        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(59,130,246,0.1) 70%);
          top: -200px;
          right: -200px;
        }
        
        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(99,102,241,0.05) 70%);
          bottom: 10%;
          left: -100px;
          animation-delay: -5s;
        }
        
        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);
          top: 40%;
          left: 30%;
          animation-delay: -10s;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .glass-card-hover:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(99, 102, 241, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 30px 60px -12px rgba(99, 102, 241, 0.25);
        }
        
        .btn-glow {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-glow:hover::before {
          left: 100%;
        }
        
        .btn-glow:hover {
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
          transform: translateY(-2px);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-blur {
          background: rgba(11, 13, 23, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .stat-number {
          background: linear-gradient(180deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .service-icon {
          position: relative;
        }
        
        .service-icon::after {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .glass-card-hover:hover .service-icon::after {
          opacity: 1;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--deep-space);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1, #3b82f6);
          border-radius: 5px;
        }
        
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
          border-color: #6366f1;
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(30px);
        }
        
        ::selection {
          background: rgba(99, 102, 241, 0.4);
          color: white;
        }

        .logo-container {
          transition: transform 0.3s ease;
        }
        
        .logo-container:hover {
          transform: scale(1.05);
        }

        .hawk-wing {
          animation: wingFlap 3s ease-in-out infinite;
          transform-origin: center;
        }
        
        @keyframes wingFlap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-2deg); }
        }
      `}</style>

      <div className="antialiased">
        {/* Galaxy Background Canvas */}
        <canvas id="galaxy-canvas"></canvas>
        
        {/* Gradient Orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Navigation */}
        <nav className="fixed w-full z-50 nav-blur transition-all duration-300" id="navbar">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3 cursor-pointer group logo-container">
                {/* Hawk Logo SVG */}
                <div className="w-12 h-12 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="hawk-wing" d="M50 20 C30 20 20 35 20 50 C20 65 30 75 50 80 C70 75 80 65 80 50 C80 35 70 20 50 20 Z" fill="url(#hawkGradient)" opacity="0.9"/>
                    <path d="M35 45 Q50 35 65 45 Q50 55 35 45" fill="rgba(255,255,255,0.3)"/>
                    <circle cx="50" cy="35" r="12" fill="url(#hawkGradient)"/>
                    <path d="M58 32 L68 35 L58 38 Z" fill="#fbbf24"/>
                    <circle cx="54" cy="33" r="3" fill="white"/>
                    <circle cx="55" cy="33" r="1.5" fill="#0B0D17"/>
                    <path d="M45 75 L50 90 L55 75 Z" fill="url(#hawkGradient)" opacity="0.8"/>
                    <defs>
                      <linearGradient id="hawkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-white leading-none">SearchHawk</span>
                  <span className="text-xs text-indigo-400 font-semibold tracking-widest uppercase">SEO Agency</span>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</a>
                <a href="#results" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Results</a>
                <a href="#process" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Process</a>
                <a href="#testimonials" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Testimonials</a>
                <a href="#contact" className="btn-glow px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30">
                  Get Started
                </a>
              </div>
              
              <button className="md:hidden text-white" onClick={toggleMobileMenu}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-6 py-4 space-y-3">
              <a href="#services" className="block text-gray-300 hover:text-white py-2">Services</a>
              <a href="#results" className="block text-gray-300 hover:text-white py-2">Results</a>
              <a href="#process" className="block text-gray-300 hover:text-white py-2">Process</a>
              <a href="#contact" className="block text-indigo-400 font-semibold py-2">Get Started</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 reveal">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                <span className="text-sm text-gray-300">Trusted by 500+ companies worldwide</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 reveal">
                Soar Above the <br />
                <span className="text-gradient">Search Competition</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed reveal">
                Like a hawk spotting its prey from miles away, we identify high-value SEO opportunities that others miss. Propel your business to the top of search results with precision and power.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal">
                <a href="#contact" className="btn-glow px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/30 w-full sm:w-auto text-center">
                  Start Your Ascent
                </a>
                <a href="#results" className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                  View Case Studies
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-16 pt-8 border-t border-white/10 reveal">
                <p className="text-sm text-gray-500 mb-6">Trusted by innovative companies</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="text-2xl font-bold text-white">Google</div>
                  <div className="text-2xl font-bold text-white">Shopify</div>
                  <div className="text-2xl font-bold text-white">HubSpot</div>
                  <div className="text-2xl font-bold text-white">Semrush</div>
                  <div className="text-2xl font-bold text-white">Ahrefs</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section id="results" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center reveal">
                <div className="stat-number text-5xl md:text-6xl font-bold mb-2 counter" data-target="500">0</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Clients Served</div>
              </div>
              <div className="text-center reveal">
                <div className="stat-number text-5xl md:text-6xl font-bold mb-2 counter" data-target="98">0</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">% Success Rate</div>
              </div>
              <div className="text-center reveal">
                <div className="stat-number text-5xl md:text-6xl font-bold mb-2 counter" data-target="10">0</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Million+ Rankings</div>
              </div>
              <div className="text-center reveal">
                <div className="stat-number text-5xl md:text-6xl font-bold mb-2 counter" data-target="24">0</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">/7 Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-gradient">Hunting Grounds</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Precision-targeted SEO services designed to capture high-value traffic and dominate your niche.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 reveal">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Technical SEO</h3>
                <p className="text-gray-400 leading-relaxed">Deep site audits, speed optimization, and schema markup implementation. We fix the foundation so Google can crawl and index your site flawlessly.</p>
              </div>
              
              {/* Service 2 */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 reveal">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Content Strategy</h3>
                <p className="text-gray-400 leading-relaxed">Data-driven content that ranks. From keyword research to content calendars, we create authoritative content that attracts links and converts visitors.</p>
              </div>
              
              {/* Service 3 */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 reveal">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Link Building</h3>
                <p className="text-gray-400 leading-relaxed">White-hat authority building through digital PR, guest posting, and strategic partnerships. Quality over quantity—every link moves the needle.</p>
              </div>
              
              {/* Service 4 */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 reveal">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Local SEO</h3>
                <p className="text-gray-400 leading-relaxed">Dominate local search with optimized Google Business Profiles, citation building, and location-based content strategies that drive foot traffic.</p>
              </div>
              
              {/* Service 5 */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 reveal">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Analytics & Reporting</h3>
                <p className="text-gray-400 leading-relaxed">Transparent, actionable reporting. Real-time dashboards showing rankings, traffic, and ROI. No vanity metrics—just business growth.</p>
              </div>
              
              {/* Service 6 */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 reveal">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Mobile SEO</h3>
                <p className="text-gray-400 leading-relaxed">Mobile-first optimization ensuring perfect Core Web Vitals scores, responsive design, and seamless user experiences across all devices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-gradient">Flight Path</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">A proven methodology that takes you from invisible to invincible.</p>
            </div>
            
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 transform -translate-y-1/2"></div>
              
              <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="text-center reveal">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-indigo-500/30 border-4 border-gray-900">1</div>
                  <h3 className="text-xl font-bold mb-2">Discovery</h3>
                  <p className="text-gray-400 text-sm">Deep dive into your business, competitors, and market opportunities.</p>
                </div>
                
                {/* Step 2 */}
                <div className="text-center reveal">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-purple-500/30 border-4 border-gray-900">2</div>
                  <h3 className="text-xl font-bold mb-2">Strategy</h3>
                  <p className="text-gray-400 text-sm">Custom roadmap with clear milestones and KPIs aligned with your goals.</p>
                </div>
                
                {/* Step 3 */}
                <div className="text-center reveal">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-500/30 border-4 border-gray-900">3</div>
                  <h3 className="text-xl font-bold mb-2">Execution</h3>
                  <p className="text-gray-400 text-sm">Rapid implementation with weekly sprints and continuous optimization.</p>
                </div>
                
                {/* Step 4 */}
                <div className="text-center reveal">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-cyan-500/30 border-4 border-gray-900">4</div>
                  <h3 className="text-xl font-bold mb-2">Scale</h3>
                  <p className="text-gray-400 text-sm">Expand winning strategies and dominate new keywords and markets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Success Stories</span></h2>
              <p className="text-gray-400 text-lg">Real results from real businesses.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="glass-card rounded-2xl p-8 reveal">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">&quot;SearchHawk transformed our online presence. We went from page 3 to position 1 for our main keywords in just 4 months. Revenue increased by 340%.&quot;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">JD</div>
                  <div className="ml-4">
                    <div className="font-semibold">James Davidson</div>
                    <div className="text-sm text-gray-500">CEO, TechFlow Solutions</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="glass-card rounded-2xl p-8 reveal">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">&quot;The team at SearchHawk doesn&apos;t just do SEO—they understand business. Their strategic approach helped us capture market share we didn&apos;t know existed.&quot;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">SM</div>
                  <div className="ml-4">
                    <div className="font-semibold">Sarah Mitchell</div>
                    <div className="text-sm text-gray-500">Marketing Director, Bloom Commerce</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="glass-card rounded-2xl p-8 reveal">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">&quot;Finally, an SEO agency that delivers on promises. Transparent reporting, clear communication, and most importantly—results that stick.&quot;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">RK</div>
                  <div className="ml-4">
                    <div className="font-semibold">Robert Kim</div>
                    <div className="text-sm text-gray-500">Founder, Apex Digital</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10 reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to <span className="text-gradient">Take Flight?</span></h2>
            <p className="text-xl text-gray-300 mb-10">Join 500+ businesses already dominating their search rankings. Your competitors are moving—don&apos;t get left behind.</p>
            <a href="#contact" className="btn-glow inline-block px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/40">
              Get Your Free Audit
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Start Your <span className="text-gradient">Journey</span></h2>
                <p className="text-gray-400 text-lg mb-8">Ready to see how high you can soar? Get in touch for a free consultation and SEO audit.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-white">hello@searchhawkseo.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-white">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-white">San Francisco, CA</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-8 reveal">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 input-glow focus:outline-none transition-all" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 input-glow focus:outline-none transition-all" placeholder="john@company.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input type="url" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 input-glow focus:outline-none transition-all" placeholder="https://yourwebsite.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 input-glow focus:outline-none transition-all resize-none" placeholder="Tell us about your project..." required></textarea>
                  </div>
                  <button type="submit" className="w-full btn-glow px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                {/* Small Hawk Logo */}
                <div className="w-10 h-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 20 C30 20 20 35 20 50 C20 65 30 75 50 80 C70 75 80 65 80 50 C80 35 70 20 50 20 Z" fill="url(#footerGradient)"/>
                    <path d="M35 45 Q50 35 65 45 Q50 55 35 45" fill="rgba(255,255,255,0.3)"/>
                    <circle cx="50" cy="35" r="12" fill="url(#footerGradient)"/>
                    <path d="M58 32 L68 35 L58 38 Z" fill="#fbbf24"/>
                    <circle cx="54" cy="33" r="3" fill="white"/>
                    <circle cx="55" cy="33" r="1.5" fill="#0B0D17"/>
                    <defs>
                      <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">SearchHawk</span>
              </div>
              
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
              
              <div className="mt-4 md:mt-0 text-sm text-gray-500">
                © 2024 SearchHawk SEO. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}