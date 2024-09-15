// React hooksで患者データを取得

import { PatientService } from "../../application/usecases/PatientService";
// import { PatientApi } from "../../infrastructure/api/PatientApi";
import { Patient } from "../../domain/models/Patient";
import { useState } from "react";
import { MockPatientRepository } from "../../infrastructure/mock/MockPatientRepository";

export const usePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  // const patientService = new PatientService(new PatientApi());
  const patientService = new PatientService(new MockPatientRepository());

  const fetchPatients = async (page: number, limit: number, id?: string) => {
    if (id) {
      const patient = await patientService.fetchPatientById(id);
      setPatients(patient ? [patient] : []);
      setTotalCount(patient ? 1 : 0);
    } else {
      const result = await patientService.fetchPatients(page, limit);
      setPatients(result);
      const count = await patientService.getTotalPatientsCount();
      setTotalCount(count);
    }
  };

  return {
    patients,
    totalCount,
    fetchPatients,
  };
};
