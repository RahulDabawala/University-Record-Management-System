export type QueryId =
  | 'students_by_course_lecturer'
  | 'high_achievers_final_year'
  | 'advisor_contact'
  | 'lecturers_by_expertise'
  | 'courses_by_department'
  | 'publications_report'
  | 'top_supervisors'
  | 'students_by_advisor'
  | 'staff_by_department'
  | 'unregistered_students';

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
}
