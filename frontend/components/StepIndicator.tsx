import React from "react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  handleStepClick: (step: number) => void;
}

/**
 * Componente de indicador de etapas do formulário.
 *
 * @param steps As etapas do formulário
 * @param currentStep A etapa atual
 * @param handleStepClick Função para lidar com o clique em uma etapa
 */
const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  handleStepClick,
}) => {
  return (
    <div className="flex justify-center mb-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer"
          onClick={() => handleStepClick(index + 1)}
        >
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              currentStep >= index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="w-8 border-t-2 border-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
