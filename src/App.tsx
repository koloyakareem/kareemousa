import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Download, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Work', target: 'work' },
  { label: 'Capabilities', target: 'capabilities' },
  { label: 'Approach', target: 'approach' },
  { label: 'Experience', target: 'experience' },
];

const caseStudies = [
  {
    number: '01',
    type: 'Web application security / 2026',
    title: 'Breaking the path from input to impact.',
    description:
      'A focused web security practice across 50+ PortSwigger labs, covering injection, XSS, CSRF, broken authentication, race conditions, and access control weaknesses with Burp Suite Professional.',
    result: '50+',
    resultLabel: 'labs completed',
    link: 'View the field notes',
  },
  {
    number: '02',
    type: 'Active Directory security / 2026',
    title: 'A lab built to teach the domain where it breaks.',
    description:
      'Architected a multi-domain Active Directory lab to execute Kerberoasting, AS-REP Roasting, Pass-the-Hash, SMB Relay, and LLMNR attacks using BloodHound, Mimikatz, and Impacket, then documented the remediation path.',
    result: 'Full',
    resultLabel: 'domain compromise verified',
    link: 'View the field notes',
  },
  {
    number: '03',
    type: 'SmartShield IPS / Spring 2026',
    title: 'Testing the detector against the attacker.',
    description:
      'Designed an attack testing framework for an intrusion prevention system, simulating XSS, authentication bypass, race conditions, resource exhaustion, adversarial AI, and OT-specific attacks across network and application layers.',
    result: '100%',
    resultLabel: 'identified bypasses closed',
    link: 'View the field notes',
  },
];

const capabilities = [
  ['Web application security', 'Practical testing for injection, XSS, CSRF, broken authentication, race conditions, and access control weaknesses — with remediation guidance that developers can use.'],
  ['Infrastructure & network security', 'Reconnaissance, enumeration, vulnerability discovery, exploitation, and post-exploitation across network environments using repeatable Python and Bash workflows.'],
  ['Active Directory security', 'Hands-on assessment of Kerberos, NTLM, SMB, LLMNR, and identity attack paths using BloodHound, Mimikatz, and Impacket in realistic lab environments.'],
];

const approachSteps = [
  ['01', 'Get oriented', 'Start with the system as it really is: how data moves, where decisions happen, and what the team is already doing well.'],
  ['02', 'Find the leverage', 'Separate urgent exposure from interesting noise. The best security work makes the next right action obvious.'],
  ['03', 'Build with the team', 'Pair on the control, write the runbook, test the edge case. Knowledge should stay in the room after I leave.'],
  ['04', 'Leave a stronger signal', 'Measure what changed, document what matters, and create a rhythm that keeps resilience from becoming a one-off project.'],
];

const tools = ['Nmap', 'Burp Suite', 'Metasploit', 'Hashcat', 'Hydra', 'Wireshark', 'SQLmap', 'BloodHound', 'Mimikatz', 'Impacket', 'Python', 'Bash'];
const certifications = ['CCNA v1.1 200-301', 'Practical Ethical Hacking (PEH)', 'Red Hat Linux System Administration 1', 'eJPT v2', 'ITI Mahara-Tech Cybersecurity Path', 'ITI Mahara-Tech OWASP Top 10'];

function scrollToSection(target: string, closeMenu?: () => void) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMenu?.();
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'work', 'capabilities', 'approach', 'experience', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-24% 0px -60% 0px', threshold: [0.05, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}Kareem-Mousa-Mahmoud-Resume.pdf`;
    link.download = 'Kareem-Mousa-Mahmoud-Resume.pdf';
    link.click();
  };

  return (
    <main className="site-shell">
      <header className="container topbar" data-testid="header-navigation">
        <button className="brand-mark" onClick={() => scrollToSection('home')} aria-label="Back to Kareem Mousa Mahmoud home" data-testid="button-brand-home">
          <span className="mark-box">KM</span>
          <span>
            <span className="brand-name">Kareem Mousa Mahmoud</span>
            <span className="brand-role">Penetration tester</span>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.target}
              className="nav-link"
              onClick={() => scrollToSection(item.target)}
              aria-current={activeSection === item.target ? 'page' : undefined}
              data-testid={`link-nav-${item.target}`}
            >
              {item.label}
            </button>
          ))}
          <button className="nav-link" onClick={() => scrollToSection('contact')} data-testid="link-nav-contact">Contact</button>
        </nav>
        <div className="topbar-availability"><span className="status-dot" /> Open to the right problem</div>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
        <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.target} className="nav-link" onClick={() => scrollToSection(item.target, () => setMenuOpen(false))} data-testid={`link-mobile-${item.target}`}>
              {item.label}
            </button>
          ))}
          <button className="nav-link" onClick={() => scrollToSection('contact', () => setMenuOpen(false))} data-testid="link-mobile-contact">Contact</button>
        </nav>
      </header>

      <section className="container hero" id="home" data-testid="section-home">
        <div className="hero-grid">
          <div>
<div>
  <div className="hero-kicker reveal">
    Cybersecurity · Penetration testing · Infrastructure & Security
  </div>
  <h1 className="reveal delay-1">
    KAREEM MOUSA MAHMOUD
  </h1>
  <img 
    src="./profile.jpg" 
    alt="Kareem" 
    className="w-full max-w-4xl h-auto rounded-xl object-cover mb-6 border border-slate-700/50 shadow-2xl" 
  />
</div>  
            <p className="hero-copy reveal delay-2">I assess networks and applications, uncover vulnerabilities, and turn technical findings into practical remediation strategies teams can act on.</p>
            <div className="hero-actions reveal delay-3">
              <button className="btn-primary" onClick={() => scrollToSection('contact')} data-testid="button-start-conversation">Start a conversation <ArrowDownRight size={15} /></button>
              <button className="btn-quiet" onClick={handleResumeDownload} data-testid="button-download-resume"><Download size={14} /> Download résumé</button>
            </div>
            <div className="hero-footnote"><span /> Computer & Systems Engineering · Ain Shams University</div>
          </div>

          <div className="terminal reveal delay-2" data-testid="card-security-status">
            <div className="terminal-head">
              <span>kareem@security / practice-status</span>
              <span className="terminal-dots"><i /><i /><i /></span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line"><strong>01</strong><span>practice.check(<b>focus</b>=<b>"penetration-testing"</b>)</span></div>
              <div className="terminal-line"><strong>02</strong><span>current_track = <b>"web + infrastructure"</b></span></div>
              <div className="terminal-line"><strong>03</strong><span>signal_quality = <b>"evidence-led"</b></span></div>
              <h2 className="terminal-title">Curiosity, made methodical.</h2>
              <p className="terminal-note">Good testing does more than find a weakness. It makes the path to fixing it clear for the people who own the system.</p>
              <div className="terminal-stat-row">
                <div className="terminal-stat" data-testid="stat-years-experience"><div className="terminal-stat-value">50+</div><div className="terminal-stat-label">web labs completed</div></div>
                <div className="terminal-stat" data-testid="stat-incidents-led"><div className="terminal-stat-value">06</div><div className="terminal-stat-label">certifications</div></div>
                <div className="terminal-stat" data-testid="stat-teams-supported"><div className="terminal-stat-value">100%</div><div className="terminal-stat-label">bypasses closed</div></div>
              </div>
              <div className="terminal-prompt">ready when you are</div>
            </div>
          </div>
        </div>
      </section>

      <div className="signal-strip" aria-label="Practice signals">
        <div className="container signal-inner">
          <span><b>●</b> operating normally</span><span>attack surface / mapped</span><span>evidence over assumptions</span><span>remediation-minded</span><span><b>↗</b> 2026 availability</span>
        </div>
      </div>

      <section className="container section" id="work" data-testid="section-work">
        <div className="section-header">
          <div><div className="eyebrow">Selected work / 01—03</div><h2 className="section-title">The work is technical.<br />The outcome is human.</h2></div>
          <p className="section-intro">Selected work across web applications, infrastructure, Active Directory, and intrusion prevention testing.</p>
        </div>
        <div className="work-list">
          {caseStudies.map((study) => (
            <article className="work-item" key={study.number} data-testid={`card-case-study-${study.number}`}>
              <div className="work-index">{study.number}</div>
              <div>
                <div className="work-tag">{study.type}</div>
                <h3 className="work-title">{study.title}</h3>
                <p className="work-description">{study.description}</p>
                <a className="work-link" href={`mailto:kareemousa17@gmail.com?subject=${encodeURIComponent(`${study.title} — field notes`)}`} data-testid={`link-case-study-${study.number}`}>{study.link} <ArrowUpRight size={13} /></a>
              </div>
              <div className="work-result"><strong>{study.result}</strong><span>{study.resultLabel}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="capability-section section" id="capabilities" data-testid="section-capabilities">
        <div className="container capabilities">
          <div>
            <div className="eyebrow">What I bring</div>
            <h2 className="section-title">Security that<br />ships.</h2>
             <p className="capability-lede">Security testing should not end with a screenshot of a vulnerability. <strong>I work from discovery to explanation</strong> — translating technical evidence into remediation steps that make the system harder to break.</p>
          </div>
          <div className="capability-list">
            {capabilities.map(([title, description], index) => (
              <article className="capability-row" key={title} data-testid={`capability-${index + 1}`}>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container section" id="approach" data-testid="section-approach">
        <div className="approach-grid">
          <div>
            <div className="eyebrow">A working method</div>
            <h2 className="section-title">No theatre.<br />Just traction.</h2>
             <p className="approach-lede">A useful penetration test should leave a team with more confidence and fewer open loops. My process is deliberately direct, evidence-led, and grounded in how systems actually behave.</p>
          </div>
          <div className="approach-steps">
            {approachSteps.map(([number, title, text]) => (
              <article className="approach-step" key={number} data-testid={`approach-step-${number}`}>
                <div className="step-number">{number}</div><div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-section section" data-testid="section-proof">
        <div className="container proof-grid">
           <div><div className="eyebrow">Proof, not theatre</div><h2 className="proof-title">The finding<br />must hold.</h2></div>
          <div>
             <p className="proof-copy">The most useful security work is specific: a reproducible finding, a clear explanation of impact, and a remediation path that closes the gap instead of moving it around.</p>
            <div className="proof-metrics">
               <div className="proof-metric" data-testid="metric-mean-time"><strong>100%</strong><span>SmartShield bypasses closed</span></div>
               <div className="proof-metric" data-testid="metric-controls"><strong>50+</strong><span>PortSwigger labs resolved</span></div>
               <div className="proof-metric" data-testid="metric-retention"><strong>06</strong><span>security certifications</span></div>
            </div>
             <blockquote className="quote">“I am passionate about continuous learning and applying technical skills to solve real-world security challenges.”<cite>— Kareem Mousa Mahmoud</cite></blockquote>
          </div>
        </div>
      </section>

      <section className="container section experience" id="experience" data-testid="section-experience">
        <div className="section-header">
          <div><div className="eyebrow">Selected experience</div><h2 className="section-title">Built in the<br />real world.</h2></div>
           <p className="section-intro">A foundation built through engineering study, hands-on labs, and practical security work.</p>
        </div>
        <div className="experience-layout">
          <div className="timeline">
             <article className="timeline-item" data-testid="experience-depi"><div className="timeline-date">Jun 2026—Now</div><div><h3 className="timeline-role">Cybersecurity Intern</h3><p className="timeline-company">Digital Egypt Pioneers Initiative · Infrastructure & security</p><p className="timeline-description">Conducting hands-on vulnerability analysis and penetration testing across network and web environments, documenting findings and remediation recommendations.</p></div></article>
             <article className="timeline-item" data-testid="experience-smartshield"><div className="timeline-date">Spring 2026</div><div><h3 className="timeline-role">Graduation Project Lead</h3><p className="timeline-company">SmartShield IPS · Attack testing framework</p><p className="timeline-description">Designed and executed adversarial testing against an intrusion prevention system, collaborating with developers through GitHub to close identified security bypasses.</p></div></article>
             <article className="timeline-item" data-testid="experience-ain-shams"><div className="timeline-date">Jun 2026</div><div><h3 className="timeline-role">B.Sc. Electrical Engineering</h3><p className="timeline-company">Ain Shams University · Computer & Systems Major</p><p className="timeline-description">Built a strong foundation across networking, cybersecurity, software systems, machine learning, and artificial intelligence.</p></div></article>
          </div>
          <aside className="toolbox">
             <h3>Tools I work with</h3>
            <div className="tool-tags">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
             <div className="certification-block">
               <h3>Certifications</h3>
               <div className="tool-tags">{certifications.map((certification) => <span key={certification}>{certification}</span>)}</div>
             </div>
             <div className="toolbox-note"><Check size={14} color="#b7d94f" /> <span>Every tool is part of a method: discover, validate, exploit responsibly, document, and remediate.</span></div>
          </aside>
        </div>
      </section>

      <section className="contact-section" id="contact" data-testid="section-contact">
        <div className="container contact-wrap">
          <div>
            <div className="eyebrow">Open channel</div>
            <h2 className="contact-title">Have a hard<br />problem? <em>Good.</em></h2>
             <p className="contact-copy">Have a web application, network, or security project that needs a closer look? Send me the context and I will reply with a practical next step.</p>
          </div>
          <div className="contact-links">
             <a className="contact-link" href="mailto:kareemousa17@gmail.com" data-testid="link-email">kareemousa17@gmail.com <small>Email <ArrowUpRight size={13} /></small></a>
             <a className="contact-link" href="tel:+201124316703" data-testid="link-phone">+20 11 2431 6703 <small>Phone <ArrowUpRight size={13} /></small></a>
             <div className="contact-link contact-link-static" data-testid="link-linkedin">LinkedIn <small>Profile link from résumé</small></div>
             <div className="contact-link contact-link-static" data-testid="link-github">GitHub <small>Profile link from résumé</small></div>
             <div className="contact-link contact-link-static" data-testid="link-tryhackme">TryHackMe <small>Profile link from résumé</small></div>
          </div>
        </div>
        <div className="container footer">
           <span>© 2026 Kareem Mousa Mahmoud</span>
           <span>Built for the work behind the finding.</span>
          <a href="#home" onClick={(event) => { event.preventDefault(); scrollToSection('home'); }} data-testid="link-back-top">Back to top ↑</a>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
