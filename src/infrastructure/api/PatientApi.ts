import { Patient } from "../../domain/models/Patient";
import { IPatientRepository } from "../../domain/repositories/IPatientRepository";

// API実装
export class PatientApi implements IPatientRepository {
  async getPatients(page: number, limit: number): Promise<Patient[]> {
    const response = await fetch(`/api/patients?page=${page}&limit=${limit}`);
    return await response.json();
  }

  async getPatientById(id: string): Promise<Patient | null> {
    const response = await fetch(`/api/patients/${id}`);
    if (response.status === 404) return null;
    return await response.json();
  }

  async getTotalPatientsCount(): Promise<number> {
    const response = await fetch("/api/patients/count");
    return await response.json();
  }
}
