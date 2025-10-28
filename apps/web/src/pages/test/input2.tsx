"use client"; // จำเป็นสำหรับ useState / useRouter
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    { id: "side_op_1", label: "Side_op" },
    { id: "side_op_2", label: "Side_op" },
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

const Desktop: React.FC = () => {
    const router = useRouter();

    // State เก็บค่าฟอร์ม
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
                            <h2 className="text-2xl font-semibold mb-8">ตัวแปรระหว่างการผ่าตัด</h2>

                            {/* Dropdowns */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

                            {/* Intraoperative Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {intraoperativeFields.map((field) => (
                                    <div key={field.id} className="flex flex-col">
                                        <label className="label">
                                            <span className="label-text font-semibold">{field.label}</span>
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
                                    <label key={field.id} className="flex items-center gap-2 cursor-pointer">
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
                                <h2 className="text-2xl font-bold mb-8">ตัวแปรหลังผ่าตัดและการทำนาย</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {postoperativeFields.map((field) => (
                                        <div key={field.id} className="flex flex-col">
                                            <label className="label">
                                                <span className="label-text font-semibold">{field.label}</span>
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
                                    <p className="text-gray-500 font-bold text-2xl text-center">เริ่มการวิเคราะห์</p>
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
                                        onClick={() => console.log(formValues)}
                                    >
                                        วิเคราะห์
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto py-4 text-center text-gray-400 text-sm">
                © 2025 P-AKI Prediction
            </footer>

        </div>
    );
};

export default Desktop;
