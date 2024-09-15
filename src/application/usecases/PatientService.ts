// 患者のビジネスロジック
import { IPatientRepository } from "../../domain/repositories/IPatientRepository";
import { Patient } from "../../domain/models/Patient";

export class PatientService {
  private repository: IPatientRepository;

  constructor(repository: IPatientRepository) {
    this.repository = repository;
  }

  async fetchPatients(page: number, limit: number): Promise<Patient[]> {
    return await this.repository.getPatients(page, limit);
  }

  async fetchPatientById(id: string): Promise<Patient | null> {
    return await this.repository.getPatientById(id);
  }

  async getTotalPatientsCount(): Promise<number> {
    return await this.repository.getTotalPatientsCount();
  }
}
