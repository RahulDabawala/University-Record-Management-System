import type { QueryId, QueryResult } from './types';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Dummy data

const STUDENTS = [
  { id:'STU001', name:'Amara Osei',      email:'a.osei@uni.edu',      phone:'+44 7700 900001', program:'Computer Science',  year:4, gpa:3.8, advisor_id:'LEC001', advisor:'Dr. Patricia Voss',    registered: true  },
  { id:'STU002', name:'Luca Ferretti',   email:'l.ferretti@uni.edu',  phone:'+44 7700 900002', program:'Mathematics',       year:1, gpa:3.2, advisor_id:'LEC002', advisor:'Prof. James Osei',     registered: true  },
  { id:'STU003', name:'Priya Nair',      email:'p.nair@uni.edu',      phone:'+44 7700 900003', program:'Computer Science',  year:4, gpa:3.9, advisor_id:'LEC003', advisor:'Dr. Ananya Krishnan',  registered: true  },
  { id:'STU004', name:'Tobias Müller',   email:'t.muller@uni.edu',    phone:'+44 7700 900004', program:'Business',          year:2, gpa:2.7, advisor_id:'LEC004', advisor:'Prof. Bruno Castillo', registered: false },
  { id:'STU005', name:'Fatima Al-Hassan',email:'f.alhassan@uni.edu',  phone:'+44 7700 900005', program:'Physics',           year:3, gpa:3.1, advisor_id:'LEC005', advisor:'Dr. Sarah Thornton',   registered: true  },
  { id:'STU006', name:'Kenji Watanabe',  email:'k.watanabe@uni.edu',  phone:'+44 7700 900006', program:'Computer Science',  year:4, gpa:3.7, advisor_id:'LEC001', advisor:'Dr. Patricia Voss',    registered: true  },
  { id:'STU007', name:'Sophia Papadakis',email:'s.papadakis@uni.edu', phone:'+44 7700 900007', program:'Engineering',       year:2, gpa:2.9, advisor_id:'LEC007', advisor:'Dr. Hassan El-Amin',   registered: false },
  { id:'STU008', name:'Ravi Shankar',    email:'r.shankar@uni.edu',   phone:'+44 7700 900008', program:'Mathematics',       year:1, gpa:3.5, advisor_id:'LEC002', advisor:'Prof. James Osei',     registered: true  },
  { id:'STU009', name:'Ingrid Lindqvist',email:'i.lindqvist@uni.edu', phone:'+44 7700 900009', program:'Computer Science',  year:3, gpa:3.3, advisor_id:'LEC003', advisor:'Dr. Ananya Krishnan',  registered: true  },
  { id:'STU010', name:'Marcus Okonkwo',  email:'m.okonkwo@uni.edu',   phone:'+44 7700 900010', program:'Business',          year:1, gpa:3.0, advisor_id:'LEC004', advisor:'Prof. Bruno Castillo', registered: false },
  { id:'STU011', name:'Zara Ivanova',    email:'z.ivanova@uni.edu',   phone:'+44 7700 900011', program:'Physics',           year:2, gpa:3.6, advisor_id:'LEC005', advisor:'Dr. Sarah Thornton',   registered: true  },
  { id:'STU012', name:'Diego Reyes',     email:'d.reyes@uni.edu',     phone:'+44 7700 900012', program:'Engineering',       year:1, gpa:2.4, advisor_id:'LEC007', advisor:'Dr. Hassan El-Amin',   registered: false },
  { id:'STU013', name:'Aisha Kamara',    email:'a.kamara@uni.edu',    phone:'+44 7700 900013', program:'Computer Science',  year:3, gpa:3.4, advisor_id:'LEC001', advisor:'Dr. Patricia Voss',    registered: true  },
  { id:'STU014', name:'Finn O\'Brien',   email:'f.obrien@uni.edu',    phone:'+44 7700 900014', program:'Arts & Humanities', year:4, gpa:3.8, advisor_id:'LEC006', advisor:'Prof. Yuki Tanaka',    registered: true  },
  { id:'STU015', name:'Mei Zhang',       email:'m.zhang@uni.edu',     phone:'+44 7700 900015', program:'Computer Science',  year:1, gpa:4.0, advisor_id:'LEC003', advisor:'Dr. Ananya Krishnan',  registered: true  },
  { id:'STU016', name:'Omar Farooqi',    email:'o.farooqi@uni.edu',   phone:'+44 7700 900016', program:'Mathematics',       year:3, gpa:3.2, advisor_id:'LEC002', advisor:'Prof. James Osei',     registered: true  },
  { id:'STU017', name:'Elena Kozlova',   email:'e.kozlova@uni.edu',   phone:'+44 7700 900017', program:'Physics',           year:2, gpa:3.7, advisor_id:'LEC005', advisor:'Dr. Sarah Thornton',   registered: false },
  { id:'STU018', name:'Kwame Asante',    email:'k.asante@uni.edu',    phone:'+44 7700 900018', program:'Business',          year:4, gpa:3.9, advisor_id:'LEC004', advisor:'Prof. Bruno Castillo', registered: true  },
  { id:'STU019', name:'Sara Lindström',  email:'s.lindstrom@uni.edu', phone:'+44 7700 900019', program:'Engineering',       year:2, gpa:3.1, advisor_id:'LEC007', advisor:'Dr. Hassan El-Amin',   registered: true  },
  { id:'STU020', name:'Ali Hassan',      email:'a.hassan@uni.edu',    phone:'+44 7700 900020', program:'Computer Science',  year:1, gpa:2.8, advisor_id:'LEC001', advisor:'Dr. Patricia Voss',    registered: true  },
];

const LECTURERS = [
  { id:'LEC001', name:'Dr. Patricia Voss',    dept:'Computer Science',  expertise:'Database Systems, AI',           research:'Distributed Databases, ML',       publications:[{title:'Federated Query Optimisation',year:2024},{title:'Neural DB Indexing',year:2023}],         supervised_projects:4 },
  { id:'LEC002', name:'Prof. James Osei',     dept:'Mathematics',       expertise:'Linear Algebra, Calculus',       research:'Numerical Methods, Graph Theory',  publications:[{title:'Graph Laplacians in ML',year:2024},{title:'Sparse Matrix Methods',year:2022}],          supervised_projects:2 },
  { id:'LEC003', name:'Dr. Ananya Krishnan',  dept:'Computer Science',  expertise:'Algorithms, Machine Learning',   research:'Deep Learning, NLP',              publications:[{title:'Transformer Compression',year:2024},{title:'LLM Efficiency',year:2024},{title:'BERT Fine-Tuning Survey',year:2023}], supervised_projects:6 },
  { id:'LEC004', name:'Prof. Bruno Castillo', dept:'Business',          expertise:'Strategy, Management',           research:'Organisational Behaviour',         publications:[{title:'Post-Pandemic Org Design',year:2023}],                                                   supervised_projects:1 },
  { id:'LEC005', name:'Dr. Sarah Thornton',   dept:'Physics',           expertise:'Quantum Mechanics, Optics',      research:'Quantum Computing, Photonics',     publications:[{title:'Photonic Qubit Stability',year:2024},{title:'Error Correction Codes',year:2023},{title:'Quantum Entanglement Survey',year:2022},{title:'Decoherence Models',year:2024}], supervised_projects:3 },
  { id:'LEC006', name:'Prof. Yuki Tanaka',    dept:'Arts & Humanities', expertise:'Modern Literature, Linguistics', research:'Post-Colonial Literature',         publications:[{title:'Decolonising the Canon',year:2024},{title:'Digital Narratives',year:2023}],             supervised_projects:1 },
  { id:'LEC007', name:'Dr. Hassan El-Amin',   dept:'Engineering',       expertise:'Systems Engineering, Robotics',  research:'Autonomous Systems, IoT',          publications:[{title:'Drone Path Planning',year:2023},{title:'IoT Security Protocols',year:2022}],            supervised_projects:2 },
];

const COURSES = [
  { code:'CS101',   name:'Introduction to Programming',    dept:'Computer Science',  lecturer_id:'LEC001', lecturer:'Dr. Patricia Voss'    },
  { code:'CS201',   name:'Data Structures and Algorithms', dept:'Computer Science',  lecturer_id:'LEC003', lecturer:'Dr. Ananya Krishnan'  },
  { code:'CS301',   name:'Database Systems',               dept:'Computer Science',  lecturer_id:'LEC001', lecturer:'Dr. Patricia Voss'    },
  { code:'CS401',   name:'Machine Learning',               dept:'Computer Science',  lecturer_id:'LEC003', lecturer:'Dr. Ananya Krishnan'  },
  { code:'CS501',   name:'Cloud Computing',                dept:'Computer Science',  lecturer_id:'LEC001', lecturer:'Dr. Patricia Voss'    },
  { code:'MATH101', name:'Calculus I',                     dept:'Mathematics',       lecturer_id:'LEC002', lecturer:'Prof. James Osei'     },
  { code:'MATH201', name:'Linear Algebra',                 dept:'Mathematics',       lecturer_id:'LEC002', lecturer:'Prof. James Osei'     },
  { code:'PHY101',  name:'Physics I',                      dept:'Physics',           lecturer_id:'LEC005', lecturer:'Dr. Sarah Thornton'   },
  { code:'PHY201',  name:'Quantum Mechanics',              dept:'Physics',           lecturer_id:'LEC005', lecturer:'Dr. Sarah Thornton'   },
  { code:'BUS101',  name:'Introduction to Business',       dept:'Business',          lecturer_id:'LEC004', lecturer:'Prof. Bruno Castillo' },
  { code:'BUS201',  name:'Strategic Management',           dept:'Business',          lecturer_id:'LEC004', lecturer:'Prof. Bruno Castillo' },
  { code:'ENG101',  name:'Systems Engineering I',          dept:'Engineering',       lecturer_id:'LEC007', lecturer:'Dr. Hassan El-Amin'   },
  { code:'ENG201',  name:'Robotics Fundamentals',          dept:'Engineering',       lecturer_id:'LEC007', lecturer:'Dr. Hassan El-Amin'   },
  { code:'HUM101',  name:'Modern Literature',              dept:'Arts & Humanities', lecturer_id:'LEC006', lecturer:'Prof. Yuki Tanaka'    },
];

// Student → courses mapping
const ENROLMENTS: Record<string, string[]> = {
  STU001: ['CS301','CS401','CS501'],
  STU002: ['MATH101','MATH201'],
  STU003: ['CS201','CS401','CS501'],
  STU004: ['BUS101','BUS201'],
  STU005: ['PHY101','PHY201'],
  STU006: ['CS101','CS301','CS501'],
  STU007: ['ENG101','ENG201'],
  STU008: ['MATH101'],
  STU009: ['CS201','CS301'],
  STU010: ['BUS101'],
  STU011: ['PHY101'],
  STU012: ['ENG101'],
  STU013: ['CS101','CS201'],
  STU014: ['HUM101'],
  STU015: ['CS101','CS201','CS301'],
  STU016: ['MATH101','MATH201'],
  STU017: ['PHY101','PHY201'],
  STU018: ['BUS101','BUS201'],
  STU019: ['ENG101','ENG201'],
  STU020: ['CS101'],
};

const STAFF = [
  { id:'STF001', name:'Rebecca Hartmann', title:'Registrar',              dept:'Academic Affairs',  type:'Full-time', email:'r.hartmann@uni.edu',  emergency:'Klaus Hartmann · +44 7700 800001' },
  { id:'STF002', name:'Charles Diop',     title:'Course Planner',         dept:'Academic Affairs',  type:'Full-time', email:'c.diop@uni.edu',      emergency:'Marie Diop · +44 7700 800002'     },
  { id:'STF003', name:'Amelia Brooks',    title:'IT Systems Admin',        dept:'IT Services',       type:'Full-time', email:'a.brooks@uni.edu',    emergency:'Tom Brooks · +44 7700 800003'     },
  { id:'STF004', name:'Yusuf Adeyemi',    title:'Finance Officer',         dept:'Finance',           type:'Full-time', email:'y.adeyemi@uni.edu',   emergency:'Bisi Adeyemi · +44 7700 800004'   },
  { id:'STF005', name:'Claire Fontaine',  title:'Lab Technician',          dept:'Physics',           type:'Part-time', email:'c.fontaine@uni.edu',  emergency:'Pierre Fontaine · +44 7700 800005'},
  { id:'STF006', name:'Dmitri Volkov',    title:'Research Administrator',  dept:'Research Office',   type:'Full-time', email:'d.volkov@uni.edu',    emergency:'Natasha Volkov · +44 7700 800006' },
  { id:'STF007', name:'Nadia Okafor',     title:'HR Coordinator',          dept:'Human Resources',   type:'Contract',  email:'n.okafor@uni.edu',    emergency:'Emeka Okafor · +44 7700 800007'   },
];

// Query runner
export async function runQuery(id: QueryId, params: Record<string, string>): Promise<QueryResult> {
  await delay(350 + Math.random() * 250);

  switch (id) {

    case 'students_by_course_lecturer': {
      const course   = (params.course   ?? '').toLowerCase();
      const lecturer = (params.lecturer ?? '').toLowerCase();
      const matchingCourseCodes = COURSES
        .filter(c =>
          (c.name.toLowerCase().includes(course) || c.code.toLowerCase().includes(course)) &&
          c.lecturer.toLowerCase().includes(lecturer)
        )
        .map(c => c.code);
      const rows = STUDENTS
        .filter(s => matchingCourseCodes.some(code => (ENROLMENTS[s.id] ?? []).includes(code)))
        .map(s => ({
          'Student ID': s.id,
          'Name': s.name,
          'Email': s.email,
          'Program': s.program,
          'Year': s.year,
          'GPA': s.gpa.toFixed(1),
        }));
      return { columns: ['Student ID','Name','Email','Program','Year','GPA'], rows };
    }

    case 'high_achievers_final_year': {
      const rows = STUDENTS
        .filter(s => s.gpa >= 2.8 && s.year >= 3)
        .sort((a, b) => b.gpa - a.gpa)
        .map(s => ({
          'Student ID': s.id,
          'Name': s.name,
          'Program': s.program,
          'Year': s.year,
          'GPA': s.gpa.toFixed(1),
          'Avg Grade (%)': Math.round(s.gpa / 4.0 * 100),
        }));
      return { columns: ['Student ID','Name','Program','Year','GPA','Avg Grade (%)'], rows };
    }

    case 'unregistered_students': {
      const rows = STUDENTS
        .filter(s => !s.registered)
        .map(s => ({
          'Student ID': s.id,
          'Name': s.name,
          'Email': s.email,
          'Program': s.program,
          'Year': s.year,
          'Advisor': s.advisor,
        }));
      return { columns: ['Student ID','Name','Email','Program','Year','Advisor'], rows };
    }

    case 'advisor_contact': {
      const q = (params.student ?? '').toLowerCase();
      const student = STUDENTS.find(s =>
        s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
      );
      if (!student) return { columns: ['Student ID','Student Name','Advisor ID','Advisor Name','Advisor Email','Department'], rows: [] };
      const lec = LECTURERS.find(l => l.id === student.advisor_id)!;
      return {
        columns: ['Student ID','Student Name','Advisor ID','Advisor Name','Advisor Email','Department'],
        rows: [{
          'Student ID': student.id,
          'Student Name': student.name,
          'Advisor ID': lec.id,
          'Advisor Name': lec.name,
          'Advisor Email': lec.id.toLowerCase().replace('lec','l') + '@uni.edu',
          'Department': lec.dept,
        }],
      };
    }

    case 'lecturers_by_expertise': {
      const area = (params.expertise ?? '').toLowerCase();
      const rows = LECTURERS
        .filter(l =>
          l.expertise.toLowerCase().includes(area) ||
          l.research.toLowerCase().includes(area)
        )
        .map(l => ({
          'Lecturer ID': l.id,
          'Name': l.name,
          'Department': l.dept,
          'Expertise': l.expertise,
          'Research Interests': l.research,
          'Publications': l.publications.length,
        }));
      return { columns: ['Lecturer ID','Name','Department','Expertise','Research Interests','Publications'], rows };
    }

    case 'courses_by_department': {
      const dept = (params.department ?? '').toLowerCase();
      const rows = COURSES
        .filter(c => c.dept.toLowerCase().includes(dept))
        .map(c => ({
          'Course Code': c.code,
          'Course Name': c.name,
          'Department': c.dept,
          'Lecturer': c.lecturer,
          'Enrolled': Object.values(ENROLMENTS).filter(codes => codes.includes(c.code)).length,
        }));
      return { columns: ['Course Code','Course Name','Department','Lecturer','Enrolled'], rows };
    }

    case 'publications_report': {
      const currentYear = 2024;
      const rows = LECTURERS
        .flatMap(l => l.publications
          .filter(p => p.year >= currentYear - 1)
          .map(p => ({
            'Lecturer': l.name,
            'Department': l.dept,
            'Publication Title': p.title,
            'Year': p.year,
          }))
        )
        .sort((a, b) => b['Year'] - a['Year']);
      return { columns: ['Lecturer','Department','Publication Title','Year'], rows };
    }

    case 'top_supervisors': {
      const rows = LECTURERS
        .map(l => ({
          'Lecturer ID': l.id,
          'Name': l.name,
          'Department': l.dept,
          'Students Advised': STUDENTS.filter(s => s.advisor_id === l.id).length,
          'Research Projects Supervised': l.supervised_projects,
          'Total Publications': l.publications.length,
        }))
        .sort((a, b) => b['Research Projects Supervised'] - a['Research Projects Supervised']);
      return { columns: ['Lecturer ID','Name','Department','Students Advised','Research Projects Supervised','Total Publications'], rows };
    }

    case 'students_by_advisor': {
      const q = (params.advisor ?? '').toLowerCase();
      const lec = LECTURERS.find(l =>
        l.name.toLowerCase().includes(q) || l.id.toLowerCase().includes(q)
      );
      if (!lec) return { columns: ['Student ID','Name','Email','Program','Year','GPA'], rows: [] };
      const rows = STUDENTS
        .filter(s => s.advisor_id === lec.id)
        .map(s => ({
          'Student ID': s.id,
          'Name': s.name,
          'Email': s.email,
          'Program': s.program,
          'Year': s.year,
          'GPA': s.gpa.toFixed(1),
        }));
      return { columns: ['Student ID','Name','Email','Program','Year','GPA'], rows };
    }

    case 'staff_by_department': {
      const dept = (params.department ?? '').toLowerCase();
      const rows = STAFF
        .filter(s => s.dept.toLowerCase().includes(dept))
        .map(s => ({
          'Staff ID': s.id,
          'Name': s.name,
          'Job Title': s.title,
          'Department': s.dept,
          'Employment Type': s.type,
          'Email': s.email,
          'Emergency Contact': s.emergency,
        }));
      return { columns: ['Staff ID','Name','Job Title','Department','Employment Type','Email','Emergency Contact'], rows };
    }

    default:
      return { columns: [], rows: [] };
  }
}
