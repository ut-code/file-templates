CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL CHECK (LENGTH(title) > 3),
    content TEXT NOT NULL,
    created_at Timestamp NOT NULL,
    completed_at Timestamp NULL,
    CHECK (completed_at > created_at)
);

INSERT INTO todos (title, content, created_at, completed_at) VALUES
('Commit', 'Create 10 commits per day', '2024-10-28', NULL),
('Personal Project', 'Create a personal project', '2024-9-30', '2024-10-01');
