import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditAddressFormProps {
  clienteId: number;
  onSave?: () => void;
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({
  clienteId,
  onSave,
}) => {
  const [address, setAddress] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/clientes/${clienteId}/endereco`
        );
        if (response.data) {
          setAddress(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar endereço do cliente", error);
        toast.error("Erro ao buscar endereço do cliente");
      }
    };

    if (clienteId) {
      fetchAddress();
    }
  }, [clienteId]);

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    if (name === "cep" && value.replace(/\D/g, "").length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addressData = {
      ...address,
      cliente_id: clienteId,
    };

    try {
      await axios.put(
        `http://localhost:8000/api/clientes/${clienteId}/endereco`,
        addressData
      );
      toast.success("Endereço atualizado com sucesso!");
      if (onSave) onSave();
    } catch (error) {
      console.error("Erro ao atualizar o endereço", error);
      toast.error("Erro ao atualizar o endereço");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">CEP</label>
          <InputMask
            mask="99999-999"
            name="cep"
            value={address.cep}
            onChange={handleAddressChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="CEP"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Logradouro</label>
          <input
            type="text"
            name="logradouro"
            value={address.logradouro}
            onChange={handleAddressChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Logradouro"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Complemento</label>
          <input
            type="text"
            name="complemento"
            value={address.complemento}
            onChange={handleAddressChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Complemento"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={address.bairro}
            onChange={handleAddressChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Bairro"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Localidade</label>
          <input
            type="text"
            name="localidade"
            value={address.localidade}
            onChange={handleAddressChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Localidade"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">UF</label>
          <input
            type="text"
            name="uf"
            value={address.uf}
            onChange={handleAddressChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="UF"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Atualizar Endereço
        </button>
      </form>
    </div>
  );
};

export default EditAddressForm;
