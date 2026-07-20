/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Globe, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ArrowRight,
  Menu,
  X,
  FileText,
  User,
  Weight,
  Layers,
  ArrowUpRight,
  Anchor,
  Home,
  Package,
  Building2,
  Tractor,
  Factory,
  Pickaxe,
  PlaneTakeoff,
  Cpu,
  Users,
  Thermometer,
  Dna,
  Network,
  FlaskConical,
  Hospital,
  Heart
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import trialImg from "./assets/images/clinical_logistics_trial_1784378921272.jpg";
import cryoImg from "./assets/images/clinical_logistics_cryo_1784378935487.jpg";
import custodyImg from "./assets/images/clinical_logistics_custody_1784378948983.jpg";
import networkImg from "./assets/images/clinical_logistics_network_1784378962882.jpg";
import heroBgImg from "./assets/images/clinical_hero_bg_1784384987976.jpg";

// Types
interface Service {
  title: string;
  description: string;
  icon: any;
  image: string;
  details: string;
  features: string[];
}

interface Industry {
  name: string;
  description: string;
  icon: any;
}

// Data
const SERVICES: Service[] = [
  {
    title: "Clinical Trial Logistics",
    description: "We provide specialized, \"white-glove\" transport services dedicated exclusively to clinical trial materials, ensuring secure and seamless movement between laboratories and research institutes.",
    icon: <FileText className="w-5 h-5" />,
    image: trialImg,
    details: "Our white-glove clinical trial logistics are designed for absolute safety and timing. We handle everything from pre-trial site setups to temperature-controlled transit of biospecimens, ensuring your study meets every critical milestone.",
    features: ["cGMP & GDP compliant chain", "Active & passive shippers", "Real-time temperature telemetry", "Priority airport handling"]
  },
  {
    title: "Cryogenic Cell Transport",
    description: "Our fleet utilizes advanced cryogenic infrastructure, providing validated, ultra-low temperature environments (below –150°C) essential for maintaining the viability of cell-based therapies.",
    icon: <Thermometer className="w-5 h-5" />,
    image: cryoImg,
    details: "Maintaining temperatures below –150°C is critical for cell-therapy viability. We use validated liquid nitrogen dry vapor shippers equipped with redundant sensor arrays and GPS tracking to safeguard structural viability at every stage.",
    features: ["Ultra-low temperature (< -150°C)", "LN2 dry vapor shipper tracking", "Continuous tilt & temperature logs", "Validated thermal durability"]
  },
  {
    title: "Chain of Custody Management",
    description: "We manage rigorous, audit-ready digital tracking and documentation systems, ensuring that every biological asset is fully accounted for and protected from laboratory to clinical site.",
    icon: <ShieldCheck className="w-5 h-5" />,
    image: custodyImg,
    details: "Our secure digital registry tracks chain of custody and chain of identity flawlessly. We provide continuous digital logs, audit-ready documentation, and real-time alerts to guarantee absolute transparency and zero-loss handling.",
    features: ["Audit-ready compliance reports", "Chain of identity validation", "Tamper-evident sealing", "Biometric custody handovers"]
  },
  {
    title: "Clinical Network Coordination",
    description: "We establish and operate dedicated transport lanes, specifically engineered to connect Oloker’s manufacturing facilities directly to approved medical centers and research partners.",
    icon: <Network className="w-5 h-5" />,
    image: networkImg,
    details: "By establishing dedicated high-security logistics corridors, we connect advanced therapy manufacturing suites directly with clinical trials centers. This eliminates transfer delays and secures the transit pipeline.",
    features: ["Direct factory-to-clinic routes", "Dedicated specialist couriers", "Interstate regulatory clearances", "24/7 priority routing management"]
  }
];

const INDUSTRIES: Industry[] = [
  {
    name: "Clinical Research Institutes",
    description: "Providing secure, compliant, and time-critical logistics for research centers engaged in advanced cellular therapy studies.",
    icon: <FlaskConical className="w-8 h-8" />
  },
  {
    name: "Biotechnology & Pharma",
    description: "Dedicated transport solutions for biotechnology partners, ensuring the integrity of sensitive, high-value Advanced Therapy Medicinal Products (ATMPs).",
    icon: <Dna className="w-8 h-8" />
  },
  {
    name: "Clinical Trial Sites",
    description: "Reliable, GDP-compliant distribution of clinical materials directly to medical centers and authorized trial sites.",
    icon: <Hospital className="w-8 h-8" />
  },
  {
    name: "Regenerative Medicine Hubs",
    description: "Specialized cold-chain logistics for the movement of cardiac progenitor cells and other regenerative medicine assets between development and clinical deployment.",
    icon: <Heart className="w-8 h-8" />
  }
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation & Strategy",
    description: "We begin with a thorough assessment of your specific therapy requirements, transit sensitivity, and time-critical delivery windows to engineer an optimal transport strategy."
  },
  {
    number: "02",
    title: "Regulatory & Quality Compliance",
    description: "Our team manages all GDP-required certifications and documentation, ensuring full compliance and frictionless transit through medical and research regulatory gateways."
  },
  {
    number: "03",
    title: "Secure Loading & Real-Time Monitoring",
    description: "Expert clinical technicians secure your material using validated cryogenic shippers before dispatching via our monitored, white-glove transport network."
  },
  {
    number: "04",
    title: "Controlled Delivery & Verification",
    description: "Upon arrival, we oversee the precise handover process, verifying the Chain of Custody and confirming payload integrity to ensure the material is ready for immediate clinical use."
  }
];

// --- Utilities ---
const easeExpoOut = [0.16, 1, 0.3, 1];

const FadeUp = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: easeExpoOut }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerGroup = ({ children, className = "" }: any) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: {},
      show: {
        transition: { staggerChildren: 0.1 }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }: any) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeExpoOut } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Components ---
const AirvaLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15 L20 75 H38 L50 50 L62 75 H80 L50 15 Z" fill="currentColor" />
    <path d="M50 58 L42 75 H58 Z" fill="#fbbf24" />
    <rect x="20" y="82" width="60" height="6" rx="2" fill="currentColor" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: easeExpoOut }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-zinc-100" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <AirvaLogo className={`w-8 h-8 transition-colors duration-500 ${isScrolled ? "text-brand-green" : "text-white"}`} />
          <span className={`text-xl font-display font-medium tracking-tight transition-colors duration-500 ${isScrolled ? "text-zinc-900" : "text-white"}`}>
            Airva <span className={isScrolled ? "text-zinc-500 font-light" : "text-zinc-300 font-light"}>Green</span>
          </span>
        </a>

        <div className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-semibold ${isScrolled ? "text-zinc-500" : "text-white/80"}`}>
          {["About", "Services", "Process", "Support", "Careers", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`transition-colors hover:text-brand-green ${isScrolled ? "hover:text-brand-green" : "hover:text-white"}`}
            >
              {item}
            </a>
          ))}
          <a 
            href="#quote" 
            className={`px-6 py-3 rounded-full border transition-all duration-300 ${isScrolled ? "border-brand-green text-brand-green hover:bg-brand-green hover:text-white" : "border-white/30 text-white hover:bg-white hover:text-brand-green"}`}
          >
            Clinical Consultation
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={isScrolled ? "text-zinc-900" : "text-white"} /> : <Menu className={isScrolled ? "text-zinc-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-8 flex flex-col gap-6 shadow-2xl origin-top"
        >
          {["About", "Services", "Process", "Support", "Careers", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-zinc-600 font-medium tracking-widest uppercase text-xs hover:text-brand-green"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[100svh] flex items-center overflow-hidden bg-brand-green">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 origin-top">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          src={heroBgImg}
          alt="Clinical and Research Logistics"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/80 to-transparent" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full mt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: easeExpoOut }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold/60" />
              <span className="text-brand-gold font-medium tracking-[0.3em] uppercase text-[9px]">
                CLINICAL & RESEARCH LOGISTICS
              </span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: easeExpoOut }}
            className="text-5xl md:text-7xl lg:text-[90px] font-display font-light text-white leading-[1.05] tracking-tight mb-8"
          >
            Precision Logistics for<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Advanced Cell Therapies</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: easeExpoOut }}
            className="text-zinc-400 text-lg md:text-xl font-light mb-14 max-w-xl leading-relaxed"
          >
            The specialized, clinical grade logistics division of Oloker Therapeutics, dedicated to the secure, temperature controlled transport of sensitive biological materials for research and clinical trials.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: easeExpoOut }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a href="#quote" className="bg-brand-green text-white px-10 py-5 rounded-full font-medium uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:shadow-brand-green/20 hover:bg-brand-green-dark transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden">
              <span className="relative z-10">Request Proposal</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="text-white px-10 py-5 rounded-full font-medium uppercase text-[10px] tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 border border-white/10 hover:border-white/30 hover:bg-white/5">
              Discover Our Edge
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ subtitle, title, description, light = false }: any) => (
  <FadeUp className={`max-w-2xl mb-16 md:mb-24 ${light ? "text-white" : ""}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-px ${light ? "bg-brand-gold/60" : "bg-brand-gold"}`} />
      <span className={`font-medium tracking-[0.3em] uppercase text-[9px] ${light ? "text-brand-gold" : "text-brand-gold"}`}>
        {subtitle}
      </span>
    </div>
    <h2 className={`text-4xl md:text-6xl font-display font-light tracking-tight mb-8 ${light ? "text-white" : "text-zinc-900"}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-lg font-light leading-relaxed max-w-xl ${light ? "text-zinc-400" : "text-zinc-500"}`}>
        {description}
      </p>
    )}
  </FadeUp>
);

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [activeModal, setActiveModal] = useState<null | 'about' | 'safety' | 'jobs'>(null);

  const modalContent = {
    about: {
      title: "Our Mission & Clinical Standards",
      content: "AirvaGreen was established as the dedicated logistics division of Oloker Therapeutics to ensure the highest standards of safety for Advanced Therapy Medicinal Products (ATMPs). We do not provide public transport; we exclusively manage the secure, temperature controlled chain of custody required for Oloker’s innovative cardiac therapies. Our logistics framework is designed specifically for research institutes and clinical partners, ensuring that every shipment destined solely for authorized clinical trials reaches its destination with total integrity and regulatory compliance"
    },
    safety: {
      title: "Clinical Integrity & Compliance",
      content: "Adherence to cGMP/GDP standards and rigorous, audit-ready chain-of-identity protocols."
    },
    jobs: {
      title: "Clinical Trial Support",
      content: "Streamlined coordination for clinical trial enrollment, ensuring secure, time-critical delivery to research partners."
    }
  };

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-brand-green/80 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[32px] p-8 md:p-12 max-w-2xl w-full relative z-10 shadow-2xl border border-white/20"
          >
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.3em]">Insights</span>
            </div>
            <h3 className="text-3xl font-display font-medium mb-6 text-zinc-900">{modalContent[activeModal].title}</h3>
            <div className="text-zinc-600 font-light leading-relaxed whitespace-pre-line text-lg">
              {modalContent[activeModal].content}
            </div>
          </motion.div>
        </div>
      )}

      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-green/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-20 items-center relative z-10">
        <div className="relative">
          <motion.div style={{ y }} className="relative z-10">
            <img 
              src={cryoImg}
              alt="Clinical Cryogenic Transport"
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 w-full h-full bg-zinc-100 rounded-3xl -z-0" />
        </div>
        
        <div>
          <SectionHeader 
            subtitle="Our Mission & Clinical Standards"
            title="Precision in Clinical Integrity"
          />
          <StaggerGroup className="space-y-6 text-zinc-600 font-light leading-relaxed text-lg">
            <StaggerItem className="cursor-pointer hover:text-zinc-900 transition-colors" onClick={() => setActiveModal('about')}>
              AirvaGreen was established as the dedicated logistics division of Oloker Therapeutics to ensure the highest standards of safety for Advanced Therapy Medicinal Products (ATMPs). We do not provide public transport; we exclusively manage the secure, temperature controlled chain of custody required for Oloker’s innovative cardiac therapies. Our logistics framework is designed specifically for research institutes and clinical partners, ensuring that every shipment destined solely for authorized clinical trials reaches its destination with total integrity and regulatory compliance
            </StaggerItem>
          </StaggerGroup>
          
          <StaggerGroup className="mt-12 grid grid-cols-2 gap-8 pt-12 border-t border-zinc-100">
            <StaggerItem className="flex flex-col gap-4 cursor-pointer group" onClick={() => setActiveModal('safety')}>
              <div className="bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-5 h-5 text-brand-green group-hover:text-white" />
              </div>
              <div>
                <div className="font-semibold text-zinc-900 mb-1 group-hover:text-brand-green">Clinical Integrity & Compliance</div>
                <div className="text-zinc-500 text-sm font-light">Adherence to cGMP/GDP standards and rigorous, audit-ready chain-of-identity protocols.</div>
              </div>
            </StaggerItem>
            <StaggerItem className="flex flex-col gap-4 cursor-pointer group" onClick={() => setActiveModal('jobs')}>
              <div className="bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <Users className="w-5 h-5 text-brand-green group-hover:text-white" />
              </div>
              <div>
                <div className="font-semibold text-zinc-900 mb-1 group-hover:text-brand-green">Clinical Trial Support</div>
                <div className="text-zinc-500 text-sm font-light">Streamlined coordination for clinical trial enrollment, ensuring secure, time-critical delivery to research partners.</div>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute -left-40 top-40 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <SectionHeader 
          subtitle="Core Capabilities"
          title="Clinical Logistics Solutions"
          description="Specialized, temperature-controlled transit frameworks engineered for the absolute security and safety of sensitive therapeutic assets."
        />

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, idx) => (
            <StaggerItem 
              key={idx}
              className="group bg-white rounded-[32px] overflow-hidden transition-all duration-500 relative border border-zinc-100 hover:border-brand-green/20 shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/0 transition-colors duration-500" />
              </div>
              <div className="p-10">
                <div className="bg-zinc-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-brand-green border border-zinc-100 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-zinc-900 tracking-tight">{s.title}</h3>
                <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-light line-clamp-2">
                  {s.description}
                </p>
                <button 
                  onClick={() => setSelectedService(s)}
                  className="inline-flex items-center gap-3 text-brand-green font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all"
                >
                  Explore Capabilities <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl overflow-hidden z-50 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="relative h-64 md:h-80 shrink-0">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-lg">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-light text-white tracking-tight">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-10 overflow-y-auto">
                <p className="text-zinc-600 font-light leading-relaxed mb-10 text-lg md:text-xl">
                  {selectedService.details}
                </p>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">Key Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      </div>
                      <span className="text-zinc-700 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-zinc-100 flex justify-end">
                  <a 
                    href="#quote" 
                    onClick={() => setSelectedService(null)}
                    className="inline-flex h-12 items-center justify-center bg-brand-green text-white px-8 font-semibold tracking-widest uppercase text-xs hover:bg-brand-green/90 transition-colors rounded-none"
                  >
                    Request Assessment
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

const Trust = () => (
  <section className="py-24 bg-brand-green-dark text-white relative overflow-hidden border-y border-white/5">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green opacity-5 blur-[100px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <StaggerGroup className="grid grid-cols-2 md:grid-cols-5 gap-12 text-center">
        {[
          { icon: <User className="w-6 h-6" />, label: "Trained Specialists" },
          { icon: <Thermometer className="w-6 h-6" />, label: "Advanced Cryogenic Fleet" },
          { icon: <ShieldCheck className="w-6 h-6" />, label: "Integrity Assured" },
          { icon: <Globe className="w-6 h-6" />, label: "Research Network" },
          { icon: <Clock className="w-6 h-6" />, label: "24/7 Clinical Monitoring" },
        ].map((item, idx) => (
          <StaggerItem key={idx} className="flex flex-col items-center gap-5 group">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-brand-gold group-hover:border-brand-gold/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
              {item.icon}
            </div>
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">{item.label}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="py-32 bg-zinc-50 relative overflow-hidden text-zinc-900 border-y border-zinc-100">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,78,59,0.05),transparent_70%)] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <SectionHeader 
        subtitle="The Airva Advantage"
        title="Why Choose Us"
        description="As the clinical logistics division of Oloker Therapeutics, we combine advanced medical transport technology with a singular focus: ensuring the safe, compliant, and time-critical delivery of Oloker's breakthrough cellular technologies to research institutes and clinical partners."
      />
      <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {[
          { icon: <User className="w-6 h-6" />, title: "Trained Clinical Specialists", desc: "Our team is specifically trained in the protocols required to handle sensitive, high-value biological materials." },
          { icon: <Thermometer className="w-6 h-6" />, title: "Advanced Cryogenic Infrastructure", desc: "State of the art temperature controlled transport validated for cell therapy viability." },
          { icon: <ShieldCheck className="w-6 h-6" />, title: "Chain of Identity Assurance", desc: "An uncompromising commitment to total product integrity and strict regulatory compliance." },
          { icon: <MapPin className="w-6 h-6" />, title: "Clinical Network Connectivity", desc: "Seamless, specialized transport connecting your lab to designated research and clinical sites." },
          { icon: <Phone className="w-6 h-6" />, title: "24/7 Clinical Monitoring", desc: "Real-time, around the clock oversight dedicated to the safety of therapeutic shipment." }
        ].map((item, idx) => (
          <StaggerItem key={idx} className="flex gap-6 items-start bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-white/50 border border-white/60 flex flex-shrink-0 items-center justify-center text-brand-green shadow-sm">
              {item.icon}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-zinc-900 mb-2">{item.title}</h4>
              <p className="text-zinc-600 font-light leading-relaxed">{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const Process = () => (
  <section id="process" className="py-32 bg-white relative overflow-hidden text-zinc-900 border-y border-zinc-100">
    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <SectionHeader 
        subtitle="Methodology"
        title="Our Clinical Transport Methodology"
        description="A systematic, audited approach to clinical logistics ensuring total therapeutic integrity from laboratory to research site."
      />
      
      <StaggerGroup className="grid md:grid-cols-4 gap-8 mt-16">
        {PROCESS_STEPS.map((step, idx) => (
          <StaggerItem key={idx} className="relative group">
            {idx < PROCESS_STEPS.length - 1 && (
              <div className="hidden md:block absolute top-[28px] left-[60px] w-[calc(100%-40px)] h-px bg-zinc-200 group-hover:bg-brand-gold transition-colors duration-500" />
            )}
            <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-zinc-200 group-hover:border-brand-gold flex items-center justify-center text-xl font-display font-medium text-zinc-400 group-hover:text-brand-gold transition-all duration-500 mb-6 group-hover:-translate-y-1 shadow-sm">
              {step.number}
            </div>
            <h4 className="text-xl font-semibold text-zinc-900 mb-3">{step.title}</h4>
            <p className="text-zinc-600 font-light leading-relaxed text-sm">{step.description}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const QuoteSection = () => (
  <section id="quote" className="py-24 bg-zinc-50 relative overflow-hidden scroll-mt-20">
    <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
      <FadeUp className="rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] transition-shadow duration-500 hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.18)] bg-brand-green-dark text-white border border-white/5">
        <div className="p-12 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-[60px]" />
          <div className="absolute inset-0 industrial-grid opacity-[0.03]" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 items-start md:items-center">
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-brand-gold" />
                <span className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.3em]">Direct Contact</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-light mb-6 tracking-tight">Clinical Transit Consultation</h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8 text-base">
                Our logistics specialists evaluate transit sensitivity, temperature requirements, and research protocols to provide an integrated clinical transport plan.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Clinical Transit Assessment",
                  "Regulatory & GDP Compliance",
                  "Validated Cryogenic Transport",
                  "Dedicated Clinical Liaison"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-zinc-300 group">
                    <div className="w-6 h-6 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 transition-colors group-hover:border-brand-gold/50">
                      <ArrowUpRight className="w-3 h-3 text-brand-gold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="shrink-0 w-full md:w-auto pt-8 md:pt-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/10">
              <div className="flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Phone className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 mb-1">Direct Clinical Support Hotline</div>
                  <a href="tel:+14429996108" className="text-2xl md:text-3xl font-light text-zinc-100 hover:text-white transition-colors block">
                    +1 <span className="font-semibold text-brand-gold">442 999 6108</span>
                  </a>
                  <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest mt-2">
                    Available <span className="text-brand-gold font-bold">24/7</span> for research partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);

const CareersSection = () => (
  <section id="careers" className="py-32 bg-white relative overflow-hidden border-t border-zinc-100">
    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-zinc-50 to-transparent pointer-events-none" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/[0.03] rounded-full blur-[150px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
      <div>
        <SectionHeader 
          subtitle="Careers"
          title="Join the AirvaGreen Clinical Logistics Team"
          description="We are seeking highly skilled clinical logistics coordinators and transport specialists who are dedicated to the precision and integrity required for advanced medical therapies."
        />
        <StaggerGroup className="grid sm:grid-cols-2 gap-6">
          <StaggerItem className="flex flex-col gap-6 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-green/30 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-zinc-50"><Heart className="w-6 h-6 text-brand-green" /></div>
            <div>
              <div className="font-semibold text-xl text-zinc-900 mb-2">Meaningful Impact</div>
              <div className="text-sm text-zinc-500 font-light leading-relaxed">Join a mission-driven team where your dedication directly facilitates life-saving clinical research and therapeutic access.</div>
            </div>
          </StaggerItem>
          <StaggerItem className="flex flex-col gap-6 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-green/30 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-zinc-50"><ShieldCheck className="w-6 h-6 text-brand-green" /></div>
            <div>
              <div className="font-semibold text-xl text-zinc-900 mb-2">Professional Growth & Compliance Training</div>
              <div className="text-sm text-zinc-500 font-light leading-relaxed">Comprehensive training and certification in GDP, cGMP, and cryogenic handling standards to ensure you remain at the forefront of clinical logistics.</div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
      
      <FadeUp delay={0.2} className="bg-brand-green-dark p-10 md:p-16 rounded-[40px] shadow-2xl relative z-10 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 industrial-grid opacity-[0.03]" />
        
        <div className="relative z-10">
          <h3 className="text-3xl font-display font-light mb-8 text-white">Application Portal</h3>
          <form className="space-y-10" action="https://formsubmit.co/airvagreenlogistics@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New Job Application Received" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Applicant Name</label>
              <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                <User className="w-4 h-4 text-zinc-400" />
                <input type="text" name="name" required placeholder="Full Name" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Email Address</label>
                <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <input type="email" name="email" required placeholder="Email" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Phone</label>
                <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <input type="tel" inputMode="numeric" name="phone" required placeholder="Number" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">State</label>
                <select name="state" required defaultValue="" className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:border-brand-green outline-none appearance-none rounded-none w-full">
                  <option value="" disabled className="bg-zinc-900 text-zinc-500">Select State</option>
                  <option value="AL" className="bg-zinc-900">Alabama</option>
                  <option value="AK" className="bg-zinc-900">Alaska</option>
                  <option value="AZ" className="bg-zinc-900">Arizona</option>
                  <option value="AR" className="bg-zinc-900">Arkansas</option>
                  <option value="CA" className="bg-zinc-900">California</option>
                  <option value="CO" className="bg-zinc-900">Colorado</option>
                  <option value="CT" className="bg-zinc-900">Connecticut</option>
                  <option value="DE" className="bg-zinc-900">Delaware</option>
                  <option value="FL" className="bg-zinc-900">Florida</option>
                  <option value="GA" className="bg-zinc-900">Georgia</option>
                  <option value="HI" className="bg-zinc-900">Hawaii</option>
                  <option value="ID" className="bg-zinc-900">Idaho</option>
                  <option value="IL" className="bg-zinc-900">Illinois</option>
                  <option value="IN" className="bg-zinc-900">Indiana</option>
                  <option value="IA" className="bg-zinc-900">Iowa</option>
                  <option value="KS" className="bg-zinc-900">Kansas</option>
                  <option value="KY" className="bg-zinc-900">Kentucky</option>
                  <option value="LA" className="bg-zinc-900">Louisiana</option>
                  <option value="ME" className="bg-zinc-900">Maine</option>
                  <option value="MD" className="bg-zinc-900">Maryland</option>
                  <option value="MA" className="bg-zinc-900">Massachusetts</option>
                  <option value="MI" className="bg-zinc-900">Michigan</option>
                  <option value="MN" className="bg-zinc-900">Minnesota</option>
                  <option value="MS" className="bg-zinc-900">Mississippi</option>
                  <option value="MO" className="bg-zinc-900">Missouri</option>
                  <option value="MT" className="bg-zinc-900">Montana</option>
                  <option value="NE" className="bg-zinc-900">Nebraska</option>
                  <option value="NV" className="bg-zinc-900">Nevada</option>
                  <option value="NH" className="bg-zinc-900">New Hampshire</option>
                  <option value="NJ" className="bg-zinc-900">New Jersey</option>
                  <option value="NM" className="bg-zinc-900">New Mexico</option>
                  <option value="NY" className="bg-zinc-900">New York</option>
                  <option value="NC" className="bg-zinc-900">North Carolina</option>
                  <option value="ND" className="bg-zinc-900">North Dakota</option>
                  <option value="OH" className="bg-zinc-900">Ohio</option>
                  <option value="OK" className="bg-zinc-900">Oklahoma</option>
                  <option value="OR" className="bg-zinc-900">Oregon</option>
                  <option value="PA" className="bg-zinc-900">Pennsylvania</option>
                  <option value="RI" className="bg-zinc-900">Rhode Island</option>
                  <option value="SC" className="bg-zinc-900">South Carolina</option>
                  <option value="SD" className="bg-zinc-900">South Dakota</option>
                  <option value="TN" className="bg-zinc-900">Tennessee</option>
                  <option value="TX" className="bg-zinc-900">Texas</option>
                  <option value="UT" className="bg-zinc-900">Utah</option>
                  <option value="VT" className="bg-zinc-900">Vermont</option>
                  <option value="VA" className="bg-zinc-900">Virginia</option>
                  <option value="WA" className="bg-zinc-900">Washington</option>
                  <option value="WV" className="bg-zinc-900">West Virginia</option>
                  <option value="WI" className="bg-zinc-900">Wisconsin</option>
                  <option value="WY" className="bg-zinc-900">Wyoming</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Zip Code</label>
                <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <input type="tel" inputMode="numeric" name="zipcode" required placeholder="Zip Code" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Desired Role</label>
              <select name="role" required className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:border-brand-green outline-none appearance-none rounded-none w-full">
                <option className="bg-zinc-900">Clinical Lane Specialist</option>
                <option className="bg-zinc-900">Clinical Logistics Coordinator</option>
                <option className="bg-zinc-900">Quality & Regulatory Compliance Specialist</option>
                <option className="bg-zinc-900">Cryogenic Handling Expert</option>
                <option className="bg-zinc-900">Chain of Custody Documentation Specialist</option>
                <option className="bg-zinc-900">Remote Data Entry Specialist</option>
              </select>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full h-16 bg-brand-green text-white font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-zinc-900 transition-all duration-500 shadow-xl active:scale-95">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </FadeUp>
    </div>
  </section>
);

const OPERATIONAL_ROLES = [
  {
    role: "Clinical Lane Specialists",
    description: "Experts who meticulously plan cold-chain routes and air-transit schedules to ensure minimal handling and zero temperature deviations.",
    icon: <Network className="w-6 h-6" />
  },
  {
    role: "Regulatory & Quality Specialists",
    description: "Experts in GDP/cGMP standards and international biological material regulations to keep your clinical shipments moving seamlessly.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    role: "24/7 Clinical Monitoring",
    description: "Our control center provides real-time temperature tracking and instant logistics support for high-stakes research materials.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    role: "Chain of Custody Documentation",
    description: "Ensuring all research records, temperature logs, and trial documentation are managed with medical-grade precision.",
    icon: <FileText className="w-6 h-6" />
  },
  {
    role: "Clinical Handling Experts",
    description: "Trained professionals who oversee the secure packaging of high-value cellular therapies into validated cryogenic shippers.",
    icon: <Dna className="w-6 h-6" />
  }
];

const OperationalCommand = () => (
  <section id="support" className="py-32 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(6,78,59,0.03),transparent_50%)] pointer-events-none" />
    <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
      <SectionHeader 
        subtitle="Expert Support Staff"
        title="Clinical Control Tower"
        description="Behind every therapeutic delivery is a team of clinical logistics experts who manage every critical variable to ensure product integrity and patient safety."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 mt-16">
        {OPERATIONAL_ROLES.map((role, idx) => (
          <FadeUp key={idx} delay={idx * 0.1}>
            <div className="group">
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-brand-green mb-6 border border-zinc-100 group-hover:bg-brand-green group-hover:text-white transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand-green/20">
                {role.icon}
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">{role.role}</h4>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {role.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const Industries = () => (
  <section className="py-32 bg-brand-green border-y border-white/5 relative overflow-hidden text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.3),transparent_70%)] pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-brand-gold/50" />
          <span className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.3em]">Sectors</span>
          <div className="w-12 h-px bg-brand-gold/50" />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">Clinical Sectors We Serve</h2>
      </div>

      <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INDUSTRIES.map((industry, idx) => (
          <StaggerItem 
            key={idx} 
            className="p-8 bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 hover:border-brand-gold/30 hover:bg-black/30 transition-all duration-500 flex flex-col items-start group shadow-xl"
          >
            <div className="mb-6 p-4 bg-brand-gold/10 text-brand-gold rounded-2xl group-hover:bg-brand-gold group-hover:text-zinc-900 transition-all duration-500 shadow-lg shrink-0">
              {industry.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight leading-snug">{industry.name}</h3>
            <p className="text-white/60 font-light leading-relaxed text-xs group-hover:text-white/80 transition-colors uppercase tracking-widest mb-4">GDP Compliant</p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm">{industry.description}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const Footer = ({ onOpenPolicy }: { onOpenPolicy: (policy: "privacy" | "terms") => void }) => (
  <footer id="contact" className="bg-brand-green-dark text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-20">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <AirvaLogo className="w-8 h-8 text-brand-green" />
            <span className="text-xl font-display font-medium tracking-tight">
              Airva <span className="text-zinc-500 font-light">Green</span>
            </span>
          </div>
          <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
            As the specialized clinical logistics division of Oloker Therapeutics, we provide secure, compliant, and time-critical delivery of breakthrough cellular therapies to research institutes and clinical partners.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-gold">Company</h4>
          <ul className="space-y-4 text-sm text-zinc-400 font-light">
            {["About Us", "Fleet & Services", "Case Studies", "Safety Standards", "Job Board"].map(link => (
              <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-gold">Contact</h4>
          <ul className="space-y-6 text-sm text-zinc-400 font-light">
            <li className="flex gap-4 items-center">
              <Phone className="w-5 h-5 opacity-50 shrink-0" />
              <span>+1 442 999 6108</span>
            </li>
            <li className="flex gap-4 items-center">
              <Mail className="w-5 h-5 opacity-50 shrink-0" />
              <span>info@airvagreenlogistic.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-gold">Clinical Updates</h4>
          <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6">Receive clinical logistics insights and compliance updates.</p>
          <form className="flex border-b border-white/20 pb-2 focus-within:border-brand-green transition-colors" action="https://formsubmit.co/airvagreenlogistics@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New Newsletter Subscription" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="email" name="email" required placeholder="Email Address" className="bg-transparent border-none px-2 py-1 text-sm flex-grow outline-none placeholder:text-zinc-600" />
            <button type="submit" className="px-2 text-brand-green hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
        <div>© 2026 Airva Green. All rights reserved.</div>
        <div className="flex gap-8">
          <button 
            onClick={() => onOpenPolicy("privacy")} 
            className="hover:text-white transition-colors cursor-pointer text-left"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => onOpenPolicy("terms")} 
            className="hover:text-white transition-colors cursor-pointer text-left"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activePolicy, setActivePolicy] = useState<null | 'privacy' | 'terms'>(null);


  const policies = {
    privacy: {
      title: "Privacy Policy",
      subtitle: "Effective Date: July 18, 2026",
      content: [
        {
          section: "1. Clinical Data Protection Directive",
          text: "At AirvaGreen, the dedicated clinical logistics division of Oloker Therapeutics, we treat institutional, operational, and clinical trial data with the highest levels of confidentiality and security. We do not provide public logistics; we exclusively serve designated medical research institutes, clinical partners, and biological material providers under strict cGMP and GDP compliance standards."
        },
        {
          section: "2. Information Collection and Telemetry",
          text: "We collect specific operational data required to validate shipment integrity and guarantee delivery viability. This includes:\n• Direct institutional contact details (names, email addresses, phone numbers, and clinical affiliations).\n• Real-time shipment telemetry (continuous temperature-controlled records, liquid nitrogen levels, environmental variables, and GPS transit paths).\n• Secure chain-of-custody documentation (electronic handoff signatures, chain of identity checkpoints, and identity verification logs of clinical receiving staff)."
        },
        {
          section: "3. Purpose of Processing",
          text: "All collected data is utilized exclusively for quality assurance, regulatory audit readiness, thermal-integrity verification, and real-time transit tracking. No information is sold, leased, or distributed to third parties for commercial use."
        },
        {
          section: "4. Information Sharing & Legal Compliance",
          text: "Data is accessible solely by authorized personnel of AirvaGreen, Oloker Therapeutics, and approved regulatory bodies (such as health authorities and safety auditors) when mandatory for therapeutic trials or compliance validation."
        },
        {
          section: "5. Data Security & Storage",
          text: "We employ defense-in-depth security architectures. All digital logs, telemetry data, and institutional records are fully encrypted in transit and at rest. Physical staging and cryogenic storage assets are protected by access-controlled perimeters and constant surveillance."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Effective Date: July 18, 2026",
      content: [
        {
          section: "1. Acceptance of Clinical Terms",
          text: "By accessing AirvaGreen's digital tracking platform, coordinating specialized transport, or submitting updates, you accept these Terms of Service. These terms govern the relationship between AirvaGreen (division of Oloker Therapeutics) and our designated clinical trial partners."
        },
        {
          section: "2. Authorized Operations and Scope",
          text: "AirvaGreen operates exclusively as a specialized clinical logistics utility. Our services are dedicated solely to the secure, GDP-compliant, and time-critical delivery of advanced cellular therapies, biological reagents, and regenerative medicine materials. We do not provide public shipping or general freight services."
        },
        {
          section: "3. Institutional Handoff Obligations",
          text: "Receiving clinical research sites must ensure authorized personnel are present and fully trained to complete immediate receiving procedures. Because cryogenic and cell-therapy products have strict time-viability limits, receiving signatures and chain-of-identity handoffs must be executed immediately upon arrival without delay."
        },
        {
          section: "4. Compliance, GDP, and Liability",
          text: "AirvaGreen maintains strict compliance with Good Distribution Practice (GDP) standards and cGMP protocols. While we take every validation step to ensure continuous cooling and transit safety, cellular therapies and biological samples are subject to unique biochemical variables. Our liability is restricted strictly to the parameters defined in our signed Master Logistics Agreement with your institution."
        },
        {
          section: "5. Governing Jurisdiction",
          text: "These Terms of Service are governed by and construed in accordance with the laws of the State of California. Any disputes arising from these terms or our clinical transport services shall be resolved exclusively within the federal or state courts in California, with venue in West Sacramento."
        }
      ]
    }
  };

  return (
    <div className="font-sans antialiased selection:bg-brand-green selection:text-white bg-[#f4f4f5]">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Trust />
        <WhyChooseUs />
        <Services />
        <Process />
        <OperationalCommand />
        <QuoteSection />
        <Industries />
        <CareersSection />
      </main>
      <Footer onOpenPolicy={(policy) => setActivePolicy(policy)} />

      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setActivePolicy(null)}
              className="absolute inset-0 bg-brand-green-dark/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] p-8 md:p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl border border-zinc-100 flex flex-col"
            >
              <button 
                onClick={() => setActivePolicy(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-brand-gold" />
                <span className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.3em]">{policies[activePolicy].subtitle}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-display font-light text-zinc-900 mb-8 tracking-tight">
                {policies[activePolicy].title}
              </h3>
              
              <div className="space-y-8 pr-2 overflow-y-auto max-h-[50vh] scrollbar-thin">
                {policies[activePolicy].content.map((item, index) => (
                  <div key={index} className="border-l-2 border-brand-green/30 pl-6 py-1">
                    <h4 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">
                      {item.section}
                    </h4>
                    <p className="text-zinc-600 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={() => setActivePolicy(null)}
                  className="px-8 py-3 bg-brand-green text-white font-medium text-sm rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-md shadow-brand-green/20"
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}
