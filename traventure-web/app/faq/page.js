import PageShell from '../components/PageShell';

const faqs = [
  {
    question: 'How do I change my booking dates?',
    answer: 'Open your trip dashboard and pick new dates. We will recheck availability instantly.',
  },
  {
    question: 'Do you hold spots for groups?',
    answer: 'Yes. Group holds are available for 48 hours so everyone can confirm.',
  },
  {
    question: 'Can I combine hotels and guides?',
    answer: 'Absolutely. Add guides after selecting your hotel or flight.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'All major cards, plus select regional wallets. Payment plans vary by destination.',
  },
];

export default function FaqPage() {
  return (
    <PageShell
      title="FAQ"
      subtitle="Quick answers for planning, payments, and flexible changes."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map(faq => (
          <div key={faq.question} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-slate-100">{faq.question}</p>
            <p className="mt-2 text-sm text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
