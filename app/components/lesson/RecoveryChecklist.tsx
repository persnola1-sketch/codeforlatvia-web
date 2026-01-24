'use client';

import { useState } from 'react';

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  details: string[];
  code?: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 1,
    title: 'Nekavējoties anulē (revoke) atslēgu',
    description: 'Dodies uz OpenRouter (vai citu servisu) paneli un izdzēs nopluđināto atslēgu.',
    details: [
      'Labāk, lai lietotne uz brīdi nestrādā, nekā bankas konts paliek tukšs.',
      'Atslēga jau var būt automātiski atslēgta, bet pārliecinies.',
    ],
  },
  {
    id: 2,
    title: 'Izveido jaunu atslēgu',
    description: 'Uzgenerē jaunu noslēpumu, bet šoreiz neglabā to kodā.',
    details: [
      'Izveido jaunu API atslēgu servisa panelī.',
      'NEGLABĀ to .env failā, kamēr nav pārliecinājies, ka .gitignore ir pareizi konfigurēts.',
    ],
  },
  {
    id: 3,
    title: 'Sakārto .gitignore',
    description: 'Pārliecinies, ka tavā .gitignore failā ir pareizas rindas.',
    details: [
      'Pievieno vai pārbaudi, ka .gitignore satur:',
    ],
    code: `.env*\n.env.local\n.env*.local`,
  },
  {
    id: 4,
    title: 'Iztīri Git vēsturi (Svarīgi!)',
    description: 'Tā kā vecais commit joprojām satur atslēgu, tev ir jāizmanto speciāli rīki.',
    details: [
      'Vienkārša izdzēšana no koda nepietiek - Git atceras visu vēsturi!',
      'Izmanto git filter-repo vai BFG Repo-Cleaner.',
      'Piemērs ar BFG: java -jar bfg.jar --replace-text passwords.txt my-repo.git',
    ],
  },
  {
    id: 5,
    title: 'Pārbaudi citus failus',
    description: 'Pārliecinies, ka citur kodā nav citi noslēpumi.',
    details: [
      'Meklē hard-coded atslēgas uz process.env.',
      'Pārbaudi, vai nav citi .env faili, kas nav .gitignore.',
      'Izmanto GitHub Secret Scanning vai līdzīgus rīkus.',
    ],
  },
];

export default function RecoveryChecklist() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Glābšanas plāns: 5 soļi, kā labot kļūdu
        </h2>
      </div>

      <div className="space-y-4">
        {checklistItems.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          return (
            <div
              key={item.id}
              className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/20 border-2 border-cyan-500 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">{item.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-700 pt-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="text-sm">{detail}</li>
                    ))}
                  </ul>
                  {item.code && (
                    <div className="mt-4 bg-black/30 rounded-lg p-4 border border-gray-700">
                      <code className="text-cyan-300 font-mono text-sm whitespace-pre">{item.code}</code>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
