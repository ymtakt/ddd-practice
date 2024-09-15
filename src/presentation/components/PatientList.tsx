import React, { useEffect, useState } from "react";
import { usePatient } from "../hooks/usePatient";

// 患者一覧ページ
export const PatientList: React.FC = () => {
  const { patients, totalCount, fetchPatients } = usePatient();
  const [page, setPage] = useState(1);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchPatients(page, 10);
  }, [page]);

  const handleSearch = () => {
    fetchPatients(1, 10, searchId);
  };

  return (
    <div>
      <h1>患者一覧</h1>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="IDで検索"
      />
      <button onClick={handleSearch}>検索</button>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} - {patient.hospital}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          前のページ
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * 10 >= totalCount}
        >
          次のページ
        </button>
      </div>
    </div>
  );
};
