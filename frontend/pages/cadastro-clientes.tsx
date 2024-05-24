import React from "react";
import Sidebar from "../components/Sidebar";
import MultiStepForm from "../components/MultiStepForm";

const CadastroCliente: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
        <MultiStepForm />
      </main>
    </div>
  );
};

export default CadastroCliente;
