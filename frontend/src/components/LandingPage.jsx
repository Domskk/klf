import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './LandingPage.css';
import Header from './Header';
import Signup from './Signup';
import Login from './Login';
import AdminLogin from './AdminLogin';
import gym1 from '../assets/GYM1.jpg';
import gym2 from '../assets/GYM2.jpg';
import gym3 from '../assets/GYM3.jpg';
import gym4 from '../assets/GYM4.jpg';
import gym5 from '../assets/GYM5.jpg';
import gym6 from '../assets/GYM6.jpg';
import gym7 from '../assets/GYM7.jpg';
import gym9 from '../assets/GYM9.jpg';

// ─── Content ──────────────────────────────────────────────────────────────────
const TRAINERS = [
  { name: 'Marco Cruz',  specialty: 'Strength Training Coach',         initials: 'MC' },
  { name: 'Ana Mendoza', specialty: 'Yoga and Flexibility Instructor', initials: 'AM' },
  { name: 'Jake Lim',    specialty: 'Cardio and Fitness Coach',        initials: 'JL' },
  { name: 'Ben Torres',  specialty: 'Powerlifting Coach',              initials: 'BT' },
];

const PLANS = [
  { label: '1 Month',  price: '₱800',   period: '/month',    highlight: true  },
  { label: '3 Months', price: '₱2,300', period: '/quarter',  highlight: false },
  { label: '6 Months', price: '₱4,300', period: '/6 months', highlight: false },
  { label: '1 Year',   price: '₱8,300', period: '/year',     highlight: false },
];

const PLAN_PERKS = ['Unlimited Gym Access', 'QR Check-in', 'Progress Dashboard'];

const TRAINER_SESSIONS = [
  { label: '1 Session',   price: '₱300',   note: 'Per session' },
  { label: '10 Sessions', price: '₱2,500', note: '10 sessions' },
];

const STATS = [
  { value: '100+', label: 'Active Members'    },
  { value: '10+',  label: 'Certified Coaches' },
  { value: '5+',   label: 'Years in Service'  },
];

const STEPS = [
  { num: '01', title: 'Create Your Account',  desc: 'Sign up online in under a minute — no paperwork needed.' },
  { num: '02', title: 'Visit the Front Desk', desc: 'Our staff will help you choose a membership plan and process payment.' },
  { num: '03', title: 'Start Training!',      desc: 'Scan your QR code at the entrance and hit the gym floor.' },
];

const PHOTOS = [
  { src: gym1, alt: 'Strength machines on the main training floor', cls: 'lp-gallery__item--feature' },
  { src: gym3, alt: 'Smith machine and refreshment cooler' },
  { src: gym2, alt: 'Rack of dumbbells on green turf', cls: 'lp-gallery__item--tall' },
  { src: gym4, alt: 'Yellow weight benches and racks' },
  { src: gym5, alt: 'Chest press and selectorized machines' },
  { src: gym6, alt: 'Training area near the front desk' },
  { src: gym7, alt: 'Cardio equipment beside the yellow frame entrance' },
  { src: gym9, alt: 'Open gym floor with overhead lighting' },
];

const MARQUEE_TEXT = 'Strong. Confident. Unstoppable. Join KL Fitness Today!';

// ─── Icons (inline SVG, no extra dependency) ──────────────────────────────────
const svgProps = {
  viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

const DumbbellIcon = () => (
  <svg {...svgProps}>
    <rect x="4" y="18" width="5" height="12" rx="1.5" /><rect x="9" y="14" width="6" height="20" rx="2" />
    <rect x="33" y="14" width="6" height="20" rx="2" /><rect x="39" y="18" width="5" height="12" rx="1.5" />
    <path d="M15 24h18" />
  </svg>
);
const QrIcon = () => (
  <svg {...svgProps}>
    <rect x="6" y="6" width="14" height="14" rx="2" /><rect x="28" y="6" width="14" height="14" rx="2" />
    <rect x="6" y="28" width="14" height="14" rx="2" /><rect x="11" y="11" width="4" height="4" />
    <rect x="33" y="11" width="4" height="4" /><rect x="11" y="33" width="4" height="4" />
    <path d="M28 28h6v6h-6zM38 28v.01M28 40v.01M38 38h4v4M34 42v-4" />
  </svg>
);
const ChartIcon = () => (
  <svg {...svgProps}><path d="M6 6v36h36" /><path d="m13 32 9-10 7 6 11-14" /><path d="M33 14h7v7" /></svg>
);
const TrainerIcon = () => (
  <svg {...svgProps}><circle cx="24" cy="15" r="8" /><path d="M8 42c0-9 7-15 16-15s16 6 16 15" /><path d="m24 27 3 6-3 4-3-4z" /></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const LogoMark = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 3 5 8v11c0 9 6 15 15 18 9-3 15-9 15-18V8z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M12 20h16M14 15v10M26 15v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FEATURES = [
  { icon: <DumbbellIcon />, title: 'Premium Equipment', desc: 'State-of-the-art machines and free weights maintained daily for your safety and performance.' },
  { icon: <QrIcon />,       title: 'Smart Attendance',  desc: 'QR-based check-in system with real-time attendance tracking and membership status alerts.' },
  { icon: <ChartIcon />,    title: 'Progress Analytics', desc: 'AI-driven insights into your workout frequency, personal records, and dropout risk alerts.' },
  { icon: <TrainerIcon />,  title: 'Expert Trainers',   desc: 'Book one-on-one sessions with certified coaches who match your specific fitness goals.' },
];

// ─── Shared heading ───────────────────────────────────────────────────────────
function SectionHead({ title, sub }) {
  return (
    <div className="lp-head" data-reveal>
      <h2 className="lp-head__title">{title}</h2>
      {sub && <p className="lp-head__sub">{sub}</p>}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onSignup, onLogin }) {
  return (
    <section className="lp-hero" id="home">
      <div className="lp-container lp-hero__grid">
        <div className="lp-hero__visual" aria-hidden="true">
          <span className="lp-hero__circle" />
          <svg className="lp-hero__barbell" viewBox="0 0 400 200">
            <g fill="#2a2a2a" stroke="#ffc300" strokeWidth="3">
              <rect x="20" y="60" width="28" height="80" rx="6" />
              <rect x="56" y="40" width="34" height="120" rx="8" />
              <rect x="90" y="92" width="220" height="16" rx="4" />
              <rect x="310" y="40" width="34" height="120" rx="8" />
              <rect x="352" y="60" width="28" height="80" rx="6" />
            </g>
          </svg>
        </div>
        <div className="lp-hero__copy">
          <span className="lp-hero__badge">🏆 The most friendly and affordable gym in Olongapo City</span>
          <h1 className="lp-hero__title">
            Forge Your <span className="lp-gold">Strongest Self.</span>
          </h1>
          <p className="lp-hero__sub">
            Experience a smarter way to train with professional coaches, modern equipment,
            smart attendance tracking, and personalized fitness solutions.
          </p>
          <div className="lp-hero__actions">
            <button type="button" className="lp-btn lp-btn--primary lp-btn--lg" onClick={onSignup}>
              Start Your Journey
            </button>
            <button type="button" className="lp-btn lp-btn--link" onClick={onLogin}>
              Member Login →
            </button>
          </div>
          <ul className="lp-hero__trust">
            {['No Hidden Fees', 'Expert Trainers', 'Smart QR Check-in'].map((t) => (
              <li key={t}><CheckIcon />{t}</li>
            ))}
          </ul>
          <div className="lp-hero__stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee banner ───────────────────────────────────────────────────────────
function Marquee() {
  return (
    <div className="lp-marquee" aria-hidden="true">
      <div className="lp-marquee__track">
        {Array.from({ length: 8 }, (_, i) => <span key={i}>{MARQUEE_TEXT}</span>)}
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="lp-band lp-band--alt" id="features">
      <div className="lp-container">
        <SectionHead title="Why Choose KL Fitness" sub="Everything you need to succeed on your fitness journey." />
        <div className="lp-features__grid">
          {FEATURES.map(({ icon, title, desc }) => (
            <article key={title} className="lp-card" data-reveal>
              <div className="lp-card__icon">{icon}</div>
              <h3 className="lp-card__title">{title}</h3>
              <p className="lp-card__desc">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function GymGallery() {
  return (
    <section className="lp-band" id="gallery">
      <div className="lp-container">
        <SectionHead title="World-Class Facilities" sub="Take a look inside our gym." />
        <div className="lp-gallery__grid" data-reveal>
          {PHOTOS.map((p) => (
            <figure key={p.src} className={`lp-gallery__item ${p.cls || ''}`}>
              <img src={p.src} alt={p.alt} className="lp-gallery__img" loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Getting started ──────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section className="lp-band lp-band--alt" id="how">
      <div className="lp-container">
        <SectionHead title="Three Simple Steps" sub="Getting started with KL Fitness is quick and easy." />
        <div className="lp-how__grid">
          {STEPS.map((s) => (
            <div key={s.num} className="lp-how__step" data-reveal>
              <article className="lp-card lp-how__card">
                <div className="lp-how__num">{s.num}</div>
                <h3 className="lp-card__title">{s.title}</h3>
                <p className="lp-card__desc">{s.desc}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Plans({ onSignup }) {
  return (
    <section className="lp-band" id="plans">
      <div className="lp-container">
        <SectionHead title="Simple, Transparent Pricing" sub="Find the perfect plan that suits your fitness goals and budget." />
        <div className="lp-plans__joining" data-reveal>
          <span>🎉</span> One-time joining fee of only <strong>₱100</strong>
        </div>

        <div className="lp-plans__grid">
          {PLANS.map((p) => (
            <article key={p.label} className={`lp-plan ${p.highlight ? 'lp-plan--hot' : ''}`} data-reveal>
              {p.highlight && <span className="lp-plan__tag">Most Popular</span>}
              <h3 className="lp-plan__term">{p.label}</h3>
              <div className="lp-plan__price">
                {p.price}<small>{p.period}</small>
              </div>
              <ul className="lp-plan__perks">
                {PLAN_PERKS.map((perk) => (
                  <li key={perk}><CheckIcon />{perk}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`lp-btn lp-plan__btn ${p.highlight ? 'lp-plan__btn--dark' : 'lp-btn--primary'}`}
                onClick={onSignup}
              >
                Join Now
              </button>
            </article>
          ))}
        </div>

        <div className="lp-pt">
          <div className="lp-pt__head" data-reveal>
            <h3>Personal Trainer Sessions</h3>
            <p>One-on-one coaching, tailored to you.</p>
          </div>
          <div className="lp-pt__grid">
            {TRAINER_SESSIONS.map((t) => (
              <article key={t.label} className="lp-plan lp-plan--simple" data-reveal>
                <h3 className="lp-plan__term">{t.label}</h3>
                <div className="lp-plan__price">{t.price}</div>
                <span className="lp-plan__note">{t.note}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="lp-plans__cta" data-reveal>
          <button type="button" className="lp-btn lp-btn--primary lp-btn--lg" onClick={onSignup}>
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Trainers ─────────────────────────────────────────────────────────────────
function Trainers() {
  return (
    <section className="lp-band lp-band--alt" id="trainers">
      <div className="lp-container">
        <SectionHead title="Meet Our Expert Coaches" sub="Certified professionals ready to help you reach your goals." />
        <div className="lp-trainers__grid">
          {TRAINERS.map((t) => (
            <article key={t.name} className="lp-card lp-trainer" data-reveal>
              <div className="lp-trainer__avatar" aria-hidden="true">{t.initials}</div>
              <h3 className="lp-trainer__name">{t.name}</h3>
              <p className="lp-trainer__role">{t.specialty}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Call to action ───────────────────────────────────────────────────────────
function CTABanner({ onSignup }) {
  return (
    <section className="lp-band lp-band--cta">
      <div className="lp-container">
        <div className="lp-cta" style={{ '--cta-image': `url(${gym4})` }} data-reveal>
          <h2 className="lp-cta__title">
            READY TO <span className="lp-gold">TRANSFORM</span> YOUR BODY?
          </h2>
          <p className="lp-cta__sub">
            Take the first step toward your fitness goals. Join KL Fitness and start building
            a stronger, healthier version of yourself.
          </p>
          <button type="button" className="lp-btn lp-btn--primary lp-btn--lg" onClick={onSignup}>
            Join KL Fitness Today
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="lp-footer" id="contact">
      <div className="lp-container">
        <div className="lp-footer__grid">
          <div>
            <a href="#home" className="lp-footer__brand" aria-label="KL Fitness home">
              <span className="lp-footer__mark"><LogoMark /></span>
              <span>KL <em>FITNESS</em></span>
            </a>
            <p className="lp-footer__tagline">Forge Your Strongest Self</p>
            <div className="lp-footer__social">
              <a href="https://facebook.com/KLFGYM" target="_blank" rel="noopener noreferrer" aria-label="KL Fitness on Facebook"><FacebookIcon /></a>
              <a href="https://instagram.com/klf_gym" target="_blank" rel="noopener noreferrer" aria-label="KL Fitness on Instagram"><InstagramIcon /></a>
            </div>
          </div>
          <div>
            <h4 className="lp-footer__heading">Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Why Choose Us</a></li>
              <li><a href="#gallery">Facilities</a></li>
              <li><a href="#plans">Plans</a></li>
              <li><a href="#trainers">Coaches</a></li>
            </ul>
          </div>
          <div>
            <h4 className="lp-footer__heading">Hours</h4>
            <ul>
              <li>Mon – Fri: 6:00 AM – 9:00 PM</li>
              <li>Sat – Sun: 8:00 AM – 5:00 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="lp-footer__heading">Contact</h4>
            <ul>
              <li>Caby's Commercial, 96 Magsaysay Dr, Olongapo City, 2200 Zambales</li>
              <li><a href="https://facebook.com/KLFGYM" target="_blank" rel="noopener noreferrer">Facebook.com/KLFGYM</a></li>
              <li><a href="https://instagram.com/klf_gym" target="_blank" rel="noopener noreferrer">Instagram.com/klf_gym</a></li>
            </ul>
          </div>
        </div>
        <p className="lp-footer__copy">© 2026 KL Fitness. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── LandingPage ──────────────────────────────────────────────────────────────
export default function LandingPage({ onLoginSuccess, onAdminLoginSuccess }) {
  const [showSignup,     setShowSignup]     = useState(false);
  const [showLogin,      setShowLogin]      = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const rootRef = useRef(null);

  // Smooth anchor scrolling, only while the landing page is mounted.
  useEffect(() => {
    document.documentElement.classList.add('lp-smooth');
    return () => document.documentElement.classList.remove('lp-smooth');
  }, []);

  // Fade-in on scroll for every [data-reveal] element. The class that hides
  // them is added before first paint so there is no flash.
  useLayoutEffect(() => {
    const els = [...rootRef.current.querySelectorAll('[data-reveal]')];
    if (!('IntersectionObserver' in window)) return undefined;

    els.forEach((el, i) => {
      el.classList.add('lp-reveal');
      el.style.setProperty('--d', `${(i % 4) * 80}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('lp-in'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="lp-root" ref={rootRef}>
        <Header onAdminClick={() => setShowAdminLogin(true)} />

        <main>
          <Hero
            onSignup={() => setShowSignup(true)}
            onLogin={() => setShowLogin(true)}
          />
          <Marquee />
          <Features />
          <GymGallery />
          <HowItWorks />
          <Plans onSignup={() => setShowSignup(true)} />
          <Trainers />
          <CTABanner onSignup={() => setShowSignup(true)} />
        </main>
        <Footer />
      </div>

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
        />
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => { setShowLogin(false); onLoginSuccess(); }}
          onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
        />
      )}

      {showAdminLogin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onAdminSuccess={() => { setShowAdminLogin(false); onAdminLoginSuccess?.(); }}
        />
      )}
    </>
  );
}
