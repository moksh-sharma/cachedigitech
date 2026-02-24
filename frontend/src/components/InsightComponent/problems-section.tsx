import { AlertTriangle, Activity, Shield, Cloud, Cpu, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProblemsSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Security Incidents & Threat Diagnostics',
      desc: 'Analyze alerts, logs, and events to identify root causes, attack vectors, and remediation steps.',
    },
    {
      icon: Activity,
      title: 'Network Downtime & Performance Bottlenecks',
      desc: 'Trace packet loss, latency spikes, and configuration drift across WAN/LAN to restore reliability.',
    },
    {
      icon: Cloud,
      title: 'Cloud Cost Anomalies & Resource Sprawl',
      desc: 'Detect idle workloads, rightsize instances, and implement governance for predictable cloud spend.',
    },
    {
      icon: Cpu,
      title: 'Endpoint Health & Application Stability',
      desc: 'Diagnose device performance issues, crashes, and policy conflicts; improve user experience at scale.',
    },
    {
      icon: Shield,
      title: 'Compliance Gaps & Audit Readiness',
      desc: 'Map controls to frameworks, close gaps, and automate evidence collection for faster audits.',
    },
    {
      icon: Gauge,
      title: 'Data Pipelines & Observability',
      desc: 'Instrument pipelines, track SLAs, and resolve data integrity issues with end-to-end visibility.',
    },
  ];

  return (
    <section id="problems_and_diagnostics" className="py-16 lg:py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-heading">Problems & Diagnostics</h2>
          <div className="heading-underline">
            <div className="heading-line-primary"></div>
            <div className="heading-line-secondary"></div>
          </div>
          <p className="mt-6 text-gray-700 max-w-3xl mx-auto">
            We help you identify root causes quickly and systematically — from security incidents
            and network outages to cloud anomalies and compliance gaps — so your teams can focus
            on outcomes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contactus"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <span>Talk to Diagnostics Expert</span>
            <span className="flex items-center justify-center w-6 h-6 bg-white text-red-600 rounded-full text-sm" aria-hidden>➝</span>
          </Link>
        </div>
      </div>
    </section>
  );
}