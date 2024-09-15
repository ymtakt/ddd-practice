// 患者詳細ページ
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientService } from "../../application/usecases/PatientService";
import { PatientApi } from "../../infrastructure/api/PatientApi";
import { Patient } from "../../domain/models/Patient";

export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const patientService = new PatientService(new PatientApi());

  useEffect(() => {
    const fetchPatient = async () => {
      const result = await patientService.fetchPatientById(id || "");
      setPatient(result);
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>患者が見つかりません</div>;
  }

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>病院: {patient.hospital}</p>
    </div>
  );
};
