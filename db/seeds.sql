-- File path: rolecall/db/seeds.sql

-- Insert departments into the department table
INSERT INTO department (name)
VALUES ('Moss & Mushroom Storytelling (Script Writing Department)'),
       ('Twinkle & Twig Animators (Animation Department)'),
       ('Whimsy Acoustics & Enchantment Soundscapes (Sound Design Department)'),
       ('Rainbow Beam Projection (Screening Department)'),
       ('Harmonious Roots (Voice Acting Department)'),
       ('Gnome-Unicorn Relations (Public Relations Department)'),
       ('Gilded Toadstool Council (Management Department)'),
       ('Hollow Oak Compliance Keepers (Human Resources Department)');

-- Insert job roles into the role table, linking each role to a department
INSERT INTO role (
    title, 
    salary, 
    department_id
    )
VALUES ('Master of Myth (Lead Storyteller)', 15000, 1),
       ('Keeper of Quibbles (Dialogue Specialist)', 10000, 1),
       ('Scribe of the Forgotten (Lore Archivist)', 5000, 1),
       ('Enchanter of Motion (Lead Animator)', 15000, 2),
       ('Keeper of Sparkles (Lighting & Effects Specialist)', 10000, 2),
       ('Architect of Wonder (Background & Environment Artist)', 5000, 2),
       ('Maestro of Melodies (Lead Sound Designer)', 15000, 3),
       ('Weaver of Echos (Foley Artist)', 10000, 3),
       ('Keeper of Hums (Dialogue & Voice Editing Specialist)', 5000, 3),
       ('Caster of Pictures (Lead Projectionist)', 15000, 4),
       ('Guardian of Glows (Color & Quality Control Specialist)', 10000, 4),
       ('Arranger of Viewings (Event & Screening Coordinator)', 5000, 4),
       ('Whisperer of Words (Lead Voice Director)', 15000, 5),
       ('Gatekeeper of Enchantment (Casting Specialist)', 10000, 5),
       ('Tuner of Tones (Dialogue Editor)', 5000, 5),
       ('Herald of Hype (Lead PR Strategist)', 15000, 6),
       ('Diplomat of Discourse (Media & Communications Specialist)', 10000, 6),
       ('Keeper of Allegiances (Community Engagement Coordinator)', 5000, 6),
       ('Grand Overseer of Gnomevisions (Chief Executive Gnome)', 15000, 7),
       ('Keeper of Timelines (Project Management Sage)', 10000, 7),
       ('Architect of Budgets (Financial Strategy Wizard)', 5000, 7),
       ('Warden of Workplace Wonders (Lead HR Compliance Officer)', 15000, 8),
       ('Scribe of Settlements (Employee Relations Specialist) ', 10000, 8),
       ('Keeper of Gilded Contracts (Recruitment & Retention Specialist)', 5000, 8);