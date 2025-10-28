// app/test/input/page.tsx  (App Router)
"use client"; // จำเป็นสำหรับ useState / useRouter
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Desktop: React.FC = () => {
    const router = useRouter();

    const demographicFields = [
        { id: "age", label: "Age" },
        { id: "bodyWeight", label: "Body Weight" },
        { id: "height", label: "Height" },
        { id: "bmi", label: "BMI" },
    ];

    const dropdownFields = [
        { id: "asa", label: "ASA" },
        { id: "dx", label: "DX" },
        { id: "gender", label: "Gender" },
    ];

    const comorbidityCheckboxes = [
        { id: "ht", label: "HT" },
        { id: "dm", label: "DM" },
        { id: "copd", label: "COPD" },
        { id: "cvd", label: "CVD" },
        { id: "dlp", label: "DLP" },
        { id: "cad", label: "CAD" },
    ];

    const medicationCheckboxes = [
        { id: "nsaids", label: "NSAIDs" },
        { id: "acei", label: "ACEI" },
        { id: "statin", label: "Statin" },
        { id: "arb", label: "ARB" },
        { id: "diuretics", label: "Diuretics" },
    ];

    const labFields = [
        { id: "preHb", label: "Pre Hb" },
        { id: "alb", label: "Alb" },
        { id: "preCr", label: "Pre Cr" },
        { id: "preGfr", label: "PreGFR" },
    ];

    // State เก็บค่า form
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const handleChange = (id: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [id]: value }));
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

                        {/* Demographics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                            {demographicFields.map((field) => (
                                <div key={field.id} className="flex flex-col">
                                    <label className="label">
                                        <span className="label-text font-semibold">{field.label}</span>
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

                        {/* Dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {dropdownFields.map((field) => (
                                <div key={field.id} className="flex flex-col">
                                    <label className="label">
                                        <span className="label-text font-semibold">{field.label}</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={formValues[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select {field.label}
                                        </option>
                                        <option value="Option1">Option 1</option>
                                        <option value="Option2">Option 2</option>
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* Comorbidities & Medications */}
                        <div className="flex flex-col lg:flex-row gap-10 mb-8">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-4">สถานะของโรครวม</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {comorbidityCheckboxes.map((cb) => (
                                        <label key={cb.id} className="flex items-center gap-2 cursor-pointer">
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
                                <h3 className="text-xl font-semibold mb-4">สถานะการใช้ยาบางชนิดก่อนผ่าตัด</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {medicationCheckboxes.map((cb) => (
                                        <label key={cb.id} className="flex items-center gap-2 cursor-pointer">
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

                        {/* Labs */}
                        <div className="flex flex-col gap-4 mb-12">
                            <h3 className="text-xl font-semibold mb-4">ข้อมูลทางห้องปฏิบัติการก่อนผ่าตัด</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {labFields.map((field) => (
                                    <div key={field.id} className="flex flex-col">
                                        <label className="label">
                                            <span className="label-text font-semibold">{field.label}</span>
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

                        {/* Button */}
                        <div className="flex justify-end">
                            <button
                                className="btn bg-red-700 hover:bg-red-800 text-white font-bold"
                                onClick={() => router.push("/test/input2")}
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

export default Desktop;
