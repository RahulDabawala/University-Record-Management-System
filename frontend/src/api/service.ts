import type { QueryId, QueryResult } from './types';

// Point this at your FastAPI server. Override via .env (Vite: import.meta.env.VITE_API_BASE_URL)
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

/** Converts a snake_case backend key into a readable column header. e.g. "student_id" -> "Student Id" */
function toHeader(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Calls a GET endpoint with query params and formats the JSON array response into {columns, rows}. */
async function fetchRows(path: string, params: Record<string, string | number | undefined> = {}): Promise<QueryResult> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value));
  }
  const url = `${BASE_URL}${path}${query.toString() ? `?${query.toString()}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Request to ${path} failed (${res.status}): ${detail}`);
  }

  const data: Array<Record<string, unknown>> = await res.json();
  if (data.length === 0) return { columns: [], rows: [] };

  const columns = Object.keys(data[0]).map(toHeader);
  const rows = data.map(row => {
    const mapped: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      mapped[toHeader(key)] = value;
    }
    return mapped;
  });

  return { columns, rows };
}

export async function runQuery(id: QueryId, params: Record<string, string>): Promise<QueryResult> {
  switch (id) {

    case 'students_by_course_lecturer':
      return fetchRows('/students/by-course', {
        course: params.course,
        lecturer: params.lecturer,
      });

    case 'high_achievers_final_year':
      return fetchRows('/high-achievers');

    case 'unregistered_students':
      return fetchRows('/unregistered-students', {
        semester: params.semester,
      });

    case 'advisor_contact':
      return fetchRows('/students/advisor', {
        student_id: params.student_id,
      });

    case 'lecturers_by_expertise':
      return fetchRows('/lecturers/research', {
        research_area: params.expertise,
      });

    case 'courses_by_department':
      return fetchRows('/courses/department', {
        department: params.department,
      });

    case 'publications_report': {
      const minimumYear = params.minimum_year ?? String(new Date().getFullYear() - 1);
      return fetchRows('/lecturers/publications', {
        minimum_year: minimumYear,
      });
    }

    case 'top_supervisors':
      return fetchRows('/lecturers/top-supervisors');

    case 'students_by_advisor':
      return fetchRows('/students/by-advisor', {
        lecturer_name: params.advisor,
      });

    case 'staff_by_department':
      return fetchRows('/staff/department', {
        department: params.department,
      });

    default:
      return { columns: [], rows: [] };
  }
}