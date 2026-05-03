/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Truck, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
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
  Users
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
    title: "Heavy Equipment",
    description: "Reliable transport for heavy machinery such as excavators, bulldozers, and cranes.",
    icon: <Weight className="w-5 h-5" />,
    image: "https://i.postimg.cc/J4FsWVh1/IMG-20260430-001335.png",
    details: "Our heavy equipment transport service is designed to move your largest and most cumbersome machinery safely and efficiently. We utilize specialized multi-axle trailers and follow strict safety protocols.",
    features: ["Oversize load permitting", "Route surveys and pilot cars", "Multi-axle RGN trailers", "$5M cargo insurance coverage"]
  },
  {
    title: "Small/Medium Equipment",
    description: "Efficient delivery of skid steers, generators, and compact agricultural tools.",
    icon: <Layers className="w-5 h-5" />,
    image: "https://i.postimg.cc/PJ0nSkWw/1777506979268.png",
    details: "Perfect for construction sites and agricultural setups. We ensure rapid, reliable deployment of your skid steers, generators, and compact tools directly to where they are needed.",
    features: ["Same-day & next-day options", "Flatbed and step-deck trailers", "Load securement tracking", "Door-to-door delivery"]
  },
  {
    title: "Vehicle",
    description: "Secure auto transport for everything from sedans to heavy-duty trucks.",
    icon: <Truck className="w-5 h-5" />,
    image: "https://i.postimg.cc/KvY1V7nL/1777507527335.png",
    details: "Whether you're moving a solitary vehicle, a corporate fleet, or heavy-duty commercial trucks, our specialized auto haulers guarantee safe and timely, scratch-free delivery.",
    features: ["Open and enclosed transport", "Fleet relocation services", "Winch-on/winch-off capability", "Real-time GPS tracking"]
  },
  {
    title: "Boat",
    description: "Specialized trailers and harnesses for safe transportation of marine vessels.",
    icon: <Anchor className="w-5 h-5" />,
    image: "https://i.postimg.cc/Pq0cGMLS/IMG-20260430-012156.png",
    details: "Marine vessels require specific handling. We provide custom cradles, specialized low-boy trailers, and experienced maritime logistics coordinators to ensure your boat reaches the water safely.",
    features: ["Custom hull support cradles", "Shrink-wrapping solutions", "Marina-to-marina transport", "Over-height routing expertise"]
  },
  {
    title: "Container/Freight Shipping",
    description: "Port-to-door container hauling and comprehensive freight shipping solutions.",
    icon: <Globe className="w-5 h-5" />,
    image: "https://i.postimg.cc/vZN29vvv/1777508330680.png",
    details: "We seamlessly connect major ports to your facility. Our intermodal drayage and direct freight services handle standard, refrigerated, and high-cube containers.",
    features: ["Port drayage (TWIC certified)", "Customs clearance assistance", "FCL and LCL options", "Cross-docking facilities"]
  },
  {
    title: "Mobile House",
    description: "Expert routing and handling for safe relocation of mobile and modular homes.",
    icon: <Home className="w-5 h-5" />,
    image: "https://i.postimg.cc/W1CSt12z/IMG-20260430-012829.png",
    details: "Relocating modular or mobile homes involves highly complex logistics. Our team manages teardown, transport, and setup coordination, securing all necessary escort vehicles.",
    features: ["Escort and pilot vehicle dispatch", "Pre-transport structural inspection", "Municipal permitting", "Toter truck fleets"]
  },
  {
    title: "Small Box",
    description: "Expedited less-than-truckload (LTL) services for smaller freight and packages.",
    icon: <Package className="w-5 h-5" />,
    image: "https://i.postimg.cc/KvsDs8gx/IMG-20260430-013151.png",
    details: "For smaller shipments that don't require a full trailer, our LTL service offers an economical yet expedited solution with regular routes and consolidated shipping.",
    features: ["Expedited LTL networks", "Palletized freight handling", "Liftgate pickup and delivery", "Consolidation savings"]
  }
];

const INDUSTRIES: Industry[] = [
  {
    name: "Construction",
    description: "Transport of heavy earthmoving equipment, massive steel structures, and vital building materials directly to active site locations.",
    icon: <Building2 className="w-8 h-8" />
  },
  {
    name: "Agriculture",
    description: "Reliable movement of tractors, harvesters, and oversize farm machinery to keep agricultural operations running seamlessly.",
    icon: <Tractor className="w-8 h-8" />
  },
  {
    name: "Manufacturing",
    description: "Specialized logistics for CNC machines, industrial presses, and sensitive robotic assembly lines.",
    icon: <Factory className="w-8 h-8" />
  },
  {
    name: "Energy & Mining",
    description: "Rigging and hauling for wind turbine components, oil rig machinery, and heavy extraction units.",
    icon: <Pickaxe className="w-8 h-8" />
  },
  {
    name: "Aerospace",
    description: "Precision transport for aircraft fuselages, engines, and extremely sensitive orbital equipment.",
    icon: <PlaneTakeoff className="w-8 h-8" />
  },
  {
    name: "Infrastructure",
    description: "Dedicated hauling for bridge beams, tunnel boring machines, and massive concrete culverts.",
    icon: <Cpu className="w-8 h-8" />
  }
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation & Planning",
    description: "We begin with a thorough assessment of your cargo, route requirements, and timeline to engineer the optimal transport strategy."
  },
  {
    number: "02",
    title: "Permitting & Compliance",
    description: "Our compliance team handles all state, federal, and local permits, ensuring smooth interstate transit without regulatory delays."
  },
  {
    number: "03",
    title: "Secure Loading & Dispatch",
    description: "Expert riggers and loading masters secure your equipment using specialized harnesses before dispatching our elite drivers."
  },
  {
    number: "04",
    title: "Delivery & Unloading",
    description: "Upon arrival, we oversee the precise offloading process, verifying payload integrity and ensuring complete client satisfaction."
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
            Get a Quote
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
          src="https://i.postimg.cc/L80n2d6B/IMG-20260429-233431.png"
          alt="Heavy Haul Operations"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
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
                Elite Heavy Logistics
              </span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: easeExpoOut }}
            className="text-5xl md:text-7xl lg:text-[90px] font-display font-light text-white leading-[1.05] tracking-tight mb-8"
          >
            Precision Logistics.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Uncompromising Scale.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: easeExpoOut }}
            className="text-zinc-400 text-lg md:text-xl font-light mb-14 max-w-xl leading-relaxed"
          >
            Specialized logistics and oversized hauling solutions engineered for the world's most demanding industries.
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
      title: "Our Heritage & Expertise",
      content: "Airva Green was founded on the principle that the most challenging cargo deserves the most meticulous care. We don't just move equipment; we move the infrastructure of tomorrow. From wind turbine blades to multi-ton industrial machinery, our team of veteran drivers and specialized logistics coordinators ensures your oversized load arrives safely, on time, and within regulation."
    },
    safety: {
      title: "Global Safety Standards",
      content: "Our safety standards are unmatched in the industry. We are fully OSHA compliant and utilize advanced pilot car protocols, including pre-route analysis and structural bridge assessments. Every driver undergoes rigorous specialized training to handle the unique physics of oversized loads, ensuring zero-incident transit for your most critical assets."
    },
    jobs: {
      title: "Job Board: Specialized Opportunities",
      content: "Precision Heavy Haul is looking for elite talent. Current openings include:\n\n• Heavy Haul Logistics Coordinator\n• Specialized Route Engineer\n• Industrial Cargo Compliance Officer\n• Certified Pilot Car Lead\n• Administrative Assistant\n\nWe provide industry-leading compensation and a culture built on engineering precision. Join the team that moves the impossible."
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
              src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Oversize_Bridge_Beam_-_LONG.jpg"
              alt="Heavy Logistics Operations"
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 w-full h-full bg-zinc-100 rounded-3xl -z-0" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: easeExpoOut }}
            className="absolute -left-8 top-1/4 bg-white p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] rounded-2xl z-20 border border-zinc-50 cursor-pointer group"
            onClick={() => setActiveModal('about')}
          >
            <div className="text-5xl font-display font-medium text-brand-green mb-1 tracking-tight">20+</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-brand-gold transition-colors">Years of Mastery</div>
          </motion.div>
        </div>
        
        <div>
          <SectionHeader 
            subtitle="Our Heritage"
            title="Precision in Every Turn"
          />
          <StaggerGroup className="space-y-6 text-zinc-600 font-light leading-relaxed text-lg">
            <StaggerItem className="cursor-pointer hover:text-zinc-900 transition-colors" onClick={() => setActiveModal('about')}>
              Airva Green was founded on the principle that the most challenging cargo deserves the most meticulous care. We don't just move equipment; we move the infrastructure of tomorrow.
            </StaggerItem>
            <StaggerItem>
              From wind turbine blades to multi-ton industrial machinery, our team of veteran drivers and specialized logistics coordinators ensures your oversized load arrives safely, on time, and within regulation.
            </StaggerItem>
          </StaggerGroup>
          
          <StaggerGroup className="mt-12 grid grid-cols-2 gap-8 pt-12 border-t border-zinc-100">
            <StaggerItem className="flex flex-col gap-4 cursor-pointer group" onClick={() => setActiveModal('safety')}>
              <div className="bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-5 h-5 text-brand-green group-hover:text-white" />
              </div>
              <div>
                <div className="font-semibold text-zinc-900 mb-1 group-hover:text-brand-green">Global Safety Standards</div>
                <div className="text-zinc-500 text-sm font-light">Certified OSHA compliance and advanced pilot car protocols.</div>
              </div>
            </StaggerItem>
            <StaggerItem className="flex flex-col gap-4 cursor-pointer group" onClick={() => setActiveModal('jobs')}>
              <div className="bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <Users className="w-5 h-5 text-brand-green group-hover:text-white" />
              </div>
              <div>
                <div className="font-semibold text-zinc-900 mb-1 group-hover:text-brand-green">Job Board</div>
                <div className="text-zinc-500 text-sm font-light">Dedicated executive oversight on complex logistical maneuvers.</div>
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
          subtitle="Specializations"
          title="Our Core Capabilities"
          description="We offer a range of premium specialized services designed to handle the complexities of oversized and heavy-duty logistics."
        />

        <StaggerGroup className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s, idx) => (
            <StaggerItem 
              key={idx}
              className={`group bg-white rounded-[32px] overflow-hidden transition-all duration-500 relative border border-zinc-100 hover:border-brand-green/20 shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] ${idx === 3 || idx === 4 ? "md:col-span-1.5" : ""}`}
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
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
          { icon: <User className="w-6 h-6" />, label: "Elite Drivers" },
          { icon: <Truck className="w-6 h-6" />, label: "Modern Fleet" },
          { icon: <ShieldCheck className="w-6 h-6" />, label: "Flawless Record" },
          { icon: <Globe className="w-6 h-6" />, label: "Continental Scope" },
          { icon: <Clock className="w-6 h-6" />, label: "24/7 Dispatch" },
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
        description="We combine decades of experience with modern logistics technology to ensure your most critical cargo arrives safely and on schedule."
      />
      <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {[
          { icon: <User className="w-6 h-6" />, title: "Experienced Drivers", desc: "Our elite operators are certified for the most complex oversized routes." },
          { icon: <Truck className="w-6 h-6" />, title: "Modern Fleet", desc: "State-of-the-art modular trailers and heavy-duty tractors." },
          { icon: <ShieldCheck className="w-6 h-6" />, title: "Safe & Reliable", desc: "An uncompromising commitment to zero incidents and payload integrity." },
          { icon: <MapPin className="w-6 h-6" />, title: "Nationwide Coverage", desc: "Seamless interstate transport handled by specialized pilot cars." },
          { icon: <Phone className="w-6 h-6" />, title: "24/7 Support", desc: "Always-on dispatch desk dedicated to your shipment's journey." }
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
        title="How We Deliver Excellence"
        description="A systematic, engineered approach to heavy haul logistics ensuring precision from origin to destination."
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

const FormField = ({ label, type = "text", placeholder, options }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
    {type === "select" ? (
      <select className="bg-transparent border-b border-zinc-200 py-3 text-sm focus:border-brand-green outline-none transition-colors text-zinc-900 rounded-none w-full">
        {options.map((o: any) => <option key={o}>{o}</option>)}
      </select>
    ) : type === "textarea" ? (
      <textarea rows={3} placeholder={placeholder} className="bg-transparent border-b border-zinc-200 py-3 text-sm focus:border-brand-green outline-none transition-colors text-zinc-900 placeholder:text-zinc-300 resize-none rounded-none w-full" />
    ) : (
      <input type={type} placeholder={placeholder} className="bg-transparent border-b border-zinc-200 py-3 text-sm focus:border-brand-green outline-none transition-colors text-zinc-900 placeholder:text-zinc-300 rounded-none w-full" />
    )}
  </div>
);

const QuoteSection = () => (
  <section id="quote" className="py-24 bg-zinc-50 relative overflow-hidden scroll-mt-20">
    <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <FadeUp className="rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-shadow duration-500 hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.15)] bg-white border border-zinc-100">
        <div className="p-12 md:p-16 lg:w-2/5 bg-brand-green-dark text-white relative flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-[60px]" />
          <div className="absolute inset-0 industrial-grid opacity-[0.03]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.3em]">Instant Proposal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light mb-6 tracking-tight">Precision Logistics Quote</h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-12 text-lg">
              Our specialists evaluate dimensions, weight classes, and route complexities to provide an engineered proposal.
            </p>
            <ul className="space-y-6">
              {[
                "Complimentary Route Assessment",
                "Full Permit Coordination",
                "Custom Fleet Allocation",
                "Dedicated Logistics Lead"
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-sm font-medium text-zinc-300 group">
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 transition-colors group-hover:border-brand-gold/50">
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                <Phone className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 mb-1">Direct Priority Hotline</div>
                <div className="text-2xl font-light text-zinc-100">+1 <span className="font-semibold text-brand-gold">442 999 6108</span></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-12 md:p-16 lg:w-3/5 bg-white relative">
          <div className="absolute inset-0 industrial-grid opacity-[0.02] pointer-events-none" />
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <FormField label="Full Name" placeholder="John Doe" />
            <FormField label="Email Address" type="email" placeholder="john@company.com" />
            <FormField label="Phone Number" placeholder="+1 442 999 6108" />
            <FormField label="Type of Load" type="select" options={["Oversized Machinery", "Industrial Vessel", "Construction Equipment", "Aircraft Parts", "Other"]} />
            <FormField label="Pickup Location" placeholder="City, State" />
            <FormField label="Delivery Location" placeholder="City, State" />
            <div className="md:col-span-2">
              <FormField label="Weight / Dimensions" placeholder="e.g. 40 Tons, 60ft x 12ft" />
            </div>
            <div className="md:col-span-2">
              <FormField label="Additional Details" type="textarea" placeholder="Tell us about any specific handling requirements..." />
            </div>
            <div className="md:col-span-2 mt-4 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center gap-8">
              <button className="bg-zinc-950 text-white px-12 py-5 rounded-none font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-brand-green transition-all duration-500 w-full md:w-auto inline-flex items-center justify-center gap-4 group shadow-xl active:scale-95">
                Generate Engineered Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
              <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest text-center md:text-left">
                Typically delivered within <span className="text-zinc-600">60 minutes</span>
              </p>
            </div>
          </form>
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
          title="Join the Elite Heavy Haul Team"
          description="We're looking for specialized operators and logistical engineers who refuse to compromise on precision and safety."
        />
        <StaggerGroup className="grid sm:grid-cols-2 gap-6">
          <StaggerItem className="flex flex-col gap-6 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-green/30 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-zinc-50"><Clock className="w-6 h-6 text-brand-green" /></div>
            <div>
              <div className="font-semibold text-xl text-zinc-900 mb-2">Flexible Rotations</div>
              <div className="text-sm text-zinc-500 font-light leading-relaxed">Work-life balance measured in weeks, not days. We value your time.</div>
            </div>
          </StaggerItem>
          <StaggerItem className="flex flex-col gap-6 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-green/30 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-zinc-50"><ShieldCheck className="w-6 h-6 text-brand-green" /></div>
            <div>
              <div className="font-semibold text-xl text-zinc-900 mb-2">Premium Benefits</div>
              <div className="text-sm text-zinc-500 font-light leading-relaxed">Diamond tier medical, 401k, and profit sharing for all long-term partners.</div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
      
      <FadeUp delay={0.2} className="bg-brand-green-dark p-10 md:p-16 rounded-[40px] shadow-2xl relative z-10 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 industrial-grid opacity-[0.03]" />
        
        <div className="relative z-10">
          <h3 className="text-3xl font-display font-light mb-8 text-white">Application Portal</h3>
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Applicant Name</label>
              <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                <User className="w-4 h-4 text-zinc-400" />
                <input type="text" placeholder="Full Name" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Email Address</label>
                <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <input type="email" placeholder="Email" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Phone</label>
                <div className="flex items-center gap-4 border-b border-white/10 py-3 focus-within:border-brand-green transition-colors">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <input type="text" placeholder="Number" className="bg-transparent border-none outline-none w-full text-white text-base placeholder:text-zinc-600" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Desired Role</label>
              <select className="bg-transparent border-b border-white/10 py-3 text-base text-white focus:border-brand-green outline-none appearance-none rounded-none w-full">
                <option className="bg-zinc-900">Specialized Haul Driver</option>
                <option className="bg-zinc-900">Logistics Coordinator</option>
                <option className="bg-zinc-900">Route Planner</option>
                <option className="bg-zinc-900">Diesel Mechanic</option>
                <option className="bg-zinc-900">Administrative Assistant</option>
              </select>
            </div>

            <div className="pt-6">
              <button className="w-full h-16 bg-brand-green text-white font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-zinc-900 transition-all duration-500 shadow-xl active:scale-95">
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
    role: "Route Engineers",
    description: "Specialists who meticulously map every mile, bridge clearance, and turn radius to ensure zero-obstacle transit.",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    role: "Compliance Officers",
    description: "Experts in multi-state permitting, DOT regulations, and international customs to keep your cargo moving legally.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    role: "24/7 Dispatch Command",
    description: "Our mission control center provides real-time GPS tracking and instant driver support through any terrain.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    role: "Administrative Support",
    description: "Ensuring all back-office logistics, invoicing, and fleet documentation are handled with precision.",
    icon: <FileText className="w-6 h-6" />
  },
  {
    role: "Loading Masters",
    description: "Certified rigging professionals who oversee the engineered securement of high-value industrial payloads.",
    icon: <Weight className="w-6 h-6" />
  }
];

const OperationalCommand = () => (
  <section id="support" className="py-32 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(6,78,59,0.03),transparent_50%)] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <SectionHeader 
            subtitle="Expert Support Staff"
            title="Operational Command Center"
            description="Behind every successful heavy haul is a team of specialized engineers and coordinators who anticipate every variable before the engine even starts."
          />
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 mt-16">
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
        <div className="lg:w-1/2 relative">
          <FadeUp delay={0.3} className="relative z-10 group">
            <div className="absolute -inset-4 bg-brand-gold/10 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
              alt="Logistics Command Center" 
              className="rounded-[40px] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-green rounded-3xl -z-10 animate-pulse" />
          </FadeUp>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-green/5 blur-[120px] rounded-full" />
        </div>
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
        <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">Industries We Serve</h2>
      </div>

      <StaggerGroup className="grid md:grid-cols-3 gap-8">
        {INDUSTRIES.map((industry, idx) => (
          <StaggerItem 
            key={idx} 
            className="p-10 bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 hover:border-brand-gold/30 hover:bg-black/30 transition-all duration-500 flex flex-col items-start group shadow-xl"
          >
            <div className="mb-8 p-5 bg-brand-gold/10 text-brand-gold rounded-2xl group-hover:bg-brand-gold group-hover:text-zinc-900 transition-all duration-500 shadow-lg">
              {industry.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">{industry.name}</h3>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base group-hover:text-white/80 transition-colors uppercase tracking-widest text-[10px] mb-4">Engineering Precision</p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">{industry.description}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const Footer = () => (
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
            Specialized heavy-haul and logistics solutions for the energy, construction, and manufacturing industries. Strength you can rely on.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
               <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors">
                 <Icon className="w-4 h-4" />
               </a>
            ))}
          </div>
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
            <li className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 opacity-50 shrink-0" />
              <span>482 Industrial Way, <br />Houston, TX 77002</span>
            </li>
            <li className="flex gap-4 items-center">
              <Phone className="w-5 h-5 opacity-50 shrink-0" />
              <span>+1 442 999 6108</span>
            </li>
            <li className="flex gap-4 items-center">
              <Mail className="w-5 h-5 opacity-50 shrink-0" />
              <span>airvagreenlogistics@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-gold">Dispatch</h4>
          <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6">Receive industry insights and specialized permit updates.</p>
          <form className="flex border-b border-white/20 pb-2 focus-within:border-brand-green transition-colors" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className="bg-transparent border-none px-2 py-1 text-sm flex-grow outline-none placeholder:text-zinc-600" />
            <button className="px-2 text-brand-green hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
        <div>© 2026 Airva Green. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
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
      <Footer />
    </div>
  );
}
