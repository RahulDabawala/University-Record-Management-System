import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Loader2 } from 'lucide-react';
import { runQuery } from '../api/service';
import type { QueryId, QueryResult } from '../api/types';

interface QueryParam {
  key: string;
  label: string;
  placeholder: string;
  optional?: boolean; 
}

interface QueryDef {
  id: QueryId;
  label: string;
  description: string;
  params: QueryParam[];
}

const QUERIES: QueryDef[] = [
  {
    id: 'students_by_course_lecturer',
    label: 'Students enrolled in a course by a specific lecturer',
    description: 'Find all students enrolled in a specific course taught by a particular lecturer.',
    params: [
      { key: 'course',   label: 'Course code', placeholder: 'e.g. CS301' },
      { key: 'lecturer', label: 'Lecturer name',        placeholder: 'e.g. DR'                      },
    ],
  },
  {
    id: 'high_achievers_final_year',
    label: 'Students with average grade above 70% in final year',
    description: 'List all students with an average grade above 70% who are in their final year of studies.',
    params: [],
  },
  {
    id: 'unregistered_students',
    label: 'Students not registered this semester',
    description: 'Identify students who have not registered for any courses in a given semester.',
    params: [
      { key: 'semester', label: 'Semester', placeholder: 'e.g. 2025/26' },
    ],
  },
  {
    id: 'advisor_contact',
    label: 'Faculty advisor contact info for a student',
    description: 'Retrieve the contact information for the faculty advisor of a specific student.',
    params: [
      { key: 'student_id', label: 'Student ID', placeholder: 'e.g. 18' },
    ],
  },
  {
    id: 'lecturers_by_expertise',
    label: 'Lecturers with expertise in a research area',
    description: 'Search for lecturers with expertise in a particular research area.',
    params: [
      { key: 'expertise', label: 'Research area or expertise', placeholder: 'e.g. Machine Learning' },
    ],
  },
  {
    id: 'courses_by_department',
    label: 'Courses taught by lecturers in a specific department',
    description: 'List all courses taught by lecturers in a specific department.',
    params: [
      { key: 'department', label: 'Department name', placeholder: 'e.g. Computer Science' },
    ],
  },
  {
    id: 'publications_report',
    label: 'Publications report for lecturers from a given year',
    description: 'Generate a report on lecturer publications from a given year onwards (defaults to last year).',
    params: [
      { key: 'minimum_year', label: 'Minimum year', placeholder: `e.g. ${new Date().getFullYear() - 1}`, optional: true },
    ],
  },
  {
    id: 'top_supervisors',
    label: 'Lecturers who supervised the most research projects',
    description: 'Identify lecturers who have supervised the most student research projects.',
    params: [],
  },
  {
    id: 'students_by_advisor',
    label: 'Students advised by a specific lecturer',
    description: 'Retrieve the names and details of students advised by a specific lecturer.',
    params: [
      { key: 'advisor', label: 'Lecturer name', placeholder: 'e.g. Krishnan' },
    ],
  },
  {
    id: 'staff_by_department',
    label: 'Staff in a specific department',
    description: 'Find all staff members employed in a specific department.',
    params: [
      { key: 'department', label: 'Department name', placeholder: 'e.g. Finance' },
    ],
  },
];

// ── Result table ─────────────────────────────────────────────
function ResultTable({ result }: { result: QueryResult }) {
  if (result.rows.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-slate-500 text-sm">
        No results found for your search.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse min-w-max">
        <thead>
          <tr className="border-b border-slate-700">
            {result.columns.map(col => (
              <th key={col} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.rows.map((row, i) => (
            <tr key={i} className={`border-b border-slate-800/60 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
              {result.columns.map(col => (
                <td key={col} className="px-4 py-2.5 text-slate-300 whitespace-nowrap">
                  {String(row[col] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QueryCard({ def, index }: { def: QueryDef; index: number }) {
  const [params, setParams] = useState<Record<string, string>>({});
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading, isFetching, isError, error } = useQuery<QueryResult>({
    queryKey: ['query', def.id, params],
    queryFn: () => runQuery(def.id, params),
    enabled,
    staleTime: 60_000,
  });

  const canRun = def.params
    .filter(p => !p.optional)
    .every(p => (params[p.key] ?? '').trim().length > 0);

  function handleRun() {
    if (enabled) {
      setEnabled(false);
      setTimeout(() => setEnabled(true), 10);
    } else {
      setEnabled(true);
    }
  }

  const loading = isLoading || isFetching;

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d1526] overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <span className="text-xs font-mono text-slate-600 mt-0.5 w-5 shrink-0">Q{index + 1}</span>
          <div>
            <h3 className="text-white font-semibold text-sm leading-snug">{def.label}</h3>
            <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{def.description}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 flex flex-wrap gap-3 items-end">
        {def.params.map(p => (
          <div key={p.key} className="flex flex-col gap-1.5 min-w-[200px] flex-1">
            <label className="text-slate-400 text-xs font-medium">
              {p.label}{p.optional && <span className="text-slate-600"> (optional)</span>}
            </label>
            <input
              type="text"
              value={params[p.key] ?? ''}
              placeholder={p.placeholder}
              onChange={e => {
                setParams(prev => ({ ...prev, [p.key]: e.target.value }));
                setEnabled(false);
              }}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white
                placeholder:text-slate-600 focus:outline-none focus:border-teal-500
                focus:ring-1 focus:ring-teal-500/30 transition-colors"
            />
          </div>
        ))}

        <button
          onClick={handleRun}
          disabled={!canRun || loading}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white
            bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95 transition-all shadow-md shadow-teal-900/30 shrink-0"
        >
          {loading
            ? <><Loader2 size={13} className="animate-spin" /> Running…</>
            : <><Play size={13} /> Run</>
          }
        </button>
      </div>

      {isError && (
        <div className="px-5 py-3 border-t border-slate-800 text-xs text-red-400">
          {error instanceof Error ? error.message : 'Something went wrong running this query.'}
        </div>
      )}

      {enabled && !loading && data && (
        <div className="border-t border-slate-800">
          <div className="px-5 py-2 bg-slate-900/40 flex items-center gap-2">
            <span className="text-xs text-slate-500">
              <span className="text-white font-semibold">{data.rows.length}</span>{' '}
              {data.rows.length === 1 ? 'row' : 'rows'} returned
            </span>
          </div>
          <ResultTable result={data} />
        </div>
      )}
    </div>
  );
}

export function QueryPanel() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-white font-bold text-xl">Database Queries</h1>
          <p className="text-slate-500 text-sm mt-1">
            {QUERIES.length} queries — fill in any required fields and click Run.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {QUERIES.map((q, i) => <QueryCard key={q.id} def={q} index={i} />)}
        </div>
      </div>
    </div>
  );
}