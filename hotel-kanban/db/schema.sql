-- Staff directory and roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(80) NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles(id),
  phone VARCHAR(20),
  shift VARCHAR(20)
);

-- Kanban workflow
CREATE TABLE statuses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL,
  position INTEGER NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  status_id INTEGER NOT NULL REFERENCES statuses(id),
  priority VARCHAR(12) NOT NULL DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE task_assignments (
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  PRIMARY KEY (task_id, staff_id)
);

-- Seed data
INSERT INTO roles (name) VALUES
  ('Manager'), ('Front Desk'), ('Chef'), ('Sous Chef'), ('Line Cook'),
  ('Pastry'), ('Waiter'), ('Waitress'), ('Bartender'),
  ('Housekeeping'), ('Maintenance'), ('Security');

INSERT INTO statuses (name, position) VALUES
  ('backlog', 1), ('in-progress', 2), ('review', 3), ('done', 4);

-- Example people (abbreviated to keep the sample concise)
INSERT INTO staff (full_name, role_id, phone, shift)
SELECT * FROM (
  VALUES
    ('Nora Ahmed', 1, '+1-555-1100', 'Day'),
    ('Luis Santos', 1, '+1-555-1101', 'Evening'),
    ('Ivy Chen', 2, '+1-555-1102', 'Day'),
    ('Victor Lee', 3, '+1-555-1103', 'Day'),
    ('Aaron Blake', 11, '+1-555-1104', 'Day'),
    ('Zoe Sun', 11, '+1-555-1105', 'Evening'),
    ('Paulina Silva', 10, '+1-555-1106', 'Day'),
    ('Lena Fox', 9, '+1-555-1107', 'Evening'),
    ('Ari Levy', 12, '+1-555-1108', 'Night')
) AS seed(full_name, role_id, phone, shift);

-- Example tasks
INSERT INTO tasks (title, description, status_id, priority, due_date) VALUES
  ('Replace AC filter - Room 412', 'Swap the AC filter and check for noise.', 1, 'high', CURRENT_DATE),
  ('VIP check-in support', 'Coordinate with concierge for 5pm arrival.', 2, 'critical', CURRENT_DATE + INTERVAL '1 day'),
  ('Deep clean conference rooms', 'Rooms A and B after corporate retreat.', 1, 'medium', CURRENT_DATE + INTERVAL '2 days');

INSERT INTO task_assignments (task_id, staff_id) VALUES
  (1, 5),
  (2, 1),
  (3, 7);
