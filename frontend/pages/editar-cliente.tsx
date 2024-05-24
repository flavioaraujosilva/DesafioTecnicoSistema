import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import StepIndicator from "../components/StepIndicator";
import ClientInfoForm from "../components/ClientInfoForm";
import AddressForm from "../components/AddressForm";
import CardInfoForm from "../components/CardInfoForm";

const steps = ["Informações do Cliente", "Endereço", "Cartão de Crédito"];

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

const EditarCliente: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [client, setClient] = useState(initialClientState);
  const [address, setAddress] = useState(initialAddressState);
  const [card, setCard] = useState(initialCardState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCliente = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/clientes/${id}`
          );
          const clienteData = response.data;
          setClient({
            nome: clienteData.nome,
            sobrenome: clienteData.sobrenome,
            email: clienteData.email,
            data_nascimento: clienteData.data_nascimento,
            telefone:
              clienteData.telefones.length > 0
                ? clienteData.telefones[0].numero
                : "",
          });
          setAddress(
            clienteData.enderecos.length > 0
              ? clienteData.enderecos[0]
              : initialAddressState
          );
          setCard(
            clienteData.cartoes.length > 0
              ? clienteData.cartoes[0]
              : initialCardState
          );
        } catch (error) {
          console.error("Erro ao buscar dados do cliente", error);
          toast.error("Erro ao buscar dados do cliente");
        }
      }
    };
    fetchCliente();
  }, [id]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

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

  const handleSubmit = async () => {
    try {
      const clienteData = {
        ...client,
        enderecos: [address],
        telefones: [{ numero: client.telefone }],
        cartoes: [card],
      };

      await axios.put(`http://localhost:8000/api/clientes/${id}`, clienteData);
      toast.success("Dados atualizados com sucesso!");
      router.push("/lista-clientes");
    } catch (error) {
      console.error("Erro ao atualizar dados", error);
      toast.error("Erro ao atualizar dados");
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-[700px] min-h-[500px] flex flex-col justify-between w-full">
          <ToastContainer />
          <h2 className="text-2xl font-bold text-center mb-6">
            Editar Cliente
          </h2>
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            handleStepClick={handleStepClick}
          />

          {currentStep === 1 && (
            <>
              <ClientInfoForm client={client} setClient={setClient} />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Atualizar
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <AddressForm
                address={address}
                handleAddressChange={handleAddressChange}
                setAddress={setAddress}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousStep}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Atualizar
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardInfoForm card={card} setCard={setCard} />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousStep}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Atualizar
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditarCliente;
