// tests/PatientService.test.ts
import { MockPatientRepository } from "../infrastructure/mock/MockPatientRepository";
import { PatientService } from "../application/usecases/PatientService";

describe("PatientService 異常系テスト", () => {
  let patientService: PatientService;

  beforeEach(() => {
    const mockRepository = new MockPatientRepository();
    patientService = new PatientService(mockRepository);
  });

  // 正常系テスト
  test("患者一覧を正しく取得できる", async () => {
    const patients = await patientService.fetchPatients(1, 3);
    expect(patients.length).toBe(3);
    expect(patients[0].name).toBe("佐藤 一郎");
  });

  // 異常系テスト: 存在しないページ
  test("存在しないページを要求した場合、空のリストを返す", async () => {
    const patients = await patientService.fetchPatients(100, 10);
    expect(patients.length).toBe(0);
  });

  // 異常系テスト: 存在しないID
  test("存在しないIDを検索した場合、nullを返す", async () => {
    const patient = await patientService.fetchPatientById("999");
    expect(patient).toBeNull();
  });

  // 異常系テスト: リポジトリが例外を投げる場合
  test("リポジトリで例外が発生した場合、エラーがキャッチされる", async () => {
    const errorRepository = {
      async getPatients() {
        throw new Error("データ取得エラー");
      },
      async getPatientById() {
        throw new Error("データ取得エラー");
      },
      async getTotalPatientsCount() {
        throw new Error("データ取得エラー");
      },
    };
    const patientServiceWithError = new PatientService(errorRepository);
    await expect(patientServiceWithError.fetchPatients(1, 10)).rejects.toThrow(
      "データ取得エラー"
    );
  });
});
