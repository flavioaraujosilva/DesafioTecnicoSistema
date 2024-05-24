import React, { useEffect } from "react";
import InputMask from "react-input-mask";

const ClientInfoForm: React.FC<{
  client: any;
  setClient: React.Dispatch<React.SetStateAction<any>>;
}> = ({ client, setClient }) => {
  useEffect(() => {
    if (client.telefones && client.telefones.length > 0) {
      setClient((prevClient: any) => ({
        ...prevClient,
        telefone: client.telefones[0].numero,
      }));
    } else {
      setClient((prevClient: any) => ({
        ...prevClient,
        telefones: [{ numero: "" }],
      }));
    }
  }, [client.telefones]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevClient: any) => ({ ...prevClient, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setClient((prevClient: any) => ({
      ...prevClient,
      telefones: [{ numero: value }],
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Informações do Cliente</h3>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={client.nome}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="w-1/2">
          <label>Sobrenome:</label>
          <input
            type="text"
            name="sobrenome"
            value={client.sobrenome}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={client.email}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="data_nascimento"
          value={client.data_nascimento}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>Telefone:</label>
        <InputMask
          mask="(99) 99999-9999"
          value={
            client.telefones && client.telefones.length > 0
              ? client.telefones[0].numero
              : ""
          }
          onChange={handlePhoneChange}
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  );
};

export default ClientInfoForm;
