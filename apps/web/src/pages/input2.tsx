"use client"; // จำเป็นสำหรับ useState / useRouter
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FromConText";
import { file } from "bun";

const intraoperativeFields = [
  { id: "dur_anes", label: "Dur_anes" },
  { id: "dur_sx", label: "Dur_sx" },
  { id: "time_ol", label: "Time_OL" },
  { id: "fluid_ml", label: "Fluid_ml" },
  { id: "crystalloid_ml", label: "Crystalloid_ml" },
  { id: "colloid_ml", label: "Colloid_ml" },
  { id: "total_blood_ml", label: "Total_blood_ml" },
  { id: "ffp_ml", label: "FFP_ml" },
  { id: "bl_loss", label: "Bl_loss" },
  { id: "urine", label: "Urine" },
  { id: "fluid_balance", label: "Fluid_balance" },
  { id: "hypotension", label: "Hypotension(Mins)" },
  { id: "total_hes_ml", label: "Total_HES_ml" },
  { id: "lowest_sbp", label: "LowestSBP" },
  { id: "lowest", label: "Lowest" },
  { id: "lowest_map", label: "Lowest MAP" },
  { id: "ephedrine", label: "Ephedrine(mg)" },
  { id: "levophed", label: "Levophed(mcg)" },
];

const dropdownFields = [
  { id: "type_op", label: "Type_Op" },
  { id: "op_app", label: "Op_app" },
  { id: "side_op", label: "Side_op" },
];

const checkboxFields = [
  { id: "hypoxemia", label: "Hypoxemia" },
  { id: "hypercarbia", label: "Hypercarbia" },
  { id: "emer_surg", label: "Emer_surg" },
];

const postoperativeFields = [
  { id: "retained_ett", label: "RetainedETT(Days)" },
  { id: "nlr1", label: "NLR1" },
];

type OptionSet = {
  [key: string]: string;
};

const allDropdownOptions: { [key: string]: OptionSet } = {
  type_op: {
    "0": "wedge",
    "1": "segment",
    "2": "Lobec",
    "3": "Pnemonect",
    "4": "decorticate",
    "5": "other",
  },
  op_app: {
    "0": "Video",
    "1": "Open thoracotomy",
  },
  side_op: {
    "0": "Left",
    "1": "Right",
    "2": "Both",
  },
};

const DesktopInt2: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState<string | null>(null);
  const [Prediction, setPrediction] = React.useState<string | null>(null);
  const { formValues, handleChange } = useForm();

  const Submit = async (data: Record<string, any>) => {
    console.log("Submitting data:", data);
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      console.log("ผลลัพธ์จาก API:", result);
      const answer =
        result.prediction_result == 0
          ? " ไม่พบ AKI"
          : result.prediction_result == 1
          ? " ระยะที่ 1 (Mild stage)"
          : result.prediction_result == 2
          ? " ระยะที่ 2 (Moderate stage)"
          : " ระยะที่ 3 (Severe stage)";

      setPrediction(answer);
    } catch (err: any) {
      console.error("เกิดข้อผิดพลาดในการส่งฟอร์ม:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="w-16 h-16 rounded-full bg-red-300 flex items-center justify-center text-white font-semibold text-xl">
            1
          </div>
          <div className="w-9 h-1 bg-red-700" />
          <div className="w-16 h-16 rounded-full bg-red-700 flex items-center justify-center text-white font-semibold text-xl">
            2
          </div>
        </div>
      </div>

      <main className="flex justify-center px-4">
        <div className="card w-full max-w-[1320px] bg-base-200 shadow-xl rounded-lg mb-8">
          <div className="card-body">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-8">
                ตัวแปรระหว่างการผ่าตัด
              </h2>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {dropdownFields.map((field) => {
                  console.log("Rendering dropdown for field:", field.id);
                  const optionsForThisField = allDropdownOptions[field.id];

                  return (
                    <div key={field.id} className="flex flex-col">
                      <label className="label">
                        <span className="label-text font-semibold">
                          {field.label}
                        </span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      >
                        <option value="" disabled>
                          Select {field.label}
                        </option>

                        {optionsForThisField &&
                          Object.entries(optionsForThisField).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {key} : {value}
                              </option>
                            )
                          )}
                      </select>
                    </div>
                  );
                })}
              </div>

              {/* Intraoperative Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {intraoperativeFields.map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <label className="label">
                      <span className="label-text font-semibold">
                        {field.label}
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={formValues[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Checkbox Fields */}
              <div className="flex flex-wrap gap-6 mt-4">
                {checkboxFields.map((field) => (
                  <label
                    key={field.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={!!formValues[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.checked)}
                    />
                    <span>{field.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-12">
              <section className="flex-1">
                <h2 className="text-2xl font-bold mb-8">
                  ตัวแปรหลังผ่าตัดและการทำนาย
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {postoperativeFields.map((field) => (
                    <div key={field.id} className="flex flex-col">
                      <label className="label">
                        <span className="label-text font-semibold">
                          {field.label}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <aside className="w-full sm:w-[480px] h-[270px] bg-white rounded-lg border border-red-700 flex flex-col justify-between p-6 sm:p-12">
                <div className="flex-1 flex items-center justify-center">
                  {Prediction ? (
                    <p className="text-gray-500 font-bold text-2xl text-center">
                      ผลการทำนาย: {Prediction}
                    </p>
                  ) : (
                    <p className="text-gray-500 font-bold text-2xl text-center">
                      ยังไม่มีการทำนาย
                    </p>
                  )}
                </div>

                <div className="flex gap-2 w-full">
                  <button
                    className="btn btn-outline flex-1 border-red-700 text-red-700"
                    onClick={() => router.back()}
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    className="btn flex-1 bg-red-700 text-white hover:bg-red-800"
                    disabled={isLoading}
                    onClick={() => Submit(formValues)}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner">loading</span>
                    ) : (
                      <span>วิเคราะห์</span>
                    )}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesktopInt2;
