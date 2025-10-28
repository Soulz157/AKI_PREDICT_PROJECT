"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FromConText";

const DesktopInt1: React.FC = () => {
  const router = useRouter();

  const demographicFields = [
    { id: "Age", label: "Age" },
    { id: "BW", label: "Body Weight" },
    { id: "Height", label: "Height" },
    { id: "BMI", label: "BMI" },
  ];

  const dropdownFields = [
    { id: "ASAgr", label: "ASA" },
    { id: "Dx", label: "DX" },
    { id: "Gender", label: "Gender" },
  ];

  const comorbidityCheckboxes = [
    { id: "HT", label: "HT" },
    { id: "DM", label: "DM" },
    { id: "COPD", label: "COPD" },
    { id: "CVD", label: "CVD" },
    { id: "DLP", label: "DLP" },
    { id: "CAD", label: "CAD" },
  ];

  const medicationCheckboxes = [
    { id: "NSAIDs", label: "NSAIDs" },
    { id: "ACEI", label: "ACEI" },
    { id: "Statin", label: "Statin" },
    { id: "ARB", label: "ARB" },
    { id: "Diuretics", label: "Diuretics" },
  ];

  const labFields = [
    { id: "Pre Hb", label: "Pre Hb" },
    { id: "Alb", label: "Alb" },
    { id: "Pre Cr", label: "Pre Cr" },
    { id: "PreGFR", label: "PreGFR" },
  ];

  const allOption: { [key: string]: OptionSet } = {
    Gender: {
      "1": "Male",
      "0": "Female",
    },
    Dx: {
      "0": "Benign",
      "1": "Malignant",
      "2": "Infection",
    },
    ASAgr: {
      "0": "ASA0",
      "1": "ASA1",
      "2": "ASA2",
      "3": "ASA3",
      "4": "ASA4",
    },
  };

  type OptionSet = {
    [key: string]: string;
  };
  const { formValues, handleChange } = useForm();

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      <header className="w-full h-14 bg-white shadow-lg flex items-center px-4">
        <div className="font-bold text-base">
          <span className="text-red-700">P</span>
          <span className="text-black">-AKI Prediction</span>
        </div>
      </header>

      <div className="flex items-center justify-center mt-12 mb-8">
        <div className="flex items-center gap-0">
          <div className="w-16 h-16 rounded-full bg-red-700 flex items-center justify-center text-white font-semibold text-xl">
            1
          </div>
          <div className="w-9 h-1 bg-red-700" />
          <div className="w-16 h-16 rounded-full bg-red-300 flex items-center justify-center text-white font-semibold text-xl">
            2
          </div>
        </div>
      </div>

      <main className="flex justify-center px-4 sm:px-16">
        <div className="card w-full max-w-[1320px] bg-base-200 shadow-xl rounded-lg mb-8">
          <div className="card-body shadow-lg">
            <h2 className="text-2xl font-bold mb-12">ข้อมูลประชากรและโรครวม</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {demographicFields.map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label className="label">
                    <span className="label-text font-semibold">
                      {field.label}
                    </span>
                  </label>
                  <input
                    id={field.id}
                    type="text"
                    className="input input-bordered w-full"
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {dropdownFields.map((field) => {
                const optionsForThisField = allOption[field.id];

                return (
                  <div key={field.id} className="flex flex-col">
                    <label className="label">
                      <span className="label-text font-semibold">
                        {field.label}
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      id={field.id}
                      value={formValues[field.id] || ""}
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select {field.label}
                      </option>
                      {optionsForThisField &&
                        Object.entries(optionsForThisField).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 mb-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">สถานะของโรครวม</h3>
                <div className="grid grid-cols-2 gap-4">
                  {comorbidityCheckboxes.map((cb) => (
                    <label
                      key={cb.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={!!formValues[cb.id]}
                        onChange={(e) => handleChange(cb.id, e.target.checked)}
                      />
                      <span>{cb.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">
                  สถานะการใช้ยาบางชนิดก่อนผ่าตัด
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {medicationCheckboxes.map((cb) => (
                    <label
                      key={cb.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={!!formValues[cb.id]}
                        onChange={(e) => handleChange(cb.id, e.target.checked)}
                      />
                      <span>{cb.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-12">
              <h3 className="text-xl font-semibold mb-4">
                ข้อมูลทางห้องปฏิบัติการก่อนผ่าตัด
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {labFields.map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <label className="label">
                      <span className="label-text font-semibold">
                        {field.label}
                      </span>
                    </label>
                    <input
                      id={field.id}
                      type="text"
                      className="input input-bordered w-full"
                      value={formValues[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="btn bg-red-700 hover:bg-red-800 text-white font-bold"
                onClick={() => router.push("/input2")}
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesktopInt1;
