import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import StepIndicator from "../components/StepIndicator";
import ClientInfoForm from "../components/ClientInfoForm";
import AddressForm from "../components/AddressForm";
import CardInfoForm from "../components/CardInfoForm";
import Summary from "../components/Summary";

const steps = [
  "Informações do Cliente",
  "Endereço",
  "Cartão de Crédito",
  "Resumo",
];

const initialClientState = {
  nome: "",
  sobrenome: "",
  email: "",
  data_nascimento: "",
  telefone: "",
};

const initialAddressState = {
  cep: "",
  logradouro: "",
  complemento: "",
  bairro: "",
  localidade: "",
  uf: "",
};

const initialCardState = {
  numero: "",
  nome: "",
  validade: "",
  cvv: "",
};

const CadastroProduto: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [client, setClient] = useState(initialClientState);
  const [address, setAddress] = useState(initialAddressState);
  const [card, setCard] = useState(initialCardState);
  const router = useRouter();

  /**
   * Muda para o passo selecionado.
   *
   * @param step O passo a ser exibido
   */
  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  /**
   * Avança para o próximo passo.
   */
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  /**
   * Retorna ao passo anterior.
   */
  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  /**
   * Atualiza o endereço baseado no CEP informado.
   *
   * @param e O evento de mudança do input
   */
  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cep = e.target.value.replace(/\D/g, "");
    setAddress({ ...address, cep });

    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        if (response.data.erro) {
          toast.error("CEP não encontrado!");
          return;
        }

        setAddress((prevAddress) => ({
          ...prevAddress,
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          localidade: response.data.localidade,
          uf: response.data.uf,
        }));
      } catch (error) {
        console.error("Erro ao buscar endereço", error);
        toast.error("Erro ao buscar endereço");
      }
    }
  };

  /**
   * Submete os dados do formulário.
   */
  const handleSubmit = async () => {
    try {
      const clienteData = {
        ...client,
        enderecos: [address],
        telefones: [{ numero: client.telefone }],
        cartoes: [card],
      };

      await axios.post("http://localhost:8000/api/clientes", clienteData);
      toast.success("Dados salvos com sucesso!");
      router.push("/lista-clientes");
    } catch (error) {
      console.error("Erro ao salvar dados", error);
      toast.error("Erro ao salvar dados");
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-[700px] min-h-[500px] flex flex-col justify-between w-full">
          <ToastContainer />
          <h2 className="text-2xl font-bold text-center mb-6">
            Cadastro do Cliente
          </h2>
          <p className="text-center mb-6">
            Por favor, preencha este formulário para cadastrar um novo cliente.
          </p>
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            handleStepClick={handleStepClick}
          />

          {currentStep === 1 && (
            <ClientInfoForm client={client} setClient={setClient} />
          )}

          {currentStep === 2 && (
            <AddressForm
              address={address}
              handleAddressChange={handleAddressChange}
              setAddress={setAddress}
            />
          )}

          {currentStep === 3 && <CardInfoForm card={card} setCard={setCard} />}

          {currentStep === 4 && (
            <Summary
              client={client}
              address={address}
              card={card}
              handleSubmit={handleSubmit}
            />
          )}

          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <button
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Anterior
              </button>
            )}
            {currentStep < steps.length && (
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Próximo
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastroProduto;
