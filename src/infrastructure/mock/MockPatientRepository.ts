// モックリポジトリ
import { IPatientRepository } from "../../domain/repositories/IPatientRepository";
import { Patient } from "../../domain/models/Patient";

const mockPatients: Patient[] = [
  { id: "1", name: "佐藤 一郎", hospital: "東京病院" },
  { id: "2", name: "鈴木 次郎", hospital: "大阪病院" },
  { id: "3", name: "田中 三郎", hospital: "名古屋病院" },
];

export class MockPatientRepository implements IPatientRepository {
  async getPatients(page: number, limit: number): Promise<Patient[]> {
    const startIndex = (page - 1) * limit;
    return mockPatients.slice(startIndex, startIndex + limit);
  }

  async getPatientById(id: string): Promise<Patient | null> {
    return mockPatients.find((patient) => patient.id === id) || null;
  }

  async getTotalPatientsCount(): Promise<number> {
    return mockPatients.length;
  }
}
