INSERT INTO department (id, name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "legal"), (4, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"Sales Lead", 100000.00, 1), (2, "Salesperson", 80000.00, 1), (3, "Lead Engineer", 150000, 2), (4, "Software Engineer", 120000, 2), (5, "Accountant", 125000, 4), (6, "Legal Team Lead", 250000, 3), (7, "Lawyer", 190000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Keith", "Kool", 2, 1), (4, "Maria", "Gomez", 4, 3), (7, "Tom", "Brady", 7, 6), (8, "Ming", "Lee", 7, 6), (9,"Andy", "Winckelheimer", 4, 3), (10, "Coco", "Austin", 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "Kiki", "Smith", 1), (3, "Reginald", "Jackson", 3), (6, "Laura", "Wilder", 6), (5, "Ashley", "Schmidt", 5)








