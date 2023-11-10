import { beforeEach, describe, expect, test } from "vitest";
import { createDbConnection } from "../db/dbConfig";
import Student from "../models/Student";
import { studentsListHandler } from "./studentsController";

type StudentWithoutId = Omit<Student, "id">;

const makeStudent = async (data: StudentWithoutId) => {
  const promise = new Promise((resolve) => {
    const db = createDbConnection();
    const { name, room, shift, year } = data;

    // Usamos um Omit aqui para não precisar declarar alguma propriedade do tipo
    // const student: Omit<Student, 'id' | 'name'> = {
    const student: StudentWithoutId = {
      name,
      room,
      shift,
      year,
    };

    const roomToUppercase = student.room.toUpperCase();

    const sql = `INSERT INTO students(name, shift, year, room) VALUES ("${student.name}", "${student.shift}", "${student.year}", "${roomToUppercase}")`;

    db.exec(sql, (error) => {
      if (!error) {
        resolve(student);
      }
    });
  });

  await promise;
};

beforeEach(async () => {
  const promise = new Promise((resolve) => {
    const db = createDbConnection();

    db.exec(`DELETE FROM students`, (error) => {
      if (!error) {
        resolve("Alunos deletados");
      }
    });
  });

  await promise;
});

describe("Students Controller", () => {
  describe("Listagem de Alunos", () => {
    test("Testar se é possível inserir 3 alunos e depois listar seus nomes", async () => {
      await makeStudent({
        name: "Bianca",
        room: "A",
        shift: "manhã",
        year: "4",
      });
      await makeStudent({
        name: "Carla",
        room: "A",
        shift: "tarde",
        year: "2",
      });
      await makeStudent({
        name: "Josué",
        room: "C",
        shift: "manhã",
        year: "1",
      });

      const studentList = await studentsListHandler();

      expect(studentList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "Carla" }),
          expect.objectContaining({ name: "Josué" }),
          expect.objectContaining({ name: "Bianca" }),
        ])
      );
    });
  });
});
