export const DUMMY_DATA = {
  '1234': {
    project_title: 'Projekt mieszkanie m3',
    project_status: 'w toku',
    investors: ['Jan Kowalski', 'Grażyna Kowalska'],
    color: '#01c3a8',
    project_stages: {
      stage_1: [
        {
          stage_description: 'dodanie podstawowocyh widokow',
          stage_tasks: [
            {
              task_id: '123as',
              task_description: 'dodanie czegos do czegos',
              task_comments: [
                {
                  comment_id: 'comment_1',
                  comment_text: 'To jest komentarz do tego zadania',
                  author: 'Jan Kowalski',
                  author_id: 'user_123',
                  created_at: '2024-01-15T10:30:00Z',
                  updated_at: null,
                },
                {
                  comment_id: 'comment_2',
                  comment_text: 'Dodałem zmiany w kodzie',
                  author: 'Grażyna Kowalska',
                  author_id: 'user_456',
                  created_at: '2024-01-15T14:20:00Z',
                  updated_at: '2024-01-15T15:00:00Z',
                },
              ],
            },
          ],
        },
      ],
      stage_2: [
        {
          stage_description: 'drugi etap',
          stage_tasks: [
            {
              task_id: '123as',
              task_description: 'dodanie czegos do czegos task 2',
              task_comments: [
                {
                  comment_id: 'comment_1',
                  comment_text: 'To jest komentarz do tego zadania2',
                  author: 'Jan Kowalski',
                  author_id: 'user_123',
                  created_at: '2024-01-15T10:30:00Z',
                  updated_at: null,
                },
                {
                  comment_id: 'comment_2',
                  comment_text: 'Dodałem zmiany w kodzie',
                  author: 'Grażyna Kowalska',
                  author_id: 'user_456',
                  created_at: '2024-01-15T14:20:00Z',
                  updated_at: '2024-01-15T15:00:00Z',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  '1235': {
    project_title: 'Kuchnia w przyczepie',
    project_status: 'zakończony',
    investors: ['Jan Wilczur'],
    color: '#c301a8',
    project_stages: {
      stage_1: [
        {
          stage_description: 'dodanie podstawowocyh widokow',
          stage_tasks: [
            {
              task_id: '123as',
              task_description: 'dodanie czegos do czegos',
              task_comments: [
                {
                  comment_id: 'comment_1',
                  comment_text: 'To jest komentarz do tego zadania',
                  author: 'Jan Kowalski',
                  author_id: 'user_123',
                  created_at: '2024-01-15T10:30:00Z',
                  updated_at: null,
                },
                {
                  comment_id: 'comment_2',
                  comment_text: 'Dodałem zmiany w kodzie',
                  author: 'Grażyna Kowalska',
                  author_id: 'user_456',
                  created_at: '2024-01-15T14:20:00Z',
                  updated_at: '2024-01-15T15:00:00Z',
                },
              ],
            },
          ],
        },
      ],
      stage_2: [
        {
          stage_description: 'drugi etap',
          stage_tasks: [
            {
              task_id: '123as',
              task_description: 'dodanie czegos do czegos',
              task_comments: [
                {
                  comment_id: 'comment_1',
                  comment_text: 'To jest komentarz do tego zadania',
                  author: 'Jan Kowalski',
                  author_id: 'user_123',
                  created_at: '2024-01-15T10:30:00Z',
                  updated_at: null,
                },
                {
                  comment_id: 'comment_2',
                  comment_text: 'Dodałem zmiany w kodzie',
                  author: 'Grażyna Kowalska',
                  author_id: 'user_456',
                  created_at: '2024-01-15T14:20:00Z',
                  updated_at: '2024-01-15T15:00:00Z',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
