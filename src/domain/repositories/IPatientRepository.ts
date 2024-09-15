// リポジトリインターフェース
import { Patient } from "../models/Patient";

export interface IPatientRepository {
  getPatients(page: number, limit: number): Promise<Patient[]>;
  getPatientById(id: string): Promise<Patient | null>;
  getTotalPatientsCount(): Promise<number>;
}
